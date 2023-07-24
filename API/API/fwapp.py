from __main__ import app
from functools import wraps
from flask import request

from .services.GSM_data import *
import json


@app.route("/api/response_check", methods=['GET'])
def api_response_check():
    response_result = {
        'status': 'not_allowed',
        'message': ['Not authenticated'],
        'data': {}}
    try:
        check_response(response_result)
    except Exception as e:
        print("Exception :", e)

    return json.dumps(response_result)


@app.route("/api/cloud_transmission", methods=['POST', 'GET'])
def api_cloud_transmission():
    response_result = {
        'status': 'not_allowed',
        'message': ['Not authenticated'],
        'data': {}}
    try:
        GSM_data = request.get_json()
        print(GSM_data)
        response_result['status'] = 'success'
        pass
    except Exception as e:
        print("Exception :", e)

    return json.dumps(response_result)


@app.route('/api/fetch_data', methods=['POST'])
def api_fetch_data():
    response_result = {
        'status': 'not_allowed',
        'message': ['Not authenticated'],
        'data': {}}
    try:
        fetch_data(response_result)
    except Exception as e:
        print("Exception :", e)

    return json.dumps(response_result)


@app.route('/api/npk_outlier')
def api_npk_outlier():
    response_result = {
        'status': 'not_allowed',
        'message': ['Not authenticated'],
        'data': {}}
    try:
        pass
    except Exception as e:
        print("Exception :", e)

    return json.dumps(response_result)