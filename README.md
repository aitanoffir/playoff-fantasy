# 🏈 Fantasy NFL Playoff Tracker

> **Play fantasy even after the season is over!**

A comprehensive fantasy football application specifically designed for NFL playoff tracking, featuring live drafting, real-time scoring, and advanced team management capabilities.

![Fantasy NFL Playoff Tracker](https://img.shields.io/badge/Fantasy-NFL%20Playoffs-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange)
![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)

---

## 🌟 Features

### 🎯 **Live Draft System**
- **Complete Draft Interface**: Modal-based drafting with position tabs (QB, RB, WR, TE)
- **Player Pool**: All relevant offensive skill players across all playoff teams
- **Sequential Drafting**: 6-owner draft order with automatic turn advancement
- **Team Diversity Rule**: Maximum 1 player per NFL team per roster
- **Draft Controls**: Start, Pause, Resume, Reset functionality
- **Progress Tracking**: Real-time draft status and pick history
- **State Persistence**: Draft progress saved in localStorage

### 📊 **Scoring & Leaderboards**
- **Dynamic Leaderboard**: Real-time ranking based on total points
- **Weekly Breakdown**: Expandable weekly scoring details
- **Active/Eliminated Status**: Track players still in the playoffs
- **Visual Indicators**: Color-coded rankings and elimination status

### 🛠 **Data Management**
- **Export Functionality**: Download rosters and player stats as JavaScript files
- **Backup & Restore**: Complete data export for version control
- **Roster Validation**: Automated position and team limit checking
- **Score Preservation**: Maintains existing weekly points during exports

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-friendly interface
- **Smooth Animations**: CSS transitions and hover effects
- **Visual Feedback**: Clear status indicators and progress bars
- **Intuitive Controls**: Easy-to-use buttons and navigation

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs locally in browser

### Installation
1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Start drafting** or view existing leaderboards

```bash
# Optional: Serve with a local server for better development
python -m http.server 8000
# or
npx serve .
```

---

## 📁 Project Structure

```
playoff-fantasy/
├── index.html              # Main application entry point
├── app.js                  # Core leaderboard and scoring logic
├── draft.js                # Complete draft system functionality
├── styles.css              # All styling and animations
├── Data/
│   ├── draftData.js        # Player pool and draft configuration
│   ├── rosters.js          # Team rosters (can be drafted or pre-set)
│   └── playerStats.js      # Player statistics and weekly scores
├── README.md               # Project documentation
├── EXPORT_GUIDE.md         # Data export instructions
└── .gitignore              # Git ignore file
```

---

## 🎮 How to Use

### Starting a New Draft

1. **Click "Start Draft"** in the header
2. **Select position tab** (QB, RB, WR, TE) in the draft modal
3. **Choose a player** from the available pool
4. **Draft automatically advances** to the next owner
5. **Continue until all rosters are complete** (1 QB, 2 RB, 2 WR, 1 TE per team)

### Draft Rules & Restrictions

- **Position Limits**: Each roster must have exactly 1 QB, 2 RB, 2 WR, 1 TE
- **Team Diversity**: Maximum 1 player per NFL team per roster
- **Sequential Order**: Draft follows predetermined owner order
- **No Duplicates**: Each player can only be drafted once

### Viewing Results

- **Leaderboard**: See real-time rankings and total points
- **Weekly Breakdown**: Expand sections to view detailed scoring
- **Player Status**: Active players highlighted, eliminated players grayed out
- **Owner Details**: Click "View Details" for complete roster information

### Exporting Data

1. **Complete your draft** or use existing rosters
2. **Click "Export Rosters"** to download team compositions
3. **Click "Export Stats"** to download player statistics
4. **Follow [EXPORT_GUIDE.md](EXPORT_GUIDE.md)** for file replacement instructions

---

## 🏗️ Technical Implementation

### Core Technologies
- **Pure JavaScript (ES6+)**: No frameworks, modern syntax
- **HTML5 Semantic Elements**: Proper document structure
- **CSS3 Grid & Flexbox**: Responsive layout system
- **LocalStorage API**: Client-side state persistence

### Key Components

#### Draft System (`draft.js`)
- Modal interface with position-based tabs
- Player card rendering with team restrictions
- Draft state management and validation
- Export functionality for data persistence

#### Scoring Engine (`app.js`)
- Dynamic leaderboard calculation
- Weekly breakdown rendering
- Active/eliminated player tracking
- Sortable columns and expandable sections

#### Data Structure (`Data/`)
- **`draftData.js`**: Player pool with positions and teams
- **`rosters.js`**: Owner roster assignments
- **`playerStats.js`**: Weekly scoring data with team affiliations

#### Styling (`styles.css`)
- CSS custom properties for theming
- Responsive grid layouts
- Smooth animations and transitions
- Visual feedback for user interactions

---

## 🎨 UI Features

### Draft Interface
- **Position Tabs**: Clear navigation between QB, RB, WR, TE
- **Player Cards**: Photo placeholders, names, teams, positions
- **Restriction Indicators**: Visual feedback for draft limitations
- **Progress Tracking**: Current pick, remaining spots, draft history

### Leaderboard Display
- **Dynamic Rankings**: Real-time position updates
- **Color Coding**: Top 3 positions highlighted
- **Status Indicators**: Active/eliminated player counts
- **Expandable Details**: Weekly scoring breakdowns

### Responsive Design
- **Mobile Optimized**: Touch-friendly interfaces
- **Desktop Enhanced**: Hover effects and larger layouts
- **Cross-Browser**: Compatible with modern browsers

---

## 🔧 Customization

### Adding Players
Edit `Data/draftData.js` to add new players to the pool:

```javascript
"QB": [
    { name: "New Quarterback", team: "NFL_TEAM" },
    // ... existing players
]
```

### Modifying Draft Order
Update the `draftOrder` array in `Data/draftData.js`:

```javascript
const draftOrder = ["Owner1", "Owner2", "Owner3", "Owner4", "Owner5", "Owner6"];
```

### Changing Roster Rules
Modify `rosterRules` in `Data/draftData.js`:

```javascript
const rosterRules = {
    QB: 1,   // Quarterbacks
    RB: 2,   // Running Backs  
    WR: 2,   // Wide Receivers
    TE: 1    // Tight Ends
};
```

### Updating Weekly Scores
Edit `Data/playerStats.js` after each playoff round:

```javascript
"Player Name": {
    team: "NFL_TEAM",
    weeklyPoints: {
        "Wildcard": 25.4,
        "Divisional": 18.7,
        "Conference": 0,
        "Super Bowl": 0
    }
}
```

---

## 📊 Data Export System

The application includes a comprehensive export system for data persistence:

### Export Features
- **Roster Export**: Download complete team compositions
- **Stats Export**: Download player statistics with scoring data
- **Data Validation**: Ensures exported data maintains proper structure
- **Backup Creation**: Generate backups before major changes

### Export Process
1. Complete draft or modify existing rosters
2. Use export buttons in interface
3. Replace original data files with downloads
4. Refresh application to see changes

*See [EXPORT_GUIDE.md](EXPORT_GUIDE.md) for detailed instructions.*

---

## 🙏 Acknowledgments

- **NFL Teams & Players**: Data sourced from public NFL information
- **Fantasy Sports Community**: Inspiration for scoring and drafting systems
- **Modern Web Standards**: Built with current best practices

---

**Built with ❤️ for fantasy football enthusiasts who can't get enough of the game!**
