import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/context';
import { Home } from './page/Home';
import { Posts } from './page/posts';
import { Settings } from './page/settings';
import { NavBar } from './navigation/navigation';
import { useContext } from 'react';


function App() {

  const theme = useContext(ThemeProvider);

  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#f9f9f9' : '#333',
      color: theme === 'light' ? '#333' : '#f9f9f9',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      fontFamily: 'sans-serif',
    }}>
      <NavBar/>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/setting' element={<Settings />} />
        </Routes>
    </div>
  );
}

export default App;
