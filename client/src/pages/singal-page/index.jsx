import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

import Slider from "../../components/slider";
import "./index.scss";
import Map from "../../components/map";
import { useAuth } from "../../context/AuthProvider";
import apiRequests from "../../lib/api-requests";
import { useState } from "react";

function SingalPage() {
  const { post } = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved || false);
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const postDetail = post.postDetail;
  const user = post.user;

  async function handleSendMessage() {
    if (!currentUser) navigate("/sign-in");

    try {
      await apiRequests.post(
        "/chats",
        { recieverId: user.id },
        { withCredentials: true }
      );
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSavePost() {
    if (!currentUser) navigate("/sign-in");

    setSaved((curr) => !curr);
    try {
      await apiRequests.post(
        "/users/save",
        { postId: post.id },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      setSaved((curr) => !curr);
    }
  }

  return (
    <div className="singal-page">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <p className="price">${post.price}</p>
              </div>
              <div className="user">
                <img src={user.avatar || "/noavatar.png"} alt="" />
                <span>{user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="feature-box">
            <h2 className="title">General</h2>
            <div className="feature-list">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="feature-text">
                  <h3>Utilities</h3>
                  <p>
                    {postDetail.utilities === "owner"
                      ? "Owner is responsible"
                      : "Tenant is responsible"}
                  </p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="feature-text">
                  <h3>Pet Policy</h3>
                  <p>{postDetail.pet ? "Pets" : "Pets not"} Allowed</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="feature-text">
                  <h3>Income Policy</h3>
                  <p>{postDetail.income}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-box">
            <h2 className="title">Room Sizes</h2>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{postDetail.size} sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{post.bedroom || 1} beds</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>{post.bathroom || 1} bathroom</span>
              </div>
            </div>
          </div>
          <div className="feature-box">
            <h2 className="title">Nearby Places</h2>
            <div className="feature-list">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="feature-text">
                  <h3>School</h3>
                  <p>{postDetail.school}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/bus.png" alt="" />
                <div className="feature-text">
                  <h3>Bus Stop</h3>
                  <p>{postDetail.bus}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/restaurant.png" alt="" />
                <div className="feature-text">
                  <h3>Restaurant</h3>
                  <p>{postDetail.restaurant}m away</p>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-box">
            <h2 className="title">Location</h2>
            <div className="map-box">
              <Map items={[post]} />
            </div>
          </div>
          <div className="buttons">
            <button onClick={handleSendMessage}>
              <img src="/chat.png" alt="" />
              <span>Send a message</span>
            </button>
            <button
              onClick={handleSavePost}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              <span>{saved ? "Place Saved" : "Save the place"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingalPage;
