import React from 'react';


class Submission extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
        <submission className="submission">
          <p>Submission</p>
            <input onChange={this.props.submissionFormChange} type="text"/>
            <button onClick={() => this.props.submissionSubmit(this.props.submission.link, this.props.user)}>Submit</button>
        </submission>
    )
  }
}

export default Submission;
