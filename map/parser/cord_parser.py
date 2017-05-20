template = "{lat: %s, lng: %s},"
raw_string = ""
with open('lib.csv', "r") as f:
    raw_string = f.read().split("\n")

raw_string[0] = raw_string[0].replace("\ufeff", "")
ret_string = "["
for i in raw_string[:-1]:
    temp = i[:-2].split(",")
    ret_string += template % (temp[1], temp[2])

print("var locations = " + ret_string[:-1] + "];")
