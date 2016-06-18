'use strict';
var win = 0;
var draw = 0;
var loss = 0;
var countDownInSeconds=0;

$(document).ready(function(){

  //responsive layout
  $(window).resize(function(){
    setEqualWidthHeight($('.sign-wrapper'));
  });

  //rock paper scissors main logic flow
  $('.sign-wrapper').click(function(){
    var human = $(this).attr('id');
    var bot = botChoice();
    var result = checkForWin(human, bot);
    console.log(result);

    //show human choice in html
    $('.sign-wrapper').removeClass('active');
    $(this).addClass('active');

    //show bot choice in html
    $('.bot-choice-wrapper').html('');
    if(bot==='rock') {
      $('.bot-choice-wrapper').append('<a href="#"><img src="assets/rock.png" alt="rock" class="sign"></a>');
    } else if(bot==='paper') {
      $('.bot-choice-wrapper').append('<a href="#"><img src="assets/paper.png" alt="paper" class="sign"></a>');
    } else {
      $('.bot-choice-wrapper').append('<a href="#"><img src="assets/scissors.png" alt="scissors" class="sign"></a>');
    }

    //update score
    if(result==='win') {
      win++;
      $('#win').text(win);
    } else if(result==='draw') {
      draw++;
      $('#draw').text(draw);
    } else if(result==='loss') {
      loss++;
      $('#loss').text(loss);
    }
  });

  //reset games
  $('form').submit(function(e){
    e.preventDefault();
    $('#game-control').val('Restart');
    resetGame();
    countDownInSeconds = getCountDownInSeconds();
    $('#game h1').text(countDownInSeconds+' Seconds Left');
  });
});

function setEqualWidthHeight(jObject) {
  var width = jObject.width();
  jObject.css({'height':width+'px'});
}

function botChoice() {
  var pick = Math.random();
  if(pick<0.33 && pick>0) {
    return 'rock';
  }
  else if (pick<0.66 && pick>=0.33){
    return 'paper';
  }
  else {
    return 'scissors';
  }
}

function checkForWin(humanChoice, botChoice) {
  if(humanChoice === botChoice) {
    return 'draw';
  }
  else if((humanChoice==='rock'&&botChoice==='scissors') || (humanChoice==='paper'&&botChoice==='rock') || (humanChoice==='scissors'&&botChoice==='paper')) {
    return 'win';
  }
  else {
    return 'loss';
  }
}

function resetGame() {
  win=0;
  draw=0;
  loss=0;

  $('#win').text(win);
  $('#draw').text(draw);
  $('#loss').text(loss);
}

function getCountDownInSeconds () {
  var mins = parseInt($('[name="minutes"]').val());
  var secs = parseInt($('[name="seconds"]').val());
  if(isNaN(mins)) {
    mins = 0;
  }
  if(isNaN(secs)) {
    secs = 0;
  }
  var countDownInSeconds = mins*60 + secs;
  return countDownInSeconds;
}
