# Export Guide for Draft System

## How to Save Your Drafted Rosters

After completing a draft, you can export your results to update your source files:

### 1. Export Drafted Rosters
- Click **"Export Rosters"** button (appears after draft completion)
- Downloads `rosters.js` file with your drafted teams
- **Replace your original `Data/rosters.js` with this file**

### 2. Export Player Stats
- Click **"Export Stats"** button
- Downloads `playerStats.js` file with **only rostered players** included
- **Preserves existing weekly scores** for players who already have data
- **Adds default 0 scores** for newly drafted players
- **Replace your original `Data/playerStats.js` with this file**

### 3. Update Your Files
1. **Backup originals first** (rename them to `rosters.js.backup`, etc.)
2. **Move downloaded files** to your `Data/` folder
3. **Refresh your website** - it will now use the new rosters permanently

### 4. Update Weekly Scores
After each playoff round, manually edit the downloaded `playerStats.js` file to add weekly scores:

```javascript
"Patrick Mahomes": {
    team: "KC",
    weeklyPoints: {
        "Wildcard": 0,     // Update these values
        "Divisional": 25.4, // with actual scores
        "Conference": 30.2,
        "Super Bowl": 0
    }
}
```

## Benefits of Exporting

✅ **Permanent Storage** - Rosters saved to files, not just browser  
✅ **Backup Safety** - Can restore if localStorage is cleared  
✅ **Version Control** - Can commit changes to Git  
✅ **Sharing** - Can share roster files with others  
✅ **Clean Player Stats** - Only includes rostered players, no unused data  
✅ **Preserves Scoring** - Keeps existing weekly points for all players  
✅ **Modular Design** - Separate files for teams, rosters, and scoring data

## Managing Active Teams

The `Data/activeTeams.js` file contains the list of teams still in playoffs:
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
