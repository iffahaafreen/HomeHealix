const API_KEY = [YOUR_GEMINI_API_KEY];
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
const conv = new showdown.Converter();

// ✅ Apply styles on page load
document.addEventListener("DOMContentLoaded", () => {
    const messageHolder = document.getElementById("messageHolder");
    if (messageHolder) {
        messageHolder.style.background = "linear-gradient(to right, #f3f4f6, #6ee7b7, #34d399)";
        messageHolder.style.minHeight = "70vh";
        messageHolder.style.borderRadius = "0.5rem";
        messageHolder.style.padding = "1rem";
        messageHolder.style.overflowY = "auto";
    }
    sendIntroMessage();
});

// ✅ Format user input
const formatUserInput = (input) => `symptom: ${input}`;

const isGreeting = (message) => {
    const greetings = ["hello", "hi", "how are you", "good morning", "hey", "thanks", "bye", "thank you"];
    return greetings.some((greeting) => message.toLowerCase().includes(greeting));
};

// ✅ Send introduction message
const sendIntroMessage = () => {
    const introMessage = "Hi, I'm HomeHealix, your RemedyBot for home remedies. How can I help you today?";
    addMessage(introMessage, "start");  // ✅ Displays message without calling Gemini
};


// ✅ Chat function (calls Gemini API)
const chatGemini = async (message) => {
    addMessage(message, "end");

    if (isGreeting(message)) {
        addMessage("Hi! I'm HomeHealix, your Home Remedy assistant. How can I help you today?", "start");
        return;
    }

    const formattedMessage = formatUserInput(message);
    sendToGemini(formattedMessage, "start");
};

// ✅ Send message to Google Gemini API using `fetch()`
const sendToGemini = async (message, direction) => {
    try {
        console.log("📡 Sending request to Gemini API...");

        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `You are HomeHealix, a RemedyBot. 
                        The user has provided the following symptom: "${message}".
                        Provide a concise home remedy in a maximum of 5 lines. 
                        Avoid unnecessary details or explanations.` }] }]
            }),
        });

        let data = await response.json();
        console.log("🔍 API Response:", data);

        if (!data || !data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
            throw new Error("Invalid response from Gemini API");
        }

        let reply = data.candidates[0].content.parts[0].text;
        console.log("✅ Gemini API Response:", reply);

        let html = conv.makeHtml(reply);
        addMessageWithFeedback(html, direction);
    } catch (error) {
        console.error("🔥 Error processing input:", error);
        addMessage("Something went wrong. Try again later.", "start");
    }
};

// ✅ Display messages in chat UI
const addMessage = (msg, direction) => {
    const messageHolder = document.getElementById("messageHolder");
    if (!messageHolder) return;

    const message = document.createElement("div");
    const color = direction !== "start" ? "#1250b5" : "#16a34a";

    message.innerHTML = `
        <div class="flex flex-col items-${direction}">
            <div class="px-4 py-2 rounded-md text-white w-fit max-w-4xl mb-1" style="background-color: ${color};">
                ${msg}
            </div>
        </div>
    `;

    messageHolder.appendChild(message);
    messageHolder.scrollTop = messageHolder.scrollHeight;
};

// ✅ Add message with feedback buttons
const addMessageWithFeedback = (msg, direction) => {
    const messageHolder = document.getElementById("messageHolder");
    if (!messageHolder) return;

    const message = document.createElement("div");
    const color = direction !== "start" ? "#1250b5" : "#16a34a";

    message.innerHTML = `
    <div class="flex flex-col items-${direction}">
        <div class="px-4 py-2 rounded-md text-white w-fit max-w-4xl mb-1" style="background-color: ${color};">
            ${msg}
        </div>
        <div class="mt-2 flex space-x-2">
            <span class="text-gray-700 font-medium">Was this helpful?</span>
            <button class="feedback-btn bg-green-400 hover:bg-green-600 text-white px-3 py-1 rounded-md shadow-sm" data-feedback="yes">Yes</button>
            <button class="feedback-btn bg-red-400 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm" data-feedback="no">No</button>
        </div>
    </div>
    `;

    messageHolder.appendChild(message);
    messageHolder.scrollTop = messageHolder.scrollHeight;

    // Attach event listeners to feedback buttons
    message.querySelectorAll(".feedback-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            handleFeedback(event.target.getAttribute("data-feedback"));
        });
    });
};

// ✅ Handle feedback response
const handleFeedback = (feedback) => {
    const feedbackMessage = feedback === "yes"
        ? "Thank you for your feedback! Glad I could help."
        : "Thank you for your feedback. I'll strive to improve.";
    
    addMessage(feedbackMessage, "start");
};

// ✅ Handle button click event
document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("btn");
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            const messageInput = document.getElementById("chat");
            if (messageInput) {
                const message = messageInput.value.trim();
                if (message) {
                    chatGemini(message);
                    messageInput.value = "";
                }
            }
        });
    }
});
