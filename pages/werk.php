---
title: Werk
id: cases
layout: searchbot
---
<section id="cases">
	<header>
		<h1>{{ site.content.sections.cases.name }}</h1>
		<hr>
	</header>
	<div id="case-zoom">
		<div id="case-media">
			{{ site.content.sections.cases.showreel.iframe }}
		</div>
		<div id="case-description">
			<header>
				<h1>{{ site.content.sections.cases.showreel.title }}</h1>
				<hr>
			</header>
			<p>
				{{ site.content.sections.cases.showreel.description }}
			</p>
		</div>
	</div>
	{% comment %} TODO: Move cases from JSON to YAML {% endcomment %}
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
