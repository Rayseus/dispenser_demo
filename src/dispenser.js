/*
Date: Feb.26.2020
Author: Ray
This App is a beverage dispenser simulator with maintainance display,
which inclused dispensing tea or coffee with the option to include mild and/or sugar
The dispenser will keep watching those items' stocks level and make a warning when stock lower than 25
Besides, the dispenser will display water temperature every minute and record recent temperatures

Usage: 
1. node server.js
2. yarn
3. yarn start
*/
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form'


const messagesPassive = ['Please select', 'You can add milk and sugar or continue', ''];
const messageDynamicPre = ['You have selected a cup of', 'Your', ''];
const messageDynamicPost = ['is getting prepared', 'is ready', 'with milk', 'with sugar', 'with milk and sugar', ''];
const timestamp = Date.now();


class Dispenser extends Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.handleGoBackVisibility = this.handleGoBackVisibility.bind(this);
        this.handleDespensing = this.handleDespensing.bind(this);
        this.handleBackToStart = this.handleBackToStart.bind(this);
        this.handleMaintainanceToggle = this.handleMaintainanceToggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);

        this.state = {
            milk: false,
            sugar: false,
            timestamp,
            temperature: 0,
            screen2visibility: false,
            Screen2disability: true,
            Screen1Value: '',
            dispensingScreen: false,
            dispensingCompleteScreen: false,
            isChecked: false,
            stocks: [],
            prev_stocks: [],
            isLoaded: false,

            temperatereading: '',
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString(),

            messagesPassive,
            messagebox: messagesPassive[0],
            messagebox2: '',
            messagebox3: '',
            messagebox4: '',
            messageDynamicPre,
            messageDynamicPost,
            temps: [],
            lowstocks: [],
            maintainanceScreen: false
        }
    }

    componentDidMount() {
        //axio using GET to get mock data form node server
        axios.get(`http://localhost:4000/stock`)
            .then(res => {
                console.log(res);
                this.setState({
                    stocks: res.data,
                    prev_stocks: res.data
                });
            })
            .catch(error => {
                console.log(error)
                this.setState({ errorMsg: 'some error' })
            });
        //display items' stock level
        this.getLowStock()
        
        //set interval for those function might run every certain time
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );

        this.intervalStamp = setInterval(
            () => this.ticktimestamp(),
            1000
        );

        this.intervalIDDate = setInterval(
            () => this.daterefresh(),
            1000
        );

        this.intervalIDTemp = setInterval(
            () => this.refreshTemp(),
            3000
        );

        this.intervalGetLowStock = setInterval(
            () => this.getLowStock(),
            5000
        );

        this.intervalSendTemp = setInterval(
            () => this.postTemp(),
            60000
        );

        this.instervalGetTemp = setInterval(
            () => this.getTemp(),
            60000
        );

    };

    componentWillUnmount() {
        clearInterval(this.intervalID);
        clearInterval(this.intervalIDDate);
        clearInterval(this.intervalIDTemp);
        clearInterval(this.getTemp);
    }

    //using POST to post temperature data to node server
    postTemp() {
        fetch('http://localhost:4000/temp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    machine_id: "123",
                    timestamp: this.state.timestamp,
                    temp: this.state.temperature,
                })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error));
    }

    //get temperature info from node server, handle display recent 15 tempratures data
    getTemp() {
        fetch('http://localhost:4000/temp')
            .then(res => res.json())
            .then(json => {
                if (this.state.temps.length > 15){
                    this.state.temps.shift()
                }
                
                let join = this.state.temps.concat(json)
                this.setState({
                    isLoaded: true,
                    temps: join
                });
                console.log(this.state.temps)
            }).catch(err => console.log(err));
    }

    //using array filter to select low stock items
    getLowStock() {
        let stock_low = this.state.stocks.filter((e) => e.stock < 10)
        this.setState({
            isLoaded: true,
            lowstocks: stock_low
        })
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString()
        });
    }

    ticktimestamp() {
        this.setState({
            timestamp: Date.now()
        });
    }

    daterefresh() {
        this.setState({
            date: new Date().toDateString()
        })
    }

    refreshStock(name) {
        //deep copy edited data
        let data = JSON.parse(JSON.stringify(this.state.stocks))
        //using map to select correct data to edit stock due to map will return a new array which can be set as new stocks state
        data = data.map((item) => item.product === name ? { ...item, stock: item.stock - 1 } : item)
        setTimeout(()=>{
            this.setState({
                stocks: data
            })
        }, 0);
    }

    //refresh temperature with random
    refreshTemp() {
        let min = 90.99,
            max = 99.99,
            highlightedNumber = Math.random() * (max - min) + min;
        highlightedNumber = highlightedNumber.toFixed(1);
        this.setState((prevState) => {
            return {
                temperature: highlightedNumber,
                timestamp: this.state.timestamp
            };
        });
    }

    //handle function for button, including each button logic and functional setting
    //maintinance button, show up and close maintainance display
    handleMaintainanceToggle() {
        this.setState((prevState) => {
            return {
                maintainanceScreen: !prevState.maintainanceScreen,
            };
        });
    }

    //tea or coffee selection, will lead to another screen for milk and/or sugar selection
    //besides stock level will be handed in this function once selected
    handleToggleVisibility(e) {
        const screen1val = e.target.value;

        this.setState((prevState) => {
            return {
                screen2visibility: !prevState.screen2visibility,
            };
        });
        this.setState((prevState) => {
            return {
                Screen2disability: !prevState.screen2visibility,
            };
        });

        this.setState((prevState) => {
            return {
                Screen1Value: screen1val,
                messagebox: this.state.messagesPassive[1],
                messagebox2: this.state.messageDynamicPre[0]
            }
        });
        this.setState((prevState) => {
            return {
                maintainanceScreen: !prevState.maintainanceScreen,
            };
        });

        this.refreshStock(screen1val);

    }

    //back to tea or coffee selection screen, stocks level will restore
    handleGoBackVisibility() {
        setTimeout(()=>{
            this.setState((prevState) => {
                return {
                    stocks: this.state.prev_stocks
                };
            })
        }, 0);

        this.setState((prevState) => {
            return {
                screen2visibility: !prevState.screen2visibility,
            };
        });
        this.setState((prevState) => {
            return {
                Screen2disability: !prevState.screen2visibility,
            };
        });
        this.setState({
            messagebox: this.state.messagesPassive[0],
            messagebox2: this.state.messageDynamicPre[2],
        });
    }

    //despensing handle, will confirm stock level change, enjoy your drink
    handleDespensing(e) {
        this.setState((prevState) => {
            return {
                screen2visibility: false,
            };
        });
        this.setState((prevState) => {
            return {
                Screen2disability: false,
            };
        });
        this.setState((prevState) => {
            return {
                dispensingScreen: !prevState.screen2visibility,
            };
        });
        setTimeout(() => {
            this.setState((prevState) => {
                return {
                    dispensingCompleteScreen: !prevState.screen2visibility,
                };

            });
            this.setState((prevState) => {
                return {
                    dispensingScreen: false
                };
            });
        }, 3000);

        this.setState((prevState) => {
            return {
                messagebox: this.state.messagesPassive[2],
                messagebox2: this.state.messageDynamicPre[0]
            }
        });

        this.setState((prevState) => {
            return {
                prev_stocks: prevState.stocks
            } 
        })
    }

    //back to tea or coffee selection
    handleBackToStart() {
        this.setState((prevState) => {
            return {
                Screen2disability: !prevState.screen2visibility,
                screen2visibility: false,
                dispensingScreen: false,
                dispensingCompleteScreen: false,
            };
        });
    }

    //milk selection with stock level handling
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
       
        let wit = "with " + name
        if (value === true) {
            this.setState((prevState) => {
                return {
                    messagebox3: wit
                }
            })
        } 
        else {
            this.setState({
                messagebox3: ''
            })
        }
        this.refreshStock(name);
    }

    //sugar selection with stock level handling
    handleInputChange2(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        let wit = "with " + name
        if (value === true) {
            this.setState((prevState) => {
                return {
                    messagebox4: wit
                }
            })
        } 
        else {
            this.setState({
                messagebox4: ''
            })
        }
        this.refreshStock(name);
    }

    SubmitHandler = e => {
        e.preventDefault();
    }

    render() {
        var { stocks, lowstocks, temps, messagebox } = this.state;
        var { temperatereading } = this.state
        return (
            <div>
                <Container fluid={true} className="Mainscreen">
                    <Row>
                        <Col md={12}>

                            <br /> <br />
                            <center className="messagebox"> {messagebox}</center>
                            <br /> <br />

                            <Form onSubmit={this.SubmitHandler}>
                                {this.state.Screen2disability && (
                                    <div>
                                        <Button variant="primary" value="tea" onClick={this.handleToggleVisibility} size="lg" block>Tea </Button>
                                        <Button variant="primary" value="coffee" onClick={this.handleToggleVisibility} size="lg" block>Coffee</Button>
                                        <Button variant="secondary" value="maintain" onClick={this.handleMaintainanceToggle} size="lg" block>Maintainance</Button>
                                    </div>
                                )}

                                {this.state.screen2visibility && (

                                    <div>


                                        <input
                                            id="milk"
                                            name="milk"
                                            type="checkbox"
                                            checked={this.state.Milk}
                                            onChange={this.handleInputChange} />
                                        <label htmlFor="milk" className="btn btn-primary btn-block btn-lg sugar">Milk</label>



                                        <input
                                            id="sugar"
                                            name="sugar"
                                            type="checkbox"
                                            checked={this.state.Sugar}
                                            onChange={this.handleInputChange2} />
                                        <label htmlFor="sugar" className="btn btn-primary btn-block btn-lg milk"> Sugar</label>



                                    </div>
                                )}

                                {this.state.screen2visibility && (
                                    <div>
                                        <br />
                                        <Button variant="primary" type="submit" value={temperatereading} onClick={this.handleDespensing} size="lg" block>Dispense</Button>
                                        <Button variant="primary" value={this.props.text} onClick={this.handleGoBackVisibility} size="lg" block>Back</Button>
                                    </div>
                                )}
                                {this.state.dispensingScreen && (
                                    <div>
                                        <p className="cent">Dispensing now .....</p>
                                    </div>
                                )}
                                {this.state.dispensingCompleteScreen && (
                                    <div>
                                        <p className="cent">Dispensing complete </p>
                                        <Button variant="primary" onClick={this.handleBackToStart} size="lg" block>Get another drink</Button>
                                    </div>

                                )}

                                <div>
                                </div>
                                <div className="messagebox">
                                    <center> {this.state.messagebox2}  {this.state.Screen1Value} {this.state.messagebox3} {this.state.messagebox4}</center>
                                </div>
                                <div>
                                    <center>

                                    </center>
                                    <center> The water temperature is  <br />{this.state.temperature} &#8451;</center>
                                    <p className="App-clock cent">
                                        {this.state.time}  <br /> {this.state.date}
                                        <br />
                                    </p>


                                    <p>Dispenser machine id:123 with &#40; {lowstocks.map(lowstock => (<span key={lowstock.id}>{lowstock.product} | stock left: {lowstock.stock}; </span>))} &#41;	 are low </p>
                                </div>
                                {this.state.maintainanceScreen && (
                                    <div>
                                        <h3>Products Low on stock</h3>
                                        <ul>

                                            {stocks.map(stock => (
                                                <li key={stock.id}>
                                                    {stock.product} | stock left: {stock.stock}
                                                </li>
                                            ))}
                                        </ul>

                                        <h3>Temparature Readings </h3>
                                        <ul>
                                            {temps.map(temp => (
                                                <li key={temp.id}>
                                                    Time : {temp.timestamp} | Temparature: {temp.temp} <br />
                                                </li>
                                            ))}
                                        </ul>



                                    </div>
                                )}
                            </Form>
                        </Col>
                    </Row>


                </Container>

            </div>
        );
    }
}

export default Dispenser;
