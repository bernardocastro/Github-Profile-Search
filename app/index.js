$(document).ready(function () {
    $('.menu-input-js').keypress(function (event) {
        if (event.keyCode === 13) {
            searchUser(event.currentTarget.value);
        }
    });

    function searchUser(user) {
        const url = `https://api.github.com/users/${user}`;
        $.ajax({
            url: url,
            type: 'GET'
        }).done(response => {
            insertData(response);
        });
    }

    function insertData(response) {
        $('.user-name-js').text(response.name)
        $('.user-nickname-js').text(response.login)
        $('.user-img-js').attr("src", response.avatar_url)

        getUserRepos(response.repos_url);
    }

    function getUserRepos(reposUrl) {
        $.ajax({
            url: reposUrl,
            type: 'GET'
        }).done(function (response) {
            insertRepos(response);
        });
    }

    function insertRepos(repos) {
        const list = $('.repositories-list-js');
        list.empty();
        let listItens = '';

        for (let i = 0; i <= 5; i++) {
            if (repos[i]) {
                const repoName = repos[i].name;
                const repoDescription = repos[i].description;

                listItens += `<li><div class="repository"><span class="repository-name">${repoName}</span><span class="repository-description">${repoDescription}</span></div></li>`;
            }
        }

        list.append(listItens);
    }
})