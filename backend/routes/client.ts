import express from 'express';
import { CustomRequest } from '../middleware.js';
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from '../middleware.js';

const router = express.Router();
const prisma = new PrismaClient();


// =============================== CREATE A NEW CLIENT ===============================
const newClientBody = z.object({
    name: z.string(),
	itemDescription: z.string(),
	phone: z.string(),
	totalAmount: z.number(),
    deposit: z.number(),
    months: z.number(),
    newDate: z.date()
  });

router.post("/create", authMiddleware, async (req, res) => {
    console.log(req.body);
    const {name, itemDescription, phone, totalAmount, deposit, months} = req.body;
    const newDate = new Date(); // USE THIS METHOD FOR TODAY'S DATE AND TIME NOW!!!
    const clientData = newClientBody.safeParse({name, itemDescription, phone, totalAmount, deposit, months, newDate});

    if(!clientData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    };

    console.log(newDate);

    const nextMonth = newDate.getMonth() + 1;
    newDate.setMonth(nextMonth);

    console.log("All inputs cleared the zod checks")
    console.log(newDate);
    try{
        const client = await prisma.client.create({
            data:{
                name, 
                itemDescription, 
                phone, 
                total: totalAmount, 
                deposit, 
                months, 
                dueDate: newDate,
                userId: (req as CustomRequest).userId
            }
        })
        console.log(client);
    }catch(err){
        return res.status(403).send(err);
    }

    res.status(200).send({
        message: "Client created successfully",
    })
})


// =============================== EDIT AN EXISTING CLIENT ===============================
const updatedClientBody = z.object({
    name: z.string().optional(),
	itemDescription: z.string().optional(),
	phone: z.string().optional(),
	totalAmount: z.number().optional(),
    deposit: z.number().optional(),
    months: z.number().optional(),
    newDate: z.date().optional()
  });

router.put("/edit", authMiddleware,async (req, res) => {
    // THE CLIENT'S DATA SHOULD POPULATE THE INPUT SPACES IN FE
    // THE FOLLOWING API/ENDPOINT ALLOWS THE USER TO ENTER EITHER OF THE INFO TO UPDATE/ ANYTHING LEFT OUT OR EMPTY WILL LEAVE THE PREVIOUS DATA UNCHANGED
    console.log(req.body);
    const {clientId, name, itemDescription, phone, totalAmount, deposit, months, date} = req.body;
    const newDate = new Date(date);
    const clientData = updatedClientBody.safeParse({name, itemDescription, phone, totalAmount, deposit, months, newDate});
    
    if(!clientData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    };

    try{
        // the following req.body.clientId will be passed from the react frontend '/editClient' page when the 'submit' button is pushed ie. (onclick fn)
        const client = await prisma.client.findUnique({
            where: {
            id: clientId
        }
      });
      if(!client){
        return res.status(404).send("Client not found");
      }

      const updatedClient = await prisma.client.update({
        where: {
            id: clientId
        },
        data: {
            name, 
            itemDescription, 
            phone, 
            total: totalAmount, 
            deposit, 
            months, 
            dueDate: newDate
            // userId: (req as CustomRequest).userId
        }
      })
    }catch(err){
        return res.status(403).send(err);
    }
    
    res.status(200).send({
        message: "Client edited successfully",
    })
})

// =============================== CURRENT MONTH INSTALLMENT PAID ===============================
// EVERYTIME THE 'PAID' BUTTON IS PUSHED THE DATE UPDATES TO THE FOLLOWING MONTH 
router.patch("/paid", authMiddleware, async (req, res) => {
    const id = req.body.id;
    // console.log(id);

    try{
        const client = await prisma.client.findUnique({
            where: {
            id: id
        }
      });
      if(!client){
        return res.status(404).send("Client not found");
      }
      
      const newDate = client.dueDate;
      const nextMonth = newDate.getMonth() + 1;
      newDate.setMonth(nextMonth);

      const updatedClient = await prisma.client.update({
        where: {
            id: id
        },
        data: {
            dueDate: newDate
        }
      })
    }catch(err){
        return res.status(403).send(err);
    }
    
    res.status(200).send({
        message: "Current month's payment done.",
    });
})

// =============================== DELETE SELECTED CLIENT ===============================
router.delete("/delete", authMiddleware,async (req, res) => {
    const id = req.body.id;

    try{
      const deletedClient = await prisma.client.delete({
        where: {
            id: id
        }
      })
      if(!deletedClient){
        return res.status(404).send("Client not found");
      }
    }catch(err){
        return res.status(403).send(err);
    }
    
    res.status(200).send({
        message: "Client successfully deleted.",
    })
})

// =============================== GET ALL CLIENTS OR SEARCHED BY NAME AND/OR PHONE ===============================
router.get("/bulk", async (req, res) => {
    const filter: string = typeof req.query.filter === 'string' ? req.query.filter : "";

    const clients = await prisma.client.findMany({
        where: {
          OR: [
            {
              name: {
                contains: filter,
                mode: 'insensitive'
              }
            },
            {
              phone: {
                contains: filter,
                mode: 'insensitive'
              }
            }
          ]
        }
      });

      res.json({
        client: clients.map(client => ({
            id: client.id,
            name: client.name,
            itemDescription: client.itemDescription,
            phone: client.phone,
            total: client.total,
            deposit: client.deposit,
            months: client.months,
            dueDate: client.dueDate
        }))
    })
      
})

export default router;





    











// SET MONTH TO THE FOLLOWING MONTH AND THEN RETURN DATE IN DATE FORMAT ============================

// const newDate = new Date(); // Current date

// // Get the current month and add 1 to it (for the next month)
// const nextMonth = newDate.getMonth() + 1;

// // Set the month of the newDate object to the next month
// newDate.setMonth(nextMonth);

// console.log(newDate); // Output the new date object for the following month




















