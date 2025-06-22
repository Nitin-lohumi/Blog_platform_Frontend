import axios from "axios";
import React, {useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast } from "react-toastify";
const SignUp = () => {
  const navigate = useNavigate();
  const [signUP_formData, setsignUP_FormData] = useState({ name: '', email: '' ,password:''});
  const handleChangeInput =(e)=>{
     const {name,value}= e.target;
     setsignUP_FormData({...signUP_formData,[name]:value})
  }
  const handleSignUp =async(e)=>{
      e.preventDefault();
       if(!signUP_formData.name||!signUP_formData.email||!signUP_formData.password){
       toast.error(" invalid please fill all fields ");
       return;
       }
     try {
        const fetch = await axios.post("http://13.60.32.184:3000/auth/signup",signUP_formData);
        if(fetch.data.status){
          // navigate("/home");
          toast.success("sucessfully Register !");
          setTimeout(()=>{
           navigate("/auth/login");
          },1000);
        }
     } catch (error) {
        console.log(error);
        toast.error("error occoured",error.msg);
     }
  }
  return (
    <>
      <div className="sign_page">
        <h1>Sign Up</h1>
        <form className="form_signup" action="#" onSubmit={handleSignUp} method="POST">
          <div className="sign_up">
            <input
              type="text"
              onChange={handleChangeInput}
              id="name"
              name="name"
              value={signUP_formData.name}
              placeholder=" Enter your name"
            />
            <input
              type="email"
              onChange={handleChangeInput}
              id="email"
              name="email"
              value={signUP_formData.email}
              placeholder=" Enter your Email"
            />
            <input
              type="password"
              onChange={handleChangeInput}
              id="password"
              value={signUP_formData.password}
              name="password"
              placeholder=" Enter your password"
            />
            <p>
              Already have an account{" "}
              <Link to={"/auth/login"} className="link">
                Login
              </Link>
            </p>
          </div>
          <button>Signup</button>
        </form>
      </div>
      <ToastContainer isLoading={false} autoClose={3000} draggable={"touch"} style={{fontSize:"1.4rem",width:"30%"}}/>
    </>
  );
};
export default SignUp;
