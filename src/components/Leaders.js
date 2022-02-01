import React, { Component } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

export default class Leaders extends Component {
    render() {
        let players = this.props.players

        players = players.sort((a, b) => (a.points < b.points) ? 1 : -1)

        return (
            <div>
                <h6>1st place</h6>
                <ProgressBar now={players[0].points} label={`${players[0].points} - ${players[0].name}`} max={10} />
                <h6>2nd place</h6>
                <ProgressBar now={players[1].points} label={`${players[1].points} - ${players[1].name}`} max={10} />
                <h6>3rd place</h6>
                <ProgressBar now={players[2].points} label={`${players[2].points} - ${players[2].name}`} max={10} />
            </div>
        )
    }
}
