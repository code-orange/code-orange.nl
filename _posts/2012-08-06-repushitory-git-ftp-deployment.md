---
layout: post
title: Git, GitHub en nu Repushitory - Git FTP deployment, maar dan simpel
date: 2012-08-06 08:21
comments: true
categories: []
---
Bij Nubis zijn we altijd op zoek naar nieuwe en betere manieren om ons hele proces zo gestroomlijnd en stabiel te maken als het maar kan. Een belangrijk deel daar van is zorgen dat we altijd backups beschikbaar hebben om direct terug te plaatsen, mocht er iets kapot gaan. Daarom gebruiken wij <a href="http://git-scm.org" target="_blank">git</a> in combinatie met <a href="http://github.com" target="_blank">GitHub</a>. Kort door de bocht: git is een set programma's die er voor zorgen dat we nooit ook maar één regel code kwijt kunnen raken, en GitHub is een host die er voor zorgt dat die code ook nog ergens anders is opgeslagen (bovendien heeft GitHub nog veel meer tools die het voor ons aantrekkelijk maakt, zoals bijvoorbeeld het versimpelen van code review).

Deze combinatie is ijzersterk en zorgt er voor dat ontwikkelen in teams veel betrouwbaarder wordt (omdat twee ontwikkelaars niet per ongeluk over elkaars werk heen kunnen opslaan) maar er ontbreekt wel iets aan: als de ontwikkelde software stabiel is moeten de ontwikkelaars die nog handmatig uploaden naar de productie server, de server vanaf waar de software (bijvoorbeeld een Facebook app) kan worden gebruikt. Die stap staat los van het versiebeheersysteem, en kunnen we dus niet automatisch terugdraaien.

En dat is waar <a href="https://github.com/nubisonline/repushitory" target="_blank">Repushitory</a> in dit verhaal past. Repushitory is een Git FTP deployment systeem ontwikkeld door Nubis. Git FTP deployment houdt in dat een project dat met git wordt gemanaged over FTP op een productie server wordt gezet. Simpelweg werkt het programma door constant te wachten op een teken van GitHub. Als een project is geupdate krijgt het dit teken. Dan checkt Repushitory of er iets moet gebeuren voor dit project en zo ja, zoekt het op op welke webserver het project moet komen te staan. Vervolgens laadt het de FTP gegevens van die server, downloadt de laatste versie van het project en uiteindelijk uploadt het alle bestanden naar de webserver.

Repushitory is geschreven in Ruby en is open-source software. Dat betekent dat iedereen de broncode van de software mag bekijken om er van te leren. Voor persoonlijke toepassingen mag Repushitory gewoon gebruikt worden (maar we zouden het leuk vinden als je een comment achterliet bij deze post!). Mocht je Repushitory voor commerciële doeleinden willen gebruiken, dan kun je contact met ons opnemen op opensource\[at\]nubisonline.nl. Je kunt <a href="https://github.com/nubisonline/repushitory" target="_blank">de broncode van Repushitory</a> vinden op GitHub.

Op projecten voor onze klanten werken we altijd met twee <em>branches </em>in git. Dat zijn als het ware twee versies van dezelfde app: één stabiele, en één waar we aan werken. Dan stellen we Repushitory zo in dat de stabiele branch gelinked is aan de Facebook pagina van de klant en dat de ontwikkelings branch aan een test pagina van ons gekoppeld is. Als de klant tevreden is met de test versie geven we GitHub het signaal dat al ons werk van de ontwikkelingsbranch verplaatst kan worden naar de stabiele branch. GitHub geeft dit door aan Repushitory en die pusht onze code weer door naar de fanpage van de klant. Mocht de klant dan toch nog niet tevreden zijn met deze stabiele versie, of mocht er iets mis zijn, kunnen we met één opdracht GitHub de stabiele branch terug laten draaien. Repushitory krijgt dit weer door en binnen enkele seconden is de fanpage weer terug in de oude staat.

Kortom, projecten die Nubis ontwikkelt zijn altijd stabiel en komen met een dubbele backup.

&nbsp;
