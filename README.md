# AI Text Enhancer & Grammar Checker

<img width="1913" height="870" alt="image" src="https://github.com/user-attachments/assets/709170b6-2453-43cc-aa5b-19ff81f1b53f" />


An intuitive web application that leverages the power of AI to correct grammar, enhance phrasing, and improve your writing in real-time. Built with a modern tech stack, it provides a seamless and responsive user experience.

---

## ✨ Features

* **🤖 AI-Powered Corrections**: Submits user text to an AI model to receive grammatical corrections and stylistic enhancements.
* *↔️ Dual-Panel UI**: A clean, side-by-side view to compare the original input with the AI-corrected output.
* **📋 One-Click Copy**: Easily copy the corrected text to your clipboard with a single click.
* **💅 Smooth Animations**: Built with Framer Motion to provide fluid animations for loading states and user interactions.
* **⏳ Loading Indicators**: A sleek loading spinner gives users clear feedback while the AI is processing the text.
* **📱 Responsive Design**: The interface is fully responsive and works beautifully on desktop, tablet, and mobile devices.

---

## 🛠️ Technology Stack

This project is built using a modern and powerful set of technologies:

* **Frontend:** [React](https://reactjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Version Control:** [Git](https://git-scm.com/) & [GitHub](https://github.com/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

* [Node.js](https://nodejs.org/en/) (which includes npm)
* [Git](https://git-scm.com/)

### Installation

1.  **Clone the Repository**
    Open your terminal and clone the repository to your local machine.
    ```sh
    git clone (https://github.com/asiduki/Ai-Enhancer)
    ```
    *(Replace `your-username/your-repository-name` with your actual GitHub repository URL)*

2.  **Navigate to the Project Directory**
    ```sh
    cd your-repository-name
    ```

3.  **Install Dependencies**
    Use npm (or yarn) to install all the required project dependencies.
    ```sh
    npm install
    ```

4.  **Set Up Environment Variables (if any)**
    If your project requires an API key for the AI service, create a `.env` file in the root of your project and add the necessary keys.
    ```
    REACT_APP_AI_API_KEY=your_api_key_here
    ```
    *(Note: This is an example. The variable name must match what you use in your code to fetch data.)*

5.  **Run the Development Server**
    Start the React development server.
    ```sh
    npm start
    ```

6.  **Open in Browser**
    The application should now be running. Open your web browser and navigate to `http://localhost:3000`.

---

## Usage

1.  Enter or paste the text you want to correct into the left-hand input box.
2.  Click the "Enhance Text" button.
3.  Wait for the AI to process the request (a loading spinner will appear).
4.  The corrected text will be displayed in the right-hand panel.
5.  Click the "Copy" button to copy the corrected text to your clipboard.
