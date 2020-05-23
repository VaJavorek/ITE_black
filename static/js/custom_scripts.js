function on_loaded() {
    console.log('I am here.');
    document.getElementById("actual").innerHTML = "black";
}

var mqtt
var reconnectTimeout = 2000
var broker = "147.228.124.230"
var port = 9001
var clientID = "WebPageClient"

var blackAverage
var blackAll = []
var blackMin
var blackMax
var blackSum = 0

var pinkAverage
var pinkAll = []
var pinkMin
var pinkMax
var pinkSum = 0

var yellowAverage
var yellowAll = []
var yellowMin
var yellowMax
var yellowSum = 0

var orangeAverage
var orangeAll = []
var orangeMin
var orangeMax
var orangeSum = 0

var redAverage
var redAll = []
var redMin
var redMax
var redSum = 0

var greenAverage
var greenAll = []
var greenMin
var greenMax
var greenSum = 0

var blueAverage
var blueAll = []
var blueMin
var blueMax
var blueSum = 0


function onFailure(message) {
    console.log("Connection to Host " + broker + " failed")
    document.getElementById("client_status").innerHTML = "offline"
    document.getElementById("client_status").style.color = "red"
    setTimeout(MQTTconnect, reconnectTimeout)
}

function onMessageArrived(msg) {
    json = JSON.parse(msg.payloadString)
    console.log("New message,", msg.destinationName)
    console.log(json)
    switch (json.team_name) {
        case "black":
            var blackStatusElement = document.getElementById("status_black")
            var blackActualElement = document.getElementById("actual_black")
            var blackAverageElement = document.getElementById("avg_black")
            var blackMaxElement = document.getElementById("max_black")
            var blackMinElement = document.getElementById("min_black")
            var blackLastUpdateElement = document.getElementById("last_update_black")

            blackStatusElement.innerHTML = "online"
            if (blackStatusElement.innerHTML == "online") {
                blackStatusElement.style.color = "green"
                blackActualElement.innerHTML = Math.round(json.temperature * 100) / 100
                blackAll.push(json.temperature)
                blackSum = blackSum + json.temperature
                blackAverage = blackSum / blackAll.length
                blackMin = Math.min.apply(Math, blackAll)
                blackMax = Math.max.apply(Math, blackAll)
            }
            else {
                blackStatusElement.style.color = "red"
                blackActualElement.innerHTML = '---'
            }
            blackAverageElement.innerHTML = Math.round(blackAverage * 100) / 100
            blackMaxElement.innerHTML = Math.round(blackMax * 100) / 100
            blackMinElement.innerHTML = Math.round(blackMin * 100) / 100
            var d = new Date(json.created_on)

            if (d.getMinutes() < 10) {
                var minutes = "0" + d.getMinutes()
            }
            else {
                var minutes = d.getMinutes()
            }

            if (d.getSeconds() < 10) {
                var seconds = "0" + d.getSeconds()
            }
            else {
                var seconds = d.getSeconds()
            }

            blackLastUpdateElement.innerHTML = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " " + d.getHours() + ":" + minutes + ":" + seconds
            console.log(json.created_on)
            //blackLastUpdateElement.innerHTML = d
            setInterval(function () {
                blackStatusElement.innerHTML = "offline";
                blackStatusElement.style.color = "red";
                blackActualElement.innerHTML = "---";
            }, 300000)
            break;
        case "pink":
            document.getElementById("actual_pink").innerHTML = Math.round(json.temperature * 100) / 100
            pinkAll.push(json.temperature)
            pinkSum = pinkSum + json.temperature
            pinkAverage = pinkSum / pinkAll.length
            pinkMin = Math.min.apply(Math, pinkAll)
            pinkMax = Math.max.apply(Math, pinkAll)
            document.getElementById("avg_pink").innerHTML = Math.round(pinkAverage * 100) / 100
            document.getElementById("max_pink").innerHTML = Math.round(pinkMax * 100) / 100
            document.getElementById("min_pink").innerHTML = Math.round(pinkMin * 100) / 100
            break;
        case "yellow":
            document.getElementById("actual_yellow").innerHTML = Math.round(json.temperature * 100) / 100
            yellowAll.push(json.temperature)
            yellowSum = yellowSum + json.temperature
            yellowAverage = yellowSum / yellowAll.length
            yellowMin = Math.min.apply(Math, yellowAll)
            yellowMax = Math.max.apply(Math, yellowAll)
            document.getElementById("avg_yellow").innerHTML = Math.round(yellowAverage * 100) / 100
            document.getElementById("max_yellow").innerHTML = Math.round(yellowMax * 100) / 100
            document.getElementById("min_yellow").innerHTML = Math.round(yellowMin * 100) / 100
            break;
        case "orange":
            document.getElementById("actual_orange").innerHTML = Math.round(json.temperature * 100) / 100
            orangeAll.push(json.temperature)
            orangeSum = orangeSum + json.temperature
            orangeAverage = orangeSum / orangeAll.length
            orangeMin = Math.min.apply(Math, orangeAll)
            orangeMax = Math.max.apply(Math, orangeAll)
            document.getElementById("avg_orange").innerHTML = Math.round(orangeAverage * 100) / 100
            document.getElementById("max_orange").innerHTML = Math.round(orangeMax * 100) / 100
            document.getElementById("min_orange").innerHTML = Math.round(orangeMin * 100) / 100
            break;
        case "red":
            document.getElementById("actual_red").innerHTML = Math.round(json.temperature * 100) / 100
            redAll.push(json.temperature)
            redSum = redSum + json.temperature
            redAverage = redSum / redAll.length
            redMin = Math.min.apply(Math, redAll)
            redMax = Math.max.apply(Math, redAll)
            document.getElementById("avg_red").innerHTML = Math.round(redAverage * 100) / 100
            document.getElementById("max_red").innerHTML = Math.round(redMax * 100) / 100
            document.getElementById("min_red").innerHTML = Math.round(redMin * 100) / 100
            break;
        case "green":
            document.getElementById("actual_green").innerHTML = Math.round(json.temperature * 100) / 100
            greenAll.push(json.temperature)
            greenSum = greenSum + json.temperature
            greenAverage = greenSum / greenAll.length
            greenMin = Math.min.apply(Math, greenAll)
            greenMax = Math.max.apply(Math, greenAll)
            document.getElementById("avg_green").innerHTML = Math.round(greenAverage * 100) / 100
            document.getElementById("max_green").innerHTML = Math.round(greenMax * 100) / 100
            document.getElementById("min_green").innerHTML = Math.round(greenMin * 100) / 100
            break;
        case "blue":
            document.getElementById("actual_blue").innerHTML = Math.round(json.temperature * 100) / 100
            blueAll.push(json.temperature)
            blueSum = blueSum + json.temperature
            blueAverage = blueSum / blueAll.length
            blueMin = Math.min.apply(Math, blueAll)
            blueMax = Math.max.apply(Math, blueAll)
            document.getElementById("avg_blue").innerHTML = Math.round(blueAverage * 100) / 100
            document.getElementById("max_blue").innerHTML = Math.round(blueMax * 100) / 100
            document.getElementById("min_blue").innerHTML = Math.round(blueMin * 100) / 100
            break;
    }
}

function onConnect() {
    mqtt.subscribe("ite/#")
    console.log("Connected to broker")
    document.getElementById("client_status").innerHTML = "online"
    document.getElementById("client_status").style.color = "green"
}


function sendMessage(m, topic) {
    message = new Paho.MQTT.Message(m)
    message.destinationName = topic
    mqtt.send(message)
    console.log("Message " + m + " published to topic", topic)
}

function MQTTconnect() {
    console.log("Connecting to " + broker + " " + port)
    mqtt = new Paho.MQTT.Client(broker, port, clientID)
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
        password: "pivo",
        userName: "mqtt_student"
    }
    mqtt.onMessageArrived = onMessageArrived
    mqtt.connect(options)
}