import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Product from '@/models/Product';
import Machine from '@/models/Machine';
import { request } from 'https';

// MongoDB connection helper

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    try {
        await connectDB();
        
        let products = await Product.find({});
        const machine = await Machine.findOne({id: id})
        // products = products.filter(e => e.id === "coca");
        return NextResponse.json({products,machine}, { status: 200 });
    } catch (error) {
        // console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}