import { motion } from "framer-motion";
import React from "react";
import '../css/games.css';
import { Link } from "react-router-dom";

const CategoryTest = () => {
    const text = "무슨 게임을 찾고 계신가요?";
    const textArr = Array.from(text);
    const genreArr = ["액션", "어드벤처", "퍼즐", "RPG", "시뮬레이션", "스포츠", "레이싱", "FPS", "전략", "오픈월드", "생존", "공포"];
    const linkArr = ["action", "advencure", "puzzle", "rpg", "simulration", "spotrs", "racing", "fps", "strategy", "openworld", "survival", "horror"];


    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
        }),
    };

    const texts = {
        hidden: {
            opacity: 0,
            y: 10,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    const listContainer = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const listItem = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };



    return (
        <div id="categoryTest" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '700px' }}>
            <motion.div className="category_content"
                initial={{
                    y: 0,
                    opacity: 0.1,
                    width: '10px',
                    height: '10px',
                    borderRadius: '100%',
                    fontSize: '1px'
                }}
                animate={{
                    opacity: 1,
                    width: '250px',
                    height: '50px',
                    borderRadius: '20px',
                    fontSize: '1em',
                    y: -40,
                    visibility: 'visible'
                }}
                transition={{
                    duration: 0.7,
                }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <motion.div
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', 
                        width: '250px',
                        height: '50px',
                        borderRadius: '10px'
                        ,}}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {textArr.map((letter, index) => (
                        <div className="text_box" key={index}>
                            <motion.span variants={texts} className="motion_span">
                                {letter}
                            </motion.span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
            <motion.div
                style={{
                    width: '900px',
                    margin: '0 auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '50px',
                    justifyContent: 'center',
                    marginTop: '20px'
                }}
                variants={listContainer}
                initial="hidden"
                animate="visible"
            >
                {genreArr.map((genre, index) => 
                    <Link to={`/genre/:${linkArr[index] }`}><motion.li 
                        key={index}
                        style={{
                            width: '200px',
                            height: '50px',
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '10px',
                            willChange: 'transform'
                        }}
                        variants={listItem}
                        whileHover={{scale:1.1}}
                    >
                        {genre}
                    </motion.li>
                    </Link>
                )}
            </motion.div>
        </div>
    );
};

export default CategoryTest;