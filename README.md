
Blockchain-Based Quizzes: Earn Tokens by Answering Quiz Questions Correctly
This project allows users to participate in quizzes and earn tokens for correct answers. The quizzes are powered by a smart contract built on the Aptos blockchain, and tokens are transferred to users based on their quiz performance.

Table of Contents
Overview
Prerequisites
Project Structure
Setup Instructions
How it Works
Smart Contract Details
Running the Project
Overview
This project uses the Aptos blockchain to create a decentralized quiz platform where users can participate in quizzes and earn tokens for answering correctly. The application uses Move smart contracts to handle quiz logic and token distribution.

Prerequisites
Before getting started, make sure you have the following installed:

Aptos CLI
Node.js
A devnet account on the Aptos blockchain (can be set up using the Aptos CLI)
Project Structure
Here is an overview of the files in this project:

move.toml: Configuration file for your Move package. Contains dependencies, addresses, and other project-level settings.
script.js: Main JavaScript file responsible for interacting with the blockchain, handling user input, and managing the UI.
styles.js: Styling file to handle the visual appearance of the web application.
BlockChainQuiz.move: Move smart contract that contains the logic for handling quizzes and distributing tokens based on correct answers.
Setup Instructions
1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/blockchain-quiz.git
cd blockchain-quiz
2. Install Dependencies
Make sure you have installed the required dependencies by running the following:

bash
Copy code
npm install
3. Configure Aptos Devnet
You need to configure your devnet account on Aptos to deploy the contract and test transactions. Run the following commands to set up your account:

bash
Copy code
aptos init
This will prompt you to enter your devnet account information.

4. Build and Deploy the Smart Contract
To deploy the BlockChainQuiz.move smart contract to the Aptos blockchain, navigate to the contract directory and run:

bash
Copy code
aptos move compile
aptos move publish --profile devnet
5. Run the Application
Start the quiz application by running:

bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000 to interact with the quiz.

How it Works
Answer Quizzes: Users are presented with multiple-choice quiz questions on the web interface.
Earn Tokens: For every correct answer, the smart contract rewards the user with tokens. These tokens are automatically transferred to the user's wallet.
Smart Contract Logic: The Move contract tracks correct answers and handles token transfers on the Aptos blockchain.
Smart Contract Details
The core quiz logic is implemented in the BlockChainQuiz.move file. Below is an outline of its key components:

Question Registration: Quiz creators can register new questions with predefined answers.
Answer Verification: The contract verifies user answers and checks if they match the correct answer.
Token Distribution: Tokens are distributed to users who answer questions correctly.
Running the Project
To interact with the quiz:

Open the web application in your browser (http://localhost:3000).
Answer the quiz questions presented.
Upon answering correctly, the corresponding tokens are transferred to your wallet on Aptos devnet.
