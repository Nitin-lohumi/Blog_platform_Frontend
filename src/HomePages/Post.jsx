import React, { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "./Home";
import { useContext } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import SinglePost from "../AttributesPages/SinglePost";
const Post = ({
  setPostIds,
  imageProfile,
  NavigateProfile,
  handleNavigateCreateBlog,
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState(null);
  const [Nopost, setNoPost] = useState(false);
  const contextValue = useContext(Context);
  const [comment, setComment] = useState();
  const [commentsSec, setcommentsSec] = useState([]);
  const fetchPosts = async () => {
    if (NavigateProfile) {
      try {
        const res = await axios.get(
          `http://13.60.32.184:3000/posts/OnlyUserPosts/${contextValue.ProfileData._id}`,
          { withCredentials: true }
        );
        const updatedPosts = res.data.posts.map((post) => ({
          ...post,
          isliked: post.likes.some(
            (like) => like.userId === contextValue.ProfileData._id
          ),
        }));
        setPosts(updatedPosts);
        setTimeout(() => {
          setNoPost(updatedPosts.length === 0);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } else {
      if (contextValue?.ProfileData?._id) {
        try {
          const res = await axios.get(
            `http://13.60.32.184:3000/posts/BlogPosts/${contextValue.ProfileData._id}`,
            { withCredentials: true }
          );
          const updatedPosts = res.data.map((post) => ({
            ...post,
            isliked: post.likes.some(
              (like) => like.userId === contextValue.ProfileData._id
            ),
          }));
          setPosts(updatedPosts);
          setTimeout(() => {
            setNoPost(updatedPosts.length === 0);
          }, 2000);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [contextValue.ProfileData, imageProfile]);

  const handleToggleDescription = (postId) => {
    setExpandedDescriptions(expandedDescriptions === postId ? null : postId);
  };

  const submitLike = async (postId) => {
    try {
      const res = await axios.post(
        `http://13.60.32.184:3000/posts/BlogPost/like/${contextValue.ProfileData._id}`,
        { postId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  isliked: res.data.liked,
                  totalLikes: res.data.totalLikes,
                  likes: res.data.liked
                    ? [...post.likes, { _id: contextValue.ProfileData._id }]
                    : post.likes.filter(
                        (like) => like._id !== contextValue.ProfileData._id
                      ),
                }
              : post
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function handleCommentSection(post_id) {
    if (comment === post_id) {
      setComment("");
      setcommentsSec([]);
    } else {
      try {
        const res = await axios.get(
          `http://13.60.32.184:3000/posts/BlogPost/showcomments/${post_id}`,
          { withCredentials: true }
        );
        setComment(post_id);
        setcommentsSec(res.data.post.comments);
      } catch (error) {
        console.log(error);
        setcommentsSec([]);
      }
    }
  }

  return (
    <>
      <div className="UserSPost">
        {loading ? (
          <div className="h-96 flex justify-center items-center">
            <ReactLoading
              type={"spinningBubbles"}
              color={"green"}
              height={30}
              width={30}
            />
          </div>
        ) : posts.length ? (
          posts.map((p) => (
            <SinglePost
              p={p}
              key={p._id}
              setPostIds={setPostIds}
              handleToggleDescription={handleToggleDescription}
              submitLike={submitLike}
              expandedDescriptions={expandedDescriptions}
              NavigateProfile={NavigateProfile}
              handleCommentSection={handleCommentSection}
              comment={comment}
              commentsSec={commentsSec}
            />
          ))
        ) : (
          <div>
            <p className="text-xl font-bold">NO POST YET....</p>
            {Nopost ? (
              <div className="h-48 flex items-center justify-center">
                <Link
                  onClick={handleNavigateCreateBlog}
                  to={"/home/CreateBlog"}
                >
                  <button className="text-xl p-6 font-semibold text-white bg-green-600 rounded-lg">
                    {" "}
                    Create a BLOG POST
                  </button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
