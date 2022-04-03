import { ACTION_TYPES } from './Actions';

const initState = {
    isDataGet  : localStorage.getItem('isDataGet')? (localStorage.getItem('isDataGet') === "true" ) : false,
    adminData  : JSON.parse(localStorage.getItem('adminData')) || []
}

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADMIN_LIST:
            return {
                ...state,
                isDataGet  : true,
                adminData : action.adminData
            };

        // case ACTION_TYPES.LOGOUT_USER:
        //     return {
        //         ...state,
        //         isLoggedIn: false
        //     };
        
        default:
            return state;
    }
    
}

export default Reducer;