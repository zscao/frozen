import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createLoadingSelector } from '../store/Loading';
import { actionCreators } from '../store/Project';
import { actions as projectActions } from '../store/Project'; 

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
         }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var self = this;
        this.props.createProject(this.state)
          .then(function(){
                self.gotoList();
            },
            function(error) {
                console.log(error);
            });
    }

    gotoList = (e) => {
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
                    <button className="btn btn-default" type="submit" disabled={this.props.isLoading}>Submit</button>
                </div>
            </form>
            </div>
            </div>
        </div>
      );
    }
}


const loadingSelector = createLoadingSelector([projectActions.create]);
const mapStateToProps = (state) => ({ current: state.project.current, isLoading: loadingSelector(state) });

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(CreateProject);