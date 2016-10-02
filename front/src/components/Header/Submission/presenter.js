import React from 'react'

class Submission extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
        <submission className='submission'>
            <input onChange={this.props.submissionFormChange} placeholder='Soundcloud Link Here' type='text' />
            <button onClick={() => this.props.submissionSubmit(this.props.submission.link, this.props.user)}>Submit</button>
        </submission>
    )
  }
}

export default Submission
