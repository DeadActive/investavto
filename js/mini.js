const partition = (collection, predicate) => {
    const a = []
    const b = []
    
    let arr = []
    if(Array.isArray(collection))
        arr = collection
    else if(typeof collection === 'object')
        arr = Object.values(collection)

    arr.forEach(value => {
        if(predicate(value))
            a.push(value)
        else
            b.push(value)
    })
    return [a,b]
}

const compact = (arr) => {
    let a = []
    
    arr.forEach(value => {
        if(value !== '' && value && value !== NaN && value !== false && value !== null)
            a.push(value)
    })
    return a
}