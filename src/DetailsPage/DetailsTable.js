import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link}from "react-router-dom";
import EditForm from "../EditPage/EditForm.js"
import axios from "axios";
import { Helmet } from "react-helmet";
import "./DetailsTable.css"

class DetailsTable extends Component {
    constructor(props){
        super(props);
        this.state={
            movies: []
        }
    }
    componentDidMount(){
        this.source = axios.CancelToken.source();
        const id = this.props.match.params.id;
        axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id, { cancelToken: this.source.token })
        .then((response) => {
            if (response.status === 200){
                this.setState({
                    movies: response.data
                })
            } 
        })
        .catch (error => {
            if (error.response.status === 404){
                return (
                    <p>Couldn't find the movie. This is probably because someone deleted it from the server. Please click Movies.</p>
                )
            }
        })
    }
    componentWillUnmount(){
        this.source.cancel();
    }
    render(){
        const movieData = this.state.movies;
        return (
            <div className="detailsPage">
                <Helmet>
                    <title>DetailsPage</title>
                </Helmet>
                <table className="movieApp__mainTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Description</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{movieData.title}</td>
                            <td>{movieData.director}</td>
                            <td>{movieData.description}</td>
                            <td>{movieData.rating}</td>
                        </tr>
                    </tbody>
                </table>
                <Link className="movieApp__link" to={'/edit/'+ movieData.id}>
                    <button id={movieData.id} className="movieApp_goEditButton">Edit</button>
                </Link>
            </div>
        )
    }
}


export default DetailsTable;