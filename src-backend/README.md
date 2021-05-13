# HeiseMinus Server

<p>This is the server for the tiny CMS, HeiseMinus.</p>

It uses [Express](https://expressjs.com/) for routing, [Sqlite](https://www.npmjs.com/package/sqlite3) as in-memory database and [Sequelize](https://sequelize.org/) as ORM.

## Setup
1. Make sure you have [Node](https://nodejs.org/en/) installed.
2. Install all dependencies with `npm install`.
3. Run the server with `npm start`.


## Routes

<p>The API is available by default on PORT: 8080. This can be changed by setting the <strong>PATH</strong> environment variable.</p>
The server exposes the following routes:

### Articles
    {
      "id": Number,
      "title": String,
      "content": String,
      "createdAt": String
    }
| Route                   | Method            |
| ------------------------|-------------------|
| /api/articles           | GET, POST, DELETE |
| /api/articles/:id       | GET, PUT, DELETE  |
