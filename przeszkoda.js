class Przeszkoda {
  constructor(obs_x, obs_height, isTop) {
    this.obs_width = 90; //szerokość przeszkody
    this.obs_x = obs_x; //wspołrzędna lewego górnego wierzchołka przeszkody
    this.vel = createVector(-7, 0); //prędkość przeszkody, 7ppf przy 30fps daje 210px/s (wygenerowanie 90px przeszkody zajmie 0.43s)
    this.windowCheck = 2 * (this.obs_width / -this.vel.x) / 30; // wartosc czasu dla szerokosci dwoch przeszkod
    console.log("windowCheck:", this.windowCheck);
    this.obs_height = obs_height; //wysokość przeszkody
    this.isTop = isTop; //sprawdza, czy przeszkoda powinna znajdować się na górze
    this.color = color(113, 215, 217); //domyslny kolor przeszkody
  }

  update = function () {
    this.obs_x += this.vel.x; //dodanie prędkości do pozycji przeszkody
  };

  draw = function () { //rysowanie przeszkody
    stroke(0, 0);
    fill(this.color);
    if (this.isTop) { //jeżeli isTop jest true, to przeszkoda jest na górze
      rect(this.obs_x, 0, this.obs_width, this.obs_height);
    } else { //jeżeli nie, to na dole
      rect(
        this.obs_x,
        height - this.obs_height,
        this.obs_width,
        this.obs_height
      );
    }
  };

  offscreen = function () { //funkcja sprawdzająca, czy przeszkoda wyszła poza ekran
    return this.obs_x < -this.obs_width;
  };

  // Metoda ustawiająca kolor przeszkody na czerwony, jeśli jest generowana wystarczająco blisko innej przeszkody
  setColorRed = function () {
    this.color = color(255, 0, 0); // Ustawienie koloru na czerwony
  };

  // Metoda sprawdzająca, czy przeszkoda jest generowana wystarczająco blisko innej przeszkody
  checkProximity = function (other) {
    if (abs(this.obs_x - other.obs_x) <= this.windowCheck * 30) {
      // Jeśli różnica odległości między przeszkodami jest mniejsza lub równa dwukrotności czasu w klatkach
      this.setColorRed(); // Ustaw kolor na czerwony
      other.setColorRed(); // Ustaw kolor przeszkody drugiej na czerwony
    }
  };
}
