function showTopScorer() {
    const leaderboardSection = document.getElementById('leaderboard-section');
    const leaderboardBody = document.getElementById('leaderboard');
    if (!leaderboardBody) return;

    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    if (scores.length === 0) {
        leaderboardBody.innerHTML = `<tr><td colspan="4">No scores yet.</td></tr>`;
        leaderboardSection.style.display = 'none';
        return;
    }

    // Show the leaderboard section
    leaderboardSection.style.display = 'block';

    // Sort descending by score
    scores.sort((a, b) => b.score - a.score);

    // Top 5 scores
    const topScores = scores.slice(0, 5);

    leaderboardBody.innerHTML = topScores.map((score, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${score.name}</td>
            <td>${score.score} / ${score.total} (${score.percentage}%)</td>
            <td>${score.date}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', showTopScorer);
