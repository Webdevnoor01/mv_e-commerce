
/**
 * 
 * @param {object} res res should be response object
 * @param {number} code code should be a number
 * @param {object} data data should ba an object
 * @returns 
 */
const returnResponse = (res, code, data) =>{
    return res.status(code).json(data)
}

module.exports = returnResponse