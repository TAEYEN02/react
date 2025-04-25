//reducer
//액션에 따라 state를 변경하는 함수

//useState()의 역할을 하는 것
const initialState = {
    count: 0,
    message : '',
}

//reducer함수는 (state, action) => new State형태의 순수 함수이다
//이전 상태와 액션을 받아 새로운 state를 계산해서 반환한다
export const CounterReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1,
            }

        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.payload
            }
        //액션 타입이 매치되지 않을 경우, 현재 상태를 그대로 반환함
        default:
            return state;

    }
}