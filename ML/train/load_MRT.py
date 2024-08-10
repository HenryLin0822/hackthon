import ezodf
import pandas as pd
import os
import numpy as np
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

def combine_dataframes(df_1, df_2):
    # Ensure the same order of columns in both DataFrames
    df_2 = df_2.reindex(columns=df_1.columns, fill_value=pd.NA)
    # Concatenate the DataFrames row-wise
    combined_df = pd.concat([df_1, df_2], ignore_index=True)
    
    return combined_df
def combine_mutiple_dataframes(dfs):
    combined_df = None
    for i in range(len(dfs)):
        if i == 0:
            combined_df = dfs[i]
        else:
            combined_df = combine_dataframes(combined_df, dfs[i])
    
    return combined_df
# For testing purposes
if __name__ == "__main__":
    df_1 = load_ods("../data/202401_cht.ods")[:31]
    df_2 = load_ods("../data/202402_cht.ods")[:28]
    df_3 = load_ods("../data/202403_cht.ods")[:31]
    df_4 = load_ods("../data/202404_cht.ods")[:30]
    df_5 = load_ods("../data/202405_cht.ods")[:31]
    df_6 = load_ods("../data/202406_cht.ods")[:30]

    #print('df_1:', df_1)
    #print('df_2:', df_2)
    #print('df_3:', df_3)
    #print('df_4:', df_4)
    #print('df_5:', df_5)
    print('df_6:', df_6)
    combined_df = combine_mutiple_dataframes([df_1, df_2, df_3, df_4])
    for i in range((len(combined_df.columns))):
        print(combined_df['　　　　車站\n日期'][i])