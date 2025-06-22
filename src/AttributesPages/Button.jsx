import React from "react";

const Button =({btnName,btnFunction,btnColor,btnBackground})=>{
return (
    <>
    <button className="btnClass p-0 m-0 w-full " style={{background:btnBackground,color:btnColor}}onClick={btnFunction}> {btnName}</button>
    </>
)
}
export default Button;