import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { timestampParser } from "../../util";
import { addPost, getPosts } from "../../redux/features/postSlice";

function NewPostForm() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const { userData } = useSelector((state) => state.auth);
  const handlePost = async (e) => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("image", file);
      data.append("video", video);
      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Please Enter Message");
    }
  };
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };
  const cancelPost = (e) => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };
  const handleVideo = () => {
    let findLink = message.split(" ");
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes("https://www.yout") ||
        findLink[i].includes("https://yout")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/");
        setVideo(embed.split("&")[0]);
        findLink.splice(i, 1);
        setMessage(findLink.join(" "));
        setPostPicture("");
      }
    }
  };
  useEffect(() => {
    if (userData) setIsLoading(false);
    handleVideo();
  }, [userData, message, video]);
  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fa fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>
                Following:{" "}
                {userData && userData.following ? userData.following.length : 0}
              </span>
            </p>
            <p>
              <span>
                Followers:{" "}
                {userData && userData.followers ? userData.followers.length : 0}
              </span>
            </p>
          </div>
          <NavLink to="/profile">
            <div className="user-info">
              <img src={userData && userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="What's Up ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData && userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData && userData.pseudo}</h3>
                    </div>
                    <span>{userData && timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {video === "" && (
                  <>
                    <img src="./images/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="image"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video !== "" && (
                  <button onClick={() => setVideo("")}>Delete Video</button>
                )}
              </div>
              <div className="btn-send">
                {message || video.length > 20 || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Cancel Message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewPostForm;
