window.addEventListener('DOMContentLoaded',function(){

    // Constants
    const eyeButton = document.querySelector('.eyeScore');
    const eye = document.querySelector('.fa-eye');
    const eyeSlash = document.querySelector('.fa-eye-slash');
    const timer = document.querySelector('.timer');
    const textSection = document.querySelector('section');
    const input = document.querySelector('input');
    const score = document.querySelector('.score');
    const wrongWord = document.querySelector('.wrong');
    const correctWord = document.querySelector('.correct');
    // ---------

    // Variables
    let localStorage = window.localStorage;
    let showTimer;
    let showScore;
    let selectWord = 0;
    let startCountdown = true;
    let wrongPhrases = 0;
    let correctPhrases = 0;
    let words;
    let number = 0;
    let number2 = 0;
    let pharagraphs = ['KonoSuba Gods Blessing on This Wonderful World! is a Japanese light novel series written by Natsume Akatsuki. The series follows Kazuma Satou, a boy who is sent to a fantasy world with MMORPG elements following his death, where he forms a dysfunctional adventuring party with a goddess, an archwizard, and a crusader. Originally serialized as a web novel on Shosetsuka ni Naro between December 2012 and October 2013, KonoSuba was published as a printed light novel series by Kadokawa Shoten under the companys Kadokawa Sneaker Bunko imprint from October 2013 to May 2020. The light novel series features a divergent plot and illustrations by Kurone Mishima.',
    'Miss Kobayashis Dragon Maid also known as The Maid Dragon of Kobayashi-san is a Japanese manga series written and illustrated by Coolkyousinnjya. The series began serialization in Futabashas Monthly Action magazine since May 2013 and is licensed in North America by Seven Seas Entertainment. Four spin-off manga have also been serialized in Monthly Action. An anime television series adaptation produced by Kyoto Animation aired in Japan between January and April 2017. A second season titled Miss Kobayashis Dragon Maid S aired between July and September 2021. A video game titled Miss Kobayashis Dragon Maid: Burst Forth!! Choro-gon Breath was released in Japan in March 2022 and was released in North America by Aksys Games in August 2022.',
    'Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story is told in two parts the first set in Narutos pre-teen years, and the second in his teens. The series is based on two one-shot manga by Kishimoto: Karakuri (1995), which earned Kishimoto an honorable mention in Shueishas monthly Hop Step Award the following year, and Naruto (1997).',
    'Onimai: Im Now Your Sister! is a Japanese manga series written and illustrated by Nekotofu. The series has been serialized online since 2017; it is also currently serialized in Ichijinshas Monthly Comic Rex magazine since April 2019. It is licensed in English by Kodansha USA. An anime television series adaptation by Studio Bind aired from January to March 2023, receiving positive reception from critics and gaining high ratings, although it received a mixed reception from English language critics.',
    'Fullmetal Alchemist: Brotherhood is a Japanese anime television series adapted from the original Fullmetal Alchemist manga series by Hiromu Arakawa. Produced by Bones, the series is directed by Yasuhiro Irie, written by Hiroshi onogi and composed by Akira Senju. The series was conceived in order to create a faithful adaptation that directly follows the entire storyline of the original manga, after 2003s Fullmetal Alchemist anime series strayed away from it to tell its own story after running out of published manga material to adapt.',
    'Demon Slayer: Kimetsu no Yaiba is a Japanese manga series written and illustrated by Koyoharu Gotouge. It was serialized in Shueishas shonen manga magazine Weekly Shonen Jump from February 2016 to May 2020, with its chapters collected in 23 tankobon volumes. It has been published in English by Viz Media and simultaneously published by Shueisha on their Manga Plus platform. It follows teenage Tanjiro Kamado, who strives to become a Demon Slayer after his family was slaughtered and his younger sister, Nezuko, turned into a demon.'];
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
    input.addEventListener('keydown',function(e){
      if(startCountdown == true){
        timerCoultdown()
        startCountdown = false;
      }
      const wordSelected = document.querySelectorAll('section span');
      if(e.key === " "){
        if(wordSelected[selectWord].textContent == e.target.value.trim()){
          wordSelected[selectWord].classList.add('correctValue')
          wordSelected[selectWord].classList.add('afterValue')
          wordSelected[selectWord].classList.remove('wrongValue')
          correctPhrases++;
          correctWord.textContent = correctPhrases
        } else {
          wordSelected[selectWord].classList.add('wrongValue')
          wordSelected[selectWord].classList.add('afterValue')
          wordSelected[selectWord].classList.remove('correctValue')
          wrongPhrases++;
          wrongWord.textContent = wrongPhrases
        }
        e.target.value = '';
        selectWord++;
        wordSelected[selectWord].classList.add('active');
      }
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

    function timerCoultdown() { /* Timer fuction for the time in the aside */
      number++;
      if (number === 60) {
        number = 0;
        number2++;
        if (number2 === 60) {
          timer.children[0].textContent = 'Timeout!';
          return;
        }
      }
      timer.children[0].textContent = number2 + ':' + (number < 10 ? '0' : '') + number;
      setTimeout(timerCoultdown, 1000);
    }
    // ---------

    // Call Fuctions
    sectionSpans();
    // ---------

    // Particles effect
    particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 355,
            "density": {
              "enable": true,
              "value_area": 789.1476416322727
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.48927153781200905,
            "random": false,
            "anim": {
              "enable": true,
              "speed": 0.2,
              "opacity_min": 0,
              "sync": false
            }
          },
          "size": {
            "value": 2,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 2,
              "size_min": 0,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 0.2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "bubble"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 83.91608391608392,
              "size": 1,
              "duration": 3,
              "opacity": 1,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    // ---------

})