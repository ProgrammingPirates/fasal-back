const MovieList = require('../models/MovieList');

const getLists = async (req, res) => {
  const lists = await MovieList.find({ user: req.user._id });
  res.json(lists);
};

const createList = async (req, res) => {
  const { name, visibility } = req.body;
  const list = new MovieList({ user: req.user._id, name, visibility });
  const createdList = await list.save();
  res.status(201).json(createdList);
};

const getListById = async (req, res) => {
  const list = await MovieList.findById(req.params.listId);
  if (list) {
    res.json(list);
  } else {
    res.status(404).json({ message: 'List not found' });
  }
};

const updateList = async (req, res) => {
  const { name, visibility } = req.body;
  const list = await MovieList.findById(req.params.listId);

  if (list) {
    list.name = name;
    list.visibility = visibility;
    const updatedList = await list.save();
    res.json(updatedList);
  } else {
    res.status(404).json({ message: 'List not found' });
  }
};

const deleteList = async (req, res) => {
  const list = await MovieList.findById(req.params.listId);

  if (list) {
    await list.remove();
    res.json({ message: 'List removed' });
  } else {
    res.status(404).json({ message: 'List not found' });
  }
};

const addMovieToList = async (req, res) => {
  const { imdbID, Title, Year, Poster } = req.body;
  const list = await MovieList.findById(req.params.listId);

  if (list) {
    const movie = { imdbID, Title, Year, Poster };
    list.movies.push(movie);
    await list.save();
    res.status(201).json(movie);
  } else {
    res.status(404).json({ message: 'List not found' });
  }
};

const removeMovieFromList = async (req, res) => {
  const list = await MovieList.findById(req.params.listId);

  if (list) {
    list.movies = list.movies.filter((movie) => movie.imdbID !== req.params.movieId);
    await list.save();
    res.json({ message: 'Movie removed' });
  } else {
    res.status(404).json({ message: 'List not found' });
  }
};

module.exports = {
  getLists,
  createList,
  getListById,
  updateList,
  deleteList,
  addMovieToList,
  removeMovieFromList,
};
