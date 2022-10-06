class Lamp {

  constructor(name) {
    this.name = name + Lamp.id++;
    this.myStatus = true;
    this.mySwitch = false;
    this.switchInterval;
    this.dutycycleType = false;
    this.dutycycle = 0.5;

    let el = document.createElement('div');
    el.id = this.name;
    let bkgd = document.getElementById("bkgd");
    bkgd.appendChild(el);
    this.hue = Math.random() * 360;

    // styles
    el.setAttribute("style", `background-color: hsl(${this.hue}, 90%, 50%);position: absolute; width:5vmin; height:5vmin; border-radius: 100%`);
    this.left = Math.random() * 0.8;
    this.top = Math.random() * 0.8;
    el.style.position = "absolute";
    el.style.left = this.left * 100 + '%';
    el.style.top = this.top * 100 + '%';
  }

  toggle() {
    this.myStatus = !this.myStatus;
    if (this.myStatus === true) {
      $('#' + this.name).css('backgroundColor', `hsl(${this.hue},100%,50%)`);
    } else {
      $('#' + this.name).css('backgroundColor', `hsla(0, 100%, 0%, 0.8)`);
    }
  }

  changeCycle() {
    this.dutycycleType = !this.dutycycleType;
  }

  startBlink() {
    var that = this;
    if (this.dutycycleType === false) {
      this.dutycycle = 0.5;
    } else {
      this.dutycycle = Math.random() * (5 - 1) + 1;
    }
    this.switchInterval = setInterval(function() {
      that.toggle();
    }, this.dutycycle * 1000);
  }

  switchIO() {
    var that = this;
    this.mySwitch = !this.mySwitch;
    if (this.mySwitch === true) {
      that.startBlink();
    } else {
      clearInterval(this.switchInterval);
      if (this.myStatus === true) {
        that.toggle();
      }
    }
  }
}


Lamp.id = 0; // class variable
var lightArray = [];

for (let i = 0; i < 10; i++) {
  let ll = new Lamp('light');
  lightArray.push(ll);
  ll.toggle();
}

function switchAllLight() {
  lightArray.forEach((item) => {
    item.switchIO();
  });
}

function changeDutyCycle() {
  lightArray.forEach((item) => {
    item.changeCycle();
  });
}
