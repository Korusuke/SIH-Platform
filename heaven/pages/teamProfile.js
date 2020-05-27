import React from 'react';

export default class TeamProfile extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div>
                {this.props.team}
            </div>
        )
    }
} 