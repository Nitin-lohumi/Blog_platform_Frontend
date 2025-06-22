import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import LoginBox from "./LoginBox";
const Login=()=>{
    const navigate  = useNavigate();
    const [LoginData,setLoginData] = useState({email:'',password:''});
      const handleChangeData=(e)=>{
          const {name,value} = e.target;
          setLoginData({...LoginData,[name]:value}); 
       }

      const handleSubmit_Logindata = async(e)=>{
        e.preventDefault();
        console.log(LoginData);
        if(!LoginData.email||!LoginData.password){
          toast.error("email or password is not filled");
        }
          try {
              const url = await axios.post("http://13.60.32.184:3000/auth/ManualLogin",LoginData,{ withCredentials: true });
              const data = url.data;
              console.log(data);
              toast.success("logged in sucessfully");
              setTimeout(()=>{
                  navigate("/home");
              },1000);
          } catch (error) {
            
          }
      }
    return(
        <>
         <div className="login_page">
         <LoginBox handleChangeData={handleChangeData} handleSubmit_Logindata={handleSubmit_Logindata} LoginData={LoginData}/>
         {/* <a href={"http://localhost:3000/auth/google"} className="google_login"> 
         <i className="fa-brands fa-google"></i>
         <span>login with google</span></a> */}
         </div>
        <ToastContainer isLoading={false} autoClose={3000} draggable={"touch"} style={{fontSize:"1.4rem",width:"30%"}}/>
        </>
    )
}
export default Login;