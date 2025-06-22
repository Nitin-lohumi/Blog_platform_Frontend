import React from "react";
import { Link } from "react-router-dom";
const LoginBox = ({handleChangeData,handleSubmit_Logindata,LoginData}) => {
  return (
    <>
      <div className="login_box">
        <h1>Login Blog Platform</h1>
        <form  method="post" onSubmit={handleSubmit_Logindata} className="login_form">
            <input type="email" id="email" name="email" placeholder="Enter your email " onChange={handleChangeData} value={LoginData.email}/>
            <input type="password" name="password" id="password" placeholder="Enter your password " onChange={handleChangeData} value={LoginData.password}/>
            <input type="submit" value={"login"} />
            <p>don't have an account <Link to={"/auth/signup"} className="link">sign up</Link></p>
        </form>
      </div>
    </>
  );
};
export default LoginBox;
