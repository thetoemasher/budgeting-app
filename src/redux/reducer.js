let initialState = {
    months: [],
    monthlyCategories: [],
    categories: [],
    payments: [],
    user: null
}
const UPDATE_STORE = 'UPDATE_STORE'
export default function reducer(state = initialState, action) {
    let {type, payload} = action
    switch(type) {
        case UPDATE_STORE:
            return {...state, ...payload}
        default: 
            return state
    }
}

export function updateStore(replacement) {
    return {
        type: UPDATE_STORE,
        payload: replacement
    }
}