// Ticket modal that shows all tickets of the user
import { useState, useEffect } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import Review from "./Review"
export default function AllUserReviews(props) {

    const uri = "https://kmtgryffindor20.pythonanywhere.com/api/users/reviews/"

    const [reviews, setReviews] = useState([])


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
            setReviews(this_data['results'])
        }
        getData()
    }
    ,[reviews, localStorage.getItem('token')])

    var review_list = null
    try{
        review_list = reviews.map((review)=>
            <Review rating={review.rating} 
                    review={review.review_text}
                    title={review.moviename}
                    username={review.username}
                    date={review.review_date}
                    />
        )
    }
    catch{
        review_list = null
    }


    return (
        <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
        <ModalContent>
          <ModalHeader className="text-center text-white bg-primary">Your Reviews</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-primary items-center flex flex-col">
            {review_list}
          </ModalBody>
          <ModalFooter className="bg-primary">
            <a className="btn" onClick={props.onClose}>Close</a>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
}