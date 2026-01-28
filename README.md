# free-notice-board
* 匿名で自由に書き込める掲示板

## Overview
An anonymous bulletin board where anyone can post messages freely without login.

## Features
- ✨ Anonymous posting (no login required)
- 📝 Simple form with Name and Description fields
- 💾 Data stored persistently in JSON file
- 🎨 Clean and responsive UI
- 🚀 Easy to setup and run

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Enter your name (optional, defaults to "Unknown")
2. Enter your message in the description field
3. Click "Post" to submit
4. Your post will appear in the posts list below

## Technical Details

- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS, JavaScript
- **Data Storage**: JSON file (`data/posts.json`)
- **Port**: 3000 (configurable via PORT environment variable)

## Project Structure
```
free-notice-board/
├── server.js          # Backend server
├── public/            # Frontend files
│   ├── index.html    # Main HTML page
│   ├── style.css     # Styling
│   └── app.js        # Frontend JavaScript
├── data/             # Data storage directory (auto-created)
│   └── posts.json    # Posts data file (auto-created)
└── package.json      # Node.js dependencies
```
