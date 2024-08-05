import google.generativeai as genai
api_key = ''
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content("請介紹台北101")
print(response.text)