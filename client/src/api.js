const API_URL = 'http://localhost:8080'

export const listLogEntries = async() => {
    const response = await fetch(`${API_URL}/api/logs`)
    return response.json()
}


export const createLogEntry = async entry => {
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry)
    })

    return response.json()
}