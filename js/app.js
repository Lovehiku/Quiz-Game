window.score = 0;
window.filltQuestions = [];

const btn = document.getElementById('btn');
const difficulty = document.getElementById('difficulty');
const num_questions = document.getElementById('num-questions');
const category = document.getElementById('category');

btn.addEventListener('click', async function (e) {
  e.preventDefault();

  // Wait until questions are loaded
  if (mockQuestions.length === 0) {
    alert('Questions are still loading, please wait a moment...');
    return;
  }

  document.querySelector('.start-screen').classList.add('hidden');
  document.getElementById('leaderboard-section').style.display="none"
  document.getElementById('quiz-screen').style.display = 'block';

  const selectedNum = parseInt(num_questions.value);
  const selectedDifficulty = difficulty.value;
  const selectedCategory = category.value;

  // Shuffle questions
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Filter & slice questions
  window.filltQuestions = shuffle(mockQuestions)
    .filter(q => (selectedCategory === 'any' || q.category.includes(selectedCategory)) &&
                 (selectedDifficulty === 'any' || q.difficulty === selectedDifficulty))
    .slice(0, selectedNum);

  if (window.filltQuestions.length === 0) {
    alert('No questions available for the selected category/difficulty. Try another option.');
    document.querySelector('.start-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').style.display = 'none';
    return;
  }

  let currentIndex = 0;
  window.score = 0;

  function showQuestion(index) {
    const current = filltQuestions[index];
    document.getElementById('question').innerHTML = current.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    current.options.forEach((option) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => {
        const allButtons = optionsContainer.querySelectorAll('button');
        allButtons.forEach(btn => btn.disabled = true);

        if (option === current.answer) {
          button.style.background = 'green';
          window.score++;
        } else {
          button.style.background = 'red';
          allButtons.forEach(btn => {
            if (btn.textContent === current.answer) btn.style.background = 'green';
          });
        }

        document.getElementById('progress').textContent = `Question ${currentIndex + 1} of ${filltQuestions.length}`;

        setTimeout(() => {
          currentIndex++;
          if (currentIndex < filltQuestions.length) {
            showQuestion(currentIndex);
          } else {
            // show result screen
            document.getElementById('result-screen').style.display = 'block';
            document.getElementById('quiz-screen').style.display = 'none';
            document.getElementById('final-score').textContent = `You scored ${window.score} out of ${filltQuestions.length}`;
            document.getElementById('percentage').textContent = `Percentage: ${((window.score / filltQuestions.length) * 100).toFixed(2)}%`;

            const restartBtn = document.getElementById('restart-btn');
            restartBtn.addEventListener('click', () => {
              currentIndex = 0;
              window.score = 0;
              document.getElementById('result-screen').style.display = 'none';
              document.querySelector('.start-screen').classList.remove('hidden');
            });
          }
        }, 2000);
      });
      optionsContainer.appendChild(button);
    });
  }

  showQuestion(0);
});
