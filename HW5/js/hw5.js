var camera, scene, renderer;
var circle, pos, vel;
var plane;
var workingAni;
var collideCounter = 0;
var runningStatus = false;
var audioOn = false;
var collisionSound = new Audio('http://drhong.ddns.net:8182/xampp/htdocs/files/sounds/bounce-8111.mp3');
collisionSound.playbackRate = 5;
var clickSound = new Audio('http://drhong.ddns.net:8183/files/sounds/rclick-13693.mp3');
clickSound.playbackRate = 1.5;
var pointOnRectangle;
init();
animate();
cancelAnimationFrame(workingAni);

function clamp(min, max, value) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

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

  camera = new THREE.OrthographicCamera(-100, 100, 100, -100, -10, 100);
  camera.position.z = 50;

  ////////////////////////////////////////////////////////
  var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
  gridXZ.rotation.x = Math.PI / 2;
  //scene.add(gridXZ);

  let geometry = new THREE.BufferGeometry();
  let points = [];
  points.push(
    new THREE.Vector3(-80, -80, 0),
    new THREE.Vector3(80, -80, 0),
    new THREE.Vector3(80, 80, 0),
    new THREE.Vector3(-80, 80, 0),
    new THREE.Vector3(-80, -80, 0));
  geometry.setFromPoints(points);
  var border = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: 'red'
  }));
  scene.add(border);

  circle = new THREE.Mesh(new THREE.CircleGeometry(10, 20, 20), new THREE.MeshBasicMaterial({
    color: 'crimson'
  }));
  plane = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), new THREE.MeshBasicMaterial({
    color: 'cyan'
  }));
  plane.position.set(-40, 20);
  scene.add(circle, plane);
  /*
  if(Math.sqrt(Math.pow()+Math.pow(circle.position.y-10))<=circle.scale.x * 10){
  		vel.x *= -1;vel.y *= -1;
  }
  */
  pos = new THREE.Vector3();
  vel = new THREE.Vector3(10, 20);
  pointOnRectangle = new THREE.Vector3();
}
var coords;
function getPos(){
	$.get('http://drhong.ddns.net:8185/api?circle_r=' + circle.scale.x + '&pos_x=' + circle.position.x + '&pos_y=' + circle.position.y + '&plane_pos_x=' + plane.position.x + '&plane_pos_y=' + plane.position.y + '&point_on_rectangle_x=' + pointOnRectangle.x + '&point_on_rectangle_y=' + pointOnRectangle.y, function(data) {
    if (data && data.output) {
      coords = data.output.split(" ");
      //console.log (theta + ": " + coords[0] + ", " + coords[1]);
      vel.x*=coords[0];
	  vel.y*=coords[1];
       if (coords[2] == 1) {
        if (audioOn == true)
          collisionSound.play();
        $("#debugLog").html("Collided " + (++collideCounter) + " times!");
      } 
		pos.add(vel.clone().multiplyScalar(dt));
        circle.position.copy(pos); 
    }
  });
}
  var i=0;
  var dt = 0.15;
function animate() {
  workingAni = requestAnimationFrame(animate);
  pointOnRectangle.x = clamp(plane.position.x - 20, plane.position.x + 20, circle.position.x);
  pointOnRectangle.y = clamp(plane.position.y - 10, plane.position.y + 10, circle.position.y); 
  if(i++>5){
	  getPos();
	  i=0;
  }
  renderer.render(scene, camera);
  /*
    if (pos.x > 80 - circle.scale.x * 10 || pos.x < -80 + circle.scale.y * 10)
      vel.x *= -1;
    if (pos.y > 80 - circle.scale.x * 10 || pos.y < -80 + circle.scale.y * 10)
      vel.y *= -1;
  if (Math.round(Math.sqrt(Math.pow(pointOnRectangle.x - circle.position.x, 2) + Math.pow(pointOnRectangle.y - circle.position.y, 2))) <= circle.scale.x * 10) {
    if (pointOnRectangle.x == plane.position.x + 20 || pointOnRectangle.x == plane.position.x - 20) {
      vel.x *= -1;
    }
    if (pointOnRectangle.y == plane.position.y + 10 || pointOnRectangle.y == plane.position.y - 10) {
      vel.y *= -1;
    }
    if (audioOn == true)
      collisionSound.play();
    $("#debugLog").html("Collided " + (++collideCounter) + " times!");
  }
  */

  /*
    if (pos.x > 0){
      circle.material.color.set('cyan');
      if (audioOn==true)
        collisoinSound.play();
    }else
      circle.material.color.set('yellow');
  */
}
$("#radiusRange").on('input', function() {
  circle.scale.x = this.value / 50;
  circle.scale.y = this.value / 50;
  renderer.render(scene, camera);
});
/*
$("#speedRange").on('input', function() {
  dt = this.value * 3 / 1000;
  console.log(dt);
});
*/
$("#audioCheckBox").click(function() {
  clickSound.play();
  audioOn = !audioOn;
  console.log(audioOn);
});
$("#startBtn").click(function() {
  runningStatus = !runningStatus;
  if (runningStatus) {
    if (audioOn == true)
      clickSound.play();
    this.innerHTML = "Pause";
    requestAnimationFrame(animate);
  } else {
    if (audioOn == true)
      clickSound.play();
    this.innerHTML = "Start";
    cancelAnimationFrame(workingAni);
  }
  console.log(runningStatus);
});
