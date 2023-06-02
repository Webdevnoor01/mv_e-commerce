
/**
 * 
 * @param {object} values must be an object 
 */
const mapValuesToState = (values={}) =>{
    const data = Object.values(values)

   const obj =  data.reduce((acc, curr) =>{
        acc[curr.name] = {
            value:"",
            error:"",
            active:false
        }
        return acc
    },{})
    return obj
}

export default mapValuesToState