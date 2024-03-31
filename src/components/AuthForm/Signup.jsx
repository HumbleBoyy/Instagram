import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Input, Button, InputGroup, InputRightElement, Alert, AlertIcon} from '@chakra-ui/react'

import { useState } from 'react';
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [inputs, setInputs] = useState({
      fullName:"",
      username:"",
      email:"",
      password:"",
  });

       
  const {loading, error, signUp} = useSignUpWithEmailAndPassword()
  return (
    <>

    
               <Input
                  placeholder='Name'
                  type='text'
                  fontSize={14}
                  size={"sm"}
                  value={inputs.fullName}
                  onChange={(e)=> setInputs({...inputs, fullName: e.target.value})}
               />
               <Input
                  placeholder='Username'
                  type='text'
                  fontSize={14}
                  size={"sm"}
                  value={inputs.username}
                  onChange={(e)=> setInputs({...inputs, username: e.target.value})}
               />
               <Input
                  placeholder='Email'
                  type='email'
                  size={"sm"}
                  fontSize={14}
                  value={inputs.email}
                  onChange={(e)=> setInputs({...inputs, email: e.target.value})}
               />
         
               <InputGroup>
                     <Input
                        placeholder='Password'
                        type={showPassword ? "text" : "password"}
                        fontSize={14}
                        size={"sm"}
                        value={inputs.password}
                        onChange={(e)=> setInputs({...inputs, password: e.target.value})}
                     />


                     <InputRightElement h={'full'} >
                       <Button variant={'ghost'} size={'sm'} onClick={()=> setShowPassword(!showPassword)}>
                             {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                       </Button>
                     </InputRightElement>
               </InputGroup>

              {error && (
               <Alert status='error' fontSize={13} p={2} borderRadius={5}>
                   <AlertIcon fontSize={12}/>
                   {error.message}
               </Alert>
              )}

               <Button w={"full"} colorScheme='blue' size={'sm'} fontSize={14}
                isLoading={loading}
                onClick={()=> signUp(inputs)}
                >
                  Sign Up
               </Button>

    </>
 )
}

export default Signup
