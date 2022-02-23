import logo from './logo.svg';
import './App.css';
import {Navbar  } from './Components/Navbar';
import { Addbook } from './Pages/Addbook'

function App() {
  return (
    <>
    <div className="App">
   <Navbar/>
    </div>
    <div className="container">
   <Addbook/>

    </div>
    </>
  );
}

export default App;
