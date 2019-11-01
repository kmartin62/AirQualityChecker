import React from 'react'
import classes from '../StatsFilter/StatsFilter.css';
import Select from 'react-select';
import { firebaseConfig } from '../../components/Utils/config';
import firebase from 'firebase';
import {Doughnut} from 'react-chartjs-2';
import { Container, Row, Col , Alert} from 'reactstrap';
import MapComponent from "../../components/Map/Map";

import Generator from "../../components/Generator/Generator";
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
    { value: 'Kriva palanka', label: 'Kriva Palanka' },
    { value: 'Krusevo', label: 'Krusevo' },
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
const data = {
    datasets: [
        {
            label: 'Real Time Stats',
            labelColor: 'rgb(255,255,255,1)',
            backgroundColor: ['rgb(39,168,224,1)','rgb(39,168,224,1)','rgb(255,255,255,1)'],
            borderColor: 'rgb(30,14,98,1)',
            legendColor: 'rgba(255,99,132,1)',
            borderWidth: 4,
            hoverBackgroundColor: 'rgb(255,255,255,1)',
            data: []
        }
    ]
};
const option = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      labels: {
        fontColor: '#ffffff',
        fontStyle: 'bold'
      }
    },
    scales: {
        xAxes: [{ 
            display: false,
        }],
        yAxes: [{
            display: false,
        }],
    }
  }
  
class StatsFilter extends React.Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            this.app = firebase.initializeApp(firebaseConfig);
        }
        this.state = {
            pm10: null,
            pm25: null,
            aqi: null,
            city_name: 'null',
            value: '',
            selectedOption: null,
        };

    this.myFunction = this.myFunction.bind(this);
    }
    myFunction(param){
        this.readUserData(param.target.id);
        let p = document.getElementsByTagName("polygon");
        for (let i=0; i<p.length; i++){
            p[i].style.fill = '#27a7df';
        }
        let x = document.getElementById(param.target.id);
        if (x.style.fill === '#27a7df') {
            x.style.fill = '#ffffff';
        } else {
            x.style.fill = '#ffffff';
        }
    }
    setCityName(){
        var path = this.props.location.pathname;
        var directories = path.split("/");
        var lastDirectory = directories[(directories.length - 1)];
        lastDirectory=lastDirectory.charAt(0).toUpperCase() + lastDirectory.slice(1);
        if(directories.length===3 && lastDirectory!==''){
            this.setState({city_name: lastDirectory});
        }else{
            lastDirectory="Skopje";
            this.setState({city_name: lastDirectory});
        }
        return lastDirectory;
    }
    readUserData(city_name){
        firebase.database().ref("Realtime/" + city_name + "/").once('value', (snapshot) => {
            if(snapshot.exists()){
                if(snapshot.val().key.localeCompare(this.getKey()) === 0) {
                    this.setState({pm10: snapshot.val().pm10});
                    this.setState({pm25: snapshot.val().pm25});
                    this.setState({aqi: snapshot.val().aqi});
                    this.setState({city_name: city_name});
                }
                else {
                    this.getRequest(city_name);
                }
            }

            else {
                this.getRequest(city_name);
            }

        })
    }
    writeUserData(city_name, key, pm10, pm25, aqi){
        firebase.database().ref("Realtime/" + city_name + "/").set({
            city_name,
            pm10,
            pm25,
            aqi,
            key
        }).catch((error) => {
            // console.log("error ", error)
        });

        firebase.database().ref("Stats/").push({
            city_name,
            pm10,
            pm25,
            aqi,
            key
        }).catch((error) => {
            // console.log("error ", error)
        });
    }

    getKey(){
        let d = new Date();
        let path = d.toLocaleDateString().toString().split("/").join("-") + "T" + (d.getHours()).toString() + ":00";
        return path;
    };
    getRequest(city){
        let path = "https://api.weatherbit.io/v2.0/current/airquality?city=" + city + "&country=MK&key=099595fa7e88462ea8e4a26befd8d035";
        fetch(path)
            .then(res => res.json())
            .then((data) => {
                this.writeUserData(city, this.getKey().toString(), data.data[0].pm10, data.data[0].pm25, data.data[0].aqi);
                this.setState({ pm10: data.data[0].pm10 });
                this.setState({ pm25: data.data[0].pm25 });
                this.setState({ aqi: data.data[0].aqi });
                this.setState({ city_name: data.city_name})
            });
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.readUserData(selectedOption.label);
    };

    componentDidMount() {
        this.getRequest(this.setCityName());
        // console.log(this.setCityName());
    }
    render() {
        const { selectedOption } = this.state;
        data.labels = ["PM10", "PM25", "AQI"];
        data.datasets[0].data=[this.state.pm10, this.state.pm25, this.state.aqi];
        return (
            <div>
            <Container className="p-5">
               {(this.state.pm10 > 40 || this.state.pm25 > 25 || this.state.aqi > 50) &&
               <Alert color="primary">
                   <i className="fa fa-warning"></i> Put the mask on your face! The level of pollutants is harmful.
                </Alert>
              }
            <Row>
                <Col md="4">
                    <div className={classes.Text}>
                        <h5>Real time stats</h5>
                        <h6>Select your city to check the levels</h6>
                    </div>
                    <div className={classes.Table}>
                    <Select
                        className={classes.Select}
                        placeholder={this.state.city_name}
                        value= {selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        autosize={true}
                        defaultValue="Skopje"
                    />
                    <table>
                        <thead>
                        <tr>
                            <th width={"100px"}>City</th>
                            <td>{this.state.city_name}</td>
                        </tr>
                        <tr>
                            <th>PM10</th>
                            <td>{this.state.pm10}</td>
                        </tr>
                        <tr>
                            <th  >PM2.5</th>
                            <td>{this.state.pm25}</td>
                        </tr>
                        <tr>
                            <th>AQI</th>
                            <td>{this.state.aqi}</td>
                        </tr>
                        </thead>
                    </table>
                    </div>
                    </Col>
                    <Col md="4">
                        <h5>Stats in chart</h5>
                        <Doughnut height={250} data={data} options={option} className={classes.Charts}/>
                    </Col>
                    <Col md="4">
                        <h5>Map</h5>
                        <h6>Click on the city to select it</h6>
                        <MapComponent  height={"100%"} myFunction={this.myFunction} className={classes.Map}/>
                    </Col>
                </Row>
                <Row className={classes.StatsPolution}>
                    <Col md="6">
                        <h5>Air Quality Standards</h5>
                        <h6>Table of permitted average concentration</h6>
                        <table>
                            <thead>
                            <tr>
                                <th>Pollutant</th>
                                <th>Concentration</th>
                                <th>Averaging period</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>PM2.5</th>
                                    <td>25 µg/m</td>
                                    <td>1 year</td>
                                </tr>
                                <tr>
                                    <th>PM10</th>
                                    <td>40 µg/m3</td>
                                    <td>1 year</td>
                                </tr>
                                <tr>
                                    <th>AQI</th>
                                    <td>50 µg/m3</td>
                                    <td>1 year</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col>
                    <Generator></Generator>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

export default (StatsFilter);



