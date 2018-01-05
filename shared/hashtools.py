import shortuuid


def make_shortuuid(string):
    return shortuuid.uuid(name=string)
