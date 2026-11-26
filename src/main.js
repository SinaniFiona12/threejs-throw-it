import { createScene } from './scene.js'
import { createWorld } from './world.js'
import { createControls } from './controls.js'
import { loadVan, updateVan } from './van.js'
import { updateFollowCamera } from './followCamera.js'

const { scene, camera, renderer, clock } = createScene()
createWorld(scene)
const keys = createControls()
const van = await loadVan(scene)

renderer.setAnimationLoop(() => {
  const delta = clock.getDelta()
  updateVan(van, keys, delta)
  updateFollowCamera(camera, van, delta)
  renderer.render(scene, camera)
})
