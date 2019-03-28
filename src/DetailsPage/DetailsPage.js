import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link}from "react-router-dom";
import DetailsTable from "./DetailsTable.js";

class DetailsPage extends Component {
  render() {
    return (
      <div className="movieApp__DetailsPage">
        <DetailsTable/>
      </div>
    )
  }
}

export default DetailsPage;