import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../redux/features/postSlice";

function EditDeleteComment({ comment, postId }) {
  const dispatch = useDispatch();
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const { userData } = useSelector((state) => state.auth);
  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(editComment({ id: postId, commentId: comment._id, text }));
      setText("");
      setEdit(!edit);
    }
  };
  const handleDelete = () => {
    dispatch(deleteComment({ id: postId, commentId: comment._id }));
  };
  useEffect(() => {
    const checkAuthor = () => {
      if (userData && userData._id === comment.commenterId) setIsAuthor(true);
    };
    checkAuthor();
  }, [userData._id, comment.commenterId]);
  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./images/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" className="edit-comment-form" onSubmit={handleEdit}>
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Edit
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Do You Want To Delete This Comment??"))
                  handleDelete();
              }}
            >
              <img src="./images/icons/trash.svg" alt="delete" />
            </span>
          </div>
          <input type="submit" value="Validate Changes" />
        </form>
      )}
    </div>
  );
}

export default EditDeleteComment;
