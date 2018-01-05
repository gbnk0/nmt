import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
 
import HomeContainer from './containers/HomeContainer'
import NetworkListContainer from './containers/NetworkListContainer';
import NetworkDetailContainer from './containers/NetworkDetailContainer'
import HostDetailContainer from './containers/HostDetailContainer'
import SearchContainer from './containers/SearchContainer'
import LoginPageComponent from './components/LoginPageComponent.js'
import SettingsContainer from './containers/SettingsContainer'





class Routes extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <Switch>
                <Redirect exact from='/' to='/home/'/>
                <Route exact path='/login' component={LoginPageComponent}/>
                <Route exact path='/home/' component={HomeContainer} />
                <Route exact path='/networks/' component={NetworkListContainer} />
                <Route exact path='/networks/:id' component={NetworkDetailContainer} />
                <Route exact path='/hosts/:id' component={HostDetailContainer} />
                <Route exact path='/search/' component={SearchContainer} />
                <Route exact path='/settings/' component={SettingsContainer} />
            </Switch>

        );
    }


}


export default Routes