// Fantasy NFL Playoff Tracker - Main JavaScript
// 
// DATA SEPARATION PRINCIPLE:
// - activeTeams.js: Contains active playoff teams, used for elimination status
// - rosters.js: Contains all player roster data, used for frontend rendering and team info
// - playerStats.js: Contains ONLY scoring data, used strictly for calculating points

// Application state
let playerStats = null;
let currentSort = { column: 'total', direction: 'desc' };
let expandedWeeks = new Set();
let lastDataVersion = null;

// Dynamic data loading with cache busting
async function loadPlayerStats(forceRefresh = false) {
    try {
        // Use timestamp as cache buster
        const timestamp = forceRefresh ? Date.now() : '';
        const cacheBuster = timestamp ? `?v=${timestamp}` : '';
        
        // Dynamic import with cache busting
        const statsModule = await import(`./Data/playerStats.js${cacheBuster}`);
        playerStats = statsModule.default;
        
        // Store the current data version (file modification-like timestamp)
        lastDataVersion = timestamp || Date.now();
        
        console.log('Player stats loaded successfully');
        return playerStats;
    } catch (error) {
        console.error('Error loading player stats:', error);
        throw error;
    }
}

// Check if data needs to be refreshed (can be called periodically)
async function checkForDataUpdates() {
    try {
        // Force a fresh import to check if data has changed
        const timestamp = Date.now();
        const statsModule = await import(`./Data/playerStats.js?v=${timestamp}`);
        const newStats = statsModule.default;
        
        // Simple comparison - check if the data structure has changed
        const currentDataString = JSON.stringify(playerStats);
        const newDataString = JSON.stringify(newStats);
        
        if (currentDataString !== newDataString) {
            console.log('New data detected, refreshing...');
            playerStats = newStats;
            lastDataVersion = timestamp;
            
            // Refresh the UI with new data
            renderLeaderboard();
            renderWeekBreakdown();
            updateTimestamp();
            
            // Show notification to user
            showNotification('📊 Stats updated with latest data!', 'success');
            
            return true; // Data was updated
        }
        
        return false; // No changes
    } catch (error) {
        console.error('Error checking for data updates:', error);
        return false;
    }
}

// Manual refresh function for user-triggered updates
async function refreshData() {
    try {
        await loadPlayerStats(true);
        renderLeaderboard();
        renderWeekBreakdown();
        updateTimestamp();
        console.log('Data refreshed successfully');
    } catch (error) {
        console.error('Error refreshing data:', error);
    }
}

// Add refresh button functionality
function addRefreshButton() {
    const refreshBtn = document.getElementById('refresh-data');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            // Disable button and show loading state
            refreshBtn.disabled = true;
            refreshBtn.classList.add('loading');
            refreshBtn.textContent = '🔄 Refreshing...';
            
            try {
                await refreshData();
                
                // Show success feedback
                refreshBtn.textContent = '✅ Updated!';
                showNotification('📊 Data refreshed successfully!', 'success');
                setTimeout(() => {
                    refreshBtn.textContent = '🔄 Refresh Data';
                }, 2000);
                
            } catch (error) {
                // Show error feedback
                refreshBtn.textContent = '❌ Error';
                showNotification('❌ Failed to refresh data. Please try again.', 'error');
                setTimeout(() => {
                    refreshBtn.textContent = '🔄 Refresh Data';
                }, 3000);
            } finally {
                // Re-enable button and remove loading state
                refreshBtn.disabled = false;
                refreshBtn.classList.remove('loading');
            }
        });
    }
}

// Show notification to user
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load player stats first
        await loadPlayerStats();
        
        // Then render the UI
        renderLeaderboard();
        renderWeekBreakdown();
        updateTimestamp();
        
        // Set up periodic data checking (every 5 minutes)
        setInterval(checkForDataUpdates, 5 * 60 * 1000);
        
        // Add refresh button functionality
        addRefreshButton();
        
    } catch (error) {
        console.error('Error initializing application:', error);
        // Show error message to user
        document.body.innerHTML = '<div style="text-align: center; padding: 20px; color: red;">Error loading data. Please refresh the page.</div>';
    }
});

// Calculate total points for an owner (uses rosters for player info, playerStats only for scoring)
function calculateOwnerTotal(owner) {
    const ownerRoster = rosters[owner] || [];
    return ownerRoster.reduce((total, player) => {
        const playerName = player.name;
        let playerTotal = 0;
        
        // Sum points from all weeks for this player
        // If player doesn't have a score for a week, they get 0 points
        Object.keys(playerStats).forEach(week => {
            const weeklyPoints = playerStats[week][playerName] || 0;
            playerTotal += weeklyPoints;
        });
        
        return total + playerTotal;
    }, 0);
}

// Calculate active players count for an owner (uses roster data for team info)
function calculateActivePlayersCount(owner) {
    const ownerRoster = rosters[owner] || [];
    return ownerRoster.filter(player => {
        return activeTeams.includes(player.team);
    }).length;
}

// Check if a player is eliminated (use roster data for team info)
function isPlayerEliminated(player) {
    return !activeTeams.includes(player.team);
}

// Render the main leaderboard
function renderLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboard-body');
    if (!leaderboardBody) return;

    // Calculate owner totals and create leaderboard data
    const leaderboardData = Object.keys(rosters).map(owner => ({
        owner,
        total: calculateOwnerTotal(owner),
        activePlayers: calculateActivePlayersCount(owner),
        roster: rosters[owner] || []
    }));

    // Sort by total points (descending)
    leaderboardData.sort((a, b) => b.total - a.total);

    // Clear existing content
    leaderboardBody.innerHTML = '';

    // Render each owner row
    leaderboardData.forEach((data, index) => {
        const row = createLeaderboardRow(data, index + 1);
        leaderboardBody.appendChild(row);
    });
}

// Create a leaderboard row
function createLeaderboardRow(data, rank) {
    const row = document.createElement('tr');
    
    // Add ranking class for top 3
    if (rank <= 3) {
        row.classList.add(`rank-${rank}`);
    }

    // Check if owner has any active players
    const hasActivePlayers = data.activePlayers > 0;
    if (!hasActivePlayers) {
        row.classList.add('eliminated');
    }

    row.innerHTML = `
        <td>${rank}</td>
        <td>${data.owner}</td>
        <td>${data.total.toFixed(1)}</td>
        <td>
            <span class="${hasActivePlayers ? 'player-active' : 'player-eliminated'}">
                ${data.activePlayers} / ${data.roster.length}
            </span>
        </td>
        <td>
            <button class="details-btn" onclick="toggleOwnerDetails('${data.owner}')">
                View Details
            </button>
        </td>
    `;

    return row;
}

// Toggle owner details
function toggleOwnerDetails(owner) {
    const existingModal = document.getElementById('owner-modal');
    if (existingModal) {
        existingModal.remove();
        return;
    }

    const modal = document.createElement('div');
    modal.id = 'owner-modal';
    modal.className = 'modal';
      const ownerRoster = rosters[owner] || [];
    const ownerTotal = calculateOwnerTotal(owner);
    let rosterHTML = ownerRoster.map(player => {
        const playerName = player.name;
        const isEliminated = !activeTeams.includes(player.team);
          // Calculate player total using new format
        // If player doesn't have a score for a week, they get 0 points
        let playerTotal = 0;
        Object.keys(playerStats).forEach(week => {
            const weeklyPoints = playerStats[week][playerName] || 0;
            playerTotal += weeklyPoints;
        });
        
        return `
            <div class="player-row ${isEliminated ? 'eliminated' : ''}">
                <span class="player-name">${player.name}</span>
                <span class="player-position">${player.position}</span>
                <span class="player-team">${player.team}</span>
                <span class="player-points">${playerTotal.toFixed(1)} pts</span>
                <span class="player-status ${isEliminated ? 'eliminated' : 'active'}">${isEliminated ? 'ELIMINATED' : 'ACTIVE'}</span>
            </div>
        `;
    }).join('');

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${owner}'s Roster (${ownerTotal.toFixed(1)} pts)</h2>
                <button class="close-btn" onclick="document.getElementById('owner-modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="roster-grid">
                    ${rosterHTML}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Render weekly breakdown section
function renderWeekBreakdown() {
    const weekBreakdown = document.getElementById('week-breakdown');
    if (!weekBreakdown) return;

    // Get all weeks from the new playerStats format
    const weeks = Object.keys(playerStats);
    
    const sortedWeeks = weeks.sort((a, b) => {
        const order = { "Wildcard": 1, "Divisional": 2, "Conference": 3, "SuperBowl": 4 };
        return order[a] - order[b];
    });

    weekBreakdown.innerHTML = `
        <h2 style="background: #005778; color: white; padding: 1.5rem; margin: 0;">
            Weekly Breakdown
        </h2>
    `;

    sortedWeeks.forEach(week => {
        const weekSection = createWeekSection(week);
        weekBreakdown.appendChild(weekSection);
    });
}

// Create a week section
function createWeekSection(week) {
    const section = document.createElement('div');
    section.className = 'week-section';
    section.innerHTML = `
        <div class="week-header" onclick="toggleWeek('${week}')">
            <span>${week} Round</span>
            <span class="toggle-icon">▼</span>
        </div>
        <div class="week-content" id="week-${week.replace(' ', '-')}">
            <div class="week-players" id="players-${week.replace(' ', '-')}">
                <!-- Players will be populated here -->
            </div>
        </div>
    `;

    return section;
}

// Toggle week expansion
function toggleWeek(week) {
    const weekId = week.replace(' ', '-');
    const content = document.getElementById(`week-${weekId}`);
    const header = content.previousElementSibling;
    const playersContainer = document.getElementById(`players-${weekId}`);

    if (expandedWeeks.has(week)) {
        // Collapse
        content.classList.remove('expanded');
        header.classList.remove('expanded');
        expandedWeeks.delete(week);
        header.querySelector('.toggle-icon').textContent = '▼';
    } else {
        // Expand
        content.classList.add('expanded');
        header.classList.add('expanded');
        expandedWeeks.add(week);
        header.querySelector('.toggle-icon').textContent = '▲';
        
        // Populate players for this week if not already done
        if (playersContainer.children.length === 0) {
            populateWeekPlayers(week, playersContainer);
        }
    }
}

// Populate players for a specific week
function populateWeekPlayers(week, container) {
    // Get all rostered players who played in this week
    const weekPlayers = [];
    
    // Iterate through rosters to get all rostered players
    Object.values(rosters).forEach(roster => {
        roster.forEach(player => {
            const playerName = player.name;
            // Check if player has points for this week in the new format
            if (playerStats[week] && playerStats[week][playerName] !== undefined && playerStats[week][playerName] > 0) {
                weekPlayers.push({
                    name: playerName,
                    team: player.team, // Use team from roster, not playerStats
                    points: playerStats[week][playerName]
                });
            }
        });
    });

    // Sort by points (descending)
    weekPlayers.sort((a, b) => b.points - a.points);

    // Create player cards
    weekPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        const isEliminated = !activeTeams.includes(player.team);
        if (isEliminated) {
            card.classList.add('player-eliminated');
        }

        card.innerHTML = `
            <div class="player-name ${isEliminated ? 'player-eliminated' : 'player-active'}">
                ${player.name}
            </div>
            <div class="player-team">${player.team}</div>
            <div class="player-points">${player.points.toFixed(1)} pts</div>
        `;

        container.appendChild(card);
    });
}

// Update timestamp in footer
function updateTimestamp() {
    const timestampElement = document.getElementById('update-timestamp');
    if (timestampElement) {
        timestampElement.textContent = new Date().toLocaleString();
    }
}

// Make functions globally available
window.toggleOwnerDetails = toggleOwnerDetails;
window.toggleWeek = toggleWeek;
