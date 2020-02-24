import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Container fluid={true} className="Mainscreen">
        <Row>
          <Col md={8}>
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="drinks">
                <ToggleButton value={1} variant="primary" size="lg" block  xs={12} md={5}>Tea</ToggleButton>
                <ToggleButton value={2} variant="primary" size="lg" >Coffee</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>

        <Row>
          <Col>
           <ButtonToolbar>
              <ToggleButtonGroup type="checkbox" >
                <ToggleButton value={1} variant="primary" size="lg" block>Sugar</ToggleButton>
                <ToggleButton value={2} variant="primary" size="lg">Milk</ToggleButton>
                <ToggleButton value={3} variant="primary" size="lg">No Milk or Sugar</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
