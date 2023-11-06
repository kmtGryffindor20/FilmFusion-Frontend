import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"

export default function MovieList(props){

    const [list, setList] = useState([])
    let movies = null;

    const [loading, setLoading] = useState(true)


    const {
        isOpen: isVisible,
        onClose,
        onOpen,
      } = useDisclosure({ defaultIsOpen: false })

    useEffect(() => {
        function getData(){
            var options = {}
            if (props.URI.includes("users") || props.URI.includes("recommendations")) {
                options = {
                    "method":"GET",
                    "headers": {
                        "Authorization": `Bearer ${props.token}`,
                        "Content-Type": "application/json"
                    }
                }
            }
            else {
                options = {
                    "method":"GET",
                    "headers": {
                        "Content-Type": "application/json"
                    }
                }
            }
            // use fetch to get data from the URI and use spinner while loading
            fetch(props.URI, options)
            .then(response => response.json())
            .then(data => {
                setList(data['results'])
            })
            .catch(error => {
            })
            .finally(() => setLoading(false))

            
        }
        
        if (props.URI){
            getData();
        }
    }, [props.URI])


    const spinner = <Spinner 
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
    />

    try{
        movies = list.map((movie)=>
            <MovieCard rating={movie.tmdb_rating}
                        title={movie.title}
                        api_id={movie.movie_api_id}
                        btnText={props.text}
                        desc={movie.description}
                        genres={movie.genre}
                        director={movie.director_name} 
                        id={movie.id}
                        token={props.token}
                        loggedIn={props.loggedIn}
                        setLoggedIn={props.setLoggedIn} setToken={props.setToken}
                        setUsername={props.setUsername}
                        key = {movie.id}
                         />
            
            )
            
        }
        catch {
            if(props.URI.includes("users")){
                movies = <h1 className="text-white text-2xl text-center">No movies in your watchlist</h1>
            }
            else {
                movies = <h1 className="text-white text-2xl text-center">No movies in this category</h1>
            }
            }
        

    return(
        <>
        <div id={props.text} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 ml-24 mt-8 mb-8 mr-24">
        {loading && spinner}
        {movies}
        </div>

        {isVisible && <Alert status='error'>
      <AlertIcon />
      <Box>
        <AlertTitle>Movie Not Found</AlertTitle>
        <AlertDescription>
          No movie with this name
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>}
        
        </>
    );
}