import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Project';

class ViewProject extends Component {

    componentWillMount() {
      var self = this;
      // This method runs when the component is first added to the page
      const id = parseInt(this.props.match.params.id, 10) || 0;
        this.props.requestProjectDetail(id)
            .catch(function(error){
                console.log('loading project error: ', error);
                self.props.addUnhandledError(error);
            });
    }
  
    render() {
      //console.log('rendering ViewProject...');
      //console.log(this.props);

      return (
        <div>
          <h1>Project Detail</h1>
          <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
          { renderProjectDetail(this.props.current) }
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

  
  function renderProjectDetail(current) {
    if (!current) {
      return (<div>Not found!</div>);
    }
    else if (current.isLoading) {
      return <div>Loading...</div>
    }
    else if (current.error) {
      return (<div>Error {current.error.code}: {current.error.message} </div>);
    }
    else if (!current.data) {
      return (<div>No data</div>);
    }

    return (
      <div>
        <div>{current.data.title}</div>
        <div>{current.data.description}</div>
      </div>
    );
  }

  const mapStateToProps = (state) => ({ current: state.project.current});
  export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(ViewProject);

