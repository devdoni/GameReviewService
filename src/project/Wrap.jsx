import React, { useEffect, useState } from "react";
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
import { AnimatePresence } from "framer-motion";
import Genre from "./games/Genre";
import Myinfo from "./member/Myinfo";
import WishList from "./member/WishList";
import MyReviewList from "./review/MyReviewList";
import TermsOfService from "./etc/TermsOfService";
import PrivacyPolicy from "./etc/PrivacyPolicy";
import CopyrightPolicy from "./etc/CopyrightPolicy";
import { getProdFlag } from "./utils/utils";
import TopButton from "./etc/TopButton";


const Wrap = () => {

    // hook
    const [isLogined, setIsLogined] = useState(false);
    const [langFileName, setLangFileName] = useState('kor');

    useEffect(() => {
      if(!getProdFlag()) console.log('[Wrap] useEffect()');
      if(!getProdFlag()) console.log('[Wrap] langFileName: ', langFileName);

    }, [langFileName]);

    return (
        <div className="background">
          <BrowserRouter>
            <div id="wrap">
              <Menubar isLogined={isLogined} setIsLogined={setIsLogined} setLangFileName={setLangFileName} langFileName={langFileName}/>
              <AnimatePresence>
                  <Routes>
                    <Route path='/' element={<Home isLogined={isLogined} setIsLogined={setIsLogined} langFileName={langFileName}/>} />
                    <Route path='/signup' element={<SignUp isLogined={isLogined} langFileName={langFileName}/>} />
                    <Route path='/signin' element={<SignIn isLogined={isLogined} setIsLogined={setIsLogined} langFileName={langFileName}/>} />
                    <Route path='/myinfo' element={<Myinfo isLogined={isLogined} setIsLogined={setIsLogined} langFileName={langFileName}/>} />
                    <Route path='/modify' element={<Modify isLogined={isLogined} setIsLogined={setIsLogined} langFileName={langFileName}/>} />
                    <Route path='/popular' element={<Popular langFileName={langFileName} />} />
                    <Route path='/wishlist' element={<WishList isLogined={isLogined} langFileName={langFileName} />} />
                    <Route path='/myreviewlist' element={<MyReviewList langFileName={langFileName} />} />
                    <Route path='/category' element={<Category langFileName={langFileName}/>} />
                    <Route path='/genre/:genre' element={<Genre langFileName={langFileName}/>}/>
                    <Route path='/free' element={<Free langFileName={langFileName} />} />
                    <Route path='/detail/:no' element={<Detail langFileName={langFileName} />} />
                    <Route path="/termsofservice" element={<TermsOfService  />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                    <Route path="/copyrightpolicy" element={<CopyrightPolicy />} />
                    <Route path='/*' element={<NG />} />
                  </Routes> 
                </AnimatePresence>
                <TopButton />
              <Footer langFileName={langFileName} />
            </div>
          </BrowserRouter>
        </div>
      );

}

export default Wrap; 