import { Link } from "react-router-dom";
import "../assets/styles/navbar.css"

export default function Navbar(){
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="nav-button">Home</Link>
                <Link to ="/tutorial" className="nav-button">Tutorial</Link>
                <Link to="/game" className="nav-button">Game</Link>
                <Link to ="/about" className="nav-button">About</Link>
            </div>
        </nav>
    );
}