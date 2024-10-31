import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customInstance from "../axiosInstance";
import styles from "./editCourse.module.css";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    data: {
      title: "",
      description: "",
      weeks: "",
      tuition: "",
      minimumSkill: "",
      scholarshipAvailable: false,
    },
  });

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

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      data: {
        ...prevCourse.data,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customInstance.put(`/api/v1/courses/${id}`, course.data);
      navigate(`/course/${id}`);
    } catch (error) {
      console.error(
        "Error updating course:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={course.data.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={course.data.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Weeks:
          <input
            type="number"
            name="weeks"
            value={course.data.weeks}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tuition:
          <input
            type="number"
            name="tuition"
            value={course.data.tuition}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Minimum Skill:
          <input
            type="text"
            name="minimumSkill"
            value={course.data.minimumSkill}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Scholarship Available:
          <input
            type="checkbox"
            name="scholarshipAvailable"
            checked={course.data.scholarshipAvailable}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourse;
