$(function() {

    var anim_id;
    var container = $('#box');
    var moped1 = $('#moped1');
    var moped2 = $('#moped2');
    var moped3 = $('#moped3');
    var moped4 = $('#moped4');
    var line_1 = $('#line1');
    var line_2 = $('#line2');
    var line_3 = $('#line3');
    var restart_div = $('#restart-div');
    var restart_btn = $('#restart');
    var score = $('#scor');
    var high_score = localStorage.getItem('high_score');
    $('#high_score').text(high_score);

    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var moped_width = parseInt(moped1.width());
    var moped_height = parseInt(moped1.height());

    var game_over = false;

    var score_counter = 1;

    var speed = 2;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;


    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

    function left() {
        if (game_over === false && parseInt(moped1.css('left')) > 0) {
            moped1.css('left', parseInt(moped1.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(moped1.css('left')) < container_width - moped_width) {
            moped1.css('left', parseInt(moped1.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(moped1.css('top')) > 0) {
            moped1.css('top', parseInt(moped1.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(moped1.css('top')) < container_height - moped_height) {
            moped1.css('top', parseInt(moped1.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }

    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (collision(moped1, moped2) || collision(moped1, moped3) || collision(moped1, moped4)) {
            stop_the_game();
            return;
        }

        score_counter++;

        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
        }
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }

        moped_down(moped2);
        moped_down(moped3);
        moped_down(moped4);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        anim_id = requestAnimationFrame(repeat);
    }


    function moped_down(moped) {
        var moped_current_top = parseInt(moped.css('top'));
        if (moped_current_top > container_height) {
            moped_current_top = -200;
            var moped_left = parseInt(Math.random() * (container_width - moped_width));
            moped.css('left', moped_left);
        }
        moped.css('top', moped_current_top + speed);
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

    restart_btn.click(function() {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
        setHighScore();
    }

    function setHighScore() {
        if (high_score < parseInt(score.text())) {
            high_score = parseInt(score.text());
            localStorage.setItem('scor', parseInt(score.text()));
        }
        $('#scor').text(high_score);
    }



    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});

//Grundgerüst wurde mit Markus schwarz aufgebaut als Team




