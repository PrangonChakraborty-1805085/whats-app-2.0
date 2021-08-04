// install firebase, email-validator,material-ui-core,material-ui-icons,styled-components,react-firebase-hook,

import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from "./Chat";
function Sidebar() {
   
  const [user]=useAuthState(auth);
  const userRef=db.collection('chats').where('users','array-contains',user.email);
  const [chatSnapshot]=useCollection(userRef);

  const chatAlreadyExits=(receipentEmail) => 
     ( 
       chatSnapshot?.docs.find((chat)=>chat.data().users.find((user)=> user===receipentEmail)?.length>0)
     )
  const createChat = () => {
      const input=prompt('Please enter the email address for the user you want to chat with');
      if(!input) return null;
      if(EmailValidator.validate(input) && !chatAlreadyExits(input)  && input!==user.email) {
          //we need to add the chat in the db
          db.collection('chats').add({
                users: [user.email,input],
          });
      }
  }  
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={()=>auth.signOut() } />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon/>
        <SearchInput placeholder="Search in chats"/>
      </Search>

      <SearchBarButton onClick={createChat}>START A NEW CHAT</SearchBarButton>
      {/* list of chats */}
      {chatSnapshot?.docs.map((chat)=>(
        <Chat key={chat.id} id={chat.id} users={chat.data().users}/> 
      ))}

    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
 flex:0.45;
 border-right: 1px solid whitesmoke;
 height:100vh;
 min-width:300px;
 max-width: 350px;
 overflow-y: scroll;
 ::-webkit-scrollbar{
   display:none;
 }
 -ms-overflow-style:none;
 scrollbar-width: none;
`;
const Header = styled.div`
   display:flex;
   position:sticky;
   top:0;
   background-color:white;
   z-index:1;
   justify-content: space-between;
   align-items: center;
   padding: 15px;
   height: 80px;
   border-bottom: 1px solid whitesmoke;

`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover{
      opacity:0.8
  }
`;
const IconsContainer = styled.div``;
const Search = styled.div`
  display:flex;
  align-items:center;
  padding:20px;
  border-radius:2px;
`;
const SearchInput=styled.input`
  outline-width: 0;
  border:none;
  flex:1;
`;
const SearchBarButton=styled(Button)`
   width:100%;
   &&&{
    border-top:1px solid whitesmoke;
   border-bottom:1px solid whitesmoke;
   }
  
`;

