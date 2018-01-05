import os
from setuptools import setup

__author__ = 'NMT'

setup(
    name='nmt-sensor',
    version='0.0.1',
    scripts=['sensor.py'],
    packages=['.', 'shared'],
    data_files=[("/etc/nmt/",
             ["sensor.conf"])],
    entry_points={
        'console_scripts': [
            'sensor = sensor:main',
        ],
    }
)