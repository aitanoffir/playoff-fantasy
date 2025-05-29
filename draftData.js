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
        { name: "Lamar Jackson", team: "BAL" },
        { name: "Jalen Hurts", team: "PHI" },
        { name: "Josh Allen", team: "BUF" },
        { name: "Justin Herbert", team: "LAC" },
        { name: "Jared Goff", team: "DET" },
        { name: "Sam Darnold", team: "MIN" },
        { name: "Tua Tagovailoa", team: "MIA" },
        { name: "Russell Wilson", team: "PIT" },
        { name: "Jayden Daniels", team: "WAS" },
        { name: "Baker Mayfield", team: "TB" },
        { name: "Jordan Love", team: "GB" },
        { name: "Matthew Stafford", team: "LAR" },
        { name: "Bo Nix", team: "DEN" },
        { name: "C.J. Stroud", team: "HOU" },
        { name: "Dak Prescott", team: "DAL" },
        { name: "Kirk Cousins", team: "ATL" },
        { name: "Geno Smith", team: "SEA" },
        { name: "Aaron Rodgers", team: "NYJ" },
        { name: "Daniel Jones", team: "NYG" }
    ],
    "RB": [
        { name: "Saquon Barkley", team: "PHI" },
        { name: "Derrick Henry", team: "BAL" },
        { name: "Josh Jacobs", team: "GB" },
        { name: "James Cook", team: "BUF" },
        { name: "David Montgomery", team: "DET" },
        { name: "Aaron Jones", team: "MIN" },
        { name: "Najee Harris", team: "PIT" },
        { name: "Rachaad White", team: "TB" },
        { name: "Javonte Williams", team: "DEN" },
        { name: "Jaylen Warren", team: "PIT" },
        { name: "J.K. Dobbins", team: "LAC" },
        { name: "Brian Robinson Jr.", team: "WAS" },
        { name: "Jahmyr Gibbs", team: "DET" },
        { name: "Bijan Robinson", team: "ATL" },
        { name: "Joe Mixon", team: "HOU" },
        { name: "Kenneth Walker III", team: "SEA" },
        { name: "Tony Pollard", team: "TEN" },
        { name: "Rhamondre Stevenson", team: "NE" },
        { name: "Breece Hall", team: "NYJ" },
        { name: "Alvin Kamara", team: "NO" },
        { name: "De'Von Achane", team: "MIA" },
        { name: "Rico Dowdle", team: "DAL" },
        { name: "Chuba Hubbard", team: "CAR" },
        { name: "Tyler Allgeier", team: "ATL" },
        { name: "Jerome Ford", team: "CLE" },
        { name: "Zamir White", team: "LV" },
        { name: "Zack Moss", team: "CIN" },
        { name: "Alexander Mattison", team: "LV" }
    ],
    "WR": [
        { name: "A.J. Brown", team: "PHI" },
        { name: "Cooper Kupp", team: "LAR" },
        { name: "Stefon Diggs", team: "HOU" },
        { name: "Mike Evans", team: "TB" },
        { name: "Justin Jefferson", team: "MIN" },
        { name: "Courtland Sutton", team: "DEN" },
        { name: "Amon-Ra St. Brown", team: "DET" },
        { name: "Terry McLaurin", team: "WAS" },
        { name: "Ladd McConkey", team: "LAC" },
        { name: "Jordan Addison", team: "MIN" },
        { name: "Puka Nacua", team: "LAR" },
        { name: "Romeo Doubs", team: "GB" },
        { name: "DeVonta Smith", team: "PHI" },
        { name: "Amari Cooper", team: "BUF" },
        { name: "Ja'Marr Chase", team: "CIN" },
        { name: "Tee Higgins", team: "CIN" },
        { name: "Nico Collins", team: "HOU" },
        { name: "Tank Dell", team: "HOU" },
        { name: "Jaylen Waddle", team: "MIA" },
        { name: "Tyreek Hill", team: "MIA" },
        { name: "Chris Godwin", team: "TB" },
        { name: "Jameson Williams", team: "DET" },
        { name: "Keenan Allen", team: "CHI" },
        { name: "DJ Moore", team: "CHI" },
        { name: "Rome Odunze", team: "CHI" },
        { name: "DK Metcalf", team: "SEA" },
        { name: "Tyler Lockett", team: "SEA" },
        { name: "Garrett Wilson", team: "NYJ" },
        { name: "Davante Adams", team: "NYJ" },
        { name: "Calvin Ridley", team: "TEN" },
        { name: "DeAndre Hopkins", team: "TEN" },
        { name: "Malik Nabers", team: "NYG" },
        { name: "Darius Slayton", team: "NYG" },
        { name: "CeeDee Lamb", team: "DAL" },
        { name: "Brandin Cooks", team: "DAL" }
    ],
    "TE": [
        { name: "Travis Kelce", team: "KC" },
        { name: "Sam LaPorta", team: "DET" },
        { name: "Mark Andrews", team: "BAL" },
        { name: "George Kittle", team: "SF" },
        { name: "Brock Bowers", team: "LV" },
        { name: "Dallas Goedert", team: "PHI" },
        { name: "Kyle Pitts", team: "ATL" },
        { name: "Trey McBride", team: "ARI" },
        { name: "Evan Engram", team: "JAX" },
        { name: "Jake Ferguson", team: "DAL" },
        { name: "David Njoku", team: "CLE" },
        { name: "T.J. Hockenson", team: "MIN" },
        { name: "Jonnu Smith", team: "MIA" },
        { name: "Pat Freiermuth", team: "PIT" },
        { name: "Tyler Higbee", team: "LAR" },
        { name: "Dalton Kincaid", team: "BUF" },
        { name: "Hunter Henry", team: "NE" },
        { name: "Cole Kmet", team: "CHI" },
        { name: "Zach Ertz", team: "WAS" },
        { name: "Tucker Kraft", team: "GB" }
    ]
};

// Draft state - will be managed in localStorage
let draftState = {
    isActive: false,
    isPaused: false,
    currentPick: 1,
    currentDrafter: draftOrder[0],
    draftedPlayers: {}, // playerName: { owner, pickNumber, position }
    draftHistory: [], // array of picks in order
    completedRosters: {} // owner: array of players
};

// Total picks calculation
const totalPicks = draftOrder.length * Object.values(rosterRules).reduce((sum, count) => sum + count, 0);

// Helper functions for draft management
function initializeDraft() {
    draftState = {
        isActive: true,
        isPaused: false,
        currentPick: 1,
        currentDrafter: draftOrder[0],
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
        currentDrafter: draftOrder[0],
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
    });
      // Add to owner's roster
    draftState.completedRosters[draftState.currentDrafter].push({
        name: playerName,
        team: player.team,
        position: position
    });
    
    // Ensure player exists in playerStats for scoring
    if (!playerStats[playerName]) {
        playerStats[playerName] = {
            team: player.team,
            weeklyPoints: {
                "Wildcard": 0,
                "Divisional": 0,
                "Conference": 0,
                "Super Bowl": 0
            }
        };
    }
    
    // Update global rosters
    rosters[draftState.currentDrafter] = draftState.completedRosters[draftState.currentDrafter];
    
    // Advance to next pick
    draftState.currentPick++;
    
    if (!isDraftComplete()) {
        const currentDrafterIndex = draftOrder.indexOf(draftState.currentDrafter);
        const nextDrafterIndex = (currentDrafterIndex + 1) % draftOrder.length;
        draftState.currentDrafter = draftOrder[nextDrafterIndex];
    }
    
    saveDraftState();
    
    return draftState;
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

// Load draft state on initialization
loadDraftState();
