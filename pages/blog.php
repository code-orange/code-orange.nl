---
title: Blog
id: blog
layout: searchbot
---
<section id="blog">
	<header>
		<h1>{{ site.content.sections.blog.name }}</h1>
		<hr>
	</header>
{% for post in site.posts %}
	<article>
		<img class="cover" alt="Cover photo" src="/assets/blog/img/{{ post.cover }}">
		<h2>{{ post.title }}</h2>
		<p>{{ post.excerpt }}</p>
		<p>{{ post.secondp }}</p>
		<a>Wordt later vervolgd&hellip;</a>
{% comment %}					<a href="{{ post.url }}">Lees verder &raquo;</a>{% endcomment %}
	</article>
{% endfor %}
</section>
