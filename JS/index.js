window.addEventListener('DOMContentLoaded',function(){


    // Constants
    const localStorage = window.localStorage;
    const eyeButton = document.querySelector('.eyeScore');
    const eye = document.querySelector('.fa-eye');
    const restart = document.querySelector('.heavensDoor');
    const eyeSlash = document.querySelector('.fa-eye-slash');
    const timer = document.querySelector('.timer');
    const textSection = document.querySelector('section');
    const input = document.querySelector('input[type="text"]');
    const score = document.querySelector('.score');
    const wrongWordDiv = document.querySelector('.wrong');
    const correctWordDiv = document.querySelector('.correct');
    const table = document.querySelector('table');
    const pharagraphs = ['KonoSuba Gods Blessing on This Wonderful World! is a Japanese light novel series written by Natsume Akatsuki. The series follows Kazuma Satou, a boy who is sent to a fantasy world with MMORPG elements following his death, where he forms a dysfunctional adventuring party with a goddess, an archwizard, and a crusader. Originally serialized as a web novel on Shosetsuka ni Naro between December 2012 and October 2013, KonoSuba was published as a printed light novel series by Kadokawa Shoten under the companys Kadokawa Sneaker Bunko imprint from October 2013 to May 2020. The light novel series features a divergent plot and illustrations by Kurone Mishima.',
    'Miss Kobayashis Dragon Maid also known as The Maid Dragon of Kobayashi san is a Japanese manga series written and illustrated by Coolkyousinnjya. The series began serialization in Futabashas Monthly Action magazine since May 2013 and is licensed in North America by Seven Seas Entertainment. Four spin-off manga have also been serialized in Monthly Action. An anime television series adaptation produced by Kyoto Animation aired in Japan between January and April 2017. A second season titled Miss Kobayashis Dragon Maid S aired between July and September 2021. A video game titled Miss Kobayashis Dragon Maid: Burst Forth!! Choro-gon Breath was released in Japan in March 2022 and was released in North America by Aksys Games in August 2022.',
    'Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story is told in two parts the first set in Narutos pre-teen years, and the second in his teens. The series is based on two one-shot manga by Kishimoto: Karakuri (1995), which earned Kishimoto an honorable mention in Shueishas monthly Hop Step Award the following year, and Naruto (1997).',
    'Onimai: Im Now Your Sister! is a Japanese manga series written and illustrated by Nekotofu. The series has been serialized online since 2017; it is also currently serialized in Ichijinshas Monthly Comic Rex magazine since April 2019. It is licensed in English by Kodansha USA. An anime television series adaptation by Studio Bind aired from January to March 2023, receiving positive reception from critics and gaining high ratings, although it received a mixed reception from English language critics.',
    'Fullmetal Alchemist: Brotherhood is a Japanese anime television series adapted from the original Fullmetal Alchemist manga series by Hiromu Arakawa. Produced by Bones, the series is directed by Yasuhiro Irie, written by Hiroshi onogi and composed by Akira Senju. The series was conceived in order to create a faithful adaptation that directly follows the entire storyline of the original manga, after 2003s Fullmetal Alchemist anime series strayed away from it to tell its own story after running out of published manga material to adapt.',
    'Demon Slayer: Kimetsu no Yaiba is a Japanese manga series written and illustrated by Koyoharu Gotouge. It was serialized in Shueishas shonen manga magazine Weekly Shonen Jump from February 2016 to May 2020, with its chapters collected in 23 tankobon volumes. It has been published in English by Viz Media and simultaneously published by Shueisha on their Manga Plus platform. It follows teenage Tanjiro Kamado, who strives to become a Demon Slayer after his family was slaughtered and his younger sister, Nezuko, turned into a demon.'];
    // ---------
    
    // Variables
    let userName;
    let showTimer;
    let showScore;
    let selectWord = 0;
    let startCountdown = false;
    let wrongWords = 0;
    let correctWords = 0;
    let seconds = 0;
    let minutes = 0;
    let words;
    let interval;
    // ---------


    // Events
    eyeButton.addEventListener('click',function(){ /* Eye changes */
      eye.classList.toggle('d_none');
      eyeSlash.classList.toggle('d_none');
      score.classList.toggle('d_none');
      showScore = !showScore 
      localStorage.setItem('showScore',showScore)
    })
    timer.addEventListener('click',function(){
      timer.children[0].classList.toggle('d_none');
      showTimer = !showTimer;
      localStorage.setItem('showTimer',showTimer)
    })
    input.addEventListener('keydown',function (e){
      if(startCountdown == false){
        timerCountdown()
        startCountdown = true;
      }
        inputStart(e)
    })
    restart.addEventListener('click',function(){
      reset()
    })
    // ---------

    // Verifications
    showScore = localStorage.getItem('showScore') || 'false'; /* Verifications about the score status */
    showScore = showScore === 'true';

    showTimer = localStorage.getItem('showTimer') || 'true';  /* Verifications about the score status */
    showTimer = showTimer === 'true';
    // ---------

    // Posibility
    if(showTimer) { /* Verification about the boolean in the localStorage */
      timer.children[0].classList.remove("d_none")
    } else {
      timer.children[0].classList.add("d_none")
    }

    if(showScore) { /* Verification about the boolean in the localStorage */
        score.classList.remove("d_none")
        eye.classList.add('d_none');
        eyeSlash.classList.remove('d_none');
    } else {
        score.classList.add("d_none")
        eye.classList.remove('d_none');
        eyeSlash.classList.add('d_none');
    }

    if(localStorage.getItem('userName') && localStorage.getItem('userName') != 'null') {
      userName = localStorage.getItem('userName');
    } else {
      localStorage.setItem('userName',prompt("Let me know your name"))
      userName = localStorage.getItem('userName');
    }
    // ---------

    // Fuctions
      function sectionSpans(){  /* Fuctions for the text in the section */
      words = pharagraphs[Math.floor(Math.random(6) * 6)]

      words = words.split(' ')

      words.forEach(function(element){

        let span = document.createElement('span')
        span.textContent = element

        textSection.appendChild(span)
      })

      textSection.children[0].classList.add('active')
    }

    function inputStart(e){
      const wordSelected = document.querySelectorAll('section span');
      if(e.key === " "){
        if(wordSelected[selectWord].textContent == e.target.value.trim()){
          wordSelected[selectWord].classList.add('correctValue')
          wordSelected[selectWord].classList.add('afterValue')
          wordSelected[selectWord].classList.remove('wrongValue')
          correctWords++;
          correctWordDiv.textContent = correctWords
        } else {
          wordSelected[selectWord].classList.add('wrongValue')
          wordSelected[selectWord].classList.add('afterValue')
          wordSelected[selectWord].classList.remove('correctValue')
          wrongWords++;
          wrongWordDiv.textContent = wrongWords
        }
        e.target.value = '';
        selectWord++;
        wordSelected[selectWord].classList.add('active');
      }
    }
    
    function reset(){
        wrongWordDiv.textContent = '0';
        correctWordDiv.textContent = '0';
        selectWord = 0;
        startCountdown = false;
        wrongWords = 0;
        correctWords = 0;
        seconds = 0;
        minutes = 0;
        textSection.textContent = '';
        sectionSpans()
        clearInterval(interval)
        timer.children[0].textContent = '0:00';
        input.value = "";
    }

    function timerCountdown() { /* Timer fuction for the time in the aside */

      interval = setInterval(function(){

        seconds++;

      if (seconds === 60) {
        seconds = 0;
        minutes++;
        
      } 

      if (minutes === 1 && seconds === 31) {
        timesUp();
    }

      timer.children[0].textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      
      }, 100)

    }

    function timesUp() {
      timer.children[0].textContent = 'Timeout!';
        alert('You do ' + correctWords + ' WPM');
        savingScores();
        reset();
        return;
    }

    function savingScores() {

      let score = localStorage.getItem('scores')

      if(score) {

        let scores = JSON.parse(localStorage.getItem('scores'));

        let userScore = scores[userName];

        userScore.unshift(correctWords)

        let finalScore =  {}
        finalScore[userName] = userScore

        localStorage.setItem('scores',JSON.stringify(finalScore));

        printingScores();

      } else {

        console.log(userName)
        let array = [];
        array.push(correctWords)
        let object = {};
        object[userName] = array;

        localStorage.setItem('scores',JSON.stringify(object));

        printSavedScores();

      }

    }

    function printSavedScores() {
              
        let userScores = localStorage.getItem('scores')

        if (userScores) {

          userScores = JSON.parse(userScores)

          scoresArray = userScores[userName]
  
          scoresArray.forEach(function(score) {
  
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
      
            td1.textContent = userName;
            td2.textContent = score + "WPM"
      
            tr.appendChild(td1)
            tr.appendChild(td2)
  
            table.children[1].append(tr)
          })
          
        }


    }

    
    function printingScores() {
      
      if (correctWords) {
        
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        
        td1.textContent = userName;
        td2.textContent = correctWords + "WPM"
        
        tr.appendChild(td1)
        tr.appendChild(td2)
        
        table.children[1].prepend(tr)
        
      }
      
    }
    // ---------
    
    // Call Fuctions
    sectionSpans();
    printSavedScores();
    // ---------
})