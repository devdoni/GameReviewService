import React from "react"
import '../css/games.css';
import CategorySelect from "./CategorySelect";
const Category = () => {
    return(
        <>
        <div id="category_wrap">
            <div className="item_content">
                <CategorySelect />
            </div>
        </div>
        </>
    );
}


export default Category;