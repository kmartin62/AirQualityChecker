import React from 'react';
import ReactDOM from 'react-dom';
import StatsFilter from './containers/StatsFilter/StatsFilter';
import IntroScreen from './containers/IntroScreen/IntroScreen';
import Process from './containers/Process/Process';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Layout from './components/Layout/Layout';
import './index.css';
import Footer from './components/Footer/Footer';


const routing = (
    <Router>
      <div>
        <Layout>
            <Route path="/" exact component={IntroScreen}/>
            <Route path="/stats" component={StatsFilter}/>
            <Route path="/process" component={Process} />
            {/* <Waves></Waves> */}
        </Layout>
        <Footer></Footer>
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
