import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
 const[word,Setword]= useState('')
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
  <div className="container-fluid">
    <a className="navbar-brand" href="/addbook">Library Management</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link to={`/addbook`} style={{ textDecoration: 'none' }}>   <a className="nav-link active" aria-current="page" >Book</a></Link>
        </li>
        <Link to={`/member`}style={{ textDecoration: 'none' }}>
        <li className="nav-item">
          <a className="nav-link" href="#">Member</a>
        </li>
        </Link>
     
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Transaction
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">
        <Link to={`/issuebook`}style={{ textDecoration: 'none',color: 'black' }}>
              
              issuebook
              </Link>
            </a></li>
            <li><a className="dropdown-item" href="#">
        <Link to={`/returnbook`}style={{ textDecoration: 'none',color: 'black' }}>
              Return book</Link></a></li>
          
          </ul>
        </li>
         <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Tools
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">
        <Link to={`/popularbook`}style={{ textDecoration: 'none',color: 'black' }}>
              
              Popular book
              </Link>
            </a></li>
            <li><a className="dropdown-item" href="#">
        <Link to={`/highcust`}style={{ textDecoration: 'none',color: 'black' }}>
              Valuable customer</Link></a></li>
          
          </ul>
        </li>
     
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" onChange={(e)=>{Setword(e.target.value)}} placeholder="Search" aria-label="Search"/>
        <Link to={`/addsearch` } state={{ word: word }} style={{textDecoration:'none'}}><button className="btn btn-outline-light " type="submit" > Search </button></Link>
      </form>
    </div>
  </div>
</nav>
  )
}
