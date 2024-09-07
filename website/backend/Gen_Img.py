from icrawler.builtin import GoogleImageCrawler
f = open("response_obj.txt", "r", encoding="utf-8")
keyword = f.read()
google_Crawler = GoogleImageCrawler(storage = {'root_dir': '../../website/frontend/public/IMG_OF_Station'})
google_Crawler.crawl(keyword = keyword, max_num = 5)