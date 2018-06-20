import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Project';

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
         }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gotoList = this.gotoList.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        console.log('value to submit:', this.state);
        event.preventDefault();

        this.props.createProject(this.state);
        this.gotoList();
    }

    gotoList(e) {
        this.props.history.push('/project/list');
    }

    render() {
      return (
        <div>
            <h1>Create Project</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
            <div className="row">
            <div className="col-md-10">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                <label>Title</label>
                <input className="form-control" name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description" value={this.state.description} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                <button className="btn btn-default" type="submit">Submit</button>
                </div>
            </form>
            </div>
            </div>
        </div>
      );
    }
}

export default connect(
    state => state.projects,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(CreateProject);