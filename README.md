Chat App

------------How to install------------

1) clone the github repo
2) cd in the 'client' folder and run 'npm i' in the terminal
3) cd in the 'api' folder and do the same
4) To run the frontend server, run the command 'npm run dev' in 'client' directory
5) To run the backend server, run the command 'node app' in 'api' directory
6) Go to 'http://localhost:5173' in preferred browser

------------Features------------

1) Authentication using cookies
2) All routes are protected except /login and /register
3) Users can upload posts which are visible to all the users
4) Users can also like posts uploaded by them and other users
5) Users can chat with other users
6) Online indicator
7) Users can send attachments in addition to text messages

------------Future Improvements------------

1) Mobile support
2) Cross-browser testing
3) Preview attachments inside the app
4) Functionality to search for other users (with debounce)
5) Infinite scrolling in the 'Feed' section with lazy loading
6) Deleting and editing messages
7) Blocking users