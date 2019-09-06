export const searchStrokes = str => {
    return {
        type: 'SEARCH_STROKES',
        str,
    }
}

export const handleInput = (value, inputOption) => {
    return {
        type: 'HANDLE_INPUT',
        value,
        inputOption
    }
}

export const addCharacter = str => {
    return {
        type: 'ADD_CHARACTER',
        str
    }
}
export const combinationSearch = (num, str) => {
    return {
        type: 'COMBINATION_SEARCH',
        num,
        str
    }
}

export const inputTextChange = num => {
    return {
        type: 'INPUT_TEXT_CHANGE',
        num
    }
}

