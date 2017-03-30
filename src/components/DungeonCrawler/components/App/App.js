import React from 'react';

import Home from './../Home';

// import './app.scss';
import map from './../../map.js';

let canMove = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inHand: 'Knife',
      attack: 5,
      xp: 1,
      level: 1,
      health: 10,
      width: 50,
      height: 50,
      canMove: true,
      hero: [47, 25],
      boss: 100,
    };

    this.handleEvents = this.handleEvents.bind(this);
    this.paintBlack = this.paintBlack.bind(this);
    this.detectCollision = this.detectCollision.bind(this);
    this.statusCheck = this.statusCheck.bind(this);
    this.initialSetup = this.initialSetup.bind(this);
  }

  componentDidMount() {
    this.initialSetup();
  }

  initialSetup() {
    const { height, width, hero } = this.state;
    let [array, enemies, powerup, weapon] = this.makeArray();
    let initArray = JSON.parse(JSON.stringify(array));
    array = this.paintBlack(array, hero);
    array[hero[0]][hero[1]] = 1;

    this.setState({
      enemies,
      powerup,
      initArray,
      weapon,
      array: JSON.parse(JSON.stringify(array)),
      running: true,
    });

    document.addEventListener('keydown', this.handleEvents);
  }

  handleEvents(e) {
    if (!canMove) return;

    canMove = false;
    this.moveHero(e.key);

    setTimeout(() => {
      canMove = true;
    }, 50)
  }

  statusCheck() {
    const { health } = this.state;
    if (health <= 0) {
      document.removeEventListener('keydown', this.handleEvents);
      this.setState({
        status: 'Game Over'
      })
    }
  }

  moveHero(key) {
    const { array, hero } = this.state;
    let upd = [];
    switch (key) {
      case 'ArrowUp':
        upd = this.moveUp(array, hero);
        break;
      case 'ArrowDown':
        upd = this.moveDown(array, hero);
        break;
      case 'ArrowRight':
        upd = this.moveRight(array, hero);
        break;
      case 'ArrowLeft':
        upd = this.moveLeft(array, hero);
        break;
      default:

    }
    if (!upd.length) return;

    const upd2 = this.paintBlack(upd[0], upd[1]);

    this.setState({
      array: upd2,
      hero: upd[1],
    })
  }

  moveUp(dungeon, hero) {
    const height = dungeon.length;
    const width = dungeon[0].length;
    const updHero = [...hero];
    const updDungeon = JSON.parse(JSON.stringify(dungeon))
    updDungeon[hero[0]][hero[1]] = 0;
    updHero[0] = hero[0] - 1;
    if (updHero[0] < 0) return [dungeon, hero];
    const freeToGo = this.detectCollision(updHero);
    if (!freeToGo) return [dungeon, hero];
    updDungeon[updHero[0]][updHero[1]] = 1;
    return [updDungeon, updHero];
  }

  moveDown(dungeon, hero) {
    const height = dungeon.length;
    const width = dungeon[0].length;
    const updHero = [...hero];
    const newArray = JSON.parse(JSON.stringify(dungeon))
    newArray[hero[0]][hero[1]] = 0;
    updHero[0] = updHero[0] + 1;
    if (updHero[0] >= height) return [dungeon, hero];
    const freeToGo = this.detectCollision(updHero);
    if (!freeToGo) return [dungeon, hero];
    newArray[updHero[0]][updHero[1]] = 1;
    return [newArray, updHero];
  }

  moveRight(dungeon, hero) {
    const height = dungeon.length;
    const width = dungeon[0].length;
    const updHero = [...hero];
    const updDungeon = JSON.parse(JSON.stringify(dungeon))
    updDungeon[hero[0]][hero[1]] = 0;
    updHero[1] = hero[1] + 1;
    if (updHero[1] >= width) return [dungeon, hero];
    const freeToGo = this.detectCollision(updHero);
    if (!freeToGo) return [dungeon, hero];
    updDungeon[updHero[0]][updHero[1]] = 1;
    return [updDungeon, updHero];
  }

  moveLeft(dungeon, hero) {
    const height = dungeon.length;
    const width = dungeon[0].length;
    const updHero = [...hero];
    const updDungeon = JSON.parse(JSON.stringify(dungeon))
    updDungeon[hero[0]][hero[1]] = 0;
    updHero[1] = hero[1] - 1;
    if (updHero[1] < 0) return [dungeon, hero];
    const freeToGo = this.detectCollision(updHero);
    if (!freeToGo) return [dungeon, hero];
    updDungeon[updHero[0]][updHero[1]] = 1;
    return [updDungeon, updHero];
  }

  detectCollision(hero) {
    const { health, powerup, enemies, weapon, xp, attack, boss } = this.state;
    const initArray = JSON.parse(JSON.stringify(this.state.initArray));
    const nextField = initArray[hero[0]][hero[1]];
    if (nextField !== 0) {
      if (nextField === '#') return false;
      else if (nextField === 'H') {
        initArray[hero[0]][hero[1]] = 0;
        let value = 0;
        powerup.forEach(item => {
          if (item[0] === hero[0] && item[1] === hero[1]); value = item[2]
        })
        this.setState({
          initArray,
          health: health + value,
        }, () => {
          this.statusCheck();
        });
        return true;
      }
      else if (nextField === 'E') {

        let value = 0;
        let ind = -1;
        enemies.forEach((item, i) => {
          if (item[0] === hero[0] && item[1] === hero[1]) {
            value = item[2];
            ind = i;
          }
        });

        const damage = attack + Math.floor(Math.random() * 4)
        value -= damage;
        enemies[ind][2] = value;

        if (value <= 0) {
          initArray[hero[0]][hero[1]] = 0;

          this.setState({
            initArray,
            xp: xp + 10,
          }, () => {
            this.statusCheck();
          })
          return true;
        }

        this.setState({
          health: health - Math.floor(Math.random() * 5 + 5),
          enemies,
        }, () => {
          this.statusCheck();
        })
        return false;
      }

      else if (nextField === 'W') {
        initArray[hero[0]][hero[1]] = 0;
        this.setState({
          initArray,
          inHand: 'Sword',
          attack: 8,
          xp: xp + 20,
        }, () => {
          this.statusCheck();
        });
        return true;
      }

      else if (nextField === 'B') {

        const damage = attack + Math.floor(Math.random() * 4)
        let value = boss - damage;
        if (value <= 0) {
          initArray[hero[0]][hero[1]] = 0;
          this.setState({
            initArray,
            status: 'You win!'
          })
          return true;
        }

        this.setState({
          health: health - Math.floor(Math.random() * 10 + 10),
          boss: value,
        }, () => {
          this.statusCheck();
        })
        return false;
      }
    }
    return true;
  }

  paintBlack(dungeon, hero) {
    const height = dungeon.length;
    const width = dungeon[0].length;
    const updDungeon = JSON.parse(JSON.stringify(dungeon))
    dungeon.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (Math.abs(hero[0] - i) < 5 && Math.abs(hero[1] - j) < 5) {
          if (this.state.initArray && this.state.initArray[i][j] !== 0) {
            updDungeon[i][j] = this.state.initArray[i][j];
          } else updDungeon[i][j] = 2;
        }
        else updDungeon[i][j] = 0;
      });
    });
    updDungeon[hero[0]][hero[1]] = 1;
    return updDungeon;
  }

  // handleClick() {
  //   console.log(JSON.stringify(this.state.array));
  // }

  toggleCell(i, j) {
    const array = this.state.array;
    if (array[i][j] === 2) array[i][j] = '#';
    else array[i][j] = 2

    this.setState({
      array,
    })
  }

  drawDungeon(height, width) {
    const array = [];
    for (let i = 0; i < height; i++) {
      const subArray = [];
      for (let j = 0; j < width; j++) {
        subArray.push(2);
      }
      array.push(subArray);
    }
    return array;
  }

  makeArray() {
    const height = map.length;
    const width = map[0].length;
    const array = map;
    const enemies = this.generateItems(height, width, this.state.hero, 200);
    const health = this.generateItems(height, width, this.state.hero, 50);
    const weapon = this.generateItems(height, width, this.state.hero, 2);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (enemies.some(enemy => (enemy[0] === i && enemy[1] === j))) {
          array[i][j] = 'E'
        }
        else if (health.some(health => (health[0] === i && health[1] === j))) {
          array[i][j] = 'H'
        }
        else if (weapon.some(weapon => (weapon[0] === i && weapon[1] === j))) {
          array[i][j] = 'W'
        }
      }
    }
    array[4][45] = 'B';
    return [array, enemies, health, weapon];
  }

  generateItems(height, width, hero, count) {
    let items = [];
    for (let i = 0; i < count; i++) {
      let rndH, rndW;
      do {
        rndH = Math.floor(Math.random() * height);
        rndW = Math.floor(Math.random() * width);
      }
      while (rndH === Math.abs(hero[0] - 5) || Math.abs(rndW === hero[1] - 5) || map[rndH][rndW] === '#')
      const value = Math.floor(Math.random() * 5 + 10)
      items.push([rndH, rndW, value]);
    }
    return items;
  }

  render() {
    const { array, generations, population, running, cellSize, width, height, speed, status, health, xp, level, inHand } = this.state;
    const props = {
      array,
      generations,
      population,
      running,
      cellSize,
      width,
      height,
      speed,
      status,
      health,
      xp,
      level,
      inHand,
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
