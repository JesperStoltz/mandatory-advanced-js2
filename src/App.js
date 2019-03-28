import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link}from "react-router-dom";
import {Helmet} from "react-helmet";
import MainPage from "./MainPage/MainPage.js"
import AddPage from "./AddPage/AddPage.js"
import EditForm from "./EditPage/EditForm.js"
import DetailsTable from "./DetailsPage/DetailsTable.js"
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <>
          <div className="movieApp">

            <div className="movieApp__header">
                <h1 className="movieApp__title">Movies</h1> 
              <div className="movieApp_linkButtonContainer">
                <Link to='/'><button className="movieApp__linkButton">Movies</button></Link>
                <Link to='/add'><button className="movieApp__linkButton">Add a movie</button></Link>
              </div>
            </div /* movieApp__header */>

            <div className="movieApp__content">
              <Route exact path='/' component={MainPage} />
              <Route path='/add' component={AddPage} />
              <Route path='/edit/:id' component={EditForm} />
              <Route path='/description/:id' component={DetailsTable} />
            </div /* movieApp__content */>
          </div /* movieApp */>
        </>
      </Router>
    )
  }
}

export default App;
