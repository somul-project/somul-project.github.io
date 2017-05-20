template = "<a class=\"library_link\" id=\"%d\">%s</a>"
raw_string = ""
with open('lib.csv', "r") as f:
    raw_string = f.read().split("\n")

raw_string[0] = raw_string[0].replace("\ufeff", "")

ret_string = ""
c = 1
for i in raw_string:
    temp = i[:-2].split(",")
    ret_string += (template % (c, temp[0])) + "\n"
    c += 1

print(ret_string)

