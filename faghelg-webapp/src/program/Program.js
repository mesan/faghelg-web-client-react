import React, {Component} from "react";
import "./program.css";
import moment from "moment";

const StartTime = props =>
    <div className="time"><ul><li>Fra:</li><li>{props.start}</li></ul></div>;

const EndTime = props =>
    <div className="time"><ul><li>Til:</li><li>{props.end}</li></ul></div>;

const Duration = props =>
    <div className="time"><ul><li>Varighet:</li><li>ca {props.duration.humanize(false)}</li></ul></div>;

const Title = props =>
    <div className="title">{props.title}</div>;

const HostNames = props =>
    <div className="hostNames">Fordragsholdere: {props.hostNames}</div>;

const EventImageUrl = props =>
    <div><img className="eventImageUrl" alt={props.eventImageUrl} src={props.eventImageUrl} /></div>;

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
                <StartTime start={moment.unix(start).format('dddd [kl:] HH:mm')}/>
                <EndTime end={moment.unix(end).format('dddd [kl:] HH:mm')}/>
                <Duration duration={moment.duration(end-start,"seconds")}/>
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
            events : {},
            dates: [],
            activeDate: 'torsdag 04',
            neverCalled: "true",
            distinctDays: [],
        };
    }


    componentDidMount() {
        fetch('http://faghelg.herokuapp.com/program')
            .then(response => response.json())
            .then(response => this.setState({
                events: this.mapEventsToDistinctDay(response.events),
                distinctDays: this.getDistinctDays(response.events)}
                ))
            .catch(err => console.error('Failed to get program at this time.', err))
    }

    getDistinctDays(events) {
        let distinctDays = [];

        events.map((event => {
            if (distinctDays.indexOf(moment.unix(event.start).format('dddd DD')) === -1) {
                distinctDays.push(moment.unix(event.start).format('dddd DD'));
            }
            return event;
        }));

        return distinctDays;
    }


    mapEventsToDistinctDay(events) {
        let eventsByDay = {};

        events.map((event) => {
            let tmpDay = eventsByDay[moment.unix(event.start).format('dddd DD')];
            if (tmpDay === undefined) {
                tmpDay = [];
            }
            tmpDay.push(event);

            eventsByDay[moment.unix(event.start).format('dddd DD')] = tmpDay;
            return event;
        });

        return eventsByDay;
    }



    filterEventsForEachDay(day) {
        this.setState({activeDate: day});
    }

    render() {
        moment.locale("nb");
        return (
            <div className="program">
                <h1 className="pageHeader">Program</h1>
                <div className="dayFilterButtons">
                    {this.state.distinctDays.map((day) =>
                        <button
                            key={day}
                            className="dayFilterButton"
                            onClick={() => this.filterEventsForEachDay(day)}>{day}
                        </button>)}
                </div>
                <div className="container">
                    <div className="row">
                        <Events events={this.state.events[this.state.activeDate] ? this.state.events[this.state.activeDate] : []} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Program;
