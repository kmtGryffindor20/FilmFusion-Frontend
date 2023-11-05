import logo from "../assets/images/logo.png"
import { useDisclosure, Button } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import MovieList from "./MovieList";
import LoginModal from "./LoginModal";

export default function Nav(props) {

    const [search, setSearch] = useState("")

    const [formData, setFormData] = useState({})

    const [shouldRegister, setShouldRegister] = useState(false)

    const [registerOrLogin, setRegisterOrLogin] = useState("Login")


    function handleChange(event){
        setSearch(event.target.value)
    }

    



    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const initialRefRegister = useRef(null)
    const finalRefRegister = useRef(null)

    return (
        <>
        <div className="sticky top-0 z-10 font-sans opacity-90">
            <nav className="bg-primary flex items-center justify-evenly shadow-lg shadow-black  w-100">
                <div className="flex items-center">
                    <img className="scale-75" src={logo} alt="" />
                    <h3 className="font-sans text-white text-3xl font-bold ml-2">Film Fusion</h3>
                </div>
                <div className="flex items-center">
                    <input onClick={onOpen} className="rounded top-5 indent-2 cursor-pointer" type="text" placeholder="Search Movie"/>
                </div>
                <div>
                    <ul className="flex items-center text-white">
                        <li className="px-5 cursor-pointer"><a href="#Explore">Trending</a></li>
                        <li className="px-5 cursor-pointer">Recommended</li>
                        <li onClick={onRegisterOpen} className="px-5 cursor-pointer" >{props.loggedIn?"User":"Login"}</li>
                    </ul>
                </div> 
            </nav>
        </div>

        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"6xl"}
      >
        <ModalOverlay />
        <ModalContent  bg={"primary"}>
          <ModalHeader textColor={"white"}>Search for Movies</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody  pb={6}>
            <FormControl>
              <FormLabel textColor={"white"}>Search</FormLabel>
              <Input onChange={handleChange} className="border-purple text-white" ref={initialRef} placeholder='Search a movie' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <MovieList URI={`https://kmtgryffindor20.pythonanywhere.com/api/movies/search/${search}`} text="Explore" />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <LoginModal initialRefRegister={initialRefRegister}
                  finalRefRegister={finalRefRegister}
                  isRegisterOpen={isRegisterOpen}
                  onClose={onRegisterClose}
                  setLoggedIn={props.setLoggedIn}
                  setToken={props.setToken} />

      

        </>
    )
}