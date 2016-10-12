import React from 'react'

class Submission extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
        <submission className='submission'>
          <form onSubmit={() => this.props.submissionSubmit(this.props.submission.link, this.props.user)}>
          <input onChange={this.props.submissionFormChange} placeholder='Soundcloud Link Here' type='text' />
          <button type="submit">Submit</button>
          </form>
        </submission>
    )
  }
}

export default Submission
