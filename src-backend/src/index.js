const express = require('express');
const {readAllArticles, readSingleArticle, updateArticle, createArticle, deleteSingleArticle, deleteAllArticles} = require('./articleController');

const app = express();
const PORT = process.env.PORT || 8080;

//We use the native Express JSON body parsing middleware
app.use(express.json());

app.get("/api/articles", readAllArticles)

app.get("/api/articles/:articleId", readSingleArticle)

app.put("/api/articles/:articleId", updateArticle)

app.post("/api/articles", createArticle)

app.delete("/api/articles/:articleId", deleteSingleArticle)

/*
*   Dangerous NUKE EVERYTHING endpoint
*/
app.delete("/api/articles", deleteAllArticles)

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
});