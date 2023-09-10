const initialState = {
    chatHistory: [],
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                chatHistory: [...state.chatHistory, action.payload],
            };
        default:
            return state;
    }
};

export default chatReducer;
