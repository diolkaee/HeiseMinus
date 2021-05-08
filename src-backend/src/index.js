const express = require('express');
const {readAllArticles, readSingleArticle, updateArticle, createArticle, deleteSingleArticle, deleteAllArticles} = require('./articleController');

const app = express();
const PORT = process.env.PORT || 8080;

//We use the native Express JSON body parsing middleware
app.use(express.json());

app.get("/articles", readAllArticles)

app.get("/articles/:articleId", readSingleArticle)

app.put("/articles/:articleId", updateArticle)

app.post("/articles", createArticle)

app.delete("/articles/:articleId", deleteSingleArticle)

/*
*   Dangerous NUKE EVERYTHING endpoint
*/
app.delete("/articles", deleteAllArticles)

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
});