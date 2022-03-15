import bug from './bug.png'
import dark from './dark.png'
import dragon from './dragon.png'
import electric from './electr.png'
import fairy from './fairy.png'
import fighting from './fight.png'
import fire from './fire.png'
import flying from './flying.png'
import ghost from './ghost.png'
import grass from './grass.png'
import ground from './ground.png'
import ice from './ice.png'
import normal from './normal.png'
import poison from './poison.png'
import psych from './psych.png'
import rock from './rock.png'
import steel from './steel.png'
import water from './water.png'

const types = {
  bug:{
    img: bug,
    name: 'bug',
    weak: ["fire", "flying", 'rock'],
    strong: ['grass', 'psych', 'dark']
  },
  dark:{
    img: dark,
    name: 'dark',
    weak: ['fighting', 'bug', 'fairy'],
    strong: ['psych', 'ghost'],
  },
  dragon:{
    img: dragon,
    name: 'dragon',
    weak: ['ice', 'dragon', 'fairy'],
    strong: ['dragon']
  },
  electric:{
    img: electric,
    name: 'electric',
    weak: ['ground'],
    strong: ['water', "flying"]
  },
  fairy:{
    img: fairy,
    name: 'fairy',
    weak: ['poison', 'steel'], 
    strong: ['fighting', 'dragon', 'dark']
  },
  fighting:{
    img: fighting,
    name: 'fighting',
    weak: ["flying", 'psych', 'fairy'], 
    strong: ['normal', 'ice', 'rock', 'dark', 'steel'],
  },
  fire:{
    img: fire,
    name: 'fire',
    weak: ['water', 'ground', 'rock'],
    strong: ['grass', 'ice', 'bug', 'steel']
  },
  flying:{
    img: flying,
    name: 'flying',
    weak: ['electric', 'ice', 'rock'],
    strong: ['grass', 'fighting', 'bug']
  },
  ghost:{
    img: ghost,
    name: 'ghost',
    weak: ['ghost', 'dark'],
    strong: ['psych', 'ghost'],
  },
  grass:{
    img: grass,
    name: 'grass',
    weak: ['fire', 'ice', 'poison', "flying", 'bug'], 
    strong: ['water', 'ground', 'rock']
  },
  ground:{
    img: ground,
    name: 'ground',
    weak: ['water', 'grass', 'ice'],
    strong: ["fire", 'electric', 'poison', 'rock', 'steel'],
  },
  ice:{
    img: ice,
    name: 'ice',
    weak: ["fire", 'fighting', 'rock', 'steel'],
    strong: ['grass', 'ground', "flying", 'dragon'],
  },
  normal:{
    img: normal,
    name: 'normal',
    weak: ['fighting'],
    strong: ['ghost']
  },
  poison:{
    img: poison,
    name: 'poison',
    weak: ['ground', 'psych'],
    strong: ['grass', 'fairy']
  },
  psychic:{
    img: psych,
    name: 'psychic',
    weak: ['bug', 'ghost', 'dark'],
    strong: ['fighting', 'poison']
  },
  psych:{
    img: psych,
    name: 'psychic',
    weak: ['bug', 'ghost', 'dark'],
    strong: ['fighting', 'poison']
  },
  rock:{
    img: rock,
    name: 'rock',
    weak: ['water', 'grass', 'fighting', 'ground', 'steel'], 
    strong: ["fire", 'ice', "flying", 'bug']
  },
  steel:{
    img: steel,
    name: 'steel',
    weak: ["fire", 'fighting', 'ground'],
    strong: ['ice', 'rock', 'fairy']
  },
  water:{
    img: water,
    name: 'water',
    weak: ['electric', 'grass'], 
    strong: ["fire", 'ground', 'rock']
  },
}

export default types;