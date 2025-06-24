// services/tmdb.js
export const fetchNowPlayingMovies = async (category = 'now_playing') => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTk0M2ZiNzlmNjVlZmMxNzY0OWE4M2VjZjNjODM3MiIsIm5iZiI6MTc1MDY5MDI4Ni4wMjMsInN1YiI6IjY4NTk2OWVlZjY1ZTkwMTRkYjAzNmUzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XFrlDC9eYjM6JKP0l8vg6vn4ORbg548r4u3pv_w4i_w'
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Failed to fetch movies:', error)
    throw error
  }
}


// Function to fetch videos for a movie by ID
export const fetchMovieVideos = async (movieId) => {

      if (!movieId) {
            console.warn("fetchMovieVideos: movieId is undefined or invalid.")
            return []
        }
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTk0M2ZiNzlmNjVlZmMxNzY0OWE4M2VjZjNjODM3MiIsIm5iZiI6MTc1MDY5MDI4Ni4wMjMsInN1YiI6IjY4NTk2OWVlZjY1ZTkwMTRkYjAzNmUzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XFrlDC9eYjM6JKP0l8vg6vn4ORbg548r4u3pv_w4i_w'
        }
    };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching videos for movie ${movieId}:`, error);
    throw error;
  }
}