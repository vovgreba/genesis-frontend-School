import './App.css';
import { Routes, Route } from 'react-router-dom'
import Courses from './Components/Courses/Courses';
import Lesson from './Components/Lessons/Lessons';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element= {< Courses/>} exact/>
      <Route path='/lesson/:id' element= {< Lesson/>}/>
    </Routes>
    </>

  );
}

export default App;
