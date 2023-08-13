import pool from "../../config/database.js"

//Retorna todos los intereses
const getInterest = async (request, response) => {
    const query = `SELECT * FROM invoiceInterest`;

    try{
        const [interest] = await pool.query(query);
        return response.status(200).json(interest);
    }
    catch(error){
        return response.status(500).json(error);
    }
};

//Búsqueda de un interes por su id
const getInterestById = async (request, response) => {
    const query = `SELECT * FROM invoiceInterest WHERE id = ?`;
    const id = req.params.id;

    try{
        const [interest] = await pool.query(query, [id])
        if (interest.length>0){
            return response.status(200).json(interest);
        }
        else{  
            res.status(404).json({msg: 'El interes no se ha encontrado'})
        }
    }
    catch(error){
        return res.status(500).json(error);
    }
}

//Agrega una factura
const addInterest = async (request, response) => {
    const {id, 
          idOutstandingInvoiceFK,
          moneyAmount} = request.body;

    const query = `
    INSERT INTO invoices
        (id, 
        idOutstandingInvoiceFK,
        moneyAmount)
    VALUES 
        (?,?,?)`;

    try{
        const [result] = await pool.query(query, 
            [id, 
            idOutstandingInvoiceFK,
            moneyAmount]);

        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
};


//Editar un interes por su id
const updateInterest = async () => {
   
    const {iid, 
        idOutstandingInvoiceFK,
        moneyAmount} = request.body;

    const query = 
    `UPDATE 
        invoiceInterest
    SET 
        (id = ?, 
        idOutstandingInvoiceFK = ?,
        moneyAmount = ?
        updatedAt = CURRENT_TIMESTAMP)
    WHERE 
        id = ?`;

    try{
        const [result] = await pool.query(query,
            [id, 
            idOutstandingInvoiceFK,
            moneyAmount]);
        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
}

export {getInterestById,getInterest, addInterest, updateInterest};