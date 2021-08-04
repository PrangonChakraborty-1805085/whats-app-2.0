import Head from "next/head";
import styled from "styled-components"
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import getReceipientEmail from "../../utils/getReceipientEmail";
function Chat({chat,messages}) {

    const [user]=useAuthState(auth);
    return (
        <Container>
            <Head>
                <title>Chat with {getReceipientEmail(chat.users,user)}</title>  
            </Head>
            <Sidebar/>
            <ChatContainer>
             <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat;

export async function getServerSideProps(context){
    //getting the chat id of the specific chat
    const chatID=db.collection('chats').doc(context.query.id);
    //preparing the messages on the server
    const AllMessagesDocs= await chatID.collection('messages').orderBy('timestamp','asc').get();
    const messages=AllMessagesDocs.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
    })).map((message)=>({
        ...message,
        timestamp:message.timestamp.toDate().getTime(),
        //as the timestamp is lost when data is transfered from backend to frontend, so i have to again map the messages to make new message objects with message data and extra timestamp so that timestamp can be stored separately
    }))

    //preparing the chats on the server
    const chatRes= await chatID.get();
    const chat={
        id:chatRes.id,
        ...chatRes.data(),
    }
    return {
        props:{
            messages:JSON.stringify(messages),
            chat:chat,

        }
    }
}
const Container=styled.div`
  display:flex;
`;
const ChatContainer = styled.div`
  flex:1;
  overflow:scroll;
  height:100vh;
  ::-webkit-scrollbar{
    display:none;
  }
  -ms--ms-overflow-style:none;
  scrollbar-width: none;
`;