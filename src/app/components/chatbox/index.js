"use client";
import style from "./index.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import pusherJs from "pusher-js";
import { BsFillSendCheckFill } from "react-icons/bs";
import axios from "axios";
import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import { AiOutlineClose } from "react-icons/ai";

export default function Chatbox({ showChatBox }) {
  const { data: session } = useSession();
  const [username, set_username] = useState("Hygge User");
  const [user_id, set_user_id] = useState();
  const [messages, set_messages] = useState([]);
  const [message, set_message] = useState("");

  let allMessage = [];
  useEffect(() => {
    set_username(session?.user?.name);
    set_user_id(session?.user?.id);
  }, [session]);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("186ee310c9ca72d2af51", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      allMessage.push(data);
      set_messages(allMessage);
    });
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.HTTPS_URL}/api/message`,
        {
          userId: user_id,
          username: username,
          message: message,
          toId: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {}
    set_message("");
  };
  return (
    <div className={style.chat_box}>
      <div className={style.title}>
        <Image
          width={40}
          height={40}
          src={avaReview1}
          alt="logo"
          className="object-cover rounded-full"
        />
        <span className="flex-grow text-start">Hygge Shop</span>
        <AiOutlineClose
          className="text-white hover:text-gray-300 cursor-pointer"
          onClick={showChatBox}
        />
      </div>
      <div className={style.list_chat}>
        {messages
          .filter((messagef) => messagef.userId == user_id || messagef.toId == user_id)
          .map((message, index) => (
            <div key={index}>
              {message.userId == user_id ? (
                <div className={style.mess_from_me}>
                  <span className="text-gray-400 text-sm">You</span> <br />
                  {message.message}
                </div>
              ) : (
                <div className={style.mess_to_me}>
                  <span className="text-gray-400 text-sm">Hygee</span> <br />
                  {message.message}
                </div>
              )}
            </div>
          ))}
      </div>
      <form
        className="relative"
        onSubmit={submit}
      >
        <input
          className={style.input_message}
          value={message}
          onChange={(e) => set_message(e.target.value)}
          placeholder="Enter your message!"
        ></input>
        <BsFillSendCheckFill
          className={style.icon_send}
          onSubmit={submit}
        ></BsFillSendCheckFill>
      </form>
    </div>
  );
}