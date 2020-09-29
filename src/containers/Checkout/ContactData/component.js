import React, { Component } from "react";
import Button from "../../../components/UI/Button/component";
import classes from "./style.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/component";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postcode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Thomas Hutchinson",
        address: {
          street: "Teststreet1",
          zipCode: "123432",
          country: "UK"
        },
        email: "test@test.com"
      },
      deliveryMethod: "premium"
    };
    axios
      .post("/orders.json", order)
      .then(resp => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="your street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postcode"
          placeholder="your post code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data:</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
