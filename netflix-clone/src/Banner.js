import React from "react"
import requests from "./requests"
import axios from "./axios"
import "./banner.css"

function Banner(){
    const [ movie , setMovie ] = React.useState([]);

    React.useEffect(() => {

        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random()* request.data.results.length-1)
                ]
            );

        };
        fetchData();

    },[]);

    function truncate(str,n){
        return str?.length>n ? str.substr(0,n-1) + "...":str; 

    }

    return(

        <header className="banner"
        style={{
            backgroundSize:"cover",
            backgroundPosition:"center center",
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        }}>
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button">
                        play

                    </button>
                    <button className="banner_button">
                        My List
                        
                    </button>

                </div>
                <h1 className="banner_description">
                   { truncate(movie?.overview,350)}

                </h1>

            </div>

            <div className="banner--fadebottom"></div>

        </header>
    )
}

export default Banner