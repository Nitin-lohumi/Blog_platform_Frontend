import React, { createContext, useEffect, useState } from "react";
import axois from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../AttributesPages/Header";
import CreateBlog from "./CreateBlog";
import Profile from "./Profile";
import Post from "./Post";
export const Context = createContext();
const Home = () => {
  const navigate = useNavigate();
  const [DataUser, setDataUser] = useState([]);
  const [NavigatePost, setNavigatePost] = useState(true);
  const [navigateCreatePost, setNavigateCreatePost] = useState(false);
  const [NavigateProfile, setNavigateProfile] = useState(false);
  const [activeHere, setActiveHere] = useState("post");
  const [PostId, setPostIds] = useState("");
  const [imageProfile, setImageprofile] = useState(false);
  const userData = async () => {
    try {
      const fetch = await axois.get("http://13.60.32.184:3000/auth/ShowUser", {
        withCredentials: true,
      });
      const res = fetch.data;
      setDataUser(res.user);
      setPostIds(res.user._id);
    } catch (error) {
      console.log(error);
      navigate("/auth/login");
    }
  };
  useEffect(() => {
    userData();
    navigate("/home/posts");
    setActiveHere("post");
  }, []);

  const handleNavigatePost = () => {
    setActiveHere("post");
    setNavigateProfile(false);
    setNavigatePost(true);
    setNavigateCreatePost(false);
  };
  const handleNavigateCreateBlog = () => {
    setActiveHere("CreateBlog");
    setNavigateProfile(false);
    setNavigatePost(false);
    setNavigateCreatePost(true);
  };
  const handleNavigateProfile = () => {
    setActiveHere("Profile");
    setNavigateProfile(true);
    setNavigatePost(false);
    setNavigateCreatePost(false);
  };
  return (
    <>
      <Context.Provider value={{ ProfileData: DataUser }}>
        <div className="homepage w-full">
          <div className="Content max-w-screen">
            <Header
              activeHere={activeHere}
              handleNavigatePost={handleNavigatePost}
              handleNavigateCreateBlog={handleNavigateCreateBlog}
              handleNavigateProfile={handleNavigateProfile}
            />

            <div
              className="Container "
              style={{ display: NavigateProfile ? "flex" : "grid" ,marginTop:"10px"}}
            >
              <div
                className="Profile_container"
                style={{
                  display: NavigateProfile ? "none" : "flex",
                  marginTop: "100px",
                }}
              >
                <Profile postId={PostId} setImageprofile={setImageprofile} />
              </div>
              <div
                className="pt-3 text-center Blog_Post"
                style={{ marginTop: "100px" }}
              >
                {NavigatePost ? (
                  <Post
                    imageProfile={imageProfile}
                    setPostIds={setPostIds}
                    NavigateProfile={NavigateProfile}
                    handleNavigateCreateBlog={handleNavigateCreateBlog}
                  />
                ) : navigateCreatePost ? (
                  <CreateBlog
                    setNavigatePost={setNavigatePost}
                    setNavigateCreatePost={setNavigateCreatePost}
                  />
                ) : (
                  <Profile
                    postId={PostId}
                    setImageprofile={setImageprofile}
                    NavigateProfile={NavigateProfile}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Context.Provider>
    </>
  );
};
export default Home;
