var profileSelection;
var enemySelection;
var kenobiPoints = 140;
var skywalkerPoints = 180;
var sidiousPoints = 120;
var maulPoints = 160;
var damagePoint;
var attackPoints = 0;
var yourPoint;
var enemyPoint;
var winAudio = new Audio("assets/audio/winAudio.wav");
var lossAudio = new Audio("assets/audio/lossAudio.wav");
var attackAudio = new Audio("assets/audio/slap.mp3");

$(document).ready(function(){
    $(".kenobiHealth").text(kenobiPoints);
    $(".skywalkerHealth").text(skywalkerPoints);
    $(".sidiousHealth").text(sidiousPoints);
    $(".maulHealth").text(maulPoints);
    $(".character-selection").hide();
    $(".fight-section").hide();
    $(".enemies-available").hide();
    characterCLick();
    defenderClick();
    attackClick();
    restart();
});

function characterCLick()
{
    $(".profile-pick").on("click", ".player-profile", function() {
        $(".choose-text").hide();
        $(".character-selection").show();
        $(".enemies-available").show();
        profileSelection = $(this).children(".player-text").text();
        if (profileSelection == "Van Kenobi") {
            $(".van-kenobi").appendTo(".your-profile");
            $(".luke-skywalker").appendTo(".enemy-profile");
            $(".darth-sidious").appendTo(".enemy-profile");
            $(".darth-maul").appendTo(".enemy-profile");
        }
        if (profileSelection == "Luke Skywalker") {
            $(".van-kenobi").appendTo(".enemy-profile");
            $(".luke-skywalker").appendTo(".your-profile");
            $(".darth-sidious").appendTo(".enemy-profile");
            $(".darth-maul").appendTo(".enemy-profile");
        }
        if (profileSelection == "Darth Sidious") {
            $(".van-kenobi").appendTo(".enemy-profile");
            $(".luke-skywalker").appendTo(".enemy-profile");
            $(".darth-sidious").appendTo(".your-profile");
            $(".darth-maul").appendTo(".enemy-profile");
        }
        if (profileSelection == "Darth Maul") {
            $(".van-kenobi").appendTo(".enemy-profile");
            $(".luke-skywalker").appendTo(".enemy-profile");
            $(".darth-sidious").appendTo(".enemy-profile");
            $(".darth-maul").appendTo(".your-profile");
        }
    });
}

function defenderClick()
{
    $(".enemy-profile").on("click", ".player-profile", function() {
        $(".fight-section").show();
        enemySelection = $(this).children(".player-text").text();
        $(".win-status").css("display","none");
        if ($('.fighting-profile').is(':empty')) {
            $(".button-parameters").css("display","block");
            $(".fight-text").css("display","block");
            $(".defender-text").css("display","block");
            switch(enemySelection) {
                case 'Van Kenobi':
                    $(".van-kenobi").appendTo(".fighting-profile");
                    break;
                case 'Luke Skywalker':
                    $(".luke-skywalker").appendTo(".fighting-profile");
                    break;
                case 'Darth Sidious':
                    $(".darth-sidious").appendTo(".fighting-profile");
                    break;
                case 'Darth Maul':
                    $(".darth-maul").appendTo(".fighting-profile");
                    break;
            }
        }
        if ($('.enemy-profile').is(':empty')) {
            $(".enemies-available").hide();
        }
   
    });
}

function attackClick ()
{
    $("#buttonAttack").on("click", function() {
        yourPoint = $(".your-profile .health-points").text();
        enemyPoint = $(".fighting-profile .health-points").text();
        if (yourPoint > 0 && enemyPoint > 0) {
            attackAudio.pause();
            attackAudio.currentTime = 0;
            attackAudio.play();
            attackPoints = attackPoints + 5;
            $(".live-status").css("display","block");
            if ($(".fighting-profile .player-text").text() === "Van Kenobi") {
                damagePoint = 10;
                calculation(damagePoint);
                $(".defender").text("Van Kenobi");
                $(".defeated").text("Van Kenobi");
            }
            if ($(".fighting-profile .player-text").text() === "Luke Skywalker") {
                damagePoint = 20;
                calculation(damagePoint);
                $(".defender").text("Luke Skywalker");
                $(".defeated").text("Luke Skywalker");
            }
            if ($(".fighting-profile .player-text").text() === "Darth Sidious") {
                damagePoint = 5;
                calculation(damagePoint);
                $(".defender").text("Darth Sidious");
                $(".defeated").text("Darth Sidious");
            }
            if ($(".fighting-profile .player-text").text() === "Darth Maul") {
                damagePoint = 15;
                calculation(damagePoint);
                $(".defender").text("Darth Maul");
                $(".defeated").text("Darth Maul");
            }
        }
        if (enemyPoint <= 0 && yourPoint > 1) {
            winUpdate();
            resetProfilePick("fighting-profile");
            $(".profile-pick").css("display","none");
        }  
        if (yourPoint <= 0 ) {
            lossUpdate();
        }   
    });
}

function calculation(damagePoint)
{
    enemyPoint = enemyPoint - attackPoints;
    yourPoint = yourPoint - damagePoint;
    $("#attackPoint").text(attackPoints);
    $("#counterPoint").text(damagePoint);
    $(".your-profile .health-points").text(yourPoint);
    $(".fighting-profile .health-points").text(enemyPoint);
}

function winUpdate()
{
    if ($('.enemy-profile').is(':empty')) {
        $(".live-status").css("display","none");
        $(".final-status").css("display","block");
        $(".button-parameters").css("display","none");
        $(".fight-section").hide();
        $(".enemies-available").hide();
        winAudio.play();
    } else {
        $(".live-status").css("display","none");
        $(".win-status").css("display","block");
        $(".button-parameters").css("display","none");
        $(".fight-text").css("display","none");
        $(".defender-text").css("display","none");
    }
}

function lossUpdate()
{
    $(".button-parameters").css("display","none");
    $(".loss-status").css("display","block");
    $(".live-status").css("display","none");
    lossAudio.play();
}

function restart()
{
    $(".restart-button").on("click", function() {
        $(".player-profile").appendTo(".profile-pick");
        $(".profile-pick").css("display","inline-flex");
        $(".live-status").css("display","none");
        $(".status").css("display","none");
        $(".choose-text").show();
        $(".character-selection").hide();
        $(".fight-section").hide();
        $(".enemies-available").hide();
        kenobiPoints = 140;
        skywalkerPoints = 180;
        sidiousPoints = 120;
        maulPoints = 160;
        attackPoints = 0;
        $(".kenobiHealth").text(kenobiPoints);
        $(".skywalkerHealth").text(skywalkerPoints);
        $(".sidiousHealth").text(sidiousPoints);
        $(".maulHealth").text(maulPoints);
    });
 
}

function resetProfilePick(element)
{
    if ($("." + element + " .player-text").text() === "Van Kenobi") {
        $(".van-kenobi").appendTo(".profile-pick");
    }
    if ($("." + element + " .player-text").text() === "Luke Skywalker") {
        $(".luke-skywalker").appendTo(".profile-pick");
    }
    if ($("." + element + " .player-text").text() === "Darth Sidious") {
        $(".darth-sidious").appendTo(".profile-pick");
    }
    if ($("." + element + " .player-text").text() === "Darth Maul") {
        $(".darth-maul").appendTo(".profile-pick");
    }
}