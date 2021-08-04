import styled from "styled-components"
import React from 'react'
import Head from 'next/head'
import {Button} from "@material-ui/core"
import {auth,provider} from "../firebase"
function Login() {

    const signin=()=>{
      auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"/>
                <Button onClick={signin} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container=styled.div`
  display:grid;
  place-items: center;
  height:100vh;
  background-color:whitesmoke;

`;
const LoginContainer=styled.div`
  padding:100px;
  align-items:center;
  display:flex;
  flex-direction: column;
  background-color:white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgb(0 0 0 / 70%);
`;
const Logo=styled.img`
height:200px;
width:200px;
margin-bottom: 50px;
`;