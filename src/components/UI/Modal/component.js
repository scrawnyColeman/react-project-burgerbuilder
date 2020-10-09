import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/component";
import classes from "./style.module.css";

const Modal = ({show, modalClosed, children}) => {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    return (
        <Auxiliary>
            <Backdrop show={show} clicked={modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: show
                        ? "translateY(0)"
                        : "translateY(-100vh)",
                    opacity: show ? "1" : "0",
                }}
            >
                {children}
            </div>
        </Auxiliary>
    );
};

export default React.memo(Modal, (prevProps, nextProps) => {
    return (
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
    );
});
