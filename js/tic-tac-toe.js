var app = angular.module('myApp', [])
app.controller("AppCtrl", function($scope, $timeout){

  // variables
  var human = "X";
  var computer = "O";
  var score = 0;
  $scope.round = 0;
  $scope.humanScore = 0;
  $scope.computerScore = 0;
  $scope.hovering = false;
  $scope.timeInMs = 0;
  var timer;

  // Original gameboard
  $scope.gameBoard = [{'value' : 0},{'value' : 1},{'value' : 2},{'value' : 3},{'value' : 4},
      {'value' : 5},{'value' : 6},{'value' : 7},{'value' : 8}];

  // All winner options
  $scope.winner = function(currentPlayer) {
      if (
       ($scope.gameBoard[0].value == currentPlayer && $scope.gameBoard[1].value == currentPlayer && $scope.gameBoard[2].value == currentPlayer) ||
       ($scope.gameBoard[3].value == currentPlayer && $scope.gameBoard[4].value == currentPlayer && $scope.gameBoard[5].value == currentPlayer) ||
       ($scope.gameBoard[6].value == currentPlayer && $scope.gameBoard[7].value == currentPlayer && $scope.gameBoard[8].value == currentPlayer) ||
       ($scope.gameBoard[0].value == currentPlayer && $scope.gameBoard[3].value == currentPlayer && $scope.gameBoard[6].value == currentPlayer) ||
       ($scope.gameBoard[1].value == currentPlayer && $scope.gameBoard[4].value == currentPlayer && $scope.gameBoard[7].value == currentPlayer) ||
       ($scope.gameBoard[2].value == currentPlayer && $scope.gameBoard[5].value == currentPlayer && $scope.gameBoard[8].value == currentPlayer) ||
       ($scope.gameBoard[0].value == currentPlayer && $scope.gameBoard[4].value == currentPlayer && $scope.gameBoard[8].value == currentPlayer) ||
       ($scope.gameBoard[2].value == currentPlayer && $scope.gameBoard[4].value == currentPlayer && $scope.gameBoard[6].value == currentPlayer)
       ) {
           $scope.result(currentPlayer);

      }
  }

  $scope.result =function(currentPlayer){
      $scope.isHumanWin = angular.equals(currentPlayer, human);
      console.log("isHumanWin: " + $scope.isHumanWin)

      $scope.isComputerWin = angular.equals(currentPlayer, computer);
      console.log("isComputerWin: " + $scope.isComputerWin)
      if($scope.isHumanWin){
          $scope.whoWin = "You won"; //print the winner
          $scope.showWinScreen();
          $scope.humanScore += 1;
      }
      if($scope.isComputerWin){
          $scope.whoWin = "Computer won"; //print the winner
          $scope.showWinScreen();
          $scope.computerScore += 1;
      }
      $scope.reset(); //restart the game after it completed
  }

  // Game reset function for restarting the game
  $scope.reset = function(){
      for(var i=0; i<9; i++){ // Putting all the initial values to gameBoard
          $scope.gameBoard[i].value = i;
      }
      $scope.round = 0; // restarting the round
  }

  // checking cells and if cell is empty return true
  $scope.isEmpty = function(cell){
      $scope.resultHuman = angular.equals($scope.gameBoard[cell].value, human);
      $scope.resultComputer = angular.equals($scope.gameBoard[cell].value, computer);
      console.log("isEmpty: " + $scope.resultHuman + " " + $scope.resultComputer);
      if($scope.resultHuman || $scope.resultComputer){
          console.log("isEmpty: " + $scope.gameBoard[cell].value)
          return false;
      }
      else{
          return true;
      }
  }


  $scope.showWinScreen = function(){
      $scope.hovering = true;
      timer = $timeout(function () {
            $scope.hovering = false;
        }, 2000);

        console.log(timer);
  }



  // main function and game starts here
  $scope.play = function(r){
      if($scope.isEmpty(r)){
          $scope.gameBoard[r].value = human;
          console.log("Human chosee: " + r);
      }
      $scope.round++;
      // Generating random value for computer
      $scope.randomNumber = Math.round((Math.random() * 8) + 0);

      $scope.whoWin = "Game still in progress";

      // Computer movements
      while($scope.round < 8 || $scope.winner(computer) || $scope.winner(human)){
          if($scope.isEmpty($scope.randomNumber)){
              console.log("Computer chosee: " + $scope.randomNumber);
              $scope.gameBoard[$scope.randomNumber].value = computer;
              $scope.round++;
              console.log("Round: " + $scope.round);
              $scope.winner(computer);
              break;
          } else {
              console.log("The number taken: " + $scope.randomNumber);
              $scope.randomNumber = Math.round((Math.random() * 8) + 0);
              console.log("Computer chosee new number: " + $scope.randomNumber);
          }
      }
      //checking for human is winner
      $scope.winner(human);
      if($scope.round > 8){
          $scope.whoWin = "Draw";
          $scope.showWinScreen();
          $scope.reset();
      };
  }

});
