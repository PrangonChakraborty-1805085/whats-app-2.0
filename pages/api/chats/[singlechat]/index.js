// import { db } from "../../../firebase";

export default async(req, res) => {
    // res.status(200).json({ name: 'in single chat' })
    console.log(req.query.id);
    try{
    // const chatRes= await db.collection('chats').doc(req.query.id).get();
    // console.log('the whole chat doc with users and messages is ,',chatRes);
    // const chat={
    //     id:chatRes.id,
    //     ...chatRes.data(),
    // }
    //  res.status(200).json(chat);
   }catch(err){
       res.status(500).json(err);
   } 
  }