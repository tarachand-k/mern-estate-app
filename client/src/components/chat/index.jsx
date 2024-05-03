import { useState } from "react";
import "./index.scss";

function Chat() {
  const [chat, setChat] = useState(true);

  return (
    <div className="chat">
      <div className="messages">
        <h2>Messages</h2>
        <div className="message">
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
          </div>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="message">
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
          </div>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="message">
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
          </div>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="message">
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
          </div>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
      {chat && (
        <div className="chat-message-box">
          <div className="top">
            <div className="user">
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <span>John Doe</span>
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            <div className="chat-message">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chat-message own">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chat-message">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chat-message own">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chat-message">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chat-message own">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chat-message">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chat-message own">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chat-message">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chat-message own">
              <p>Lorem ipsum dolor sit amet.</p>
              <span>1 hour ago</span>
            </div>
          </div>
          <div className="bottom">
            <textarea></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
