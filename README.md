# Fantasy NFL Playoff Tracker 🏈

A web-based fantasy football application for NFL playoffs featuring snake drafting, real-time scoring, and interactive leaderboards.

## What This Project Does

Run fantasy football leagues during NFL playoffs with complete draft-to-finish functionality:

- **Snake Draft System**: Interactive 6-person draft with reversing order each round
- **Live Leaderboard**: Real-time standings with total points and active player counts
- **Smart Roster Display**: Shows current drafter's roster grouped by position
- **Weekly Breakdown**: Detailed scoring for each playoff round (Wildcard, Divisional, Conference, Super Bowl)
- **Data Management**: Automatic refresh and update capabilities
- **Mobile Responsive**: Works seamlessly on all devices

## Quick Start

### For Personal Use
1. Download/clone this repository
2. Open `index.html` in your web browser
3. Click "Start Draft" to begin

### For Group Play
Deploy online (see [Deployment Guide](#deployment)) and share the URL with your league.

## How It Works

### Draft Process
- **6 rounds, 6 people**: Each person drafts 1 QB, 2 RB, 2 WR, 1 TE
- **Snake order**: Round 1 goes First→Last, Round 2 goes Last→First, etc.
- **Position-based interface**: Players organized by QB/RB/WR/TE tabs
- **Live roster view**: See your current picks while drafting

### Scoring System
- **Real playoff stats**: Points based on actual NFL playoff performance
- **Weekly updates**: Scores populate after each playoff round
- **Team elimination**: Players from eliminated teams stop scoring
- **Live refresh**: Click refresh button to get latest data

### Data Files
- `Data/draftData.js` - Available players and draft settings
- `Data/rosters.js` - Draft results (who picked whom)
- `Data/playerStats.js` - Weekly scoring data
- `Data/activeTeams.js` - Teams still in playoffs

## Customization

### Change Draft Participants
Edit `Data/draftData.js`:
```javascript
const draftOrder = ["Your Name", "Friend 1", "Friend 2", "Friend 3", "Friend 4", "Friend 5"];
```
### Update Active Teams After Each Playoff Round (Automation of this coming soon...)
Edit `Data/activeTeams.js` to remove eliminated teams:
```javascript
const activeTeams = [
    "KC",  // Kansas City Chiefs
    "PHI", // Philadelphia Eagles
    "BAL", // Baltimore Ravens
    "BUF"  // Buffalo Bills
    // Remove teams that get eliminated each week
];
```

### Update Scores (After Each Playoff Round)
Run the Python scraper or manually edit `Data/playerStats.js`:
```javascript
export default {
  "Wildcard": {
    "Player Name": 25.4,
    // ... other players
  },
  "Divisional": {
    // ... next round scores
  }
};
```

### Auto-Update Player Stats
The project includes a Python scraper for automatic data updates:

1. Install dependencies: `pip install -r requirements.txt`
2. Run scraper: `python scripts/scraper.py`
3. Updated stats saved to `Data/playerStats.js`
4. Use refresh button in app to load new data

### Export Rosters
After completing your draft, you can export the roster data:

1. Complete the draft or ensure all rosters are set
2. Click "Export Rosters" button (appears after draft completion)
3. Download the generated `rosters.js` file
4. Replace the existing `Data/rosters.js` file with your download
5. Refresh the app to see updated rosters

This is useful for:
- Backing up your draft results
- Sharing rosters with other instances of the app
- Making manual roster adjustments

## Deployment

### GitHub Pages (Recommended)
1. Fork/upload this repository to GitHub
2. Go to repository Settings → Pages
3. Select "main" branch as source
4. Share URL: `https://yourusername.github.io/playoff-fantasy`

### Netlify (Drag & Drop)
1. Visit [netlify.com](https://netlify.com)
2. Drag project folder onto Netlify
3. Get instant URL to share

### Vercel
1. Import GitHub repository to [vercel.com](https://vercel.com)
2. Auto-deploys on every commit
3. Get production URL

### Custom Server
Upload all files to any web server - no special requirements needed.

## Project Structure

```
playoff-fantasy/
├── index.html          # Main application page
├── app.js             # Core leaderboard and scoring logic
├── draft.js           # Snake draft system
├── styles.css         # Complete styling
├── Data/
│   ├── draftData.js      # Player pool and draft configuration
│   ├── rosters.js        # Draft results and team rosters
│   ├── playerStats.js    # Weekly playoff scoring data
│   └── activeTeams.js    # Teams still in playoffs
└── scripts/
    └── scraper.py        # Automated data scraping utility
```

## Technical Details

- **Pure JavaScript**: No frameworks, runs in any modern browser
- **Persistent State**: Draft progress saved in browser localStorage
- **Responsive Design**: CSS Grid and Flexbox for all screen sizes
- **Data Updates**: Dynamic import with cache-busting for fresh data

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). JavaScript must be enabled.

---

**Ready to make your NFL playoffs more exciting? Start drafting! 🏆**
