import React, { Component } from 'react';
import io from 'socket.io-client';
import './chat.css';
import config from '../config';
import Input from './Input';


const MessageFrom = props =>
    <div>{props.messageFrom}</div>

const MessageContent = props =>
    <div>{props.messageContent}</div>

const Message = ({
    messageContent,
    messageFrom,
    isOwnMessage
}) =>
    <div className="talk-bubble tri-right left-in">
        <div className="talktext">
          <MessageContent messageContent={messageContent}/>
          <MessageFrom messageFrom={messageFrom} />
        </div>
    </div>


const Messages = ({messages}) =>
    <div>
        {messages.map((message, index) => <Message key={index} {...message} />)}
    </div>;



class Chat extends Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);

    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }
  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      messageContent: message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.isOwnMessage = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

    componentDidMount() {
    }

    render() {
        return (
            <div className="chat">
                <h1>Chat</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <Messages messages={this.state.messages} />
                            <Input onSend={this.sendHandler} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default Chat;
