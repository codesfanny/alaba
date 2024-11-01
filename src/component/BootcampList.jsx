import React from "react";
import Bootcamp from "./Bootcamp";
import { useCourseData } from "../utils/hooks/useCourseData";
import styles from "./bootcampList.module.css";
import { Link } from "react-router-dom";

export default function BootcampList() {
  const { courses, setCourses } = useCourseData();

  const deleteCourse = (_id) => {
    setCourses((prevCourses) => ({
      ...prevCourses,
      data: prevCourses.data.filter((course) => course._id !== _id),
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.bootcamphead}> Our Courses</h1>
      <div className={styles.grid}>
        {courses.data.map((course) => (
          <div key={course._id} className={styles.rootcard}>
            <Bootcamp course={course} />
            <div className={styles.controlbtns}>
              <Link to={`/course/${course._id}`}>
                {" "}
                <button> View course</button>
              </Link>{" "}
              <button
                onClick={() => deleteCourse(course._id)}
                className={styles.deleteCoursebtn}
              >
                delete course
              </button>
            </div>
          </div>
          // <Link key={course._id} to={`/course/${course._id}`}>
          //   <Bootcamp course={course} />
          // </Link>
        ))}
      </div>
    </div>
  );
}
