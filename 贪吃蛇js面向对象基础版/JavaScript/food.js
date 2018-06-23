/**
 * Created by dell on 2018/4/26.
 */
(function (window) {
  // 启用严格模式
  'use strict';
  // 1.创建Food构造函数
  function Food(options) {
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.bgColor = options.bgColor || 'green';
  }

  // 2.给Food原型对象添加render方法,将食物渲染到页面中
  Food.prototype.render = function (target, snake) {
    this.createDom(target);
    this.domStyle(this.foodElement);
    this.domCoordinates(target, this.foodElement, snake);
  };

  // 2.1创建一个DOM对象,并添加到target中
  Food.prototype.createDom = function (target) {
    var foodElement = document.createElement('div');
    target.appendChild(foodElement);
    this.foodElement = foodElement;
  };

  // 2.2设置DOM基本样式
  Food.prototype.domStyle = function (foodElement) {
    // 2.2.1声明一个数组arr存储food背景色
    var arr = ['red', 'green', 'yellow', 'white', 'orange', 'skyblue', 'purple', 'gold'];
    foodElement.style.width = this.width + 'px';
    foodElement.style.height = this.height + 'px';
    foodElement.style.position = 'absolute';
    // 2.2.2设置food随机背景色
    foodElement.style.backgroundColor = arr[parseInt(Math.random() * arr.length)];
  };

  // 2.3设置DOM坐标
  Food.prototype.domCoordinates = function (target, foodElement, snake) {
    // 2.3.1 排除food是否与蛇身重合
    do {
      this.x = parseInt(Math.random() * (target.offsetWidth / this.width));
      this.y = parseInt(Math.random() * (target.offsetHeight / this.height));
    } while ({x : this.x, y : this.y} in snake.body);
    // 2.3.2 将排除后的坐标赋给foodElement
    foodElement.style.left = this.x * this.width + 'px';
    foodElement.style.top = this.y * this.height + 'px';
  };

  // 3.导出Food
  window.Food = Food
})(window);