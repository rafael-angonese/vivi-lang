interface Token {
    name: string
}

function getToken(): Token {
    return { name: 'token' }
}

const token = getToken()
console.log(token)