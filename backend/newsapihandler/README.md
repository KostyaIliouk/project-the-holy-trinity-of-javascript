# API documentation

## GET

 - GET /newsapi/topHeadlines
   - request
     - query string:
       - country: country_name
         - Not all countries are supported.
           Please view `./files/newsapi-support-files.json` to view supported country names.
   - response:
     - status: 500
       - backend-error
     - status: 200
       -  // TODO: finish this document