import React from 'react';
import ReactDOM from 'react-dom';

const ErrorPage = React.createClass({

	render: function() {

		const error = this.props.errorMessage ? 'Текст ошибки: ' + this.props.errorMessage : null;

		return (
			<div className="error">
					
				<div className="error__text text">
					
					<p>
						К сожалению, произошла непредвиденная ошибка :'/	
					</p>

					<p>
						Попробуйте перезагрузить страницу, если это не поможет - сообщите нам о проблеме.	
					</p>

					<p>
						{error}
					</p>

				</div>

			</div>
		);
	}

});

export default ErrorPage;
