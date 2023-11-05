import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react"
export default function Ticket(props) {

    // return a ticket component of the movie ticket
    return (
        <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
        <ModalContent>
          <ModalHeader className="text-center">{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="items-center flex flex-col">
            <p>Ticket Id: {props.id}</p>
            <p>Time: {props.showtime}</p>
            <p>Seat Number: {props.seat}</p>
          </ModalBody>
          <ModalFooter>
            <div  className="flex justify-between">
            <a className="btn">Download</a>
            <a className="btn" onClick={props.onClose}>Close</a>
            </div>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}