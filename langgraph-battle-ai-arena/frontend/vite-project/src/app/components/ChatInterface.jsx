import React, { useState, useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import ArenaResponse from './ArenaResponse';
import axios from "axios";

const MOCK_RESPONSE = {
  solution_1: "Here is a clean Python solution using modern syntax:\n\n```python\ndef fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n```\n\nThis approach has O(n) time complexity and O(1) space.",
  solution_2: "A recursive solution can be elegant but less efficient:\n\n```python\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n```\n\nNote: this has O(2^n) time complexity.",
  judge: {
    solution_1_score: 10,
    solution_2_score: 5,
    solution_1_reasoning: "Excellent, optimal solution. Space complexity is O(1) which is perfect for this problem.",
    solution_2_reasoning: "The recursive approach without memoization is extremely slow for large inputs."
  }
};

export default function ChatInterface() {
  const [ messages, setMessages ] = useState([]);
  const [ inputValue, setInputValue ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [ messages ]);

  const handleSend = async (e) => {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question || isLoading) return;

    const messageId = Date.now();
    const pendingMessage = {
      id: messageId,
      problem: question,
      status: 'loading',
    };

    // Immediately show the user's question and clear the input box
    setMessages((prev) => [ ...prev, pendingMessage ]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/invoke", {
        input: question
      });

      const data = response.data;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, status: 'done', ...data.result }
            : msg
        )
      );
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                status: 'error',
                errorMessage: error.response?.data?.message || error.message || "Something went wrong while fetching the answer.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <header className="py-4 px-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10 flex justify-center">
        <h1 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">AI Chat Arena</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 w-full max-w-6xl mx-auto flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-zinc-400">
            <div className="text-center">
              <h2 className="text-2xl font-light mb-2 text-zinc-600 dark:text-zinc-300">Welcome to AI Chat Arena</h2>
              <p>Ask any question and compare two AI responses side by side.</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
              <UserMessage message={msg.problem} />
              {msg.status === 'loading' ? (
                <div className="my-8 px-4 w-full">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
                    <span className="h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">Working on your answer...</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Both models are drafting replies and picking the best one for you.</p>
                    </div>
                  </div>
                </div>
              ) : msg.status === 'error' ? (
                <div className="my-8 px-4 w-full">
                  <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-3xl p-6 text-red-700 dark:text-red-300">
                    <p className="font-medium">Failed to get AI response</p>
                    <p className="text-sm mt-1">{msg.errorMessage}</p>
                  </div>
                </div>
              ) : (
                <ArenaResponse
                  solution1={msg.solution_1}
                  solution2={msg.solution_2}
                  judge={msg.judge}
                />
              )}
            </div>
          ))
        )}
        <div ref={endOfMessagesRef} />
      </main>

      <div className="p-6 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isLoading ? "Waiting for AI response..." : "Ask anything..."}
              disabled={isLoading}
              className="w-full bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-none rounded-full py-4 pl-6 pr-16 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-zinc-400 transition-shadow shadow-sm hover:shadow-md text-lg disabled:opacity-60"
            />
            <button
              type="submit"
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim() || isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
