// Map API categories to your simplified categories
const categoryMap = {
  "General Knowledge": "any",
  "Entertainment: Books": "any",
  "Entertainment: Film": "any",
  "Entertainment: Music": "any",
  "Entertainment: Musicals & Theatres": "any",
  "Entertainment: Television": "any",
  "Entertainment: Video Games": "any",
  "Entertainment: Board Games": "any",
  "Science & Nature": "science",
  "Science: Computers": "science",
  "Science: Mathematics": "math",
  "Mythology": "any",
  "Sports": "any",
  "Geography": "geography",
  "History": "history",
  "Politics": "any",
  "Art": "any",
  "Celebrities": "any",
  "Animals": "science",
  "Vehicles": "any",
  "Entertainment: Comics": "any",
  "Science: Gadgets": "science",
  "Entertainment: Japanese Anime & Manga": "any",
  "Entertainment: Cartoon & Animations": "any"
};


// Initially empty, will be filled by API

let mockQuestions = [];

// Fetch questions from API
async function loadQuestions() {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=50&type=multiple'); // fetch 50 questions
    const data = await response.json();

    // Transform API data into the same structure as your mockQuestions
    mockQuestions = data.results.map(q => ({
      question: q.question,
      options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      answer: q.correct_answer,
      category: q.category.toLowerCase(),
      difficulty: q.difficulty.toLowerCase()
    }));

    console.log('Questions loaded:', mockQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

// Call it immediately
loadQuestions();
