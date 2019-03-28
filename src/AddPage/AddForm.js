import React, { Component } from 'react';
import axios from "axios";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Redirect, Link}from "react-router-dom";
import MainPage from "../MainPage/MainPage.js"
import "./AddForm.css"


class AddForm extends Component {
  constructor(props){
    super(props);
    this.state={
      movie: {title: "", director: "", description: "", rating: 2.5},
      ratingValue: 2.5,
      goHome: false,
      errorTitle: "",
      errorDirector: "",
      errorDescription: "",
      errorInvalid: ""
    }
  }
  setTitle = (e) => {
    this.setState({
      movie: {...this.state.movie, title: e.target.value}
    })

    if(e.target.value.length > 40 || e.target.value.length < 1) {
      this.setState({
        errorTitle: "The title needs to be between 1 and 40 characters in length"
      })
    }
    else {
      this.setState({
        errorTitle: ""
      })
    }
  }
  setDirector = (e) => {
    this.setState({
      movie: {...this.state.movie, director: e.target.value}
    })

    if(e.target.value.length > 40 || e.target.value.length < 1) {
      this.setState({
        errorDirector: "The Director's name needs to be between 1 and 40 characters in length"
      })
    }
    else {
      this.setState({
        errorDirector: ""
      })
    }
  }
  setDescription = (e) => {
    this.setState({
      movie: {...this.state.movie, description: e.target.value}
    })

    if(e.target.value.length > 300 || e.target.value.length < 1) {
      this.setState({
        errorDescription: "The description needs to be between 1 and 300 characters in length"
      })
    }
    else {
      this.setState({
        errorDescription: ""
      })
    }
  }
  setRating = (e) => {
    this.setState({
      movie: {...this.state.movie, rating: e.target.value},
      ratingValue: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.source = axios.CancelToken.source();

    axios.post("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies", this.state.movie, {headers: {"Content-Type": "application/json"}, cancelToken: this.source.token})
    .then(response =>  {
      if (response.status === 201) {
        this.setState({
        goHome: true
      })
      } 
    })
    .catch (error =>{
      if (error.response.status === 400){
        this.setState({
          errorInvalid: "The movie doesn't fit the correct format. Please follow the instructions above and try again."
        })
      }
    })
  }
  render() {

    if (this.state.goHome === true) {
      return <Redirect to='/' />;
    }

    return (
      <div className="movieApp__addPage">
        <form className="movieApp__addForm" onSubmit={this.onSubmit}>
          <label className="movieApp__addLabel">Title</label>
          <input
            className="inputTitle"
            type="text"
            placeholder="Title"
            onChange={this.setTitle}
          />
          <label className="movieApp__addLabel">Director</label>
          <input
            className="inputDirector"
            type="text"
            placeholder="Director"
            onChange={this.setDirector}
          />
          <label className="movieApp__addLabel">Description</label>
          <textarea
            className="textareaDescription"
            placeholder="Description"
            onChange={this.setDescription}
          />
          <label className="movieApp__addLabel">Rating</label>
          <input
            className="inputRating"
            type="range"
            min="0.0"
            max="5.0"
            step="0.01"
            placeholder="0"
            onChange={this.setRating}
            value={this.state.ratingValue}
          />
          <p className="ratingValue">{this.state.ratingValue}</p>
          <button className="movieApp__addButton">Add Movie</button>
        </form>
        <div className="errorContainer">
          <p>{this.state.errorTitle}</p>
          <p>{this.state.errorDirector}</p>
          <p>{this.state.errorDescription}</p>
          <p>{this.state.errorInvalid}</p>
        </div>
      </div>
    )
  }
}

export default AddForm;