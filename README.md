# Module-17-Challenge---Social-Networks-API

## Description
Scratch built API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. This is an Express.js routed MongoDB database with the Mongoose ODM.

Express.js and Mongoose packages are used.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.
To install the project, first run 'npm install' to get the node dependencies, then 'npm run build' to get the dist.

## Usage
To invoke the application, use `npm start'.

## Credits
The full stack bootcamp course information was used.

## License
MIT

## Badges
Quickdraw, YOLO, and Pull Shark 

## Features
1. GET /api/users - get all users
2. GET /api/users/:userId - get a single user by ID
3. POST /api/users - create a new user
4. PUT /api/users/:userId - update a user by ID
5. DELETE /api/users/:userId - delete a user by ID
6. GET /api/thought - get all thought
7. GET /api/thought/:thoughtId - get a single thought by ID
8. POST /api/thought - create a new thought
9. PUT /api/thought/:thoughtId - update a thought by ID
10. DELETE /api/thought/:thoughtId - delete a thought by ID
11. POST /api/thought/:thoughtId/reactions - add a reaction to a thought
12. DELETE /api/thought/:thoughtId/reactions/:reactionId - remove a reaction from a thought
13. POST /api/users/:userId/friends/:friendId - add a friend to a user's friend list
14. DELETE /api/users/:userId/friends/:friendId - remove a friend from a user's friend list

## How to Contribute
Check out my GitHub page, download the repo and get to work. 

## Tests
Insomnia was used to test out the functionality. 

## Walkthrough Video
https://app.screencastify.com/v3/watch/cwGTyfHhjP8qNue8mZCY
