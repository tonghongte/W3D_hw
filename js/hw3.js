var camera, scene, renderer;
class lights {
  constructor(position, target) {
    this.myStatus = true;
    this.brightness = 50;
    this.spotLight = new THREE.SpotLight(0xffffff, this.brightness / 25, 250, Math.PI / 12, 0.974);
    this.spotLight.target=target;
    this.lampModel=  new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10, 32), new THREE.MeshLambertMaterial());
    this.lampModel.rotateX( Math.PI / 2 ); 
    this.lampGroup = new THREE.Group();
    this.lampGroup.add(this.lampModel,this.spotLight);
    this.lampGroup.position.set(position.x, position.y, position.z);
    scene.add(this.lampGroup);
    this.lampGroup.lookAt(target.position) ;
  }
  changeBrightness(brightness) {
    if (brightness <= 0) {
      this.myStatus = false;
      document.querySelector('#brightnessRange').value = 0;
      this.spotLight.intensity = 0;
    } else {
      this.myStatus = true;
      this.brightness = brightness;
      this.spotLight.intensity = this.brightness / 25;
      document.querySelector('#brightnessRange').value = this.brightness;
    }
  }
  toggle() {
    this.myStatus = !this.myStatus;
    if (this.myStatus === true) {
      if (this.brightness <= 5) {
        this.changeBrightness(50);
      } else {
        this.changeBrightness(this.brightness);
      }

    } else {
      this.changeBrightness(0);
    }
  }
}

function createLight(position, target) {
  let sl = new lights(position, target);
  lightArray.push(sl);
}

function switchAllLight() {
  lightArray.forEach((item) => {
    item.toggle();
  });
}

function changeAllBrightness(brightness) {
  lightArray.forEach((item) => {
    item.changeBrightness(brightness);
  });
}


lights.id = 0;
var lightArray = [];

document.querySelector('#lightOnOff').onclick = function() {
  switchAllLight();
};
document.querySelector('#brightnessRange').oninput = function() {
  changeAllBrightness(this.value);
};

init();
animate();

function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(400, 30, 250);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  //controls.enablePan=false;
  //controls.enableRotate=false;
  //controls.enableZoom=false; 
  ////////////////////////////////////////////////////////
  //var gridXZ = new THREE.GridHelper(750, 20, 'red', 'white');
  //scene.add(gridXZ);

  var floorTex = new THREE.TextureLoader().load("https://i.imgur.com/yS9BzVd.jpg");
  floorTex.repeat.set(37, 25);
  floorTex.wrapS = THREE.RepeatWrapping;
  floorTex.wrapT = THREE.RepeatWrapping;

  //MeshLambertMaterial()

  var floor = new THREE.Mesh(new THREE.PlaneGeometry(750, 500), new THREE.MeshLambertMaterial({
    map: floorTex
  }));
  floor.rotation.x = -Math.PI / 2;
  var ceiling = new THREE.Mesh(new THREE.PlaneGeometry(750, 500), new THREE.MeshLambertMaterial());
  ceiling.position.set(0, 150, 0);
  ceiling.rotation.x = Math.PI / 2;

  var wall = new THREE.Mesh(new THREE.PlaneGeometry(750, 150), new THREE.MeshLambertMaterial());
  var wall1 = wall.clone();
  var wall2 = wall.clone();
  var wall3 = wall.clone();
  var wall4 = wall.clone();
  wall1.position.set(0, 75, -250);
  wall2.position.set(375, 75, 0);
  wall2.scale.x = 2 / 3;
  wall2.rotation.y = -Math.PI / 2;
  wall3.position.set(-375, 75, 0);
  wall3.scale.x = 2 / 3;
  wall3.rotation.y = Math.PI / 2;
  wall4.position.set(0, 75, 250);
  wall4.rotation.y = Math.PI;

  var wall5 = new THREE.Mesh(new THREE.BoxGeometry(250, 150, 253), new THREE.MeshLambertMaterial());
  wall5.position.set(0, 75, 126.5);
  var wall6 = wall5.clone();
  wall6.scale.set(65 / 250, 75 / 150, 7 / 253);
  wall6.position.set(157.5, 37.5, 129.5);
  var wall7 = wall6.clone();
  wall7.position.set(342.5, 37.5, 129.5);

  var wall8 = wall6.clone();
  wall8.scale.set(135 / 250, 1, 6 / 253);
  wall8.position.set(307.5, 75, 3);
  var wall9 = wall6.clone();
  wall9.scale.set(60 / 250, 75 / 150, 6 / 253);
  wall9.position.set(210, 112.5, 3);
  var wall10 = wall6.clone();
  wall10.scale.set(55 / 250, 1, 6 / 253);
  wall10.position.set(152.5, 75, 3);

  var wall11 = wall6.clone();
  wall11.position.set(342.5, 37.5, -126.5);
  var wall12 = wall6.clone();
  wall12.position.set(157.5, 37.5, -126.5);

  var wall13 = wall6.clone();
  wall13.scale.set(135 / 250, 1, 6 / 253);
  wall13.position.set(-307.5, 75, 3);
  var wall14 = wall6.clone();
  wall14.scale.set(60 / 250, 75 / 150, 6 / 253);
  wall14.position.set(-210, 112.5, 3);
  var wall15 = wall6.clone();
  wall15.scale.set(55 / 250, 1, 6 / 253);
  wall15.position.set(-152.5, 75, 3);

  var wall16 = wall6.clone();
  wall16.scale.set(120 / 250, 75 / 150, 7 / 253);
  wall16.position.set(0, 37.5, -73.5);

  var wall17 = wall6.clone();
  wall17.scale.set(120 / 250, 75 / 150, 7 / 253);
  wall17.position.set(-250, 37.5, -125);

  var wall18 = wall6.clone();
  wall18.position.set(-271, 37.5, 184);
  wall18.scale.set(58 / 250, 75 / 150, 7 / 253);
  var wall19 = wall6.clone();
  wall19.position.set(-271, 37.5, 71);
  wall19.scale.set(58 / 250, 75 / 150, 7 / 253);

  ////////////
  var wall01 = wall6.clone();
  wall01.position.set(250, 37.5, 127.5);
  wall01.scale.set(120 / 250, 75 / 150, 7 / 253);
  wall01.rotation.y = Math.PI / 2;
  var wall02 = wall01.clone();
  wall02.position.set(250, 37.5, -33.5);
  wall02.scale.set(65 / 250, 75 / 150, 7 / 253);
  var wall03 = wall01.clone();
  wall03.position.set(250, 37.5, -217.5);
  wall03.scale.set(65 / 250, 75 / 150, 7 / 253);


  var wall04 = wall01.clone();
  wall04.position.set(122, 75, -69);
  wall04.scale.set(138 / 250, 1, 6 / 253);
  var wall05 = wall01.clone();
  wall05.position.set(122, 112.5, -166.5);
  wall05.scale.set(57 / 250, 75 / 150, 6 / 253);
  var wall06 = wall01.clone();
  wall06.position.set(122, 75, -222.5);
  wall06.scale.set(55 / 250, 1, 6 / 253);

  var wall07 = wall01.clone();
  wall07.position.set(-122, 75, -69);
  wall07.scale.set(138 / 250, 1, 6 / 253);
  var wall08 = wall01.clone();
  wall08.position.set(-122, 112.5, -166.5);
  wall08.scale.set(57 / 250, 75 / 150, 6 / 253);
  var wall09 = wall01.clone();
  wall09.position.set(-122, 75, -222.5);
  wall09.scale.set(55 / 250, 1, 6 / 253);

  var wall010 = wall01.clone();
  wall010.position.set(-56.5, 37.5, -106);
  wall010.scale.set(58 / 250, 75 / 150, 7 / 253);
  var wall011 = wall01.clone();
  wall011.position.set(56.5, 37.5, -106);
  wall011.scale.set(58 / 250, 75 / 150, 7 / 253);

  var wall012 = wall01.clone();
  wall012.position.set(0, 37.5, -217.5);
  wall012.scale.set(65 / 250, 75 / 150, 7 / 253);

  var wall013 = wall01.clone();
  wall013.position.set(-250, 37.5, -125);
  wall013.scale.set(120 / 250, 75 / 150, 7 / 253);

  var wall014 = wall01.clone();
  wall014.position.set(-183.5, 37.5, 127.5);
  wall014.scale.set(120 / 250, 75 / 150, 7 / 253);

  var wall015 = wall01.clone();
  wall015.position.set(-303.5, 37.5, 127.5);
  wall015.scale.set(120 / 250, 75 / 150, 7 / 253);

  ////////////////

  scene.add(floor, ceiling);
  /////////////////
  scene.add(wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10, wall11, wall12, wall13, wall14, wall15, wall16, wall17, wall18, wall19);
  ////////////////////
  scene.add(wall01, wall02, wall03, wall04, wall05, wall06, wall07, wall08, wall09, wall010, wall011, wall012, wall013, wall014, wall015);
  ////////////
  var bench = buildBench();
  var bench1 = bench.clone();
  var bench2 = bench.clone();
  var bench3 = bench.clone();
  var bench4 = bench.clone();
  var bench5 = bench.clone();
  var bench6 = bench.clone();
  var bench7 = bench.clone();
  var bench8 = bench.clone();

  bench1.position.set(300, 0, 220);
  bench2.position.set(320, 0, 50);
  bench3.position.set(300, 0, -20);
  bench4.position.set(175, 0, -230);
  bench5.position.set(-70, 0, -230);
  bench6.position.set(-165, 0, -230);
  bench7.position.set(-350, 0, -30);
  bench7.rotation.y = Math.PI / 2;
  bench8.position.set(-350, 0, 125);
  bench8.rotation.y = Math.PI / 2;
  scene.add(bench1, bench2, bench3, bench4, bench5, bench6, bench7, bench8);

  var ambientLight = new THREE.AmbientLight(0xffa95c, 0.1);
  const pointLight = new THREE.PointLight(0xffffff, 0.2);
  pointLight.castShadow = true;
  var pointLight1 = pointLight.clone();
  var pointLight2 = pointLight.clone();
  var pointLight3 = pointLight.clone();
  var pointLight4 = pointLight.clone();
  pointLight1.position.set(375, 100, 250);
  pointLight2.position.set(-375, 100, 250);
  pointLight3.position.set(375, 100, -250);
  pointLight4.position.set(-375, 100, -250);
  scene.add(pointLight1, pointLight2, pointLight3, pointLight4, ambientLight);

  var paintA1 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/51zTHOz.jpg?1")
  }));
  paintA1.position.set(342.5, 40, 133.5);

  var paintA2 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/dLcvaXa.jpg")
  }));
  paintA2.position.set(157.5, 40, 133.5);

  var paintA3 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/2VybL8L.jpg")
  }));
  paintA3.position.set(157.5, 40, -120.5);

  var paintA4 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/0Yalxt3.jpg")
  }));
  paintA4.position.set(342.5, 40, -120.5);

  var paintA5 = new THREE.Mesh(new THREE.PlaneGeometry(77.6965265, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/rL8Naxv.jpg")
  }));
  paintA5.position.set(0, 40, -69.5);

  var paintA6 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/jF4OUGB.jpg")
  }));
  paintA6.position.set(-220, 40, -120);

  var paintA7 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/MeHIlV1.jpg")
  }));
  paintA7.position.set(-280, 40, -120);

  var paintA8 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/CbyU8IE.png")
  }));
  paintA8.position.set(-270, 40, 75);

  var paintA9 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/8LJxDwx.png"),
    transparent: true
  }));
  paintA9.position.set(-270, 40, 188);

  scene.add(paintA1, paintA2, paintA3, paintA4, paintA5, paintA6, paintA7, paintA8, paintA9);
  /////////////
  var paintB1 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/HruwPVu.jpg")
  }));
  paintB1.position.set(342.5, 40, 125.5);
  paintB1.rotation.y += Math.PI;

  var paintB2 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/yBOIynE.jpg")
  }));
  paintB2.position.set(157.5, 40, 125.5);
  paintB2.rotation.y += Math.PI;

  var paintB3 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/G4VgQgf.jpg")
  }));
  paintB3.position.set(157.5, 40, -130.5);
  paintB3.rotation.y += Math.PI;

  var paintB4 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/2GN1Pw0.jpg")
  }));
  paintB4.position.set(342.5, 40, -130.5);
  paintB4.rotation.y += Math.PI;

  var paintB5 = new THREE.Mesh(new THREE.PlaneGeometry(77.6965265, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/Ar74Dz4.jpg")
  }));
  paintB5.position.set(0, 40, -77.5);
  paintB5.rotation.y += Math.PI;

  var paintB6 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/yGn47GO.jpg")
  }));
  paintB6.position.set(-220, 40, -129);
  paintB6.rotation.y += Math.PI;

  var paintB7 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/DAYcGmw.jpg")
  }));
  paintB7.position.set(-280, 40, -129);
  paintB7.rotation.y += Math.PI;

  var paintB8 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/775Nx59.jpg")
  }));
  paintB8.position.set(-270, 40, 67);
  paintB8.rotation.y += Math.PI;

  var paintB9 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/3yA9aYh.jpg")
  }));
  paintB9.position.set(-270, 40, 179);
  paintB9.rotation.y += Math.PI;

  scene.add(paintB1, paintB2, paintB3, paintB4, paintB5, paintB6, paintB7, paintB8, paintB9);

  ///////
  var paintC1 = new THREE.Mesh(new THREE.PlaneGeometry(77.6965265, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/IJYTGs2.jpg")
  }));
  paintC1.position.set(254, 40, 125);
  paintC1.rotation.y += Math.PI / 2;

  var paintC2 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/hPgJqFb.jpg")
  }));
  paintC2.position.set(254, 40, -35.5);
  paintC2.rotation.y += Math.PI / 2;

  var paintC3 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/gSdnAwH.jpg")
  }));
  paintC3.position.set(254, 40, -217.5);
  paintC3.rotation.y += Math.PI / 2;

  var paintC4 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/inTFXo3.png")
  }));
  paintC4.position.set(4, 40, -217.5);
  paintC4.rotation.y += Math.PI / 2;

  var paintC5 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/f3mYbH7.png")
  }));
  paintC5.position.set(60.5, 40, -105.5);
  paintC5.rotation.y += Math.PI / 2;

  var paintC6 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/JPvyJYF.png")
  }));
  paintC6.position.set(-52.5, 40, -105.5);
  paintC6.rotation.y += Math.PI / 2;

  var paintC7 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/A7kfg8E.jpg")
  }));
  paintC7.position.set(-246, 40, -95);
  paintC7.rotation.y += Math.PI / 2;

  var paintC8 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/UUam5Vh.jpg")
  }));
  paintC8.position.set(-246, 40, -155);
  paintC8.rotation.y += Math.PI / 2;

  var paintC9 = new THREE.Mesh(new THREE.PlaneGeometry(77.6965265, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/HS79Jqy.png")
  }));
  paintC9.position.set(-179.5, 40, 125);
  paintC9.rotation.y += Math.PI / 2;

  var paintC10 = new THREE.Mesh(new THREE.PlaneGeometry(77.6965265, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/ofpOAcn.jpg")
  }));
  paintC10.position.set(-299.5, 40, 125);
  paintC10.rotation.y += Math.PI / 2;

  scene.add(paintC1, paintC2, paintC3, paintC4, paintC5, paintC6, paintC7, paintC8, paintC9, paintC10);
  ///////
  var paintD1 = new THREE.Mesh(new THREE.PlaneGeometry(77.6965265, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/vfoCWpY.jpg")
  }));
  paintD1.position.set(246, 40, 125);
  paintD1.rotation.y -= Math.PI / 2;

  var paintD2 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/ZpLaASb.png")
  }));
  paintD2.position.set(246, 40, -35.5);
  paintD2.rotation.y -= Math.PI / 2;

  var paintD3 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/PQ6gFOl.jpg")
  }));
  paintD3.position.set(246, 40, -217.5);
  paintD3.rotation.y -= Math.PI / 2;

  var paintD4 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/ZXUHnUT.jpg")
  }));
  paintD4.position.set(-4, 40, -217.5);
  paintD4.rotation.y -= Math.PI / 2;

  var paintD5 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/X8NGUSH.jpg")
  }));
  paintD5.position.set(52.5, 40, -105.5);
  paintD5.rotation.y -= Math.PI / 2;

  var paintD6 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/6M2pxGf.png")
  }));
  paintD6.position.set(-60.5, 40, -105.5);
  paintD6.rotation.y -= Math.PI / 2;

  var paintD7 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/DTxzRVB.jpg")
  }));
  paintD7.position.set(-254, 40, -95);
  paintD7.rotation.y -= Math.PI / 2;

  var paintD8 = new THREE.Mesh(new THREE.PlaneGeometry(40.68986568, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/0tuhWs4.jpg")
  }));
  paintD8.position.set(-254, 40, -155);
  paintD8.rotation.y -= Math.PI / 2;

  var paintD9 = new THREE.Mesh(new THREE.PlaneGeometry(77.6965265, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/MsGRHOq.png")
  }));
  paintD9.position.set(-187.5, 40, 125);
  paintD9.rotation.y -= Math.PI / 2;

  var paintD10 = new THREE.Mesh(new THREE.PlaneGeometry(77.6965265, 50), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("https://i.imgur.com/SSLa8sh.jpg")
  }));
  paintD10.position.set(-307.5, 40, 125);
  paintD10.rotation.y -= Math.PI / 2;

  scene.add(paintD1, paintD2, paintD3, paintD4, paintD5, paintD6, paintD7, paintD8, paintD9, paintD10);

  createLight(new THREE.Vector3(342.5, 140, 240), paintA1);
  createLight(new THREE.Vector3(157.5, 140, 240), paintA2);
  createLight(new THREE.Vector3(157.5, 140, -10), paintA3);
  createLight(new THREE.Vector3(342.5, 140, -10), paintA4);
  createLight(new THREE.Vector3(0, 140, -10), paintA5);
  createLight(new THREE.Vector3(-135, 140, -10), paintA6);
  createLight(new THREE.Vector3(-365, 140, -10), paintA7);
  createLight(new THREE.Vector3(-270, 140, 100), paintA8);
  createLight(new THREE.Vector3(-270, 140, 240), paintA9);

  createLight(new THREE.Vector3(342.5, 140, 10), paintB1);
  createLight(new THREE.Vector3(157.5, 140, 10), paintB2);
  createLight(new THREE.Vector3(157.5, 140, -240), paintB3);
  createLight(new THREE.Vector3(342.5, 140, -240), paintB4);
  createLight(new THREE.Vector3(0, 140, -125), paintB5);
  createLight(new THREE.Vector3(-135, 140, -240), paintB6);
  createLight(new THREE.Vector3(-365, 140, -240), paintB7);
  createLight(new THREE.Vector3(-270, 140, 20), paintB8);
  createLight(new THREE.Vector3(-270, 140, 150), paintB9);

  createLight(new THREE.Vector3(365, 140, 125), paintC1);
  createLight(new THREE.Vector3(365, 140, -35.5), paintC2);
  createLight(new THREE.Vector3(365, 140, -217.5), paintC3);
  createLight(new THREE.Vector3(110, 140, -217.5), paintC4);
  createLight(new THREE.Vector3(110, 140, -105.5), paintC5);
  createLight(new THREE.Vector3(-20, 140, -105.5), paintC6);
  createLight(new THREE.Vector3(-135, 140, -95), paintC7);
  createLight(new THREE.Vector3(-135, 140, -155), paintC8);
  createLight(new THREE.Vector3(-135, 140, 125), paintC9);
  createLight(new THREE.Vector3(-270, 140, 125), paintC10);

  createLight(new THREE.Vector3(135, 140, 125), paintD1);
  createLight(new THREE.Vector3(135, 140, -35.5), paintD2);
  createLight(new THREE.Vector3(135, 140, -217.5), paintD3);
  createLight(new THREE.Vector3(-105, 140, -217.5), paintD4);
  createLight(new THREE.Vector3(20, 140, -105.5), paintD5);
  createLight(new THREE.Vector3(-105, 140, -105.5), paintD6);
  createLight(new THREE.Vector3(-365, 140, -95), paintD7);
  createLight(new THREE.Vector3(-365, 140, -155), paintD8);
  createLight(new THREE.Vector3(-250, 140, 125), paintD9);
  createLight(new THREE.Vector3(-365, 140, 125), paintD10);

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

function setViewPoint(point) {
  switch (point) {
    case 1:
      camera.position.set(215, 30, -300);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      break;
    case 2:
      camera.position.set(-250, 700, 250);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      break;
    default:
      break;
  }
}

function animate() {

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}
