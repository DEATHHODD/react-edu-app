import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {

    const {setIsAuth} = useContext(AuthContext)

    return (
        <div className="navbar">
            <MyButton onClick={() => {
                setIsAuth(false)
                localStorage.removeItem('auth')
            }}>
                Exit
            </MyButton>
        <div className="navbar__links">
            <Link to="/about">About</Link>
            <Link to="/posts">Posts</Link>
        </div>
    </div>
)}

export default Navbar;