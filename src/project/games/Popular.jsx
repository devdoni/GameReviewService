import React, { useEffect, useState } from "react";

import "../css/popular.css";

import popularDB from './popularDB.json';
import { Link } from "react-router-dom";

const Popular = () => {

    // hook

    const [popularArr, setPopularArr] = useState([]);

    useEffect(() => {
        console.log('useEffect()');

        console.log('popularDB: ', popularDB);
        setPopularArr(popularDB);

    }, []);

    

    return(
        <div id="popular_wrap">
            <div className="popular-header">
                인기게임
            </div>


            <div className="items">
                {
                    popularArr.map((popular, idx)=>{
                        return(
                            <div className="item">
                                <div><Link to={`/detail/${popular['no']}`}><img src={popular['thumnail-link']}/></Link></div>
                                <div>space</div>
                                <div>{popular['Price']}원</div>
                                <div>{popular['Discount']}</div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    );
}


export default Popular;