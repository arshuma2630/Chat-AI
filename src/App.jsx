import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take upto 10 seconds");
    try {
      console.log("A");
      const response = await axios({
        // url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
        //   import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        // }`,
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDPkCg187lR6Y98qgvbq0pm1bn1Njocits
        `,
        method: "post",
        headers: {
          "Content-Type": "application/json",  // Ensure content type is correct
        },
        data: {
          contents: [{"parts":[{"text":question}]}],
        },
      });
      console.log(response)

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    }
     catch (error) {
      console.log(question);
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    // catch (error) {
    //   // Log detailed error information
    //   console.error("Full Error Object:", error); 
    
    //   // If there’s a specific response from the server
    //   if (error.response) {
    //     console.error("API Error Data:", error.response.data);  // API response data
    //     console.error("Status Code:", error.response.status);   // HTTP status code
    //     console.error("Headers:", error.response.headers);      // Response headers
    //   } else if (error.request) {
    //     console.error("Request Made, No Response:", error.request); // Request made but no response received
    //   } else {
    //     console.error("Error Message:", error.message); // Something else happened
    //   }
    
    //   setAnswer("Sorry - Something went wrong. Please try again!");
    // }
    

    setGeneratingAnswer(false);
  }

  return (
    <>
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 h-screen p-3 flex flex-col justify-center items-center">
    <form
      onSubmit={generateAnswer}
      className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
    >
        <h1 className="text-4xl font-bold text-blue-500 mb-4 animate-bounce">Chat AI</h1>
      {/* <a href="https://github.com/Vishesh-Pandey/chat-ai" target="_blank" rel="noopener noreferrer"> */}
      {/* </a> */}
      <textarea
        required
        className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything"
      ></textarea>
      <button
        type="submit"
        className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ${
          generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={generatingAnswer}
      >
        Generate answer
      </button>
    </form>
    { <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
      <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
    </div> }
  </div>
    </>
  );
}

export default App;