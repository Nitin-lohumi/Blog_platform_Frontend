import React from "react";
import { Link } from "react-router-dom";
const Header = ({
  handleNavigatePost,
  handleNavigateCreateBlog,
  handleNavigateProfile,
  activeHere,
}) => {
  return (
    <>
      <div className="header">
        <div className="">
          <h1>BLOG PLATFROM</h1>
        </div>
        <ul className="headerList">
          <Link
            onClick={handleNavigatePost}
            className="headerLinks"
            style={{
              borderBlockEnd:
                activeHere == "post" ? "3px solid white" : "transparent",
              padding: activeHere == "post" ? "0px" : "3px",
              opacity: activeHere == "post" ? "1" : "0.6",
            }}
            to={"/home/posts"}
          >
            post
          </Link>

          <Link
            onClick={handleNavigateCreateBlog}
            className="headerLinks"
            style={{
              borderBlockEnd:
                activeHere == "CreateBlog" ? "3px solid white" : "transparent",
              padding: activeHere == "CreateBlog" ? "0px" : "3px",
              opacity: activeHere == "CreateBlog" ? "1" : "0.6",
            }}
            to={"/home/CreateBlog"}
          >
            Create Blog
          </Link>

          <Link
            onClick={handleNavigateProfile}
            className="headerLinks"
            style={{
              borderBlockEnd:activeHere == "Profile" ? "3px solid white" : "transparent",
              padding: activeHere == "Profile" ? "0px" : "3px",
              opacity: activeHere == "Profile" ? "1" : "0.6",
            }}
            to={"/home/UserProfile"} >
             Profile 
          </Link>
        </ul>
      </div>
    </>
  );
};
export default Header;
