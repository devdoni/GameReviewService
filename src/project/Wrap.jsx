import React, { useState } from "react";
import './css/wrap.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./member/SignUp";
import SignIn from "./member/SignIn";
import Modify from "./member/Modify";
import Home from "./Home";
import Menubar from "./Menubar";

const Wrap = () => {

    // hook
    const [isLogined, setIsLogined] = useState(false);
    
    return(
        <div className="background">
        <BrowserRouter>
            <div id="wrap">
                <Menubar isLogined={isLogined} setIsLogined={setIsLogined}/>
                    <Routes>
                        <Route path='/'element={<Home isLogined={isLogined} setIsLogined={setIsLogined}/>} />
                        <Route path='/signup'element={<SignUp />} />
                        <Route path='/signin'element={<SignIn isLogined={isLogined} setIsLogined={setIsLogined}/>} />
                        <Route path='/modify'element={<Modify />} />

                    </Routes>
            </div>
        </BrowserRouter>
        </div>
    );
}

export default Wrap; 