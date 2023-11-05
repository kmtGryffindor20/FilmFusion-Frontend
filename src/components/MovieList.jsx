import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react"
export default function MovieList(props){

    const [list, setList] = useState([])

    useEffect(() => {
        async function getData(){
            var options = {}
            if (props.URI.includes("users")) {
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
            const response = await fetch(props.URI, options)
            const this_data = await response.json()

            setList(this_data['results'])
            
        }
        
        if (props.URI){
            getData();
        }
    }, [props.URI])

    let movies = null;
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
                         />
            )
            
        }
        catch {
            movies = <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        }

    return(
        <>
        <div id={props.text} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 ml-24 mt-8 mb-8 mr-24">
        {movies}
        </div>
        
        </>
    );
}