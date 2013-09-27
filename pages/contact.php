---
title: Contact
id: contact
layout: searchbot
---
<footer id="footer">
	<aside>
		<h1>{{ site.content.sections.footer.location }}</h1>
		<address>
			<p>{{ site.content.info.address.street }} {{ site.content.info.address.number }}</p>
			<p>{{ site.content.info.address.zip }} {{ site.content.info.address.city }}</p>
		</address>
	</aside>
	<aside>
		<h1>{{ site.content.sections.footer.contact }}</h1>
		<address>
			<p>T {{ site.content.info.contact.phone }}</p>
			<p>{{ site.content.info.contact.email }}</p>
		</address>
	</aside>
	<aside>
		<h1>{{ site.content.sections.footer.follow }}</h1>
		<a href="https://plus.google.com/{{ site.content.info.social.gplus }}" rel="publisher"><img src="/assets/img/social-gplus.png"></img></a>
		<a href="https://twitter.com/{{ site.content.info.social.twitter }}" target="_new"><img src="/assets/img/social-twitter.png"></img></a>
		<a href="https://facebook.com/{{ site.content.info.social.facebook }}" target="_new"><img src="/assets/img/social-fb.png"></img></a>
	</aside>
</footer>
