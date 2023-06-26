from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

app = Flask(__name__)
app.debug = True
CORS(app, supports_credentials=True, expose_headers='Content-Type')

def enc_func(message, height):
    grid = [[] for _ in range(height)]
    row = 0
    direction = 1
    for letter in message:
        grid[row].append(letter)
        if ((row == height - 1) and (direction == 1)) or ((row == 0) and (direction == -1)):
            direction = -direction
        row += direction
    enc_result = ""
    for row in grid:
        enc_result += "".join(row)
    return enc_result

def dec_func(message, height):
    grid = [[] for _ in range(height)]
    row = 0
    direction = 1

    for _ in message:
        grid[row].append("")
        if ((row == height - 1) and (direction == 1)) or ((row == 0) and (direction == -1)):
            direction = -direction
        row += direction
    i = 0
    for row in grid:
        for j in range(len(row)):
            row[j] = message[i]
            i += 1
    dec_result = ""
    row = 0
    direction = 1
    for _ in message:
        dec_result += grid[row][0]
        grid[row] = grid[row][1:]
        if ((row == height - 1) and (direction == 1)) or ((row == 0) and (direction == -1)):
            direction = -direction
        row += direction
    return dec_result

@app.route('/encrypt', methods=['POST'])
def encrypt_page():
    if request.method == 'POST':
        try:
            message = request.json['message']
            height = int(request.json['height'])
            encrypted_message = enc_func(message, height)
            return {'encrypted_message': encrypted_message}
        except Exception as e:
            print(e)

@app.route('/decrypt', methods=['POST'])
def decrypt_page():
    if request.method == 'POST':
        try:
            message = request.json['message']
            height = int(request.json['height'])
            decrypted_message = dec_func(message, height)
            return {'decrypted_message': decrypted_message}
        except Exception as e:
            print(e)

if __name__ == '__main__':
    app.run()

    