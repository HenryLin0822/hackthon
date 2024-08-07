import requests
import pandas as pd 
import numpy as np
import csv
url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-335A5FF1-56FA-409C-862E-0D653262B082'
data = requests.get(url)   # 取得 JSON 檔案的內容為文字
data_json = data.json()    # 轉換成 JSON 格式
location = data_json['records']['location']
# print(location[0]['weatherElement'])
start_time = []
end_time = []
wx8 = []
maxt8 = []
mint8 = []
ci8 = []
pop8 = []
for i in location:
    city = i['locationName']
    if city == "臺北市" :   # 縣市名稱
        for j in range(len(i['weatherElement'][0]['time'])):
            start_time.append(i['weatherElement'][0]['time'][j]['startTime'])  # 開始時間
            end_time.append(i['weatherElement'][0]['time'][j]['endTime'])  # 結束時間
            wx8.append(i['weatherElement'][0]['time'][j]['parameter']['parameterName'] )   # 天氣現象
            maxt8.append(i['weatherElement'][1]['time'][j]['parameter']['parameterName']+"°C" ) # 最高溫
            mint8.append(i['weatherElement'][2]['time'][j]['parameter']['parameterName']+"°C") # 最低溫
            ci8.append(i['weatherElement'][3]['time'][j]['parameter']['parameterName'] )   # 舒適度
            pop8.append(i['weatherElement'][4]['time'][j]['parameter']['parameterName']+"%")  # 降雨機率
        start_time = pd.Series(start_time)
        end_time = pd.Series(end_time)
        wx8 = pd.Series(wx8)
        maxt8 = pd.Series(maxt8)
        mint8 = pd.Series(mint8)
        ci8 = pd.Series(ci8)
        pop8 = pd.Series(pop8)
        df = pd.DataFrame({'City': city, 'start_Time':start_time, 'end_Time' : end_time , 'Weather': wx8, 'MaxTemp': maxt8, 'MinTemp': mint8, 'ComfortIndex': ci8, 'RainProb': pop8})
        df.to_csv('Prediction.csv', index=False)
url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWA-335A5FF1-56FA-409C-862E-0D653262B082'
data = requests.get(url)   # 取得 JSON 檔案的內容為文字
data_json = data.json() 
location = data_json['records']['Station']
all_location = np.array([locate for locate in location if locate['GeoInfo']['CountyName'] == "臺北市"])
GeoInfo = ['StationName', 'TownName', 'ObsTime','Weather','Temp','Humidity','HighestTemp','HighestTempTime','LowestTemp','LowestTempTime']
station_name = []
obs_time = []
TownName = []
weather = []
temp = []
humidity = []
highest_temp = []
highest_temp_time = []
lowest_temp = []
lowest_temp_time = []
print(len(all_location))
for locate in all_location:
    station_name.append((lambda x: np.nan if x == "-99" or x == '-99.0' else x)(str(locate['StationName'])))
    obs_time.append(locate['ObsTime']['DateTime'])
    TownName.append(locate['GeoInfo']['TownName'])
    weather.append((lambda x: np.nan if x == "-99" or x == '-99.0' else x)(str(locate['WeatherElement']['Weather'])))
    temp.append((lambda x: np.nan if x == "-99" or x == '-99.0' else x)(str(locate['WeatherElement']['AirTemperature'])))
    humidity.append(((lambda x: np.nan if x == "-99" or x == '-99.0' else str(x)+"%")(str((locate['WeatherElement']['RelativeHumidity'])))))
    highest_temp.append((lambda x: np.nan if x == "-99" or x == '-99.0' else x)(str(locate['WeatherElement']['DailyExtreme']['DailyHigh']['TemperatureInfo']['AirTemperature'])))
    highest_temp_time.append((lambda x:np.nan if x == '-99' or x == '-99.0' else x )(str(locate['WeatherElement']['DailyExtreme']['DailyLow']['TemperatureInfo']['Occurred_at']['DateTime'])))
    lowest_temp.append((lambda x: np.nan if x == '-99' or x == '-99.0' else x)(str(locate['WeatherElement']['DailyExtreme']['DailyLow']['TemperatureInfo']['AirTemperature'])))
    lowest_temp_time.append((lambda x:np.nan if x == '-99' or x == '-99.0' else x )(str(locate['WeatherElement']['DailyExtreme']['DailyLow']['TemperatureInfo']['Occurred_at']['DateTime'])))
station_name = pd.Series(station_name)
obs_time = pd.Series(obs_time)
TownName = pd.Series(TownName)
weather = pd.Series(weather)
temp = pd.Series(temp)
humidity = pd.Series(humidity)
highest_temp = pd.Series(highest_temp)
highest_temp_time = pd.Series(highest_temp_time)
lowest_temp = pd.Series(lowest_temp)
lowest_temp_time = pd.Series(lowest_temp_time)
df = pd.DataFrame({'StationName': station_name, 'TownName': TownName, 'ObsTime': obs_time, 'Weather': weather, 'Temp': temp, 'Humidity': humidity, 'HighestTemp': highest_temp, 'HighestTempTime': highest_temp_time, 'LowestTemp': lowest_temp, 'LowestTempTime': lowest_temp_time})
#to csv
df.to_csv('weather.csv', index=False)
all_location = []
for locate in location:
    if  locate['GeoInfo']['CountyName'] == "臺北市":
        all_location.append(locate)
print(len(all_location))
print(all_location)
print(all_location[0]['WeatherElement'])
#DateTime, Station,, TownName, WeatherElement[Weather, Temp, Humidity,]