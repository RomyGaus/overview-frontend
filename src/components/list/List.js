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

  formatDate = (epoch) => {
    const d = new Date(epoch);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();

    let newdate = year + "/" + month + "/" + day;
    let text = newdate.toString();
    return text;
  }

  render() {
    return (
      <div className="list-container">
        <button>New</button>
        <div className="list-row list-header">
            <p>Name</p>
            <p className="num">Amount</p>
            <p className="num">Target</p>
            <p className="num">Updated</p>
        </div>
        {Object.entries(this.state.items).map(([key, value]) => (
          <div className="list-row">
            <p>{value.name}</p>
            <div className="amount">
                <p className="arrow">&#129168;</p>
                <input type="number" name="" min="0" max="100" defaultValue={value.amount}/>
            </div>
            <p className="num">{value.target}</p>
            <p className="num">{this.formatDate(value.updated)}</p>
            <button className="btn">Delete</button>
          </div>
        ))}
      </div>
    );
  }
}

export default List;
