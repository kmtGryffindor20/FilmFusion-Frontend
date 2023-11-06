import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/react"
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box } from '@chakra-ui/react'


export default function LoginModal(props) {
    const [formData, setFormData] = useState({})
    const [loginResponse, setLoginResponse] = useState([{}])
    const [registerOrLogin, setRegisterOrLogin] = useState("Login")
    const [shouldRegister, setShouldRegister] = useState(false)

    const {
        isOpen: isVisible,
        onClose,
        onOpen,
      } = useDisclosure({ defaultIsOpen: false })

    function handleLoginFormChange(event){
        setFormData((prev)=>{
          return {
            ...prev,
            [event.target.name]: event.target.value
          }
        })
      }
  
      
  
  
      // Register useEffect
      const registerURI = "https://kmtgryffindor20.pythonanywhere.com/api/users/register/"
      useEffect(()=>{
      async function register(){
        const options = {
          "method":"POST",
          "body": JSON.stringify({
            "username": formData.username,
            "password": formData.password,
            "email": formData.email
      }
      ),
      "headers": {
        "Content-Type": "application/json"
      }
    }
        const response = await fetch(registerURI, options)
        const this_data = await response.json()
        console.log(this_data)
      }
      if (shouldRegister && registerOrLogin==="Register"){
        register()
        setShouldRegister(false)
      }
    },[shouldRegister])
  
  
      // Login useEffect
      const loginURI = "https://kmtgryffindor20.pythonanywhere.com/api/auth/"
      useEffect(()=>{
  
      async function login(){
        const options = {
          "method":"POST",
          "body": JSON.stringify({
            "username": formData.username,
            "password": formData.password,
      }
      ),
      "headers": {
        "Content-Type": "application/json"
      }
    }
        const response = await fetch(loginURI, options)
        const this_data = await response.json()
        console.log(this_data)
        setLoginResponse(this_data)
      }
      if (shouldRegister  && registerOrLogin==="Login"){
        login()
        setShouldRegister(false)
        props.onClose()
        onOpen()
      }
    },[shouldRegister])
  
  
    function handleSubmit(){
      setShouldRegister(true)
    }
    
    var spinner = null
    if (registerOrLogin==="Login"){
      try{
        if (loginResponse["token"]){
          props.setLoggedIn(true)
          props.setToken(loginResponse["token"])
          props.setUsername(loginResponse["username"])
          props.setEmail(loginResponse["email"])
          props.onClose()

        }
      }
      catch{
        spinner = <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
      }
    }


    return(
    <>
    <Modal
      initialFocusRef={props.initialRefRegister}
      finalFocusRef={props.finalRefRegister}
      isOpen={props.isRegisterOpen}
      onClose={props.onClose}
      size={"6xl"}
    >
      <ModalOverlay />
      <ModalContent  bg={"primary"}>
        <ModalHeader textColor={"white"}>{registerOrLogin==="Register"?"Register":"Login"}</ModalHeader>
        <ModalBody pb={6}>
            <ModalCloseButton color={"white"} />
          <FormControl>
            <FormLabel textColor={"white"}>Username</FormLabel>
            <Input className="border-purple text-white" ref={props.initialRefRegister} name="username" placeholder='Username' onChange={handleLoginFormChange} />
          </FormControl>
          {registerOrLogin=="Register" && <FormControl mt={4}>
            <FormLabel textColor={"white"}>Email</FormLabel>
            <Input className="border-purple text-white" name="email" placeholder='Email' onChange={handleLoginFormChange} />
          </FormControl>}
          <FormControl mt={4}>
            <FormLabel textColor={"white"}>Password</FormLabel>
            <Input type="password" className="border-purple text-white" name="password" placeholder='Password' onChange={handleLoginFormChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <a className="btn" onClick={()=>{setRegisterOrLogin((prev)=>{
            if (prev === "Login"){
              return "Register"
            }
            else{
              return "Login"
            }
          })}}>{registerOrLogin==="Register"?"Login":"Register"} Instead</a>

          <a onClick={handleSubmit}  className="btn">
            {registerOrLogin==="Register" ? "Register" : "Login"}
          </a>
          <a className="btn bg-white border-white hover:text-white" onClick={props.onClose}>Cancel</a>
      {spinner}

        </ModalFooter>
      </ModalContent>
    </Modal>

    {isVisible && <Alert status='success'>
      <AlertIcon />
      <Box>
        <AlertTitle>Logged In!</AlertTitle>
        <AlertDescription>
          Successfully Logged In!
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>}
    </>
      
    )
}