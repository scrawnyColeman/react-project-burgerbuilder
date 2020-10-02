import React, { Component } from "react";
import Button from "../../../components/UI/Button/component";
import classes from "./style.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/component";
import Input from "../../../components/UI/Input/component";
import data from "../../../constants/orderFormLayout";
import withErrorHandler from "../../../hoc/withErrorHandler/component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
      orderForm: data.orderForm,
      formIsValid: false
  }

  orderHandler = ( event ) => {
      event.preventDefault();

      const formData = {};
      for (let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }
      const order = {
          ingredients: this.props.ings,
          price: this.props.price,
          orderData: formData
      }

      this.props.onOrderBurger(order);
      
  }

  checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
          return true;
      }
      
      if (rules.required) {
          isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid
      }

      return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
          ...this.state.orderForm
      };
      const updatedFormElement = { 
          ...updatedOrderForm[inputIdentifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      
      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
          formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render () {
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
          formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
          });
      }
      let form = (
          <form onSubmit={this.orderHandler}>
              {formElementsArray.map(formElement => (
                  <Input 
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      invalid={!formElement.config.valid}
                      shouldValidate={formElement.config.validation}
                      touched={formElement.config.touched}
                      changed={(event) => this.inputChangedHandler(event, formElement.id)} />
              ))}
              <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
          </form>
      );
      if ( this.props.loading ) {
          form = <Spinner />;
      }
      return (
          <div className={classes.ContactData}>
              <h4>Enter your Contact Data</h4>
              {form}
          </div>
      );
  }
}

const mapStateToProps = state => {
  return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.order.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));