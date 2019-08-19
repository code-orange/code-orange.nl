(function () {
    if (!fetch) {
        return;
    }

    var stars = document.getElementsByClassName('stars');

    [].forEach.call(stars, function(star) {
        fetch('https://api.github.com/repos/' +star.dataset.repo).then(function (resp) {
            return resp.json();
        }).then(function (repo) {
            if (repo.stargazers_count > 0) {
                star.innerHTML = ' ' + repo.stargazers_count + '<img src="img/star.svg">';
            }
        });
    });
}())
