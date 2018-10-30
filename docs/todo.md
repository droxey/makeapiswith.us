# TODO

## Sprint 1 - MVP

### Users/User Profiles
Users will be authenticated via Github and contain:
 - display name
 - bio
 - apis
 - comments
 - emails
 - Profile Page: Will display all of users info - apis will be displayed in gallery format (Instagram-esque profile page)



### APIs
APIs will be posted by linking to your Github Repo
APIs will be uploaded by a user and display in the 4 main places:
1. Global Feed: global feed is where popular apis will be shown on a instagram/twitter style feed.
2. Explore: This is where users can search for APIs by user, api name, or tags.
3. User Portfolios: This is where a gallery of a specific users api will be displayed
4. Show Single API: Displays single API

A single API model will contain:
    - API - in form of link to Github Repo(MVP) --> (*note for self*)Look for other more appealing ways to display APIs
    - Name of API
    - User
    - API Overview
    - How To Use (pulled from README(?))
        * figure out how to scrape info from readme
    - tags
    - Comments
    - likes/favorites


### Global Feed
Global feed will be the top level feed that showcases all APIs regardless of user.

Options for sorting/display:
    - Time posted(most current)
        - the benefit to this would be easy entry, as regardless of likes on project you can upload something and instantly get eyes on it.
    - Popularity - like/favs  *Probably the better option*
        - The benefit on this would be more quality APIs seen as soon as user lands on site
### Tags
Tags will essentially be categories in our app. APIs will contain tags and users will then be able to search by tags. This will allow for easier user journey when looking for specific kinds of APIs

*Note for self*
Refer back to freelance community project for how to implement tagging.

### Comments
Comments will be how users can give feedback/comment on a users API

Comment Schema Will Contain:
    - Content
    - Author ---> Ref: User
    - (possibility- may not be relevant) Likes

### Explore Section --> Search feature
This section will allow users to search by:
    - tags
    - users
    - api name
### Likes/Favorites Feature
Users will be able to like APIs. May come into play with how APIs are displayed on the Global Feed.
