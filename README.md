# Social-Network-API
## Description
Social-Network-API is an exercise in creating the back end of an social networking website like facebook or twitter. Utilizing Express.js and Mongoose, API calls are made and corresponding responses are given from a MongoDB database.

## Installation
Make sure you have node.js and Mongo v4.4.5+ installed on your device. Then run `npm install`.

## Usage
1. Open a terminal in the root directory
2. Run command `node server` or `npm start` to start the server
3. Use Postman, Insomnia, or your API testing environment of choice to test the following endpoints on localhost:3001:
  - User
    - GET /api/users
    - GET /api/users/:id
    - POST /api/users
      - Expects: `{ "username": "name", "email": "name@email.com"}`
    - PUT /api/users/:id
      - Expects: `{ "username": "name", "email": "name@email.com"}`
    - DELETE /api/users/:id
    - POST /api/users/:userId/friends/:friendID (add a friend)
    - DELETE /api/users/:userId/friends/:friendID (remove a friend)
  - Thoughts
    - GET /api/thoughts
    - GET /api/thoughts/:id
    - POST /api/thoughts
      - Expects: `{ "thoughtText": "text", "username": "name", "userId": "id#"}`
    - PUT /api/thoughts/:id
      - Expects: `{ "thoughtText": "text"}`
    - DELETE /api/thoughts/:id
    - POST /api/thoughts/:id (add a reaction)
      - Expects: `{ "reactionBody": "text", "username": "name"}`
    - DELETE /api/thoughts/:thoughtId/:reactionId (remove a reaction)


## Demo
### Set Up
![Set Up walkthrough Gif](/startup.gif)
***
### User Endpoints
![User walkthrough Gif](/userCRUD.gif)
***
### Add/Remove Friends
![Friend walkthrough Gif](/friendList.gif)
***
### Thought Endpoints
![Thought walkthrough Gif](/thoughtCRUD.gif)
***
### Add/Remove Reactions
![Reaction walkthrough Gif](/reactionList.gif)
***
