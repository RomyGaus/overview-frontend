import React, { Component } from "react";
import "./List.css";

class List extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/stocks")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState({
          items: json.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="list-container">
        <div className="list-row list-header">
            <p>Name</p>
            <p>Amount</p>
            <p>Target</p>
            <p>Updated</p>
          </div>
        {Object.entries(this.state.items).map(([key, value]) => (
          <div className="list-row">
            <p>{value.name}</p>
            <p>{value.amount}</p>
            <p>{value.target}</p>
            <p>{value.updated}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default List;
