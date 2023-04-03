from flask import Flask, jsonify, render_template, request
from wakeonlan import send_magic_packet
from ping3 import ping
from configparser import ConfigParser

app = Flask(__name__)
config = ConfigParser()
config.read('config.ini')

DEFAULT_HOST = config['DEFAULTS']['DEFAULT_HOST']
DEFAULT_MAC = config['DEFAULTS']['DEFAULT_MAC']
DEFAULT_DESTINATION = config['DEFAULTS']['DEFAULT_DESTINATION']

# helper function


def reverse_mac(mac):
    """Reverses a MAC address and formats it with hyphens between each pair of characters."""
    mac = mac.replace(':', '').replace('-', '')
    mac_pairs = [mac[i:i+2] for i in range(0, len(mac), 2)]
    reversed_mac = '-'.join(reversed(mac_pairs))
    return reversed_mac.upper()

# Index route


@app.route('/')
def index():
    return render_template('index.jinja',
                           app=app,
                           default_host=DEFAULT_HOST,
                           default_mac=DEFAULT_MAC,
                           default_destination=DEFAULT_DESTINATION)

# Saving route


@app.route('/save', methods=['POST'])
def save():
    new_hostIP = request.form['hostIP']
    new_mac = request.form['mac-address']
    new_destination = request.form['destination']

    config['DEFAULTS'] = {
        'DEFAULT_HOST': new_hostIP,
        'DEFAULT_MAC': new_mac,
        'DEFAULT_DESTINATION': new_destination
    }

    with open('config.ini', 'w') as configfile:
        config.write(configfile)

    # Return a simple JSON response with a 200 status code
    return jsonify({'message': 'Config saved successfully'}), 200

# API endpoints


@app.route('/api/wol/<mac>', methods=['GET'])
def wol(mac):
    try:
        send_magic_packet(mac)
        return jsonify({'result': True})
    except Exception as e:
        return jsonify({'result': False, 'error': str(e)})


@app.route('/api/sol/<mac>', methods=['GET'])
def sol(mac):
    try:
        cam = reverse_mac(mac)
        send_magic_packet(cam)
        return jsonify({'result': True})
    except Exception as e:
        return jsonify({'result': False, 'error': str(e)})


@app.route('/api/state/ip/<ip>', methods=['GET'])
def state(ip):
    try:
        response_time = ping(ip, timeout=2)
        if response_time is False:
            return jsonify({'status': 'unknown'})
        if response_time is not None:
            return jsonify({'status': 'awake'})
        else:
            return jsonify({'status': 'asleep'})
    except ping.PingError as e:
        return jsonify({'status': 'unknown', 'error': str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9008)
