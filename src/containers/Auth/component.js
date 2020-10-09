import React, { useEffect, useState } from "react";
import data from "../../constants/orderFormLayout";
import Input from "../../components/UI/Input/component";
import Button from "../../components/UI/Button/component";
import classes from "./style.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/component";
import { Redirect } from "react-router";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = ({
    buildingBurger,
    authRedirectPath,
    onSetAuthRedirectPath,
    onAuth,
    loading,
    error,
    isAuthenticated,
}) => {
    
    const [controls, setControls] = useState(data.controls);
    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== "/") {
            onSetAuthRedirectPath();
        }
    }, [authRedirectPath, buildingBurger, onSetAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    controls[controlName].validation
                ),
                touched: true,
            }),
        });
        setControls(updatedControls);
    };
    const submitHandler = (event) => {
        const { email, password } = controls;
        event.preventDefault();
        onAuth(email.value, password.value, isSignUp);
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
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
            changed={(event) => inputChangedHandler(event, el.id)}
        />
    ));
    if (loading) form = <Spinner />;
    let errorMessage = null;
    if (error) errorMessage = <p>{error.message}</p>;
    let authRedirect = null;
    if (isAuthenticated) authRedirect = <Redirect to={authRedirectPath} />;
    return (
        <div className={classes.Auth}>
            {authRedirect}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>
                {isSignUp ? "Already have " : "Need "} an account?
            </Button>
            {errorMessage}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
