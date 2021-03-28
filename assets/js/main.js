let container;
let camera;
let renderer;
let scene;
let telecaster;

init();

window.addEventListener("resize", onWindowResize);

function init() {
  container = document.querySelector('.scene');

  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 500;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(8, 0, 125);

  const ambient = new THREE.AmbientLight(0x829395, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xcae6e9, 2);
  light.position.set(10, 10, 50);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.load('./assets/3d/scene.gltf', function(gltf){
    scene.add(gltf.scene);
    telecaster = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  telecaster.rotation.x += 0.05;
  renderer.render(scene,camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}
