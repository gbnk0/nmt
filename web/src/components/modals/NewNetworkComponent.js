'use strict';

import React from 'react';
import {  Button, Modal, Icon, Form } from 'semantic-ui-react'
import {ValidateIPaddress} from '../../lib/tools';

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { networksPostData  } from '../../actions/networks';

class NewNetworkComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeIp = this.handleChangeIp.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      modalOpen: false,
      name: '',
      ip_addr: ''
    };
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeIp(event) {
    this.setState({ip_addr: event.target.value});
  }

  handleOk() {
    if (ValidateIPaddress(this.state.ip_addr)) {
      this.props.networksPostData('/networks/', this.state)
      this.props.fetchData('/networks/');
      this.handleClose();
    }
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.handleOk(event);
    }
  }

  render() {
    return (
      <Modal
        trigger={<Button
                  onClick={this.handleOpen}
                  content='New network'
                  icon='plus'
                  labelPosition='left'
                  positive
                  size='mini'
                  floated={this.props.floated}
                />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'>
      <Modal.Header><Icon name='sitemap' />New network</Modal.Header>
          <Modal.Content image>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input
                    ref={this.handleRef}
                    label='Network name'
                    placeholder='network name'
                    onKeyUp={ this.handleChangeName }
                    autoFocus
                  />
                  <Form.Input
                    label='IP Address'
                    placeholder='network cidr'
                    onChange={ this.handleChangeIp }
                    error={!ValidateIPaddress(this.state.ip_addr)}
                    onKeyPress={this.handleKeyPress}
                  />
                </Form.Group>
              </Form>
          </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose}>
            <Icon name='close' /> Cancel
          </Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content='Save'
            onClick={this.handleOk}
            disabled={!ValidateIPaddress(this.state.ip_addr)}
            loading={this.props.isLoading}
            />
        </Modal.Actions>
      </Modal>
    );
  }
}

NewNetworkComponent.displayName = 'ModalsNewNetworkComponent';

NewNetworkComponent.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
  networksPostData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};



const mapStateToProps = (state) => {
    return {
        hasErrored: state.networksHasErrored,
        isLoading: state.networksIsLoading,
        isSuccess: state.networksIsSuccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        networksPostData: (url, networks) => dispatch(networksPostData(url, networks))
    };
};

NewNetworkComponent.displayName = 'NewNetworkComponent';

export default connect(mapStateToProps, mapDispatchToProps)(NewNetworkComponent);