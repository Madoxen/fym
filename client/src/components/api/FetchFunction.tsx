export const fetchFunction = (url: string, setFun: Function) => {
    fetch(process.env.REACT_APP_API_URL + url, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((r) => { return r.json() })
        .then((r) => {
            setFun(r)
        })
}