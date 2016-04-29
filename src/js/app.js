'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { emit } from './lib/dispatcher';
import actions from './lib/actions';
import { getState, addChangeListener } from './stores/store';

//pages
import Loading from './components/pages/loading';
import ErrorPage from './components/pages/error';
import Quiz from './components/pages/quiz';
import Result from './components/pages/result';
import Age from './components/pages/age';

const app = (settings) => {

	const App = React.createClass({
		getInitialState() {

			return getState();
		},
		componentWillMount() {

			addChangeListener(this._update);	

			emit(actions.SET_SETTINGS, this.props.settings);

		},
		componentDidMount() {
					
		},
		_update() {

			this.setState(getState());
		},
		render() {

			console.log('RENDER');

			let page;

			switch(this.state.page){
				case 'age': page = <Age 	
										/>; 
					break;

				case 'quiz': page = <Quiz 	questions={this.state.questions[this.state.sex]} 
											step={this.state.quiz.step} 
											/>; 
					break;

				case 'result': page = <Result 	result={this.state.result}
												server={this.state.settings.server}
												groupLink={this.state.settings.groupLink}
												/>; 
					break;

				case 'error': page = <ErrorPage errorMessage={this.state.errorMessage} />; 
					break;

				default: page = <ErrorPage errorMessage={this.state.errorMessage} />;
			}

			return (
				<div>					
					<Loading show={this.state.loading} />
					<div className="app__pages">
						<div className="app__page">
							{page}
						</div>
					</div>
				</div>
			)
		}
	});

	ReactDOM.render(
		<App 	settings={settings} 
		/>, 
		document.getElementById('app')
	);

};

export default app;
