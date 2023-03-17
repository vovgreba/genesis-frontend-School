import {React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { requestDataCourse } from '../../Api/Api'


import VideoPlayer from '../Video/VideoPlayer';
import './Lesson.scss'
function Lesson() {
  const[course, setCourse] = useState([])
  const { id } = useParams();
  // console.log(id)
  useEffect(() => {

    const getDataCourse = async() => {
      const data = await requestDataCourse(id)
      setCourse(data)
      
    }
    getDataCourse()
  }, [id])
  const { lessons } = course
  return (
    <div className='lesson container'>
      <h1 className='title'>Course {course.title}</h1>
      <img src={course.previewImageLink + '/cover.webp'} alt='course'/>
      <h4 className='desc'>{course.description}</h4>
      {
        lessons?.map((lesson, index) => {
            return (
              <div key={index}>
                <h2 className='lesson-order'>Lesson {lesson.order}</h2>
                <h3 className='lesson-title'>{lesson.title}</h3>
                <img className='lesson-image' src={`${lesson?.previewImageLink}/lesson-${lesson.order}.webp`} alt='lesson'/>

                <div>
                  {
                    lesson.link ? <VideoPlayer videoSrc={lesson?.link}/> : 'Not a video link'
                  }
                </div>


              </div>
            )
          
        })
      }
    </div>
  );
}

export default Lesson;
