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

  newItem = () => {
    fetch("http://localhost:8000/stocks/", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "",
            amount: 0,
            target: 0
        })
    })
    .then(response => response.json())
    .then((json) => {
        var updatedStateItems = this.state.items
        updatedStateItems.push(json.data)
        this.setState({
            items: updatedStateItems
        })
    })
  }

  updateItem = (item) => {
    var updatedItem = this.state.items.find((element) => element.id === item.id);
    Object.keys(updatedItem).forEach(key => {
        if(item[key] !== undefined) {
            updatedItem[key] = item[key]
        }
    })
    fetch(`http://localhost:8000/stocks/${item.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
    })
    .then(response => response.json())
    .then((json) => {
        var updatedStateItems = this.state.items
        var index = updatedStateItems.findIndex((element) => element.id === item.id);

        if (index >= 0) {
            updatedStateItems[index] = updatedItem;
        }
        this.setState({
            items: updatedStateItems
        })
    })
  }

  deleteItem = (id) => {
    fetch(`http://localhost:8000/stocks/${id}`, {
        method: "DELETE",
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
        <div className="list-row list-header">
            <p>Name</p>
            <p className="num">Amount</p>
            <p className="num">Target</p>
            <p className="num">Updated</p>
        </div>
        {Object.entries(this.state.items).map(([key, value]) => (
          <div className="list-row" key={key}>
            <div>
                <input className="name" type="text" name="" defaultValue={value.name}/>
                <button className="btn btn-edit">&#9998;</button>
                <button className="btn btn-save" onClick={() => this.updateItem({id: value.id, name: value.name})}>&#x2713;</button>
            </div>
            <div className="amount">
                <input type="number" name="" min="0" max="100" defaultValue={value.amount}/>
                <button className="btn arrow arrow-up" onClick={() => this.updateItem({id: value.id, amount: value.amount + 1})}>&#9650;</button>
                <button className="btn arrow arrow-down" onClick={() => this.updateItem({id: value.id, amount: value.amount - 1})}>&#9660;</button>
            </div>
            <div className="target">
                <input type="number" name="" min="0" max="100" defaultValue={value.target}/>
                <button className="btn arrow arrow-up" onClick={() => this.updateItem({id: value.id, target: value.target + 1})}>&#9650;</button>
                <button className="btn arrow arrow-down" onClick={() => this.updateItem({id: value.id, target: value.target - 1})}>&#9660;</button>
            </div>
            <p className="num">{this.formatDate(value.updated)}</p>
            <img className="btn btn-delete" src={require('./delete.png')} alt="delete-icon" onClick={() => this.deleteItem(value.id)}></img>
          </div>
        ))}
        <button className="btn btn-new" onClick={() => this.newItem()}>New</button>
      </div>
    );
  }
}

export default List;
