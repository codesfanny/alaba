import React from "react";
import PropTypes from "prop-types";
import styles from "./bootcamp.module.css";

const Bootcamp = ({ course }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>{course.title}</h2>
        <p className={styles.description}>
          <strong>Description: </strong>
          {course.description}
        </p>
        <p className={styles.details}>
          <strong>Weeks: </strong>
          {course.weeks} weeks
        </p>
        <p className={styles.details}>
          <strong>Tuition: </strong>${course.tuition}
        </p>
        <p className={styles.details}>
          <strong>Minimum Skill: </strong>
          {course.minimumSkill}
        </p>
        <p
          className={`${styles.details} ${
            course.scholarshipAvailable ? styles.available : styles.unavailable
          }`}
        >
          <strong>Scholarship Available: </strong>
          {course.scholarshipAvailable ? "Yes" : "No"}
        </p>
        <div className={styles.bootcampInfo}>
          <h3 className={styles.bootcampTitle}>Bootcamp Info</h3>
          <p className={styles.bootcampDetails}>
            <strong>Bootcamp: </strong>
            {course.bootcamp.name}
          </p>
          <p className={styles.bootcampDetails}>
            <strong>Bootcamp Description: </strong>
            {course.bootcamp.description}
          </p>
        </div>
      </div>
    </div>
  );
};

Bootcamp.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    weeks: PropTypes.string,
    tuition: PropTypes.number,
    minimumSkill: PropTypes.string,
    scholarshipAvailable: PropTypes.bool,
    bootcamp: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
};

export default Bootcamp;
