import Nav from "./components/Nav"
import { MovieCarousel } from "./components/Carousel"
import Heading from "./components/Heading"
import BulletHeading from "./components/BulletHeading"
import NotSignedIn from "./components/NotSignedIn"
import MovieList from "./components/MovieList"
import { useState } from "react"
function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const [token, setToken] = useState("")

  const [username, setUsername] = useState("")
  

  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} setToken={setToken} username={username} setUsername={setUsername} />
      <MovieCarousel/>
      <Heading title="What will you watch?" />
      <BulletHeading title="Your Watchlist"/>
      {!loggedIn ? <NotSignedIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} setToken={setToken} setUsername={setUsername} /> : <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/users/watchlist/"
                                                text="Know More"
                                                token={token}
                                                loggedIn={loggedIn}
                                                setLoggedIn={setLoggedIn} setToken={setToken} 
                                                setUsername={setUsername}
                                                />}
      <BulletHeading title="Fan Favourites" />
      <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/movies/topN/?n=5"
                  text="WatchList +"
                  token = {token}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} setToken={setToken} setUsername = {setUsername}
                  />
      <Heading title="Explore New Movies!" />
      <BulletHeading title="Trending" />
      <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/movies/trending"
                  text="Explore"
                  token={token}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} setToken={setToken}
                  setUsername={setUsername}
                  />
      <BulletHeading title="In Theaters" />
      <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/movies/in_theaters/"
                  text="Showtimes"
                  token={token}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} setToken={setToken} 
                  setUsername={setUsername}
                  />
      
    </>
  )
}

export default App
