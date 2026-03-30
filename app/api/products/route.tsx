import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Product from '@/models/Product';

// MongoDB connection helper

export async function GET() {
    try {
        await connectDB();
        let products = await Product.find({});
        // products = products.filter(e => e.id === "coca");
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        // console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}