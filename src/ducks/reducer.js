const initialState = {
    id:0,
    username:'',
    balance:0,
    img:''
} //remember that we want to limit our use of password in the db so don't put them up here.

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';
//typo fixer only

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user //we could have probably had a whole object {id,username,balance,img} 
    }
}

export function clearUser (){ //we don't need to pass in anything to this function because we are going to set everything to 0 or empty.
    return {
        type:CLEAR_USER
    }
}

export default function reducer(state=initialState,action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_USER:
            const {id,username,balance} = payload; //instead of having to pull off of user (this is less typing and cleaner)  
            const img = payload.user_img; //because 'img' was named 'user_img' in our db
            return {...state,id,username,balance,img}; //take the reduxState and then update all of it
        case CLEAR_USER:
            return {...state,id:0,username:'',balance:0,img:''} //can't just clear state because there could be future consequences
        default:
            return state;
    }
}