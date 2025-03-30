import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import './index.css';

const CourseItemDetails = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    isLoading: true,
    isFailed: false,
    isSuccess: false,
    ItemDetails: {},
  });

  const fetchCourseDetails = useCallback(async () => {
    try {
      const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`);
      const data = await response.json();

      if (response.ok) {
        const updatedData = {
          description: data.course_details.description,
          id: data.course_details.id,
          name: data.course_details.name,
          imageUrl: data.course_details.image_url,
        };
        setState({
          isLoading: false,
          isSuccess: true,
          isFailed: false,
          ItemDetails: updatedData,
        });
      } else {
        setState({ isLoading: false, isSuccess: false, isFailed: true });
      }
    } catch (error) {
      setState({ isLoading: false, isSuccess: false, isFailed: true });
    }
  }, [id]); // Add `id` as a dependency

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]); // Now it has no missing dependencies

  const { isLoading, isFailed, isSuccess, ItemDetails } = state;
  const { description, name, imageUrl } = ItemDetails;

  return (
    <div>
      <Header />
      <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && (
          <div className="itemDetails">
            <img src={imageUrl} alt={name} />
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        )}
        {isFailed && (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={fetchCourseDetails}>
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseItemDetails;
