import { getSession, logout, soundCloudAuth, fetchMeSoundCloud, initSoundCloud } from './auth'
import { setSavantTracks, upVoteTrack, setUserTracks, likeOnSoundCloud, trackSetSavant, unlikeOnSoundCloud } from './track'
import { toggleTrack } from './player'
import { signUpSubmit, signUpEmailFormChange, signUpPasswordFormChange, signUpUsernameChange } from './auth.signup.js'
import { loginSubmit, loginEmailFormChange, loginPasswordFormChange } from './auth.login.js'
import { showUserTracks, showSavantTracks } from './stream'
import { showSignUp, showLogin, closeHeader, openHeader, showProfilePage } from './header'
import { subscribeFormChange, subscribeSubmit, clearSubscribeInput } from './header.subscribe'
import { setProfilePageTracks, removeProfileTracks, toggleSettings } from './profilePage'
import { setArtistPageTracks, setSingleTrack } from './artistPage'


export {
  getSession,
  logout,
  soundCloudAuth,
  fetchMeSoundCloud,
  initSoundCloud,
  signUpSubmit,
  signUpEmailFormChange,
  signUpPasswordFormChange,
  signUpUsernameChange,
  loginSubmit,
  loginEmailFormChange,
  loginPasswordFormChange,
  subscribeFormChange,
  subscribeSubmit,
  setUserTracks,
  setSavantTracks,
  showUserTracks,
  showSavantTracks,
  upVoteTrack,
  toggleTrack,
  showSignUp,
  showLogin,
  showProfilePage,
  closeHeader,
  openHeader,
  setProfilePageTracks,
  removeProfileTracks,
  clearSubscribeInput,
  toggleSettings,
  likeOnSoundCloud,
  unlikeOnSoundCloud,
  setArtistPageTracks,
  setSingleTrack,
  trackSetSavant
}
