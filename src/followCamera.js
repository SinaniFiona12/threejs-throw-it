import * as THREE from 'three'

const cameraOffset = new THREE.Vector3(0, 4, -8) // achter en boven de auto
const wanted = new THREE.Vector3()
const target = new THREE.Vector3()

// Camera blijft achter het busje en draait mee in bochten
export function updateFollowCamera(camera, van, delta) {
  wanted.copy(cameraOffset).applyQuaternion(van.quaternion).add(van.position)
  camera.position.lerp(wanted, 1 - Math.exp(-5 * delta)) // zacht meebewegen
  target.copy(van.position).y += 1
  camera.lookAt(target)
}
