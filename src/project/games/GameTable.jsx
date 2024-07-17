import React from "react";
import TestData from '../db/TestData.json'
import '../css/home.css';

const GameTable = () => {
    const Data = TestData;
    return(
        <>
        {Data.map((games, idx) => 
        <table>
        <tr className="thead">
            <td colSpan="2">
                <h2>인기제품</h2>
            </td>
        </tr>
        <tbody className="tablebgimg">
        <tr>
            <td key={idx}>
                <div className="img_container">
                    <img src={games.src} className="table1imgs"
                    style={{
                        border: "1px none rgba(255, 255, 255, 0.1)",
                        borderRadius: "7px 0 0 0",
                        backgroundColor: "rgba(255, 255, 255, 0.1)"

                    }}/>
                    <div className="overlay">
                        <p>{games.info}</p>
                    </div>
                </div>        
            </td>
            <td key={idx}>
                <div className="img_container">
                    <img src={games.src} className="table1imgs"
                    style={{
                        border: "1px none rgba(255, 255, 255, 0.1)",
                        borderRadius: "0 7px 0 0",
                        backgroundColor: "rgba(255, 255, 255, 0.1)"

                    }}/>
                    <div className="overlay">
                        <p>{games.info}</p>
                    </div>
                </div>        
            </td>
        </tr>
        <tr>
        <td key={idx}>
                <div className="img_container">
                    <img src={games.src} className="table1imgs"
                    style={{
                        border: "1px none rgba(255, 255, 255, 0.1)",
                        borderRadius: "0 0 0 7px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)"

                    }}/>
                    <div className="overlay">
                        <p>{games.info}</p>
                    </div>
                </div>        
            </td>
            <td key={idx}>
                <div className="img_container"
                style={{
                    border: "1px none rgba(255, 255, 255, 0.1)",
                    borderRadius: "0 0 7px 0",
                    backgroundColor: "rgba(255, 255, 255, 0.1)"

                }}>
                    <img src={games.src} className="table1imgs"/>
                    <div className="overlay">
                        <p>{games.info}</p>
                    </div>
                </div>        
            </td>
        </tr>
        </tbody>
    </table>
    )}
    </>
    )
}

export default GameTable;