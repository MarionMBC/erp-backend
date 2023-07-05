import pool from "../../config/database.js"

//Retorna todos los pagos en efectivo
const getCashInvoicePayments = async (request, response) => {
    const query = `SELECT * FROM cashInvoicePayments`;

    try{
        const [payments] = await pool.query(query);
        return response.status(200).json(payments);
    }
    catch(error){
        return response.status(500).json(error);
    }
};

//Búsqueda de un pago en efectivo por su id
const getCashPaymentById = async (request, response) => {
    const query = `SELECT * FROM cashInvoicePayments WHERE id = ?`;
    const id = req.params.id;

    try{
        const [payment] = await pool.query(query, [id])
        if (payment.length>0){
            return response.status(200).json(payment);
        }
        else{  
            res.status(404).json({msg: 'El pago no se ha encontrado'})
        }
    }
    catch(error){
        return res.status(500).json(error);
    }
}

//Agrega una pago en efectivo
const addCashPayment = async (request, response) => {
    const {id,idChasierFK,idInvoiceFK,paymentDate,paymentAmount} = request.body;

    const query = `
    INSERT INTO cashInvoicePayments
        (id,
        idChasierFK, 
        idInvoiceFK, 
        paymentDate, 
        paymentAmount
    VALUES 
        (?,?,?,?,?)`;

    try{
        const [result] = await pool.query(query, 
            [id,
            idChasierFK, 
            idInvoiceFK, 
            paymentDate, 
            paymentAmount]);

        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
};


//Editar un pago en efectivo por su id
const updateCashPayment = async () => {
   
    const {id,
          idChasierFK, 
          idInvoiceFK, 
          paymentDate, 
          paymentAmount} = request.body;

    const query = 
    `UPDATE 
        cashInvoicePayments
    SET 
        (id,
        idChasierFK, 
        idInvoiceFK, 
        paymentDate, 
        paymentAmount,
        updatedAt = CURRENT_TIMESTAMP)
    WHERE 
        id = ?`;

    try{
        const [result] = await pool.query(query,
            [id,
            idChasierFK, 
            idInvoiceFK, 
            paymentDate, 
            paymentAmount]);
        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
}

export {getCashPaymentById,getCashInvoicePayments, addCashPayment, updateCashPayment};