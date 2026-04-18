import Machine from '@/models/Machine';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    // Extract the Authorization header
    const authHeader = req.headers.get('authorization');
    const machineId = authHeader?.split(' ')[1]; // Assuming the format is "Bearer <machineId>"
    if(!machineId) {
        return NextResponse.json(
            { error: "Missing or invalid Authorization header" },
            { status: 400 }
        );
    }
    const machine = await Machine.findOne({ id: machineId });
    if(!machine) {
        return NextResponse.json(
            { error: "Machine not found" },
            { status: 404 }
        );
    }

    const order = await Order.findOne({ machineId: machineId, paymentStatus: "success", orderFilled: false, }).sort({ date: -1 });

  
    if(!order) {
        return NextResponse.json(
            { error: "No pending orders found for this machine" },
            { status: 404 }
        );
    }

    if( order.createdAt && order.createdAt.getTime() < Date.now() - 10 * 60 * 1000) { // 15 minutes
        return NextResponse.json(
            { error: "No recent pending orders found for this machine" },
            { status: 404 }
        );
    }

    const products = order?.products;
    console.log("Products to dispense:", products,order);
    if(!products) {
        return NextResponse.json(
            { error: "No pending orders found for this machine" },
            { status: 404 }
        );
    }
  // Convert `qty` → `quantity` for ESP32
  const espProducts = products.map(p => ({
    name: p.name,
    quantity: p.qty,
    pay:true
  }));

  await Order.updateOne(
    { _id: order._id },
    { $set: { orderFilled: true } }
  );
  

    // Example: respond with the token (never do this in production)
    return NextResponse.json({
    success: true,
    data: {
      command: {
        payload: {
          products: espProducts
        }
      }
    }
  });
}