import React from 'react';
import PropTypes from 'prop-types';

const fabric = window.fabric;

class Circle extends React.Component {
    static propTypes = {
        canvas: PropTypes.object,
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        fill: PropTypes.number.isRequired,

    }

    static defaultProps = {
        top: 0,
        left: 0,
        radius: 5,
        fill: 'red',
    }

    state = {
        _clipboard: null,
    }

    handleChange() {
        //this.state.setState({ objectList: this.props.canvas.getObjects() });
    }

    componentDidMount() {
        const circle = new fabric.Circle(this.props);
        this.props.canvas.add(circle);

        this.props.canvas.getActiveObject().clone((cloned) => {
            this.state._clipboard = cloned;
        });

        this.state._clipboard.clone((clonedObj) => {
            this.props.canvas.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
            });
            if (clonedObj.type === 'activeSelection') {
                // active selection needs a reference to the canvas.
                clonedObj.canvas = this.props.canvas;
                clonedObj.forEachObject(function(obj) {
                    this.props.canvas.add(obj);
                });
                // this should solve the unselectability
                clonedObj.setCoords();
            } else {
                this.props.canvas.add(clonedObj);
            }
            this.state._clipboard.top += 10;
            this.state._clipboard.left += 10;
            this.props.canvas.setActiveObject(clonedObj);
            this.props.canvas.requestRenderAll();
        });
    }

    render() {
        return null;
    }
}

export default Circle;