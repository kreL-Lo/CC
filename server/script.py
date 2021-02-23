from urllib.parse import urlparse
from threading import Thread
import sys
import requests
from queue import Queue

concurrent = 200

def doWork():
    while True:
        # url = q.get()
        print('here')
        # q.task_done()

def doSomethingWithResult(status, url):
    print (status, url)

q = Queue(concurrent * 2)
for i in range(concurrent):
    t = Thread(target=doWork)
    t.daemon = True
    t.start()
try:
    for url in open('urllist.txt'):
        q.put(url.strip())
    q.join()
except KeyboardInterrupt:
    sys.exit(1)