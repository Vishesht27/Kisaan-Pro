from flask import Flask, request, abort
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

from API.fwapp import *
from API.utils.DBConnection import *


@app.before_request
def before_request():
    # print("Filters")
    # return {"filters": "filters"}
    pass


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    # Development
    try:
        print('Connecting to the database instance, please wait....')
        # mysql_connection = DBConnection()
        # print("Test Connection Successful", mysql_connection)

    except Exception as e:
        print(e)

    app.run(host='localhost', port=5000, debug=True)

    # Production
    # app.run(host='0.0.0.0', debug=False, port=3000)
