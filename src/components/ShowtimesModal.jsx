import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, HStack, Tag, TagLabel } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import Ticket from "./Ticket";

export default function ShowtimesModal(props){
    // create a chakra modal to show showtimes of movies and available seats

    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()
    const initialRefRegister = React.useRef()
    const finalRefRegister = React.useRef()

    const showtimes = [
        ("0", "9:00 AM"),
        ("1", "12:00 PM"),
        ("2", "3:00 PM"),
        ("3", "6:00 PM"),
        ("4", "9:00 PM"),
    ]

    const show_to_index = {
        "9:00 AM": 0,
        "12:00 PM": 1,
        "3:00 PM": 2,
        "6:00 PM": 3,
        "9:00 PM": 4,
    }


    const [selectedSeat, setSelectedSeat] = useState("")

    const [selectedShowtime, setSelectedShowtime] = useState("")

    const [ticketId , setTicketId] = useState("")


    // get available seats for the selected showtime
    const [availableSeats, setAvailableSeats] = useState([])
    
    useEffect(() => {
        async function getData(){
            const options = {
                "method":"GET",
                "headers": {
                    "Content-Type": "application/json"
                }
            }
            const response = await fetch(`https://kmtgryffindor20.pythonanywhere.com/api/tickets/available/${props.id}/${show_to_index[selectedShowtime]}/`, options)
            const this_data = await response.json()
            console.log(this_data)
            setAvailableSeats(this_data)
        }
        if (selectedShowtime){
            getData()
        }
    }, [selectedShowtime])




    function selectSeat(event){

        setSelectedSeat(event.target.innerText)
        console.log(event.target.innerText)
        // change color of selected seat
        // remove color of previously selected seat
        for (var i=1; i<101; i++){
            if (availableSeats.includes(i)){
                document.getElementById(i).classList = "w-12 mr-3 indent-3 h-8 bg-transparent border-teal-400 text-teal-400 border-2 mb-1 hover:text-white hover:bg-teal-400 rounded-md cursor-pointer"
            }
        }
        event.target.classList = "w-12 indent-3 mr-3 h-8 bg-teal-400 border-teal-400 text-white border-2 mb-1 hover:text-white hover:bg-teal-400 rounded-md cursor-pointer"
        
    }

    function selectShowtime(event){

        setSelectedShowtime(event.target.innerText)
        console.log(event.target.innerText)
        // change color of selected showtime
        // remove color of previously selected showtime
        for (var i=0; i<showtimes.length; i++){
            document.getElementById(showtimes[i]).classList = "w-24 mr-2 indent-3 h-8 bg-transparent border-gray-400 text-gray-400 border-2 mb-1 hover:text-black hover:bg-gray-400 rounded-md cursor-pointer"
        }
        event.target.classList = "w-24 mr-2 indent-3 h-8 bg-gray-400 border-gray-400 text-black border-2 mb-1 hover:text-black hover:bg-gray-400 rounded-md cursor-pointer"

    }

    var seats = []
    var count = 1
    // create seats
    for (var i=1; i<11; i++){
        var row = []
        for (var j=1; j<11; j++){
            if (availableSeats.includes(count)){
                row.push(<div id={count} onClick={selectSeat} className="w-12 indent-3 mr-3 h-8 bg-transparent border-teal-400 text-teal-400 border-2 mb-1 hover:text-white hover:bg-teal-400 rounded-md cursor-pointer" key={count}>{String.fromCharCode(j+64)+i}</div>)
            }
            else{
                row.push(<div id={count} className="w-12 indent-3 mr-3 h-8 bg-transparent border-gray-400 text-gray-400 border-2 mb-1 rounded-md">{String.fromCharCode(j+64)+i}</div>)
            }
            count += 1
        }
        seats.push(<div className="flex">{row}</div>)
    }

    var shows = showtimes.map((show) => (
        <div key={show_to_index[show]} id={show} onClick={selectShowtime} className="w-24 mr-2 indent-3 h-8 bg-transparent border-gray-400 text-gray-400 border-2 mb-1 hover:text-black hover:bg-gray-400 rounded-md cursor-pointer">{show} </div>
    ))

    const [bookTicket, setBookTicket] = useState(false)

    useEffect(() => {

        async function getData(){
            const options = {
                "method":"POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                "body": JSON.stringify({
                    "movie": props.id,
                    "show": show_to_index[selectedShowtime],
                    "seat": selectedSeat,
                    "price": 200
                })
            }
            const response = await fetch(`https://kmtgryffindor20.pythonanywhere.com/api/tickets/create/`, options)
            const this_data = await response.json()
            setTicketId(this_data["ticket_id"])
        }
        if (bookTicket){
            getData()
            setBookTicket(false)
            onRegisterClose()
            onTicketOpen()
        }
    }
    , [bookTicket])

    const { isOpen: isTicketOpen, onOpen: onTicketOpen, onClose: onTicketClose } = useDisclosure()
    
    return(
        <>
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
                
                <div className="flex">
                    {shows}
                </div>
                <h5 className="text-white ml-2 text-base">Choose Seats</h5>
                <div className="flex flex-col">
                    {seats}
                </div>
          </ModalBody>
  
          <ModalFooter>
            {localStorage.getItem('loggedIn') && <a onClick={()=>{setBookTicket(true)}} className="btn">
              Book
            </a>}
            {!localStorage.getItem('loggedIn') && <a onClick={onRegisterOpen} className="btn">
              Login to Book Tickets

            </a>}
            <a className="btn bg-white border-white hover:text-white" onClick={props.onShowClose}>Cancel</a>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <LoginModal  initialRefRegister={initialRefRegister}
                  finalRefRegister={finalRefRegister}
                  isRegisterOpen={isRegisterOpen}
                  onClose={onRegisterClose}
                 />

        <Ticket id={ticketId} isOpen={isTicketOpen} onClose={onTicketClose} title={props.title} showtime={selectedShowtime} seat={selectedSeat} />

        </>

        
    )
}