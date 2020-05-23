import requests
from json import dumps as dumps_json, loads as loads_json
from datetime import datetime

def store_measurement(temp):
    url_base = 'https://uvb1bb4153.execute-api.eu-central-1.amazonaws.com/Prod'
    headers_base = {'Content-Type': 'application/json'}

    # login
    url_login = url_base+'/login'
    body_login = {'username': 'Black', 'password': '6S.649c5'}

    login_data = loads_json(requests.post(url_login, data=dumps_json(body_login), headers=headers_base).text)
    teamUUID = login_data['teamUUID']

    # get sensors
    url_sensors = url_base+'/sensors'
    headers_sensors = dict(headers_base)
    headers_sensors.update({'teamUUID': teamUUID})

    sensors_data = requests.get(url_sensors, headers=headers_sensors)
    sensor_data_text = loads_json(sensors_data.text)
    sensorUUID = sensor_data_text[0]['sensorUUID']

    # get measurements
    '''
    url_measurements = url_base+'/measurements?sensorUUID=353e2362-932a-442c-9518-bd0017b5f630'
    headers_measurements = headers_sensors

    measurements_data = requests.get(url_measurements, headers=headers_measurements)
    measurements_data_text = loads_json(measurements_data.text)
    print(measurements_data_text)
    '''
    # create measurement
    url_measurements = url_base+'/measurements'
    headers_measurements = headers_sensors
    now = datetime.now()
    date_time = str(now).split(' ')
    date_time[1] = date_time[1][:-3]+"+02:00"
    createdOn = date_time[0]+'T'+date_time[1]

    body_measurements = {'createdOn': createdOn, 'sensorUUID': sensorUUID, 'temperature': str(temp), 'status': 'TEST', 'timestamp': 1576498800000}
    requests.post(url_measurements, data=dumps_json(body_measurements), headers=headers_measurements)
    #print('Measurement uploaded.')

    # create alert
    lowTemp = 0.0
    highTemp = 30.0
    if temp < lowTemp or temp > highTemp:
        url_alerts = url_base+'/alerts'
        headers_alerts = headers_sensors
        now = datetime.now()
        date_time = str(now).split(' ')
        date_time[1] = date_time[1][:-3]+"+02:00"
        createdOn = date_time[0]+'T'+date_time[1]

        body_alerts = {'createdOn': createdOn, 'sensorUUID': sensorUUID, 'temperature': str(temp), 'lowTemperature': str(lowTemp), 'highTemperature': str(highTemp)}
        requests.post(url_alerts, data=dumps_json(body_alerts), headers=headers_alerts)
        #print('Alert sent.')