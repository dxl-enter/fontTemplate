<template>
  <div class="canvas-container" ref="screenDom" id="my-three"></div>
  <div class="content">
    <h1>学习更多前端技术</h1>
  </div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted, getCurrentInstance } from 'vue'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const {proxy} = getCurrentInstance()
onMounted(() => {
  document.getElementById('my-three')?.appendChild(renderer.domElement)
  init()
  renderModel()
  gltfModel()
  render()
})

const width = window.innerWidth, height = window.innerHeight;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer()
const loader = new GLTFLoader()
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement)

function init() {
  // 光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  // 设置相机位置
  camera.position.set(300, 300, 300);
  camera.lookAt(0, 0, 0);

  // 辅助坐标轴
  const axesHelper = new THREE.AxesHelper(300);
  scene.add(axesHelper);
  scene.background = new THREE.Color(0xffffff);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.antialias = true;
}

function gltfModel() {
  loader.load('../../../../public/robot/scene.gltf', (gltf) => {
    let model = gltf.scene
    model.traverse(obj => {
      let imgTexture = new THREE.TextureLoader().load('../../../../public/robot/textures/lambert1.001_baseColor.png')
      imgTexture.flipY = false
      const material = new THREE.MeshStandardMaterial({
        map: imgTexture
      })
      obj.material = material;
    })
    scene.add(gltf.scene)
  }, (xhr) => {
    const percent = Math.floor(xhr.loaded / xhr.total * 100)
  })
}

function renderModel() {
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;

  controls.minPolarAngle = -Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 2;
}

function render() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(render);
}

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// 交互效果
addEventListener('dblclick', onMouseDblclick, false)
function onMouseDblclick(event) {
  let intersects = getIntersects(event)

  if (intersects.length !== 0 && intersects[0].object instanceof THREE.Mesh) {
    const selectedObject = intersects[0].object
    let selectedObjects = []
    selectedObjects.push(selectedObject);
    console.log(selectedObjects)
  }
}

function getIntersects(event) {
  let rayCaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  rayCaster.setFromCamera(mouse, camera);
  return rayCaster.intersectObjects(scene.children);
}
</script>
<style lang="scss" scoped>
.canvas-container {
  width: 100vw;
  height: 100vh;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
}
.content {
  position: fixed;
  top: 40%;
  left: 20%;
  h1 {
    color: rgb(255, 247, 0);
    font-size: 40px;
    margin-bottom: 30px;
  }
  a {
    text-decoration: none;
    color: aqua;
  }
  a:hover {
    color: rgb(151, 76, 9);
  }
  a:active {
    color: rgb(157, 7, 110);
  }
}
</style>
