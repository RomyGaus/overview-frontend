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

  deleteItem = (id) => {
    fetch(`http://localhost:8000/stocks/${id}`, {
        method: "delete",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
    })
    .then((res) => {
        var updatedStateItems = this.state.items.filter(item => item.id !== id)
        this.setState({
            items: updatedStateItems
        })
    })
  }

  render() {
    return (
      <div className="list-container">
        <button className="btn btn-new">New</button>
        <div className="list-row list-header">
            <p>Name</p>
            <p className="num">Amount</p>
            <p className="num">Target</p>
            <p className="num">Updated</p>
        </div>
        {Object.entries(this.state.items).map(([key, value]) => (
          <div className="list-row" key={key}>
            <input className="name" type="text" name="" defaultValue={value.name}/>
            <div className="amount">
                <input type="number" name="" min="0" max="100" defaultValue={value.amount}/>
                <button className="btn arrow arrow-up">&#9650;</button>
                <button className="btn arrow arrow-down">&#9660;</button>
            </div>
            <div className="target">
                <input type="number" name="" min="0" max="100" defaultValue={value.target}/>
                <button className="btn arrow arrow-up">&#9650;</button>
                <button className="btn arrow arrow-down">&#9660;</button>
            </div>
            <p className="num">{this.formatDate(value.updated)}</p>
            <img className="btn btn-delete" src={require('./delete.png')} alt="delete-icon" onClick={() => this.deleteItem(value.id)}></img>
            {/* <button className="btn btn-delete" onClick={() => this.deleteItem(value.id)}>&#128465;</button> */}
          </div>
        ))}
      </div>
    );
  }
}

export default List;
