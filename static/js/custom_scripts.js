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
var blackActual
var blackMin
var blackMax
var blackLastUpdate

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
            var blackSumElement = document.getElementById("sum_black")
            var blackCountElement = document.getElementById("count_black")
            blackStatusElement.innerHTML = "online"
            if (blackStatusElement.innerHTML == "online") {
                blackStatusElement.style.color = "green"
                blackActualElement.innerHTML = Math.round(json.temperature * 100) / 100
                if ((json.temperature < 0) || (json.temperature > 30)) {
                    blackActualElement.style.color = "red"
                }
                if (Number(blackMaxElement.innerHTML) < json.temperature) {
                    blackMaxElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                if (Number(blackMinElement.innerHTML) > json.temperature) {
                    blackMinElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                blackSumElement.innerHTML = Number(blackSumElement.innerHTML) + json.temperature
                blackCountElement.innerHTML = Number(blackCountElement.innerHTML) + 1
                blackAverageElement.innerHTML = Math.round((Number(blackSumElement.innerHTML)/Number(blackCountElement.innerHTML)) * 100) / 100
            }
            else {
                blackStatusElement.style.color = "red"
                blackActualElement.innerHTML = '---'
            }

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

            if ((d.getMonth()+1) < 10) {
                var month = "0" + (d.getMonth()+1)
            }
            else {
                var month = (d.getMonth()+1)
            }

            blackLastUpdateElement.innerHTML = d.getDate() + "." + month + "." + d.getFullYear() + " " + d.getHours() + ":" + minutes + ":" + seconds
            console.log(json.created_on)
            //blackLastUpdateElement.innerHTML = d
            setInterval(function () {
                blackStatusElement.innerHTML = "offline";
                blackStatusElement.style.color = "red";
                blackActualElement.innerHTML = "---";
            }, 300000)
            break;
        case "pink":
            var pinkStatusElement = document.getElementById("status_pink")
            var pinkActualElement = document.getElementById("actual_pink")
            var pinkAverageElement = document.getElementById("avg_pink")
            var pinkMaxElement = document.getElementById("max_pink")
            var pinkMinElement = document.getElementById("min_pink")
            var pinkLastUpdateElement = document.getElementById("last_update_pink")
            var pinkSumElement = document.getElementById("sum_pink")
            var pinkCountElement = document.getElementById("count_pink")
            pinkStatusElement.innerHTML = "online"
            if (pinkStatusElement.innerHTML == "online") {
                pinkStatusElement.style.color = "green"
                pinkActualElement.innerHTML = Math.round(json.temperature * 100) / 100
                if (Number(pinkMaxElement.innerHTML) < json.temperature) {
                    pinkMaxElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                if (Number(pinkMinElement.innerHTML) > json.temperature) {
                    pinkMinElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                pinkSumElement.innerHTML = Number(pinkSumElement.innerHTML) + json.temperature
                pinkCountElement.innerHTML = Number(pinkCountElement.innerHTML) + 1
                pinkAverageElement.innerHTML = Math.round((Number(pinkSumElement.innerHTML) / Number(pinkCountElement.innerHTML)) * 100) / 100
            }
            else {
                pinkStatusElement.style.color = "red"
                pinkActualElement.innerHTML = '---'
            }

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

            if ((d.getMonth() + 1) < 10) {
                var month = "0" + (d.getMonth() + 1)
            }
            else {
                var month = (d.getMonth() + 1)
            }

            pinkLastUpdateElement.innerHTML = d.getDate() + "." + month + "." + d.getFullYear() + " " + d.getHours() + ":" + minutes + ":" + seconds
            console.log(json.created_on)
            //pinkLastUpdateElement.innerHTML = d
            setInterval(function () {
                pinkStatusElement.innerHTML = "offline";
                pinkStatusElement.style.color = "red";
                pinkActualElement.innerHTML = "---";
            }, 300000)
            break;
        case "yellow":
            var yellowStatusElement = document.getElementById("status_yellow")
            var yellowActualElement = document.getElementById("actual_yellow")
            var yellowAverageElement = document.getElementById("avg_yellow")
            var yellowMaxElement = document.getElementById("max_yellow")
            var yellowMinElement = document.getElementById("min_yellow")
            var yellowLastUpdateElement = document.getElementById("last_update_yellow")
            var yellowSumElement = document.getElementById("sum_yellow")
            var yellowCountElement = document.getElementById("count_yellow")
            yellowStatusElement.innerHTML = "online"
            if (yellowStatusElement.innerHTML == "online") {
                yellowStatusElement.style.color = "green"
                yellowActualElement.innerHTML = Math.round(json.temperature * 100) / 100
                if (Number(yellowMaxElement.innerHTML) < json.temperature) {
                    yellowMaxElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                if (Number(yellowMinElement.innerHTML) > json.temperature) {
                    yellowMinElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                yellowSumElement.innerHTML = Number(yellowSumElement.innerHTML) + json.temperature
                yellowCountElement.innerHTML = Number(yellowCountElement.innerHTML) + 1
                yellowAverageElement.innerHTML = Math.round((Number(yellowSumElement.innerHTML) / Number(yellowCountElement.innerHTML)) * 100) / 100
            }
            else {
                yellowStatusElement.style.color = "red"
                yellowActualElement.innerHTML = '---'
            }

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

            if ((d.getMonth() + 1) < 10) {
                var month = "0" + (d.getMonth() + 1)
            }
            else {
                var month = (d.getMonth() + 1)
            }

            yellowLastUpdateElement.innerHTML = d.getDate() + "." + month + "." + d.getFullYear() + " " + d.getHours() + ":" + minutes + ":" + seconds
            console.log(json.created_on)
            //yellowLastUpdateElement.innerHTML = d
            setInterval(function () {
                yellowStatusElement.innerHTML = "offline";
                yellowStatusElement.style.color = "red";
                yellowActualElement.innerHTML = "---";
            }, 300000)
            break;
        case "orange":
            var orangeStatusElement = document.getElementById("status_orange")
            var orangeActualElement = document.getElementById("actual_orange")
            var orangeAverageElement = document.getElementById("avg_orange")
            var orangeMaxElement = document.getElementById("max_orange")
            var orangeMinElement = document.getElementById("min_orange")
            var orangeLastUpdateElement = document.getElementById("last_update_orange")
            var orangeSumElement = document.getElementById("sum_orange")
            var orangeCountElement = document.getElementById("count_orange")
            orangeStatusElement.innerHTML = "online"
            if (orangeStatusElement.innerHTML == "online") {
                orangeStatusElement.style.color = "green"
                orangeActualElement.innerHTML = Math.round(json.temperature * 100) / 100
                if (Number(orangeMaxElement.innerHTML) < json.temperature) {
                    orangeMaxElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                if (Number(orangeMinElement.innerHTML) > json.temperature) {
                    orangeMinElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                orangeSumElement.innerHTML = Number(orangeSumElement.innerHTML) + json.temperature
                orangeCountElement.innerHTML = Number(orangeCountElement.innerHTML) + 1
                orangeAverageElement.innerHTML = Math.round((Number(orangeSumElement.innerHTML) / Number(orangeCountElement.innerHTML)) * 100) / 100
            }
            else {
                orangeStatusElement.style.color = "red"
                orangeActualElement.innerHTML = '---'
            }

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

            if ((d.getMonth() + 1) < 10) {
                var month = "0" + (d.getMonth() + 1)
            }
            else {
                var month = (d.getMonth() + 1)
            }

            orangeLastUpdateElement.innerHTML = d.getDate() + "." + month + "." + d.getFullYear() + " " + d.getHours() + ":" + minutes + ":" + seconds
            console.log(json.created_on)
            //orangeLastUpdateElement.innerHTML = d
            setInterval(function () {
                orangeStatusElement.innerHTML = "offline";
                orangeStatusElement.style.color = "red";
                orangeActualElement.innerHTML = "---";
            }, 300000)
            break;
        case "red":
            var redStatusElement = document.getElementById("status_red")
            var redActualElement = document.getElementById("actual_red")
            var redAverageElement = document.getElementById("avg_red")
            var redMaxElement = document.getElementById("max_red")
            var redMinElement = document.getElementById("min_red")
            var redLastUpdateElement = document.getElementById("last_update_red")
            var redSumElement = document.getElementById("sum_red")
            var redCountElement = document.getElementById("count_red")
            redStatusElement.innerHTML = "online"
            if (redStatusElement.innerHTML == "online") {
                redStatusElement.style.color = "green"
                redActualElement.innerHTML = Math.round(json.temperature * 100) / 100
                if (Number(redMaxElement.innerHTML) < json.temperature) {
                    redMaxElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                if (Number(redMinElement.innerHTML) > json.temperature) {
                    redMinElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                redSumElement.innerHTML = Number(redSumElement.innerHTML) + json.temperature
                redCountElement.innerHTML = Number(redCountElement.innerHTML) + 1
                redAverageElement.innerHTML = Math.round((Number(redSumElement.innerHTML) / Number(redCountElement.innerHTML)) * 100) / 100
            }
            else {
                redStatusElement.style.color = "red"
                redActualElement.innerHTML = '---'
            }

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

            if ((d.getMonth() + 1) < 10) {
                var month = "0" + (d.getMonth() + 1)
            }
            else {
                var month = (d.getMonth() + 1)
            }

            redLastUpdateElement.innerHTML = d.getDate() + "." + month + "." + d.getFullYear() + " " + d.getHours() + ":" + minutes + ":" + seconds
            console.log(json.created_on)
            //redLastUpdateElement.innerHTML = d
            setInterval(function () {
                redStatusElement.innerHTML = "offline";
                redStatusElement.style.color = "red";
                redActualElement.innerHTML = "---";
            }, 300000)
            break;
        case "green":
            var greenStatusElement = document.getElementById("status_green")
            var greenActualElement = document.getElementById("actual_green")
            var greenAverageElement = document.getElementById("avg_green")
            var greenMaxElement = document.getElementById("max_green")
            var greenMinElement = document.getElementById("min_green")
            var greenLastUpdateElement = document.getElementById("last_update_green")
            var greenSumElement = document.getElementById("sum_green")
            var greenCountElement = document.getElementById("count_green")
            greenStatusElement.innerHTML = "online"
            if (greenStatusElement.innerHTML == "online") {
                greenStatusElement.style.color = "green"
                greenActualElement.innerHTML = Math.round(json.temperature * 100) / 100
                if (Number(greenMaxElement.innerHTML) < json.temperature) {
                    greenMaxElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                if (Number(greenMinElement.innerHTML) > json.temperature) {
                    greenMinElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                greenSumElement.innerHTML = Number(greenSumElement.innerHTML) + json.temperature
                greenCountElement.innerHTML = Number(greenCountElement.innerHTML) + 1
                greenAverageElement.innerHTML = Math.round((Number(greenSumElement.innerHTML) / Number(greenCountElement.innerHTML)) * 100) / 100
            }
            else {
                greenStatusElement.style.color = "red"
                greenActualElement.innerHTML = '---'
            }

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

            if ((d.getMonth() + 1) < 10) {
                var month = "0" + (d.getMonth() + 1)
            }
            else {
                var month = (d.getMonth() + 1)
            }

            greenLastUpdateElement.innerHTML = d.getDate() + "." + month + "." + d.getFullYear() + " " + d.getHours() + ":" + minutes + ":" + seconds
            console.log(json.created_on)
            //greenLastUpdateElement.innerHTML = d
            setInterval(function () {
                greenStatusElement.innerHTML = "offline";
                greenStatusElement.style.color = "red";
                greenActualElement.innerHTML = "---";
            }, 300000)
            break;
        case "blue":
            var blueStatusElement = document.getElementById("status_blue")
            var blueActualElement = document.getElementById("actual_blue")
            var blueAverageElement = document.getElementById("avg_blue")
            var blueMaxElement = document.getElementById("max_blue")
            var blueMinElement = document.getElementById("min_blue")
            var blueLastUpdateElement = document.getElementById("last_update_blue")
            var blueSumElement = document.getElementById("sum_blue")
            var blueCountElement = document.getElementById("count_blue")
            blueStatusElement.innerHTML = "online"
            if (blueStatusElement.innerHTML == "online") {
                blueStatusElement.style.color = "green"
                blueActualElement.innerHTML = Math.round(json.temperature * 100) / 100
                if (Number(blueMaxElement.innerHTML) < json.temperature) {
                    blueMaxElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                if (Number(blueMinElement.innerHTML) > json.temperature) {
                    blueMinElement.innerHTML = Math.round(json.temperature * 100) / 100
                }
                blueSumElement.innerHTML = Number(blueSumElement.innerHTML) + json.temperature
                blueCountElement.innerHTML = Number(blueCountElement.innerHTML) + 1
                blueAverageElement.innerHTML = Math.round((Number(blueSumElement.innerHTML) / Number(blueCountElement.innerHTML)) * 100) / 100
            }
            else {
                blueStatusElement.style.color = "red"
                blueActualElement.innerHTML = '---'
            }

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

            if ((d.getMonth() + 1) < 10) {
                var month = "0" + (d.getMonth() + 1)
            }
            else {
                var month = (d.getMonth() + 1)
            }

            blueLastUpdateElement.innerHTML = d.getDate() + "." + month + "." + d.getFullYear() + " " + d.getHours() + ":" + minutes + ":" + seconds
            console.log(json.created_on)
            //blueLastUpdateElement.innerHTML = d
            setInterval(function () {
                blueStatusElement.innerHTML = "offline";
                blueStatusElement.style.color = "red";
                blueActualElement.innerHTML = "---";
            }, 300000)
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
    document.getElementById("actual_black").innerHTML = Math.round(Number(document.getElementById("actual_black").innerHTML) * 100) / 100
    if ((Number(document.getElementById("actual_black").innerHTML)) < 0 || (Number(document.getElementById("actual_black")) > 30)) {
        document.getElementById("actual_black").style.color = "red"
    }
    document.getElementById("avg_black").innerHTML = Math.round(Number(document.getElementById("avg_black").innerHTML) * 100) / 100
    document.getElementById("max_black").innerHTML = Math.round(Number(document.getElementById("max_black").innerHTML) * 100) / 100
    document.getElementById("min_black").innerHTML = Math.round(Number(document.getElementById("min_black").innerHTML) * 100) / 100
    if (document.getElementById("status_black").innerHTML == "offline") {
        document.getElementById("status_black").style.color = "red"
        document.getElementById("actual_black").innerHTML = "---"
    }
    else {
        document.getElementById("status_black").style.color = "green"
    }

    document.getElementById("actual_pink").innerHTML = Math.round(Number(document.getElementById("actual_pink").innerHTML) * 100) / 100
    document.getElementById("avg_pink").innerHTML = Math.round(Number(document.getElementById("avg_pink").innerHTML) * 100) / 100
    document.getElementById("max_pink").innerHTML = Math.round(Number(document.getElementById("max_pink").innerHTML) * 100) / 100
    document.getElementById("min_pink").innerHTML = Math.round(Number(document.getElementById("min_pink").innerHTML) * 100) / 100
    if (document.getElementById("status_pink").innerHTML == "offline") {
        document.getElementById("status_pink").style.color = "red"
        document.getElementById("actual_pink").innerHTML = "---"
    }
    else {
        document.getElementById("status_pink").style.color = "green"
    }

    document.getElementById("actual_yellow").innerHTML = Math.round(Number(document.getElementById("actual_yellow").innerHTML) * 100) / 100
    document.getElementById("avg_yellow").innerHTML = Math.round(Number(document.getElementById("avg_yellow").innerHTML) * 100) / 100
    document.getElementById("max_yellow").innerHTML = Math.round(Number(document.getElementById("max_yellow").innerHTML) * 100) / 100
    document.getElementById("min_yellow").innerHTML = Math.round(Number(document.getElementById("min_yellow").innerHTML) * 100) / 100
    if (document.getElementById("status_yellow").innerHTML == "offline") {
        document.getElementById("status_yellow").style.color = "red"
        document.getElementById("actual_yellow").innerHTML = "---"
    }
    else {
        document.getElementById("status_yellow").style.color = "green"
    }

    document.getElementById("actual_orange").innerHTML = Math.round(Number(document.getElementById("actual_orange").innerHTML) * 100) / 100
    document.getElementById("avg_orange").innerHTML = Math.round(Number(document.getElementById("avg_orange").innerHTML) * 100) / 100
    document.getElementById("max_orange").innerHTML = Math.round(Number(document.getElementById("max_orange").innerHTML) * 100) / 100
    document.getElementById("min_orange").innerHTML = Math.round(Number(document.getElementById("min_orange").innerHTML) * 100) / 100
    if (document.getElementById("status_orange").innerHTML == "offline") {
        document.getElementById("status_orange").style.color = "red"
        document.getElementById("actual_orange").innerHTML = "---"
    }
    else {
        document.getElementById("status_orange").style.color = "green"
    }

    document.getElementById("actual_red").innerHTML = Math.round(Number(document.getElementById("actual_red").innerHTML) * 100) / 100
    document.getElementById("avg_red").innerHTML = Math.round(Number(document.getElementById("avg_red").innerHTML) * 100) / 100
    document.getElementById("max_red").innerHTML = Math.round(Number(document.getElementById("max_red").innerHTML) * 100) / 100
    document.getElementById("min_red").innerHTML = Math.round(Number(document.getElementById("min_red").innerHTML) * 100) / 100
    if (document.getElementById("status_red").innerHTML == "offline") {
        document.getElementById("status_red").style.color = "red"
        document.getElementById("actual_red").innerHTML = "---"
    }
    else {
        document.getElementById("status_red").style.color = "green"
    }

    document.getElementById("actual_green").innerHTML = Math.round(Number(document.getElementById("actual_green").innerHTML) * 100) / 100
    document.getElementById("avg_green").innerHTML = Math.round(Number(document.getElementById("avg_green").innerHTML) * 100) / 100
    document.getElementById("max_green").innerHTML = Math.round(Number(document.getElementById("max_green").innerHTML) * 100) / 100
    document.getElementById("min_green").innerHTML = Math.round(Number(document.getElementById("min_green").innerHTML) * 100) / 100
    if (document.getElementById("status_green").innerHTML == "offline") {
        document.getElementById("status_green").style.color = "red"
        document.getElementById("actual_green").innerHTML = "---"
    }
    else {
        document.getElementById("status_green").style.color = "green"
    }

    document.getElementById("actual_blue").innerHTML = Math.round(Number(document.getElementById("actual_blue").innerHTML) * 100) / 100
    document.getElementById("avg_blue").innerHTML = Math.round(Number(document.getElementById("avg_blue").innerHTML) * 100) / 100
    document.getElementById("max_blue").innerHTML = Math.round(Number(document.getElementById("max_blue").innerHTML) * 100) / 100
    document.getElementById("min_blue").innerHTML = Math.round(Number(document.getElementById("min_blue").innerHTML) * 100) / 100
    if (document.getElementById("status_blue").innerHTML == "offline") {
        document.getElementById("status_blue").style.color = "red"
        document.getElementById("actual_blue").innerHTML = "---"
    }
    else {
        document.getElementById("status_blue").style.color = "green"
    }

    mqtt.onMessageArrived = onMessageArrived
    mqtt.connect(options)
}