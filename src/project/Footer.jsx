import React, { useEffect, useState } from "react";
import './css/index.css';
import { getProdFlag } from "./utils/utils";
import { Link } from "react-router-dom";
import txt_kor from './db/txt_kor.json';
import txt_eng from './db/txt_eng.json';
import txt_chi from './db/txt_chi.json';


const Footer = ({langFileName}) => {

    //Handler
    const footerLogoClickHadnler = () => {
        if(!getProdFlag()) console.log('[Footer] footerLogoClickHadnler()'); {
            window.scroll({top: 0, left: 0, behavior: 'smooth'});
        }
    }
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
    }, [langFileName]);

    return(
        <div id="footer">
            <div className="footer_content">
                <div className="footer_logo">
                    <img src={`${process.env.PUBLIC_URL}/imgs/logo.png`} alt="logo" onClick={footerLogoClickHadnler}/>
                </div>
            <div className="footer_text">
                <div className="copyright">
                    © 2024 Games Corporation. All rights reserved.
                </div>
            <div className="footer_info">
                <Link to={'/privacypolicy'} onClick={footerLogoClickHadnler}>{lang.privacyPolicy}</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to={'/termsofservice'} onClick={footerLogoClickHadnler}>{lang.termsOfService}</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to={'/copyrightpolicy'} onClick={footerLogoClickHadnler}>{lang.copyrightPolicy}</Link>
            </div>
        </div>
    </div>
</div>
    );
}

export default Footer;