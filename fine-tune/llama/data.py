import pandas as pd
from datasets import Dataset

file_name = '../Daan_Park.xlsx'
df = pd.read_excel(file_name)
#print(df['Prompt'])
#print(df['Answer'])

instructions = "請回答以下有關捷運大安森林公園站的問題。"

all_conversations = []

for idx,row in df.iterrows():
    all_conversations.append(
        {
            'instruction': instructions,
            'input': row['Prompt'],
            'output': row['Answer']
        }
    )
print(all_conversations)

dataset = Dataset.from_list(all_conversations)
dataset.save_to_disk('Daan_Park')