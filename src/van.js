import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const SPEED = 8 // eenheden per seconde
const TURN_SPEED = 2 // radialen per seconde

// Het model zoekt zijn texture op 'Textures/colormap.png' naast het model,
// maar die staat in public/textures/. Stuur dat verzoek door naar de juiste plek.
const loadingManager = new THREE.LoadingManager()
loadingManager.setURLModifier((url) =>
  url.endsWith('Textures/colormap.png') ? '/textures/colormap.png' : url
)

// Laadt het busje en zet het in de scene
export async function loadVan(scene) {
  const gltf = await new GLTFLoader(loadingManager).loadAsync('/models/van.glb')
  const van = gltf.scene
  van.position.set(0, 0, 0)
  scene.add(van)
  return van
}

const forward = new THREE.Vector3()

// Laat het busje rijden en sturen op basis van de ingedrukte toetsen
export function updateVan(van, keys, delta) {
  let move = 0
  if (keys.forward) move += 1
  if (keys.backward) move -= 1

  // Alleen sturen als de auto rijdt; achteruit stuurt omgekeerd zoals een echte auto
  if (move !== 0) {
    if (keys.left) van.rotation.y += TURN_SPEED * delta * move
    if (keys.right) van.rotation.y -= TURN_SPEED * delta * move
  }

  // Het model kijkt naar +Z
  forward.set(0, 0, 1).applyQuaternion(van.quaternion)
  van.position.addScaledVector(forward, move * SPEED * delta)
}
