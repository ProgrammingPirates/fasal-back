const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  imdbID: { type: String, required: true },
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Poster: { type: String, required: true },
});

const listSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  movies: [movieSchema],
});

const MovieList = mongoose.model('MovieList', listSchema);

module.exports = MovieList;
