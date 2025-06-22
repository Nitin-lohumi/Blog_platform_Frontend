import { AiTwotoneEdit } from "react-icons/ai";
import { useContext } from "react";
import { Context } from "../HomePages/Home";
import ReactLoading from 'react-loading';
const Image = ({handleImageInput, base64Data,load}) => {
  const valueContext = useContext(Context);
  const DBImage = valueContext.ProfileData.picture;

  return (
    <>
      <div className="flex items-center justify-center">
       {load?<ReactLoading type={"spinningBubbles"} color={"black"} height={67} width={75}/>: 
       <>
       <img
          src={base64Data ? base64Data : DBImage ? DBImage : "user.jpg"}
          className="ProfileImage"
        />
        <label htmlFor="imgFile" className="ChooseImage bg-black/5">
          <AiTwotoneEdit size={40} />
        </label></>}
        <input
          type="file"
          id="imgFile"
          accept="image/jpeg, image/png, image/jpg"
          hidden
          onChange={handleImageInput}
        />
      </div>
    </>
  );
};
export default Image;
