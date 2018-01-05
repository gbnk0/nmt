'use strict';

import React from 'react';
import { Button, Form, Grid, Header, Segment, Checkbox, Transition,Input } from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../actions/sessions';

import { Redirect } from 'react-router'
import { getApiUrl } from '../lib/api'

require('styles//LoginPage.css');
let logoImage = require('../images/logo.png');

class LoginPageComponent extends React.Component {


  constructor(props) {
    super(props);
    this.state = {credentials: {email: '', password: ''}}
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.state.credentials, this.props.history);
  }

  updateApiUrl(evt) {
    localStorage.setItem('ApiUrl', evt.target.value);
  }

  render() {
    if (!this.props.logged_in) {
    
      return (
        
        <div className="loginpage-component">
          
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
            >
            <Grid.Column style={{ maxWidth: 400 }}>
              <Transition visible={!this.props.loginLoading}  animation='bounce' duration={500}>
                <Segment color='orange'>
                  <Header as='h3' textAlign='left'>
                    <img src={logoImage} />
                    <Header.Content>
                      NMT
                        <Header.Subheader>
                          Network Mapper Tools
                        </Header.Subheader>
                      </Header.Content>
                    </Header>

                    <Form size='large'>
                      <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Login'
                        name="email"
                        value={this.state.credentials.email}
                        onChange={this.onChange}
                        size='mini'
                        autoFocus
                      />
                      <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password'
                        value={this.state.credentials.password}
                        onChange={this.onChange}
                        size='mini'
                      />

                      
                      <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                            <Checkbox label='Remember me' style={{ paddingTop: '10px' }}/>
                          </Grid.Column>
                          <Grid.Column>
                          <Button loading={this.props.loginLoading} color='orange' fluid size='small' onClick={this.onSave}>Login</Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Form>
                  </Segment>
                </Transition>
              <Segment>
                <Header as='h4' textAlign='left'>
                  <Header.Content>
                      <Header.Subheader>
                        Api location
                      </Header.Subheader>
                  </Header.Content>
                </Header>
                <Input
                  fluid
                  label='http://'
                  placeholder='Enter the api url:8080'
                  size='mini'
                  onChange={this.updateApiUrl}
                  defaultValue={getApiUrl()} />
              </Segment>
              </Grid.Column>
            </Grid>
        </div>

      );
    } else {
      return ( <Redirect to="/home"/> );
    }

  }
}

LoginPageComponent.displayName = 'LoginPageComponent';

function mapStateToProps(state) {
  return {
    logged_in: state.sessionReducer,
    loginLoading: state.loginLoading
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);