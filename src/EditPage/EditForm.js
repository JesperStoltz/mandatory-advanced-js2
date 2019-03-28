import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect}from "react-router-dom";
import axios from 'axios';
import {Helmet} from "react-helmet";
import MainPage from "../MainPage/MainPage.js"
import "./EditForm.css"


class EditForm extends Component {
  constructor(props){
    super(props);
      this.state={
        movie: null,
        goHome: false,
        errorTitle: "",
        errorDirector: "",
        errorDescription: "",
        errorServer: "",
      }
  }
  componentDidMount(){
    this.source = axios.CancelToken.source();
    const id = this.props.match.params.id;
    axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id, {headers: {"Content-Type": "application/json"}, cancelToken: this.source.token})
    .then (response => {
      if (response.status === 200){
        this.setState({
          movie: response.data
        })
      }
    })
    .catch (error => {
      if (error.response.status === 404){
        return (
          <p>Couldn't find the movie. It might be that someone deleted it just as you clicked Edit, please press Movies and try again</p>
        )
      }
    })
  }
  componentWillUnmount(){
    this.source.cancel();
  }
  saveEdit = (e) =>{
    e.preventDefault();
    this.source = axios.CancelToken.source();
    const movieId = this.state.movie.id;
    const movie = this.state.movie;
    axios.put('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/' + movieId, movie, {headers: {cancelToken: this.source.token}})
    .then(response => {
      if (response.status === 200){
        this.setState({
          goHome: true
        })
      }
    })
    .catch(error => {
      if (error.response.status === 400){
        this.setState({
          errorServer: "The movie information is not complete. Please follow the instructions above."
        })
      }
      else if (error.response.status === 404){
        this.setState({
          errorServer: "The movie no longer exists in the movie list. This might be because someone deleted the movie from the server while you edited it."
        })
      }
    })
  }
  editTitle = (e) => {
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
  editDirector = (e) => {
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
  editDescription = (e) => {
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
  editRating = (e) => {
    this.setState({
      movie: {...this.state.movie, rating: e.target.value},
    })
  }
  render() {
    let movie = this.state.movie;

    if (this.state.goHome === true) {
      return <Redirect to='/' />;    
    }

    if (movie === null) {
      return (
        <>
          <p>Loading Movies...</p>
        </>
      )
    } 
    else {
      return (
        <div className="movieApp_editPage">
          <Helmet>
            <title>Edit Movie</title>
          </Helmet>
          <form className="movieApp__editForm" onSubmit={this.saveEdit}>
            <label className="movieApp__editLabel">Title</label>
            <input
              className="inputTitle"
              type="text"
              value={movie.title}
              minLength="1"
              maxLength="40"
              onChange={this.editTitle}
            />
            <label className="movieApp__editLabel">Director</label>
            <input
              className="inputDirector"
              type="text"
              minLength="1"
              maxLength="40"
              value={movie.director}
              onChange={this.editDirector}
            />
            <label className="movieApp__editLabel">Description</label>
            <textarea
              className="textareaDescription"
              minLength="1"
              maxLength="300"
              value={movie.description}
              onChange={this.editDescription}
            />
              <label className="movieApp__editLabel">Rating</label>
              <input
              className="inputRating"
              type="range"
              min="0"
              max="5"
              step="0.01"
              value={movie.rating}
              onChange={this.editRating}
            />
            <p className="ratingValue">{movie.rating}</p>
            <button className="movieApp_saveEditButton">Save changes</button>
          </form>
          <div className="errorContainer">
            <p>{this.state.errorTitle}</p>
            <p>{this.state.errorDirector}</p>
            <p>{this.state.errorDescription}</p>
            <p>{this.state.errorServer}</p>
          </div>
        </div>
      )
    }
  }
}

export default EditForm;