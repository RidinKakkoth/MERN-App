import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';

function App() {
  return (
    <div >
      <Router>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      {/* <Route path='/home' element={<Home/>}/> */}
      </Routes>
      </Router>
    </div>


  );
}

export default App;
