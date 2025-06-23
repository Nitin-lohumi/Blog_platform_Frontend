import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import moment from "moment";
import CommentSection from "./CommentSection";
const SinglePost = ({
  p,
  setPostIds,
  handleToggleDescription,
  submitLike,
  expandedDescriptions,
  NavigateProfile,
  handleCommentSection,
  comment,
  commentsSec,
}) => {
  const DeletePostByOwner = async (postId) => {
    try {
      const res = await axios.delete(
        `http://13.60.32.184:3000/delete/postId/${postId}`,
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="posts">
        <div className="headerPost">
          <img
            onClick={() => setPostIds(p.uploadByUserID)}
            src={p.profile_picture}
            alt="Image"
            className="postProfileImage"
          />
          <div className="TitleName">
            <div className="flex flex-col items-baseline ">
              <h1 onClick={() => setPostIds(p.uploadByUserID)}>
                {p.posts_UserName}
              </h1>
              <span>{p.title}</span>
            </div>
            {NavigateProfile ? (
              <div className="PostsMenu">
                <div
                  className="flex items-center gap-2"
                  onClick={() => DeletePostByOwner(p._id)}
                >
                  <RiDeleteBinLine size={25} />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="PostPhotoContainer">
          <img src={p.image} alt="PostImage" />
          <div className="liked_Details">
            {p.isliked ? (
              p.totalLikes > 1 ? (
                <>
                  <div>
                    {" "}
                    Liked by <b> you </b> and <b> {p.totalLikes - 1} </b>{" "}
                    <b className="cursor-pointer">others</b>
                  </div>
                </>
              ) : p.totalLikes === 1 ? (
                <p>liked by you.</p>
              ) : (
                ""
              )
            ) : p.totalLikes > 1 ? (
              <>
                Liked by <em>{p.likes[0].userName}</em> and{" "}
                <b>{p.totalLikes - 1}</b>{" "}
                <b className="cursor-pointer">others</b>
              </>
            ) : p.totalLikes === 1 ? (
              <>{p.likes[0].userName} likes this post</>
            ) : (
              ""
            )}
          </div>
          <div className="likeCommentConatiner">
            <button onClick={() => submitLike(p._id)}>
              {p.isliked ? (
                <FaHeart size={40} color="red" />
              ) : (
                <CiHeart size={40} color="black" />
              )}
            </button>
            <button onClick={() => handleCommentSection(p._id)}>
              {comment === p._id ? (
                <FaComment size={40} color="black" />
              ) : (
                <FaRegComment size={40} color="black" />
              )}
            </button>
          </div>
        </div>
        <div className="postDiscriptionContainer">
          <div className="discriptionsPost">
            <div className="gap-3 text-gray-900 items-center">
              <span
                className="inline font-thin userDiscription pl-2"
                onClick={() => setPostIds(p.uploadByUserID)}
              >
                {p.posts_UserName}
              </span>{" "}
              {expandedDescriptions === p._id
                ? p.description
                : p.description.substring(0, 13)}
              <span
                className="cursor-pointer text-blue-700 pl-3"
                onClick={() => handleToggleDescription(p._id)}
              >
                {expandedDescriptions === p._id ? "Show Less" : "...More"}
              </span>
            </div>
          </div>
          <div className="w-full">
            {comment != p._id ? (
              ""
            ) : (
              <CommentSection commentsSec={commentsSec} comment={comment} />
            )}
          </div>
          <div className="PostedTime">
            {"posted  " + moment(p.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </>
  );
};
export default SinglePost;
