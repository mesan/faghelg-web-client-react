import React, {Component} from "react";
import "./program.css";
import moment from "moment";

const StartTime = props =>
    <div className="startTime">{props.start}</div>;

const EndTime = props =>
    <div className="endTime">{props.end}</div>;

const Title = props =>
    <div className="title">{props.title}</div>;

const HostNames = props =>
    <div className="hostNames">{props.hostNames}</div>;

const EventImageUrl = props =>
    <div><img className="eventImageUrl" src={props.eventImageUrl} /></div>;

const Event = ({
    start,
    end,
    title,
    hostNames,
    eventImageUrl
}) =>
    <div className="eventContainer">
        <div className="eventImageContainer">
            <EventImageUrl eventImageUrl={eventImageUrl}/>
        </div>
        <div className="eventContentContainer">
            <div className="eventTitleContainer">
                <Title title={title} />
            </div>
            <div className="eventTimeContainer">
                <div className="startTimeContainer">
                    <StartTime start={moment.unix(start).format('LLL')}/>
                </div>
                <div className="endTimeContainer">
                    <EndTime end={moment.unix(end).format('LLL')}/>
                </div>
            </div>
            <div className="eventHostnameContainer">
                <HostNames hostNames={hostNames} />
            </div>
        </div>
    </div>;



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
        console.log(fetch('http://faghelg.herokuapp.com/program')
            .then(response => response.json())
            //.then(response => console.log(response.events))
            .then(response => this.setState({events:response.events}))
            .catch(err => console.error('Failed to get program at this time.', err)))
    }

    render() {
        moment.locale("nb");

        return (
            <div className="program">
                <h1>Program</h1>

                <button>3. november</button>
                <button>4. november</button>
                <button>5. november</button>
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
