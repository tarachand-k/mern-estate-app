import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import { useAuth } from "../../context/AuthProvider";
import apiRequest from "../../lib/api-requests";
import UploadWidget from "../../components/upload-widget";

function ProfileUpdatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, updateUser } = useAuth();
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { username, email, password } = Object.fromEntries(formData);

    setIsLoading(true);
    try {
      const updatedUser = await apiRequest.put(
        `/users/${user.id}`,
        {
          username,
          email,
          password,
          avatar: avatar[0],
        },
        { withCredentials: true }
      );

      updateUser(updatedUser?.data?.updatedUser);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              defaultValue={user.username}
              type="text"
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              defaultValue={user.email}
              type="email"
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={isLoading}>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || user.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dnkrojle1",
            uploadPreset: "estate-app",
            multiple: false, //restrict upload to a single file
            folder: "avatars", //upload files to the specified folder
            // clientAllowedFormats: ["images"], //restrict uploading to image files only
            maxImageFileSize: 2000000, //restrict file size to less than 2MB
            // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
            // theme: "purple", //change to a purple theme
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
