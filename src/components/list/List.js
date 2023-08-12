import React, { Component } from "react";
import ItemRow from "./ItemRow";
import "./List.css";

class List extends Component {
  constructor(props) {
    super(props);
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

  newItem = () => {
    fetch("http://localhost:8000/stocks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "",
        amount: 0,
        target: 0,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        var updatedStateItems = this.state.items;
        updatedStateItems.push(json.data);
        this.setState({
          items: updatedStateItems,
        });
      });
  };

  deleteItem = (id) => {
    fetch(`http://localhost:8000/stocks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    }).then((res) => {
      var updatedStateItems = this.state.items.filter((item) => item.id !== id);
      this.setState({
        items: updatedStateItems,
      });
    });
  };

  render() {
    return (
      <div className="list-container">
        <div className="list-row list-header">
            <p>Name</p>
            <p className="num">Amount</p>
            <p className="num">Target</p>
            <p className="num">Updated</p>
        </div>
        {Object.entries(this.state.items).map(([key, value]) => (
          <ItemRow key = {key} value = {value} onDelete={this.deleteItem}></ItemRow>
        ))}
        <button className="btn btn-new" onClick={() => this.newItem()}>New</button>
      </div>
    );
  }
}

export default List;
