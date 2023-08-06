import React, { Component } from 'react';
import './List.css';

class List extends Component {
    constructor() {
        super()
        this.state = {
            items: []
        }
      }

      componentDidMount() {
        fetch("http://localhost:8000/stocks").then((res) => {
            return res.json();
        }) 
        .then((json) => {
            this.setState({
                items: json.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
    };

    render() {
        console.log(this.state.items)
        return(
            <div></div>
        )
    }
}

export default List;
