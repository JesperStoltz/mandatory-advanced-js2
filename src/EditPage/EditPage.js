import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link}from "react-router-dom";
import EditForm from './EditForm';
import "./EditPage.css"

class EditPage extends Component {
  render() {
    return (
      
        <EditForm />
      
    )
  }
}

export default EditPage;