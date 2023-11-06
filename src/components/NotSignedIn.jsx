import plus from "../assets/images/Plus.png"
import LoginModal from "./LoginModal";
import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";


export default function NotSignedIn(props){

    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()
    const initialRefRegister = useRef(null)
    const finalRefRegister = useRef(null)

    return(
        <>
            <div className="flex flex-col items-center mt-16">
                <a onClick={onRegisterOpen} ><img className="scale-75 cursor-pointer" src={plus} alt="" /></a>
                <h4 className="text-2xl text-white font-sans mt-4">Sign in to acess your Watchlist</h4>
                <a className="btn mt-4" onClick={onRegisterOpen}>Sign In</a>
            </div>
            <LoginModal initialRefRegister={initialRefRegister}
                  finalRefRegister={finalRefRegister}
                  isRegisterOpen={isRegisterOpen}
                  onClose={onRegisterClose}
                  setLoggedIn={props.setLoggedIn}
                  setToken={props.setToken}
                  setUsername={props.setUsername}
                   />
        </>
    );
}