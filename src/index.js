const Player = (function () {
  function Player(name, symbol, { color = '#fff' }) {
    this.name = name;
    this.symbol = symbol;
    this.color = color;
  }

  return Player;
})();

