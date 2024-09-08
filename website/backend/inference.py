import sys
import google.generativeai as genai
import random
from load import load
import os

def get_station_lines(station_name):
    # Define the MRT lines and their stations
    mrt_lines = {
        "文湖線": ["動物園", "木柵", "萬芳社區", "萬芳醫院", "辛亥", "麟光", "六張犁", "科技大樓", "大安", "忠孝復興", "南京復興", "中山國中", "松山機場", "大直", "劍南路", "西湖", "港墘", "文德", "內湖", "大湖公園", "葫洲", "東湖", "南港軟體園區", "南港展覽館"],
        "淡水信義線": ["淡水", "紅樹林", "竹圍", "關渡", "忠義", "復興崗", "北投", "奇岩", "唭哩岸", "石牌", "明德", "芝山", "士林", "劍潭", "圓山", "民權西路", "雙連", "中山", "台北車站", "台大醫院", "中正紀念堂", "東門", "大安森林公園", "大安", "信義安和", "台北101/世貿", "象山"],
        "松山新店線": ["松山", "南京三民", "台北小巨蛋", "南京復興", "松江南京", "中山", "北門", "西門", "小南門", "中正紀念堂", "古亭", "台電大樓", "公館", "萬隆", "景美", "大坪林", "七張", "新店區公所", "新店"],
        "中和新蘆線": ["南勢角", "景安", "永安市場", "頂溪", "古亭", "東門", "忠孝新生", "松江南京", "行天宮", "中山國小", "民權西路", "大橋頭", "台北橋", "菜寮", "三重", "先嗇宮", "頭前庄", "新莊", "輔大", "丹鳳", "迴龍", "三重國小", "三和國中", "徐匯中學", "三民高中", "蘆洲"],
        "板南線": ["頂埔", "永寧", "土城", "海山", "亞東醫院", "府中", "板橋", "新埔", "江子翠", "龍山寺", "西門", "台北車站", "善導寺", "忠孝新生", "忠孝復興", "忠孝敦化", "國父紀念館", "市政府", "永春", "後山埤", "昆陽", "南港", "南港展覽館"],
        "環狀線": ["大坪林", "十四張", "秀朗橋", "景平", "景安", "中和", "橋和", "中原", "板新", "板橋", "新埔民生", "頭前庄", "幸福", "新北產業園區"]
    }
    
    station_lines = []
    
    for line, stations in mrt_lines.items():
        if station_name in stations:
            station_lines.append(line)
    
    return station_lines

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
    lines = get_station_lines(station_name)
    print(f"Input question: {input_question}")
    print(f"Station name: {station_name}")
else:
    print("Input question or station name not provided. Exiting.")
    sys.exit(1)
if len(lines) == 1:
    prompt_template = f"以下為一些問答範例，你現在在介紹{lines[0]}上的捷運{station_name}站\n"
else:
    prompt_template = f"以下為一些問答範例，你現在在介紹{lines[0]}和{lines[1]}上的捷運{station_name}站\n"
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
    if len(lines) == 1:
        total_input = f"你現在在介紹捷運{station_name}站，回答以下問題，回答不能超過兩句:" + input_question
    else:
        total_input = f"你現在在介紹{lines[0]}和{lines[1]}上的捷運{station_name}站，回答以下問題，回答不能超過兩句:" + input_question
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
