import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import popularDB from '../db/popularDB.json';
import '../css/genre.css';
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';



const Genre = ({langFileName}) => {
    const { genre } = useParams();
    const [ currentGameList, setCurrentGameList] = useState([]);
    const [lang, setLang] = useState(txt_kor);

    
    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    
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
        survival: lang.survival,
        rpg: 'RPG',
        openworld: lang.openWorld,
        simulation: lang.simulation,
        adventure: lang.adventure,
        puzzle: lang.puzzle,
        horror: lang.horror,
        sports: lang.sports,
        strategy: lang.strategy,
        fps: 'FPS',
        racing: lang.racing,
        action: lang.action
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

        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);
        }

    }, [genre, popularDB,langFileName]);
    

    return (
        <div className="genre_wrap">
            <h1>{genreKeyMap[genre]} {lang.genreGameList}</h1>
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
    );
};

export default Genre;