import Player from '../src/Player';

test('Player construction', () => {
  const player = new Player('John', 'X');
  expect(player.name).toBe('John');
  expect(player.symbol).toBe('X');
});
