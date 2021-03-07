import React from "react"
import "./nav.css"

function Navbar(){
    const [show,handleShow]=React.useState(false)

    React.useEffect(() => {
        window.addEventListener("scroll",() => {
            if(window.scrollY>130){
                handleShow(true);
            }else{
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }

    },[])
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img className="nav_logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"></img>

            <img className="nav_avat" src="https://i.imgur.com/yhnwhe1.png"></img>

        </div>

    )
}

export default Navbar