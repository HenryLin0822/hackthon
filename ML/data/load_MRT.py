import ezodf
import pandas as pd

def load_ods(filename):
    spreadsheet = ezodf.opendoc(filename)
    
    # Load the first sheet
    sheet = spreadsheet.sheets[0]
    
    # Convert the sheet to a DataFrame
    df_dict = {}
    for i, row in enumerate(sheet.rows()):
        # Use the first row as column names
        if i == 0:
            # Get the column names, excluding empty cells
            df_dict = {cell.value:[] for cell in row if cell.value}
        else:
            # For the rest of the rows, add the cell values to the columns
            for j, cell in enumerate(row):
                if j < len(df_dict):
                    df_dict[list(df_dict.keys())[j]].append(cell.value)
    
    # Create a pandas DataFrame
    df = pd.DataFrame(df_dict)
    return df

# Usage
filename = "202401_cht.ods"
df = load_ods(filename)
#print(df['松山機場'])
#print(df['三重國小'])
#print(df)

