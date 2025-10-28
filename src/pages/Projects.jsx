import { projects } from "../assets/data";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <section className="projects container">
      <h1 className="gradient-title">My Projects</h1>
      <div className="project-list">
        {projects.map((p, index) => (
          <ProjectCard
            key={index}
            title={p.title}
            description={p.description}
            image={p.image}
            live={p.live}
            github={p.github}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
