import generateChapaPayout from '@/lib/generateChapaPayout';
import { connectDB } from '@/lib/mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const data = await request.json();
    if(!data.cart || !data.machine) {
        return NextResponse.json(
            { error: "Invalid request data" },
            { status: 400 }
        );
    }
    await connectDB();
    const drinks = await Product.find();
    const sum = Object.entries(data.cart).reduce((total, [id, qty]) => {
        const drink = drinks.find(d => d.id === id);
        if (!drink || typeof drink.price !== "number" || typeof qty !== "number") {
            console.warn(`Drink with id ${id} not found or invalid data`);
            return total;
        }
        return total + (drink ? drink?.price * qty : 0);
    }, 0);

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
        { received: data,chapaResponse},
        { status: 200 }
    );
}