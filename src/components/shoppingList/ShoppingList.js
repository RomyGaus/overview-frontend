import React, { Component } from "react";
import ShoppingItemRow from "./ShoppingItemRow";
import "./ShoppingList.css";

class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
        };
      }

    componentDidMount() {
        fetch("http://localhost:8000/shoppinglist")
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
        return(
            <div className="box">
                <div className="shopping-list-row shopping-list-header">
                    <p>Name</p>
                    <p>Quantity</p>
                </div>
                {Object.entries(this.state.items).map(([key, value]) => (
                    <ShoppingItemRow key={key} value={value}></ShoppingItemRow>
                ))}
            </div>
        )
    }
}

export default ShoppingList;
