import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Flex border={'1px solid red'} h='10vh' justifyContent={'space-between'} alignItems={'center'} px='2rem'>
      <Heading>Tummoc</Heading>
      <Flex gap='5rem'>
        <Link to='/login'><Text fontSize='2xl'>Login</Text></Link>
        <Link to='/signup'><Text fontSize='2xl'>signIn</Text></Link>
      </Flex>
      </Flex>
  )
}

export default Home