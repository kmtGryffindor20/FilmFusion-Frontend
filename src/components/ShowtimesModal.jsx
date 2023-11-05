import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, HStack, Tag, TagLabel } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react";

export default function ShowtimesModal(props){
    // create a chakra modal to show showtimes of movies and available seats

    const showtimes = [
        ("0", "9:00 AM"),
        ("1", "12:00 PM"),
        ("2", "3:00 PM"),
        ("3", "6:00 PM"),
        ("4", "9:00 PM"),
    ]

    const [sendMovie, setSendMovie] = useState(false)
    


    var seats = []
    var count = 1
    for(var i=1; i<11; i++){
        var row = []
        for(var j=1; j<11; j++){
            row.push(<Tag className="mb-2 cursor-pointer hover:animate-pulse bg-white" size={"lg"} variant="solid"  key={count}>
            <TagLabel>{String.fromCharCode(j+64)+i}</TagLabel>
        </Tag>)
            count+=1
        }
        seats.push(<div className="grid grid-cols-10 w-4/5 gap-2" key={i}>{row}</div>)
    }

    var shows = showtimes.map((show) => (
        <Tag className="ml-2 cursor-pointer hover:animate-pulse" size={"lg"} variant="solid" colorScheme="teal" key={show[0]}>
            <TagLabel>{show}</TagLabel>
        </Tag>
    ))
    
    return(
        <Modal
        isOpen={props.isShowOpen}
        onClose={props.onShowClose}
        size={"6xl"}
      >
        <ModalOverlay />
        <ModalContent  bg={"primary"}>
          <ModalHeader textColor={"white"}>Book Tickets</ModalHeader>
          <ModalBody pb={6}>
              <ModalCloseButton color={"white"} />
              <h3 className="text-white text-lg ml-2" >Tickets for <span className="text-xl font-bold">{props.title}</span></h3>
              <h5 className="text-white ml-2 text-base">Choose ShowTime</h5>
                {shows}
                <h5 className="text-white ml-2 text-base">Choose Seats</h5>
                <div className="flex flex-col">
                    {seats}
                </div>
          </ModalBody>
  
          <ModalFooter>
            <a onClick={()=>{setSendMovie(false)}} className="btn">
              Book
            </a>
            <a className="btn bg-white border-white hover:text-white" onClick={props.onShowClose}>Cancel</a>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}