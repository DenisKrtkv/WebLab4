jQuery(function() {
  var start = jQuery("#start");
  var isStart = false;

  var gameField = jQuery("#GameField");
  const gameWidth = jQuery("#GameField").width();
  const gameHeight = jQuery("#GameField").height();

  var speed = jQuery("#speed");
  var speedCount = 1;

  var health = jQuery("#health");
  const maxHealth = 3;
  var healthCount = maxHealth;
  var healthSize = 64;

  var basket = jQuery("#basket");
  const basketHeight = jQuery("#basket").height();
  const basketWidth = jQuery("#basket").width();
  var basketWidthPos = parseInt(basket.css("left"));

  var ball = jQuery("#ball");
  const ballSize = jQuery("#ball").width();
  var ballHeightPos = parseInt(ball.css("top"));
  var ballWidthPos = parseInt(ball.css("left"));

  var score = jQuery("#score");
  var scoreCount = 0;
  var isRec = false;

  var time = jQuery("#time");
  var timeCount = 0;

  var theGame = setInterval(function() {
    if (isStart == true) {
      if (healthCount != 0) {
        ballHeightPos = parseInt(ball.css("top"));
        basketWidthPos = parseInt(basket.css("left"));
        if (ballHeightPos > gameHeight - ballSize) {
          if (isRec == false) minusHP();
          ballStartPos();
        }
        ball.css("top", ballHeightPos + speedCount);

        timeCount += 20;
        time.text(parseFloat(timeCount / 1000).toFixed(2));

        if (ballHeightPos > gameHeight - (basketHeight + 10))
          if (
            ballWidthPos + ballSize / 2 > basketWidthPos &&
            ballWidthPos < basketWidthPos + basketWidth &&
            isRec == false
          ) {
            scoreCount++;
            score.text(scoreCount);
            isRec = true;
            ball.css("visibility", "hidden");
            speedEngine();
          }
      } else {
        gameOver();
      }
    }
  }, 20);

  function minusHP() {
    healthCount--;
    health.css("width", healthCount * healthSize);
  }
  function ballStartPos() {
    isRec = false;

    ballHeightPos = 0;
    ball.css("top", ballHeightPos);
    ballWidthPos = parseInt(Math.random() * (gameWidth - ballSize));

    ball.css("left", ballWidthPos);
    ball.css("visibility", "visible");
  }
  function speedEngine() {
    if (scoreCount % 2 == 0) {
      speedCount++;
    }
    if (scoreCount % 4 == 0) {
      speedCount--;
    }
    speed.text(speedCount);
  }
  function restart() {
    healthCount = maxHealth;
    health.css("width", healthCount * healthSize);

    speedCount = 1;
    speed.text(speedCount);

    timeCount = 0;
    time.text(timeCount);

    scoreCount = 0;
    score.text(scoreCount);

    ballStartPos();
    jQuery("#gameOver").css("visibility", "hidden")
    isStart = true;
  }
  function gameOver() {
    isStart = false;
    jQuery("#gameOver").css("visibility", "visible")
  }
  jQuery(document).on("keydown", function(e) {
    if (isStart) {
      var key = e.keyCode;
      if ((key == 37 || key == 65) && basketWidthPos > 0) {
        basket.css(
          "left",
          parseInt(basket.css("left")) - (speedCount * 5 + 20)
        );
      }
      if (
        (key == 39 || key == 68) &&
        basketWidthPos < gameWidth - basketWidth
      ) {
        basket.css(
          "left",
          parseInt(basket.css("left")) + (speedCount * 5 + 20)
        );
      }
    }
  });
  start.click(function() {
    restart();
  });
});