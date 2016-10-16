import { getSession, logout, soundCloudAuth, fetchMeSoundCloud } from './auth'
import { setSavantTracks, upVoteTrack, setUserTracks, mouseEnterUpvote, mouseLeaveUpvote } from './track'
import { toggleTrack } from './player'
import { signUpSubmit, signUpEmailFormChange, signUpPasswordFormChange, signUpUsernameChange } from './auth.signup.js'
import { loginSubmit, loginEmailFormChange, loginPasswordFormChange } from './auth.login.js'
import { submissionFormChange, submissionSubmit, clearSubmissionInput } from './submission'
import { showUserTracks, showSavantTracks } from './stream'
import { showSignUp, showLogin, closeHeader, showSubmission, showProfilePage } from './header'
import { subscribeFormChange, subscribeSubmit, clearSubscribeInput } from './header.subscribe'
import { setProfilePageTracks, removeProfileTracks, toggleSettings } from './profilePage'


export {
  getSession,
  logout,
  soundCloudAuth,
  fetchMeSoundCloud,
  signUpSubmit,
  signUpEmailFormChange,
  signUpPasswordFormChange,
  signUpUsernameChange,
  loginSubmit,
  loginEmailFormChange,
  loginPasswordFormChange,
  subscribeFormChange,
  subscribeSubmit,
  submissionFormChange,
  submissionSubmit,
  setUserTracks,
  setSavantTracks,
  showUserTracks,
  showSavantTracks,
  upVoteTrack,
  toggleTrack,
  showSignUp,
  showLogin,
  showSubmission,
  showProfilePage,
  closeHeader,
  setProfilePageTracks,
  removeProfileTracks,
  clearSubscribeInput,
  clearSubmissionInput,
  toggleSettings
}
