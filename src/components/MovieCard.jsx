import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  AspectRatio
} from "@material-tailwind/react";

import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import star from "../assets/images/star-filled.png"
import star_empty from "../assets/images/star-empty.png"

import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import ReviewModal from "./ReviewModal";
import ShowtimesModal from "./ShowtimesModal";

export default function MovieCard(props) {
  var uri = `https://api.themoviedb.org/3/movie/${props.api_id}/images`

  const { isOpen, onOpen, onClose } = useDisclosure()



  const [cast, setCast] = useState([])

  const [image_url, set_url] = useState("")
  const [bg_image_url, set_bg_url] = useState("")
  const [trailer_url, setTrailerUrl] =useState("")

  const [sendMovie, setSendMovie] = useState(false)
  // Post movie to user's watchlist if props.btnText is "Watchlist +"

  const watchlistURI ="https://kmtgryffindor20.pythonanywhere.com/api/users/watchlist/"
  useEffect(() => {

    async function postData(){
      console.log(props.token);
      const options = {
        "method":"POST",
        "headers": {
          "Authorization": `Bearer ${props.token}`,
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({
          "movie": props.id
        })
      }
      const response = await fetch(watchlistURI, options)
      const this_data = await response.json()
      console.log(this_data)
      setSendMovie(false)
    }
    
    if (sendMovie){
      postData()
      location.reload()
    }

  },[sendMovie])


  useEffect(() => {
    // get movie image from tmdb
    async function getData(){
      const options = {
        "method":"GET",
        "headers": {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzNmMGFjMDZjNWVkNTVhNjdlMGI3YzUwZjA1NmRlOSIsInN1YiI6IjY0Zjk2MDViYTg0YTQ3MDBhZDM3NjNiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0jbl7ODxAdDVjksUz3ownYAAkm9SU_rmqayh0iyHszU"
      }
    }
      const response = await fetch(uri, options)
      const this_data = await response.json()
      try{
        set_url("https://image.tmdb.org/t/p/w500"+this_data['posters'][0]['file_path'])
        set_bg_url("https://image.tmdb.org/t/p/original"+this_data['backdrops'][0]['file_path'])
      }
      catch{
        console.log("")
      }
    }
      getData();
  },[props.id, props.api_id, props.title])

  useEffect(() => {
      async function getData(){
        const response = await fetch(`https://kmtgryffindor20.pythonanywhere.com/api/movies/cast/${props.id}/`)
        const this_data = await response.json()
        setCast(this_data["results"])
      }
      getData();
  }, [props.title, props.api_id])

  useEffect(() => {
    async function getData(){
      const response = await fetch(`https://kmtgryffindor20.pythonanywhere.com/api/movies/videos/${props.id}/`)
      const this_data = await response.json()
      try {
      setTrailerUrl("https://www.youtube.com/embed/"+this_data['results'][0]['key'])
      } catch{
        console.log("error")
      }
    }
      getData();
  }, [props.id, props.api_id, props.title])


  const [shouldDelete, setShouldDelete] = useState(false)
  // useEffect for delete movie from watchlist
  const deleteURI = `https://kmtgryffindor20.pythonanywhere.com/api/users/watchlist/delete/${props.id}`
  useEffect(() => {

    async function deleteData(){
      const options = {
        "method":"DELETE",
        "headers": {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        }
      }
      const response = await fetch(deleteURI, options)
      const this_data = await response.json()
      location.reload()

      console.log(this_data)
    }

    if (props.btnText === "Remove" && shouldDelete){
      deleteData()
      setShouldDelete(false)
    }

  },[shouldDelete])


 


  const genres = props.genres.split(", ")


  // add key to cast list
  try{
    var cast_list = cast.slice(0, 4).map((person) => (
      <div key={person['id']} className="flex flex-row items-center">
        <a className="text-white underline">{person['actor_name']}</a>
      </div>
    ))
  }
  catch{
    
  }


  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()
  const { isOpen: isReviewOpen, onOpen: onReviewOpen, onClose: onReviewClose } = useDisclosure()
  const { isOpen: isShowOpen, onOpen: onShowOpen, onClose: onShowClose } = useDisclosure()

  const initialRefRegister = useRef(null)
  const finalRefRegister = useRef(null)

  return (
    <>
    <Card className="min-h-max bg-secondary">
      <CardHeader floated={false} className="hover:animate-pulse cursor-pointer">
        <a onClick={onOpen}><img src={image_url} alt="profile-picture" /></a>
      </CardHeader>
      <CardBody className="py-1 mt-2 flex items-center">
        <img src={star} alt="" />
        <Typography variant="paragraph" className="text-white font-sans font-semibold px-2 mr-8">
          {props.rating}
        </Typography>
       <a onClick={onReviewOpen} className="hover:scale-125 hover:outline-2 outline-purple"><img src={star_empty} alt="" /></a>
      </CardBody>
      <CardBody className="text-left py-1">
        <Typography variant="h6" className="mb-2 cursor-pointer text-white" onClick={onOpen}>
          {props.title}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 relative mb-2 mt-auto">
      {props.btnText === "Showtimes" && <a className="btn py-2 content-center text-base" onClick={onShowOpen}>{props.btnText}</a>} 
      {props.btnText === "Know More" && <a className="btn py-2 content-center text-base" onClick={onOpen}>{props.btnText}</a>}
      {props.btnText === "Remove" && <a className="btn py-2 content-center text-base" onClick={()=>{setShouldDelete(true)}}>{props.btnText}</a>}
      {localStorage.getItem('loggedIn') && props.btnText!="Showtimes" && props.btnText!=="Know More" && props.btnText!=="Remove" && <a className="btn py-2 content-center text-base" onClick={()=>setSendMovie(true)}>{props.btnText}</a>}
      {!localStorage.getItem('loggedIn') && props.btnText!="Showtimes" && <a className="btn py-2 content-center text-base" onClick={onRegisterOpen}>{props.btnText}</a>}
      </CardFooter>
    </Card>


    <Modal  onClose={onClose} size='full' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent style={{backgroundImage: `url(${bg_image_url})`, backdropFilter: 'blur(10px)'}} bgSize="cover">
        <div className="z-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}></div>
        <ModalHeader zIndex={1} fontSize={"7xl"} textColor={"white"}>{props.title}</ModalHeader>
        <ModalCloseButton color={"white"} zIndex={1} />
        <ModalBody className="flex mr-0" textColor={"white"} zIndex={1} fontSize={"xl"} justifyContent={"left"}>
           <div className="flex flex-col">
            <div className="w-1/2">
                {props.desc}
              </div>
              <div>
              <ul className="flex mt-8 mb-8">
                {genres.map((genre) => (
                  <li key={genre} className="border-2 border-white rounded-full px-2 text-center mr-4">{genre}</li>
                ))}
              </ul>
              </div>
              <div>
                Director: <a className="underline">{props.director}</a>
              </div>
              <div className="flex">
                Cast:  
                <div className="ml-2 mb-8 gap-8 flex">
                  {cast_list}
                </div>
              </div>
              <div>
              </div>
           <iframe
                className="h-[40rem] w-full mt-8"
                src={trailer_url}
                allowFullScreen
              />
           </div>
              
        </ModalBody>
        <ModalFooter zIndex={1}>
          <a className="btn hover:bg-transparent" onClick={onClose}>Close</a>
        </ModalFooter>
      </ModalContent>
    </Modal>

    <ReviewModal 
          id={props.id}
          token={props.token}
          isOpen={isReviewOpen}
          onClose={onReviewClose}
          loggedIn={props.loggedIn}
          setToken={props.setToken}
          setLoggedIn={props.setLoggedIn}
          setUsername={props.setUsername}
          />

      <LoginModal initialRefRegister={initialRefRegister}
                  finalRefRegister={finalRefRegister}
                  isRegisterOpen={isRegisterOpen}
                  onClose={onRegisterClose}
                  setLoggedIn={props.setLoggedIn}
                  setToken={props.setToken} />
    <ShowtimesModal 
                  isShowOpen={isShowOpen}
                  onShowClose={onShowClose}
                  title={props.title}
                  id={props.id}
                  loggedIn={props.loggedIn}
                  token={props.token}
                  setLoggedIn={props.setLoggedIn}
                  setToken={props.setToken}
                  setUsername={props.setUsername}
            />
    </>

  );
}