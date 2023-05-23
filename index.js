$(document).ready(function () {
  let firstCard = undefined;
  let secondCard = undefined;
  let numClick = 0;
  let numMatch = 0;
  let timePassed = 0; // Time passed in seconds
  let timerInterval;
  let totalTime;

  const createCards = (numCards) => {
    const gameGrid = $("#game_grid");

    for (let i = 1; i <= numCards; i++) {
      const cardElement = `
        <div class="card">
          <img id="img${i}" class="front_face" src="${i.toString().padStart(3, "0")}.png" alt="">
          <img class="back_face" src="back.webp" alt="">
        </div>
        <div class="card">
          <img id="img${i + numCards}" class="front_face" src="${i.toString().padStart(3, "0")}.png" alt="">
          <img class="back_face" src="back.webp" alt="">
        </div>
      `;
      gameGrid.append(cardElement);
    }
  };

  let totalPair = $(".card").length / 2;

  $(".difficulty-button").on("click", function () {
    const selectedDifficulty = $(this).data("difficulty");

    $("#game_grid").removeClass("easy-grid medium-grid hard-grid");
    $(".card").removeClass("easy-grid medium-grid hard-grid");

    if (selectedDifficulty === "easy") {
      $("#game_grid").empty();
      createCards(3); // Example: Display 6 cards
      $("#game_grid").addClass("easy-grid");
      $("#totalTime").text("100 seconds! ");     
    } else if (selectedDifficulty === "medium") {
      $("#game_grid").empty();
      createCards(6);
      $("#game_grid").addClass("medium-grid");
      $("#totalTime").text("200 seconds! ");
    } else if (selectedDifficulty === "hard") {
      $("#game_grid").empty();
      createCards(12);
      $("#game_grid").addClass("hard-grid");
      $("#totalTime").text("300 seconds! ");
      setTimeout(displayPowerUpPopup, 10000);
    }

    setup();
  });


  const setup = () => {
    $("#numClick").text(numClick);
    $("#numMatch").text(numMatch);
    $("#totalPair").text($(".card").length / 2);
    $("#pairLeft").text($(".card").length / 2 - numMatch);
    $("#timePassed").text(timePassed + " seconds passed");
    $(".card").on("click", function () {
      numClick++;
      $("#numClick").text(numClick);

      console.log(numClick);
      if ($(this).hasClass("matched")) {
        return;
      }

      $(this).toggleClass("flip");

      if (!firstCard) {
        firstCard = $(this).find(".front_face")[0];
      } else {
        secondCard = $(this).find(".front_face")[0];
        const firstCardId = firstCard.id;
        const secondCardId = secondCard.id;
        if (firstCard.src
          ==
          secondCard.src && firstCardId !== secondCardId) {
          console.log("match");
          numMatch++;
          $("#numMatch").text(numMatch);
          $("#pairLeft").text($(".card").length / 2 - numMatch);
          $(`#${firstCard.id}`).parent().addClass("matched");
          $(`#${secondCard.id}`).parent().addClass("matched");
          console.log(firstCard.id)
        } else if(firstCardId === secondCardId){
          console.log("same card clicked");
          $(`#${firstCardId}`).parent().addClass("flip");
        } else {
          console.log("no match")
          setTimeout(() => {
            $(`#${firstCardId}`).parent().toggleClass("flip");
            $(`#${secondCardId}`).parent().toggleClass("flip");
          }, 1000);
        }

        if(firstCardId === secondCardId){
          firstCard = firstCard;
        } else {
          firstCard = undefined;
        }

        
        secondCard = undefined;

      }

      if (checkAllMatch()) {
        stopTimer();
        showPopUp();
      }
    });
  };


  const checkAllMatch = () => {
    const totalCards = $(".card").length;
    const matchedCards = $(".card.matched").length;

    return totalCards === matchedCards;
  };

  const showPopUp = () => {
    alert("Congratulations! You have matched all the cards!");
  };

  setup();

  $(".theme-buttons").on("click", ".theme-button", function () {
    var theme = $(this).data("theme");
    if (theme === "dark") {
      $("#game_grid").addClass("dark").removeClass("light");

    } else if (theme === "light") {
      $("#game_grid").addClass("light").removeClass("dark");
    }
    $(".theme-button").removeClass("active");
    $(this).addClass("active");

  });

  const startTimer = () => {
    timerInterval = setInterval(() => {
      timePassed++; // Increment timePassed
      $("#timePassed").text(timePassed + " seconds passed");
    }, 1000); // Update timer every second
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  $(".reset-buttons").on("click", ".reset-button", function () {
    var resetOption = $(this).data("reset");

    if (resetOption === "start") {
      // createCards(3);
      // $("#game_grid").addClass("easy-grid");
      if ($("#game_grid").hasClass("medium-grid")) {
        $(".difficulty-button[data-difficulty='medium']").trigger("click");
      }
      else if ($("#game_grid").hasClass("hard-grid")) {
        $(".difficulty-button[data-difficulty='hard']").trigger("click");
      }
      else {
        $(".difficulty-button[data-difficulty='easy']").trigger("click");
      }
      $("#game_grid").show();
      $(".theme-buttons").show();
      $(".reset-button[data-reset='start']").hide();
      $(".text-header").show();
      startTimer();
    } else if (resetOption === "reset") {
      // Reset the game here
      window.location.href = "index.html";
    }
  });

  const displayPowerUpPopup = () => {
    // Code to display the power-up popup here
    // ...
    alert("Here is the power up!");

    setTimeout(() => {
      $(".card:not(.matched)").toggleClass("flip");
    }, 1000);
    
    
   
  };
 


 





});
