var v = new THREE.Vector3();
var w = new THREE.Vector3();
var vwVP = new THREE.Vector3();

var vx = document.querySelector('#vx');
var vy = document.querySelector('#vy');
var vz = document.querySelector('#vz');

var wx = document.querySelector('#wx');
var wy = document.querySelector('#wy');
var wz = document.querySelector('#wz');

var vwIP = document.querySelector('#vwIP');

var vwX = document.querySelector('#vwX');
var vwY = document.querySelector('#vwY');
var vwZ = document.querySelector('#vwZ');

if (vx.value === '') {
  vx.value = 0;
}
if (vy.value === '') {
  vy.value = 0;
}
if (vz.value === '') {
  vz.value = 0;
}


if (wx.value === '') {
  wx.value = 0;
}

if (wy.value === '') {
  wy.value = 0;
}
if (wz.value === '') {
  wz.value = 0;
}

if (vwIP.value === '') {
  vwIP.value = 0;
}

if (vwX.value === '') {
  vwX.value = 0;
}
if (vwY.value === '') {
  vwY.value = 0;
}
if (vwZ.value === '') {
  vwZ.value = 0;
}

vx.onchange = function(){
v.setX(vx.value);
vwIP.value=v.dot(w);
vwVP.crossVectors(v,w);
vwX.value=vwVP.x;vwY.value=vwVP.y;vwZ.value=vwVP.z;
};
vy.onchange = function(){
v.setY(vy.value);
vwIP.value=v.dot(w);
vwVP.crossVectors(v,w);
vwX.value=vwVP.x;vwY.value=vwVP.y;vwZ.value=vwVP.z;
};
vz.onchange = function(){
v.setZ(vz.value);
vwIP.value=v.dot(w);
vwVP.crossVectors(v,w);
vwX.value=vwVP.x;vwY.value=vwVP.y;vwZ.value=vwVP.z;
};

wx.onchange = function(){
w.setX(wx.value);
vwIP.value=v.dot(w);
vwVP.crossVectors(v,w);
vwX.value=vwVP.x;vwY.value=vwVP.y;vwZ.value=vwVP.z;
};
wy.onchange = function(){
w.setY(wy.value);
vwIP.value=v.dot(w);
vwVP.crossVectors(v,w);
vwX.value=vwVP.x;vwY.value=vwVP.y;vwZ.value=vwVP.z;
};
wz.onchange = function(){
w.setZ(wz.value);
vwIP.value=v.dot(w);
vwVP.crossVectors(v,w);
vwX.value=vwVP.x;vwY.value=vwVP.y;vwZ.value=vwVP.z;
};

vwIP.value=v.dot(w);
vwVP.crossVectors(v,w);
vwX.value=vwVP.x;vwY.value=vwVP.y;vwZ.value=vwVP.z;
