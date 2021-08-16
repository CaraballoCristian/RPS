function RPS (userChoice) {
   let pScore = 0;
   let cScore = 0;

      const letsPlay = document.querySelector('#lets-play');
      const resultPage = document.querySelector('#result');
      const plays = document.querySelector('.plays');
      const images = document.querySelector('.images');
      const scores = document.querySelector('.Score');

   //Pagina inicial, donde pregunta si queres jugar.    
   const initPage = () => {
      
      //Transition desde pagina inicial a pagina del juego
      letsPlay.addEventListener('click', () => {
         resultPage.classList.add('fadeOut');
         plays.classList.add('fadeIn');
         images.classList.add('fadeIn');
         scores.classList.add('fadeIn');
      });     
   };
   
   //vuelve a usar piedra en el shake
   const resetHands = () => {
      document.querySelector('.player-hand').src = `./assets/ROCK.png`;   
      document.querySelector('.computer-hand').src = `./assets/ROCK.png`;
}

   //Round
   const playRound = () => {
      const options = document.querySelectorAll('.images button');
      const playerPlay = document.querySelector('#player-play');
      const computerPlay = document.querySelector('#computer-play');
      const hands = document.querySelectorAll('.hand'); 

      //repite animacion
      hands.forEach(hand =>{
         hand.addEventListener('animationend', function(){
            this.style.animation = ''; //resetea la animacion
         });
      });

      //Randomizer (CPU option)
      options.forEach(option => {
         option.addEventListener("click", function() {  
            
            const computerNumber = Math.floor(Math.random() * 3) + 1;
            let computerChoice = computerNumber === 1 ? "ROCK" 
            : computerNumber === 2 ? "PAPER" 
            : "SCISSORS";
            console.log("pc" + computerChoice);
            
            //Comparo jugadas
            setTimeout(() => {
               comparePlays(this.textContent, computerChoice);

               //Actualizo imagenes
               document.querySelector('.player-hand').src = `./assets/${this.textContent}.png`;   
               document.querySelector('.computer-hand').src = `./assets/${computerChoice}.png`;                
            }, 2000); //esto esta configurado para tener un delay de 2s (2000ms)
            
            playerPlay.style.animation = "shakePlayer 2s ease";
            computerPlay.style.animation = "shakeComputer 2s ease";
           
            resetHands();
         });
      });
   };

      //const letsPlay = document.querySelector('#lets-play');
      //const resultPage = document.querySelector('#result');
      //const plays = document.querySelector('.plays');
      //const images = document.querySelector('.images');
      //const scores = document.querySelector('.Score');

   const checkScore = () => {
      if (pScore == 3 || cScore == 3) {
         resultPage.classList.add('fadeIn'); //muestra nuevamente la pantalla de resultado y el boton de retry
        
         plays.classList.remove('fadeIn');
         images.classList.remove('fadeIn');
         scores.classList.remove('fadeIn');
         
         letsPlay.addEventListener('click', () => { //reinicia los scores con el click y empieza nueva ronda
            resultPage.classList.remove('fadeIn');
            pScore = 0;
            cScore = 0;
            document.querySelector('#user-score').textContent = 0;
            document.querySelector('#computer-score').textContent = 0;
            resetHands();
         });
         

         //document.querySelector('.plays').classList.remove('fadeOut');
       //  document.querySelector('.images').classList.assList.add('fadeOut');
       //  document.querySelector('.Score').classList.add('fadeOut');
         
      }   
   } 

   const updateScore = () => {
      const playerScore = document.querySelector('#user-score');
      const computerScore = document.querySelector('#computer-score');
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
      checkScore();
   }

   const comparePlays = (userChoice, computerChoice) =>{
      const winner = document.querySelector('#rslt');
      //when its a tie
      if (userChoice === computerChoice) {
         winner.textContent = "That's a tie!";
         console.log('tie')
         return;
      }

      //when player wins
      else if ((computerChoice === "ROCK" && userChoice === "PAPER") || (computerChoice === "PAPER" && userChoice === "SCISSORS") || (computerChoice === "SCISSORS" && userChoice === "ROCK")) {
         winner.textContent = "Yeah, baby!"; 
         document.querySelector('#lets-play').textContent = "Again!";
         console.log('u win')
         pScore++;
         updateScore();
         console.log(pScore);
         return;
      }
      //when computer wins
      else {
         winner.textContent = "Haha, Loser!";
         document.querySelector('#lets-play').textContent = "Retry!";
         console.log('u loose')
         cScore++;
         updateScore();
         return;
         console.log(cScore);

      }
   }
  //it call all the inner function
  initPage();
  playRound();
};
//start the game
RPS();


