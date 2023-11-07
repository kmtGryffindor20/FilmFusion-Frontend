import MovieList from "./MovieList";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

export default function RecommendedModal(props) {
    return (
        <Modal isCentered size={"6xl"} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
        <ModalContent>
          <ModalHeader className="text-center text-white bg-primary">Recommended Movies</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-primary items-center flex flex-col">
            <MovieList URI={`https://kmtgryffindor20.pythonanywhere.com/api/movies/recommendations/`} text="Watchlist +" />
          </ModalBody>
          <ModalFooter className="bg-primary">
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}