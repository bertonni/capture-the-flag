// const field = document.querySelector('#field');
const main = document.querySelector('#main');

main.setAttribute("tabindex", 1);
main.focus();

const movePlayer = (event) => {
  const keyPressed = event.keyCode;
  
  const position = {
    id: socket.id,
    team: '',
    left: 0,
    top: 0
  }
  // player.style.top === "" ? 200 : parseInt(player.style.top.replace('px', '').trim(), 10)
  const player = position.team === '' || position.team === 'blue' ? document.querySelector('#player-team-1') : document.querySelector('#player-team-2');

  position.left = player.style.left === "" ? 0 : parseInt(player.style.left.replace('px', '').trim(), 10);
  position.top = player.style.top === "" ? 200 : parseInt(player.style.top.replace('px', '').trim(), 10);

  let left;
  let top;
  switch (keyPressed) {
    case 65:
    case 37:
      left = player.style.left;
      if (!left || left.trim() === "" || left.replace('px', '').trim() === '0') break;
      left = player.style.left.replace('px', '').trim();
      left = parseInt(left, 10);
      left -= 20;
      player.style.left = `${left}px`;
      break;
    case 68:
    case 39:
      left = player.style.left;
      if (!left || left.trim() === "") {
        player.style.left = '20px';
        break;
      }
      if (parseInt(left.replace('px', '').trim(), 10) >= 780) {
        player.style.left = '780px';
        break;
      }
      left = player.style.left.replace('px', '').trim();
      left = parseInt(left, 10);
      left += 20;
      player.style.left = `${left}px`;
      break;
    case 87:
    case 38:
      top = player.style.top;
      if (top.replace('px', '').trim() === '0') break;
      if (!top || top.trim() === "") {
        player.style.top = '180px';
        break;
      }
      top = player.style.top.replace('px', '').trim();
      top = parseInt(top, 10);
      top -= 20;
      player.style.top = `${top}px`;
      break;
    case 83:
    case 40:
      top = player.style.top;
      if (!top || top.trim() === "") {
        player.style.top = '220px';
        break;
      }
      if (parseInt(top.replace('px', '').trim(), 10) >= 380) {
        player.style.top = '380px';
        break;
      }
      top = player.style.top.replace('px', '').trim();
      top = parseInt(top, 10);
      top += 20;
      player.style.top = `${top}px`;
      break;
  }

  socket.emit('move', position);

  socket.on('move', (result) => {
    console.log('return', result);
    position = result;
    if (result.team === 'blue') {
      
      document.querySelector('#player-team-1').style.left = result.left;
      document.querySelector('#player-team-1').style.top = result.top;
    } else {
      document.querySelector('#player-team-2').style.left = result.left;
      document.querySelector('#player-team-2').style.top = result.top;
    }
  })
};

// left: 65 or 37
// right: 68 or 39
// top: 87 or 38
// bottom: 83 or 40

// field.addEventListener('keydown', movePlayer);
main.addEventListener('keydown', movePlayer);