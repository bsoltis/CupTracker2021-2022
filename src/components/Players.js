import React, { Component } from 'react'

const teams = {
     'PIT':'Pittsburgh Penguins',
     'TBL':'Tampa Bay Lightning',
     'VGK':'Vegas Golden Knights',
     'MTL':'Montreal Canadiens',
     'TOR':'Toronto Maple Leafs',
     'BOS':'Boston Bruins',
     'CAR':'Carolina Hurricanes',
     'NSH':'Nashville Predators',
     'CAL':'Calgary Flames',
     'FLA':'Florida Panthers',
     'NJD':'New Jersey Devils',
     'WPG':'Winnipeg Jets',
     'VAN':'Vancouver Canucks',
     'SEA':'Seattle Kraken',
     'CHI':'Chicago Blackhawks',
     'PHI':'Philadelphia Flyers',
     'MIN':'Minnesota Wild',
     'BUF':'Buffalo Sabres',
     'ANA':'Anaheim Ducks',
     'COL':'Colorado Avalanche',
     'WSH':'Washington Capitals',
     'STL':'St. Louis Blues',
     'OTT':'Ottawa Senators',
     'NYI':'New York Islanders',
     'DAL':'Dallas Stars',
     'LAK':'LA Kings',
     'EDM':'Edmonton Oilers',
     'NYR':'New York Rangers'
};

export default class Players extends Component {


    render() {
        let players = this.props.players

        return (
            <div className="row justify-content-center mt-4">
                {players.map(player => (
                    <div className="col-4 text-center mt-2">
                        <h3>{player.name}</h3>
                        <ul className="list-group list-group-flush">
                        {player.teams.map(team => (
                            <li className="list-group-item list-group-item-dark">{teams[team]}</li>
                        ))}
                        </ul>
                    </div>
                ))}
            </div>
        )
    }
}
