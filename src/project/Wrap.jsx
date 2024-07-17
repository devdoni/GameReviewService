import React, { useState } from "react";
import './css/index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./member/SignUp";
import SignIn from "./member/SignIn";
import Modify from "./member/Modify";
import Home from "./Home";
import Menubar from "./Menubar";
import Free from "./games/Free";
import Detail from "./games/Detail";
import Footer from "./Footer";
import NG from "./NG";
import Popular from "./games/Popular";
import Category from "./games/Category";

const Wrap = () => {

    // hook
    const [isLogined, setIsLogined] = useState(false);
    return (
        <div className="background">
          <BrowserRouter>
            <div id="wrap">
              <Menubar isLogined={isLogined} setIsLogined={setIsLogined} />
                  <Routes>
                    <Route path='/' element={<Home isLogined={isLogined} setIsLogined={setIsLogined}/>} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/signin' element={<SignIn isLogined={isLogined} setIsLogined={setIsLogined}/>} />
                    <Route path='/modify' element={<Modify isLogined={isLogined} setIsLogined={setIsLogined}/>} />
                    <Route path='/popular' element={<Popular />} />
                    <Route path='/category' element={<Category />} />
                    <Route path='/free' element={<Free />} />
                    <Route path='/detail/:no' element={<Detail />} />
                    <Route path='/*' element={<NG />} />
                  </Routes>
              <Footer />
            </div>
          </BrowserRouter>
        </div>
      );

}

export default Wrap; 