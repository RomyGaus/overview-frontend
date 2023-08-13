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
        updated: props.value.updated,
        editingName: null
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

  editName = () => {
    this.setState({
        editingName: this.state.name
    })
  }

  submitName = () => {
    this.updateItem({ name: this.state.editingName })
    this.setState({
        editingName: null
    })
  }

  updateEditingName = (value) => {
    this.setState({
        editingName: value
    })
  }

  render() {
    return (
      <div className="list-row" key={this.key}>
        <div className="item-name">
          <input
            className="name"
            type="text"
            name=""
            defaultValue={this.state.name}
            disabled={this.state.editingName === null}
            onChange={e => this.updateEditingName(e.target.value)}
          />
          { this.state.editingName === null
            ? <button className="btn btn-edit" onClick={this.editName}>&#9998;</button>
            : <button
            className="btn btn-save"
            onClick={this.submitName}
            >
            &#x2713;
          </button>
          }
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
          <div>
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
          <div>
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
