import React from 'react';
import ReactDOM from 'react-dom';

const Loading = React.createClass({

	render: function() {
		return (
			<div className="app__loader loader" style={{ display: (this.props.show ? 'block' : 'none')}}>
			
				<div className="loader__figure"></div>

			</div>
		);
	}

});

export default Loading;
