'use strict';

import React from 'react';
import { Input, Menu, Icon, Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { setSearchTerm } from '../actions/search';
import { searchFetchData  } from '../actions/search';
import { withRouter } from 'react-router-dom'
import { logOutUser } from '../actions/sessions';

require('styles//Navbar.css');


class NavbarComponent extends React.Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
    }

    state = { page: '' }
    
    componentDidMount() {
      const route = this.props.router.location.pathname;
      const page = route.split('/');

      this.setState({ page: page[1] });
      this.searchinput.focus();
    }

    logOut(event) {
      event.preventDefault();
      this.props.logOutUser(this.props.history);
    }

    navigate(name) {
      this.props.pushToHistory('/' + name + '/');
      this.setState({ page: name });
    }

    handleClick = (e, { name }) => this.navigate(name)

    searchOnChange(e, { value }) {
      const route = this.props.router.location.pathname;
      this.props.setSearchTerm(value);
      this.props.fetchData('/search?q=' + value);

      if (route != '/search/'){
        this.navigate('search');
      }

    }

    // Set cursor position to the end
    moveCaretAtEnd(e) {
      var temp_value = e.target.value
      e.target.value = ''
      e.target.value = temp_value
    }

    render() {
      
      const { page } = this.state;

      return (
        <div className="navbar-component">
            <Menu className="noradius" inverted fixed='top'>
              <Menu.Item header className='navbar-header'>
                <Icon
                  name='sitemap'
                  style={{ marginRight: '1.5em'}}
                />
                NMT
              </Menu.Item>
              <Menu.Item name='home' active={page === 'home'} onClick={this.handleClick.bind(this)}>
                <Icon name='home' /> Home
              </Menu.Item>
              <Menu.Item name='networks' active={page === 'networks'} onClick={this.handleClick.bind(this)}>
                <Icon name='sitemap' /> Networks
              </Menu.Item>

              <Menu.Item name='settings' active={page === 'settings'} onClick={this.handleClick.bind(this)}>
                <Icon name='setting' />
                  Settings
              </Menu.Item>

              <Menu.Menu position='right'>
                <Menu.Item>
                   <Input
                    loading={this.props.isLoading}
                    inverted
                    transparent
                    className='icon'
                    icon='search'
                    placeholder='Search...'
                    ref={(input) => { this.searchinput = input; }}
                    onChange={this.searchOnChange.bind(this)}
                    onFocus={this.moveCaretAtEnd} />
                </Menu.Item>

              {this.props.userIsLoading ? 'LOADING' :
                <Dropdown item text={this.props.user.me.email} floating loading={this.props.userIsLoading}>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Icon name='mail' />
                      Notifications
                    </Dropdown.Item>
                    <Dropdown.Item name='log out' onClick={this.logOut}>
                      <Icon name='log out' />
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                }

              </Menu.Menu>
            </Menu>
        </div>
      );
    }
}





NavbarComponent.propTypes = {
    pushToHistory: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    searchterm: PropTypes.string.isRequired,
    logged_in: PropTypes.bool.isRequired,
    userIsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        search: state.search,
        hasErrored: state.searchHasErrored,
        isLoading: state.searchIsLoading,
        searchterm: state.searchterm,
        router: state.router,
        logged_in: state.sessionReducer,
        userIsLoading: state.userIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(searchFetchData(url)),
        setSearchTerm: (term) => dispatch(setSearchTerm(term)),
        pushToHistory: (route) => dispatch(push(route)),
        logOutUser: (history) => dispatch(logOutUser(history))
    };
};

NavbarComponent.displayName = 'NavbarComponent';

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarComponent));
