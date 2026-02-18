import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Buttons";
import {Input} from "./Input"
import axios from "axios";
import { BACKEND_URL } from "../config";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;
type ContentType = (typeof ContentType)[keyof typeof ContentType];

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  // If the modal isn't open, return null (don't render anything)
  // Although your App controls this with {open && ...}, adding this check is good practice.
  const titleRef=useRef<HTMLInputElement>(null);
  const linkRef=useRef<HTMLInputElement>(null);
  const [type, setType]=useState<ContentType>(ContentType.Youtube);

  async function addContent(){
      const title=titleRef.current?.value;
      const link=linkRef.current?.value;
      await axios.post(`${BACKEND_URL}/api/v1/content`,{
        link,
        title,
        type
      },{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      })
      onClose();


  }
  if (!open) return null;

  return (
    // Overlay: Added bg-opacity-60 and z-50 to ensure it sits on top but shows background
    <div className="w-screen h-screen bg-slate-500 bg-opacity-60 fixed top-0 left-0 flex justify-center items-center z-50">
      <div className="flex flex-col justify-center">
        {/* Fixed: Changed span to div, REMOVED opacity-0 */}
        <div className="bg-white p-4 rounded shadow-lg">
          <div className="flex justify-end">
            <div onClick={onClose} className="cursor-pointer">
              <CrossIcon />
            </div>
          </div>
          <div>
            <Input ref={titleRef} placeholder={"Title"} />
            <Input ref={linkRef} placeholder={"Link"} />
          </div>
          <div>
            <h1>Type:</h1>
            <div className="flex gap-2 p-4">
            <Button text="Youtube" variant={type=== ContentType.Youtube ? "primary" : "secondary"} onClick={()=>{
              setType(ContentType.Youtube);
            }}></Button>
            <Button text="Twitter" variant={type=== ContentType.Twitter ? "primary" : "secondary"}  onClick={()=>{
              setType(ContentType.Twitter);
            }}></Button>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={addContent} variant="primary" text="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
}
