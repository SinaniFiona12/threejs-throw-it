// Besturing: ZQSD (azerty) of pijltjes
const keyMap = {
  z: 'forward', arrowup: 'forward',
  s: 'backward', arrowdown: 'backward',
  q: 'left', arrowleft: 'left',
  d: 'right', arrowright: 'right',
}

// Geeft een object terug dat bijhoudt welke toetsen ingedrukt zijn
export function createControls() {
  const keys = { forward: false, backward: false, left: false, right: false }

  function setKey(event, pressed) {
    const action = keyMap[event.key.toLowerCase()]
    if (!action) return
    keys[action] = pressed
    event.preventDefault()
  }

  window.addEventListener('keydown', (e) => setKey(e, true))
  window.addEventListener('keyup', (e) => setKey(e, false))

  return keys
}
