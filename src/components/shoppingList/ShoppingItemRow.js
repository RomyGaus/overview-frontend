import React, { Component } from "react";
import "./ShoppingList.css";

class ShoppingItemRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.value.id,
      name: props.value.name ?? "",
      amount: props.value.amount ?? 0,
      target: props.value.target ?? 0,
      checked: false,
    };
  }

  updateItem = (item) => {
    fetch(`http://localhost:8000/stocks/${this.state.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
  };

    onCheckItem = () => {
        this.updateItem({ amount: this.state.target });
        this.setState({
            checked: true,
        });
    }

    onUncheckItem = () => {
        this.updateItem({ amount: this.state.amount });
        this.setState({
            checked: false,
        });
    }

  render() {
    return (
      <div className="shopping-list-row" key={this.key}>
        <p>{this.state.name}</p>
        <p className="quantity">{this.state.target -  this.state.amount}</p>
        <div className="checked">
            {this.state.checked === false
                ? <button className="btn-unchecked" onClick={this.onCheckItem}></button>
                : <button className="btn-checked" onClick={this.onUncheckItem}>&#x2713;</button>
            }
        </div>
      </div>
    );
  }
}

export default ShoppingItemRow;
