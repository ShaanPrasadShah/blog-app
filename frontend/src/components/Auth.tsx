import axios from "axios"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { LabelledInput } from "./LabelledInput"
import { DATABASE_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { useState } from "react"



export const Auth = ({type}:{type:"signin" | "signup"}) => {
    const navigate = useNavigate()

    const [user,setUser] = useState({
        name : "",
        email : "",
        password : ""
    })


    async function sendRequest(){
        let response = await axios.post(`${DATABASE_URL}/api/v1/user/${type}`,user)
        const jwt = response.data.jwt
        localStorage.setItem('token',jwt);
        navigate('/blogs')
    }
    

    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="flex flex-col">
                <div className="flex flex-col px-20 mb-7">
                    <Heading type={type}/>
                </div>
                <div className="flex flex-col px-2">
                    {type==="signup" ? <LabelledInput onChange={(e)=>{
                        setUser({
                            ...user,
                            name:e.target.value
                        })
                    }} label={"Username"} placeholder={"shaan12"}/> : null}
                    <LabelledInput onChange={(e)=>{
                        setUser({
                            ...user,
                            email:e.target.value
                        })
                    }} label={"Email"} placeholder={"shaan12@gmail.com"}/>
                    <LabelledInput onChange={(e)=>{
                        setUser({
                            ...user,
                            password:e.target.value
                        })
                    }} label={"Password"} type={"password"} placeholder={"123456"}/>
                    {type==="signup" ? <Button onClick={sendRequest} label={"Sign up"}/> : <Button onClick={sendRequest} label={"Sign in"}/> }
                </div>
            </div>
        </div>
    </div>
}

