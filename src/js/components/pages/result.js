import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';

const Result = React.createClass({

	componentWillMount: function() {
		
	},

	_gotoStart: function(e){
		e.preventDefault();
		emit(actions.SHOW_PAGE, 'quiz');
	},

	_share: function(e){
		e.preventDefault();
		
		emit(actions.PUBLIC_SHARE, e.target.href);
	},

	render: function() {

		let { result, server, groupLink } = this.props;

		return (
			<div className="answer">
					
				<div className="answer__title-placeholder">
					
					<h3 className="answer__title">
						{result.title} 
					</h3>

				</div>


				<div className="answer__content">

					<div className="answer__image-placeholder">
						
						<img src={(server === 'local' ? result.image : result.imageRemote)} alt="" className="answer__image" />

					</div>
					
					<div className="answer__text text"
						dangerouslySetInnerHTML={{__html: result.text }}>

					</div>

					<div className="answer__button-placeholder">
						
						<a href={groupLink} className="button button--pink button--m">Вернуться в группу</a>

					</div>

				</div>

			</div>
		);
	}

});

export default Result;
