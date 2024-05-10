import type {NextPage} from 'next'
import {Box, Flex, Text, chakra, ButtonGroup, Button, Heading} from "@chakra-ui/react";
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        height={"calc(100vh - 72px)"}
        flexDirection={"column"}
      >
        <Flex>
          <Heading
            as={"h1"}
            bgGradient='linear(to-r, #F0C3EC, #7F6AFF)'
            bgClip='text'
            fontSize={['6xl', '7xl', '8xl', '8xl']}
            fontWeight='extrabold'
            isTruncated
          >
            1ClickSuiDeFi
          </Heading>
        </Flex>
        <Flex
          justify={"center"}
          align={"center"}
          marginBottom={"5px"}>
          <Heading
            bgClip={"text"}
            color={"white"}
            fontSize={['l', 'xl', '2xl', '2xl']}
            textAlign={"center"}
          >
          Drag and Drop for your favorite DeFi protocols on SUI
          </Heading>
        </Flex>
        <Flex
          justify={"center"}
          align={"center"}
          marginBottom={"5px"}
        >
          <Text
            color={"grey"}
            fontSize={['small', 'medium', 'xl', 'xl']}
            textAlign={"center"}
          >
            Optimize your transactions with low fees thanks to &nbsp;
            <chakra.span
              bgGradient='linear(to-r, #F0C3EC, #7F6AFF)'
              bgClip='text'
            >
              SUI
            </chakra.span>
            ’s ecosystem
          </Text>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          width={"50%"}
          marginTop={"50px"}
        >
          <Link
            href={"/sui"} passHref
          >
            <Button
              background='transparent'
              width={"145px"}
              height='60px'
              borderRadius='35px'
              border='1px'
              borderColor='#FFFF'
              color="#F0C3EC"
              _hover={{bgGradient: 'linear(to-r, #F0C3EC, #7F6AFF)'}}
            >
              Explore protocols
            </Button>
          </Link>

          <Link href={"/batch"} passHref>
            <Button
              bg='transparent'
              width={"145px"}
              height='60px'
              borderRadius='35px'
              border='1px'
              borderColor='#FFFF'
              color="#F0C3EC"
              _hover={{bgGradient: 'linear(to-l, #F0C3EC, #7F6AFF)'}}
            >
              Gasless batch

            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}

export default Home
