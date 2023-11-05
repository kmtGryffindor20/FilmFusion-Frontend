import Nav from "./components/Nav"
import { MovieCarousel } from "./components/Carousel"
import Heading from "./components/Heading"
import BulletHeading from "./components/BulletHeading"
import NotSignedIn from "./components/NotSignedIn"
import MovieList from "./components/MovieList"
function App() {
  return (
    <>
      <Nav/>
      <MovieCarousel/>
      <Heading title="What will you watch?" />
      <BulletHeading title="Your Watchlist"/>
      <NotSignedIn/>
      <BulletHeading title="Fan Favourites" />
      <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/movies/topN/?n=5"
                  text="WatchList +" />
      <Heading title="Explore New Movies!" />
      <BulletHeading title="Trending" />
      <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/movies/trending"
                  text="Explore" />
      <BulletHeading title="In Theaters" />
      <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/movies/in_theaters/"
                  text="Showtimes" />
      
    </>
  )
}

export default App
