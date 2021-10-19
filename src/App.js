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
                    "teams" : [
                        "BOS",
                        "CAR",
                        "NSH",
                        "CAL"
                    ]
                },
                {
                    "name": "Chris",
                    "points": 0,
                    "teams" : [
                        "FLA",
                        "NJD",
                        "WPG",
                        "VAN"
                    ]
                },
                {
                    "name": "Kyle",
                    "points": 0,
                    "teams" : [
                        "PIT",
                        "CHI",
                        "SEA",
                        "PHI"
                    ]
                },
                {
                    "name": "Nick",
                    "points": 0,
                    "teams" : [
                        "VGK",
                        "MIN",
                        "BUF",
                        "ANA"
                    ]
                },
                {
                    "name": "Jack",
                    "points": 0,
                    "teams" : [
                        "COL",
                        "WSH",
                        "STL",
                        "OTT"
                    ]
                },
                {
                    "name": "Tim",
                    "points": 0,
                    "teams" : [
                        "NYI",
                        "TOR",
                        "DAL",
                        "LAK"
                    ]
                },
                {
                    "name": "Matt",
                    "points": 0,
                    "teams" : [
                        "TBL",
                        "EDM",
                        "NYR",
                        "MTL"
                    ]
                } 
            ]
        }

        this.findTeamInPlayers = this.findTeamInPlayers.bind(this)
        this.addOneToPoints = this.addOneToPoints.bind(this)
    }

    addOneToPoints(players, name) {
        for(var key in players){
            if(players[key].name == name){
                players[key].points = players[key].points + 1;
            }
        }
        return players;
    }

    findTeamInPlayers(player) {
        return player.teams.includes(this.state.currentCupHolder.abbreviation)
    }

    componentDidMount() {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let url = `https://nhl-score-api.herokuapp.com/api/scores?startDate=2021-10-12&endDate=${date}`
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
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
                },
                (error) => {
                   
                }
            )
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
