const axios = require('axios');

// Returns array of undetailed media array
const getMediaArray = async ({ title, type }) => {
  const encoded = encodeURIComponent(title);
  const URL = `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.TMDB_API_KEY}&query=${encoded}`;
  const response = await axios.get(URL);
  return response.data.results;
};

const mapData = data => data
  .map(obj => ({
    type: obj.type ? obj.type : null,
    id: parseInt(obj.id, 10),
    // title for movies, original name for tv shows
    title: obj.title ? obj.title : obj.original_name,
    popularity: obj.popularity,
    overview: obj.overview,
    poster: obj.poster_path ? obj.poster_path : obj.poster,
  }));

module.exports = {
  getMediaArray,
  mapData,
};
