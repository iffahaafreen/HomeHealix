# 🏠 HomeHealix - AI-Powered RemedyBot

HomeHealix is an AI-powered chatbot that provides **concise home remedies** for common symptoms.  
Built using **Flask (Python) for the backend** and **JavaScript (Google Gemini API) for the frontend**, this chatbot helps users find quick and effective natural treatments.
 
## 📑 Table of Contents  
- [🚀 Features](#-features)  
- [🛠️ Tech Stack](#-tech-stack)  
- [📜 Installation Guide](#-installation-guide)  
- [🎨 UI Preview](#-ui-preview)  
- [🤝 Contributing](#-contributing)  
- [📜 License](#-license)  
- [📱 Contact](#-contact)  


## 🚀 Features
- ✅ **AI-powered home remedies** – Uses Google Gemini API to provide **concise remedies** (max 5 lines).  
- ✅ **Interactive Chat UI** – Built with **Tailwind CSS** for a modern design.  
- ✅ **Feedback System** – Users can rate responses (👍 Yes / 👎 No).  
- ✅ **Environment Safety** – **`.env` is ignored** to protect API keys.  

---

## 🛠️ Tech Stack
### **Frontend**
- HTML, Tailwind CSS – **Modern UI**  
- JavaScript (Google Gemini API) – **AI-powered responses**  

### **Backend**
- Python (Flask) – **API handling**  
- Google Gemini AI – **AI-generated home remedies**  

---

## 📜 Installation Guide
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/HomeHealix.git
cd HomeHealix
```
### **2️⃣ Create a Virtual Environment (Optional)**
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows
```
### **3️⃣ Install Dependencies**
```bash
pip install -r requirements.txt
```
### **4️⃣ Set Up API Key**
- Get an API key from [Google AI Studio](https://aistudio.google.com/).
- Create a `.env` file inside the project folder:
```bash
GEMINI_API_KEY=your_google_ai_studio_api_key
```
- Ensure `.env` is ignored by adding this to .gitignore:
```bash
.env
```
### **5️⃣ Run the Flask Server**
```bash
python app.py
```
#### ⭐Your chatbot will now run at http://127.0.0.1:5000/ 

## 🎨 UI Preview
![HomeHealix Chat UI](https://github.com/iffahaafreen/HomeHealix/blob/main/UI-preview.png)

## 🤝 Contributing
- Fork this repo
- Create a new branch: `git checkout -b feature-new`
- Commit changes: `git commit -m "Added new feature"`
- Push branch: `git push origin feature-new`
- Create a Pull Request

## 📜 License
MIT License © 2025 **HomeHealix**

## 📱 Contact
For any inquiries, feel free to reach out:

GitHub: [iffahaafreen](https://github.com/iffahaafreen)
