// Draft system data and configuration

// Draft order - defines the order in which owners pick
const draftOrder = ["Aitan", "Xavi", "Jorge", "Eric", "Michael", "Leo"];

// Roster construction rules
const rosterRules = {
    QB: 1,
    RB: 2, 
    WR: 2,
    TE: 1
};

// Complete player pool for drafting
const playerPool = {
  "QB": [
    { name: "Patrick Mahomes", team: "KC" },
    { name: "Carson Wentz", team: "KC" },
    { name: "Jalen Hurts", team: "PHI" },
    { name: "Kenny Pickett", team: "PHI" },
    { name: "Russell Wilson", team: "PIT" },
    { name: "Justin Fields", team: "PIT" },
    { name: "Lamar Jackson", team: "BAL" },
    { name: "Tyler Huntley", team: "BAL" },
    { name: "Baker Mayfield", team: "TB" },
    { name: "Kyle Trask", team: "TB" },
    { name: "Matthew Stafford", team: "LAR" },
    { name: "Stetson Bennett", team: "LAR" },
    { name: "Jayden Daniels", team: "WAS" },
    { name: "Marcus Mariota", team: "WAS" },
    { name: "Jared Goff", team: "DET" },
    { name: "Hendon Hooker", team: "DET" },
    { name: "Jordan Love", team: "GB" },
    { name: "Sean Clifford", team: "GB" },
    { name: "Bo Nix", team: "DEN" },
    { name: "Jarrett Stidham", team: "DEN" },
    { name: "C.J. Stroud", team: "HOU" },
    { name: "Davis Mills", team: "HOU" },
    { name: "Justin Herbert", team: "LAC" },
    { name: "Easton Stick", team: "LAC" },
    { name: "Josh Allen", team: "BUF" },
    { name: "Mitchell Trubisky", team: "BUF" },
    { name: "Sam Darnold", team: "MIN" },
    { name: "J.J. McCarthy", team: "MIN" }
  ],
  "RB": [
    { name: "Isiah Pacheco", team: "KC" },
    { name: "Clyde Edwards-Helaire", team: "KC" },
    { name: "Saquon Barkley", team: "PHI" },
    { name: "Kenneth Gainwell", team: "PHI" },
    { name: "Najee Harris", team: "PIT" },
    { name: "Jaylen Warren", team: "PIT" },
    { name: "Derrick Henry", team: "BAL" },
    { name: "Justice Hill", team: "BAL" },
    { name: "Rachaad White", team: "TB" },
    { name: "Chase Edmonds", team: "TB" },
    { name: "Kyren Williams", team: "LAR" },
    { name: "Zach Evans", team: "LAR" },
    { name: "Brian Robinson Jr.", team: "WAS" },
    { name: "Chris Rodriguez Jr.", team: "WAS" },
    { name: "Jahmyr Gibbs", team: "DET" },
    { name: "David Montgomery", team: "DET" },
    { name: "Josh Jacobs", team: "GB" },
    { name: "AJ Dillon", team: "GB" },
    { name: "Javonte Williams", team: "DEN" },
    { name: "Samaje Perine", team: "DEN" },
    { name: "Joe Mixon", team: "HOU" },
    { name: "Dameon Pierce", team: "HOU" },
    { name: "J.K. Dobbins", team: "LAC" },
    { name: "Gus Edwards", team: "LAC" },
    { name: "James Cook", team: "BUF" },
    { name: "Ty Johnson", team: "BUF" },
    { name: "Aaron Jones", team: "MIN" },
    { name: "Ty Chandler", team: "MIN" }
  ],
  "WR": [
    { name: "Rashee Rice", team: "KC" },
    { name: "Xavier Worthy", team: "KC" },
    { name: "A.J. Brown", team: "PHI" },
    { name: "DeVonta Smith", team: "PHI" },
    { name: "George Pickens", team: "PIT" },
    { name: "Van Jefferson", team: "PIT" },
    { name: "Zay Flowers", team: "BAL" },
    { name: "Rashod Bateman", team: "BAL" },
    { name: "Mike Evans", team: "TB" },
    { name: "Chris Godwin", team: "TB" },
    { name: "Puka Nacua", team: "LAR" },
    { name: "Cooper Kupp", team: "LAR" },
    { name: "Terry McLaurin", team: "WAS" },
    { name: "Jahan Dotson", team: "WAS" },
    { name: "Amon-Ra St. Brown", team: "DET" },
    { name: "Jameson Williams", team: "DET" },
    { name: "Christian Watson", team: "GB" },
    { name: "Romeo Doubs", team: "GB" },
    { name: "Courtland Sutton", team: "DEN" },
    { name: "Jerry Jeudy", team: "DEN" },
    { name: "Nico Collins", team: "HOU" },
    { name: "Tank Dell", team: "HOU" },
    { name: "Ladd McConkey", team: "LAC" },
    { name: "Joshua Palmer", team: "LAC" },
    { name: "Stefon Diggs", team: "BUF" },
    { name: "Khalil Shakir", team: "BUF" },
    { name: "Justin Jefferson", team: "MIN" },
    { name: "Jordan Addison", team: "MIN" }
  ],
  "TE": [
    { name: "Travis Kelce", team: "KC" },
    { name: "Noah Gray", team: "KC" },
    { name: "Dallas Goedert", team: "PHI" },
    { name: "C.J. Uzomah", team: "PHI" },
    { name: "Pat Freiermuth", team: "PIT" },
    { name: "Darnell Washington", team: "PIT" },
    { name: "Mark Andrews", team: "BAL" },
    { name: "Isaiah Likely", team: "BAL" },
    { name: "Cade Otton", team: "TB" },
    { name: "Ko Kieft", team: "TB" },
    { name: "Tyler Higbee", team: "LAR" },
    { name: "Hunter Long", team: "LAR" },
    { name: "Zach Ertz", team: "WAS" },
    { name: "Cole Turner", team: "WAS" },
    { name: "Sam LaPorta", team: "DET" },
    { name: "James Mitchell", team: "DET" },
    { name: "Tucker Kraft", team: "GB" },
    { name: "Luke Musgrave", team: "GB" },
    { name: "Greg Dulcich", team: "DEN" },
    { name: "Adam Trautman", team: "DEN" },
    { name: "Dalton Schultz", team: "HOU" },
    { name: "Brevin Jordan", team: "HOU" },
    { name: "Donald Parham Jr.", team: "LAC" },
    { name: "Gerald Everett", team: "LAC" },
    { name: "Dalton Kincaid", team: "BUF" },
    { name: "Dawson Knox", team: "BUF" },
    { name: "T.J. Hockenson", team: "MIN" },
    { name: "Josh Oliver", team: "MIN" }
  ]
};

// Draft state - will be managed in localStorage
let draftState = {
    isActive: false,
    isPaused: false,
    currentPick: 1,
    currentDrafter: null, // Will be set by snake draft logic
    draftedPlayers: {}, // playerName: { owner, pickNumber, position }
    draftHistory: [], // array of picks in order
    completedRosters: {} // owner: array of players
};

// Total picks calculation
const totalPicks = draftOrder.length * Object.values(rosterRules).reduce((sum, count) => sum + count, 0);

// Helper functions for draft management
function getSnakeDraftOrder(pickNumber) {
    const numOwners = draftOrder.length;
    const round = Math.ceil(pickNumber / numOwners);
    const positionInRound = ((pickNumber - 1) % numOwners) + 1;
    
    // Even rounds reverse the order
    if (round % 2 === 0) {
        return draftOrder[numOwners - positionInRound];
    } else {
        return draftOrder[positionInRound - 1];
    }
}

function initializeDraft() {
    draftState = {
        isActive: true,
        isPaused: false,
        currentPick: 1,
        currentDrafter: getSnakeDraftOrder(1),
        draftedPlayers: {},
        draftHistory: [],
        completedRosters: {}
    };
    
    // Initialize empty rosters
    draftOrder.forEach(owner => {
        draftState.completedRosters[owner] = [];
    });
    
    saveDraftState();
}

function resetDraft() {
    // Clear localStorage
    localStorage.removeItem('draftState');
    
    // Reset global rosters object to empty
    draftOrder.forEach(owner => {
        rosters[owner] = [];
    });
    
    // Reset draft state
    draftState = {
        isActive: false,
        isPaused: false,
        currentPick: 1,
        currentDrafter: getSnakeDraftOrder(1),
        draftedPlayers: {},
        draftHistory: [],
        completedRosters: {}
    };
}

function saveDraftState() {
    localStorage.setItem('draftState', JSON.stringify(draftState));
}

function loadDraftState() {
    const saved = localStorage.getItem('draftState');
    if (saved) {
        draftState = JSON.parse(saved);
        
        // Ensure current drafter is set correctly using snake draft logic
        if (draftState.currentPick <= totalPicks) {
            draftState.currentDrafter = getSnakeDraftOrder(draftState.currentPick);
        }
        
        // Update global rosters object with drafted players
        if (draftState.completedRosters) {
            Object.assign(rosters, draftState.completedRosters);
        }
        
        return true;
    }
    return false;
}

function isDraftComplete() {
    return draftState.currentPick > totalPicks;
}

function getAvailablePlayers(position = null) {
    const available = {};
    
    if (position) {
        available[position] = playerPool[position].filter(player => 
            !draftState.draftedPlayers[player.name]
        );
    } else {
        Object.keys(playerPool).forEach(pos => {
            available[pos] = playerPool[pos].filter(player => 
                !draftState.draftedPlayers[player.name]
            );
        });
    }
    
    return available;
}

function getOwnerPositionCount(owner, position) {
    const roster = draftState.completedRosters[owner] || [];
    return roster.filter(player => player.position === position).length;
}

function canDraftPosition(owner, position) {
    const currentCount = getOwnerPositionCount(owner, position);
    const maxCount = rosterRules[position];
    return currentCount < maxCount;
}

function getOwnerTeamCount(owner, team) {
    const roster = draftState.completedRosters[owner] || [];
    return roster.filter(player => player.team === team).length;
}

function canDraftFromTeam(owner, team) {
    const currentCount = getOwnerTeamCount(owner, team);
    return currentCount < 1; // Max 1 player per team
}

function canDraftPlayer(owner, playerName, position) {
    // Check position limits
    if (!canDraftPosition(owner, position)) {
        return { canDraft: false, reason: `Cannot draft more ${position}s` };
    }
    
    // Find player to get team info
    const player = playerPool[position].find(p => p.name === playerName);
    if (!player) {
        return { canDraft: false, reason: 'Player not found' };
    }
    
    // Check team limits
    if (!canDraftFromTeam(owner, player.team)) {
        return { canDraft: false, reason: `Already have a player from ${player.team}` };
    }
    
    return { canDraft: true, reason: null };
}

function draftPlayer(playerName, position) {
    if (draftState.draftedPlayers[playerName]) {
        throw new Error('Player already drafted');
    }
    
    // Use comprehensive validation
    const validation = canDraftPlayer(draftState.currentDrafter, playerName, position);
    if (!validation.canDraft) {
        throw new Error(validation.reason);
    }
    
    const player = playerPool[position].find(p => p.name === playerName);
    if (!player) {
        throw new Error('Player not found in pool');
    }
    
    // Add to drafted players
    draftState.draftedPlayers[playerName] = {
        owner: draftState.currentDrafter,
        pickNumber: draftState.currentPick,
        position: position
    };
    
    // Add to draft history
    draftState.draftHistory.push({
        pick: draftState.currentPick,
        owner: draftState.currentDrafter,
        player: playerName,
        position: position,
        team: player.team
    });    // Add to owner's roster
    draftState.completedRosters[draftState.currentDrafter].push({
        name: playerName,
        team: player.team,
        position: position
    });
    
    // Update global rosters
    rosters[draftState.currentDrafter] = draftState.completedRosters[draftState.currentDrafter];
    
    // Advance to next pick
    draftState.currentPick++;
    
    if (!isDraftComplete()) {
        draftState.currentDrafter = getSnakeDraftOrder(draftState.currentPick);
    }
    
    saveDraftState();
    
    return draftState;
}

// Calculate total points for an owner (simplified version for draft completion)
function calculateOwnerTotal(owner) {
    // If playerStats is not available (typical during draft), return 0
    if (typeof playerStats === 'undefined' || !playerStats) {
        return 0;
    }
    
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

// Validation functions for existing rosters
function validateRosterTeamDiversity(roster) {
    const teamCounts = {};
    const violations = [];
    
    roster.forEach(player => {
        if (teamCounts[player.team]) {
            violations.push({
                team: player.team,
                players: [teamCounts[player.team], player.name]
            });
        } else {
            teamCounts[player.team] = player.name;
        }
    });
    
    return {
        isValid: violations.length === 0,
        violations: violations
    };
}

function validateAllRosters() {
    const results = {};
    Object.keys(rosters).forEach(owner => {
        results[owner] = validateRosterTeamDiversity(rosters[owner]);
    });
    return results;
}

function getCompleteSnakeDraftOrder() {
    const fullOrder = [];
    for (let pick = 1; pick <= totalPicks; pick++) {
        fullOrder.push({
            pick: pick,
            drafter: getSnakeDraftOrder(pick),
            round: Math.ceil(pick / draftOrder.length)
        });
    }
    return fullOrder;
}

// Load draft state on initialization
loadDraftState();

// Ensure current drafter is set correctly if no saved state
if (!draftState.currentDrafter && draftState.currentPick <= totalPicks) {
    draftState.currentDrafter = getSnakeDraftOrder(draftState.currentPick);
}
