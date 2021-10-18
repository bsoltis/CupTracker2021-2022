var currentCupHolder = { abbreviation: 'TBL', id: 2 }

window.addEventListener('load', function () {

    fetchTeamLogoSVGSymbols()

    var request = new XMLHttpRequest();
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var url = `https://nhl-score-api.herokuapp.com/api/scores?startDate=2021-10-12&endDate=${date}`
    request.open('GET', url, true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);

            for (let i = 0; i < data.length; i++) {

                let gamesOnDate = data[i];
                if (gamesOnDate.games.length > 0) {
                    for (let j = 0; j < gamesOnDate.games.length; j++) {
                        let game = gamesOnDate.games[j]

                        if (game.status.state == 'FINAL') {
                            if (game.teams.away.abbreviation == currentCupHolder.abbreviation || game.teams.home.abbreviation == currentCupHolder.abbreviation) {
                                var otherTeam = game.teams.away
                                var homeTeam = game.teams.home
                                var isCurrentCupHolderHome = currentCupHolder.abbreviation == homeTeam.abbreviation
                                if (!isCurrentCupHolderHome) {
                                    otherTeam = game.teams.home
                                }

                                if (game.scores[currentCupHolder.abbreviation] < game.scores[otherTeam.abbreviation]) {
                                    // cup switches
                                    currentCupHolder = otherTeam
                                    var team = players.find(findTeamInPlayers)
                                    team.points = team.points + 1
                                }
                            }
                        }
                    }
                }
            }
            document.getElementById('teamName').innerText = `${currentCupHolder.locationName} ${currentCupHolder.teamName}`
            document.getElementById('currentCupHolderImg').innerHTML = renderTeamLogo(currentCupHolder.id).outerHTML;
        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
    };

    request.send();
})

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../data/players.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

function findTeamInPlayers(player) {
    return player.teams.includes(currentCupHolder.abbreviation)
}

function fetchTeamLogoSVGSymbols() {
    // Adapted from https://css-tricks.com/ajaxing-svg-sprite/
    const ajax = new XMLHttpRequest();
    ajax.open(
        'GET',
        'https://www-league.nhlstatic.com/images/logos/team-sprites/20202021.svg',
        true
    );
    ajax.send();
    ajax.onload = () => {
        const div = document.createElement('div');
        div.style.display = 'none';
        div.innerHTML = ajax.responseText;
        document.body.insertBefore(div, document.body.childNodes[0]);
    };
}

function renderTeamLogo(teamId) {
    let span = document.createElement('span')
    span.className = 'team-logo'
    span.innerHTML = `<svg class="team-logo__image"><use href="#team-${teamId}-20202021-dark"></use></svg>`
    return span
}