import keycode from 'keycode'

export default (key, callback, meta = null) => {
  window.addEventListener('keydown', (e) => {
    if (!meta) {
      if (e.keyCode === keycode(key)) {
        e.preventDefault()
        callback()
      }
    }
  })
}
