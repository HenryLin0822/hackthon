import google.generativeai as genai
import random
from load import load
api_key = "AIzaSyBzF_URXtucdccCmKbBDR1V6qNdyoCYHzM"  # Replace with your API key
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.0-pro')

# Set the desired maximum number of output tokens
max_tokens = 500
prompt = "Please answer the following questions based on FACTS(you can't answer something your not sure about),below are some examples(you can generate answer based on these examples):\n"


store = load("../大安森林公園.xlsx")
sample_num = 5
num = len(store)
examples = str()
for i in range(sample_num):
    rand = random.randint(1,num-1)
    examples += "Prompt: "+store[rand][0]+"\nAnswer: "+store[rand][1]+"\n"



input = "請介紹大安森林公園"
totoal_input = prompt+examples+input
print(totoal_input)
response = model.generate_content(totoal_input,    generation_config=genai.types.GenerationConfig(
        # Only one candidate for now.
        candidate_count=1,
        stop_sequences=["x"],
        max_output_tokens=max_tokens,
        temperature=1.0,
    ))

print(response.text)
with open("response.txt", "w", encoding="utf-8") as file:
    file.write(response.text)