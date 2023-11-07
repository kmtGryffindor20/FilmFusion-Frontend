import { Avatar, Wrap, WrapItem } from "@chakra-ui/react"
export default function Review(props){
    return(
        // return a review card with stars, date,  username, and review
        <div className="flex flex-col px-8 py-4 bg-secondary my-4 mx-8 justify-start w-full rounded-md">
            {props.title && <h3 className="text-white font-sans text-2xl">{props.title}</h3>}
            <Wrap>
                <WrapItem>
                    <Avatar name={props.username} src='https://bit.ly/tioluwani-kolawole' />
                <p className="text-white text-center font-sans ml-1 mt-4 opacity-75 font-thin text-sm">{props.date && props.date.split('T')[0]}</p>
                </WrapItem>
            <h4 className="text-2xl ml-auto text-white font-sans mt-4">{props.username}</h4>
            </Wrap> 
            <div className="flex flex-row">
                <p className="text-white justify-start text-left font-sans mt-4 ">{props.rating}</p>
                <img className="scale-75" src={props.stars} alt="" />
            </div>

            
            <p className="text-white font-sans mt-4">{props.review}</p>
        </div>
    )
}