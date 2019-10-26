import numpy as np

from sklearn.metrics import accuracy_score, confusion_matrix, roc_curve, roc_auc_score
from sklearn.model_selection import train_test_split, GridSearchCV
import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.utils import np_utils
from keras import backend as K
# K.set_image_dim_ordering('th')
# K.tensorflow_backend.set_image_dim_ordering('th')
import pandas as pd
# keras.backend.image_data_format()

from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
import pickle
import requests
import json

import itertools

import types
import tempfile
import keras.models


def plot_confusion_matrix(cm, classes,
                          normalize=False,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues):
    """
    This function prints and plots the confusion matrix.
    Normalization can be applied by setting `normalize=True`.
    """
    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    if normalize:
        cm = np.round(cm.astype('float') / cm.sum(axis=1)[:, np.newaxis], 5)
        print("Normalized confusion matrix")
    else:
        print('Confusion matrix, without normalization')

    print(cm)

    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, cm[i, j],
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')




# define the CNN model
def cnn_model():
    # create model
    model = Sequential()
    model.add(Conv2D(30, (5, 5), input_shape=(1, 28, 28), activation='relu',  dim_ordering='th'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Conv2D(15, (3, 3), activation='relu',  dim_ordering='th'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.2))
    model.add(Flatten())
    model.add(Dense(128, activation='relu'))
    model.add(Dense(50, activation='relu'))
    model.add(Dense(num_classes, activation='softmax'))
    # Compile model
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
    return model

si= 80000

cat = np.load('data/cat.npy')[:si]
sheep = np.load('data/sheep.npy')[:si]
dog = np.load('data/dog.npy')[:si]
octopus = np.load('data/octopus.npy')[:si]
bee = np.load('data/bee.npy')[:si]
hedgehog = np.load('data/hedgehog.npy')[:si]
giraffe = np.load('data/giraffe.npy')[:si]

print(cat[0].shape)


# add a column with labels, 0=cat, 1=sheep ...
cat = np.c_[cat, np.zeros(len(cat))]
sheep = np.c_[sheep, np.ones(len(sheep))]
dog = np.c_[dog, 2*np.ones(len(dog))]
octopus = np.c_[octopus, 3*np.ones(len(octopus))]
bee = np.c_[bee, 4*np.ones(len(bee))]
hedgehog = np.c_[hedgehog, 5*np.ones(len(hedgehog))]
giraffe = np.c_[giraffe, 6*np.ones(len(giraffe))]


# store the label codes in a dictionary
label_dict = {0:"cat", 1:"sheep", 2:'dog', 3:'octopus', 4:'bee', 5:'hedgehog', 6:'giraffe'}

X = np.concatenate((cat[:si,:-1], sheep[:si,:-1], dog[:si,:-1], octopus[:si,:-1], bee[:si,:-1], hedgehog[:si,:-1], giraffe[:si,:-1]), axis=0).astype('float32') # all columns but the last
y = np.concatenate((cat[:si,-1], sheep[:si,-1], dog[:si,-1], octopus[:si,-1], bee[:si,-1], hedgehog[:si,-1], giraffe[:si,-1]), axis=0).astype('float32') # the last column

X_train, X_test, y_train, y_test = train_test_split(X/255.,y,test_size=0.5,random_state=0)
print(X_train.shape[0])

# one hot encode outputs
y_train_cnn = np_utils.to_categorical(y_train)
y_test_cnn = np_utils.to_categorical(y_test)
num_classes = y_test_cnn.shape[1]


# reshape to be [samples][pixels][width][height]
X_train_cnn = X_train.reshape(X_train.shape[0], 1, 28, 28).astype('float32')
X_test_cnn = X_test.reshape(X_test.shape[0], 1, 28, 28).astype('float32')



# build the model
model = cnn_model()
# Fit the model
model.fit(X_train_cnn, y_train_cnn, validation_data=(X_test_cnn, y_test_cnn), epochs=10, batch_size=200)
# Final evaluation of the model
print(X_train_cnn[0].shape)
scores = model.evaluate(X_test_cnn, y_test_cnn, verbose=0)
print('Final CNN accuracy: ', scores[1])



y_pred_cnn = model.predict_classes(X_test_cnn, batch_size=32, verbose=0)
acc_cnn = accuracy_score(y_test, y_pred_cnn)
print ('CNN accuracy: ',acc_cnn)


# Compute confusion matrix
cnf_matrix = confusion_matrix(y_test, y_pred_cnn)
np.set_printoptions(precision=2)

# Plot non-normalized confusion matrix
plt.figure()
plot_confusion_matrix(cnf_matrix, classes=['cat', 'sheep', 'dog','octopus','bee','hedgehog','giraffe'],
                      title='Confusion matrix, without normalization')

plt.show()



cnn_probab = model.predict(X_test_cnn, batch_size=32, verbose=0)

# extract the probability for the label that was predicted:
p_max = np.amax(cnn_probab, axis=1)


plt.hist(p_max, density=True, bins=list(np.linspace(0,1,11)));
plt.xlabel('p of predicted class');

plt.show()

np.mean(p_max)

np.amin(p_max)

fig, ax = plt.subplots(figsize=(6,15))
print("Hey")
for i in list(range(10)):

    # plot probabilities:
    ax = plt.subplot2grid((10, 7), (i, 0), colspan=4);
    plt.bar(np.arange(7), cnn_probab[i], 0.35, align='center');
    plt.xticks(np.arange(7), ['cat', 'sheep', 'dog','octopus','bee','hedgehog','giraffe'])
    plt.tick_params(axis='x', bottom='off', top='off')
    plt.ylabel('Probability')
    plt.ylim(0,1)
    plt.subplots_adjust(hspace = 0.7)

    # plot picture:
    ax = plt.subplot2grid((10, 7), (i, 4));
    plt.imshow(X_test[i].reshape((28,28)),cmap='gray_r', interpolation='nearest');
    plt.xlabel(label_dict[y_test[i]]); # get the label from the dict
    plt.xticks([])
    plt.yticks([])

plt.show()


# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.33, random_state = 0)

# regressor = LinearRegression()
# regressor.fit(X_train, y_train)
#
# y_pred = regressor.predict(X_test)

# pickle.dump(model, open('model.pkl','wb'))
model.save("model.h5")
# model = pickle.load(open('model.pkl','rb'))
# print(model.predict([[1.8]]))