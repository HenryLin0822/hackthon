
import pandas as pd
import json
file_name = '../Daan_Park.xlsx'
df = pd.read_excel(file_name)
#print(df['Prompt'])
df['Response_string'] = df.apply(lambda x:f'''問題:{x['Prompt']}
答案:{x['Answer']}''', axis=1)
#print(df)
#print(df['Response_string'][0])

system_prompt = '請根據問題回答答案'

all_conversations = []

for idx,row in df.iterrows():
    all_conversations.append({'messages':[{'role':'system','content':system_prompt},
                                          {'role':'user','content':row['Prompt']},
                                          {'role':'assistant','content':row['Response_string']}]})

print(all_conversations)

with open('Daan_Park.json', 'w') as f:
    for conversation in all_conversations:
       json.dump(conversation, f)
       f.write('\n')