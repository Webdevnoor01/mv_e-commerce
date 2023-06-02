
const mapStateToValues = (state) =>{
    const keys = Object.keys(state)

    const obj = keys.reduce((acc, curr) =>{
        acc[curr] = state[curr].value
        return acc;
    },{})
    return obj
}

export default mapStateToValues