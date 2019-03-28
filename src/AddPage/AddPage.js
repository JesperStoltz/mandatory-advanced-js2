import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link}from "react-router-dom";
import { Helmet } from "react-helmet";
import "./AddPage.css"
import AddForm from './AddForm';

class AddPage extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Add Page</title>
        </Helmet>
        <div className="movieApp__addPage">
          <AddForm />
        </div>
      </>
    )
  }
}

export default AddPage;