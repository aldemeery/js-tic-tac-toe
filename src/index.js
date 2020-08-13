import Game from './Game';
import Board from './Board';

import './style.css';

const game = new Game(new Board());
game.run();
