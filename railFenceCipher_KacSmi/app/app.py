from flask import Flask, render_template, request

app = Flask(__name__)
app.secret_key = 'super secret'
app.debug = True

@app.route('/')
def index():
    return render_template('index.html')

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
        message = request.form['message']
        height = int(request.form['height'])
        encrypted_message = enc_func(message, height)
        return render_template('encrypt.html', encrypted_message=encrypted_message)
    return None

@app.route('/decrypt', methods=['POST'])
def decrypt_page():
    if request.method == 'POST':
        message = request.form['message']
        height = int(request.form['height'])
        decrypted_message = dec_func(message, height)
        return render_template('decrypt.html', decrypted_message=decrypted_message)
    return None

if __name__ == '__main__':
    app.run()