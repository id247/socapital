import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';

import { shuffle } from '../../lib/helpers';

const Quiz = React.createClass({

	componentDidMount: function() {
		
	},

	_answer: function(e){
		e.preventDefault();

		let answer;

		[].forEach.call(e.target.elements.answer, (element) => {
			if (element.checked == true) {
				answer = element.value;
			}
		})

		emit(actions.QUIZ_NEXT_STEP, answer);
	},

	render: function() {

		const { questions, step } = this.props;

		return (

			<div className="question">

				<form action="#" onSubmit={this._answer}>
					
					<div className={('question__title-placeholder question__title-placeholder--' + step)}>

						<h3 className="question__title" 
							dangerouslySetInnerHTML={{__html: questions[step].question }}>
						</h3>

					</div>

					<ul className="question__list">

						{shuffle(questions[step].answers).map( (answer, index) => (
							<li className="question__item" key={(step + '-' + index)}>
					
								<label className="radio">
									<input 	type="radio" 
											name="answer"
											className="radio__input" 
											value={answer.id} 
											required 
											defaultChecked={Boolean(index === 0)} 
											//onChange={this._setAnswer}
											/>
									<span className="radio__text">
										{answer.text}
									</span>
								</label>
					
							</li> 
						))}
					
					</ul> 

					<div className="question__button-placeholder">
						
						<button type="submit" className="button button--pink button--m">Далее</button>

					</div>

				</form>

			</div>
		);
	}

});

export default Quiz;
