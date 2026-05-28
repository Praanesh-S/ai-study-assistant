from dotenv import load_dotenv
import os
import streamlit as st
import google.generativeai as genai
import fitz 


load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

#python3 -m streamlit run app.py

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

# Page config
st.set_page_config(
    page_title="AI Study Assistant",
    page_icon="🧠",
    layout="wide"
)

# Custom CSS
st.markdown("""
    <style>
    .main { background-color: #0f1117; }
    .stTextArea textarea { border-radius: 10px; }
    .stButton>button {
        width: 100%;
        border-radius: 10px;
        padding: 10px;
        font-weight: bold;
        background-color: #4f8bf9;
        color: white;
        border: none;
    }
    .stButton>button:hover { background-color: #3a6fd8; }
    .output-box {
        background-color: #1e2130;
        padding: 20px;
        border-radius: 10px;
        margin-top: 10px;
    }
    </style>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.image("https://em-content.zobj.net/source/apple/354/brain_1f9e0.png", width=80)
    st.title("Study Assistant")
    st.markdown("---")
    st.markdown("### How to use")
    st.markdown("1. Paste your notes or upload a PDF")
    st.markdown("2. Click Summarize or Generate Quiz")
    st.markdown("3. Study smarter 🚀")
    st.markdown("---")
    st.caption("Built with Gemini AI")

# Main
st.title("🧠 AI Study Assistant")
st.markdown("*Your personal AI-powered study companion*")
st.markdown("---")

# Input
input_method = st.radio("Input method", ["Paste Text", "Upload PDF"], horizontal=True)

notes = ""

if input_method == "Paste Text":
    notes = st.text_area("Paste your notes here", height=250, placeholder="Enter your study material here...")

elif input_method == "Upload PDF":
    uploaded_file = st.file_uploader("Upload a PDF", type="pdf")
    if uploaded_file:
        doc = fitz.open(stream=uploaded_file.read(), filetype="pdf")
        for page in doc:
            notes += page.get_text()
        st.success(f"✅ PDF loaded! ({len(notes)} characters extracted)")

st.markdown("---")

col1, col2, col3 = st.columns(3)

with col1:
    summarize = st.button("📝 Summarize")
with col2:
    quiz = st.button("❓ Generate Quiz")
with col3:
    flashcards = st.button("🃏 Flashcards")

st.markdown("---")

if summarize:
    if notes:
        with st.spinner("Generating summary..."):
            response = model.generate_content(f"Summarize these notes clearly and concisely with key points:\n\n{notes}")
            st.subheader("📝 Summary")
            st.markdown(f'<div class="output-box">{response.text}</div>', unsafe_allow_html=True)
    else:
        st.warning("Please add some content first!")

if quiz:
    if notes:
        with st.spinner("Generating quiz..."):
            response = model.generate_content(f"Generate 5 quiz questions with answers based on:\n\n{notes}")
            st.subheader("❓ Quiz Questions")
            st.markdown(f'<div class="output-box">{response.text}</div>', unsafe_allow_html=True)
    else:
        st.warning("Please add some content first!")

if flashcards:
    if notes:
        with st.spinner("Generating flashcards..."):
            response = model.generate_content(f"Generate 5 flashcards as Question: Answer: pairs based on:\n\n{notes}")
            st.subheader("🃏 Flashcards")
            st.markdown(f'<div class="output-box">{response.text}</div>', unsafe_allow_html=True)
    else:
        st.warning("Please add some content first!")