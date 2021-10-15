import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react/cjs/react.development';

const fabric = window.fabric;

class Text extends React.Component {
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
    }

    render() {
        return null;
    }
}

export default Text;