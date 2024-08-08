import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import zipfile
import time
from datetime import datetime
import os
import shutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
#important url https://www.cwa.gov.tw/V8/C/W/County/County.html?CID=63
download_folder = os.path.expanduser("~/Downloads")
current_directory = os.getcwd()
file_extension = ".csv"
suffix = "scraped"
# 定义处理下载文件的事件处理程序
def checkbox_open(browser):
    try:
        checkbox = browser.find_element(By.ID, "auto_C0")
        checkbox.click()
    except Exception as e:
        print(f"An error occurred: {e}")
def find_all_acceptable_row(browser):
    try:
        table = browser.find_element(By.CLASS_NAME, 'v-table-content')
        rows = table.find_elements(By.TAG_NAME, 'tr')
        acceptable_rows = []
    except Exception as e:
        print(f"An error occurred: {e}")
    for row in rows:
        cells = row.find_elements(By.TAG_NAME, 'div')
        try: 
            if(cells[3].text == '臺北市'):
                acceptable_rows.append(row)
                
        except Exception as e:
            print(f"An error occurred: {e}")
    return acceptable_rows
def csv_download(browser,actions):
    try:
        btns = browser.find_elements(By.CLASS_NAME, 'lightbox-tool-type-ctrl-btn')
        for btn in btns:
            if btn.text == 'CSV下載':
                actions.move_to_element(btn).click().perform()
                print("Clicked on the CSV download button")
    except Exception as e:
        print(f"An error occurred while clicking the CSV download button: {e}")
def months_12_downloader(browser,actions):
    try:
        light_browser = browser.find_elements(By.CLASS_NAME, 'lightbox-tool-type-container')
        for j in range(12):
            csv_download(browser,actions)
            for i in light_browser:
                if i.value_of_css_property('display') != 'none':
                    prev_next = i.find_elements(By.CLASS_NAME, 'datetime-tool-prev-next')
                    actions.move_to_element(prev_next[0]).click().perform()
    except Exception as e:
        print(f"Clicking csv file download button: {e}")
def open_csv_link(browser, icon,actions):
    try:
        actions.move_to_element(icon).click().perform()
        lightbox_menu = browser.find_elements(By.CLASS_NAME, 'lightbox-tool-menu')
        actions.move_to_element(lightbox_menu[1].find_elements(By.TAG_NAME,'div')[1]).click().perform()
        print("Clicked on the icon")
    except Exception as e:
        print(f"An error occurred while clicking an icon: {e}")
def close_page(browser,actions):
    try:
        light_browser = browser.find_elements(By.CLASS_NAME, 'lightbox-tool-container')
        close_btn = light_browser[1].find_elements(By.CLASS_NAME, 'lightbox-tool-close')
        actions.move_to_element(close_btn[0]).click().perform()
    except Exception as e:
        print(f"An error occurred while closing the page: {e}")
# Define the URL to be accessed
def crawling_process():
    domain_url = 'https://codis.cwa.gov.tw/StationData?target=station'
    # Set up the Chrome WebDriver using webdriver_manager
    try:
        service = Service(ChromeDriverManager().install())
        browser = webdriver.Chrome(service=service)
    except Exception as e:
        print(f"An error occurred while setting up the Chrome WebDriver: {e}")
    # Open the URL in the browser
    try:
        browser.get(domain_url)
        browser.implicitly_wait(5)
    except Exception as e:
        print(f"An error occurred while opening the URL: {e}")
    checkbox_open(browser)
    actions = ActionChains(browser)
    actions.move_to_element(browser.find_element(By.ID, 'switch_display')).click().perform()
    # time.sleep(10)
    #choose all row that is connected to 臺北市
    acceptable_rows = find_all_acceptable_row(browser)
    actions = ActionChains(browser)
    print("------------------acceptable rows is chosen---------------------------------")
    # for row in acceptable_rows:
    row = acceptable_rows[0]
    icons = row.find_elements(By.TAG_NAME, 'i')
    icon = icons[1]
    open_csv_link(browser, icon,actions)
    months_12_downloader(browser,actions)
    close_page(browser,actions)


    time.sleep(100)
    # Add code to interact with the page or extract data here

    # Close the browser after use
    browser.quit()
class DownloadHandler(FileSystemEventHandler):
    def __init__(self, target_folder, file_extension, suffix):
        self.target_folder = target_folder
        self.file_extension = file_extension
        self.suffix = suffix

    def on_created(self, event):
        if event.is_directory:
            return

        if event.src_path.endswith(self.file_extension):
            self.rename_and_move_file(event.src_path)

    def rename_and_move_file(self, file_path):
        file_name = os.path.basename(file_path)
        new_file_name = f"{os.path.splitext(file_name)[0]}_{self.suffix}{self.file_extension}"
        new_file_path = os.path.join(self.target_folder, new_file_name)
        shutil.move(file_path, new_file_path)
        print(f"Moved and renamed: {new_file_path}")

# 启动浏览器并执行爬虫任务
def run_spider(download_folder):
    # 设置浏览器下载目录
    crawling_process()

    # 等待下载完成

# 监视下载文件夹并处理下载的文件
def monitor_and_download(download_folder, target_folder, file_extension, suffix):
    event_handler = DownloadHandler(target_folder, file_extension, suffix)
    observer = Observer()
    observer.schedule(event_handler, download_folder, recursive=False)
    observer.start()
    print(f"Monitoring {download_folder} for new {file_extension} files...")

    # 启动爬虫

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()

# monitor_and_download(download_folder, current_directory, file_extension, suffix)
if __name__ == "__main__":
   monitor_and_download(download_folder, current_directory, file_extension, suffix)
   crawling_process()