import os

with open('./input.txt', 'r') as f:
    data = f.readlines()

print(''.join(data).__repr__())
