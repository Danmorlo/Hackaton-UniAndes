import numpy as np
from flask import Flask, request, jsonify
from keras.models import load_model
from PIL import Image
app = Flask(__name__)
import urllib.request
import json

model = load_model('model.h5')
model.summary()


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(MyEncoder, self).default(obj)


@app.route('/api',methods=['POST'])
def predict():

    data = request.get_json(force=True)
    print(data)
    s = data['exp']

    with urllib.request.urlopen(s) as url:
        with open('temp.jpg', 'wb') as f:
            f.write(url.read())

    foo = Image.open('temp.jpg').convert('L')
    foo = foo.resize((28, 28), Image.ANTIALIAS)
    # print(n.shape)
    #
    # prediction = model.predict([[n]])

    n = np.asarray(foo)
    n = n.reshape((28, 28))
    n = np.array([n])
    prediction = model.predict([[n]])

    #
    # output = prediction[0]
    pop = {}

    pop["cat"]= prediction[0][0]
    pop["sheep"] =prediction[0][1]
    pop["dog"] =prediction[0][2]
    pop["octopus"] =prediction[0][3]
    pop["bee"] =prediction[0][4]
    pop["hedgehog"] =prediction[0][5]
    pop["giraffe"] =prediction[0][6]
    # pop["data"] = prediction
    # print(output)

    return json.dumps(pop, cls=MyEncoder)
    # return "hola"

@app.route('/potter',methods=['GET', 'POST'])
def potter():
    output = 0

    foo = Image.open('data/perro.png').convert('L')
    print(foo.size)
    foo = foo.resize((28, 28), Image.ANTIALIAS)
    # print(foo)
    # foo.show()
    print(type(foo))
    n = np.asarray(foo)

    n = n.reshape((28, 28))
    print(n.shape)
    # for i in n:
        # for j in i:
            # print(j)
        # print("\n")

    # n = np.expand_dims(n, axis=-1)
    n = np.array([n])
    # n = np.resize(n, (28, 28))
    print(n.shape)
    prediction = model.predict([[n]])

    pop = {}
    pop["data"] = prediction
    # output = prediction[0]
    print(pop)

    return jsonify(pop)
    # return "Probabilidad de ser un gato: " + str(output[0]) + str("\n") + "Probabilidad de ser una oveja: " + str(output[1]) \
    #        + str("\n") + "Probabilidad de ser un perro: " + str(output[2]) + str("\n") + "Probabilidad de ser un pulpo: " \
    #        + str(output[3]) + str("\n") +  "Probabilidad de ser una abeja: " + str(output[4]) + str("\n") + \
    #         "Probabilidad de ser un erizo: " + str(output[5]) + str("\n") + "Probabilidad de ser una jirafa: " + str(output[2]) + str("\n")

if __name__ == '__main__':
    app.run( threaded=False, host="0.0.0.0",port=5000)