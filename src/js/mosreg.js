'use strict'

import app from './app';

const appSettings = {
	server: 'school.mosreg.ru',
	groupLink: 'https://groups.school.mosreg.ru/group.aspx?group=318754',
	quizSettings: 'https://ad.csdnevnik.ru/special/staging/venus/settings/settings.js',
	develop: false,
}


document.addEventListener('DOMContentLoaded', function() {

	app(appSettings);

});  

