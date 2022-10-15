import { useState, useEffect } from 'react';
import './App.css';
import { library } from './library';



function App () {
    let [sign, setSign] = useState(0);
    const {id, name, date, image} = library[sign];
    const [isLoading, setIsLoading] = useState(true);
    const [astro, setAstro] = useState('');



    useEffect (() => {
        const fetchData = async () => {        
            const url = `https://aztro.sameerkumar.website/?sign=${name}&day=today`;
            const response = await fetch(url, {method: 'POST'});
            const data = await response.json();
            const astro = data.description;
            // console.log(astro);
            if (astro) {
                setIsLoading(false);
                setAstro(data.description);
            }
            else {
                setIsLoading(true);
            }  
        } 
        
        fetchData()
        .catch(console.error);

    },[name]);

    const previousSign = () => {
        setIsLoading(true);
        setSign(sign => {
            sign--;
            return sign < 0 ? library.length - 1 :  sign;
        })
    }

    const nextSign = () => {
        setIsLoading(true);
        setSign(sign => {
            sign++;
            return sign >= library.length ? 0 : sign;
        })
    }


    return (
        <div className="main">
            <div className="container">
                <div className="horoscope">
                    <div className="sign">
                        <img className="sign_image" src={image} alt="zodiac sign" />
                        <div className="choice">
                            <button className="choice_btn" onClick={() => previousSign()} id="prev"><img className="choice_image" src="./img/icons/arrow_prev.png" alt="previous" /></button>
                            <div className="choise_container">
                                <h2 className="choice_header">{name}</h2>
                                <div className="choice_date">{date}</div>
                            </div>
                            <button className="choice_btn" onClick={() => nextSign()} id="next"><img className="choice_image" src="./img/icons/arrow_next.png" alt="next" /></button>
                        </div>
                    </div>
                    <div className="description">
                        <h1 className="description_header">Daily Horoscope</h1>
                        <p className="description_text"> {isLoading ? 'Loading...' : astro} </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default App;