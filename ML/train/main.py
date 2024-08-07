from model import Model
from Configs import Configs
import pandas as pd
import torch
import sys
import ezodf
import sys
import os
import numpy as np
import os
import sys
import numpy as np
from load_MRT import load_ods
from utils import *
# Rest of your code...
filename = "../data/202401_cht.ods"
df = load_ods(filename)
df = df[0:31]
print(df['　　　　車站\n日期'])
print(get_day_of_week(df['　　　　車站\n日期'][0]))