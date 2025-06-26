// Draft functionality for Fantasy NFL Playoff Tracker

// Feature flag to control draft functionality visibility
const DRAFT_ENABLED = true; // Set to true to enable draft buttons

// Draft UI state
let currentTab = 'QB';
let draftModalOpen = false;

// Initialize draft system
function initializeDraftSystem() {
    loadDraftState();
    renderDraftControls();
    
    if (draftState.isActive) {
        showDraftInterface();
    }
}

// Render draft control buttons in header
function renderDraftControls() {
    const header = document.querySelector('header');
    
    // Remove existing controls
    const existingControls = document.getElementById('draft-controls');
    if (existingControls) {
        existingControls.remove();
    }
    
    // Early return if draft is disabled
    if (!DRAFT_ENABLED) {
        return;
    }
    
    const controls = document.createElement('div');
    controls.id = 'draft-controls';
    controls.className = 'draft-controls';
      if (!draftState.isActive && !isDraftComplete()) {
        controls.innerHTML = `
            <button class="draft-btn start-draft" onclick="startDraft()">
                Start Draft
            </button>
            <button class="draft-btn reset-draft" onclick="confirmResetDraft()" disabled>
                Reset Draft
            </button>
        `;
    } else if (draftState.isActive && !isDraftComplete()) {
        controls.innerHTML = `
            <button class="draft-btn draft-interface" onclick="toggleDraftInterface()">
                ${draftModalOpen ? 'Hide Draft' : 'Show Draft'}
            </button>            <button class="draft-btn pause-draft" onclick="pauseDraft()">
                ${draftState.isPaused ? 'Resume Draft' : 'Pause Draft'}
            </button>
            <button class="draft-btn reset-draft" onclick="confirmResetDraft()" disabled>
                Reset Draft
            </button>
        `;    } else if (isDraftComplete()) {        controls.innerHTML = `
            <button class="draft-btn completed" disabled>
                Draft Complete!
            </button>
            <button class="draft-btn export-rosters" onclick="exportDraftedRosters()">
                Export Rosters
            </button>
            <button class="draft-btn reset-draft" onclick="confirmResetDraft()">
                Reset Draft
            </button>
        `;
    }
    
    header.appendChild(controls);
}

// Start a new draft
function startDraft() {
    if (confirm('Start a new draft? This will clear all current rosters.')) {
        initializeDraft();
        renderDraftControls();
        showDraftInterface();
        
        // Refresh the leaderboard to show empty rosters
        if (typeof renderLeaderboard === 'function') {
            renderLeaderboard();
        }
    }
}

// Pause/resume draft
function pauseDraft() {
    draftState.isPaused = !draftState.isPaused;
    saveDraftState();
    renderDraftControls();
    updateDraftInterface();
}

// Confirm draft reset
function confirmResetDraft() {
    if (confirm('Reset the entire draft? This will clear all picks and rosters. This action cannot be undone.')) {
        resetDraft();
        renderDraftControls();
        hideDraftInterface();
        
        // Refresh the leaderboard to show empty rosters
        if (typeof renderLeaderboard === 'function') {
            renderLeaderboard();
        }
    }
}

// Show draft interface
function showDraftInterface() {
    hideDraftInterface(); // Remove existing if any
    
    const draftInterface = document.createElement('div');
    draftInterface.id = 'draft-interface';
    draftInterface.className = 'draft-interface';
    
    draftInterface.innerHTML = createDraftInterfaceHTML();
    document.body.appendChild(draftInterface);
    
    draftModalOpen = true;
    renderDraftControls();
    updateDraftInterface();
}

// Hide draft interface
function hideDraftInterface() {
    const existing = document.getElementById('draft-interface');
    if (existing) {
        existing.remove();
    }
    draftModalOpen = false;
    renderDraftControls();
}

// Toggle draft interface visibility
function toggleDraftInterface() {
    if (draftModalOpen) {
        hideDraftInterface();
    } else {
        showDraftInterface();
    }
}

// Create draft interface HTML
function createDraftInterfaceHTML() {
    return `
        <div class="draft-modal">
            <div class="draft-content">
                <div class="draft-header">
                    <h2>Draft in Progress</h2>
                    <button class="close-btn" onclick="hideDraftInterface()">×</button>
                </div>
                
                <div class="draft-status">
                    <div class="draft-info">
                        <span class="pick-number">Pick #<span id="current-pick">${draftState.currentPick}</span> of ${totalPicks}</span>
                        <span class="current-drafter">Current: <strong id="current-drafter">${draftState.currentDrafter}</strong></span>
                        <span class="draft-state ${draftState.isPaused ? 'paused' : 'active'}" id="draft-state">
                            ${draftState.isPaused ? 'PAUSED' : 'ACTIVE'}
                        </span>
                    </div>
                    <div class="draft-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(draftState.currentPick - 1) / totalPicks * 100}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="draft-tabs">
                    <button class="tab-btn active" data-position="QB" onclick="switchTab('QB')">
                        QB (${getAvailablePlayers('QB').QB.length})
                    </button>
                    <button class="tab-btn" data-position="RB" onclick="switchTab('RB')">
                        RB (${getAvailablePlayers('RB').RB.length})
                    </button>
                    <button class="tab-btn" data-position="WR" onclick="switchTab('WR')">
                        WR (${getAvailablePlayers('WR').WR.length})
                    </button>
                    <button class="tab-btn" data-position="TE" onclick="switchTab('TE')">
                        TE (${getAvailablePlayers('TE').TE.length})
                    </button>
                </div>
                
                <div class="roster-status">
                    <h3>${draftState.currentDrafter}'s Roster Status:</h3>
                    <div class="position-counts" id="position-counts">
                        <!-- Will be populated by updatePositionCounts -->
                    </div>
                </div>
                
                <div class="player-grid" id="player-grid">
                    <!-- Players will be populated here -->
                </div>
                
                <div class="current-roster">
                    <h3>Your Current Roster:</h3>
                    <div class="current-roster-players" id="current-roster-players">
                        <!-- Current drafter's roster will be shown here -->
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Switch position tab
function switchTab(position) {
    currentTab = position;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-position="${position}"]`).classList.add('active');
    
    // Update player grid
    updatePlayerGrid();
}

// Update the entire draft interface
function updateDraftInterface() {
    if (!draftModalOpen) return;
    
    // Update current pick and drafter
    const pickElement = document.getElementById('current-pick');
    const drafterElement = document.getElementById('current-drafter');
    const stateElement = document.getElementById('draft-state');
    
    if (pickElement) pickElement.textContent = draftState.currentPick;
    if (drafterElement) drafterElement.textContent = draftState.currentDrafter;
    if (stateElement) {
        stateElement.textContent = draftState.isPaused ? 'PAUSED' : 'ACTIVE';
        stateElement.className = `draft-state ${draftState.isPaused ? 'paused' : 'active'}`;
    }
    
    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${(draftState.currentPick - 1) / totalPicks * 100}%`;
    }
    
    // Update tab counts
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const position = btn.dataset.position;
        const count = getAvailablePlayers(position)[position].length;
        btn.textContent = `${position} (${count})`;
    });
    
    // Update roster status header
    const rosterStatusHeader = document.querySelector('.roster-status h3');
    if (rosterStatusHeader) {
        rosterStatusHeader.textContent = `${draftState.currentDrafter}'s Roster Status:`;
    }
    
    updatePositionCounts();
    updatePlayerGrid();
    updateCurrentRoster();
    
    // Check if draft is complete
    if (isDraftComplete()) {
        showDraftComplete();
    }
}

// Update position counts for current drafter
function updatePositionCounts() {
    const container = document.getElementById('position-counts');
    if (!container) return;
    
    const counts = {};
    Object.keys(rosterRules).forEach(position => {
        const current = getOwnerPositionCount(draftState.currentDrafter, position);
        const max = rosterRules[position];
        counts[position] = { current, max, canDraft: current < max };
    });
    
    container.innerHTML = Object.keys(counts).map(position => {
        const { current, max, canDraft } = counts[position];
        return `
            <span class="position-count ${canDraft ? 'can-draft' : 'maxed'}">
                ${position}: ${current}/${max}
            </span>
        `;
    }).join('');
}

// Update player grid for current tab
function updatePlayerGrid() {
    const container = document.getElementById('player-grid');
    if (!container) return;
    
    const availablePlayers = getAvailablePlayers(currentTab)[currentTab];
    const canDraftThisPosition = canDraftPosition(draftState.currentDrafter, currentTab);
    
    if (availablePlayers.length === 0) {
        container.innerHTML = '<div class="no-players">No available players at this position</div>';
        return;
    }
    
    container.innerHTML = availablePlayers.map(player => {
        const isActive = activeTeams.includes(player.team);
        const canSelect = canDraftThisPosition && !draftState.isPaused && draftState.isActive;
        
        return `
            <div class="player-card-draft ${!canSelect ? 'disabled' : ''} ${!isActive ? 'eliminated' : ''}" 
                 ${canSelect ? `onclick="selectPlayer('${player.name}', '${currentTab}')"` : ''}>
                <div class="player-name">${player.name}</div>
                <div class="player-team">${player.team}</div>
                <div class="player-status ${isActive ? 'active' : 'eliminated'}">
                    ${isActive ? 'ACTIVE' : 'ELIMINATED'}
                </div>
                ${!canSelect && canDraftThisPosition ? '<div class="draft-paused">Draft Paused</div>' : ''}
                ${!canDraftThisPosition ? '<div class="position-full">Position Full</div>' : ''}
            </div>
        `;
    }).join('');
}

// Update current drafter's roster display
function updateCurrentRoster() {
    const container = document.getElementById('current-roster-players');
    if (!container) return;
    
    const currentRoster = draftState.completedRosters[draftState.currentDrafter] || [];
    
    if (currentRoster.length === 0) {
        container.innerHTML = '<div class="no-picks">No players drafted yet</div>';
        return;
    }
    
    // Group players by position for better organization
    const rosterByPosition = {};
    Object.keys(rosterRules).forEach(pos => {
        rosterByPosition[pos] = currentRoster.filter(player => player.position === pos);
    });
    
    container.innerHTML = Object.keys(rosterByPosition).map(position => {
        const players = rosterByPosition[position];
        const maxCount = rosterRules[position];
        const currentCount = players.length;
        
        return `
            <div class="position-group">
                <div class="position-header">
                    <span class="position-name">${position}</span>
                    <span class="position-status">(${currentCount}/${maxCount})</span>
                </div>
                <div class="position-players">
                    ${players.map(player => `
                        <div class="roster-player">
                            <span class="player-name">${player.name}</span>
                            <span class="player-team">${player.team}</span>
                        </div>
                    `).join('')}
                    ${Array(maxCount - currentCount).fill(0).map(() => 
                        `<div class="empty-slot">Empty</div>`
                    ).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// Select a player in the draft
function selectPlayer(playerName, position) {
    if (draftState.isPaused || !draftState.isActive) {
        alert('Draft is paused or not active');
        return;
    }
    
    if (!canDraftPosition(draftState.currentDrafter, position)) {
        alert(`Cannot draft more ${position}s`);
        return;
    }
    
    if (confirm(`Draft ${playerName} for ${draftState.currentDrafter}?`)) {
        try {
            const updatedState = draftPlayer(playerName, position);
            
            // Ensure draftState is synchronized
            draftState = updatedState;
            
            updateDraftInterface();
            
            // Update leaderboard if function exists
            if (typeof renderLeaderboard === 'function') {
                renderLeaderboard();
            }
            
            // Show pick notification
            showPickNotification(playerName, position, draftState.currentPick - 1);
            
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
}

// Show pick notification
function showPickNotification(playerName, position, pickNumber) {
    const notification = document.createElement('div');
    notification.className = 'pick-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <strong>Pick #${pickNumber}</strong><br>
            ${draftState.draftHistory[pickNumber - 1].owner} selects<br>
            <strong>${playerName} (${position})</strong>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Show draft complete screen
function showDraftComplete() {
    const container = document.querySelector('.draft-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="draft-header">
            <h2>Draft Complete! 🎉</h2>
            <button class="close-btn" onclick="hideDraftInterface()">×</button>
        </div>
        
        <div class="draft-complete">
            <h3>Final Rosters:</h3>
            <div class="final-rosters">
                ${draftOrder.map(owner => {
                    const roster = draftState.completedRosters[owner];
                    const total = calculateOwnerTotal(owner);
                    return `
                        <div class="owner-roster">
                            <h4>${owner} (${total.toFixed(1)} pts)</h4>
                            <div class="roster-players">
                                ${roster.map(player => `
                                    <div class="roster-player">
                                        <span class="player-name">${player.name}</span>
                                        <span class="player-pos">${player.position}</span>
                                        <span class="player-team">${player.team}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>            <div class="complete-actions">
                <button class="draft-btn" onclick="hideDraftInterface()">View Leaderboard</button>                <button class="draft-btn export-rosters" onclick="exportDraftedRosters()">Export Rosters</button>
                <button class="draft-btn reset-draft" onclick="confirmResetDraft()" disabled>Start New Draft</button>
            </div>
        </div>
    `;
    
    draftState.isActive = false;
    saveDraftState();
    renderDraftControls();
}

// Export functions for saving draft results
function exportDraftedRosters() {
    if (!draftState.completedRosters || Object.keys(draftState.completedRosters).length === 0) {
        alert('No drafted rosters to export. Please complete a draft first.');
        return;
    }
    
    const rostersContent = `// Generated rosters from draft on ${new Date().toLocaleString()}
const rosters = ${JSON.stringify(rosters, null, 4)};`;
    
    downloadFile('rosters.js', rostersContent);
}



function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Make functions globally available
window.startDraft = startDraft;
window.pauseDraft = pauseDraft;
window.confirmResetDraft = confirmResetDraft;
window.toggleDraftInterface = toggleDraftInterface;
window.hideDraftInterface = hideDraftInterface;
window.switchTab = switchTab;
window.selectPlayer = selectPlayer;
window.exportDraftedRosters = exportDraftedRosters;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDraftSystem);
} else {
    initializeDraftSystem();
}
