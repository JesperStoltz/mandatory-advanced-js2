import React, { Component } from 'react';
import MovieTable from "./MovieTable.js";
import { Helmet } from "react-helmet";
import "./MainPage.css"


class MainPage extends Component {
  render() {
    return (
      <div className="movieApp__mainPage">
        <Helmet>
          <title>Movies</title>
        </Helmet>
        <MovieTable />
      </div>
    )
  }
}

export default MainPage;