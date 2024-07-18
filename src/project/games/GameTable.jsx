import React from "react";
import TableData from '../db/TableData.js'
import '../css/home.css';
import { Link } from "react-router-dom";

const categories = [
    { title: '인기게임', games: TableData.korPopular, link: 'popular' },
    { title: '무료게임', games: TableData.korFree, link: 'free' },
    { title: '공포게임', games: TableData.korHorror, link: 'popular' },
    { title: '시뮬레이션', games: TableData.korSimulation, link: 'popular' }
];

const linkClickHandler = () => {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
}

const GameTable = () => {
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
                                        <img src={game.src} className="table1imgs" alt={game.name}/>
                                        <Link to={`/${game.href}`} onClick={linkClickHandler}><div className="overlay">
                                            <p>{game.info}</p>
                                        </div></Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="more-button-container">
                            <Link to={`/${category.link}`}>
                                <button className="more-button">
                                    더보기
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