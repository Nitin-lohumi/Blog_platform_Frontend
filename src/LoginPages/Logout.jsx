import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../AttributesPages/Button";
import { RiLogoutCircleLine } from "react-icons/ri";
const Logout = ({ bg = "red" }) => {
  const navigate = useNavigate();
  const handlelogout = async () => {
    try {
      const fetch = await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      const data = fetch.data;
      if (fetch.data.status) {
        navigate("/auth/login");
      }
      setIsLogout(data.msg);
      if (data.msg) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ cursor: "pointer" }}>
        <form
          action=""
          onSubmit={handlelogout}
          method="GET"
          className="flex items-center p-0 m-0 w-full"
        >
          <Button
            btnName={<RiLogoutCircleLine />}
            btnColor={"white"}
            btnBackground={bg}
          />
        </form>
      </div>
    </>
  );
};
export default Logout;
