import openai

key = ''

client = openai.Client(api_key = key)

with open('Daan_Park.json', 'rb') as f:
    response = client.files.create(file=f, purpose='fine-tune')

print(response)

file_id = 'file-d3iKduuFHEKEWxj7GhyUMRm3'

response = client.fine_tuning.jobs.create(
    training_file=file_id,
    model="gpt-3.5-turbo",
    )

print(response)