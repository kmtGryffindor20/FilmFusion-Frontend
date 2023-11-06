import logo from "../assets/images/logo.png"
import { useDisclosure, Button } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import MovieList from "./MovieList";
import LoginModal from "./LoginModal";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react"
import ProfileModal from "./ProfileModal";
import TicketsModal from "./TicketsModal";
import ReviewModal from "./ReviewModal";
import AllUserReviews from "./AllUserReviews";
import RecommendedModal from "./RecommendedModal";

export default function Nav(props) {

    const [search, setSearch] = useState("")


    function handleChange(event){
        setSearch(event.target.value)
    }

    



    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()
    const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure()
    const { isOpen: isTicketsOpen, onOpen: onTicketsOpen, onClose: onTicketsClose } = useDisclosure()
    const { isOpen: isReviewOpen, onOpen: onReviewOpen, onClose: onReviewClose } = useDisclosure()
    const { isOpen: isRecommendOpen , onOpen: onRecommendOpen, onClose: onRecommendClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const initialRefRegister = useRef(null)
    const finalRefRegister = useRef(null)

    function Logout(){
        props.setLoggedIn(false)
        props.setToken("")
        props.setUsername("")
        console.log(props.username);
    }


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
                        <li onClick={onRegisterOpen} className="px-5 cursor-pointer" >{props.loggedIn?props.username:"Login"}</li>
                        
                      <Menu>
                        <MenuButton>
                        {props.loggedIn && <Wrap>
                                            <WrapItem>
                                                <Avatar name={props.username} src='' />
                                            </WrapItem>
                                           </Wrap>}
                        </MenuButton>
                        <MenuList  bg={"primary"}>
                          <MenuGroup  bg={"primary"} title='Profile' textColor={"white"}>
                            <MenuItem className="hover:bg-secondary"  bg={"primary"} onClick={onProfileOpen} >My Account</MenuItem>
                            <MenuItem className="hover:bg-secondary" bg={"primary"} onClick={onTicketsOpen}>Tickets </MenuItem>
                            <MenuItem className="hover:bg-secondary" bg={"primary"} onClick={onReviewOpen} >Reviews</MenuItem>
                            <MenuItem className="hover:bg-secondary" bg={"primary"} onClick={onRecommendOpen} >Recommendations</MenuItem>
                            <MenuItem className="hover:bg-secondary" bg={"primary"} onClick={Logout}>Logout</MenuItem>
                          </MenuGroup>
                        </MenuList>
                      </Menu>
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
                  setToken={props.setToken}
                  setUsername={props.setUsername}
                  setEmail={props.setEmail}
                  />

      <ProfileModal isOpen={isProfileOpen}
                    onClose={onProfileClose}
                    username={props.username}
                    token={props.token}
                    setToken={props.setToken}
                    setLoggedIn={props.setLoggedIn}
                    setUsername={props.setUsername}
                    email={props.email}
                     />

        <TicketsModal isOpen={isTicketsOpen}
                      onClose={onTicketsClose}
                      token={props.token}
                      username={props.username}
                      />

        <AllUserReviews isOpen={isReviewOpen}
                        onClose={onReviewClose}
                        token={props.token}
                        username={props.username}
                        />
        <RecommendedModal isOpen={isRecommendOpen}
                          onClose={onRecommendClose}
                          token={props.token}
                          username={props.username}
                          />
      

        </>
    )
}