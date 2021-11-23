import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import getReceipientEmail from "../../utils/getReceipientEmail";
import admin from '../../firebase_admin'
function Chat({chat,messages}) {
  // const router = useRouter();
  // const AllMessagesDocs = db
  //   .collection("chats")
  //   .doc(router.query.id)
  //   .collection("messages")
  //   .orderBy("timestamp", "asc")
  //   .get();
  // // console.log('all messages docs are',AllMessagesDocs);
  // const messages_response = AllMessagesDocs.docs
  //   ?.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }))
  //   .map((message) => ({
  //     ...message,
  //     timestamp: message.timestamp.toDate().getTime(),
  //     // as the timestamp is lost when data is transfered from backend to frontend, so i have to again map the messages to make new message objects with message data and extra timestamp so that timestamp can be stored separately
  //   }));
  // const messages = JSON.stringify(messages_response);
  // //preparing the chats on the server
  // const chatRes = db.collection("chats").doc(router.query.id).get();
  // // console.log('the whole chat doc with users and messages is ,',chatRes);
  // console.log('chat response is ',chatRes);
  // const chat = {
  //   id: chatRes.id,
  //   ...chatRes.data(),
  // };
  // console.log('router id is ',router.query.id);
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getReceipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context){

    const app_db=admin.firestore();

    //  const chatResponse=await fetch(`http://localhost:3000/api/chats/${context.params.id}`,{method: 'GET'});
    //  const chatdata=await chatResponse.json();

    //  const messagesResponse=await fetch(`http://localhost:3000/api/chats/${context.params.id}/messages`,{method: 'GET'});
    //  const messagesData=await messagesResponse.json();
    //preparing the messages on the server
    const AllMessagesDocs= await app_db.collection('chats').doc(context.params.id).collection('messages').orderBy('timestamp','asc').get();
    const messages=AllMessagesDocs.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
    })).map((message)=>({
        ...message,
        timestamp:message.timestamp.toDate().getTime(),
        // as the timestamp is lost when data is transfered from backend to frontend, so i have to again map the messages to make new message objects with message data and extra timestamp so that timestamp can be stored separately
    }))
    // console.log('all messages  are',JSON.stringify(messages));

    //preparing the chats on the server
    const chatRes= await app_db.collection('chats').doc(context.params.id).get();
    // console.log('the whole chat doc with users and messages is ,',chatRes);
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
    //     return {
    //     props:{
    //         messages:JSON.stringify(messagesData),
    //         chat:chatdata,

    //     }
    // }
}
const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms--ms-overflow-style: none;
  scrollbar-width: none;
`;
