# backend/generator/hf.py
from transformers import pipeline

# Use Hugging Face summarization / generation model
generator = pipeline("text-generation", model="gpt2")

def generate_sections(project_title: str, description: str):
    """
    Generate professional proposal sections using HF pipeline.
    """
    prompt = f"""
    Create a professional business proposal for the project:
    Title: {project_title}
    Description: {description}

    Provide detailed sections for:
    - Executive Summary
    - Problem
    - Solution
    - Market
    - Competition
    - Business Model
    - Roadmap
    - Call to Action
    """

    # Generate text
    output = generator(prompt, max_length=400, num_return_sequences=1)[0]["generated_text"]

    sections = {
        "Executive Summary": f"{project_title} - {description}",
        "Problem": "Clearly define the market pain point and why it matters.",
        "Solution": "Provide a unique and scalable solution to the problem.",
        "Market": "Highlight target audience, market size, and growth potential.",
        "Competition": "Identify competitors and explain differentiation.",
        "Business Model": "Revenue strategy and sustainability approach.",
        "Roadmap": "Step-by-step development and go-to-market plan.",
        "Call to Action": "Encourage investors/clients to take action.",
    }

    # Append AI generated expansion
    sections["Executive Summary"] += "\n\n" + output[:500]

    return sections
