import { useState,useEffect } from "react";
import api from "../config/api";

const ShareButton = ({post})=>{
    const sharePost = async ()=>{
        const postUrl = `${window.location.origin}/post/${post.id}`;
        try{
            await navigator.clipboard.writeText(postUrl);
            alert("Post link copied to clipboard!");
        }
        catch(error){
          alert("Error copying post link to clipboard");
        }   
    };
    return(
        <button onClick={sharePost}>Share</button>
    );
};
export default ShareButton;
