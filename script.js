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

  //reset games
  $('form').submit(function(e){

    e.preventDefault();
    $('#game-control').val('Restart');
    resetGame();
    countDownInSeconds = getCountDownInSeconds();
    if(countDownInSeconds>0) {
      //attache event listener to .sign-wrapper if there's time left
      $('.sign-wrapper').click(rockPaperScissors);
      //turn on warning if less than 10 seconds left
      if(duration<=10) {
        $('#game h1').css('color', 'red');
      }
      $('#game h1').text(countDownInSeconds+' Seconds Left');
      //start count down
      countDown(countDownInSeconds, endGame);
    }
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

function countDown(duration, callback) {
  var countdown = setInterval(function(){
    
    duration--;

    if(duration<=10) {
      $('#game h1').css('color', 'red');
    }

    if(duration>0) {
      $('#game h1').text(duration+' Seconds Left');
    } else if(duration===0) {
      callback();
      clearInterval(countdown);
    }
  }, 1000);
}

function endGame() {
  $('.sign-wrapper').off('click');
  announceWinner();
}

function announceWinner(){
  if(win>loss){
    $('#game h1').text('You won!');
  } else if(win<loss){
    $('#game h1').text('You lost :(');
  } else {
    $('#game h1').text("It's a draw.");
  }
}

function rockPaperScissors() {
  var human = $(this).attr('id');
  var bot = botChoice();
  var result = checkForWin(human, bot);

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
}
