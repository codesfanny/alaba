import React from "react";
import Bootcamp from "./Bootcamp";
import { useCourseData } from "../utils/hooks/useCourseData";
import styles from "./bootcampList.module.css";
import { Link } from "react-router-dom";

export default function BootcampList() {
  const { courses } = useCourseData();

  return (
    <div className={styles.container}>
      <h1 className={styles.bootcamphead}> Our Courses</h1>
      <div className={styles.grid}>
        {courses.data.map((course) => (
          <Link key={course._id} to={`/course/${course._id}`}>
            <Bootcamp course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}
