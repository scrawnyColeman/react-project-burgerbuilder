import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/component";
import { Route, Redirect } from "react-router";
import ContactData from "./ContactData/component";
import { connect } from "react-redux";

const Checkout = ({history, ings, purchased, match})=> {

  const checkoutCancelledHandler = () => {
      history.goBack();
  }

  const checkoutContinuedHandler = () => {
      history.replace( '/checkout/contact-data' );
  }


      let summary = <Redirect to="/" />
      if ( ings ) {
          const purchasedRedirect = purchased ? <Redirect to="/"/> : null;
          summary = (
              <div>
                  {purchasedRedirect}
                  <CheckoutSummary
                      ingredients={ings}
                      checkoutCancelled={checkoutCancelledHandler}
                      checkoutContinued={checkoutContinuedHandler} />
                  <Route
                      path={match.path + '/contact-data'}
                      component={ContactData} />
              </div>
          );

      return summary;
  }
}

const mapStateToProps = state => {
  return {
      ings: state.burgerBuilder.ingredients,
      purchased: state.order.purchased
  }
};

export default connect( mapStateToProps )( Checkout );