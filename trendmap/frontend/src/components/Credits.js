import React from "react";
import Popup from "reactjs-popup";
 
export const Credits = props => (
  <Popup
    trigger={props.CreditsButton}
    modal
    closeOnDocumentClick>
    <div className="credits">
      <div className="credits-header">
        <h1>Credits</h1>
      </div>
      <div className="credits-body">
        <h3>Frontend</h3>
        <ul>
          <li>Powered by <a href="https://reactjs.org/" title="React">React</a></li>
          <li>Map by <a href="https://leafletjs.com/" title="LeaftLet">LeaftLet</a>
            <ul>
              <li>Map Style by <a href="https://mapbox.com/" title="Mapbox">Mapbox</a></li>
              <li>Country json data retrieved from <a href="https://www.naturalearthdata.com/downloads/50m-cultural-vectors/" title="Natural Earth">Natural Earth</a></li>
              <li>Map Highlighting function from <a href="https://leafletjs.com/examples/choropleth/" title="LeafLet Interactive Choropleth Map Tutorial">LeafLet Interactive Choropleth Map Tutorial</a></li>
            </ul>
          </li>
          <li><a href="https://material-ui.com/" title="Material UI">Material UI</a></li>
        </ul>
        <h3>Backend</h3>
        <ul>
          <li>Powered by <a href="https://nodejs.org/" title="NodeJs">NodeJs</a></li>
          <li><a href="https://newsapi.org/" title="NewsAPI">NewsAPI</a></li>
          <li><a href="http://code.reddit.com/" title="RedditAPI">RedditAPI</a></li>
          <li><a href="https://redis.io/" title="Redis">Redis</a>
            <ul>
              <li>Bull <a href="https://github.com/OptimalBits/bull/" title="Bull Documentation">Documentation</a></li>
              <li>Bull <a href="https://optimalbits.github.io/bull/" title="Bull Tutorial">Tutorial</a></li>
            </ul>
          </li>
          <li><a href="https://socket.io/" title="Socket.io">Socket.io</a>
            <ul>
              <li>Socket.io <a href="https://dev.to/captainpandaz/a-socket-io-tutorial-that-isn-t-a-chat-app-with-react-js-58jh/" title="Socket.io Tutorial">Tutorial</a></li>
            </ul>
          </li>
          <li>CSCC09 <a href="https://thierrysans.me/CSCC09/" title="CSCC09 Assignments">Assignments</a></li>
        </ul>
        <h3>Deployment</h3>
        <ul>
          <li><a href="https://www.docker.com/" title="Docker">Docker</a>
            <ul>
              <li><a href="https://docs.docker.com/" title="Docker Documentation">Documentation</a></li>
            </ul>
          </li>
          <li><a href="https://www.nginx.com/" title="NGINX">NGINX</a>
            <ul>
              <li>NodeJs Deployment with NGINX and SSL <a href="https://www.youtube.com/watch?v=oykl1Ih9pMg/" title="NGINX Tutorial">Tutorial</a></li>
            </ul>
          </li>
          <li><a href="https://www.digitalocean.com/" title="DigitalOcean">DigitalOcean</a>
            <ul>
              <li><a href="https://www.digitalocean.com/docs/" title="DigitalOcean Documentation">Documentation</a></li>
              <li><a href="https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose/" title="DigitalOcean Tutorial">Tutorial</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </Popup>
);

export default Credits;