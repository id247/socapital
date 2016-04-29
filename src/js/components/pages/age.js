import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';

import Slider from '../../components/slider';


const Age = React.createClass({

	_nextPage: function(e){
		e.preventDefault();

		emit(actions.SHOW_PAGE, 'quiz');
	},

	render: function() {

		return (
			<div className="question">

				<form action="#" onSubmit={this._nextPage}>
						
					<div className="question__title-placeholder question__title-placeholder--age">

						<h3 className="question__title">
							Привет! <br /> 
							Сколько тебе лет?
						</h3>

					</div>

					<div className="question__slider">

						<Slider 
							defaultValue={12} 
							min={12} 
							max={18}
							/>

					</div>

					<div className="question__button-placeholder">
						
						<button className="button button--pink button--m" onClick={this._nextPage}>
						Далее</button>

					</div>

				</form>				

			</div>
		);
	}

});

export default Age;
