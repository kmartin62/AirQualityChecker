import React from 'react'
import { Container, Row } from 'reactstrap';
export default class Process extends React.Component {
    render() {
        return (
            <Container className="p-5">
                <h5>Process workflow</h5>
                <p>The data is fetched from API that provides realtime information about the level of air pollutants. 
                We collect them in out database that allows us show realtime stats for our users. Then we refactor and analyze them historically showing them in userfriendly format.
                </p>
                <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} >
                    <img src={require('./process.svg')} alt="Process" style={{ width:"75%"}}/>
                </Row>
            </Container>
        )
    }
    
}