import openai

key = ''

client = openai.Client(api_key = key)

with open('Daan_Park.json', 'rb') as f:
    response = client.files.create(file=f, purpose='fine-tune')

print(response)

file_id = ''

response = client.fine_tuning.jobs.create(
    training_file=file_id,
    model="gpt-2"
    )

print(response)