import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import popularDB from '../db/popularDB.json';
const Genre = () => {
    const { genre } = useParams(); 

    useEffect(() => {
        console.log('[Category] useEffect()');

        let survivorGames = [];     // 여기에 '생존' 게임을 모아둘거에요.

        for (let i=0; i<popularDB.length; i++) {
            let gameObj = popularDB[i];    // 게임 1개 정보(Object)
            let genres = gameObj['genre']; // 장르들

            for (let j=0; j<genres.length; j++) {
                if (genres[j] === '생존') {
                    survivorGames.push(gameObj);
                    break;
                }
            }
        }

        console.log('survivorGames: ', survivorGames);
        
    }, []);


    return( 
    <>
    </>
    );
};

export default Genre;