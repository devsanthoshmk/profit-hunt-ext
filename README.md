# Profit Hunter Eval: Neostox trade evaluator Chrome extension

Profit Hunter Eval is a Manifest V3 Google Chrome extension that evaluates simulated trades and rule compliance on Neostox paper trading tables.

## Purpose

Profit Hunter Eval inspects completed order records on the Neostox virtual trading platform, calculates total buy investment, total sell value, and net profit or loss, and checks trades against competition rules.

## Architecture

The extension consists of three components:

1. Manifest specification (`manifest.json`): Configures a Manifest V3 browser action with permissions for `tabs`, `activeTab`, and `scripting`.
2. Content script (`scripts/content.js`): Queries the completed orders table element (`#div_completeorders table`) in the active webpage DOM, parses execution rows, sums buy investments and sell returns, checks traded ticker symbols against an approved list, and returns calculated results through `chrome.runtime.onMessage`.
3. Extension popup UI (`popup/hello.html`, `popup/popup.js`, `popup/particles.js`): Queries the active tab on load, renders total invested capital and net profit or loss, and unlocks restricted metrics (disqualified stock list and total trade count) behind password verification.

## Setup

1. Clone or download the repository to your local machine.
2. Open Google Chrome or any Chromium browser and navigate to `chrome://extensions`.
3. Enable developer mode by turning on the toggle switch in the upper right corner.
4. Click the load unpacked button in the top toolbar.
5. Select the `/tmp/opencode/repos/profit-hunt-ext` folder or your local cloned directory.

## Usage

1. Open your browser and navigate to your Neostox trade panel.
2. Make sure completed orders appear under the completed orders table (`#div_completeorders table`).
3. Click the Profit Hunter Eval icon in the Chrome toolbar.
4. Review the initial summary:
   - Total amount invested (marked with a check mark if under or equal to 200000, or a cross mark if over 200000).
   - Net profit or loss.
5. To view detailed compliance metrics, click the fetch data button to open the password prompt.
6. Enter the evaluation passcode to display the list of disqualified stocks and total completed trades.
   - Traded symbols outside the approved list (RELIANCE INDUSTRIES, ADANI ENTERPRISES, STATE BANK OF INDIA, HDFC BANK, TECH MAHINDRA, TATA MOTORS) appear in the stocks row.
   - Total trades over 10 receive a cross mark; 10 or fewer receive a check mark.

## Configuration

- Approved stocks: Edit the allowed stock array in `scripts/content.js` line 19. The default allowed stock symbols are:
  - RELIANCE INDUSTRIES
  - ADANI ENTERPRISES
  - STATE BANK OF INDIA
  - HDFC BANK
  - TECH MAHINDRA
  - TATA MOTORS
- Investment threshold: Edit the 200000 limit in `popup/popup.js` line 24.
- Maximum trade count: Edit the 10 trade limit in `popup/popup.js` line 34.
- Popup password: Edit `correctPassword` in `popup/popup.js` line 65 (default: `traderstechvista`).
