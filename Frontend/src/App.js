import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ViewResults from './components/ViewResults';
import AddResults from './components/AddResults';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/viewResults' element={<ViewResults/>}/>
        <Route path='/addResults' element={<AddResults />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
