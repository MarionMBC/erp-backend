import pool from "../../config/database.js"

//Retorna todos los pagos pendientes
const getOutstandingPayment = async (request, response) => {
    const query = `SELECT * FROM outstandingInvoicePayments`;

    try{
        const [outstandingpayments] = await pool.query(query);
        return response.status(200).json(outstandingpayments);
    }
    catch(error){
        return response.status(500).json(error);
    }
};

//Búsqueda de un pago pendiente por su id
const getOutstandingPaymentById = async (request, response) => {
    const query = `SELECT * FROM outstandingInvoicePayments WHERE id = ?`;
    const id = req.params.id;

    try{
        const [outstandingpayments] = await pool.query(query, [id])
        if (payment.length>0){
            return response.status(200).json(outstandingpayments);
        }
        else{  
            res.status(404).json({msg: 'El pago no se ha encontrado'})
        }
    }
    catch(error){
        return res.status(500).json(error);
    }
}

//Agrega un pago pendiente
const addOutstandingPayment = async (request, response) => {
    const {id,idOustandingInvoiceFK,idChasierFK,paymentDate,paymentAmount,installment,interestAmount} = request.body;

    const query = `
    INSERT INTO outstandingInvoicePayments
        (id,
        idOustandingInvoiceFK, 
        idChasierFK, 
        paymentDate, 
        paymentAmount,
        installment,
        interestAmount
    VALUES 
        (?,?,?,?,?,?,?)`;

    try{
        const [result] = await pool.query(query, 
            [id,
            idOustandingInvoiceFK, 
            idChasierFK, 
            paymentDate, 
            paymentAmount,
            installment,
            interestAmount]);

        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
};


//Editar un pago pendiente por su id
const updateOutstandingPayments = async () => {
   
    const {id,
            idOustandingInvoiceFK, 
            idChasierFK, 
            paymentDate, 
            paymentAmount,
            installment,
            interestAmount} = request.body;

    const query = 
    `UPDATE 
        outstandingInvoicePayments
    SET 
        (id,
        idOustandingInvoiceFK, 
        idChasierFK, 
        paymentDate, 
        paymentAmount,
        installment,
        interestAmount,
        updatedAt = CURRENT_TIMESTAMP)
    WHERE 
        id = ?`;

    try{
        const [result] = await pool.query(query,
            [id,
            idOustandingInvoiceFK, 
            idChasierFK, 
            paymentDate, 
            paymentAmount,
            installment,
            interestAmount]);
        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
}

export {getOutstandingPayment,getOutstandingPaymentById, addOutstandingPayment, updateOutstandingPayments};