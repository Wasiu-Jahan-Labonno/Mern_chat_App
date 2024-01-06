import React, { useEffect, useState } from "react";
import axios from "axios"; // Add this line

const Chatpage = () => {
  const [chats, setChats] = useState([]);

  const fatchChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChats(data);
  };
  useEffect(() => {
    fatchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chatpage;
