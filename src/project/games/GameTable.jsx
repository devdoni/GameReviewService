import React, { useEffect } from "react";
import TableData from '../db/TableData.js'
import '../css/home.css';
import { Link } from "react-router-dom";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';
import { useState } from "react";


      
const GameTable = ({langFileName}) => {

          //hooks
    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    useEffect(() => {
        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);
        }

        //console.log(langFileName);

    }, [langFileName]);


    const categories = [
            { title: lang.popularGames, games: TableData.korPopular, link: 'popular' },
            { title: lang.freeGames, games: TableData.korFree, link: 'free' },
            { title: lang.horrorGames, games: TableData.korHorror, link: 'genre/horror' },
            { title: lang.simulation, games: TableData.korSimulation, link: 'genre/simulation' }
        ]

    const linkClickHandler = () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }

    return (
        <div className="table-component">
            <div className="page-container">
                {categories.map((category, idx) => (
                    <div key={idx} className="table-container">
                        <h2>{category.title}</h2>
                        <div className="tablebgimg">
                            <div className="grid-container">
                                {category.games && category.games.length >= 4 && category.games.slice(0, 4).map((game, index) => (
                                    <div key={index} className="img_container">
                                        <img src={game.src} className="table1imgs" alt={game.name} />
                                        <Link to={`/${game.href}`} onClick={linkClickHandler}>
                                            <div className="table-overlay">
                                                <p>{game.info}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="more-button-container">
                            <Link to={`/${category.link}`}>
                                <button className="more-button">
                                    {lang.more}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


}

export default GameTable;