const express = require("express");
const ReviewsService = require("./reviews-service");
const path = require("path");
const reviewsRouter = express.Router();

const jsonBodyParser = express.json();
const {requireAuth} = require('../middleware/jwt-auth');

reviewsRouter
  .route("/")

  .get(jsonBodyParser, (req, res, next) => {
    return ReviewsService.getAll(req.app.get("db"))
      .then(reviews => {
        res.status(201).json(reviews.map(ReviewsService.serialize));
      })
      .catch(next);
  })


  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { title, content, sku } = req.body;
    for (const field of ["title", "content", "sku"])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
    const review = {
      title: title,
      content: content,
      author: req.user.id,
      sku: sku
    };

    ReviewsService.insert(req.app.get("db"), review).then(review => {
      return res.status(201).json(ReviewsService.serialize(review));
    });
  });

module.exports = reviewsRouter;
