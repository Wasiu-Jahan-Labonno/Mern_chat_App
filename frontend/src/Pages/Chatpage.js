import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import axios from "axios"; // Add this line
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";

const Chatpage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <Chatbox />}
      </Box>

      {/* {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))} */}
    </div>
  );
};

export default Chatpage;
