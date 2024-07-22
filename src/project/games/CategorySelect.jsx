import { motion } from "framer-motion";
import React from "react";
import '../css/games.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';
import { getProdFlag } from "../utils/utils";

const CategorySelect = ({langFileName}) => {
    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }
       //hook
    useEffect(() => {
        if(!getProdFlag()) console.log('[CategorySelect] useEffect()')
        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);
        }

    }, [langFileName])

    const text = lang.findGame;
    const textArr = Array.from(text);
    const genreArr = [lang.action, lang.adventure, lang.puzzle,"RPG", lang.simulation, lang.sports, lang.racing, "FPS", lang.strategy, lang.openWorld, lang.survival, lang.horror];
    const linkArr = ["action", "adventure", "puzzle", "rpg", "simulation", "sports", "racing", "fps", "strategy", "openworld", "survival", "horror"];


    // MOTION VARIANTS START
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.05 * i },
        }),
    };

    const texts = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            },
        },
    };

    const listContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const listItem = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            },
        },
    };

    // MOTION VARIANTS END

    // Motion CSS START
    const categoryWrap = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '700px',
        backgroundColor: '#202531',
        padding: '20px',
        color: '#fff',
    };

    const categoryContent = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    };

    const titleBox = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        width: 'auto',
        height: 'auto',
        padding: '15px 25px',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#fff',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    };

    const categoryBox = {
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        justifyContent: 'center',
        marginTop: '20px',
    };

    const categoryLi = {
        width: '200px',
        height: '150px',
        backgroundColor: '#444',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
        willChange: 'transform',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: '#fff',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
    };

    const categoryLiHover = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '0',
        transition: 'opacity 0.3s ease',
    };

    const categoryText = {
        zIndex: '1',
    };

    // Motion CSS END

    return (
        <div id="category_wrap" style={categoryWrap}>
            <motion.div
                initial={{
                    opacity: 0.1,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut"
                }}
                style={categoryContent}
            >
                <motion.div
                    style={titleBox}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {textArr.map((letter, index) => (
                        <div className="text_box" key={index} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                            <motion.div variants={texts} className="motion_span">
                                {letter}
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
            <motion.div
                style={categoryBox}
                variants={listContainer}
                initial="hidden"
                animate="visible">
                {genreArr.map((genre, index) => (
                    <Link to={`/genre/${linkArr[index]}`} key={index} style={{ textDecoration: 'none' }}>
                        <motion.li
                            style={categoryLi}
                            variants={listItem}
                            whileHover={{ scale: 1.1, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)' }}
                        >
                            <div style={categoryText}>{genre}</div>
                            <div className="category_li_hover" style={categoryLiHover}></div>
                        </motion.li>
                    </Link>
                ))}
            </motion.div>
        </div>
    );
};

export default CategorySelect;