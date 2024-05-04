import { useState } from "react";
import { format } from "timeago.js";

import "./index.scss";
import { useAuth } from "../../context/AuthProvider";
import apiRequests from "../../lib/api-requests";

function Chat({ chats }) {
  const [currChat, setCurrChat] = useState(null);
  const { user } = useAuth();
  console.log(chats);

  async function handleOpenChat(chatId, reciever) {
    try {
      const chat = await apiRequests.get(`/chats/${chatId}`, {
        withCredentials: true,
      });
      setCurrChat({ ...chat.data.chat, reciever });
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
    } catch (err) {
      console.log(err);
    }
  }
  console.log(currChat);

  return (
    <div className="chat">
      <div className="messages">
        <h2>Messages</h2>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="message"
            onClick={() => handleOpenChat(chat.id, chat.reciever)}
            style={{
              backgroundColor: chat.seenBy.includes(user.id)
                ? "white"
                : "#fecd514e",
            }}
          >
            <div className="user">
              <img src={chat.reciever.avatar || "/noavatar.jpg"} alt="" />
              <span>{chat.reciever.username}</span>
            </div>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
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
