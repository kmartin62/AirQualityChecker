import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import classes from '../IntroScreen/IntroScreen.css';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';
import { Button } from 'reactstrap';


const options = [
    { value: 'Skopje', label: 'Skopje' },
    { value: 'Bitola', label: 'Bitola' },
    { value: 'Radovis', label: 'Radovis' },
    { value: 'Berovo', label: 'Berovo' },
    { value: 'Valandovo', label: 'Valandovo' },
    { value: 'Veles', label: 'Veles' },
    { value: 'Vinica', label: 'Vinica' },
    { value: 'Gevgelija', label: 'Gevgelija' },
    { value: 'Gostivar', label: 'Gostivar' },
    { value: 'Debar', label: 'Debar' },
    { value: 'Delcevo', label: 'Delcevo' },
    { value: 'Demir hisar', label: 'Demir Hisar' },
    { value: 'Kavadarci', label: 'Kavadarci' },
    { value: 'Kicevo', label: 'Kicevo' },
    { value: 'Kocani', label: 'Kocani' },
    { value: 'Kratovo', label: 'Kratovo' },
    { value: 'kriva palanka', label: 'Kriva Palanka' },
    { value: 'krusevo', label: 'Krusevo' },
    { value: 'Kumanovo', label: 'Kumanovo' },
    { value: 'Makedonski brod', label: 'Makedonski Brod' },
    { value: 'Negotino', label: 'Negotino' },
    { value: 'Ohrid', label: 'Ohrid' },
    { value: 'Prilep', label: 'Prilep' },
    { value: 'Probistip', label: 'Probistip' },
    { value: 'Resen', label: 'Resen' },
    { value: 'Sveti Nikole', label: 'Sveti Nikole' },
    { value: 'Struga', label: 'Struga' },
    { value: 'Strumica', label: 'Strumica' },
    { value: 'Tetovo', label: 'Tetovo' },
    { value: 'Stip', label: 'Stip' },
];
export default class StatsChart extends React.Component {
    constructor(props){
        super(props);
        // this.textInput;
    }
    state = {
        redirect: false,
        selectedOption: null,
        buttonDisable: true
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = (value) => {
        if (this.state.redirect) {
            var linkUrl=`stats/${this.state.selectedOption}`;
            return <Redirect to={linkUrl} />
        }
      };
      handleChange = (selectedOption) => {
        this.setState({ 
          selectedOption:  selectedOption.value,
          buttonDisable: false
        });
      }

    render() {
       return(
           <Container p>
               <Row>
                   <Col md="5" className={classes.Content}>
                   <h2>Welcome to AirQ!</h2>
                   <h5>Keep up to date with air pollution in your city.</h5>
                        {this.renderRedirect()}
                        <Row className={classes.Form}>
                          <Select
                          className={classes.Select}
                          value={this.selectedOption}
                          options={options}
                          autosize={true}
                          onChange={this.handleChange}
                          />
                          {/* <input type="text" ref={(input) => { this.textInput = input; }} onChange={this.props.handleEdit} value={this.props.messageValue} />                  */}
                        </Row>
                        <Row className="mt-3 p-2">
                          <Button  
                              ref={(input) => { this.textInput = input; }}
                              onClick={this.setRedirect}
                              style={{backgroundColor: "#27a8e0", borderColor: "#27a8e0"}} 
                              size="lg"
                              disabled={this.state.buttonDisable}
                              block>
                            Check
                          </Button>   
                        </Row>
                        <p>*Select your city and click Check</p>
                   </Col>
                   <Col md="7" className={classes.Animation}>
                    <img src={require('./animation.gif')} alt="" style={{ width:"120%"}}/>
                   </Col>
               </Row>
           </Container>
       )
    }
}
