import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [term, setTerm] = useState("new");
  const [pictures, setPictures] = useState([]);
  const [pageNum, setPageNum]= useState(1)
  const [ref, setRef]= useState(true)
  const changeHandler = e => {
    setTerm(e.target.value);
    console.log(term);
  };
 

  const sendRequest = e => {
    e.preventDefault();
    setPageNum(1);
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: {
          query: term,
          page: 1,
          per_page: 20,
         
          
        },
        headers: {
          Authorization:
            "Client-ID 89a74f8c26da940b295f7c22ccaf83e3404ac033065c8db15fcbbc3b0639a400"
        }
      })
      .then(response => {
        setPictures([...response.data.results]);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  
  const pageChange = e => {
   
    e.preventDefault();
    setPictures([])
    e.target.name==='inc'
    ? setPageNum(pageNum + 1)
    : e.target.name==='dec' && pageNum > 1  && setPageNum(pageNum - 1)
    setRef(true)
  }
  useEffect(()=>{
  
    ref &&
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: {
          query: term,
          page: pageNum,
          per_page: 20,
          
          
        },
        headers: {
          Authorization:
            "Client-ID 89a74f8c26da940b295f7c22ccaf83e3404ac033065c8db15fcbbc3b0639a400"
        }
      })
      .then(response => {
        setRef(false)
        setPictures([...response.data.results]);
        
      })
      .catch(error => {
        console.log(error.message);
      });
  });
  return (
    <div className="container">
      <div className=' sticky-top '>
      <nav className="navbar navbar-light">
      <a className="navbar-brand col-lg-5 col-sm-12 ">Search for pictures</a>
      <form onSubmit={sendRequest} className="form-inline">
        <input
          type="text"
          onChange={changeHandler}
          className="form-control mr-sm-2"
        />
        <button type="submit" value="Search" className="btn btn-outline-primary my-2 my-sm-0" >Search</button>
      </form>

      
      </nav>
      <nav aria-label="Page navigation example ">
        <ul className="pagination justify-content-between">
          <li className="page-item" >
            <button className="btn btn-outline-primary" onClick={pageChange} name='dec'>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item" >
            <h3 className='badge badge-primary text-wrap text-uppercase'>
              '{term}' pictures page {pageNum}
            </h3>
            </li> 
          

          <li className="page-item" >
            <button className="btn btn-outline-primary"  onClick={pageChange} name='inc'>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
    </nav>
    </div>
      
      <div className="d-flex flex-wrap justify-content-center " >
      {pictures.length
      ? pictures.map(pic => (  
         <a href={pic.urls.full} target='blank' key={pic.id} > 
        <div className="card"  > 
          <img  src={pic.urls.thumb} alt={pic.id} className="card-img-top"/>
        </div> 
        </a>
       
))      
          :term &&
          <div className='loding'>
            <h1 className='lod'>loading...</h1>
          <div className="spinner-grow text-light " role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-primary " role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
       
        </div>

        
        
      }
       </div>   
    </div>
  );
}

export default App;