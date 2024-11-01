import React, { useEffect, useState } from "react";
import customInstance from "../../axiosInstance";

export const useCourseData = () => {
  const [courses, setCourses] = useState({ data: [] });
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    const coursesData = async () => {
      try {
        const response = await customInstance.get("/api/v1/courses");
        setCourses(response.data);
      } catch (error) {
        setErrorMessage(error.response);
      }
    };

    coursesData();
  }, []);
  return { courses, setCourses, errorMessage };
};
