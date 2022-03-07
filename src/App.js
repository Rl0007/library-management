import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import {Navbar  } from './Components/Navbar';
import { Addbook } from './Pages/Addbook'
import { Addmember } from './Pages/Member';
import { Addissuebook } from './Pages/issuebook';
import { Addreturn1book } from './Pages/returnbook';
import { Addsearch } from './Pages/searchpage';
import { Addpopularbook } from './Pages/popularbook';
import { Addhighcust } from './Pages/highcustomer';

// import { Addtransaction } from './Pages/Transaction';

function App() {
  return (
    <>
    
   <Navbar/>
   <div className="container">
   <Routes>
   
    
      <Route path ='/addbook' element={ <Addbook/>}/>
      <Route path ='/member' element={<Addmember/>}  />
      <Route path ='/issuebook' element={<Addissuebook/>}  />
      <Route path ='/addsearch/' element={ <Addsearch/>}/>
      <Route path ='/returnbook' element={<Addreturn1book/>}  />
      <Route path ='/popularbook' element={<Addpopularbook/>}  />
      <Route path ='/popularbook' element={<Addpopularbook/>}  />
      <Route path ='/highcust' element={<Addhighcust/>}  />







  
  
   </Routes>
   </div>
    
    </>
  );
}

export default App;
