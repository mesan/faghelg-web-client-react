import React, { Component } from 'react';
import io from 'socket.io-client';
import testImg from '../../testpic.png';
import './chat.css';
import config from '../config';
import Input from './Input';


const MessageFrom = props =>
    <img src={props.picture} />

const MessageContent = props =>
    <div className="message-text">{props.messageContent}</div>

const Message = ({
    messageContent,
    messageFrom,
    talkBubbleClass,
    profileImgClass
}) =>
    <div className="chat-message">
        <div className={`talk-bubble-${talkBubbleClass ? talkBubbleClass : 'right'}`}>
          <MessageContent messageContent={messageContent}/>
        </div>
        <div className={`chat-profile-img ${profileImgClass ? profileImgClass : 'chat-profile-img-left'}`}>
            <MessageFrom picture={testImg}/>
        </div>
    </div>


const Messages = ({messages}) =>
    <div className="messages">
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

    messageObject.talkBubbleClass = 'left';
    messageObject.profileImgClass = 'chat-profile-img-right';
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
                            <Messages messages={this.state.messages} />
                            <Input onSend={this.sendHandler} />
                        </div>
                    </div>
        );
    }


}

export default Chat;
