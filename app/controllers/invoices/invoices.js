import pool from "../../config/database.js"

//Retorna todas las facturas
const getInvoices = async (request, response) => {
    const query = `SELECT * FROM invoices`;

    try{
        const [invoices] = await pool.query(query);
        return response.status(200).json(invoices);
    }
    catch(error){
        return response.status(500).json(error);
    }
};

//Búsqueda de una factura por su id
const getInvoiceById = async (request, response) => {
    const query = `SELECT * FROM invoices WHERE id = ?`;
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

//Agrega una factura
const addInvoice = async (request, response) => {
    const {id, 
          idCustomer, 
          idSeller, 
          idPurchaseOrder, 
          invoiceCode, 
          cai,
          rtn,
          invoiceType,
          saleDate,
          dueDate,
          creditDays,
          invoiceNotes} = request.body;

    const query = `
    INSERT INTO invoices
        (id,
        idCustomer, 
        idSeller, 
        idPurchaseOrder, 
        invoiceCode,
        cai,
        rtn,
        invoiceType,
        saleDate,
        dueDate,
        creditDays,
        invoiceNotes)
    VALUES 
        (?,?,?,?,?,?,?,?,?,?,?)`;

    try{
        const [result] = await pool.query(query, 
            [id, 
            idCustomer, 
            idSeller, 
            idPurchaseOrder, 
            invoiceCode, 
            cai,
            rtn,
            invoiceType,
            saleDate,
            dueDate,
            creditDays,
            invoiceNotes]);

        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
};


//Editar una factura por su id
const updateInvoice = async () => {
   
    const {id,
           idCustomer, 
           idSeller, 
           idPurchaseOrder, 
           invoiceCode,
           cai,
           rtn,
           invoiceType,
           saleDate,
           dueDate,
           creditDays,
           invoiceNotes} = request.body;

    const query = 
    `UPDATE 
        invoices
    SET 
        (id,
        idCustomer, 
        idSeller, 
        idPurchaseOrder, 
        invoiceCode,
        cai,
        rtn,
        invoiceType,
        saleDate,
        dueDate,
        creditDays,
        invoiceNotes,
        updatedAt = CURRENT_TIMESTAMP)
    WHERE 
        id = ?`;

    try{
        const [result] = await pool.query(query,
            [id,
            idCustomer, 
            idSeller, 
            idPurchaseOrder, 
            invoiceCode,
            cai,
            rtn,
            invoiceType,
            saleDate,
            dueDate,
            creditDays,
            invoiceNotes]);
        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error);
    }
}

export {getInvoiceById,getInvoices, addInvoice, updateInvoice};