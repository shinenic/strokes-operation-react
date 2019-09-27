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
export const deleteCharacter = str => {
    return {
        type: 'DELETE_CHARACTER',
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

export const cleanAllInput = () => {
    return {
        type: 'CLEAN_ALL_INPUT'
    }
}

export const pickName = (str) => {
    return {
        type: 'PICK_NAME',
        str
    }
}

export const changePage = (next, double) => {
    return {
        type: 'CHANGE_PAGE',
        next,
        double
    }
}
export const changeView = (str) => {
    return {
        type: 'CHANGE_VIEW',
        str
    }
}
export const triggerMenu = (bool) => {
    return {
        type: 'TRIGGER_MENU',
        bool
    }
}

export const testTrigger = (tf) => {
    return {
        type: 'TEST_TRIGGER',
        tf
    }
}



// export const cleanClassName = num => {
//     return {
//         type: 'CLEAN_CLASS_NAME',
//         num
//     }
// }

