import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';

//import App from 'App.js';

const fabric = window.fabric;

class Text extends React.Component {

    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    state = {
        text: new fabric.IText("", this.props),
        isShowButtons: false,
        stateText: "",
        stateColor: "black",
        stateFontFamily: "unset",
        stateNum: null,
    }

    static propTypes = {
        canvas: PropTypes.object,
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        fill: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        dirty: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        top: 0,
        left: 0,
        fill: "black",
        dirty: true,
    }

    componentDidMount() {
        //fabric.Object.prototype.objectCaching = true;

        this.setState({ stateText: this.props.text });

        //this.setState({ text:  });

        this.props.canvas.add(this.state.text);

        this.props.canvas.on('object:selected', (e) => {
            this.setState({ isShowButtons: true });
            console.log("bu:", this.state.isShowButtons);
        });

        this.props.canvas.on('selection:cleared', (e) => {
            this.setState({ isShowButtons: false });
            console.log("bu:", this.state.isShowButtons);

            //this.setState({ stateColor:  });
            console.log("Text: setState değişti! + ", this.state.stateColor, "=", e);
        });

        this.props.canvas.on('mouse:out', (e) => {           
            //this.props.canvas.renderAll();
        });

        console.log("this.setState:", this.state.stateText);

        //this.setState({ stateNum: this.props.canvas.setActiveObject(this.props.canvas.item(0)) });
    }

    componentDidUpdate() {
        this.state.text.text = this.state.stateText;
        this.state.text.fill = this.state.stateColor;
        this.state.text.fontFamily = this.state.stateFontFamily;
    }

    render() {
        return null;
    }
}

export default Text;