export function isEmpty(str) {
    return (!str || 0 === str.length ||  /^\s*$/.test(str));

//ou(!str || str.rim() === 0)
}