import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImg } from "../../redux/features/uploadSlice";

function UploadImage() {
  const dispatch = useDispatch();
  const [file, setFile] = useState({});
  const { userData } = useSelector((state) => state.auth);
  const handleUploadImg = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (userData) {
      data.append("pseudo", userData.pseudo);
      data.append("userId", userData._id);
      data.append("image", file);
    }
    dispatch(uploadImg(data));
  };
  return (
    <form action="" onSubmit={handleUploadImg} className="upload-pic">
      <label htmlFor="file">Change Picture</label>
      <input
        type="file"
        id="file"
        name="image"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Change Image" />
    </form>
  );
}

export default UploadImage;
