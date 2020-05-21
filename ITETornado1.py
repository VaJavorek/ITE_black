import tornado.ioloop
from tornado.web import StaticFileHandler, Application as TornadoApplication
import datetime
import paho.mqtt.client as mqtt
from os.path import dirname, join as join_path
import json
import math
import requests
import rest_api_work as raw

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('templates/index.html', title='Home Page', year=datetime.now().year)

#if __name__ == '__main__':
#    main()
#    app = TornadoApplication([(r'/', MainHandler),(r'/(.*)', StaticFileHandler, {
#            'path': join_path(dirname(__file__), 'static')})])
#    app.listen(8889)
#    tornado.ioloop.IOLoop.current().start()

SERVER = '147.228.124.230'  # RPi
TOPIC = 'ite/#'


# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, mid, qos):
    print('Connected with result code qos:', str(qos))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(TOPIC)
    print("Subscribed to:",TOPIC)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    if (msg.payload == 'Q'):
        client.disconnect()
    #print(msg.topic, msg.qos, msg.payload)
    JSON = json.loads(msg.payload)
    teamName = JSON['team_name']
    temperature = JSON['temperature']
    source = JSON['source']
    createdOn = datetime.datetime.strptime(JSON['created_on'], '%Y-%m-%dT%H:%M:%S.%f')

    if teamName == 'black':
        if createdOn.day != blackLastUpdate.day:
            blackAll.clear()
        blackActual = temperature
        blackAll.append(temperature)
        blackAverage = sum(blackAll) / len(blackAll)
        blackMax = max(blackAll)
        blackMin = min(blackAll)
        blackLastUpdate = createdOn
        raw.store_measurement(blackActual)
        #print(teamName, blackActual, blackAverage, blackMax, blackMin)
    elif teamName == 'pink':
        if createdOn.day != pinkLastUpdate.day:
            pinkAll.clear()
        pinkActual = temperature
        pinkAll.append(temperature)
        pinkAverage = sum(pinkAll) / len(pinkAll)
        pinkMax = max(pinkAll)
        pinkMin = min(pinkAll)
        pinkLastUpdate = createdOn
        #print(teamName, pinkActual, pinkAverage, pinkMax, pinkMin)
    elif teamName == 'yellow':
        if createdOn.day != yellowLastUpdate.day:
            yellowAll.clear()
        yellowActual = temperature
        yellowAll.append(temperature)
        yellowAverage = sum(yellowAll) / len(yellowAll)
        yellowMax = max(yellowAll)
        yellowMin = min(yellowAll)
        yellowLastUpdate = createdOn
        #print(teamName, yellowActual, yellowAverage, yellowMax, yellowMin)
    elif teamName == 'orange':
        if createdOn.day != orangeLastUpdate.day:
            orangeAll.clear()
        orangeActual = temperature
        orangeAll.append(temperature)
        orangeAverage = sum(orangeAll) / len(orangeAll)
        orangeMax = max(orangeAll)
        orangeMin = min(orangeAll)
        orangeLastUpdate = createdOn
        #print(teamName, orangeActual, orangeAverage, orangeMax, orangeMin)
    elif teamName == 'red':
        if createdOn.day != redLastUpdate.day:
            redAll.clear()
        redActual = temperature
        redAll.append(temperature)
        redAverage = sum(redAll) / len(redAll)
        redMax = max(redAll)
        redMin = min(redAll)
        redLastUpdate = createdOn
        #print(teamName, redActual, redAverage, redMax, redMin)
    elif teamName == 'green':
        if createdOn.day != greenLastUpdate.day:
            greenAll.clear()
        greenActual = temperature
        greenAll.append(temperature)
        greenAverage = sum(greenAll) / len(greenAll)
        greenMax = max(greenAll)
        greenMin = min(greenAll)
        greenLastUpdate = createdOn
        #print(teamName, greenActual, greenAverage, greenMax, greenMin)
    elif teamName == 'blue':
        if createdOn.day != blueLastUpdate.day:
            blueAll.clear()
        blueActual = temperature
        blueAll.append(temperature)
        blueAverage = sum(blueAll) / len(blueAll)
        blueMax = max(blueAll)
        blueMin = min(blueAll)
        blueLastUpdate = createdOn
        #print(teamName, blueActual, blueAverage, blueMax, blueMin)

def main():
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


if __name__ == '__main__':
    blackAll = []
    pinkAll = []
    yellowAll = []
    orangeAll = []
    redAll = []
    greenAll = []
    blueAll = []
    main()
