# API documentation

## GLOBAL

Returns global news.

ON global
- request: {}
- response:
  - status: 500
      - backend-error: err message will be shown showing explanation of crash
  - status: 200
      - body:
          ```json
          [{
            "source": "reddit",
            "data": [
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
                },...]
          },
          {
            "source": "newsapi",
            "data": null
          }]
          ```



## FETCH

Returns the data for a given country

ON fetch
- request: {}
- response:
  - status: 500
      - backend-error: err message will be shown showing explanation of crash
  - status: 200
      - body:
          ```json
          [{
            "source": "reddit",
            "data": [
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
                },...]
          },
          {
            "source": "newsapi",
            "data": {   
                    "source": str domain of website,
                    "title": str title of article, 
                    "description": "N/A", 
                    "url": str url to the article, 
                    "urlToImage": str url to related image (if available), 
                    "publishedAt": str date of publishing
                },...]
          }]
          ```
