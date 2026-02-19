import { useRef } from "react";
import axios from "axios";
import { Button } from "../components/Buttons"
import {Input} from "../components/Input"
import { BACKEND_URL } from "../config";
import { useLocation, useNavigate } from "react-router-dom";

export function Signin(){
   const usernameRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const navigate=useNavigate();
    const location = useLocation();
    const state = (location.state as { username?: string; password?: string } | null) ?? null;
   async function   signin(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;
        const response =await axios.post(BACKEND_URL + "/api/v1/signin" , {
            username,
            password
        })
       const jwt= response.data.token;
       localStorage.setItem("token", jwt);
       navigate("/dashboard")

    }


    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8"> 
            <Input ref={usernameRef} placeholder="Username" defaultValue={state?.username ?? ""}></Input>
            <Input ref={passwordRef} placeholder="Password" type="password" defaultValue={state?.password ?? ""}></Input>
            <div className="flex justify-center pt-4">
                <Button onClick={signin} variant="primary" text="Signin" />
            </div>
            

        </div>

    </div>
}
