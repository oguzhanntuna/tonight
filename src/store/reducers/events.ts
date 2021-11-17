const initialState = {
    counter: 0
}

const eventsReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'increase':
            return {
                ...state,
                counter: state.counter + 1
            }
    }

    return state;
}

export default eventsReducer;