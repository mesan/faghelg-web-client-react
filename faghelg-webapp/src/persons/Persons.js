import React, { Component } from 'react';
import './persons.css';

const PersonFullName = props =>
  <div className="personName">{props.children}</div>

const ImageUrl = props =>
  <img className="profileImg" src={props.children} />

const Person = ({
  fullName,
  shortName,
  profileImageUrl
}) =>
  <div className="personContainer">
    <ImageUrl>{profileImageUrl}</ImageUrl>
    <PersonFullName>{fullName}</PersonFullName>
  </div>

const Persons = ({persons}) =>
  <div>
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
        persons : []
      };
    }

    componentDidMount() {
      fetch('http://faghelg.herokuapp.com/persons')
      .then(response => response.json())
      .then(persons =>
        this.setState({persons})
      )
      .catch(err => console.error('Failed to fetch persons.', err));
  }

    render() {
        return (
            <div className="persons">
                <h1 className="pageHeader">Personer</h1>
                <div className="container">
                  <div className="row">
                    <div>
                        <Persons persons={this.state.persons} />
                    </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default PersonList;
