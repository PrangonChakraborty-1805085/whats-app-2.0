// install moment to get Timestamp component library using yarn add. It is useful for managing time.. Here I could also use react-timestamp. I had to install react-timestamp then and could use Timestamp component

import styled from 'styled-components'
import {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import moment from 'moment';
function Message({userEmail,message}) {
    
    const [userLoggedIn]=useAuthState(auth);
    const TypeOfMessage=(userEmail===userLoggedIn.email)?Sender:Receiver;
    return (
        <Container>
            <TypeOfMessage>
            {message.message}
            <TimeStamp>
            {message.timestamp?moment(message.timestamp).format('LT'):'...'}
            </TimeStamp>
            </TypeOfMessage>
           
        </Container>
    )
}

export default Message
const Container = styled.div`
`;
const MessageElement=styled.p`
  width: -moz-fit-content;
  width: fit-content;
  padding:15px;
  border-radius: 8px;
  margin:10px;
  min-width:80px;
  text-align:right;
  position:relative;
  padding-bottom: 36px;
  font-size: 20px;
`;
// i will override this MessageElement in two different element, Sender and Receiver so that i don't need to write the same code multiple times. I will just add some extra code in the sender and receiver element but the base code will remain same
const Sender= styled(MessageElement)`
  margin-left:auto;
  background-color: #dcf8c6;
`;
const Receiver=styled(MessageElement)`
  background-color: whitesmoke;
  text-align:left;
`;
const TimeStamp=styled.span`
 color:gray;
 padding:10px;
 font-size:14px;
 position:absolute;
 bottom:0;
 right:0;
 text-align:right;
`;