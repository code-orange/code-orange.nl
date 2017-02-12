(function (scope) {
	'use strict';

	var send = function (event) {
		var formData, request, form, sendbutton;

		event.preventDefault();

		form = document.getElementById("contact-form");
		sendbutton = document.getElementById('send-button');

		formData = new FormData(form);
		request = new XMLHttpRequest();
		request.open(form.method, form.action, true);
		request.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				form.reset();
				sendbutton.innerText = 'Message sent, thank you!';
			}
		};
		request.send(formData);
		sendbutton.innerText = 'Sending...';

		return false;
	};

	scope.sendContact = send;
}(this));
