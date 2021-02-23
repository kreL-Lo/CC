import requests  
import threading




def thread_func_nr1():
    x = requests.get('http://localhost:8080/metrics')
    print(x.status_code)


def thread_func_nr2():
    x = requests.get('http://localhost:8080/voice?text=hello')
    print(x.status_code)


def thread_func_nr3():
    x = requests.get('http://localhost:8080/numbers?number=1&type=trivia')
    print('here1')

def thread_func_nr4():
    x = requests.get('http://localhost:8080/voiceWeb?number=1&type=trivia')
    print(x.status_code)

def thread_func_nr5():
    x = requests.get('http://localhost:8080/detectLanguage?text=hello')
    print(x.status_code)

def thread_func_nr6():
    x = requests.get('http://localhost:8080/chuck')
    print('here2')

for i in range(0,500):
    th1 = threading.Thread(target = thread_func_nr1,args=())
    th1.start()

    th2 = threading.Thread(target = thread_func_nr2,args=())
    th2.start()

    th3 = threading.Thread(target = thread_func_nr3,args=())
    th3.start()

    th4 = threading.Thread(target = thread_func_nr4,args=())
    th4.start()


    th5 = threading.Thread(target = thread_func_nr5,args=())
    th5.start()

    th6 = threading.Thread(target = thread_func_nr6,args=())
    th6.start()
