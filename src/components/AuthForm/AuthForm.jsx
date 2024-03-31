import { Box, VStack, Image, Text, Input, Button, Flex} from '@chakra-ui/react'
import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import GoogleAuth from './GoogleAuth'

const AuthForm = () => {
    const [isLogIn, setIsLogIn] = useState(true)

  return (
     <>
       <Box border={'1px solid'} borderRadius={5} padding={5}>
          <VStack spacing={4}>
                <Image src="/logo.png" h={24} cursor={"pointer"} alt="Instagram"/>


                {isLogIn ? <Login/> : <Signup/>}

                      
                {/* ---------------------OR Text---------------------------- */}

                <Flex alignItems={'center'} justifyContent={"center"} my={4} gap={1} w={'full'}>
                     <Box flex={2} h={"1px"} bg={"gray.400"}/>
                           <Text mx={1} color={"white"}>OR</Text>
                     <Box flex={2} h={"1px"} bg={"gray.400"}/>
                </Flex>


                 <GoogleAuth prefix={isLogIn ? "Log in" : "Sign up"}/>
          </VStack>
       </Box>

       <Box border={'1px solid gray'} borderRadius={5} padding={5} >
          <Flex alignItems={'center'} justifyContent={'center'}>
             <Box mx={2} fontSize={14}>
                {isLogIn ? "Don't have an account?" : "Already have an account?"}
             </Box>

             <Box onClick={()=> setIsLogIn(!isLogIn)} color={'blue.500'} cursor={'pointer'}>
                {isLogIn ? "Sign Up" : "Log In"}
             </Box>
          </Flex>
       </Box>
     </>
  )
}

export default AuthForm
