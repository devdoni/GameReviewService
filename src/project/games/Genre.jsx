import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import popularDB from '../db/popularDB.json';
const Genre = () => {
    const { genre } = useParams();

    const genreMap = {
        '생존': [],
        'RPG': [],
        '오픈월드': [],
        '시뮬레이션': [],
        '어드벤처': [],
        '퍼즐': [],
        '공포': [],
        '스포츠': [],
        '전략': [],
        'FPS': [],
        '레이싱': [],
        '액션': []
    };
    useEffect(() => {
        console.log('[Category] useEffect()');

        for (let key in genreMap) {
            genreMap[key] = [];
        }

        popularDB.forEach(gameObj => {
            const genres = gameObj['genre'];
            genres.forEach(g => { 
                if (genreMap[g]) {
                    genreMap[g].push(gameObj);
                }
            });
        });
        
        if (genre === ':survival')console.log('survivalGames: ', genreMap['생존']);
        if (genre === ':rpg')console.log('rpgGames: ', genreMap['RPG']);
        if (genre === ':openworld')console.log('오픈월드: ', genreMap['오픈월드']);
        if (genre === ':simulration')console.log('시뮬레이션: ', genreMap['시뮬레이션']);
        if (genre === ':advencure')console.log('어드벤처:', genreMap['어드벤처']);
        if (genre === ':puzzle')console.log('퍼즐:', genreMap['퍼즐']);
        if (genre === ':horror')console.log('공포:', genreMap['공포']);
        if (genre === ':spotrs')console.log('스포츠:', genreMap['스포츠']);
        if (genre === ':strategy')console.log('전략:', genreMap['전략']);
        if (genre === ':fps')console.log('FPS:', genreMap['FPS']);
        if (genre === ':racing')console.log('레이싱:', genreMap['레이싱']);
        if (genre === ':action')console.log('액션:', genreMap['액션']);

    }, [popularDB]);


    return (
        <>
            <div id="genre_wrap">
                <div className="genre_item">
                    <ul>
                        <li>{genre}</li>
                    </ul>
                </div>
            </div>
        </>
    );
};


export default Genre;