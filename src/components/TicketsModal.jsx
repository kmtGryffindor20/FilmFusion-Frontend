// Ticket modal that shows all tickets of the user
import { useState, useEffect } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
export default function TicketsModal(props) {

    const uri = "https://kmtgryffindor20.pythonanywhere.com/api/tickets/user/"

    const [tickets, setTickets] = useState([])

    const showtimes = {
        "0": "9:00 AM",
        "1": "12:00 PM",
        "2": "3:00 PM",
        "3": "6:00 PM",
        "4": "9:00 PM",
    
    }

    useEffect(() => {

        async function getData(){

            const options = {

                "method":"GET",

                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            }
            const response = await fetch(uri, options)
            const this_data = await response.json()
            setTickets(this_data['results'])
        }
        getData()
    }
    ,[])

    var ticket_list = null
    try{
        ticket_list = tickets.map((ticket)=>
            <div className="bg-secondary border-2 border-white text-white rounded-md mb-4 px-8 py-4 w-full">
                <h3>Movie: {ticket.ticket_id.split('-')[0]}</h3>
                <p>Ticket Id: {ticket.ticket_id}</p>
                <p>Time: {showtimes[ticket.show]}</p>
                <p>Seat Number: {ticket.seat}</p>
            </div>
        )
    }
    catch{
        ticket_list = null
    }


    return (
        <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
        <ModalContent>
          <ModalHeader className="text-center text-white bg-primary">Your Tickets</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-primary items-center flex flex-col">
            {ticket_list}
          </ModalBody>
          <ModalFooter className="bg-primary">
            <a className="btn" onClick={props.onClose}>Close</a>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
}