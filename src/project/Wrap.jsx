import React from "react";
import './css/wrap.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./member/SignUp";
import SignIn from "./member/SignIn";
import Modify from "./member/Modify";
import Home from "./Home";

const Wrap = () => {
    return(
        <BrowserRouter>
            <div id="wrap">
                    <Routes>
                        <Route path='/'element={<Home />} />
                        <Route path='/signup'element={<SignUp />} />
                        <Route path='/signin'element={<SignIn />} />
                        <Route path='/modify'element={<Modify />} />

                    </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Wrap; 