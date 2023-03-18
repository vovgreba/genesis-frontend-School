import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { requestData } from '../../Api/Api'
import HoverVideo from '../Video/HoverVideo'
import './Courses.scss'
import{ ReactComponent as Preloader } from '../../Preloder/loading.svg'
import Pagination from '../Pagination/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating} from '@mui/material';
function Courses() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountCoursesPerPage] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();
  const page = new URLSearchParams(location.search).get('page') || 1;

  useEffect(() => {
    if(page !== currentPage) {
      navigate(`?page=${currentPage}`);
    }
    const getData = async () => {
      try{
        const responseData = await requestData();
        setCourses(responseData);
        setLoading(false)
      }catch(error) {
        setLoading(false)
        setError(error)
      }

    };
    getData();
  }, [currentPage, navigate, page]);
  
  const lastTenCourses = courses.courses && courses.courses?.slice(-amountCoursesPerPage);
  const remainingCourses = courses.courses?.slice(0, -amountCoursesPerPage);
  
  let lastCourseIndex = currentPage * amountCoursesPerPage;
  let firstCourseIndex = lastCourseIndex - amountCoursesPerPage;
  let currentCoursePage = 0;

  const lastPages = Math.ceil(courses.courses?.length / amountCoursesPerPage)

  if(currentPage === 1) {
    currentCoursePage = lastTenCourses;
  } else {
    lastCourseIndex = (currentPage - 1) * amountCoursesPerPage;
    firstCourseIndex = lastCourseIndex - amountCoursesPerPage;
    currentCoursePage = remainingCourses && remainingCourses.slice(firstCourseIndex, lastCourseIndex)

  } 

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
 
  if(loading) {
    return(
      <div className='preloader'>
        <Preloader />
      </div>
    )
  } 
  if(error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (

    <div className='container'>
      
        <h1 className='title'>Courses</h1>
        <div className='courses'>
                        
          {currentCoursePage?.map(el => {
            const link = el?.meta?.courseVideoPreview?.link
            
            return(
              <div className='card-course' key={el.id}>
                <h2 className='card-title'>{el.title}</h2>
                <Link to={'/lesson/' + el.id}>
                <HoverVideo 
                  videoSrc={link}
                  imageSrc={el.previewImageLink + '/cover.webp'}
                />
                </Link>


                <h4 className='desc'>{el.description}</h4>
                <div className='info'> 
                  <div className='classes'>
                    <img className='icon-course' src={process.env.PUBLIC_URL + '/images/icon-course.svg'}
                   alt="icon" />
                    <span>{el.lessonsCount + ' Classes'}</span>
                  </div>
                  <div className='rating'>
                    <Rating  name="half-rating-read" defaultValue={1} max={1}  readOnly />
                    <span className='value'>{el.rating}</span>
                </div>
                </div>
                <ul className='list-skills'>
                  {(el.meta.skills) ? <h4>Skills</h4>: <></> }
                  {el.meta.skills?.map((el, index)=> {
                    return (
                      <li key={index} >{el}</li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

      <Pagination 
        amountCoursesPerPage={amountCoursesPerPage} 
        lastPages={lastPages}
        onChange={handlePageChange}
        currentPage={currentPage}
      />

    </div>
  );
}

export default Courses;
