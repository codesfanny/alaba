import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customInstance from "../axiosInstance";
import styles from "./courseDetails.module.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await customInstance.get(`/api/v1/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await customInstance.delete(`/api/v1/courses/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/course/edit/${id}`);
    console.log("Edit course:", course);
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2 className={styles.coursehead}>{course.data.title}</h2>
        <p>
          <strong>Description:</strong> {course.data.description}
        </p>
        <p>
          <strong>Weeks:</strong> {course.data.weeks} weeks
        </p>
        <p>
          <strong>Tuition:</strong> ${course.data.tuition}
        </p>
        <p>
          <strong>Minimum Skill:</strong> {course.data.minimumSkill}
        </p>
        <p>
          <strong>Scholarship Available:</strong>{" "}
          {course.data.scholarshipAvailable ? "Yes" : "No"}
        </p>
        <div className={styles.thebuttons}>
          <div>
            <button onClick={handleEdit} className={styles.editbutton}>
              Edit
            </button>{" "}
          </div>
          <div>
            <button onClick={handleDelete} className={styles.deletebutton}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
