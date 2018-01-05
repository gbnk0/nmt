from termcolor import colored


def write(msg, status):

    if status == 0:
        color = 'green'
        sts = 'OK'
    elif status == 1:
        color = 'yellow'
        sts = 'WARN'
    elif status == 2:
        color = 'red'
        sts = 'FAIL'
    elif status == 3:
        color = 'white'
        sts = '*'
    elif status == 4:
        color = 'green'
        sts = '->'

    text = colored(sts, color)
    result = "[" + text + "] " + msg

    print(result)

if __name__ == "__main__":
    write("Test message", 0)
