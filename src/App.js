import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import {Navbar  } from './Components/Navbar';
import { Addbook } from './Pages/Addbook'
import { Addmember } from './Pages/Member';
import { Addtransaction } from './Pages/Transaction';

function App() {
  return (
    <>
    
   <Navbar/>
   <div className="container">
   <Routes>
   
    
      <Route path ='/' element={ <Addbook/>}/>
      <Route path ='/member' element={<Addmember/>}  />
      <Route path ='/transaction' element={<Addtransaction/>}  />

  
  
   </Routes>
   </div>
    
    </>
  );
}

export default App;
