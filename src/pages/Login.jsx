import React, { useContext } from "react";
import { AuthContext } from "../context";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const Login = () => {
   
    const {setIsAuth} = useContext(AuthContext)
    
    const login = event => {
        event.preventDefault()
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Login form</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Login"/>
                <MyInput type="password" placeholder="Password"/>
                <MyButton>Sign In</MyButton>
            </form>
        </div>
    )
}

export default Login;