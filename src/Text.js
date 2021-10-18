import React, { useState } from 'react';
import PropTypes from 'prop-types';

const fabric = window.fabric;

class Text extends React.Component {

    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    state = {
        isShowButtons: false,
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
        const text = new fabric.IText(this.props.text, this.props);

        text.set("text", this.props.text);
        this.props.canvas.renderAll();

        this.props.canvas.add(text);

        this.props.canvas.on('object:selected', (e) => {
            this.setState({ isShowButtons: true });
            console.log("bu:", this.state.isShowButtons);
        });

        this.props.canvas.on('selection:cleared', (e) => {
            this.setState({ isShowButtons: false });
            console.log("bu:", this.state.isShowButtons);
        });
    }

    render() {
        return null;
    }
}

export default Text;