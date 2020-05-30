import tornado.ioloop
from tornado.web import StaticFileHandler, Application as TornadoApplication
import datetime
import paho.mqtt.client as mqtt
from os.path import dirname, join as join_path
import json
import math
import requests
import rest_api as raw
from threading import Timer, Thread
import time

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        '''
        Renders the webpage with the data from .txt files.
        '''
        data = {}
        data['black'] = {}
        data['pink'] = {}
        data['yellow'] = {}
        data['orange'] = {}
        data['red'] = {}
        data['green'] = {}
        data['blue'] = {}
        
        with open('save_black.txt', 'r') as black:
            black_lines = black.readlines()
        data['black']['status'] = black_lines[0]
        data['black']['actual'] = black_lines[1]
        data['black']['average'] = black_lines[2]
        data['black']['max'] = black_lines[3]
        data['black']['min'] = black_lines[4]
        data['black']['last_update'] = black_lines[5]
        data['black']['sum'] = black_lines[6]
        data['black']['count'] = black_lines[7]

        with open('save_pink.txt', 'r') as pink:
            pink_lines = pink.readlines()
        data['pink']['status'] = pink_lines[0]
        data['pink']['actual'] = pink_lines[1]
        data['pink']['average'] = pink_lines[2]
        data['pink']['max'] = pink_lines[3]
        data['pink']['min'] = pink_lines[4]
        data['pink']['last_update'] = pink_lines[5]
        data['pink']['sum'] = pink_lines[6]
        data['pink']['count'] = pink_lines[7]

        with open('save_yellow.txt', 'r') as yellow:
            yellow_lines = yellow.readlines()
        data['yellow']['status'] = yellow_lines[0]
        data['yellow']['actual'] = yellow_lines[1]
        data['yellow']['average'] = yellow_lines[2]
        data['yellow']['max'] = yellow_lines[3]
        data['yellow']['min'] = yellow_lines[4]
        data['yellow']['last_update'] = yellow_lines[5]
        data['yellow']['sum'] = yellow_lines[6]
        data['yellow']['count'] = yellow_lines[7]

        with open('save_orange.txt', 'r') as orange:
            orange_lines = orange.readlines()
        data['orange']['status'] = orange_lines[0]
        data['orange']['actual'] = orange_lines[1]
        data['orange']['average'] = orange_lines[2]
        data['orange']['max'] = orange_lines[3]
        data['orange']['min'] = orange_lines[4]
        data['orange']['last_update'] = orange_lines[5]
        data['orange']['sum'] = orange_lines[6]
        data['orange']['count'] = orange_lines[7]

        with open('save_red.txt', 'r') as red:
            red_lines = red.readlines()
        data['red']['status'] = red_lines[0]
        data['red']['actual'] = red_lines[1]
        data['red']['average'] = red_lines[2]
        data['red']['max'] = red_lines[3]
        data['red']['min'] = red_lines[4]
        data['red']['last_update'] = red_lines[5]
        data['red']['sum'] = red_lines[6]
        data['red']['count'] = red_lines[7]

        with open('save_green.txt', 'r') as green:
            green_lines = green.readlines()
        data['green']['status'] = green_lines[0]
        data['green']['actual'] = green_lines[1]
        data['green']['average'] = green_lines[2]
        data['green']['max'] = green_lines[3]
        data['green']['min'] = green_lines[4]
        data['green']['last_update'] = green_lines[5]
        data['green']['sum'] = green_lines[6]
        data['green']['count'] = green_lines[7]

        with open('save_blue.txt', 'r') as blue:
            blue_lines = blue.readlines()
        data['blue']['status'] = blue_lines[0]
        data['blue']['actual'] = blue_lines[1]
        data['blue']['average'] = blue_lines[2]
        data['blue']['max'] = blue_lines[3]
        data['blue']['min'] = blue_lines[4]
        data['blue']['last_update'] = blue_lines[5]
        data['blue']['sum'] = blue_lines[6]
        data['blue']['count'] = blue_lines[7]

        self.render('templates/index.html', title='Home Page', year=datetime.datetime.now().year, data = data),
        # transfering current data to HTML

SERVER = '147.228.124.230'  # RPi
TOPIC = 'ite/#'

lastUpdateDay = None
# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, mid, qos):
    '''
    Subscribe to the MQTT broker.
    '''
    print('Connected with result code qos:', str(qos))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(TOPIC)
    print("Subscribed to:",TOPIC)
   
def store_to_txt(color, status, actual, average, max, min, lastUpdate, sum, number):
  '''
  Store the data to a .txt file in the following order:
  [color]Status
  [color]Actual
  [color]Average
  [color]Max
  [color]Min
  [color]LastUpdate
  [color]Sum
  [color]Number
  '''
  stuff = [str(status), str(actual), str(average), str(max), str(min), str(lastUpdate), str(sum), str(number)]

  with open('save_{}.txt'.format(color), 'w') as tf:
    for i in stuff:
      tf.write(i)
      tf.write('\n')

def setOffline(teamName):
    '''
    Sets the sensor from team named {teamName} to the offline state in .txt file.
    '''
    with open('save_{}.txt'.format(teamName)) as f:
        lines = f.readlines() # load data from txt
    
    if lines[0] == 'online\n':
        lines[0] = 'offline\n' # rewrite just the status line
        with open('save_{}.txt'.format(teamName), "w") as f:
            f.writelines(lines) # save back to txt
        f.close()

def checkTime(): 
    '''
    Checks if the time delay after last recieved data from the individual teams did not exceed 60 seconds. If so, calls setOffline method.
    '''
    checkOn = datetime.datetime.now()
    for key, value in timeChecking.items():
        delay = (checkOn - value).seconds # difference between last message's time and the timer's time
        if delay > 60: 
            setOffline(key)
    Timer(10.0, checkTime).start()

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    '''
    Gets data from payload to the .txt file for individual team names. Used by HTML starting in future.
    '''
    
    if (msg.payload == 'Q'):
        client.disconnect()
    print(msg.topic, msg.qos, msg.payload)
    
    JSON = json.loads(msg.payload) # first load data to JSON format
    teamName = JSON['team_name']
    temperature = JSON['temperature']
    source = JSON['source']
    
    createdOn = datetime.datetime.strftime(datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f'), '%d.%m.%Y %H:%M:%S')
    # message time
    
    timeChecking[str(teamName)] = datetime.datetime.now() #dictionary of times of last recieved data for individual teams
    
    if teamName == 'black':
        blackStatus = 'online' # this is important when a sensor's outage ends
        
        if blackDaysAll != []:
            if blackDaysAll[len(blackDaysAll)-1] != datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day:
                blackAll.clear()
                blackDaysAll.clear() # delete all stored data at the beginning of new day to have the statistics right
                
        blackActual = temperature
        blackAll.append(temperature)
        blackDaysAll.append(datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day)
        # loading the current temp in memory
        
        blackAverage = sum(blackAll) / len(blackAll)
        blackMax = max(blackAll)
        blackMin = min(blackAll)
        blackLastUpdate = createdOn
        
        # All stats needed in the webpage
        
        raw.store_measurement(blackActual) # this is done only in this branch (only our sensor's data is sent to REST API)
        
        print('Team:', teamName,'Actual:', blackActual,'Average:', blackAverage,'Max:', blackMax,'Min:', blackMin)
        
        store_to_txt(teamName, blackStatus, blackActual, blackAverage, blackMax, blackMin, blackLastUpdate, sum(blackAll), len(blackAll))
        # storing utilized data in specific order
    
    
    # ALL SUBSEQUENT BRANCHES DO THE SAME AS 'BLACK' BRANCH, JUST WITH THEIR CORRESPONDING COLORS
    
    elif teamName == 'pink':
        pinkStatus = 'online'
        if pinkDaysAll != []:
            if pinkDaysAll[len(pinkDaysAll)-1] != datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day:
                pinkAll.clear()
                pinkDaysAll.clear()
        pinkActual = temperature
        pinkAll.append(temperature)
        pinkDaysAll.append(datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day)
        pinkAverage = sum(pinkAll) / len(pinkAll)
        pinkMax = max(pinkAll)
        pinkMin = min(pinkAll)
        pinkLastUpdate = createdOn
        print('Team:', teamName,'Actual:', pinkActual,'Average:', pinkAverage,'Max:', pinkMax,'Min:', pinkMin)
        store_to_txt(teamName, pinkStatus, pinkActual, pinkAverage, pinkMax, pinkMin, pinkLastUpdate, sum(pinkAll), len(pinkAll))
    elif teamName == 'yellow':
        yellowStatus = 'online'
        if yellowDaysAll != []:
            if yellowDaysAll[len(yellowDaysAll)-1] != datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day:
                yellowAll.clear()
                yellowDaysAll.clear()
        yellowActual = temperature
        yellowAll.append(temperature)
        yellowDaysAll.append(datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day)
        yellowAverage = sum(yellowAll) / len(yellowAll)
        yellowMax = max(yellowAll)
        yellowMin = min(yellowAll)
        yellowLastUpdate = createdOn
        print('Team:', teamName,'Actual:', yellowActual,'Average:', yellowAverage,'Max:', yellowMax,'Min:', yellowMin)
        store_to_txt(teamName, yellowStatus, yellowActual, yellowAverage, yellowMax, yellowMin, yellowLastUpdate, sum(yellowAll), len(yellowAll))
    elif teamName == 'orange':
        orangeStatus = 'online'
        if orangeDaysAll != []:
            if orangeDaysAll[len(orangeDaysAll)-1] != datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day:
                orangeAll.clear()
                orangeDaysAll.clear()
        orangeActual = temperature
        orangeAll.append(temperature)
        orangeDaysAll.append(datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day)
        orangeAverage = sum(orangeAll) / len(orangeAll)
        orangeMax = max(orangeAll)
        orangeMin = min(orangeAll)
        orangeLastUpdate = createdOn
        print('Team:', teamName,'Actual:', orangeActual,'Average:', orangeAverage,'Max:', orangeMax,'Min:', orangeMin)
        store_to_txt(teamName, orangeStatus, orangeActual, orangeAverage, orangeMax, orangeMin, orangeLastUpdate, sum(orangeAll), len(orangeAll))
    elif teamName == 'red':
        redStatus = 'online'
        if redDaysAll != []:
            if redDaysAll[len(redDaysAll)-1] != datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day:
                redAll.clear()
                redDaysAll.clear()
        redActual = temperature
        redAll.append(temperature)
        redDaysAll.append(datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day)
        redAverage = sum(redAll) / len(redAll)
        redMax = max(redAll)
        redMin = min(redAll)
        redLastUpdate = createdOn
        print('Team:', teamName,'Actual:', redActual,'Average:', redAverage,'Max:', redMax,'Min:', redMin)
        store_to_txt(teamName, redStatus, redActual, redAverage, redMax, redMin, redLastUpdate, sum(redAll), len(redAll))
    elif teamName == 'green':
        greenStatus = 'online'
        if greenDaysAll != []:
            if greenDaysAll[len(greenDaysAll)-1] != datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day:
                greenAll.clear()
                greenDaysAll.clear()
        greenActual = temperature
        greenAll.append(temperature)
        greenDaysAll.append(datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day)
        greenAverage = sum(greenAll) / len(greenAll)
        greenMax = max(greenAll)
        greenMin = min(greenAll)
        greenLastUpdate = createdOn
        print('Team:', teamName,'Actual:', greenActual,'Average:', greenAverage,'Max:', greenMax,'Min:', greenMin)
        store_to_txt(teamName, greenStatus, greenActual, greenAverage, greenMax, greenMin, greenLastUpdate, sum(greenAll), len(greenAll))
    elif teamName == 'blue':
        blueStatus = 'online'
        if blueDaysAll != []:
            if blueDaysAll[len(blueDaysAll)-1] != datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day:
                blueAll.clear()
                blueDaysAll.clear()
        blueActual = temperature
        blueAll.append(temperature)
        blueDaysAll.append(datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f').day)
        blueAverage = sum(blueAll) / len(blueAll)
        blueMax = max(blueAll)
        blueMin = min(blueAll)
        blueLastUpdate = createdOn
        print('Team:', teamName,'Actual:', blueActual,'Average:', blueAverage,'Max:', blueMax,'Min:', blueMin)
        store_to_txt(teamName, blueStatus, blueActual, blueAverage, blueMax, blueMin, blueLastUpdate, sum(blueAll), len(blueAll))

def mainClient():
    '''
    Subscribes over the MQTT protocol to the server.
    '''
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.username_pw_set('mqtt_student', password='pivo') # assigned login details

    client.connect(SERVER, 1883, 60)
    client.subscribe(TOPIC)
    print("Subscribed to:",TOPIC)

    client.loop_forever() # first threads' loop, it would be impossible to do this without threading library

def mainWebserver():
    '''
    Starts the main webserver on the declared port.
    '''    
    
    app = TornadoApplication([(r'/', MainHandler),(r'/(.*)', StaticFileHandler, {
            'path': join_path(dirname(__file__), 'static')})])
    
    app.listen(8889) # PORT
    
    f1 = tornado.ioloop.IOLoop.current().start()
    t1 = Thread(target = f1) # threading library
    t1.start()

if __name__ == '__main__':
    blackAll = []
    blackDaysAll = []

    pinkAll = []
    pinkDaysAll = []

    yellowAll = []
    yellowDaysAll = []

    orangeAll = []
    orangeDaysAll = []

    redAll = []
    redDaysAll = []

    greenAll = []
    greenDaysAll = []

    blueAll = []
    blueDaysAll = []
    
    timeChecking = {}
    Timer(10.0, checkTime).start() #starts the timer thread
    
    f2 = mainClient

    t2 = Thread(target = f2)

    t2.start() # main program thread
    print('Initializing...')
    time.sleep(20) # time delay to prepare text files at startup
    mainWebserver() # webserver thread
    print('Webserver ready')
