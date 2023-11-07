import { Modal } from "@chakra-ui/react"
import { ModalOverlay } from "@chakra-ui/react"
import { ModalContent } from "@chakra-ui/react"
import { ModalHeader } from "@chakra-ui/react"
import { ModalFooter } from "@chakra-ui/react"
import { ModalBody } from "@chakra-ui/react"
import { ModalCloseButton } from "@chakra-ui/react"

import MovieList from "./MovieList"
import { Wrap, WrapItem, Avatar } from "@chakra-ui/react"
export default function ProfileModal(props) {
    return (
        <>
        <Modal 
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={"6xl"}>
        <ModalOverlay />
        <ModalContent  bg={"primary"}>
          <ModalHeader textColor={"white"}>User Profile</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody className="flex items-center"  pb={6}>
          <Wrap>
            <WrapItem>
                <Avatar className="" size='2xl' name={localStorage.getItem('username')} src='' />
            </WrapItem>
            <h1 className="text-5xl text-white text-center mt-4 ml-4">{localStorage.getItem('username')}</h1>
            <h5 className="text-xl text-white text-center mt-8 ml-4">{localStorage.getItem('email')}</h5>
        </Wrap>
          </ModalBody>

          <ModalFooter className="flex flex-col">
            <h3 className="text-xl text-white">Your Watchlist</h3>
            <MovieList URI={`https://kmtgryffindor20.pythonanywhere.com/api/users/watchlist/`} text="Remove" />
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}