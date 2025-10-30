document.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.getElementById('save-score');

  if (!saveBtn) return;

  saveBtn.addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value.trim();
    if (!playerName) {
      alert('Please enter your name!');
      return;
    }

    // Ensure there are questions
    const totalQuestions = window.filltQuestions?.length || 0;

    const newScore = {
      name: playerName,
      score: window.score || 0,
      total: totalQuestions,
      percentage: totalQuestions ? ((window.score / totalQuestions) * 100).toFixed(2) : 0,
      date: new Date().toLocaleString(),
    };

    const existingScores = JSON.parse(localStorage.getItem('scores')) || [];
    existingScores.push(newScore);

    localStorage.setItem('scores', JSON.stringify(existingScores));

    // Show top scorer / leaderboard
  

    // Show leaderboard section
    document.getElementById('leaderboard-section').style.display = 'block';
     document.getElementById('result-screen').style.display = 'none';

  });
});
