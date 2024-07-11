import React from "react";
import Menubar from "./Menubar";
import GameDB from "./db/GameDB";

const Home = ({isLogined, setIsLogined}) => {
    return(
        <>
            <Menubar isLogined={isLogined} setIsLogined={setIsLogined}/>
            <GameDB />
        </>
    );
}

export default Home;