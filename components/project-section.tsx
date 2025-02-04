"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectTag from "./project-tag";
import ProjectCard from "./project-card";
import { projectsData } from "@/constants";

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
    setVisibleProjects(6); // Reset to show first 6 when tag changes
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const handleLoadMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="API"
          isSelected={tag === "Api"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.slice(0, visibleProjects).map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              app={project.app}
            />
          </motion.li>
        ))}
      </ul>
      {visibleProjects < filteredProjects.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-600 hover:bg-gradient-to-br hover:from-blue-600 hover:to-secondary-700 text-white font-semibold transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
