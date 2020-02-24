import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './style.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form'

const messagesPassive = ['Make a selection' , 'You can add milk and sugar or continue' , ''];
const messageDynamicPre=['You have selected a cup of', 'Your', ''];
const messageDynamicPost=['is getting prepared', 'is ready', 'with milk', 'with sugar', 'with milk and sugar', ''];
const timestamp = Date.now();


class Dispense extends Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.handleGoBackVisibility = this.handleToggleVisibility.bind(this);
        this.handleDespensing = this.handleDespensing.bind(this);
        this.handleBackToStart = this.handleBackToStart.bind(this);
        this.handleMaintainanceToggle = this.handleMaintainanceToggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);

        this.state = {
            milk: false,
            sugar:false,
            timestamp,
            temperature: 0,
            screen2visibility: false,
           
            Screen2disability: true,
            Screen1Value: '',
            vosibility: true,
            vosability: false,
            dispensingScreen:false,
            dispensingCompleteScreen:false,
            isChecked: false,
            persons: [],
            stocks:[],
            isLoaded:false,

            temperatereading:'',
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString(),

            messagesPassive,
            
            messagebox: messagesPassive[0],
            messagebox2: '',
            messagebox3: '',
            messagebox4: '',
            messageDynamicPre,
            messageDynamicPost,
            temps:[],
            lowstocks:[],
            last30temps:[],
            maintainanceScreen:false
        }

}