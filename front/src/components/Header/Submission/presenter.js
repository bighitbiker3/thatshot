import React from 'react'

class Submission extends React.Component {
  constructor (props) {
    super(props)
    this.submissionSubmit = this.props.submissionSubmit.bind(this)
  }

  render () {
    return (
        <submission className='submission'>
          <form onSubmit={this.submissionSubmit}>
            <input onChange={this.props.submissionFormChange} value={this.props.submission.link} placeholder='Soundcloud Link Here' type='text' />
            <button type="submit">Submit</button>
          </form>
        </submission>
    )
  }
}

export default Submission
