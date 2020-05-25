# Frontend

## Instructions to run localy

If you wish to have a near deployment scenario please do the following:
- run backend localy
- in this folder, run `npm install` to install all needed dependencies
- in this folder, run `npm start`
  - BEFORE THIS IS RAN: must update the `proxy` field within the package.json to point to `localhost` and not `backend`. This will ensure socket.io reaches the backend correctly
  - if you wish to have your map rendered correctly, get a Leaflet API KEY and add the following environment variable when running: REACT_APP_LEAFLET_ACCESS_KEY