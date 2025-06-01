// Fantasy NFL Playoff Tracker - Main JavaScript
// 
// DATA SEPARATION PRINCIPLE:
// - activeTeams.js: Contains active playoff teams, used for elimination status
// - rosters.js: Contains all player roster data, used for frontend rendering and team info
// - playerStats.js: Contains ONLY scoring data, used strictly for calculating points

// Application state
let currentSort = { column: 'total', direction: 'desc' };
let expandedWeeks = new Set();

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
    renderWeekBreakdown();
    updateTimestamp();
});

// Calculate total points for an owner (uses rosters for player info, playerStats only for scoring)
function calculateOwnerTotal(owner) {
    const ownerRoster = rosters[owner] || [];
    return ownerRoster.reduce((total, player) => {
        const stats = playerStats[player.name];
        if (stats && stats.weeklyPoints) {
            const playerTotal = Object.values(stats.weeklyPoints)
                .reduce((sum, points) => sum + points, 0);
            return total + playerTotal;
        }
        return total;
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
        const stats = playerStats[player.name];
        const isEliminated = !activeTeams.includes(player.team);
        const playerTotal = stats ? Object.values(stats.weeklyPoints).reduce((sum, points) => sum + points, 0) : 0;
        
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

    // Get all unique weeks from player stats
    const weeks = new Set();
    Object.values(playerStats).forEach(stats => {
        if (stats.weeklyPoints) {
            Object.keys(stats.weeklyPoints).forEach(week => weeks.add(week));
        }
    });

    const sortedWeeks = Array.from(weeks).sort((a, b) => {
        const order = { "Wildcard": 1, "Divisional": 2, "Conference": 3, "Super Bowl": 4 };
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
            const stats = playerStats[player.name];
            if (stats && stats.weeklyPoints && stats.weeklyPoints[week] !== undefined && stats.weeklyPoints[week] > 0) {
                weekPlayers.push({
                    name: player.name,
                    team: player.team, // Use team from roster, not playerStats
                    points: stats.weeklyPoints[week]
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
