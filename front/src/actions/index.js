import { auth } from './auth';
import { setSavantTracks, upVoteTrack, setUserTracks } from './track';
import { toggleTrack } from './player';
import { signUpSubmit, signUpEmailFormChange, signUpPasswordFormChange } from './auth.signup.js'
import { loginSubmit, loginEmailFormChange, loginPasswordFormChange } from './auth.login.js'
import { submissionFormChange, submissionSubmit } from './submission'
import { showUserTracks, showSavantTracks } from './stream'

export {
  auth,
  signUpSubmit,
  signUpEmailFormChange,
  signUpPasswordFormChange,
  loginSubmit,
  loginEmailFormChange,
  loginPasswordFormChange,
  submissionFormChange,
  submissionSubmit,
  setUserTracks,
  setSavantTracks,
  showUserTracks,
  showSavantTracks,
  upVoteTrack,
  toggleTrack
};
