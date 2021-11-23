export default async(req, res) => {
  res.status(200).json({ name: 'messages' });

//     try{
//     const AllMessagesDocs= await db.collection('chats').doc(context.params.id).collection('messages').orderBy('timestamp','asc').get();
//     const messages=AllMessagesDocs.docs.map((doc)=>({
//         id:doc.id,
//         ...doc.data(),
//     })).map((message)=>({
//         ...message,
//         timestamp:message.timestamp.toDate().getTime(),
//         // as the timestamp is lost when data is transfered from backend to frontend, so i have to again map the messages to make new message objects with message data and extra timestamp so that timestamp can be stored separately
//     }))
//     res.status(200).send(messages)
//    }catch(err) {
//        res.status(500).json(err.message);
//    }
  }