# GitHub Actions Automation

This project includes automated data scraping for the Fantasy NFL Playoff Tracker using GitHub Actions.

## 🤖 Automated Workflow

The workflow (`.github/workflows/update-stats.yml`) automatically:

1. **Runs on NFL playoff days** during January-February:
   - Sundays at 8 AM ET (13:00 UTC)
   - Mondays at 8 AM ET (13:00 UTC) 
   - Tuesdays at 8 AM ET (13:00 UTC)

2. **Scrapes player stats** from FantasyData.com using `scripts/scraper.py`

3. **Stops at first 0.0 score** to avoid unnecessary data and keep file sizes small

4. **Only commits changes** when `playerStats.js` actually changes (no empty commits)

5. **Provides detailed logging** including file size and modification summary

## 🚀 Manual Trigger

You can also manually trigger the workflow:

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Update Playoff Stats** workflow
4. Click **Run workflow** button

## 📊 What Gets Updated

- `Data/playerStats.js` - Fantasy points for all playoff rounds
- Automatic git commit with timestamp: `🏈 Auto-update playoff stats - YYYY-MM-DD HH:MM UTC`

## 🔧 Scoring Logic

- Players with no score for a week automatically get 0 points
- Scraper stops at first 0.0 score to optimize data collection
- Data organized by playoff rounds: Wildcard, Divisional, Conference, SuperBowl

## 📋 Dependencies

The workflow automatically installs Python dependencies from `requirements.txt`:
- beautifulsoup4
- requests
- Other required packages for web scraping

## ⚡ Performance Features

- **Change detection**: Only commits when data actually changes
- **Early termination**: Stops scraping when hitting 0.0 scores
- **Error handling**: Workflow fails gracefully if scraping fails
- **Detailed logging**: Shows file sizes and modification times
