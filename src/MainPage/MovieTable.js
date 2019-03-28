import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link}from "react-router-dom";
import axios from "axios";
import SearchField from "./SearchField.js";
import DetailsTable from "../DetailsPage/DetailsTable.js"
import EditForm from "../EditPage/EditForm.js"
import "./MovieTable.css"

class MovieTable extends Component {
    constructor(props){
        super(props);
        this.state={
            movies: [],
            search: "",
            failedDeletion: "",
        }
    }
    componentDidMount(){
        this.source = axios.CancelToken.source();
        axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies", { cancelToken: this.source.token })
        .then((response) => {
            if (response.status===200) {
                this.setState({
                    movies: response.data
                })
            }
            else {
                return (
                    <p>Something went wrong on the server. Please press Movies again.</p>
                )
            }

        })
    }
    componentWillUnmount(){
        this.source.cancel();
    }
    handleSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    deleteMovie = (e) => {
        let id = e.target.id;
        this.source = axios.CancelToken.source();
        const movies = this.state.movies;
        axios.delete("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id, { cancelToken: this.source.token })
        .then(response =>{
            if (response.status === 204){
                const index = movies.findIndex(movie => movie.id === id);
                const newMovies = [...movies.slice(0, index), ...movies.slice(index + 1)];
                this.setState({
                    movies: newMovies
                })
            }
            else if (response.status === 404) {
                this.setState({
                    failedDeletion: "Couldn't delete the movie. It might be that someone else deleted it before you, please reload the page and try again."
                })
            }
        })
    } 
    setId = (e) => {
        this.setState({
            id: e.target.id
        })
    }
    render(){
        let filterMovies = this.state.movies.filter((movie) => {
            return movie.title.toLowerCase().includes(this.state.search.toLowerCase())
            ||
            movie.director.toLowerCase().includes(this.state.search.toLowerCase())
        })
        if (this.state.movies.length === 0) {
            return(
                <>
                    <p className="movieApp__errorMessage">No movies exists on the server. Add one!</p>
                </>
            )
        }
        else {
            return (
                <div className="movieApp_main">
                    <table className="movieApp__mainTable">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Director</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filterMovies.map(movie => {
                            return (
                                <tr key={movie.id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.rating}</td>
                                    <td>
                                    <Link className="movieApp__link" to={'/description/' + movie.id}>
                                    <button id={movie.id} className="movieApp_DetailsButton">Details</button>
                                    </Link>
                                    </td>
                                    <td>
                                    <Link className="movieApp__link" to={'/edit/'+ movie.id}>
                                    <button id={movie.id} className="movieApp_editButton">Edit</button>
                                    </Link>
                                    </td>
                                    <td>        
                                    <button id={movie.id}className="movieApp__deleteButton" onClick={this.deleteMovie}>X</button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <SearchField onChange={this.handleSearch}/>
                    <p>{this.state.failedDeletion}</p>
                </div>
            )
        }
    }
}

export default MovieTable;