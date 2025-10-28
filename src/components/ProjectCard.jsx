import React from "react";
import PropTypes from "prop-types";

function ProjectCard({ title, description, image, live, github, tags }) {
  const imgSrc = image
    ? new URL(`../assets/images/${image}`, import.meta.url).href
    : null;

  return (
    <>
      <article className="project-card" role="article" tabIndex={0}>
        {imgSrc && (
          <div className="project-media">
            <img src={imgSrc} alt={title} />
          </div>
        )}

        <div className="project-body">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="tag-list">
            {tags &&
              tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
          </div>
          <div className="project-actions">
            <a
              href={live}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              View Live
            </a>
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              GitHub
            </a>
          </div>
        </div>
      </article>
    </>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  live: PropTypes.string,
  github: PropTypes.string,
  tags: PropTypes.array,
};

export default ProjectCard;
