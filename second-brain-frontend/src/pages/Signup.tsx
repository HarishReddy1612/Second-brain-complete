import { useRef } from "react"
import { Button } from "../components/Buttons"
import {Input} from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Signup(){
    const usernameRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const navigate=useNavigate();
   async function   signup(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;
        try {
            await axios.post(BACKEND_URL + "/api/v1/signup" , {
                username,
                password
            });
            alert("you have signed up");
            navigate("/signin");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                alert("User already exists. Redirecting to signin.");
                navigate("/signin");
                return;
            }
            alert("Signup failed. Please try again.");
        }
        

    }


    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8"> 
            <Input ref={usernameRef} placeholder="Username"></Input>
            <Input ref={passwordRef} placeholder="Password" type="password"></Input>
            <div className="flex justify-center pt-4">
                <Button onClick={signup} variant="primary" text="Signup" />
            </div>
            

        </div>

    </div>
}
