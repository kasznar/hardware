import network
import socket
from time import sleep
from picozero import pico_temp_sensor, pico_led
import machine
import json

ssid = ''
password = ''

def connect():
    #Connect to WLAN
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    while wlan.isconnected() == False:
        print('Waiting for connection...')
        sleep(1)
    ip = wlan.ifconfig()[0]
    print(f'Connected on {ip}')
    return ip


def open_socket(ip):
    # Open a socket
    address = (ip, 80)
    connection = socket.socket()
    connection.bind(address)
    connection.listen(1)
    return connection


def serve(connection):
    #Start a web server
    pico_led.off()
    while True:
        client = connection.accept()[0]
        print('connection accept')
        request = client.recv(1024)
        print('request')
        print(request)
        request = str(request)
        try:
            print('splitup')
            message = request.split("\\r\\n\\r\\n")[1]
            message = message.replace("\\n", "\n")
            message = message[:-1]

            print(message)
            data = json.loads(message)
            print(data)
        except IndexError:
            pass

        client.send(str('HTTP/1.1 200 OK'))
        client.close()


try:
    ip = connect()
    connection = open_socket(ip)
    serve(connection)
except KeyboardInterrupt:
    machine.reset()
