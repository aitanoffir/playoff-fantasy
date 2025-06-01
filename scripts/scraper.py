# scripts/scraper.py
# Scrapes fantasy football data and stops at first 0.0 score to avoid unnecessary data
# Scoring logic: if a player doesn't have a score for a week, they get 0 points

import requests
from bs4 import BeautifulSoup
import json
import time

# ─── CONFIG ────────────────────────────────────────────────────────────────────

# Map playoff rounds to the week numbers FantasyData expects
PLAYOFF_WEEKS = {
    "Wildcard":   1,
    "Divisional": 2,
    "Conference": 3,
    "SuperBowl":  4
}

BASE_URL = "https://fantasydata.com/nfl/fantasy-football-leaders"

COMMON_PARAMS = {
    "scope":     "game",
    "sp":        "2024_POST",
    "week_from": 1,    # placeholder, replaced per round
    "week_to":   1,    # same as week_from
    "position":  "offense",
    "scoring":   "fpts_ppr",
    "order_by":  "fpts_ppr",
    "sort_dir":  "desc"
}

OUTPUT_PATH = "Data/playerStats.js"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/114.0.0.0 Safari/537.36"
    )
}


def fetch_week_points(week_num):
    """
    Fetch player → fpts_ppr for a single week.
    Returns a dict: { player_name: float_points }.
    """
    # 1) Build params for this week
    params = COMMON_PARAMS.copy()
    params["week_from"] = week_num
    params["week_to"]   = week_num

    resp = requests.get(BASE_URL, params=params, headers=HEADERS)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    # 2) Locate the <table class="stats csv xls ">
    table = soup.find("table", class_="stats")
    if not table:
        raise RuntimeError(f"No table found for week {week_num}")

    # 3) Find the second header row to identify column positions
    header_rows = table.find("thead").find_all("tr", class_="header")
    if len(header_rows) < 2:
        raise RuntimeError("Unexpected header structure (need at least 2 <tr class='header'>).")

    # Extract the ordered list of data-ids from that second header row:
    column_keys = [th["data-id"] for th in header_rows[1].find_all("th")]

    # Determine the two indices we care about:
    #   - "player" index
    #   - "fpts_ppr" index
    try:
        idx_player = column_keys.index("player")
        idx_fpts    = column_keys.index("fpts_ppr")
    except ValueError:
        raise RuntimeError("Could not find 'player' or 'fpts_ppr' in column headers.")    # 4) Iterate each row in <tbody> and capture only name & points
    # Stop when we hit the first player with 0.0 points
    week_points = {}
    for row in table.find("tbody").find_all("tr"):
        cols = row.find_all("td")
        if not cols or len(cols) != len(column_keys):
            continue

        name = cols[idx_player].get_text(strip=True)
        fpts_text = cols[idx_fpts].get_text(strip=True)
        try:
            fpts_val = float(fpts_text) if fpts_text != "" else 0.0
        except ValueError:
            fpts_val = 0.0

        # Stop when we hit the first 0.0 score
        if fpts_val == 0.0:
            print(f"  Stopping at first 0.0 score: {name}")
            break

        week_points[name] = fpts_val

    return week_points


def main():
    all_rounds = {}
    for round_name, wk in PLAYOFF_WEEKS.items():
        print(f"Scraping {round_name} (week={wk})…")
        try:
            all_rounds[round_name] = fetch_week_points(wk)
        except Exception as e:
            print(f"  Error on week {wk}: {e}")
            all_rounds[round_name] = {}
        time.sleep(0.5)

    # 5) Write out as an ES module: playerName → points
    with open(OUTPUT_PATH, "w") as f:
        f.write("export default ")
        json.dump(all_rounds, f, indent=2)
        f.write(";")

    print(f"Wrote data for {len(PLAYOFF_WEEKS)} rounds to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
