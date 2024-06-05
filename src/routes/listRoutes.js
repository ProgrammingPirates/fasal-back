const express = require('express');
const {
  getLists,
  createList,
  getListById,
  updateList,
  deleteList,
  addMovieToList,
  removeMovieFromList,
} = require('../controllers/listController');
const protect = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(protect, getLists)
  .post(protect, createList);

router.route('/:listId')
  .get(protect, getListById)
  .put(protect, updateList)
  .delete(protect, deleteList);

router.route('/:listId/movies')
  .post(protect, addMovieToList);

router.route('/:listId/movies/:movieId')
  .delete(protect, removeMovieFromList);

module.exports = router;
