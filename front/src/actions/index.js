import { getSession, logout } from './auth'
import { setSavantTracks, upVoteTrack, setUserTracks, mouseEnterUpvote, mouseLeaveUpvote } from './track'
import { toggleTrack } from './player'
import { signUpSubmit, signUpEmailFormChange, signUpPasswordFormChange, signUpUsernameChange } from './auth.signup.js'
import { loginSubmit, loginEmailFormChange, loginPasswordFormChange } from './auth.login.js'
import { submissionFormChange, submissionSubmit } from './submission'
import { showUserTracks, showSavantTracks } from './stream'
import { showSignUp, showLogin, closeHeader, showSubmission, showProfilePage } from './header'
import { subscribeFormChange, subscribeSubmit } from './header.subscribe'
import { setProfilePageTracks, removeProfileTracks } from './profilePage'
import { startLoading, stopLoading } from './loader'

export {
  getSession,
  logout,
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
  mouseEnterUpvote,
  mouseLeaveUpvote,
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
  startLoading,
  stopLoading
}
