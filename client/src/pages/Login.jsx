import { Button, Flex, Heading, HStack, Input,Link, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { LoginFn } from '../redux/action'
import { useDispatch } from 'react-redux'
const Login = () => {
    const toast = useToast()
    const dispatch = useDispatch()
    const [userDetail, setUserDetail] = useState({
        password: '',
        email:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetail({
            ...userDetail,
            [name]:value
        })
    }
    const handleSubmit = () => {
        const {username,email,password} = userDetail
        if (username === '' || email === '' || password === '') return 
        let response = dispatch(LoginFn(userDetail))
        console.log(response)
    }
  return (
      <Flex h='100vh' justifyContent={'center'} alignItems='center'>
          <VStack w='400px' gap='1rem' border={'1px solid rgba(1,1,1,.5)'} p='2rem'>
              <Heading>login</Heading>
              <Input onChange={handleChange} name='email' type='email' placeholder='Enter email' />
              <Input onChange={handleChange} name='password' type='password' placeholder='Enter password' />
              <Button onClick={handleSubmit} w='100%' colorScheme={'facebook'}>Login</Button>
             <Link href='https://tummoc-assesment.vercel.app/auth/google'> <Button w='100' color='black' bgColor={'white'}>login with google</Button></Link>
              <HStack>
                  <Text>Dont have an account?</Text>
                  <Link to='/signup'>signup</Link>
              </HStack>
          </VStack>
    </Flex>
  )
}
export default Login