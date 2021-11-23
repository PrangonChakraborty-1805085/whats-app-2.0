// install time-ago react library using yarn add. This is used to see active seconds ago or minutes ago

import styled from  "styled-components"
import {auth, db} from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import Message from "./Message";
import {useState} from "react";
import firebase from "firebase"
import getReceipientEmail from "../utils/getReceipientEmail";
import TimeAgo from "timeago-react"
import { useRef } from "react";
function ChatScreen({chat,messages}) {
    const [user]=useAuthState(auth);

    const endOfMessagesRef=useRef(null); // i have to learn what it is

    const receipientEmail=getReceipientEmail(chat.users,user);
    const router=useRouter();
    const [input, setinput] = useState("");
    const [messageSnapShot]=useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'));

    const [receipientSnapShot] = useCollection(db.collection('users').where('email','==',receipientEmail));
    const showMessages=()=>{
         if(messageSnapShot){
             return messageSnapShot?.docs.map((message)=>(
                 <Message 
                 key={message.id}
                 userEmail={message.data().user}
                 message={
                     {
                         ...message.data(),
                         timestamp:message.data().timestamp?.toDate().getTime(),
                     }
                 }

                />
             ))
         }
         else {
             return JSON.parse(messages).map((message)=>(
                <Message 
                key={message.id}
                userEmail={message.user}
                message={message}

               />
             ))
         }
    }

    const scrollToBottom=()=>{
        endOfMessagesRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start",

        })
    }
     
    const sendMessage=(event)=>{
       event.preventDefault();

       //update last Seen
       db.collection('users').doc(user.uid).set({
          lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
       },{merge:true})

       //sending message to database
       db.collection('chats').doc(router.query.id).collection('messages').add({
           timestamp:firebase.firestore.FieldValue.serverTimestamp(),
           message:input,
           user:user.email,
           permitted:receipientEmail,
           photoURL:user.photoURL,
       })

       //cleaning stored message in input state
       setinput('');
       scrollToBottom();
    }

    const receipientData=receipientSnapShot?.docs?.[0]?.data();

    return (
        <Container>
            <Header>
            {
                receipientData?(
                    <Avatar src={receipientData?.photoURL}/>
                ):(
                    <Avatar>{receipientEmail[0]}</Avatar>
                )
            }
           
             <HeaderInformation>
                 <h3>{receipientEmail}</h3>
                 {/* showing last active */}
                 {
                     receipientSnapShot?(
                    <p>Last active:{' '}
                    {
                        receipientData?.lastSeen?.toDate()?(
                        <TimeAgo datetime={receipientData?.lastSeen?.toDate()}/>
                    ):"Unavaiable"
                    }</p>
                 ):(
                     <p>Loading...</p>
                 )}
                 
             </HeaderInformation>

             <HeaderIcons>
               <IconButton>
                   <AttachFileIcon />
               </IconButton>

               <IconButton>
                   <MoreVertIcon />
               </IconButton>
             </HeaderIcons>
            </Header>

            <MessageContainer>
                {/* function for message */}
                {showMessages()}
                <EndofMessage ref={endOfMessagesRef}/>
            </MessageContainer>

            <InputContainer>
              <InsertEmoticonIcon/>
              <Input value={input} onChange={event=>setinput(event.target.value)}/>
              <button hidden disabled={!input} type="submit" onClick={sendMessage}></button>
              <MicIcon/>
            </InputContainer>

        </Container>
    )
}

export default ChatScreen
const Container = styled.div``
const Header = styled.div`
  position:sticky;
  top:0;
  z-index:100;
  background-color: white;
  display:flex;
  align-items:center;
  padding:11px;
  height:80px;
  border-bottom: 1px solid whitesmoke;
`
const HeaderInformation = styled.div`
 margin-left:15px;
 flex:1;
  > h3{
   margin-bottom: 3px;
 }
 >p{
     font-size: 14px;
     color:grey;
 }
`
const HeaderIcons = styled.div``
const MessageContainer=styled.div`
   padding:30px;
   min-height:90vh;
   background-color: #e5ded8;
`
const EndofMessage=styled.div`
  margin-bottom: 70px;
`
const InputContainer=styled.form`
  display:flex;
  align-items:center;
  position: sticky;
  bottom: 0;
  z-index:100;
  padding:10px;
  background-color:white;
`
const Input= styled.input`
  flex:1;
  padding:15px;
  font-size: 20px;
  background-color: whitesmoke;
  border:none;
  outline:none;
  border-radius:10px;
  margin-left:15px;
  margin-right:15px;
`;