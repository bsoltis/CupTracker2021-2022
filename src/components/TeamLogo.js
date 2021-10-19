import React, { Component } from 'react'

export default class TeamLogo extends Component {
    render() {
        let href = `#team-${this.props.teamId}-20202021-dark`
        
        return (
            <div id="currentCupHolderImg">
                <span className="team-logo">
                    <svg className="team-logo__image">
                        <use href={href}>

                        </use>
                    </svg>
                </span>
            </div>
        )
    }
}
