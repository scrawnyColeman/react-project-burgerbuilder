import React, { Component } from "react";
import data from "../../constants/orderFormLayout";
import Input from "../../components/UI/Input/component";
import Button from "../../components/UI/Button/component";
import classes from "./style.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/component";
import { Redirect } from "react-router";

class Auth extends Component {
    state = {
        controls: data.controls,
        isSignUp: true,
    };

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true,
            },
        };
        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        const { controls, isSignUp } = this.state;
        const { email, password } = controls;
        const { onAuth } = this.props;

        event.preventDefault();
        onAuth(email.value, password.value, isSignUp);
    };

    switchAuthModeHandler = () => {
        const { isSignUp } = this.state;
        this.setState({ isSignUp: !isSignUp });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }
        let form = formElementsArray.map((el) => (
            <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(event) => this.inputChangedHandler(event, el.id)}
            />
        ));
        if (this.props.loading) form = <Spinner />;
        let errorMessage = null;
        if (this.props.error) errorMessage = <p>{this.props.error.message}</p>;
        let authRedirect = null;
        if (this.props.isAuthenticated) authRedirect = <Redirect to={this.props.authRedirectPath} />;
        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    {this.state.isSignUp ? "Already have " : "Need "} an
                    account?
                </Button>
                {errorMessage}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
        };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
