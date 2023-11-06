import Nav from "./components/Nav"
import { MovieCarousel } from "./components/Carousel"
import Heading from "./components/Heading"
import BulletHeading from "./components/BulletHeading"
import NotSignedIn from "./components/NotSignedIn"
import MovieList from "./components/MovieList"
import { useEffect, useState } from "react"
import { useDisclosure } from "@chakra-ui/react"
function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true")

  const [token, setToken] = useState(localStorage.getItem("token"))

  const [username, setUsername] = useState(localStorage.getItem("username"))

  const [email, setEmail] = useState(localStorage.getItem("email"))

  localStorage.setItem("loggedIn", loggedIn)
  localStorage.setItem("token", token)
  localStorage.setItem("username", username)
  localStorage.setItem("email", email)


  useEffect(()=>{
    
    if (localStorage.getItem("loggedIn") === "true"){
      setLoggedIn(true)
    }
    else{
      setLoggedIn(false)
    }
    if (localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
    else{
      setToken("")
    }
    if (localStorage.getItem("username")){
      setUsername(localStorage.getItem("username"))
    }
    else{
      setUsername("")
    }
    if (localStorage.getItem("email")){
      setEmail(localStorage.getItem("email"))
    }
    else{
      setEmail("")
    }
  }
  ,[])

  for (let i=0; i<localStorage.length; i++){
    console.log(localStorage.key(i), localStorage.getItem(localStorage.key(i)))
  }



  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} token={token}  setToken={setToken} username={username} setUsername={setUsername} 
            email={email} setEmail={setEmail} />
      <MovieCarousel/>
      <Heading title="What will you watch?" />
      <BulletHeading title="Your Watchlist"/>
      {!loggedIn ? <NotSignedIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} setToken={setToken} setUsername={setUsername} /> : <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/users/watchlist/"
                                                text="Know More"
                                                token={token}
                                                loggedIn={loggedIn}
                                                setLoggedIn={setLoggedIn} setToken={setToken} 
                                                setUsername={setUsername}
                                                setEmail={setEmail}
                                                />}
      <BulletHeading title="Fan Favourites" />
      <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/movies/topN/?n=5"
                  text="WatchList +"
                  token = {token}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} setToken={setToken} setUsername = {setUsername}
                  setEmail={setEmail}
                  />
      <Heading title="Explore New Movies!" />
      <BulletHeading title="Trending" />
      <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/movies/trending"
                  text="Watchlist +"
                  token={token}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} setToken={setToken}
                  setUsername={setUsername}
                  setEmail={setEmail}
                  />
      <BulletHeading title="In Theaters" />
      <MovieList URI="https://kmtgryffindor20.pythonanywhere.com/api/movies/in_theaters/"
                  text="Showtimes"
                  token={token}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} setToken={setToken} 
                  setUsername={setUsername}
                  setEmail={setEmail}
                  />

      
    </>
  )
}

export default App
