import { useDisclosure } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

import { useState } from "react"

export default function MovieDetail() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
  
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal onClose={onClose} size='full' isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              faesgbhsb
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }