import db from "../database/dbconfig.js";

export const SendMessage = async (req, res) => {
  const sender = req.userid;
  const { message, receiver } = req.body;

  try {
    const SendmsgQuery = `INSERT INTO chat_messages (message,sender_id,receiver_id) VALUES (?,?,?)`;
    const [SendMessageResult] = await db.query(SendmsgQuery, [
      message,
      sender,
      receiver,
    ]);
    return res.status(200).json({ message: "Message send sucessfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in SendMessage" });
  }
};

export const ReceiveMessage= async (req,res)=>{
  const receiver=req.userid
  sender 
}

// export const FriendList=async (req.res)
