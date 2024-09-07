import sys
import google.generativeai as genai
import random

from load import load

# Your API key - ensure this is securely handled in production
api_key = "AIzaSyBzF_URXtucdccCmKbBDR1V6qNdyoCYHzM"
genai.configure(api_key=api_key)

# Define the model and configuration
model = genai.GenerativeModel('gemini-1.0-pro')
max_tokens = 500

# Default prompt template
prompt_template = """Please answer the following questions based on FACTS (you can't answer something you're not sure about), below are some examples (you can generate an answer based on these examples):\n"""

# Load example data from your Excel file
store = load("../大安森林公園.xlsx")
sample_num = 5
num = len(store)
examples = ""

# Randomly select examples from the loaded data
for i in range(sample_num):
    rand = random.randint(1, num - 1)
    examples += "Prompt: " + store[rand][0] + "\nAnswer: " + store[rand][1] + "\n"

# Check if an input (question) is provided via command-line arguments
if len(sys.argv) > 1:
    input_question = sys.argv[1]
else:
    print("No input provided. Exiting.")
    sys.exit(1)

# Combine the prompt template, examples, and the user-provided input
total_input = prompt_template + examples + input_question
print("Final Input: ", total_input)

# Generate response using Google Generative AI
response = model.generate_content(
    total_input,
    generation_config=genai.types.GenerationConfig(
        candidate_count=1,
        stop_sequences=["x"],
        max_output_tokens=max_tokens,
        temperature=1.0,
    )
)

# Print and save the generated response
print("Generated Response: ", response.text)
with open("response.txt", "w", encoding="utf-8") as file:
    file.write(response.text)

