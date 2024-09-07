import sys
import google.generativeai as genai
import random
from load import load
import os

# Your API key - ensure this is securely handled in production
api_key = "AIzaSyBzF_URXtucdccCmKbBDR1V6qNdyoCYHzM"
genai.configure(api_key=api_key)

# Define the model and configuration
model = genai.GenerativeModel('gemini-1.0-pro')
max_tokens = 500

# Default prompt template
prompt_template = "以下為一些問答範例\n"

# Check if both input (question) and station name are provided via command-line arguments
if len(sys.argv) > 2:
    input_question = sys.argv[1]
    station_name = sys.argv[2]
else:
    print("Input question or station name not provided. Exiting.")
    sys.exit(1)

# Load the Excel file based on the station name
file_path = f"./sample_data/{station_name}.xlsx"

# Check if the file exists
if not os.path.exists(file_path):
    print(f"Excel file for station '{station_name}' not found. Exiting.")
    sys.exit(1)

# Load example data from the Excel file
store = load(file_path)
sample_num = 20
num = len(store)
examples = ""
#print("input_question: ", input_question)
# Randomly select examples from the loaded data
for i in range(sample_num):
    rand = random.randint(1, num - 1)
    examples += "問題: " + store[rand][0] + "\n答案: " + store[rand][1] + "\n"

instructions = "回答以下問題，注意:請根據事實回答!你不能自行想像!你可以參考範例的資訊，回答中禁止含有*\n"
# Combine the prompt template, examples, and user-provided input
total_input = prompt_template + examples + instructions +"問題:"+ input_question
#total_input = input_question
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

answer = response.text.replace("*","")
# Print and save the generated response
print("Generated Response: ", answer)
with open("./src/response.txt", "w", encoding="utf-8") as file:
    file.write(answer)
