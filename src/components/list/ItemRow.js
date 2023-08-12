import React, { Component } from "react";
import "./List.css";

class ItemRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: props.value.id,
        name: props.value.name,
        amount: props.value.amount,
        target: props.value.target,
        updated: props.value.updated
    };
  }

  formatDate = (epoch) => {
    const d = new Date(epoch);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();

    let newdate = year + "/" + month + "/" + day;
    let text = newdate.toString();
    return text;
  };

  validateNumber = (num) => {
    if(num !== undefined) {
        if(num > 100) {
            return 100
        } else if(num < 0) {
            return 0
        } else {
            return num
        }
    }
  }

  updateItem = (item) => {
    var validatedItem = item;
    validatedItem.amount = this.validateNumber(item.amount);
    validatedItem.target = this.validateNumber(item.target);

    fetch(`http://localhost:8000/stocks/${this.state.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedItem),
    })
      .then((response) => response.json())
      .then((json) => {
        let newState = validatedItem
        item.updated = json.data.updated
        this.setState(newState);
      });
  };

  render() {
    return (
      <div className="list-row" key={this.key}>
        <div>
          <input
            className="name"
            type="text"
            name=""
            defaultValue={this.state.name}
          />
          <button className="btn btn-edit">&#9998;</button>
          <button
            className="btn btn-save"
            onClick={() =>
              this.updateItem({ name: this.state.name })
            }
          >
            &#x2713;
          </button>
        </div>
        <div className="amount">
          <input
            type="number"
            name=""
            min="0"
            max="100"
            value={this.state.amount}
            readOnly
          />
          <button
            className="btn arrow arrow-up"
            onClick={() =>
              this.updateItem({
                amount: this.state.amount + 1
              })
            }
          >
            &#9650;
          </button>
          <button
            className="btn arrow arrow-down"
            onClick={() =>
              this.updateItem({
                amount: this.state.amount - 1
              })
            }
          >
            &#9660;
          </button>
        </div>
        <div className="target">
          <input
            type="number"
            name=""
            min="0"
            max="100"
            value={this.state.target}
            readOnly
          />
          <button
            className="btn arrow arrow-up"
            onClick={() =>
              this.updateItem({
                target: this.state.target + 1
              })
            }
          >
            &#9650;
          </button>
          <button
            className="btn arrow arrow-down"
            onClick={() =>
              this.updateItem({
                target: this.state.target - 1
              })
            }
          >
            &#9660;
          </button>
        </div>
        <p className="num">{this.formatDate(this.state.updated)}</p>
        <img
          className="btn btn-delete"
          src={require("./delete.png")}
          alt="delete-icon"
          onClick={() => this.props.onDelete(this.state.id)}
        ></img>
      </div>
    );
  }
}

export default ItemRow;
