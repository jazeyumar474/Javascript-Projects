function bulbOn() {
    const bulbImg = document.querySelector('.bulb_img');
    bulbImg.setAttribute('src', "images/bulbOn.png");
    bulbImg.classList.add("glow");

  }
  
  function bulbOff() {
    const bulbImg = document.querySelector('.bulb_img');
    bulbImg.setAttribute('src', "images/bulbOff.png");
    bulbImg.classList.remove('glow'); 
  }