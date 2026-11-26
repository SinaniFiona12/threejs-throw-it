import * as THREE from 'three'

// Licht, gras, mist en raster
export function createWorld(scene) {
  // Licht (zonder licht is het model zwart)
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5))
  const sun = new THREE.DirectionalLight(0xffffff, 2)
  sun.position.set(5, 10, 5)
  scene.add(sun)

  // Mist aan de horizon (zelfde kleur als de lucht, zodat de rand van de grond wegvalt)
  scene.fog = new THREE.Fog(0x87ceeb, 20, 120)

  // Groen gras als ondergrond
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500),
    new THREE.MeshStandardMaterial({ color: 0x4caf50 })
  )
  ground.rotation.x = -Math.PI / 2 // plane staat standaard rechtop, kantel hem plat
  scene.add(ground)

  // Licht raster op het gras zodat je ziet dat de auto beweegt
  const grid = new THREE.GridHelper(500, 250, 0x3d8b40, 0x3d8b40)
  grid.position.y = 0.01 // net boven het gras, anders flikkert het
  scene.add(grid)
}
