# API documentation

## GET

<<<<<<< HEAD
- GET /newsapi/topHeadlines
=======
- GET /newsapi/getHeadlines
>>>>>>> a3178e71f393b141a6ccdf7bc0dffe98b388130c
  - request
    - query string:
      - country: country_name
        - Not all countries are supported.
          Please view `./files/newsapi-support-files.json` to view supported country names.
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
            "description": str of the description of the article, 
            "url": str url to the article, 
            "urlToImage": str url to related image, 
            "publishedAt": str date of publishing
          }
          ```