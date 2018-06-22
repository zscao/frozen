import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createLoadingSelector } from '../store/Loading';
import { actionCreators as projectActionCreators } from '../store/Project';
import { actionCreators as errorActionCreators } from '../store/Error';
import { actions as projectActions } from '../store/Project'; 

class ViewProject extends Component {

    componentWillMount() {
      var self = this;
      // This method runs when the component is first added to the page
      const id = parseInt(this.props.match.params.id, 10) || 0;
        this.props.requestProjectDetail(id)
            .then(function() {
                console.log('project loaded');
            })
            .catch(function(error){
                console.log('loading project error: ', error);
                self.props.addUnhandledError(error);
            });
    }
  
    render() {
      console.log('rendering ViewProject...');
      console.log(this.props);

      return (
        <div>
          <h1>Project Detail</h1>
          <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
          { this.props.isLoading ? renderLoading() : renderProjectDetail(this.props.current) }
          <p />
          <div className="clearfix">
            <button className="btn btn-default pull-left" onClick={this.goBack}>Back</button>
          </div>
        </div>
      );
    }

    goBack = (e) => {
        this.props.history.goBack();
    }
  }

  function renderLoading() {
      return <div>Loading...</div>
  }
  
  function renderProjectDetail(project) {
    if(!project) {
        return ( <div>Not found!</div> );
    }

    return (
      <div>
        <div>{project.title}</div>
        <div>{project.description}</div>
      </div>
    );
  }

  const loadingSelector = createLoadingSelector([projectActions.detail]);
  const mapStateToProps = (state) => ({ current: state.project.current, isLoading: loadingSelector(state) });
  const actionCreators = Object.assign({}, projectActionCreators, errorActionCreators);
  export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(ViewProject);

