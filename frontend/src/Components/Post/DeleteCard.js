import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/features/postSlice";

function DeleteCard({ id }) {
  const dispatch = useDispatch();
  const deleteQuote = () => {
    dispatch(deletePost(id));
  };
  return (
    <div
      onClick={() => {
        if (window.confirm("Do You Want To Delete This Post??")) deleteQuote();
      }}
    >
      <img src="./images/icons/trash.svg" alt="trash" />
    </div>
  );
}

export default DeleteCard;
