$('.gclass').click(function() {
  if ($(this).val() === 'place')
    placing = true;
  else // move
    placing = false;

});

var scene, renderer, camera;
var plane;
var puck;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var placing = true;
var pucks = [];
var thePuck;
var controls; // move to global, for changing controls
var indicator;
var bench = buildBench();
init();
animate();

function init() {

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  var ww = $('#container').innerWidth();
  var hh = $('#container').innerHeight();
  renderer.setSize(ww, hh);
  renderer.setClearColor(0x555555);
  $('#container').append(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, ww / hh, 1, 10000);
  camera.position.set(0, 80, 200);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var indicator_geom = new THREE.RingGeometry(5, 10, 32);
  var indicator_mat = new THREE.MeshBasicMaterial({
    color: 0xff1234,
  });
  indicator = new THREE.Mesh(indicator_geom, indicator_mat);
  indicator.rotation.x = -Math.PI / 2;
  indicator.position.set(-20, 0, 20);
  scene.add(indicator);

  var cyl_geom = new THREE.CylinderGeometry(10, 10, 6, 32);
  var cyl_mat = new THREE.MeshNormalMaterial();
  puck = new THREE.Mesh(cyl_geom, cyl_mat);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
  //scene.add(gridXZ);

  ////////////////////////////////////////////////////////
  //floor
  var loader = new THREE.TextureLoader();
  var floorGroup = new THREE.Group();
  var grassMap = loader.load('https://i.imgur.com/3ylZdK0.png');
  var grassAlpha = loader.load('https://i.imgur.com/8nEKbY6.png');
  var grassFloor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshLambertMaterial({
    map: grassMap,
    transparent: true,
    alphaMap: grassAlpha
  }));

  var stoneMap = loader.load('https://i.imgur.com/SvihUup.png');
  var stoneAlpha = loader.load('https://i.imgur.com/Bz4e17i.png');
  var stoneFloor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({
    map: stoneMap,
    transparent: true,
    alphaMap: stoneAlpha
  }));
  floorGroup.add(grassFloor, stoneFloor);
  scene.add(floorGroup);

  floorGroup.rotation.x = -Math.PI / 2;
  ////////////////////////////////////////////////////////
  //light
  var ambientLight = new THREE.AmbientLight('white', 0.2);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.castShadow = true;
  pointLight.position.set(50, 100, 50);
  scene.add(ambientLight, pointLight);

  // build an invisible plane, overlapping the grid
  plane = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200, 8, 8),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0,
      transparent: true
    }));
  plane.rotation.x = -Math.PI / 2;
  plane.material.visible = true; // invisible, for picking only
  scene.add(plane);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', onDocumentMouseMove, false);
  $('#container').on("pointerdown", onMouseDown);
  $('#container').on("pointermove", onMouseMove);
  $('#container').on("pointerup", onMouseUp);

  thePuck = null;

  $('#clear').click(function() {

    pucks.forEach(function(puck) {
      puck.removeFromParent();
    })

    pucks = [];

  });

  $('#save').click(function() {

    // pucks --> puckRecs
    var recs = [];
    for (let i = 0; i < pucks.length; i++) {
      var rec = {};
      rec.name = pucks[i].name;
      rec.x = Number(pucks[i].position.x).toFixed(2);
      rec.z = Number(pucks[i].position.z).toFixed(2);
      recs.push(rec);
    }

    // puckRecs --> JSON.stringify --> localStorage
    var recLog = JSON.stringify(recs);
    localStorage.setItem('puckLog', recLog);

  });

  $('#restore').click(function() {

    // localStorage --> JSON.parse --> puckRecs
    var parseLog = JSON.parse(localStorage.getItem('puckLog'));
    for (let i = 0; i < parseLog.length; i++) {
      var newPuck = bench.clone();
      newPuck.position.set(parseLog[i].x, 0, parseLog[i].z);
      scene.add(newPuck);
      pucks.push(newPuck);
    }

  });
}

function onWindowResize() {
  var ww = $('#container').innerWidth();
  var hh = $('#container').innerHeight();
  camera.aspect = ww / hh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, hh);
}

function onMouseDown(event) {

  var viewportPos = $('#container').get(0).getBoundingClientRect();
  mouse.x = ((event.clientX - viewportPos.left) / $('#container').innerWidth()) * 2 - 1;
  mouse.y = -((event.clientY - viewportPos.top) / $('#container').innerHeight()) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  if (placing === true) { // place
    var intersects = raycaster.intersectObject(plane);
    if (intersects.length > 0) {
      var newPuck = bench.clone(); //makePuck();
      newPuck.position.copy(intersects[0].point);
      scene.add(newPuck);
      pucks.push(newPuck);
    }
  } else { // move
    var intersects = raycaster.intersectObjects(pucks);
    if (intersects.length > 0) {
      indicator.position.copy(intersects[0].point);

      thePuck = intersects[0].object.parent;
    }

  }

}

function onMouseUp(event) {
  thePuck = null;
  controls.enabled = true;
}


function onMouseMove(event) {
  event.preventDefault();
  if (thePuck === null) return;

  var viewportPos = $('#container').get(0).getBoundingClientRect();
  mouse.x = ((event.clientX - viewportPos.left) / $('#container').innerWidth()) * 2 - 1;
  mouse.y = -((event.clientY - viewportPos.top) / $('#container').innerHeight()) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObject(plane);
  if (intersects.length > 0) {
    controls.enabled = false; // to disable camera movement
    thePuck.position.copy(intersects[0].point);
  }

}

function onDocumentMouseMove(event) {

  event.preventDefault();

  var viewportPos = $('#container').get(0).getBoundingClientRect();
  mouse.x = ((event.clientX - viewportPos.left) / $('#container').innerWidth()) * 2 - 1;
  mouse.y = -((event.clientY - viewportPos.top) / $('#container').innerHeight()) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObject(plane);
  if (intersects.length > 0) {
    indicator.position.copy(intersects[0].point);
    indicator.position.y = 2;
  }
}

function animate() {

  requestAnimationFrame(animate);
  render();

  $('#debugMsg').text(pucks.length + ' bench on plane');

}

function render() {
  renderer.render(scene, camera);
}

function buildBench() {
  var group = new THREE.Group();
  var benchMatTex = new THREE.TextureLoader().load("https://i.imgur.com/ahpHc7F.png");
  benchMatTex.repeat.set(10, 4);
  benchMatTex.wrapS = THREE.RepeatWrapping;
  benchMatTex.wrapT = THREE.RepeatWrapping;
  var benchTex = new THREE.TextureLoader().load("https://i.imgur.com/0D413cA.jpg");
  benchTex.repeat.set(4, 4);
  benchTex.wrapS = THREE.RepeatWrapping;
  benchTex.wrapT = THREE.RepeatWrapping;
  var benchMatMaterial = new THREE.MeshLambertMaterial({
    map: benchMatTex
  });
  var benchMaterial = new THREE.MeshLambertMaterial({
    map: benchTex
  });
  var benchMat = new THREE.Mesh(new THREE.BoxGeometry(36, 2, 15), benchMatMaterial);
  var bench = new THREE.Mesh(new THREE.BoxGeometry(40, 2, 15), benchMaterial);
  var benchLeg1 = new THREE.Mesh(new THREE.BoxGeometry(2, 10, 15), benchMaterial);
  var benchLeg2 = new THREE.Mesh(new THREE.BoxGeometry(2, 10, 15), benchMaterial);
  benchMat.position.set(0, 13, 0);
  bench.position.set(0, 11, 0);
  benchLeg1.position.set(-12.5, 5, 0);
  benchLeg2.position.set(12.5, 5, 0);
  group.add(benchMat, bench, benchLeg1, benchLeg2);
  return group;
}
