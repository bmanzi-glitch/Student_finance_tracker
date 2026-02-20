# Student Finance Tracker

## Overview
**Student Finance Tracker** is a responsive, accessible web application designed to help students manage their finances efficiently. Users can track transactions, categorize expenses, search with advanced regex patterns, and monitor spending trends. The app emphasizes accessibility (a11y), mobile-first design, and data persistence with `localStorage`.  

**Theme:** Student Finance Tracker  
**Technologies:** HTML, CSS, JavaScript (Vanilla ES Modules), JSON, localStorage  

---

## Features

### Core Features
- **Dashboard / Stats:** View total records, total expenditure, top category, and last-7-days trend chart.  
- **Records Table / Cards:** Display transactions as a sortable table (desktop) or responsive cards (mobile).  
- **Add/Edit Transaction:** Inline edit or form submission; validate with regex before saving.  
- **Delete Transaction:** Confirm deletion with UI update and persistence.  
- **Settings:** Configure base currency and additional currencies; set manual conversion rates.  
- **Import / Export JSON:** Validate structure before importing/exporting data.  
- **Regex Search:** Live search with safe regex compilation and accessible match highlighting.  
- **Cap / Target:** Set a spending cap and monitor remaining or exceeded amounts with ARIA live updates.  

---

## Data Model
```json
{
  "id": "txn_0001",
  "description": "Lunch at cafeteria",
  "amount": 12.50,
  "category": "Food",
  "date": "2025-09-29",
  "createdAt": "2025-09-29T12:00:00Z",
  "updatedAt": "2025-09-29T12:00:00Z"
}
id: Unique identifier for each transaction
description: Transaction name or details
amount: Numeric value (currency)
category: Predefined or custom category (Food, Books, Transport, Entertainment, Fees, Other)
date: Transaction date (YYYY-MM-DD)
createdAt / updatedAt: Timestamps for record creation and modification


Keyboard Navigation & Accessibility (a11y)
Semantic landmarks: <header>, <nav>, <main>, <section>, <footer>
Skip-to-content link for keyboard users
Form labels bound to inputs
Visible focus indicators for all interactive elements
Status messages via role="status" and aria-live
Color contrast meets WCAG 2.1 AA standards
Fully operable via keyboard, including table sorting, editing, and deletion`

Responsive Design

Mobile-first: Designed for small screens (~360px) and scales up
Breakpoints: ~360px (mobile), 768px (tablet), 1024px (desktop)
Flexbox and media queries ensure clean layout at all sizes
Subtle transitions and animations for hover/focus states

Stats Dashboard

Total Records: Count of all transactions
Sum of Amounts: Total expenditure
Top Category: Most used category in last 30 days
Last 7 Days Trend: Simple CSS/JS bar chart of daily spending
Spending Cap: User-defined limit; remaining or exceeded amount announced with ARIA live

Import / Export JSON

JSON structure validated before loading
Safe handling of malformed data
Allows users to back up or restore transaction history

Currency / Units

Base currency + 2 optional currencies
Manual conversion rates (no API)
Amount displayed in selected currency

How to Run

Clone the repository:
git clone <repo_url>
cd <repo_folder>
Open index.html in any modern browser
Add, edit, delete transactions or test search / regex patterns
Use Settings to configure currencies or caps

Import/export data via JSON buttons
Seed Data
seed.json includes 10+ diverse transactions, including:
Edge dates (past/future)
Small/large amounts
Duplicate words and tricky descriptions

Testing

Open tests.html for basic assertions of regex validation and storage
Ensure safe regex search does not break the app

Demo Video

2–3 minute demo showcasing:
Keyboard navigation
Regex edge cases
Sorting, filtering, and highlighting
Import/export functionality
Responsive behavior

Credits

Developed by Eddy Bruce Manzi
GitHub: github.com/bmanzi-glitch
Email: bmanzi@alustudent.com

