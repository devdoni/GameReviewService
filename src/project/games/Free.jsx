import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../css/free.css";

const Free = () => {

    const[currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "./imgs/gamethums/01.jpg",
        "./imgs/gamethums/02.jpg",
        "./imgs/gamethums/03.jpg",
        "./imgs/gamethums/04.jpg",
        "./imgs/gamethums/05.jpg",
    ];

    const date = [
        "2024-07-15",
        "2023-09-15",
        "2023-04-22",
        "2023-04-15",
        "2023-03-15",
    ];

    const gameinfos = [ 
        ["게임명 : PUBG: BATTLEGROUNDS", "게임개발자 : Google","게임플랫폼 : Android, IOS",], 
        ["게임명 : The First Descendant", "게임개발자 : Mojang", "게임플랫폼 : Windows, Mac, Linux"],
        ["게임명 : ELDEN RING", "게임개발자 : Activision", "게임플랫폼 : Xbox, PlayStation"],
        ["게임명 : Eternal Return", "게임개발자 : Riot Games", "게임플랫폼 : PC"],
        ["게임명 : Baldur's Gate 3", "게임개발자 : Valve", "게임플랫폼 : PC"]
    ];

    const showImage = (index) => {

        if (index >= images.length){

            setCurrentIndex(0);

        }else if(index < 0){

            setCurrentIndex(images.length-1);

        } else{

            setCurrentIndex(index);
        }
    };

    const nextImage = () => {

        showImage(currentIndex+1);
    };

    const preImage = () => {

        showImage(currentIndex-1);
    };

    return(

        <div className="carousel">

            <div className="title">
                무료플레이게임 추천
            </div>

            <div className="carousel-inner" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>

            {images.map((image, index) => (

                <div className={`carousel-item ${index === currentIndex ? 'active' : ''}`} key={index}>
                    <img src={image} alt={`Slide ${index+1}`} />
                </div>
            ))}
            </div>

            <button className="carousel-control prev" onClick={preImage}>
                <img src="./imgs/leftarrow.png" alt="Prev" />
            </button>

            <button className="carousel-control next" onClick={nextImage}>
                <img src="./imgs/rightarrow.png" alt="Next" />
            </button>

            <div className="content">
                출시시간 : {date[currentIndex]}
                <br/>                
               {gameinfos[currentIndex]} 
            </div>
        </div>
    );
}

export default Free;