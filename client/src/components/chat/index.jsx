import { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";

import "./index.scss";
import { useAuth } from "../../context/AuthProvider";
import apiRequests from "../../lib/api-requests";
import { useSocket } from "../../context/SocketProvider";
import { useNotificationStore } from "../../lib/notification-store";
import Loader from "../loader";

function Chat() {
  const [chats, setChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currChat, setCurrChat] = useState(null);
  const { user } = useAuth();
  const { socket } = useSocket();
  const scrollRef = useRef();
  const decreaseNotification = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    async function fetchChats() {
      setIsLoading(true);
      try {
        const chats = await apiRequests("/chats", { withCredentials: true });
        setChats(chats.data.chats);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChats();
  }, []);

  useEffect(() => {
    async function read() {
      try {
        await apiRequests("/chats/read/" + currChat.id);
      } catch (err) {
        console.log(err);
      }
    }

    if (currChat && socket) {
      socket.on("getMessage", (data) => {
        if (currChat?.id === data?.chatId) {
          console.log(data);
          setCurrChat((curr) => {
            return { ...curr, messages: [...curr.messages, data] };
          });
          read();
        }
      });
    }

    return () => socket.off("getMessage");
  }, [socket, currChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currChat]);

  async function handleOpenChat(chatId, reciever) {
    try {
      const chat = await apiRequests.get(`/chats/${chatId}`, {
        withCredentials: true,
      });
      const activeChat = chat.data.chat;
      console.log(activeChat);

      if (activeChat.seenBy.length === 2 && activeChat.seenBy.includes(user.id))
        decreaseNotification();
      setCurrChat({ ...activeChat, reciever });

      setChats((curr) => {
        return curr.map((currChat) =>
          currChat.id === activeChat.id
            ? { ...currChat, seenBy: activeChat.seenBy }
            : currChat
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const text = formData.get("text");
    if (!text) return;

    try {
      const res = await apiRequests.post(
        "/messages/" + currChat.id,
        { text },
        {
          withCredentials: true,
        }
      );
      setCurrChat((curr) => ({
        ...curr,
        messages: [...curr.messages, res.data.message],
      }));

      event.target.reset();

      console.log(currChat);
      socket.emit("sendMessage", {
        recieverId: currChat.reciever.id,
        data: res.data.message,
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) return <Loader />;

  return (
    <div className="chat">
      <div className="messages">
        <h2>Messages</h2>
        {chats &&
          chats.map((chat) => {
            console.log(chat.seenBy.includes(user.id));
            return (
              <div
                key={chat.id}
                className={`message ${
                  chat.seenBy.includes(user.id) || currChat?.id === chat.id
                    ? ""
                    : "unseen"
                }`}
                onClick={() => handleOpenChat(chat.id, chat.reciever)}
              >
                <div className="user">
                  <img src={chat.reciever.avatar || "/noavatar.jpg"} alt="" />
                  <span>{chat.reciever.username}</span>
                </div>
                <p>{chat.lastMessage}</p>
              </div>
            );
          })}
      </div>
      {currChat && (
        <div className="chat-message-box">
          <div className="top">
            <div className="user">
              <img src={currChat.reciever.avatar || "/noavatar.jpg"} alt="" />
              <span>{currChat.reciever.username}</span>
            </div>
            <span className="close" onClick={() => setCurrChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {currChat.messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${
                  message.userId === user.id ? "own" : undefined
                }`}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={scrollRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
