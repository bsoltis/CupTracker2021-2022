window.addEventListener('load', function () {
    var currentCupHolder = 'TBL'
    var request = new XMLHttpRequest();
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var url = `https://nhl-score-api.herokuapp.com/api/scores?startDate=2021-10-12&endDate=${date}`
    request.open('GET', url, true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);

            for(let i = 0 ; i < data.length; i++) {
    
                let gamesOnDate = data[i];
                if (gamesOnDate.games.length > 0) {
                    for(let j = 0; j < gamesOnDate.games.length; j++) {
                        let game = gamesOnDate.games[j]

                        if (game.status.state == 'FINAL') {
                            if (game.teams.away.abbreviation == currentCupHolder || game.teams.home.abbreviation == currentCupHolder) {
                                var otherTeam = game.teams.away.abbreviation
                                var homeTeam = game.teams.home.abbreviation
                                var isCurrentCupHolderHome = currentCupHolder == homeTeam
                                if (!isCurrentCupHolderHome) {
                                    otherTeam = game.teams.home.abbreviation
                                }

                                if (game.scores[currentCupHolder] < game.scores[otherTeam]) {
                                    currentCupHolder = otherTeam
                                }
                            }
                        }
                    }
                }
            }

            document.getElementById('currentCupHolder').innerHTML = `Current Cup Holder: ${currentCupHolder}`;
        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
    };

    request.send();
})