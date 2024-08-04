import ezodf
import pandas as pd
import os

def load_ods(filename):
    if not os.path.exists(filename):
        raise FileNotFoundError(f"The file {filename} does not exist.")
    
    try:
        spreadsheet = ezodf.opendoc(filename)
    except Exception as e:
        print(f"Error opening the file: {e}")
        print(f"File path: {os.path.abspath(filename)}")
        print(f"File extension: {os.path.splitext(filename)[1]}")
        raise
    
    sheet = spreadsheet.sheets[0]
    
    data = [[cell.value for cell in row] for row in sheet.rows()]
    df = pd.DataFrame(data[1:], columns=data[0])
    return df

# For testing purposes
if __name__ == "__main__":
    filename = "your_file.ods"  # Replace with your actual filename
    try:
        df = load_ods(filename)
        print(df.head())
    except Exception as e:
        print(f"An error occurred: {e}")