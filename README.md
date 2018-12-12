This API is currently live and hosted on Heroku: https://young-taiga-95069.herokuapp.com

# 🚧 makeapiswith.us 🚧

Are discoverable, testable, and well-documented APIs always on your mind?

Skip the API grind!

View our gallery of user-submitted APIs, test out endpoints, or submit your own today!


## API Overview
The main purpose of this API is to have a solid resource to discover quality APIs to use for your own projects or to post your own APIs so they can be discovered by others. The current build only returns a link, title, and description of an API. Other resources include comments, tags and users. 

## Getting Started
All GET request endpoints are open and can be used by anyone. But if you are trying to make modifications to any resources, such as adding an API or comments you will need to be authenticated with Github. To get authenticated simply make a GET request to https://young-taiga-95069.herokuapp.com/auth/github and login to Github.

## Using The API 
### Fetching APIs: 
When fetching APIs there are 3 endpoints to use. To return the API data from these routes simply make a fetch call or GET request to the given endpoint. 

    fetch('/apis').then(// do something ... )

This end point will return an array of all APIs (as a JSON Obj). The purpose for this endpoint is to retrieve a list of all APIs.

    fetch('/apis/:apiId').then(// do something ...)

This end point will return data for a specific API. It also populates the author and comments(as well as comments author) with the response. The url parameter is just the ID of the specific API.

    fetch('/apis/tags/:tag').then(// do something ... )

This endpoint allows you to filter the APIs being returned. The API resource contains Tags to help categorize what the given API does. Just insert a tag in the route parameter and you will be returned relevant APIs.

### Posting Your Own APIs:
If you are an authenitcated user and logged in with Github you will be able to upload your own APIs simply by making a **POST** request to **/apis**

The required information to POST an API is: 
- name
- repoLink
- description
- author (this means you are required to be logged in to post your api)

*Note* you can also edit or delete APIs that are owned by you by doing the relevant HTTP request to **/apis/:apiId** passing the _id of the API into the url.

### Posting Comments
All APIs can contain comments from other users about their experience using the specific API. To retrieve comments for a specific API, check out the section above titled *"Fetching APIs"*.

In Order to post a comment you must be authenticated and logged in through Github. To Post a comment simply make **POST** request to:

    '/apis/:apiId'

 passing the _id of a specific API into the url so the server knows what API the comment belongs too. 

*NOTE* You can also delete comments that you are the owner of. In order to do this make a **DELETE** request to:

    '/apis/:apiId/comments/:commentId'
     
notice this route requires you to pass an API Id and Comment Id so the server knows the specific comment to delete.

