""" ML TOOLS """

import os
import sys
import nltk
from textblob.classifiers import NaiveBayesClassifier

pathname = os.path.dirname(sys.argv[0])
fullpath = os.path.abspath(pathname)
nltk.data.path.append(fullpath + "/data/nltk_data")

train = [
    ('.254', 'gateway'),
    ('.1', 'gateway'),
    ('.2', 'host'),
    ('.3', 'host'),
    ('.78', 'host'),
]


# WIP: CHECK FORWARDING STATE
cl = NaiveBayesClassifier(train)


def is_gateway(host):
    result = False

    tests = 1
    proba = 0

    splitted_ip = host['ip_addr'].split('.')[-1]
    # print(splitted_ip)
    prob_dist = cl.prob_classify(splitted_ip)
    # print(prob_dist.max())
    # print(round(prob_dist.prob("gateway"), 2))
    if cl.classify(splitted_ip) == 'gateway':
        result = True

    return result

if __name__ == "__main__":
    hostest = {'ip_addr': "192.168.56.3"}
    print(is_gateway(hostest))
