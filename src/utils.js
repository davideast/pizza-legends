
export function withGrid(number) {
  return number * 16;
}

export function asGridCoord(x,y) {
  return `${withGrid(x)},${withGrid(y)}`;
}

export function nextPosition(initialX, initialY, direction) {
  const size = 16;
  let x = initialX;
  let y = initialY;
  if(direction === 'left') {
    x -= size;
  } else if(direction === 'right') {
    x += size;
  } else if(direction === 'up') {
    y -= size;
  } else if(direction === 'down') {
    y += size;
  }
  return { x, y };
 }
