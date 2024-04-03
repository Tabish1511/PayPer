"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const middleware_js_1 = require("../middleware.js");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// =============================== CREATE A NEW CLIENT ===============================
const newClientBody = zod_1.z.object({
    name: zod_1.z.string(),
    itemDescription: zod_1.z.string(),
    phone: zod_1.z.string(),
    totalAmount: zod_1.z.number(),
    deposit: zod_1.z.number(),
    months: zod_1.z.number(),
    newDate: zod_1.z.date()
});
router.post("/create", middleware_js_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, itemDescription, phone, totalAmount, deposit, months } = req.body;
    const newDate = new Date(); // USE THIS METHOD FOR TODAY'S DATE AND TIME NOW!!!
    const clientData = newClientBody.safeParse({ name, itemDescription, phone, totalAmount, deposit, months, newDate });
    if (!clientData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    ;
    console.log(newDate);
    const nextMonth = newDate.getMonth() + 1;
    newDate.setMonth(nextMonth);
    console.log("All inputs cleared the zod checks");
    console.log(newDate);
    try {
        const client = yield prisma.client.create({
            data: {
                name,
                itemDescription,
                phone,
                total: totalAmount,
                deposit,
                months,
                dueDate: newDate,
                userId: req.userId
            }
        });
        console.log(client);
    }
    catch (err) {
        return res.status(403).send(err);
    }
    res.status(200).send({
        message: "Client created successfully",
    });
}));
// =============================== EDIT AN EXISTING CLIENT ===============================
const updatedClientBody = zod_1.z.object({
    name: zod_1.z.string().optional(),
    itemDescription: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    totalAmount: zod_1.z.number().optional(),
    deposit: zod_1.z.number().optional(),
    months: zod_1.z.number().optional(),
    newDate: zod_1.z.date().optional()
});
router.put("/edit", middleware_js_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // THE CLIENT'S DATA SHOULD POPULATE THE INPUT SPACES IN FE
    // THE FOLLOWING API/ENDPOINT ALLOWS THE USER TO ENTER EITHER OF THE INFO TO UPDATE/ ANYTHING LEFT OUT OR EMPTY WILL LEAVE THE PREVIOUS DATA UNCHANGED
    console.log(req.body);
    const { clientId, name, itemDescription, phone, totalAmount, deposit, months, date } = req.body;
    const newDate = new Date(date);
    const clientData = updatedClientBody.safeParse({ name, itemDescription, phone, totalAmount, deposit, months, newDate });
    if (!clientData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    ;
    try {
        // the following req.body.clientId will be passed from the react frontend '/editClient' page when the 'submit' button is pushed ie. (onclick fn)
        const client = yield prisma.client.findUnique({
            where: {
                id: clientId
            }
        });
        if (!client) {
            return res.status(404).send("Client not found");
        }
        const updatedClient = yield prisma.client.update({
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
        });
    }
    catch (err) {
        return res.status(403).send(err);
    }
    res.status(200).send({
        message: "Client edited successfully",
    });
}));
// =============================== CURRENT MONTH INSTALLMENT PAID ===============================
// EVERYTIME THE 'PAID' BUTTON IS PUSHED THE DATE UPDATES TO THE FOLLOWING MONTH 
router.patch("/paid", middleware_js_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    // console.log(id);
    try {
        const client = yield prisma.client.findUnique({
            where: {
                id: id
            }
        });
        if (!client) {
            return res.status(404).send("Client not found");
        }
        const newDate = client.dueDate;
        const nextMonth = newDate.getMonth() + 1;
        newDate.setMonth(nextMonth);
        const updatedClient = yield prisma.client.update({
            where: {
                id: id
            },
            data: {
                dueDate: newDate
            }
        });
    }
    catch (err) {
        return res.status(403).send(err);
    }
    res.status(200).send({
        message: "Current month's payment done.",
    });
}));
// =============================== DELETE SELECTED CLIENT ===============================
router.delete("/delete", middleware_js_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        const deletedClient = yield prisma.client.delete({
            where: {
                id: id
            }
        });
        if (!deletedClient) {
            return res.status(404).send("Client not found");
        }
    }
    catch (err) {
        return res.status(403).send(err);
    }
    res.status(200).send({
        message: "Client successfully deleted.",
    });
}));
// =============================== GET ALL CLIENTS OR SEARCHED BY NAME AND/OR PHONE (SPECIFIC USER'S CLIENTS) ===============================
router.get("/bulk", middleware_js_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = typeof req.query.filter === 'string' ? req.query.filter : "";
        const id = req.userId;
        const clients = yield prisma.client.findMany({
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
                ],
                userId: id
            }
        });
        res.json({
            //@ts-ignore
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
        });
    }
    catch (error) {
        console.error("error fetching clients (backend): ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// =============================== GET SINGLE CLIENT BY 'ID' RECIEVED ===============================
router.get("/single", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = req.query.id;
    const id = typeof idParam === 'string' ? parseInt(idParam) : NaN;
    if (isNaN(id)) {
        return res.status(400).send("Invalid id parameter");
    }
    const client = yield prisma.client.findUnique({
        where: {
            id: id
        }
    });
    if (!client) {
        return res.status(404).send("Client not found");
    }
    res.json({
        client: {
            id: client.id,
            name: client.name,
            itemDescription: client.itemDescription,
            phone: client.phone,
            total: client.total,
            deposit: client.deposit,
            months: client.months,
            dueDate: client.dueDate
        }
    });
}));
exports.default = router;
// SET MONTH TO THE FOLLOWING MONTH AND THEN RETURN DATE IN DATE FORMAT ============================
// const newDate = new Date(); // Current date
// // Get the current month and add 1 to it (for the next month)
// const nextMonth = newDate.getMonth() + 1;
// // Set the month of the newDate object to the next month
// newDate.setMonth(nextMonth);
// console.log(newDate); // Output the new date object for the following month
