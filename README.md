# The Holy Trinity of JavaScript

## [trendmap.live](https://trendmap.live)
## [demo video](https://www.youtube.com/watch?v=1IyRNwhjpbg)

## Members
* Mohammad Moustafa
* Kanstantsin Ilioukevitch
* Hessamoddin Sharifpour

## App Description
A desktop web app for getting the most recent news stories for each country. Users can explore an interactive map and click on any country to get the most recent news for that country. News headlines and articles will be gathered from trusted local and global news websites as well as their respected subreddit.

## Key Features
1. An interactive map
2. News from trusted websites for supporting countries
3. Top posts from countries' subreddit
4. Caching all endpoint data multiple times throughout the day using Redis Workers to Redis
5. Communicating between Frontend and Backend using Socket.io to fetch Redis

## Technologies
### Frontend
- React
- Leaflet
- Mapbox
- Material UI
### Backend
- NodeJS
- Redis
- Socket.io
- NewsAPI
- RedditAPI
### Deployment
- Docker
- NGINX
- DigitalOcean
- LetsEncrypt

## How we used each technology?
### React
The frontend is built using React in order to serve a responsive single page application. The page is broken down into several components, each pieced together to produce a well designed frontend. We also make use of the Material UI framework for designing the frontend.

### Map (Leaflet and Mapbox)
Leaflet is used for the map implementation alongside Mapbox for the map style. We used [Interactive Choropleth Map from leaflet official tutorial](https://leafletjs.com/examples/choropleth/) to achieve map highlighting functionality combined with [Natural Earth](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/) to retrieve every country's borders for the polygon layers on top of each country (For the highlighting and clicking) as well as information such as alpha-2 codes for the NewsAPI.

### NodeJS
Our backend server is built off of NodeJS, more specifically off of the express framework.

### Redis
We use Redis to cache all possible enpoints to our backend. This is two ensure two things: that our data fetching between frontend/backend is not an issue (as we do not need to query any API directly), as well as, to ensure that we do not go over any API call limits that exist. The communication between Redis and our backend is done through the NodeRedis framework. Lastly, our backend automatically updates our cached data within Redis using the bull framework, which sets up Redis Workers to handle and complete recurring update jobs. When these jobs are being processed, is when the data querying to the used APIs occur. NewsAPI is queried every three hours, and RedditAPI is querried per hour.

### NewsAPI and RedditAPI
#### Reddit API
The Reddit API is used to retrieve the top posts by subreddit for whichever country the user selects. We keep a json file that maps 237 alpha2 country codes to each country's most popular subreddit. Using the alpha2 codes that we get from the map, we locate the appropriate subreddit and query the official Reddit api to get the top posts. We do filter out some results (such as reddit self posts) so that that quality of information stays good.
#### NewsAPI
The News API is used to retrieve localy trending news stories within a certain country. The API supports 52 countries which are querriable through an alpha-two code. In order to query the API we used their supported node NewsAPI framework. We have a list of all countries that are supported, this list is then used to create a repeating job to query the API for each possible country.

### Socket.io
Socket.io was used for the communication between the Frontend and Backend. When a user loads the web app, they automatically get connected the Backend and assigned an id. When the user click on a country, they broadcast the country's alpha-2 code to the Backend. The Backend then gets the news data from redis and broadcasts it back to the user.

### Deployment (Docker, NGINX and DigitalOcean)
Our web-app is deployed on a DigitalOcean droplet. To deploy our app is fairly simple, given that you have access to the domain, a LetsEncrypt certificate & a Diffie-Hellman keypair, all that is required is to build and run the docker-compose file that is found in this directory. To start off a Redis container is built using our dummy database for preliminary data. Afterwards, our backend server is deployed on a Node container within the same docker network as our Redis container. Afterwards, a temporary Node container is used to build our frontend into static files which is saved to a volume. This volume is then used in a Nginx container - again on the same docker network - along with three other volumes containing our certificates and Diffie-Hellman key. A certbot container is used reccurently to re-certify our LetsEncrypt certificate using a cron job.
