
type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: 'INCREMENT-AGE' | 'INCREMENT-CHILDREN-COUNT' | 'CHANGE-NAME'
    [key: string]: any
}

export function userReducer(state: StateType, action: ActionType, ): StateType {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1}
        case 'CHANGE-NAME':
            return {...state, name: action.name}
        default:
            throw new Error('Not valid action-type')
    }
}