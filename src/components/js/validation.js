export const checkLength = (value, max, min)=>{
    return value.length>=min && value.length<=max
}


export const validateUsername = (value)=>{
    return checkLength(value, 16, 1)
}

export const validateEmail = (value)=>{
    return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value)
}


export const validateContact = (value)=>{
    return (/^[0-9]+$/).test(value) && checkLength(value, 10, 10)
}
export const validatePassword = (value)=>{
    return checkLength(value, 20, 8)
}
export const validateConfirmPassword = (value, password)=>{
    return value===password
}