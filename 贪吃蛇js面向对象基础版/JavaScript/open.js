/**
 * Created by dell on 2018/4/26.
 */
// 1.获取元素
var map = document.getElementById('map');
var clear = document.getElementById('clear');
var open = document.getElementById('open');
var point_num = document.getElementById('point_num');
var point = point_num.children[0];
var grade = document.getElementById('grade');

// 2.设置change事件,获取用户选择的模式
var gradeValue;
grade.addEventListener('change', function () {
  gradeValue = grade.value;
});

// 3.设置open点击事件开始游戏
open.addEventListener('click', function () {
  var game = new Game();
  game.start(map, gradeValue, point);
});

// 4.设置clear点击事件用于刷新游戏
clear.addEventListener('click', function () {
  location.reload(false);
});