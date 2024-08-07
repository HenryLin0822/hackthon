from datetime import datetime

def get_day_of_week(date_string):
    # Parse the date string
    date_object = datetime.strptime(date_string, '%Y-%m-%dT%H:%M:%S')
    
    # Get the day of the week (0 = Monday, 6 = Sunday)
    day_number = date_object.weekday()
    
    # Adjust to 1-7 range (1 = Monday, 7 = Sunday)
    return day_number + 1

