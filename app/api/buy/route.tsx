import { MAIN_URL } from '@/constants';
import generateChapaPayout from '@/lib/generateChapaPayout';

import processLakipayPayment from '@/lib/lakipay/processPayment';
import { connectDB } from '@/lib/mongoose';
import Machine from '@/models/Machine';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { NextResponse, NextRequest } from 'next/server';
import { v4 as uuidv4 } from "uuid";


export async function POST(request: NextRequest) {
    const data = await request.json();
    if(!data.cart || !data.machine) {
        return NextResponse.json(
            { error: "Invalid request data" },
            { status: 400 }
        );
    }
    await connectDB();
    const machine = await Machine.findOne({id: data.machine});
    if(!machine) {
        return NextResponse.json(
            { error: "Machine not found" },
            { status: 404 }
        );
    }
    const total = machine.total;
    const cartQtySum = Object.entries(data.cart).reduce((sum: number, [_, qty]) => sum + Number(qty), 0);

    if(total < cartQtySum) {
        return NextResponse.json(
            { error: "Not enough stock available" },
            { status: 400 }
        );
    }

    const drinks = await Product.find();
    const sum = Object.entries(data.cart).reduce((total, [id, qty]) => {
        const drink = drinks.find(d => d.id === id);
        if (!drink || typeof drink.price !== "number" || typeof qty !== "number") {
            console.warn(`Drink with id ${id} not found or invalid data`);
            return total;
        }
        return total + (drink ? drink?.price * qty : 0);
    }, 0);

    if(data?.method === "CHAPA"){


    console.log("Received data:", data);
    const payoutResult = await generateChapaPayout(`${sum}`, data, data.machine);
    if (!payoutResult) {
        return NextResponse.json(
            { error: "Failed to generate Chapa payout" },
            { status: 500 }
        );
    }
    const { chapaResponse, tx_ref } = payoutResult;
    console.log("Chapa response:", chapaResponse);
    console.log(Object.entries(data.cart).map(([k,v],i) => ({id:k, qty: v,name:k})))
    const order = await Order.create({
        machineId: data.machine,
        products: Object.entries(data.cart).map(([id, qty]) => ({
            id,
            qty: typeof qty === "number" ? qty : Number(qty),
            name: id
        })),
        paymentURL: chapaResponse?.data?.checkout_url || "",
        date: Date.now(),
        txRef: tx_ref,
    });
    return NextResponse.json(
        { received: data,checkOut:chapaResponse?.data?.checkout_url},
        { status: 200 }
    );
}else if (data?.method === "LAKIPAY"){
 
        const reference = generateTransactionReference();
        const LAKIPAY_CALLBACK_URL = MAIN_URL + `/${data.machine}` + "/lakipay/";
    const lakipayResponse = await processLakipayPayment({ amount: sum , reference, redirect: LAKIPAY_CALLBACK_URL }); // Replace 100.00 with actual amount
    console.log("Lakipay response:", lakipayResponse);
    await connectDB();
    const order = await Order.create({
        machineId: data.machine,
        products: Object.entries(data.cart).map(([id, qty]) => ({
            id,
            qty: typeof qty === "number" ? qty : Number(qty),
            name: id
        })),
        paymentURL:"",
        date: Date.now(),
        txRef: reference,
        lakipayTransactionId: lakipayResponse?.lakipay_transaction_id || "",
    });

    return NextResponse.json(
            { received: data, checkOut:lakipayResponse?.payment_url},
            { status: 200 }
        );
}else {
    return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 }
    );
}
}


function generateTransactionReference() {
  return `lakipay_${uuidv4()}`;
}