import React from "react"
import '../css/games.css';
import CategorySelect from "./CategorySelect";

const Category = ({langFileName}) => {
    return(
        <>
        <div id="category_wrap">
            <div className="item_content">
                <CategorySelect langFileName={langFileName}/>
            </div>
        </div>
        </>
    );
}


export default Category;