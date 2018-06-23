/**
 * Created by dell on 2018/4/26.
 */
(function (window) {
  // 启用严格模式
  'use strict';
  // 1.创建Game构造函数
  function Game(options) {
    options = options || {};
    this.food = options.food || new Food();
    this.snake = options.snake || new Snake();
  }

  // 2.给Game原型对象添加start方法,开始游戏
  Game.prototype.start = function (target, gradeValue, point) {
    // 2.1 声明一个that用于保存this指向
    var that = this;
    that.startRender(target);
    that.startInterval(target, gradeValue, point);
    that.startDirection();
  }
  // 2.2 将food和snake渲染到页面中
  Game.prototype.startRender = function (target) {
    this.food.render(target, this.snake);
    this.snake.render(target);
  }
  // 2.3 设置定时器让snake自动移动
  Game.prototype.startInterval = function (target, gradeValue, point){
    var that = this;
    // 2.3.1 判断用户选择的游戏模式,调节游戏速度
    var time = 400;
    switch (gradeValue) {
      case 'easy':
        time = 400;
        break;
      case 'medium':
        time = 250;
        break;
      case 'hard':
        time = 150;
        break;
      case 'hell':
        time = 50;
        break;
    }
    var timerId = setInterval(function () {
      that.snake.move(target, that.food, point);
      // 2.3.2 判断蛇头与边框距离,决定是否game over
      if (that.snake.body[0].x < 0 || that.snake.body[0].y < 0 || that.snake.body[0].x >= parseInt(target.offsetWidth / that.snake.width) || that.snake.body[0].y >= parseInt(target.offsetHeight / that.snake.height)) {
        // 2.3.2.1 创建game over提示框
        var over = document.createElement('div');
        target.appendChild(over);
        over.innerHTML = 'GAME OVER';
        over.className = 'over';
        // 2.3.2.2 清除定时器
        clearInterval(timerId);
      }

      // 2.3.3 判断蛇头与身体位置,决定是否game over
      for (var i = 4; i < that.snake.body.length; i++) {
        if (that.snake.body[0].x === that.snake.body[i].x && that.snake.body[0].y === that.snake.body[i].y) {
          // 2.3.3.1 创建'你居然吃了自己!'提示框
          var over = document.createElement('div');
          target.appendChild(over);
          over.innerHTML = '你居然吃了自己!';
          over.className = 'over';
          // 2.3.3.2清除定时器
          clearInterval(timerId);
        }
      }
    }, time);
  }
  // 2.4 控制蛇的运动方向
  Game.prototype.startDirection = function () {
    var that = this;
    // 2.4.1 设置键盘监听事件,获取用户输入的键盘码
    document.addEventListener('keydown', function (e) {
      // 2.4.2 根据键盘码判断并更改蛇的运动方向
      switch (e.keyCode) {
        case 37:
          if (that.snake.direction !== 'right') {
            that.snake.direction = 'left';
          }
          break;
        case 38:
          if (that.snake.direction !== 'down') {
            that.snake.direction = 'up';
          }
          break;
        case 39:
          if (that.snake.direction !== 'left') {
            that.snake.direction = 'right';
          }
          break;
        case 40:
          if (that.snake.direction !== 'up') {
            that.snake.direction = 'down';
          }
          break;
      }
    })
  }

  // 导出Game
  window.Game = Game;
})(window);