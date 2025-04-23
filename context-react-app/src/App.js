import './App.css';
// import { Child } from './Child';
// import { GrandChild } from './GrandChild';
// import { Parent } from './Parent';
// import { ThemePeovider, ThemeSwitch } from './ThemeContext';
import { Routes, Route,Navigate } from 'react-router-dom';
import { Header } from './components/Haader';
import { ProductList } from './pages/ProductList';
import { CartPage } from './pages/CartPage';
function App() {
  // const user = {name : 'John Deo', age:30}

  // return (
  //   <UserProvider>
  //     <Parent />
  //   </UserProvider>

  //   <ThemePeovider>
  //       <ThemeSwitch/>
  //   </ThemePeovider>
  // )

  return(
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  </>
  )
}

export default App;
