// import { db } from "../../../firebase";

export default async(req, res) => {
    res.status(200).json({ name: 'in all  chats' })

//     try{
//     const chatRes= await db.collection('chats').doc(context.params.id).get();
//     // console.log('the whole chat doc with users and messages is ,',chatRes);
//     const chat={
//         id:chatRes.id,
//         ...chatRes.data(),
//     }
//      res.status(200).send(chat);
//    }catch(err){
//        res.status(500).send(err.message);
//    } 
  }