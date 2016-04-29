import React from 'react';
import ReactDOM from 'react-dom';

import ReactSlider from 'react-slider';

const Slider = React.createClass({

	getInitialState: function () {
		return { value: this.props.defaultValue }
	},

	_onChange: function(value) {
		this.setState({ value: value });
	},

	render() {
		return (
			<ReactSlider 
				defaultValue={this.props.defaultValue} 
				pearling={true} 
				min={this.props.min} 
				max={this.props.max}
				className="slider"
				onChange={this._onChange}
				>
				<div className="slider__handle">{this.state.value}</div>
			</ReactSlider>
		);
	}
});


export default Slider;
