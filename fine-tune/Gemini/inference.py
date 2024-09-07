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
prompt_template = """Please answer the following questions based on FACTS (you can't answer something you're not sure about), below are some examples (you can generate an answer based on these examples):\n"""

# Check if both input (question) and station name are provided via command-line arguments
if len(sys.argv) > 2:
    input_question = sys.argv[1]
    station_name = sys.argv[2]
else:
    print("Input question or station name not provided. Exiting.")
    sys.exit(1)

# Load the Excel file based on the station name
file_path = f"../{station_name}.xlsx"

# Check if the file exists
if not os.path.exists(file_path):
    print(f"Excel file for station '{station_name}' not found. Exiting.")
    sys.exit(1)

# Load example data from the Excel file
store = load(file_path)
sample_num = 5
num = len(store)
examples = ""

# Randomly select examples from the loaded data
for i in range(sample_num):
    rand = random.randint(1, num - 1)
    examples += "Prompt: " + store[rand][0] + "\nAnswer: " + store[rand][1] + "\n"


# Combine the prompt template, examples, and user-provided input
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


##########   Function to catch up the main object of the article   ##########

prompt_template_2 = """This question at least contain an attractions (If not, please return -1 to tell me) below are some examples (you can generate an answer based on these examples):\n"""
file_path = f"../主體擷取.xlsx"
store = load(file_path)
sample_num = 5
num = len(store)
examples_2 = ""
for i in range(sample_num):
    rand = random.randint(1, num - 1)
    examples_2 += "Prompt: " + store[rand][0] + "\nAnswer: " + store[rand][1] + "\n"
total_input_2 = prompt_template_2 + examples_2 + response.text
print("Final Input: ", total_input)
response_obj = model.generate_content(
    total_input_2,
    generation_config=genai.types.GenerationConfig(
        candidate_count=1,
        stop_sequences=["x"],
        max_output_tokens=max_tokens,
        temperature=1.0,
    )
)



##################################################################################


# Print and save the generated response
print("Generated Response: ", response.text)
with open("response.txt", "w", encoding="utf-8") as file:
    file.write(response.text)
with open("response_obj.txt", "w", encoding="utf-8") as file:
    file.write(response_obj.text)
