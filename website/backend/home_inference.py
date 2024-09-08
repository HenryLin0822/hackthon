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
input_question = sys.argv[1]


# Load the Excel file based on the station name


# Load example data from the Excel file

sample_num = 20

examples = "問題:"
#print("input_question: ", input_question)
# Randomly select examples from the loaded data

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
##########   Function to catch up the main object of the article   ##########

prompt_template_2 = """This question at least contain an attractions (If not, please return -1 to tell me) below are some examples (you can generate an answer based on these examples):\n"""
file_path = f"./sample_data_obj/主體擷取.xlsx"
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
print("Generated Response: ", answer)
with open("./src/response.txt", "w", encoding="utf-8") as file:
    file.write(answer)
with open("./src/response_obj.txt", "w", encoding="utf-8") as file:
    file.write(response_obj.text)
