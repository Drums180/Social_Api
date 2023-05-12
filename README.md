# Social Network API

This project is a back-end application that uses Express.js and MongoDB to provide an API for a social networking app. The following are the criteria the project fulfills:

## User Model

- Users have a unique username and email address.
- Users have a list of associated thought IDs.
- Users have a list of associated friend IDs.
- Users have a `friendCount` virtual that retrieves the length of the user's friends list.
- Users have methods to add and remove friends.

## Thought Model

- Thoughts have a `thoughtText` property, a `username` property, and a `createdAt` timestamp.
- Thoughts have a list of nested reaction documents/subdocuments.
- Thoughts have a `reactionCount` virtual that retrieves the length of the thought's reactions array.

## User Routes

- GET all users.
- GET a single user by its `_id`.
- POST a new user.
- PUT to update a user by its `_id`.
- DELETE to remove user by its `_id`.
- PUT to add a friend to a user's `friends` list.
- DELETE to remove a friend from a user's `friends` list.

## Thought Routes

- GET to get all thoughts.
- GET to get a single thought by its `_id`.
- POST to create a new thought (and automatically push the thought's `_id` to the associated user's `thoughts` array).
- PUT to update a thought by its `_id`.
- DELETE to remove a thought by its `_id`.
- POST to create a reaction stored in a single thought's `reactions` array field.
- DELETE to pull and remove a reaction by the reaction's `reactionId` value.

## Server

The server uses Express.js for routing and middleware. It connects to a MongoDB database using Mongoose.

To run the server, use the command `npm start`. Ensure that MongoDB is running on your machine before starting the server.
