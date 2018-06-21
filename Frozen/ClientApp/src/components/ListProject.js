import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createLoadingSelector } from '../store/Loading';
import { actionCreators } from '../store/Project';
import { actions as projectActions } from '../store/Project';

class ListProject extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
    this.props.requestProjectList();
  }

  render() {
    console.log('rendering ListProject...');
    console.log(this.props);

    return (
      <div>
        <p><Link className='btn btn-default pull-right' to={`create`}>Create Project</Link></p>
        
        <h1>Project List</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {renderProjectsTable(this.props)}
        {renderPagination(this.props)}
      </div>
    );
  }
}

function renderProjectsTable(props) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Created Date</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.projects.map(project =>
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.title}</td>
            <td>{project.createdDate}</td>
            <td><Link to={`detail/${project.id}`}>Details</Link></td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function renderPagination(props) {
  const prevpageIndex = (props.pageIndex || 0) - 1;
  const nextpageIndex = (props.pageIndex || 0) + 1;

  return <p className='clearfix text-center'>
    <Link className='btn btn-default pull-left' to={`/list/${prevpageIndex}`}>Previous</Link>
    <Link className='btn btn-default pull-right' to={`/list/${nextpageIndex}`}>Next</Link>
    {props.isLoading ? <span>Loading...</span> : []}
  </p>;
}

const loadingSelector = createLoadingSelector([projectActions.list]);
const mapStateToProps = (state) => ({ projects: state.project.list, isLoading: loadingSelector(state) });
export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ListProject);