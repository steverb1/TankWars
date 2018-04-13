/* global require, module */
'use strict'

const API = require('claudia-api-builder')
const api = new API()
module.exports = api

api.get('/info', function () {
  return {
    name: 'tanky', // <== Change this string
    owner: 'mobber' // <== Change this string
  }
})

api.post('/command', function (req) {
  let map = req.body // the request object is described here http://www.marcusoft.net/tankwars/pages/api.html


  var wallAt = function (point) {
  			return map.walls.find(function (wall) {
  				return wall.x === point.x && wall.y === point.y;
  			});
  		},
  		enemyAt = function (point) {
  			return map.enemies.find(function (tank) {
  				return tank.x === point.x && tank.y === point.y;
  			});
  		},
  		movements = {
  			top: { x: 0, y: -1 },
  			left: { x: -1, y: 0 },
  			bottom: {x: 0, y: 1},
  			right: {x: 1, y: 0}
  		},
  		outsideMap = function (point) {
  			return point.x < 0 || point.x >= map.mapWidth || point.y < 0 || point.y >= map.mapHeight;
  		},
  		hasTarget = function () {
  			var distance, pointAtDistance;
  			for (distance = 0; distance < map.weaponRange; distance++) {
  				pointAtDistance = { x: tank.x + (distance + 1) * movement.x, y: tank.y + (distance + 1) * movement.y };
  				if (wallAt(pointAtDistance) || enemyAt(pointAtDistance)) {
  					return true;
  				}
  			}
  			return false;
  		},
  		tank = map.you,
  		movement = movements[tank.direction],
  		nextField = { x: tank.x + movement.x, y: tank.y + movement.y };


  console.log(map)
  let me = map.you
  let walls = map.walls


  if(outsideMap(nextField)) {
    return {
      command: 'turn-right'
    }
  }

  if (map.enemies[0].x){
    if(tank.x - map.enemies[0].x > 0)
    {
      if (tank.direction === 'left')
        return { command: 'forward'}
      else return {command: 'turn-left'}
    }
    else if (tank.x - map.enemies[0].x < 0)
    {
      if (tank.direction === 'right')
        return { command: 'forward'}
      else return {command: 'turn-right'}
    }
    else if (tank.x - map.enemies[0].x === 0)
    {
      if(hasTarget()) {
        return {
          command: 'fire'
        }
      }

      if(tank.y - map.enemies[0].y < 0)
      {
        if (tank.direction === 'bottom')
          return { command: 'forward'}
        else return {command: 'turn-left'}
      }
      else if (tank.y - map.enemies[0].y > 0)
      {
        if (tank.direction === 'top')
          return { command: 'forward'}
        else return {command: 'turn-right'}
      }
    }
  }

  if(hasTarget()) {
    return {
      command: 'fire'
    }
  }

  return {
    command: 'forward'
    /*
    turn-left: turn 90 degrees counter-clockwise
    turn-right: turn 90 degrees clockwise
    forward: move one field in the direction the tank is facing
    reverse: move one field in the opposite direction
    fire: shoot in the direction the tank is facing
    pass: do nothing
    */
  }
})
