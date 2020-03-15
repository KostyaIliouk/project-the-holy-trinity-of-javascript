# Reddit API Documentation

## GET

- GET /reddit/global
  - request: {}
  - response:
    - status: 500
      - backend-error - err message will be shown showing explanation of crash
    - status: 400
      -  body: one of following, depending on root of issue
         -  must have country query param
         -  country query value must be alpha with spaces and/or apostrophes
         -  country query value is either not a country or not yet supported
    - status: 200
      - body:
          ```json
          {
            "source": str domain of website,
            "title": str title of article, 
            "description": "N/A", 
            "url": str url to the article, 
            "urlToImage": str url to related image (if available), 
            "publishedAt": str date of publishing,
            "subreddit": str name of subreddit,
            "upvotes": int,
            "downvotes": int
          }
          ```

- GET /reddit/national
  - request:
  	- query string:
  	- query string:
      - country: ISO alpha-2 country code
        - Not all countries are supported.
          Please view `./files/subreddit-support-dict.json` to view supported country codes.
  - response:
    - status: 500
      - backend-error - err message will be shown showing explanation of crash
    - status: 400
      -  body: one of following, depending on root of issue
         -  must have country query param
         -  country query value must be alpha with spaces and/or apostrophes
         -  country query value is either not a country or not yet supported
    - status: 200
      - body:
          ```json
          {
            "source": str domain of website,
            "title": str title of article, 
            "description": "N/A", 
            "url": str url to the article, 
            "urlToImage": str url to related image (if available), 
            "publishedAt": str date of publishing,
            "subreddit": str name of subreddit,
            "upvotes": int,
            "downvotes": int
          }
          ```