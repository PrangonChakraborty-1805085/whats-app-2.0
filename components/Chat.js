import styled from "styled-components";
import { Avatar} from "@material-ui/core";
import {useAuthState} from 'react-firebase-hooks/auth'
import getReceipientEmail from "../utils/getReceipientEmail";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

function Chat({ id, users }) {
  
  const router=useRouter();

  const [user]=useAuthState(auth);
  const receipientEmail=getReceipientEmail(users,user);
  const [receipientSnapShot]=useCollection(db.collection('users').where('email','==',receipientEmail)); // this will give me the array of 1 element where the element is a user object with this email,photoURL and lastSeen..1 element is because the useCollection is filtering the users collection by this email..and only 1 user can have a unique email.there can not be multiple users with same email
  
  const receipientData=receipientSnapShot?.docs?.[0]?.data();
  // console.log('in chat.js');
  // console.log('receipientdata is ',receipientData);
  const enterChat=()=>{
    router.push(`/chat/${id}`);
  }
  return <Container onClick={enterChat}>
  {receipientData?(
    <UserAvatar src={receipientData?.photoURL}/>
  ):(
    <UserAvatar>{receipientEmail[0]}</UserAvatar>
  )}
     <p>{receipientEmail}</p>
  </Container>;
}

export default Chat;
const Container = styled.div`
   display:flex;
   align-items: center;
   cursor:pointer;
   padding: 15px;
   word-break: break-word;

   :hover {
     background-color: #ebe8e8;
   }
 `;
const UserAvatar = styled(Avatar)`
 margin: 5px;
 margin-right: 15px;
`;
