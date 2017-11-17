import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.optimizers import SGD

model = Sequential( [ Dense( input_dim = 1, units = 1 ), Activation( 'sigmoid' ) ] )
model.compile( loss = 'binary_crossentropy', optimizer = SGD( lr = 0.1 ) )

input = np.array( [ [ 0 ], [ 1 ] ] ) 
expected = np.array( [ [ 1 ], [ 0 ] ] )
model.fit( input, expected, epochs = 200, batch_size = 1 )
print()

classes = model.predict_classes( input, batch_size = 1 )
print( '###### classes ######' )
print( classes )

probably = model.predict_proba( input, batch_size = 1 )
print( '###### probably ######' )
print( probably )
