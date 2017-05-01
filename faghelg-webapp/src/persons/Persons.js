import React, {Component} from "react";
import "./persons.css";

const PersonFullName = props =>
  <div className="personName">{props.children}</div>;

const ImageUrl = props =>
  <img className="profileImg" src={props.children} />;

const Person = ({
  fullName,
  shortName,
  profileImageUrl
}) =>
  <div className="personContainer">
    <ImageUrl>{profileImageUrl}</ImageUrl>
    <PersonFullName>{fullName}</PersonFullName>
  </div>;

const Persons = ({persons}) =>
  <div className="personsList">
    {persons
      .sort(function(a,b) {
        if(a.fullName < b.fullName) return -1;
        if(a.fullName > b.fullName) return 1;
        return 0;
      })
      .map((person, index) => <Person key={index} {...person} />)}
  </div>;


class PersonList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        persons : [],
        filterString: ""
      };
      this.filterPersons = this.filterPersons.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
      fetch('http://faghelg.herokuapp.com/persons')
      .then(response => response.json())
      .then(persons =>
        this.setState({persons: persons})
      )
      .catch(err => console.error('Failed to fetch persons.', err));
  }

  filterPersons(person) {

      if (this.state.filterString === "") {
          return true;
      }
      if (person.fullName.toLowerCase().includes(this.state.filterString.toLowerCase())) {
          return true;
      }
      return false;
  }

  onChange(event) {
    this.setState({filterString: event.target.value});
  }

    render() {
        return (
            <div className="persons">
                <h1 className="pageHeader">Personer</h1>
                <div className="searchContainer" >
                    <input type="text" value={this.state.filterString} onChange={this.onChange}/>
                </div>
                <div className="container">
                  <div className="row">
                    <div>
                        <Persons persons={this.state.persons.filter(this.filterPersons)} />
                    </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default PersonList;
