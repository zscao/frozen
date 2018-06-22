import React, {Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Error';

class Error extends Component {

    render() {
        if(!this.props.error.lastError) return null;

        return (
            <div>
                <button className='btn btn-default' onClick={this.cleanErrorMessage}>Clean Error</button>
            </div>
        )
    }

    cleanErrorMessage = e => {
        this.props.cleanUnhandledError();
    }
}


const mapStateToProps = (state) => ({ error: state.error });

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Error);