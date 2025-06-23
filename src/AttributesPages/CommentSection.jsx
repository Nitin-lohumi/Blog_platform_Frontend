import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { Context } from "../HomePages/Home";

const CommentSection = ({ commentsSec, comment }) => {
  const values = useContext(Context);
  const [commentChange, setCommentsChange] = useState("");
  const [postComment, setPostComment] = useState(commentsSec || []);

  useEffect(() => {
    setPostComment(commentsSec);
  }, [commentsSec]);

  const handleChangeSend = async (postId) => {
    try {
      const res = await axios.post(
        `http://13.60.32.184:3000/posts/BlogPost/comment/${values.ProfileData._id}`,
        { postId, text: commentChange },
        { withCredentials: true }
      );

      const newComment = res.data.comment;
      setPostComment((prev) => [...prev, newComment]);
      setCommentsChange("");
    } catch (error) {
      console.error(error);
    }
  };
  async function handledeletecomment(commentId, postId) {
    console.log(commentId, postId);
    try {
      const res = await axios.post(
        `http://13.60.32.184:3000/posts/BlogPost/commentDelete/${values.ProfileData._id}`,
        { postId: postId, commentId: commentId },
        { withCredentials: true }
      );
      if (res.data) {
        setPostComment((prev) => prev.filter((c) => c._id !== commentId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {postComment && postComment.length > 0 ? (
        postComment.map((v, index) => (
          <div
            className="flex items-baseline justify-between w-full rounded-lg shadow-amber-200 shadow-sm"
            key={v._id || index}
            style={{ padding: "10px 0" }}
          >
            <div className="inline flex-col text-justify text-gray-900">
              <h1
                className="inline text-black pr-2"
                style={{
                  fontWeight: "lighter",
                  fontSize: "17px",
                  paddingRight: "10px",
                  textDecoration: "underline",
                }}
              >
                {v.userName} :
              </h1>
              {v.text}
              <span
                className="pl-2 font-semibold text-sm text-gray-700"
                style={{
                  fontWeight: "lighter",
                  fontSize: "11px",
                  paddingLeft: "10px",
                }}
              >
                {" " + moment(v.createdAt).fromNow()}
              </span>
            </div>
            <div className="items-end">
              {v.userId === values.ProfileData._id ? (
                <button
                  className="m-0 pl-5"
                  style={{ color: "red" }}
                  onClick={() => handledeletecomment(v._id, comment)}
                >
                  <RiDeleteBinLine />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
      <div
        className="flex items-center justify-center  mt-3 p-1"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: "10px",
        }}
      >
        <div className="w-full">
          <input
            type="text"
            className="w-full p-2"
            placeholder="Send Comments..."
            style={{ padding: "10px", width: "100%" }}
            value={commentChange}
            onChange={(e) => setCommentsChange(e.target.value)}
          />
        </div>
        <div style={{ width: "10%" }}>
          <button
            className="text-white bg-green-600"
            style={{ padding: "10px" }}
            onClick={() => handleChangeSend(comment)}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
