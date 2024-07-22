import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import popularDB from '../db/popularDB.json';
import '../css/genre.css';
import { motion } from 'framer-motion'
const Genre = () => {
    const { genre } = useParams();
    const [ currentGameList, setCurrentGameList] = useState([]);

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

    const genreKeyMap = {
        survival: '생존',
        rpg: 'RPG',
        openworld: '오픈월드',
        simulation: '시뮬레이션',
        adventure: '어드벤처',
        puzzle: '퍼즐',
        horror: '공포',
        sports: '스포츠',
        strategy: '전략',
        fps: 'FPS',
        racing: '레이싱',
        action: '액션'
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
        
        const selectedGenre = genreKeyMap[genre];
        if (selectedGenre) {
            setCurrentGameList(genreMap[selectedGenre]);
            console.log(`${selectedGenre} games: `, genreMap[selectedGenre]);
        } else {
            console.log('Invalid genre:', genre);
        }

    }, [genre, popularDB]);


    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <div className="genre_wrap">
            <h1>{genreKeyMap[genre]} 장르의 게임 목록</h1>
            <ul className="game_list">
                {currentGameList.map((game, index) => (
                    <li key={index} className="game_item">
                        <Link to={`/detail/${game.no}`}>
                            <img src={game[`thumnail-link`]} alt={game.Name} className="game_image" />
                        </Link>
                        <div className="game_details">
                            <h2 className="game_name">{game.Name}</h2>
                            <p className="game_price">{game.Price ? `${game.Price}원` : '가격 정보 없음'}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </motion.div>
    );
};

export default Genre;