import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { MdAddPhotoAlternate } from "react-icons/md";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { Context } from "./Home";
import axios from "axios";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const CreateBlog = ({ setNavigatePost, setNavigateCreatePost }) => {
  const navigate = useNavigate();
  const valueContext = useContext(Context);
  const [postImage, setPostImage] = useState("");
  const [isInsert, setIsInsert] = useState(false);
  const [Title, setTitle] = useState("");
  const [Imagefile, setImageFile] = useState("");
  const [discription, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);
  const formdata = new FormData();
  formdata.append("title", Title);
  formdata.append("description", discription);
  formdata.append("image", Imagefile);
  async function handleInsertPhoto(e) {
    let file = e.target.files[0];
    if (file) {
      setImageFile(file);
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPostImage(e.target.result);
          setIsInsert(true);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        setIsInsert(false);
        console.log(error);
      }
    }
  }
  const handlePostUpload = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `http://13.60.32.184:3000/upload/post/${valueContext.ProfileData._id}`;
      const res = await axios.post(url, formdata, { withCredentials: true });
      if (res.data.sucess) {
        toast.success("posted sucessfully");
        setLoading(false);
      }
      setTimeout(() => {
        navigate("/home/posts");
        setNavigatePost(true);
        setNavigateCreatePost(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="createBlog">
        <div className="createBlog_header">
          <h1>
            <span>CREATE</span> YOUR OWN BLOG.
          </h1>
          <p>THIS IS YOUR PLATFROM </p>
          <p>Make it. Live it</p>
        </div>
        <div className="createBlog_create_container">
          <TextField
            label="title"
            variant="outlined"
            fullWidth
            className="postTitle"
            onChange={(e) => setTitle(e.target.value)}
            value={Title}
          />
          <TextField
            label="Discription"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            className="discription"
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
          <label className="PostImage" htmlFor="postImage">
            <img src={postImage ? postImage : ""} className="imageOfPost" />
            <div
              className="photoadd"
              style={{ display: isInsert ? "none" : "flex" }}
            >
              <MdAddPhotoAlternate className="photo1" />
              <p>Click to add photos</p>
            </div>
          </label>
          <div className="hidden">
            <input
              type="file"
              onChange={handleInsertPhoto}
              accept="image/jpeg, image/png, image/jpg"
              id="postImage"
              hidden
            />
          </div>
          <div className="ButtonPostUpload">
            <Button
              variant="contained"
              color="success"
              className="button"
              onClick={handlePostUpload}
            >
              {loading ? (
                <ReactLoading
                  type={"spin"}
                  color={"black"}
                  height={20}
                  width={20}
                />
              ) : (
                "upload Post"
              )}
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={3000}
        draggable={"touch"}
        style={{ fontSize: "1.4rem", width: "30%" }}
      />
    </>
  );
};
export default CreateBlog;
