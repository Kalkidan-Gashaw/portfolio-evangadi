import photo from "../assets/images/kalkidan1.jpg";
import cv from "../assets/cv.pdf";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home container">
      <div className="home-inner">
        <div className="home-copy">
          <h1 className="home-title gradient-title">Fullstack Developer</h1>
          <p className="home-sub">
            I build responsive, accessible web applications using modern
            JavaScript, React, and Node.js. I focus on clean interfaces,
            performance, and developer experience.
          </p>

          <div className="home-actions">
            <Link to="/projects" className="btn btn-primary">
              View Projects
            </Link>
            <a href={cv} className="btn btn-outline" download>
              Download CV
            </a>
          </div>
        </div>

        <div className="home-photo-wrap">
          <img src={photo} alt="Profile" className="home-photo" />
        </div>
      </div>
    </section>
  );
}

export default Home;
