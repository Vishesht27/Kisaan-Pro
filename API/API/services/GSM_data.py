from API.utils.DBConnection import *
import numpy as np


def check_response(response_result):
    response_result['data'] = "Hello from the Kissan Pro API!"
    conn = DBConnection.getInstance()
    if conn is None:
        response_result['message'].append(
            'Connection to the database not successful. Make sure the database is active!')
    else:
        response_result['message'].append('Connection to the database successful!')


def cloud_transmission(response_result, *data):
    conn = DBConnection.getInstance()
    cursor = conn.cursor()

    query = """INSERT INTO GSM(soil_moisture, temperature, humidity, rain_intensity, co2, n, p, k) Values (?, ?, ?, ?, ?, ?, ?, ?)"""

    cursor.execute(query, *data)
    cursor.commit()
    response_result['status'] = 'success'


def fetch_data(response_result):
    conn = DBConnection.getInstance()
    cursor = conn.cursor()

    query = """SELECT * FROM GSM"""
    cursor.execute(query)

    results = cursor.fetchall()
    response_result['data'] = results[-1]
    response_result['status'] = 'success'


# def (response_result):
#     n = np.random.randint(0, 120, 1)
#     p = np.random.randint(0, 120, 1)
#     k = np.random.randint(0, 120, 1)









