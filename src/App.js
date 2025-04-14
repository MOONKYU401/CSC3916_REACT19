import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import Authentication from './components/authentication';
import {HashRouter, Routes,  Route} from 'react-router-dom';
import SearchMovies from './components/search';


function App() {
  return (
    <div className="App">
      <HashRouter> {/* The Router component */}
        <MovieHeader />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movielist" element={<MovieList />}/>
          <Route path="/movie/:movieId" element={<Movie />}/>
          <Route path="/signin" element={<Authentication />}/>
          <Route path="/search" element={<SearchMovies />} />

          {/*... other routes */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
