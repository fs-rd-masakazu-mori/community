import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.optimizers import SGD

model = Sequential()
model.add( Dense( input_dim = 2, units = 2 ) )
model.add( Activation( 'sigmoid' ) )
model.add( Dense( units = 1 ) )
model.add( Activation( 'sigmoid' ) )
model.compile( loss = 'binary_crossentropy', optimizer = SGD( lr = 0.1 ) )

input = np.array( [ [ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ] ] )
expected = np.array( [ [ 0 ], [ 1 ], [ 1 ], [ 0 ] ] )
model.fit( input, expected, epochs = 800, batch_size = 1 )
print()

classes = model.predict_classes( input, batch_size = 1 )
print( '###### classes ######' )
print( classes )

probably = model.predict_proba( input, batch_size = 1 )
print( '###### probably ######' )
print( probably )
