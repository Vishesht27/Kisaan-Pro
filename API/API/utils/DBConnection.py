from __main__ import app

import pyodbc
from decouple import config


class DBConnection:
    __mysql = None

    @staticmethod
    def getInstance():
        return DBConnection.__mysql

    def __init__(self):
        if DBConnection.__mysql is not None:
            """ Raise exception if init is called more than once. """
            raise Exception("This class is a singleton!")
        else:
            app.config['AZURE_SQL_HOST'] = config('SERVER')
            app.config['AZURE_SQL_USERNAME'] = config('USERNAME2')
            app.config['AZURE_SQL_PASSWORD'] = config('PASSWORD')
            app.config['AZURE_SQL_DB'] = config('DATABASE')
            app.config['AZURE_SQL_DRIVER'] = config('DRIVER')

            # print(app.config)

            DBConnection.__mysql = pyodbc.connect('DRIVER=' + app.config['AZURE_SQL_DRIVER'] +
                                                  ';SERVER=' + app.config['AZURE_SQL_HOST'] +
                                                  ';DATABASE=' + app.config['AZURE_SQL_DB'] +
                                                  ';UID=' + app.config['AZURE_SQL_USERNAME'] +
                                                  ';PWD=' + app.config['AZURE_SQL_PASSWORD']
                                                  )
