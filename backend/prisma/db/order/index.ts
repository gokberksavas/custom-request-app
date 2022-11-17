import { Order, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createOrder = async (orderData:Order) => {
    const createdUser = await prisma.order.create({
        data: orderData
    });

    return createdUser;
};

const deleteOrder = async (orderId:number) => {
    const deletedOrder = await prisma.order.delete({
        where: {
            id: orderId
        }
    });

    return deletedOrder;
};

const getAllOrders = async () :Promise<Order[]> => {
    const allOrders = await prisma.order.findMany({
        orderBy: {
            created_at: 'desc'
        }
    });

    return allOrders;
};

const getOrderById = async (orderId:number): Promise<Order | null> => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    });

    return order;
};

const updateOrderStatus = async (updatedOrder:Order) : Promise<Order> => {
    const order = await prisma.order.update({
        where: {
            id: updatedOrder.id
        },
        data: updatedOrder
    });

    return order;
};

export const orderDb = {
    createOrder,
    deleteOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};