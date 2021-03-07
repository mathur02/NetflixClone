import React from "react"
import axios from "./axios"
import "./row.css"
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"

const baseURl="https://image.tmdb.org/t/p/original/"



function Row(props){
    const [movies,Setmovies] = React.useState([]);

    const [trailerUrl , settrailerUrl] = React.useState("");

    React.useEffect(() => {

        async function fetchData() {
            const request = await axios.get(props.fetchURL);
            Setmovies(request.data.results);
            
            return request;

        }
        fetchData();


    },[props.fetchURL]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const handleClick= (movie) => {
          if(trailerUrl){
              settrailerUrl('');
          }else{
              movieTrailer(movie?.name || "")
                .then((url) => {
                    //https://www.youtube.com/watch?v=XtMThy8QKqU&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=4 
                    const urlParams = new URLSearchParams(new URL(url).search);
                    settrailerUrl(urlParams.get("v"));

                })
                .catch((error) => console.log(error));
          }

      }
    return (
        <div className="row">
            <h2>{props.title}</h2>

            <div className="row_posters">
                {movies.map(movie =>(
                    <img 
                    key={movie.id}
                    onClick = {() => handleClick(movie)}
                    className={`row_img ${props.isLargeRow && "row_large"}`}
                    src={`${baseURl}${props.isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name}></img>
                ))}

                
            </div>
                            
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
                   
        </div>

    )
}
export default Row