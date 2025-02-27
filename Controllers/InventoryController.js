    const db = require("../config/db");

    //GET ALL Inventory LIST
    const getInventory = async (req,res) => {
        try {
            const data = await db.query('SELECT * FROM TBL_Inventory')
            if (!data) {
                return res.status(404).send({
                    success:false,
                    message:'No Records found'
                })
            }
            res.status(200).send({
                success:true,
                message:'All Inventory Records',
                totalInventory: data[0].length,
                data: data[0],
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error in Get ALL Inventory',
                error
            })
        }
    };

    //GET Inventory BY ID
    const getInventoryByID = async (req, res) => {
        try {
            const Item_ID = req.params.id
            if (!Item_ID) {
                return res.status(404).send({
                    success:false,
                    message:'Invalid Or Provide Student Id'
                })
            }
        const data = await db.query(`SELECT * FROM TBL_Inventory WHERE Item_ID =?`,[Item_ID])
            if (!data) {
                return res.status(404).send({
                    success:false,
                    message:'no Records Found '
                })
            }
            res.status(200).send({
                success:true,
                InventoryDetails:data[0],
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:'Error Getting Inventory by ID',
                error
            });
        }
    }


    //CREATE Inventory
    const createInventory = async (req, res) => {
        try {
            const {Item_ID, Item_Name, Category, Quantity, Unit_Price, Supplier, Status} = req.body
            if (!Item_Name || !Category || !Quantity || !Unit_Price || !Supplier || !Status ) {
                return res.status(500).send({
                    success:false,
                    message:'Please Provide all fields'
                })
            }
            const data = await db.query(`INSERT INTO TBL_Inventory (Item_ID, Item_Name, Category, Quantity, Unit_Price, Supplier, Status) 
                VALUES (?, ?, ?, ?, ?, ?, ? )`,
                [Item_ID, Item_Name, Category, Quantity, Unit_Price, Supplier, Status])
            if (!data) {
                return res.status(404).send({
                    success:false,
                    message:'Error in Insert Query '

                })    
            }
            res.status(201).send({
                success:true,
                message:'New Inventory Inserted',
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message: 'Error in Inserting Inventory',
                error
            })
        }
    };


    //UPDATE Inventory
    const updateInventory = async(req, res) => {

        try {
            const Item_ID = req.params.id
            if (!Item_ID) {
                return res.status(404).send({
                    success:false,
                    message:'Invalid ID or Provide ID'
                })
            }
            const {Item_Name, Category, Quantity, Unit_Price, Supplier, Status} = req.body
            const data = await db.query(`UPDATE TBL_Inventory SET Item_Name = ? , Category = ? , Quantity = ?, Unit_Price = ?, Supplier = ?, Status = ? WHERE Item_ID = ?`, [Item_Name, Category, Quantity, Unit_Price, Supplier, Status, Item_ID])
            if (!data) {
                return res.status(500).send({
                    success:false,
                    message:'Error In Update Data'
                })
            }
            res.status(200).send({
                success:true,
                message:'Inventory Details Updated',
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message:'Error in updating Inventory details',
                error
            });
            
        }

    };

    //Delete Inventory
    const deleteInventory = async(req, res) => {
        try {
            const Item_ID = req.params.id
            if (!Item_ID) {
                return res.status(404).send({
                    success:false,
                    message:'Please Provide Item_ID or Valid Item_ID'
                });
            }
            await db.query(`DELETE FROM TBL_Inventory WHERE Item_ID = ?`, [Item_ID])
            res.status(200).send({
                success:true,
                message:`Inventory Item Deleted Successfully`,
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message: "Error in Deleting Inventory Item",
                error   
            })
            
        }
    };

    module.exports = { getInventory, getInventoryByID, createInventory, updateInventory, deleteInventory};
