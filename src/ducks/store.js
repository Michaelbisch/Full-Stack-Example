import {createStore} from 'redux';
import reducer from './reducer';

export default createStore(reducer)


//if you wanted to do multiple reducers:

// import {createStore, combinedReducer} from 'redux';
// import reducer from './reducer';
// export default ______________