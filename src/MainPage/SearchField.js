import React, { Component } from 'react';
import "./SearchField.css"

class SearchField extends Component {
    render(){
        return (
            <form>
                <input
                type="text"
                className="movieApp__searchField"
                onChange={this.props.onChange}
                />
                <p className="movieApp__searchButton">Search</p>
            </form>
        )
    }
}

export default SearchField;