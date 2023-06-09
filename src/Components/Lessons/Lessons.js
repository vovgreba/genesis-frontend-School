import { React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { requestDataCourse } from '../../Api/Api'
import{ ReactComponent as Preloader } from '../../Preloder/loading.svg'

import { Header } from '../Header/Header'
import VideoPlayer from '../Video/VideoPlayer';
import './Lesson.scss'
function Lesson() {
  const[course, setCourse] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  
  useEffect(() => {
    const getDataCourse = async() => {
      setLoading(true)
      const data = await requestDataCourse(id)
      setCourse(data)
      setLoading(false)
    }
    getDataCourse()
  }, [id])
  const { lessons } = course

  if(loading) {
    return(
      <div className='preloader'>
        <Preloader />
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className='lesson container'>
      
      <h1 className='title'>Course {course.title}</h1>
      <img className='course-img' src={course.previewImageLink + '/cover.webp'} alt='course'/>
      <h4 className='desc'>{course.description}</h4>
      {
        lessons?.map((lesson, index) => {
            return (
              <div className='lesson-content' key={index}>
                <h2 className='lesson-order'>Lesson {lesson.order}</h2>
                <h3 className='lesson-title'>{lesson.title}</h3>
                <img className='lesson-image' src={`${lesson?.previewImageLink}/lesson-${lesson.order}.webp`} alt='lesson'/>

                <div className='lesson-play'>
                  
                  {
                    lesson.link ? <VideoPlayer videoSrc={lesson?.link} id={lesson?.id}/> : 'Not a video link'
                    
                  }
                  {
                    
                    lesson.status === 'locked' ? <p className='video-locked'>Unfortunately, this video is blocked. You will not be able to view it.</p>: <></>
                    
                  }
                </div>


              </div>
            )
          
        })
      }
    </div>
    </>

  );
}

export default Lesson;
