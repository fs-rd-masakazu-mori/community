import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.layers.recurrent import LSTM
from keras.optimizers import Adam
import matplotlib.pyplot as plt

import pandas as pd
from pandas import Series, DataFrame

import datetime

fin = open( 'EURUSD1440back.csv', 'r' )
time = []
velo = []
for line in fin:
	dat = line.rstrip( '\r\n' )
	dat = dat.split( ',' )
	time.append( datetime.datetime.strptime( dat[ 0 ], '%Y.%m.%d' ) )
	velo.append( float( dat[ 2 ] ) )
fin.close()
back = velo

'''
plt.figure()
plt.plot( range( 0, len( back ) ), back, color = "b", label = "input" )
plt.legend()
plt.show()
'''

def build_dataset( inputs ):
    input = []
    expected = []
    maxlen = 25
    for i in range( len( inputs ) - maxlen ):
        input.append( inputs[ i: i + maxlen ] )
        expected.append( inputs[ i + maxlen ] )
    re_input = np.array( input ).reshape( len( input ), maxlen, 1 )
    re_expected = np.array( expected ).reshape( len( input ), 1 )
    return re_input, re_expected

input, expected = build_dataset( back )

length_of_sequence = input.shape[ 1 ]

in_out_neurons = 1
hidden_neurons = 300
model = Sequential()
model.add( LSTM( hidden_neurons, batch_input_shape = 
    ( None, length_of_sequence, in_out_neurons ), return_sequences = False ) )
model.add( Dense( in_out_neurons ) )
model.add( Activation( "linear" ) )
optimizer = Adam( lr = 0.001 )
model.compile( loss = "mean_squared_error", optimizer = optimizer )

model.fit( input, expected,
    batch_size = 500,
    epochs = 5,
    validation_split = 0.2
)

fin = open( 'EURUSD1440forward.csv', 'r' )
time = []
velo = []
for line in fin:
	dat = line.rstrip( '\r\n' )
	dat = dat.split( ',' )
	time.append( datetime.datetime.strptime( dat[ 0 ], '%Y.%m.%d' ) )
	velo.append( float( dat[ 2 ] ) )
fin.close()
forward = velo
forward_input, forward_expected = build_dataset( forward )

predicted = model.predict( forward_input )

plot_data = pd.DataFrame( predicted )
plot_data.columns = [ "predicted" ]
plot_data[ "expected" ] = forward_expected
plot_data.plot()
plt.show()
