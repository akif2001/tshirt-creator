import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';

//import App from 'App.js';

const fabric = window.fabric;

class Text extends React.Component {

    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    state = {
        isShowButtons: false,
        stateText: "",
    }

    static propTypes = {
        canvas: PropTypes.object,
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        fill: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }

    static defaultProps = {
        top: 0,
        left: 0,
        fill: "black",
    }

    componentDidMount() {
        //this.setState({ stateText: this.props.text });

        const text = new fabric.IText(this.state.stateText, this.props);

        this.props.canvas.add(text);

        this.props.canvas.on('object:selected', (e) => {
            this.setState({ isShowButtons: true });
            console.log("bu:", this.state.isShowButtons);
        });

        this.props.canvas.on('selection:cleared', (e) => {
            this.setState({ isShowButtons: false });
            console.log("bu:", this.state.isShowButtons);
        });

        this.props.canvas.on('object:modified', (e) => {
            console.log("inş cal:", text);
        });

        //this.setState({ stateText: text });

        console.log("this.setState:", this.state.stateText);
    }

    render() {
        return null;
    }
}

export default Text;