import { Carousel, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react"


export function MovieCarousel() {
  // Get trending 5 upcoming movies and display them in a carousel
  const uri = "https://api.themoviedb.org/3/movie/upcoming"
  const options = {
    "method":"GET",
    "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzNmMGFjMDZjNWVkNTVhNjdlMGI3YzUwZjA1NmRlOSIsInN1YiI6IjY0Zjk2MDViYTg0YTQ3MDBhZDM3NjNiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0jbl7ODxAdDVjksUz3ownYAAkm9SU_rmqayh0iyHszU"
  }
}
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function getData(){
      const response = await fetch(uri, options)
      const this_data = await response.json()
      setMovies(this_data['results'].slice(0,5))
    }

    getData()
    setLoading(false)
  }, [])

  var spinner = <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size="xl"
  />


  var movie_list = null
  try{
    movie_list = movies.map((movie)=>
      <div key={movie.id} className="relative h-full w-full px-24">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-primary/50">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              {movie.title}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              {movie.overview}
            </Typography>
          </div>
        </div>
      </div>
    )
  }
  catch{
    movie_list = null
  }


  return (
    <>
    <Typography variant="h2" color="white" className="text-center mb-16 mt-16">
        Upcoming Movies
      </Typography>
    <Carousel className="rounded-xl h-[40rem] mt-16 mb-16 font-sans">
      {loading && spinner}
      {movie_list}
    </Carousel>
    </>
    
  );
}