import React, { Component } from 'react';
import './program.css';

const StartTime = props =>
    <div className="startTime">{props.start}</div>

const EndTime = props =>
    <div className="endTime">{props.end}</div>

const Title = props =>
    <div className="title">{props.title}</div>

const HostNames = props =>
    <div className="hostNames">{props.hostNames}</div>

const EventImageUrl = props =>
    <div><img className="eventImageUrl" src={props.eventImageUrl} /></div>

const Event = ({
    start,
    end,
    title,
    hostNames,
    eventImageUrl
}) =>
    <div className="eventContainer">
        <EventImageUrl eventImageUrl={eventImageUrl}></EventImageUrl>
        <Title title={title} />
        <StartTime start={start}/>
        <EndTime end={end}/>
        <HostNames hostNames={hostNames} />
    </div>

const Events = ({events}) =>
    <div>
        {events.map((event, index) => <Event key={index} {...event} />)}
    </div>;



class Program extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events : []
        };
    }

    componentDidMount() {
        fetch('http://faghelg.herokuapp.com/program')
            .then(response => response.json())
            .then(response =>
                // console.log(response.events)
                this.setState({events:response.events})
            )
            .catch(err => console.error('Failed to get program at this time.', err))
    }

    render() {
        return (
            <div className="program">
                <h1>Program</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <Events events={this.state.events} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default Program;
