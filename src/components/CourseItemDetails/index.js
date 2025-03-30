import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import './index.css'

const CourseItemDetails = () => {
  const { id } = useParams() // ✅ Get the course ID from URL params
  const [isLoading, setIsLoading] = useState(true)
  const [isFailed, setIsFailed] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [ItemDetails, setItemDetails] = useState({})

  useEffect(() => {
    fetchCourseDetails()
  }, [])

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
      const data = await response.json()

      if (response.ok) {
        const updatedData = {
          description: data.course_details.description,
          id: data.course_details.id,
          name: data.course_details.name,
          imageUrl: data.course_details.image_url,
        }

        setIsLoading(false)
        setIsSuccess(true)
        setIsFailed(false)
        setItemDetails(updatedData)
      } else {
        setIsLoading(false)
        setIsFailed(true)
        setIsSuccess(false)
      }
    } catch (error) {
      setIsLoading(false)
      setIsFailed(true)
      setIsSuccess(false)
    }
  }

  const { description, name, imageUrl } = ItemDetails

  return (
    <div>
      <Header />
      <div>
        {isLoading && (
          <div data-testid="loader" className="spinner">
            <div
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            ></div>
          </div>
        )}
        {isSuccess && (
          <div className="itemDetails">
            <div>
              <img src={imageUrl} alt={name} />
            </div>
            <div>
              <h1>{name}</h1>
              <p>{description}</p>
            </div>
          </div>
        )}
        {isFailed && (
          <div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                alt="failure view"
              />
            </div>
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <div>
              <button type="button" onClick={fetchCourseDetails}>
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseItemDetails
