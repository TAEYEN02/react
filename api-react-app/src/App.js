import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MultipleButtons from './MultiButtons';
import Address from './Address';
import Member  from './Member';
import Movie from './Movie';
import MapContainer from './Map';


function App() {
  return (
    <div className="App" style={{marginTop:"10px"}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MultipleButtons/>}/>
          <Route path='/address' element={<Address/>}/>
          <Route path='/member' element={<Member/>}/>
          <Route path='/movie' element={<Movie/>}/>
          <Route path='/map' element={<MapContainer/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
