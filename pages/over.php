---
title: Nubis
id: about
layout: searchbot
---
<section id="about">
	<header>
		<h1>{{ site.content.sections.about.name }}</h1>
		<hr>
	</header>
	
	<section id="about-text">
		<header>
			<h2>{{ site.content.info.intro }}</h2>
			<hr>
			<p>{{ site.content.info.tagline }}</p>
		</header>
		<h3>{{ site.content.sections.about.text.header }}</h2>
		<div id="intro-text">
			{{ site.content.sections.about.text.intro | markdownify }}
		</div>
		<hr>
	</section>
	
	<header>
		<h1>{{ site.content.sections.about.team.name }}</h1>
		<hr>
	</header>
	<section id="team-members">
		<ul>
{% for employee in site.content.team.team_photos %}
			<li><img src="/assets/img/team/{{ employee[0] }}.jpg"> <span class="name">{{ employee[1].name }}</span> <span class="title">{{ employee[1].title }}</span></li>
{% endfor %}
{% for employee in site.content.team.team_nophotos %}
			<li><span class="name">{{ employee[1].name }}</span> <span class="title">{{ employee[1].title }}</span></li>
{% endfor %}
		</ul>
	</section>
</section>
