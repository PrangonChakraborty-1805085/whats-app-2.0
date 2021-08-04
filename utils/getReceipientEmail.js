const getReceipientEmail=(userEmails,userLoggedinObj)=>(
     userEmails?.filter((userEmail)=>userEmail!==userLoggedinObj?.email)[0]
)
export default getReceipientEmail;