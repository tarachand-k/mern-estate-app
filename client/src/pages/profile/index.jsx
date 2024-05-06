import { Suspense, useState } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";

import "./index.scss";
import Chat from "../../components/chat";
import List from "../../components/list";
import apiRequest from "../../lib/api-requests";
import { useAuth } from "../../context/AuthProvider";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const data = useLoaderData();

  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  async function handleLogout() {
    setIsLoading(true);
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  }
  return (
    <div className="profile-page">
      <div className="details">
        <div className="wrapper">
          <div className="detail">
            <div className="title">
              <h2>User Information</h2>
              <Link to="/profile/update">
                <button>Update Profile</button>
              </Link>
            </div>
            <div className="info">
              <span>
                Avatar: <img src={user.avatar || "/noavatar.jpg"} alt="" />
              </span>
              <span>
                Username: <b>{user.username}</b>
              </span>
              <span>
                Email: <b>{user.email}</b>
              </span>
              <button disabled={isLoading} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="detail">
            <div className="title">
              <h2>My List</h2>
              <Link to="/create-post">
                <button>Create New Post</button>
              </Link>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading your posts!</p>}
              >
                {(postResponse) => <List posts={postResponse.data.userPosts} />}
              </Await>
            </Suspense>
          </div>
          <div className="detail">
            <div className="title">
              <h2>Saved List</h2>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading your posts!</p>}
              >
                {(postResponse) => (
                  <List posts={postResponse.data.savedPosts} type={"save"} />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
      <div className="chat-box">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Profile;
