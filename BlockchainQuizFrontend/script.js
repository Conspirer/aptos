const CONTRACT_ADDRESS = "0x1bd6210ed95f8afda37f5254b41f0288250f40c11399c6420d77f4db3124becf"; // Replace with your actual contract address


// Function to initialize the app once Aptos SDK is loaded
function initializeApp() {
    console.log("Aptos SDK loaded, initializing app...");

    // Function to connect wallet and get account
    async function connectWallet() {
        try {
            const response = await window.aptos.connect();
            console.log("Connected to wallet:", response.address);
            return response;
        } catch (error) {
            console.error('Failed to connect to Aptos wallet:', error);
            throw error;
        }
    }

    // Create a quiz
    async function createQuiz(correctAnswer, reward) {
        try {
            const account = await connectWallet();
            console.log('Account Address:', account.address);
            console.log('Creating Quiz with Answer:', correctAnswer, 'and Reward:', reward);
            
            const payload = {
                type: "entry_function_payload",
                function: `${CONTRACT_ADDRESS}::BlockchainQuiz::create_quiz`,
                type_arguments: [],
                arguments: [correctAnswer, reward],
            };

            const response = await window.aptos.signAndSubmitTransaction(payload);
            console.log('Transaction submitted:', response.hash);
        } catch (error) {
            console.error('Failed to create quiz:', error);
        }
    }

    // Submit an answer
    async function submitAnswer(quizId, answer) {
        try {
            const payload = {
                type: "entry_function_payload",
                function: `${CONTRACT_ADDRESS}::QuizModule::submit_answer`,
                type_arguments: [],
                arguments: [answer],
            };
            const response = await window.aptos.signAndSubmitTransaction(payload);
            console.log('Transaction submitted:', response.hash);
        } catch (error) {
            console.error('Failed to submit answer:', error);
        }
    }

    // Handle Create Quiz form submission
    document.getElementById('createQuizForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const correctAnswer = document.getElementById('correctAnswer').value;
        const reward = document.getElementById('reward').value;
        createQuiz(correctAnswer, reward);
    });

    // Handle Submit Answer form submission
    document.getElementById('submitAnswerForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const quizOwner = document.getElementById('quizId').value;
        const answer = document.getElementById('answer').value;
        submitAnswer(quizOwner, answer);
    });

    // Dynamic Quiz Management
    let questionCounter = 1;

    document.getElementById('addQuestionBtn').addEventListener('click', () => {
        const container = document.getElementById('questionContainer');
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('dynamic-question');
        questionDiv.innerHTML = `
            <label>Question ${questionCounter}</label>
            <input type="number" class="correct-answer" placeholder="Correct Answer" required>
            <input type="number" class="reward" placeholder="Reward (in tokens)" required>
        `;
        container.appendChild(questionDiv);
        questionCounter++;
    });

    document.getElementById('dynamicQuizForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const questions = document.querySelectorAll('.dynamic-question');
        for (let question of questions) {
            const correctAnswer = question.querySelector('.correct-answer').value;
            const reward = question.querySelector('.reward').value;
            await createQuiz(correctAnswer, reward);
        }
        alert('All quizzes created successfully!');
    });
}

// Function to check if Aptos SDK is loaded
function checkAptosSdk() {
    if (window.aptos) {
        initializeApp();
    } else {
        console.log("Waiting for Aptos SDK to load...");
        setTimeout(checkAptosSdk, 100); // Check again after 100ms
    }
}

// Start checking for Aptos SDK
document.addEventListener('DOMContentLoaded', checkAptosSdk);