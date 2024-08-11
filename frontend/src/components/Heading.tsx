import { Link } from "react-router-dom"


export const Heading = ({type} : {type:"signin" | "signup"}) => {
    return <div>
        <div className="text-3xl font-bold mb-2 text-center">
            {type==="signup" ? "Create an account" : "Login"}
        </div>
        <div className=" text-lg font-semibold text-slate-500 text-center">
            {type==="signup" ? "Already have an account?" : "Dont have a account?"} <Link className="underline" to={type==="signup" ? "/signin" : "/signup"}>{type==="signup" ? "Login" : "Signup"}</Link>
        </div>
    </div>
}