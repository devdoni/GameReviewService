import React from "react";
import Menubar from "./Menubar";

const Home = ({isLogined, setIsLogined}) => {
    return(
        <>
            <Menubar isLogined={isLogined} setIsLogined={setIsLogined}/>
        </>
    );
}

export default Home;