const Article = require('./article');

/**
 * A simple data class to hold any errors that occured during model validation
 */
class ValidationError {
    constructor(path, message) {
        this.path = path;
        this.message = message;
    }
}

/**
 * Creates an article from JSON.
 * Validation is enabled and the repsonse object contains any validation errors.
 * 
 * @param {IncomingMessage} req The request object forwarded by Express.js
 * @param {ServerResponse} res The response object expected by Express.js
 */
exports.createArticle = (req, res) => {
    Article.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                const validationErrors = err.errors.map(validationErr => new ValidationError(validationErr.path, validationErr.message))
                res.status(400).send({
                    message: "Failed to save article to database: Validation Error",
                    errors: validationErrors
                });
            } else {
                res.status(500).send({
                    message: "Internal Server Error while creating article"    
                });
            }
        });
}

/**
 * Retrieves an article with the given articleId from the database.
 * Returns StatusCode 404: BadRequest in case no article with the given ID was found.
 * 
 * @param {IncomingMessage} req The request object forwarded by Express.js
 * @param {ServerResponse} res The response object expected by Express.js
 */
exports.readSingleArticle = (req, res) => {
    const articleId = req.params.articleId;
    Article.findByPk(articleId)
        .then(data => {
            if(data === null) {
                res.status(404).send(`No article with ID: ${articleId} found`);
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Internal Server Error while fetching article with ID: ${articleId}`,
                err: err
            });
        });
}

/**
 * Retrieves all articles from the database.
 * 
 * @param {IncomingMessage} req The request object forwarded by Express.js
 * @param {ServerResponse} res The response object expected by Express.js
 */
exports.readAllArticles = (req, res) => {
    Article.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Internal Server Error while fetching articles",
                error: err
            });
        });
}

/**
 * Updates an article with the given articleId in the database.
 * Validation is enabled and the response object contains any validation errors.
 * 
 * @param {IncomingMessage} req The request object forwarded by Express.js
 * @param {ServerResponse} res The response object expected by Express.js
 */
exports.updateArticle = (req, res) => {
    const articleId = req.params.articleId;

    Article.update(req.body, {
        where: {id: articleId}
    })
        .then(numberOfUpdates => {
            if(numberOfUpdates != 1) {
                res.status(400).send({
                    message: `Unspecified error while updating article with ID: ${articleId}`
                });

            } else {
                res.status(200).end();
            }
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                const validationErrors = err.errors.map(validationErr => new ValidationError(validationErr.path, validationErr.message))
                res.status(400).send({
                    message: "Failed to save article to database: Validation Error",
                    errors: validationErrors
                });
            } else {
                res.status(500).send({
                    message: `Internal Server Error while updating article with ID: ${articleId}`,
                    error: err
                });
            }
        });
}

/**
 * Deletes an article with the given articleId in the database.
 * Validation is enabled and the response object contains any validation errors.
 * 
 * @param {IncomingMessage} req The request object forwarded by Express.js
 * @param {ServerResponse} res The response object expected by Express.js
 */
exports.deleteSingleArticle = (req, res) => {
    const articleId = req.params.articleId;

    Article.destroy({
        where: { id: articleId }
    })
        .then(numberOfDeletions => {
            if(numberOfDeletions != 1) {
                res.status(404).send({
                    message: `No article with ID: ${articleId} found`
                });

            } else {
                res.status(200).end();
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Internal Server Error while deleting article with ID: ${articleId}`,
                err: err
            });
        })
}

/**
 * Deletes all article in the database.
 * This is dangerous and should NOT BE DEPLOYED TO PRODUCTION.
 * But please don't deploy this project to production.
 * 
 * @param {IncomingMessage} req The request object forwarded by Express.js
 * @param {ServerResponse} res The response object expected by Express.js
 */
exports.deleteAllArticles = (req, res) => {
    Article.destroy({
        where: {},
        //Force sequelize to truncate the table
        truncate: true 
    })
        .then(numberOfDeletions => {
            res.status(200).send({
                message: `Deleted ${numberOfDeletions} articles`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Internal Server Error while deleting articles",
                err: err
            });
        })
}