import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const AuthCallbackPage = () => {
    const navigate = useNavigate(); 
    const {user} = useAuth0();//this will give us access to current logined user   
    const {createUser}= useCreateMyUser();

    // first time it is false ,because it is false so if statement is going to run after it is stored true
    const hasCreatedUser = useRef(false);   //stores a state value whenever the compoment rerender
    
    useEffect(()=>{
        if(user?.sub && user?.email && !hasCreatedUser.current){
            createUser({auth0Id: user.sub, email:user.email});
            hasCreatedUser.current=true;
        }
        navigate("/")
    },[createUser,navigate,user]);

    return <>Loading....</>
};


export default AuthCallbackPage
