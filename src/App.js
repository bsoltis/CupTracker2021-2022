import React from 'react';
import './App.css';
import Players from './components/Players';
import TeamLogo from './components/TeamLogo';
import Leaders from './components/Leaders';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCupHolder: {
                abbreviation: "TBL"
            },
            players: [
                {
                    "name": "Brian",
                    "points": 0,
                    "teamsArray" : [
                        "BOS",
                        "CAR",
                        "NSH",
                        "CAL"
                    ],
                    "teams" : [
                        { "name" : "BOS", "points": 0 },
                        { "name" : "CAR", "points": 0 },
                        { "name" : "NSH", "points": 0 },
                        { "name" : "CAL", "points": 0 }
                    ]
                },
                {
                    "name": "Chris",
                    "points": 0,
                    "teamsArray" : [
                        "FLA",
                        "NJD",
                        "WPG",
                        "VAN"
                    ],
                    "teams" : [
                        { "name" : "FLA", "points": 0 },
                        { "name" : "NJD", "points": 0 },
                        { "name" : "WPG", "points": 0 },
                        { "name" : "VAN", "points": 0 }
                    ]
                },
                {
                    "name": "Kyle",
                    "points": 0,
                    "teamsArray" : [
                        "PIT",
                        "CHI",
                        "SEA",
                        "PHI"
                    ],
                    "teams" : [
                        { "name" : "PIT", "points": 0 },
                        { "name" : "CHI", "points": 0 },
                        { "name" : "SEA", "points": 0 },
                        { "name" : "PHI", "points": 0 }
                    ]
                },
                {
                    "name": "Nick",
                    "points": 0,
                    "teamsArray" : [
                        "VGK",
                        "MIN",
                        "BUF",
                        "ANA"
                    ],
                    "teams" : [
                        { "name" : "VGK", "points": 0 },
                        { "name" : "MIN", "points": 0 },
                        { "name" : "BUF", "points": 0 },
                        { "name" : "ANA", "points": 0 }
                    ]
                },
                {
                    "name": "Jack",
                    "points": 0,
                    "teamsArray" : [
                        "COL",
                        "WSH",
                        "STL",
                        "OTT"
                    ],
                    "teams" : [
                        { "name" : "COL", "points": 0 },
                        { "name" : "WSH", "points": 0 },
                        { "name" : "STL", "points": 0 },
                        { "name" : "OTT", "points": 0 }
                    ]
                },
                {
                    "name": "Tim",
                    "points": 0,
                    "teamsArray" : [
                        "NYI",
                        "TOR",
                        "DAL",
                        "LAK"
                    ],
                    "teams" : [
                        { "name" : "NYI", "points": 0 },
                        { "name" : "TOR", "points": 0 },
                        { "name" : "DAL", "points": 0 },
                        { "name" : "LAK", "points": 0 }
                    ]
                },
                {
                    "name": "Matt",
                    "points": 0,
                    "teamsArray" : [
                        "TBL",
                        "EDM",
                        "NYR",
                        "MTL"
                    ],
                    "teams" : [
                        { "name" : "TBL", "points": 0 },
                        { "name" : "EDM", "points": 0 },
                        { "name" : "NYR", "points": 0 },
                        { "name" : "MTL", "points": 0 }
                    ]
                } 
            ]
        }

        this.findTeamInPlayers = this.findTeamInPlayers.bind(this)
        this.addOneToPoints = this.addOneToPoints.bind(this)
        this.calculate = this.calculate.bind(this)
    }

    addOneToPoints(players, name) {
        for(var key in players){
            if(players[key].name == name){
                players[key].points = players[key].points + 1;
                for (var teamKey in players[key].teams) {
                    if (players[key].teams[teamKey].name === this.state.currentCupHolder.abbreviation) {
                        players[key].teams[teamKey].points = players[key].teams[teamKey].points + 1;
                    }
                }
            }
        }
        return players;
    }

    findTeamInPlayers(player) {
        return player.teamsArray.includes(this.state.currentCupHolder.abbreviation)
    }

    calculate(result) {
        for (let i = 0; i < result.length; i++) {

            let gamesOnDate = result[i];
            if (gamesOnDate.games.length > 0) {
                for (let j = 0; j < gamesOnDate.games.length; j++) {
                    let game = gamesOnDate.games[j]

                    if (game.status.state === 'FINAL') {
                        if (game.teams.away.abbreviation === this.state.currentCupHolder.abbreviation || game.teams.home.abbreviation === this.state.currentCupHolder.abbreviation) {
                            var otherTeam = game.teams.away
                            var homeTeam = game.teams.home
                            var isCurrentCupHolderHome = this.state.currentCupHolder.abbreviation === homeTeam.abbreviation
                            if (!isCurrentCupHolderHome) {
                                otherTeam = game.teams.home
                            }

                            if (game.scores[this.state.currentCupHolder.abbreviation] < game.scores[otherTeam.abbreviation]) {
                                // cup switches
                                this.setState({currentCupHolder: otherTeam})

                                var stateCopy = [...this.state.players];
                                var team = stateCopy.find(this.findTeamInPlayers)
                                if (team !== undefined) {
                                    this.addOneToPoints(stateCopy, team.name)
                                }

                                this.setState({ 
                                    players: stateCopy 
                                })
                            }
                            else
                            {
                                var stateCopy = [...this.state.players];
                                var team = stateCopy.find(this.findTeamInPlayers)
                                if (team !== undefined) {
                                    this.addOneToPoints(stateCopy, team.name)
                                }
                                
                                this.setState({ 
                                    players: stateCopy 
                                })
                            }
                        }
                    }
                }
            }
        }
    }

    componentDidMount() {
        var now = new Date();
        var daysOfYear = [];
        for (var d = new Date(2021, 9, 12); d <= now; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(new Date(d));
        }

        let promises = []

        for (let i = 0; i < daysOfYear.length; i = i + 15) {
            if ((i + 14) > daysOfYear.length) {
                let startDate = daysOfYear[i].getFullYear() + '-' + (daysOfYear[i].getMonth() + 1) + '-' + daysOfYear[i].getDate();
                let endDate = daysOfYear[daysOfYear.length - 1].getFullYear() + '-' + (daysOfYear[daysOfYear.length - 1].getMonth() + 1) + '-' + daysOfYear[daysOfYear.length - 1].getDate();
                let url = `https://nhl-score-api.herokuapp.com/api/scores?startDate=${startDate}&endDate=${endDate}`
                promises.push(fetch(url).then(res => res.json()))
            } else {
                let startDate = daysOfYear[i].getFullYear() + '-' + (daysOfYear[i].getMonth() + 1) + '-' + daysOfYear[i].getDate();
                let endDate = daysOfYear[i + 14].getFullYear() + '-' + (daysOfYear[i + 14].getMonth() + 1) + '-' + daysOfYear[i + 14].getDate();
                let url = `https://nhl-score-api.herokuapp.com/api/scores?startDate=${startDate}&endDate=${endDate}`
                promises.push(fetch(url).then(res => res.json()))
            }
        }
        
        let result = []
        Promise.all(promises).then(data => {
            data.forEach(element => {
                element.forEach(day => {
                    result.push(day)
                })
            })

            this.calculate(result)
        })
    }

    render() {
        return (
        <div className="App">
            <header className="App-header">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-md-5 mb-4">
                            <h3>Current Cup Holder</h3>
                            <h6 id="teamName">
                                {this.state.currentCupHolder.locationName + ' ' + this.state.currentCupHolder.teamName}
                            </h6>
                            <TeamLogo teamId={this.state.currentCupHolder.id} />
                        </div>
                        <div className="col-md-7">
                            <h3>Current Cup Leaders</h3>
                            <Leaders players={this.state.players} />
                        </div>
                        
                    </div>
                    <Players players={this.state.players} />

                    
                </div>
            </header>
        </div>
        )
    }
}

export default App;
