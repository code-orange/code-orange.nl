---
title: Werk
id: cases
layout: searchbot
---
<section id="cases">
	<header>
		<h1>{{ site.content.sections.cases.name }}</h1>
	</header>
	<section>
		<header>
			<h1>{{ site.content.sections.cases.showreel.title }}</h1>
		</header>
		{{ site.content.sections.cases.showreel.iframe }}
		<p>
			{{ site.content.sections.cases.showreel.description }}
		</p>
	</section>
{% for case in site.content.cases %}
	<section>
		<header>
			<h1>{{ case.name | capitalize }}</h1>
			<h2>{{ case.type | capitalize }}</h2>
			<img alt="cover" src="/assets/img/cases/{{ case.cover }}">
		</header>
		<p>{{ case.description }}</p>
{% for img in case.images %}
		<img src="/assets/img/cases/{{ img }}">
{% endfor %}
	</section>
{% endfor %}
</section>
<section id="clients">
	<section id="customers">
		<header>
			<h1>{{ site.content.sections.clients.customers }}</h1>
			<hr>
		</header>
{% for company in site.content.clients.customers %}
		<img class="company" alt="{{ company[0] }}" src="/assets/img/companies/customers/{{ company[0] }}.png"{% if company[1].url %} data-url="http://{{ company[1].url }}"{% endif %}>{% endfor %}
	</section>
	<section id="partners">
		<header>
			<h1>{{ site.content.sections.clients.partners }}</h1>
			<hr>
		</header>
{% for company in site.content.clients.partners %}
		<img class="company" alt="{{ company[0] }}" src="/assets/img/companies/partners/{{ company[0] }}.png"{% if company[1].url %} data-url="http://{{ company[1].url }}"{% endif %}>{% endfor %}
	</section>
</section>
