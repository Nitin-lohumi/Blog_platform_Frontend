import React, { useContext, useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Image from "../AttributesPages/Image";
import Logout from "../LoginPages/Logout";
import { Context } from "./Home";
import axios from "axios";
import imageCompression from "browser-image-compression"
import Post from "./Post";
const Profile =({postId,setImageprofile,NavigateProfile})=>{
  const [load,setLoad]= useState(false);
  const contextValue = useContext(Context);
  const [ClickMenu,SetClickMenu]= useState(false);
  const Menu = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const [base64Data, setBase64Data] = useState("");
  const [image,setImage] =useState(null);
  const [userProfile,setUserProfile] = useState(null);
  const HandleOptionMenuClick =()=>{
    if(ClickMenu==true){
      SetClickMenu(false);
    }else{
       SetClickMenu(true);
    }
  }
  const handleClickOutside =(event)=>{
    if (!Menu.current) 
    {
      SetClickMenu(false); 
    }
  }
  useEffect(()=>{
    document.addEventListener('click',handleClickOutside);
    return  () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[]);

  const handleImageInput =async (event) => {
    const file = event.target.files[0];
    if (file) {
      try{
        const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 600,
      });
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setBase64Data(reader.result); 
        const confirmUpload = window.confirm("Are you sure you want to upload this image?");
        if (confirmUpload) {
          handleSaveImage(reader.result); 
        } else {
          setBase64Data(""); 
        }
      };
      reader.readAsDataURL(compressedFile); 
    }catch(error){

    }
    }
  };
  useEffect(()=>{
    setImage(base64Data);
  },[setBase64Data,base64Data]);

  const handleSaveImage = async(imageurl)=>{
      try {
        setLoad(true);
        const url =await axios.post(`http://13.60.32.184:3000/upload/Profile/${contextValue.ProfileData._id}`,{image:imageurl});
        setImageprofile(true);
        setLoad(false);
      } catch (error) {
         console.log(error);
      }
    }
    useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const res = await axios.get(`http://13.60.32.184:3000/posts/userProfile/${postId}`);
        setUserProfile(res.data.data);
        console.log(res.data.data);
       } catch (error) {
        console.log(error);
       }
      }
     if((postId!=contextValue.ProfileData._id)&&postId!==""){
       fetchUser();
      }
     },[postId]);
  return (
    <>
     <div className="Profile_Div">
      {postId===contextValue.ProfileData._id?<div>
      {/* <div className="MenuOptionDIV">
      <div onClick={HandleOptionMenuClick} ref={Menu} className="MenuOption"><CiMenuKebab/></div>
       <div className="OptionMenu" style={{display:ClickMenu?"block":"none"}}>
        <div ref={ref2}><Logout/></div>
       </div>
     </div> */}
     {/* contian the image from user  */}
     <div className="ContainerImage">
      <Image 
       base64Data={base64Data}
       handleImageInput={handleImageInput}
       load={load}
       />
     </div>
    {/* user info */} 
      <div className="UserInfo flex flex-col mt-2">
       <div className="flex flex-col p-2">
          <h1 className="text-center p-2 text-2xl font-bold">{contextValue.ProfileData.name}</h1>
          <p className="text-center p-3"><i className="font-thin text-wrap text-center">{contextValue.ProfileData.email}</i>
          </p>
       </div>
      </div>
      {/* Setting */}
      {NavigateProfile?<h1 className="font-bold text-xl mt-4 mb-6">YOUR POSTS</h1>:""}
      {NavigateProfile?<Post NavigateProfile={NavigateProfile}/>:""}
      <div className="flex w-full justify-end items-center p-4">
      <p>{" logout -"}</p> <Logout logoutname={"logout -"} bg={"red"}/></div>
      </div>:
      <>
      {userProfile?<div className="UserInfo flex flex-col mt-2">
       {/* <img  className="flex w-32 h-32 mt-10 mb-5 rounded-full m-auto"src={userProfile.picture} alt="profile picture" /> */}
       <img  className="flex w-64 h-64 mt-10 mb-5 rounded m-auto"src={userProfile.picture} alt="profile picture" />
       <div className="flex flex-col p-2">
          <h1 className="text-center p-2 text-2xl font-bold">{userProfile.name}</h1>
          <p className="text-center p-3"><i className="font-thin text-wrap text-center">{userProfile.email}</i>
          </p>
      </div>
       </div>:""}
      </>
      }
     </div>

    </>
  )
}
export default Profile;