## Project: Blog API

Link to Frontend: https://github.com/BenPhillips-21/blogFrontend

This repository comprises the API/backend of the 'On Exploration' Blog project. The app serves as the engine to power the communication between the frontend and the server. This app is created with MongoDB/Mongoose, ExpressJS, NodeJS, and PassportJS.

## Table Of Contents

- [Key Features](#key-features)
- [Documentation](#documentation)
    - [Authentication](#authentication)
        - [Login](#login)
    - [API](#api)
        - [All Posts](#all-posts)
        - [Post Detail](#post-detail)

## Key Features

1. RESTful Architecture The API follows a RESTful architecture, ensuring that the resources within the blog app are organized and accessible. Through this architecture, data is retrieved and manipulated through standardized HTTP methods--allowing for efficient communication between client and server.

2. User Authentication and Authorization: The app uses Passport.js with a JWT strategy, utilizing a public key to verify incoming JWTs, and authenticating users by searching for their IDs in the database, granting access to protected routes based on successful verification. The app also contains 'isAdmin' middleware which determines whether or not the user is an admin.
 
3. JWT Issuance for Login: Upon login, the auth server issues a JWT to be handled by the frontend. These tokens are signed with a RSA private key, to be verified later on with a RSA public key. These tokens are used by the auth middleware to handle requests in the API's protected routes.

4.Integration with the Frontend: The backend seamlessly integrates with the frontend, facilitating real-time data synchronization, instant updates, and efficient communication between the client and server. This integration ensures a smooth user experience and enables dynamic content delivery.

## Documentation

### Authentication

The 'On Exploration' Blog API uses JWTs to authenticate requests for protected routes. An access token issued on login with the format "Bearer <token>" must be attached to the Authorization header on requests to protected routes.

**Auth Base URL:**  https://on-exploration-frontend.vercel.app/users/

#### Login

POST /login 

Body Parameters:
- username
- password

Returns:
success message - true or false
user information - admin (true or false), object id, their username, the salt and hash created for the user. 
accessToken - A JWT with a 24 hour expiration that you can attach to the Authorization header in the format Bearer <token> for access to protected routes. This accessToken has a payload that includes basic user information and authorization.

### API

**API Base URL:** https://on-exploration-frontend.vercel.app/

#### All Posts

GET /posts

Returns:
- An array of JSON objects with all blog posts and their information.
  ```
  {
    "posts": [], 
  }
  ```

#### Post Detail

GET /posts/:postId

Returns:
- JSON Object of a specific posts details.
```{
    "comments": [
        {
            "likeCount": 0,
            "likes": [],
            "_id": "660fcc90f026f1918bc89db3",
            "user": {
                "admin": false,
                "_id": "660fcc61f026f1918bc89d89",
                "username": "Pinocchio",
                "salt": "153a08fe7cdd86f611a8deba3e9874482afbce6953a305a2fe7979ac9bbc6443",
                "hash": "d7ac5e3da7773aebc802edc5e57230a50a0b0efe351dd4fb95d2d404ab4962841c9f108c6f6ad14a85b6a882376553139af544cd8ba95a507716813ecac48b4a",
                "__v": 0
            },
            "post": "660f77f156299c833b132942",
            "date_published": "2024-04-05T10:04:00.855Z",
            "content": "been there",
            "__v": 0
        }
    ],
    "_id": "660f77f156299c833b132942",
    "user": {
        "admin": true,
        "_id": "66067bdc61d5d03fadf3d46b",
        "username": "admin",
        "salt": "95b5cae03c373d06a891f3af9259b627cca3e6f8e6e3589498f8ac347d6e4ea0",
        "hash": "794e7c4a44faa41972bc95176b6363b77ba8913eb1040b243bf0282a3eab1ff4238f71f4f8cf0fdd4e3639ccf285daf3fca7e725cb3426a515446da9cbd34414",
        "__v": 0
    },
    "title": "The Americas",
    "date_published": "2024-04-05T04:02:57.237Z",
    "content": "Christopher Columbus's voyage to the Americas in 1492 marks a pivotal moment in history, often celebrated as the \"discovery\" of the New World. Sponsored by the Spanish monarchs Ferdinand and Isabella, Columbus set sail from Spain in search of a westward route to Asia, but instead stumbled upon the Caribbean islands. His encounter with the Americas initiated a transformative era of exploration, colonization, and cultural exchange between the Old World and the New. While Columbus's voyage is celebrated for its navigational prowess and the opening of transatlantic trade routes, it also ushered in centuries of colonization, exploitation, and devastation for indigenous peoples. The legacy of Columbus's discovery is complex, sparking debate and reflection on the impact of European expansionism and the enduring consequences for the peoples and cultures of the Americas.",
    "__v": 0
}
```


Developed by **Benjamin Phillips**
