# Export Guide for Draft System

## How to Save Your Drafted Rosters

After completing a draft, you can export your results to update your source files:

### 1. Export Drafted Rosters
- Click **"Export Rosters"** button (appears after draft completion)
- Downloads `rosters.js` file with your drafted teams
- **Replace your original `Data/rosters.js` with this file**

### 2. Player Stats Management
**Note**: Player stats are **NOT exportable** from the draft system. The `playerStats.js` file is generated via web scraping and should be updated through that process.

- Player stats are organized by week: `stats.Wildcard["Player Name"]`
- The draft system only handles roster management
- Stats data is kept separate to maintain clean data separation

### 3. Update Your Files
1. **Backup originals first** (rename them to `rosters.js.backup`)
2. **Move downloaded rosters file** to your `Data/` folder
3. **Refresh your website** - it will now use the new rosters permanently

### 4. Weekly Score Updates
Player stats are maintained separately from the draft system and should be updated via web scraping or manual editing of the `playerStats.js` file:

```javascript
export default {
  "Wildcard": {
    "Patrick Mahomes": 25.4,   // Update these values
    "Josh Allen": 18.7,        // or manual entry
    "Lamar Jackson": 30.2,
    // ... other players
  },
  "Divisional": {
    "Patrick Mahomes": 22.1,   // Update after divisional round
    "Josh Allen": 15.3,
    // ... other players
  },
  "Conference": {
    "Patrick Mahomes": 0,      // Update after conference championship
    "Josh Allen": 0,
    // ... other players
  },
  "SuperBowl": {
    "Patrick Mahomes": 0,      // Update after Super Bowl
    "Josh Allen": 0,
    // ... other players
  }
};
```

## Benefits of Exporting Rosters

✅ **Permanent Storage** - Rosters saved to files, not just browser  
✅ **Backup Safety** - Can restore if localStorage is cleared  
✅ **Version Control** - Can commit changes to Git  
✅ **Sharing** - Can share roster files with others  
✅ **Modular Design** - Separate files for teams, rosters, and scoring data

## Data Separation Architecture

### Rosters (rosters.js) - Exportable
- Contains player names, positions, and team assignments
- Managed by the draft system
- Exported after draft completion

### Player Stats (playerStats.js) - External
- Contains weekly scoring data organized by week
- Generated via web scraping or manual entry
- **Not** managed by the draft system

### Active Teams (activeTeams.js) - Manual
- Contains list of teams still in playoffs
- **Edit manually** as teams get eliminated throughout playoff rounds
- **Not exportable** - intended to be manually maintained  
- Used to determine which players are still active vs. eliminated

## File Locations After Export

- Downloaded files go to your **Downloads** folder
- Move them to: `c:\Users\Aitan Offir\Desktop\VS Code\playoff-fantasy\Data\`
- Replace the existing files

**Note**: The export feature generates JavaScript files that are identical in format to your original files, so they integrate seamlessly with your existing system.

## Draft Rules & Restrictions

### Team Diversity Rule
- **Maximum 1 player per NFL team per roster**
- Prevents drafting multiple players from the same team
- Visual indicators show "Team Limit" when trying to draft from an already-used team
- Team usage is displayed in the roster status during drafting

### Position Limits
- QB: 1 player maximum
- RB: 2 players maximum  
- WR: 2 players maximum
- TE: 1 player maximum
