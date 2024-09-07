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


# Check if both input (question) and station name are provided via command-line arguments
if len(sys.argv) > 2:
    input_question = sys.argv[1]
    station_name = sys.argv[2]
    print(f"Input question: {input_question}")
    print(f"Station name: {station_name}")
else:
    print("Input question or station name not provided. Exiting.")
    sys.exit(1)
prompt_template = f"以下為一些問答範例，你現在在介紹捷運{station_name}站\n"
# Load the Excel file based on the station name
file_path = f"./sample_data/{station_name}.xlsx"
found = True
# Check if the file exists
if not os.path.exists(file_path):
    print(f"Excel file for station '{station_name}' not found. Exiting.")
    found = False


# Load example data from the Excel file
if found == True:
    store = load(file_path)
    sample_num = 5
    num = len(store)
    examples = ""
    #print("input_question: ", input_question)
    # Randomly select examples from the loaded data
    for i in range(sample_num):
        rand = random.randint(1, num - 1)
        examples += "問題: " + store[rand][0] + "\n答案: " + store[rand][1] + "\n"

    #instructions = "回答以下問題，注意:請根據事實回答!你不能自行想像!你可以參考範例的資訊，回答中禁止含有*\n"
    instructions = "回答以下問題，你可以參考範例或自行延伸，回答不能超過兩句!\n"
    # Combine the prompt template, examples, and user-provided input
    total_input = prompt_template + examples + instructions +"問題:"+ input_question
    #total_input = input_question
    
else:
    total_input = f"你現在在介紹捷運{station_name}站，回答以下問題，回答不能超過兩句:" + input_question
# Generate response using Google Generative AI
print("Final Input: ", total_input)
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
