import tornado.ioloop
from tornado.web import StaticFileHandler, Application as TornadoApplication
import datetime
import paho.mqtt.client as mqtt
from os.path import dirname, join as join_path
import json
import math
import requests
import rest_api_work as raw
from threading import Timer, Thread

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('templates/index.html', title='Home Page', year=datetime.datetime.now().year, blackAll = blackAll, blackDaysAll = blackDaysAll, pinkAll = pinkAll)

#if __name__ == '__main__':
#    main()
#    app = TornadoApplication([(r'/', MainHandler),(r'/(.*)', StaticFileHandler, {
#            'path': join_path(dirname(__file__), 'static')})])
#    app.listen(8889)
#    tornado.ioloop.IOLoop.current().start()

SERVER = '147.228.124.230'  # RPi
TOPIC = 'ite/#'

lastUpdateDay = None
# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, mid, qos):
    print('Connected with result code qos:', str(qos))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(TOPIC)
    print("Subscribed to:",TOPIC)
   
def store_to_txt(color, status, actual, average, max, min, lastUpdate):
  '''
  Store the data to a .txt file in the following order:
  [color]Status
  [color]Actual
  [color]Average
  [color]Max
  [color]Min
  [color]LastUpdate
  '''
  stuff = [str(status), str(actual), str(average), str(max), str(min), str(lastUpdate)]
  with open(f'save_{color}.txt', 'w') as tf:
    for i in stuff:
      tf.write(i)
      tf.write(str('\n'))
  print('Stored to txt')

def setOffline():
    print('offline')
# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    if (msg.payload == 'Q'):
        client.disconnect()
    print(msg.topic, msg.qos, msg.payload)
    JSON = json.loads(msg.payload)
    teamName = JSON['team_name']
    temperature = JSON['temperature']
    source = JSON['source']
    createdOn = datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f')
    if teamName == 'black':
        blackStatus = 'online'
        Timer(2, setOffline()).start()
        if blackDaysAll != []:
            if blackDaysAll[-1] != createdOn.day:
                blackAll.clear()
                blackDaysAll.clear()
        blackActual = temperature
        blackAll.append(temperature)
        blackDaysAll.append(createdOn.day)
        blackAverage = sum(blackAll) / len(blackAll)
        blackMax = max(blackAll)
        blackMin = min(blackAll)
        blackLastUpdate = blackDateAll[-1]
        raw.store_measurement(blackActual)
        print('Team:', teamName,'Actual:', blackActual,'Average:', blackAverage,'Max:', blackMax,'Min:', blackMin)
        print(blackDaysAll)
        store_to_txt(teamName, blackStatus, blackActual, blackAverage, blackMax, blackMin, blackLastUpdate)
    elif teamName == 'pink':
        if pinkDaysAll != []:
            if pinkDaysAll[-1] != createdOn.day:
                pinkAll.clear()
                pinkDaysAll.clear()
        pinkActual = temperature
        pinkAll.append(temperature)
        pinkDaysAll.append(createdOn.day)
        pinkAverage = sum(pinkAll) / len(pinkAll)
        pinkMax = max(pinkAll)
        pinkMin = min(pinkAll)
        pinkLastUpdate = createdOn
        print('Team:', teamName,'Actual:', pinkActual,'Average:', pinkAverage,'Max:', pinkMax,'Min:', pinkMin)
        print(pinkDaysAll)
        store_to_txt(teamName, pinkStatus, pinkActual, pinkAverage, pinkMax, pinkMin, pinkLastUpdate)
    elif teamName == 'yellow':
        if yellowDaysAll != []:
            if yellowDaysAll[-1] != createdOn.day:
                yellowAll.clear()
                yellowDaysAll.clear()
        yellowActual = temperature
        yellowAll.append(temperature)
        yellowDaysAll.append(createdOn.day)
        yellowAverage = sum(yellowAll) / len(yellowAll)
        yellowMax = max(yellowAll)
        yellowMin = min(yellowAll)
        yellowLastUpdate = createdOn
        print('Team:', teamName,'Actual:', yellowActual,'Average:', yellowAverage,'Max:', yellowMax,'Min:', yellowMin)
        print(yellowDaysAll)
        store_to_txt(teamName, yellowStatus, yellowActual, yellowAverage, yellowMax, yellowMin, yellowLastUpdate)
    elif teamName == 'orange':
        if orangeDaysAll != []:
            if orangeDaysAll[-1] != createdOn.day:
                orangeAll.clear()
                orangeDaysAll.clear()
        orangeActual = temperature
        orangeAll.append(temperature)
        orangeDaysAll.append(createdOn.day)
        orangeAverage = sum(orangeAll) / len(orangeAll)
        orangeMax = max(orangeAll)
        orangeMin = min(orangeAll)
        orangeLastUpdate = createdOn
        print('Team:', teamName,'Actual:', orangeActual,'Average:', orangeAverage,'Max:', orangeMax,'Min:', orangeMin)
        print(orangeDaysAll)
        store_to_txt(teamName, orangeStatus, orangeActual, orangeAverage, orangeMax, orangeMin, orangeLastUpdate)
    elif teamName == 'red':
        if redDaysAll != []:
            if redDaysAll[-1] != createdOn.day:
                redAll.clear()
                redDaysAll.clear()
        redActual = temperature
        redAll.append(temperature)
        redDaysAll.append(createdOn.day)
        redAverage = sum(redAll) / len(redAll)
        redMax = max(redAll)
        redMin = min(redAll)
        redLastUpdate = createdOn
        print('Team:', teamName,'Actual:', redActual,'Average:', redAverage,'Max:', redMax,'Min:', redMin)
        print(redDaysAll)
        store_to_txt(teamName, redStatus, redActual, redAverage, redMax, redMin, redLastUpdate)
    elif teamName == 'green':
        if greenDaysAll != []:
            if greenDaysAll[-1] != createdOn.day:
                greenAll.clear()
                greenDaysAll.clear()
        greenActual = temperature
        greenAll.append(temperature)
        greenDaysAll.append(createdOn.day)
        greenAverage = sum(greenAll) / len(greenAll)
        greenMax = max(greenAll)
        greenMin = min(greenAll)
        greenLastUpdate = createdOn
        print('Team:', teamName,'Actual:', greenActual,'Average:', greenAverage,'Max:', greenMax,'Min:', greenMin)
        print(greenDaysAll)
        store_to_txt(teamName, greenStatus, greenActual, greenAverage, greenMax, greenMin, greenLastUpdate)
    elif teamName == 'blue':
        if blueDaysAll != []:
            if blueDaysAll[-1] != createdOn.day:
                blueAll.clear()
                blueDaysAll.clear()
        blueActual = temperature
        blueAll.append(temperature)
        blueDaysAll.append(createdOn.day)
        blueAverage = sum(blueAll) / len(blueAll)
        blueMax = max(blueAll)
        blueMin = min(blueAll)
        blueLastUpdate = createdOn
        print('Team:', teamName,'Actual:', blueActual,'Average:', blueAverage,'Max:', blueMax,'Min:', blueMin)
        print(blueDaysAll)
        print('Black status: ', blackStatus)
        store_to_txt(teamName, blueStatus, blueActual, blueAverage, blueMax, blueMin, blueLastUpdate)

def mainClient():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.username_pw_set('mqtt_student', password='pivo')

    client.connect(SERVER, 1883, 60)
    client.subscribe(TOPIC)
    print("Subscribed to:",TOPIC)
    #app = TornadoApplication([(r'/', MainHandler),(r'/(.*)', StaticFileHandler, {
    #        'path': join_path(dirname(__file__), 'static')})])
    #app.listen(8889)
    client.loop_forever()

def mainWebserver():
    app = TornadoApplication([(r'/', MainHandler),(r'/(.*)', StaticFileHandler, {
            'path': join_path(dirname(__file__), 'static')})])
    app.listen(8889)
    f1 = tornado.ioloop.IOLoop.current().start()
    t1 = Thread(target = f1)
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

    
    f2 = mainClient

    t2 = Thread(target = f2)

    t2.start()
    mainWebserver()
