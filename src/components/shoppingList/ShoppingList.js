import React, { Component } from "react";
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
                {Object.entries(this.state.items).map(([key, value]) => (
                    <p>{value.name}</p>
                ))}
            </div>
        )
    }
}

export default ShoppingList;
