/**
 * Created by dell on 2018/4/26.
 */
(function (window) {
  // 启用严格模式
  'use strict';
  // 1.创建Snake构造函数
  function Snake(optinos) {
    optinos = optinos ||{};
    this.width = optinos.width || 20;
    this.height = optinos.height || 20;
    this.headColor = optinos.headColor || 'red';
    this.bodyColor = optinos.bodyColor || 'blue';

    // 1.1 设置Snake运动方向
    this.direction = optinos.direction || 'right';
    
    // 1.2 给Snake添加蛇身属性
    this.body = [
      {x : 2, y : 0},
      {x : 1, y : 0},
      {x : 0, y : 0}
    ]
  }
  
  // 2.给Snake的原型对象添加render方法,将蛇渲染到页面中
  Snake.prototype.render = function (target) {
    // 2.1 创建数组arr存储蛇身随机颜色
    var arr = ['pink', 'green', 'yellow', 'white', 'orange', 'skyblue', 'purple', 'gold'];

    // 2.2 创建DOM对象,添加蛇身
    for (var i = 0; i < this.body.length; i++) {
      var spans = document.createElement('span');
      target.appendChild(spans);

      // 2.3 给蛇身添加基本样式
      spans.style.width = this.width + 'px';
      spans.style.height = this.height + 'px';
      spans.style.borderRadius = '35%';
      spans.style.backgroundColor = (i === 0) ? this.headColor : arr[parseInt(Math.random() * arr.length)];

      // 2.4 给蛇设置坐标
      spans.style.position = 'absolute';
      spans.style.left = this.body[i].x * this.width + 'px';
      spans.style.top = this.body[i].y * this.height + 'px';
    }
  };

  // 3.给Snake原型对象添加move方法,让蛇动起来
  Snake.prototype.move = function (target, food, point) {
    // 3.1 为给蛇头增加一个节点,新建一个节点
    var newCode = {
      x : this.body[0].x,
      y : this.body[0].y
    };

    // 3.2 判断新节点运动方向,更改新节点坐标实现蛇的移动
    switch (this.direction) {
      case 'right':
        newCode.x++;
        break;
      case 'left':
        newCode.x--;
        break;
      case 'up':
        newCode.y--;
        break;
      case 'down':
        newCode.y++;
        break;
    }

    // 3.3 将新节点添加到蛇头,根据蛇头坐标和食物坐标判断是否需要删除尾部节点(实现吃food)
    this.body.unshift(newCode)
    if (newCode.x === food.x && newCode.y === food.y) {
      // 3.3.1 不删除蛇尾,需要删除food,并重新渲染food
      target.removeChild(food.foodElement);
      food.render(target, this);
      point.innerHTML = this.body.length - 3;
    } else {
      this.body.pop();
    }

    // 3.4 删除原有蛇身,重新渲染获得新蛇身
    var spans = document.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
      target.removeChild(spans[i]);
    }
    this.render(target);
  }

  // 4.导出Snake
  window.Snake = Snake;
})(window);