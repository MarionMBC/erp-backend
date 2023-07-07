import pool from "../../config/database.js"

//Retorna todas las facturas pendientes
const getOutstandingInvoices = async (request, response) => {
    const query = `SELECT * FROM outstandingInvoice`;

    try{
        const [invoices] = await pool.query(query);
        return response.status(200).json(invoices);
    }
    catch(error){
        return response.status(500).json(error);
    }
};

//Búsqueda de una factura pendiente por su id
const getOutstandingInvoiceById = async (request, response) => {
    const query = `SELECT * FROM outstandingInvoices WHERE id = ?`;
    const id = req.params.id;

    try{
        const [invoice] = await pool.query(query, [id])
        if (invoice.length>0){
            return response.status(200).json(invoice);
        }
        else{  
            res.status(404).json({msg: 'La factura no se ha encontrado'})
        }
    }
    catch(error){
        return res.status(500).json(error);
    }
}

//Agrega una factura pendiente
const addOutstandingInvoice = async (request, response) => {
    const {id, 
          idInvoiceFK, 
          idBusinnessCustomerFK, 
          idPurchaseOrder, 
          saleDate,
          dueDate,
          installment,
          interestPerDay,
          status} = request.body;

    const query = `
    INSERT INTO invoices
        (id, 
        idInvoiceFK, 
        idBusinnessCustomerFK, 
        idPurchaseOrder, 
        saleDate,
        dueDate,
        installment,
        interestPerDay,
        status)
    VALUES 
        (?,?,?,?,?,?,?,?,?)`;

    try{
        const [result] = await pool.query(query, 
            [id, 
            idInvoiceFK, 
            idBusinnessCustomerFK, 
            idPurchaseOrder, 
            saleDate,
            dueDate,
            installment,
            interestPerDay,
            Status]);

        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
};


//Editar una factura pendiente por su id
const updateOutstandingInvoice = async () => {
   
    const {id, 
        idInvoiceFK, 
        idBusinnessCustomerFK, 
        idPurchaseOrder, 
        saleDate,
        dueDate,
        installment,
        interestPerDay,
        status} = request.body;

    const query = 
    `UPDATE 
        oustandingInvoices
    SET 
        (id, 
        idInvoiceFK, 
        idBusinnessCustomerFK, 
        idPurchaseOrder, 
        saleDate,
        dueDate,
        installment,
        interestPerDay,
        status,
        updatedAt = CURRENT_TIMESTAMP)
    WHERE 
        id = ?`;

    try{
        const [result] = await pool.query(query,
            [id, 
            idInvoiceFK, 
            idBusinnessCustomerFK, 
            idPurchaseOrder, 
            saleDate,
            dueDate,
            installment,
            interestPerDay,
            status]);
        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
}

export {getOutstandingInvoiceById,getOutstandingInvoices, addOutstandingInvoice, updateOutstandingInvoice};