import React from "react";
import data from './gamedata.json'
let DBObj = data;

const GameDB = () => {
    const test = () => {
        console.log('data ==>',DBObj.game1.가격);

    }   

    return (
        <div id="game">
            {
                <>
                <li></li>
                <li>{DBObj.BATTLEGROUNDS.id}</li>
                </>
            }
        </div>
    );
}

export default GameDB;