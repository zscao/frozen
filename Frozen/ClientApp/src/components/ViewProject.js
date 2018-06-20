import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Project';

class ViewProject extends Component {

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    componentWillMount() {
      // This method runs when the component is first added to the page
      const id = parseInt(this.props.match.params.id, 10) || 0;
      this.props.requestProjectDetail(id);
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

    goBack(e) {
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
  
  export default connect(
    state => state.projects,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(ViewProject);

