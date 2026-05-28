import pyttsx3
import threading
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Crucial for preventing preflight drops
    allow_methods=["*"],
    allow_headers=["*"],
)

conversation_history = []

class Message(BaseModel):
    text: str

def speak(text: str):
    def _speak():
        engine = pyttsx3.init()
        engine.setProperty("rate", 175)
        engine.setProperty("volume", 1.0)
        engine.say(text)
        engine.runAndWait()
    thread = threading.Thread(target=_speak)
    thread.start()

@app.get("/")
def root():
    return {"status": "Praans Agent is alive"}

@app.post("/chat")
async def chat(message: Message):
    conversation_history.append(f"User: {message.text}")
    
    history_context = "\n".join(conversation_history[-10:])
    
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": history_context}]
        )
        reply = response.choices[0].message.content
    except Exception as e:
        reply = "I'm having trouble responding right now, try again in a moment."
        print(f"Error: {e}")
    
    conversation_history.append(f"Assistant: {reply}")
    speak(reply)
    
    return {"reply": reply}
