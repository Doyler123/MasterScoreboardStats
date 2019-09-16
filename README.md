# MasterScoreboardStats
Chrome extension for Stats based on MasterScoreboard's Hole By Hole analysis page.

Cretaed with create-react-app.

The frontend folder contains the create-react-app App code and chrome extension configurations

The folder frontend > public is where the chrome extension code is located.

The backend foler contains some code for scraping html from the masterscoreboard to get the app data, this is not used with the chrome extension

To build the chrome extension uncomment the Chrome extension code in App.js and comment out the Static data section. Then run: npm run build

Reload the chrome extension from chrome://extensions/ then visit the hole by hole analysis page on masterscoreboard.
