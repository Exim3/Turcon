import OrderModel from "../models/orderModel.js";
import CartModel from "../models/userCartModel.js";
import { customAlphabet } from "nanoid";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

const generateBookingId = async () => {
  const nanoid = customAlphabet("1234567890abcdef", 6);
  let bookingId;
  let isExistId;

  do {
    bookingId = `ORD-${nanoid()}`;
    isExistId = await OrderModel.findOne({ bookingId });
  } while (isExistId); // Continue generating until an unique ID is found

  return bookingId;
};

export const createOrder = async (req, res) => {
  try {
    const { paymentMethod, userId, totalAmount, totalPrice } = req.body;

    // Validate input
    if (!paymentMethod || !userId || !totalAmount || !totalPrice) {
      return res.status(400).send({
        message: "Payment method or userId missing or total amount missing",
      });
    }

    const bookingId = await generateBookingId();

    const cartItems = await CartModel.find({ userId });
    if (cartItems.length === 0) {
      return res.status(400).json({ error: "No items found in the cart" });
    }

    const order = new OrderModel({
      paymentMethod: paymentMethod || "",
      bookingId,
      items: cartItems,
      userId,
      totalPrice,
      totalAmount,
    });

    // Remove cart items after creating order
    await CartModel.deleteMany({ userId });

    const user = await UserModel.findById(userId).select("email companyName");
    const companyLogoUrl = `${process.env.FRONTEND_BASE_URL}/logo.png`;
    const emailLogoUrl = `${process.env.FRONTEND_BASE_URL}/successfulEmail.png`;
    const frontendBaseUrl = process.env.FRONTEND_BASE_URL;

    const htmlContent = `
    <html>
  <head>
    <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
      body {
        font-family: Arial, sans-serif;
        color: #333;
        padding: 20px;
        background-color: #f9f9f9;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #ffffff;
      }
      p {
        color: #4e4949;
        font-size: 14px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo img {
        width: 150px;
        height: auto;
      }
      .content,
      .content2 {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        background-color: #9a0000;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #777;
      }
      @media only screen and (max-width: 600px) {
        .container {
          padding: 10px;
        }
        .logo img {
          width: 120px;
        }
        .button {
          padding: 12px 24px;
          font-size: 14px;
        }
        p {
          font-size: 10px;
        }
      }
    </style>
  </head>
  <body>
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      align="center"
      style="background-color: #f9f9f9; padding: 20px"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              background-color: #ffffff;
              border: 1px solid #ddd;
              border-radius: 5px;
              padding: 20px;
            "
          >
            <tr>
              <td align="center" style="padding-bottom: 20px">
                <img
                  src="${companyLogoUrl}"
                  alt="Company Logo"
                  style="width: 150px; height: auto"
                />
              </td>
            </tr>
            <tr style="background-color: #f9f9f9">
              <td align="center" style="padding-bottom: 20px">
                <img
                  src=${emailLogoUrl}
                  alt="Booking Successful"
                  
                />
              </td>
            </tr>
            <tr style="background-color: #f9f9f9">
              <td align="center" style="padding-bottom: 20px">
                <h2
                  style="margin-bottom: 10px; color: #0076c1; font-size: 16px"
                >
                  Your Booking Request Has Been Submitted
                </h2>
                <p style="margin-bottom: 10px; color: #383434">
                  Thank you for your interest! <br />
                  We’ve received your booking request and are currently
                  processing it.
                </p>

                <a href="${frontendBaseUrl}/buy/orders/all"  class="button" style="color: white"
                  >View Orders</a
                >
              </td>
            </tr>
            <tr style="background-color: #f9f9f9">
              <td align="center" style="padding-bottom: 20px">
                <p style="margin-bottom: 10px">
                  Should you require any assistance or wish to cancel your
                  booking, <br />please do not hesitate to contact our team. We
                  are here <br />
                  to help you with any questions or concerns you may have.
                </p>

                <a
                  href="tel:971564507734"
                  style="
                    color: #0076c1;
                    text-decoration: none;
                    padding-right: 10px;
                  "
                  >+971 56 450 7734</a
                >

                <a
                  href="mailto:trade@turcon.in"
                  style="
                    color: #0076c1;
                    text-decoration: none;
                    padding-left: 10px;
                  "
                  >trade@turcon.in</a
                >
              </td>
            </tr>
            <tr>
              <td align="center">
                <div
                  style="
                    padding-bottom: 10px;
                  "
                >
                  <div>
                    <img
                      src="${companyLogoUrl}"
                      alt="Company Logo"
                      style="width: 150px; height: auto"
                    />
                  </div>
                  <p style="font-size: 12px">
                    SM - OFFICE - B1 - CENTER F002 OPPOSITE TO AJMAN PORT AND
                    CUSTOMS AJMAN UNITED ARAB EMIRATES
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    const tradeContent = `<p>you got one booking request please login into Admin Dashboard for further process.If already logged In please ignore this message</p>
    <table><tr><td>Company Name<td><td>email<td></tr><tr><td>${user.companyName}<td><td>${user.email}<td></tr></table>`;

    try {
      await sendEmail(user.email, "Booking Request Confirmed", htmlContent);
      await sendEmail("trade@turcon.in", "New Booking Request", tradeContent);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError.message);
    }

    const result = await order.save();
    return res.status(201).send({ message: "Order Requested Successfully" });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getOrderUserId = async (req, res) => {
  try {
    const { orderStatus, userId } = req.query; // Get orderStatus from query parameters

    // Validate input
    if (!userId) {
      return res.status(400).send({ message: "userId not found" });
    }

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Construct the aggregation pipeline
    const pipeline = [
      { $match: { userId: userObjectId } }, // Match orders by userId
      ...(orderStatus ? [{ $match: { orderStatus } }] : []), // Conditionally match by orderStatus if provided
      {
        $lookup: {
          from: "users", // The collection name for UserModel in MongoDB
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" }, // Unwind userDetails array to get a single document
      {
        $project: {
          _id: 1,
          orderId: 1,
          paymentMethod: 1,
          paymentStatus: 1,
          bookingId: 1,
          orderStatus: 1,
          tax: 1,
          totalAmount: 1,
          totalPrice: 1,
          createdAt: 1,
          updatedAt: 1,
          items: 1,
          "userDetails.fullName": 1,
          "userDetails.email": 1,
          "userDetails.phone": 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ];

    // Execute the aggregation pipeline
    const orders = await OrderModel.aggregate(pipeline);

    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    // Extract user details from the first order (assuming all orders are for the same user)
    const userDetails = orders[0].userDetails;

    // Construct result
    const result = {
      orders,
      customerName: userDetails.fullName,
      customerEmail: userDetails.email,
      customerPhone: userDetails.phone,
    };

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error in getOrderUserId:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
export const getOrderId = async (req, res) => {
  try {
    const { orderId } = req.query; // Get orderStatus from query parameters

    // Validate input
    if (!orderId) {
      return res.status(400).send({ message: "orderId not found" });
    }

    // Convert userId to ObjectId
    const orderObjectId = new mongoose.Types.ObjectId(orderId);

    // Construct the aggregation pipeline
    const pipeline = [
      { $match: { _id: orderObjectId } }, // Match orders by userId
      {
        $lookup: {
          from: "users", // The collection name for UserModel in MongoDB
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" }, // Unwind userDetails array to get a single document
      {
        $project: {
          _id: 1,
          orderId: 1,
          paymentMethod: 1,
          paymentStatus: 1,
          bookingId: 1,
          orderStatus: 1,
          tax: 1,
          totalAmount: 1,
          totalPrice: 1,
          createdAt: 1,
          updatedAt: 1,
          items: 1,
          "userDetails.fullName": 1,
          "userDetails.email": 1,
          "userDetails.phone": 1,
        },
      },
    ];

    // Execute the aggregation pipeline
    const orders = await OrderModel.aggregate(pipeline);

    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    // Extract user details from the first order (assuming all orders are for the same user)
    const userDetails = orders[0].userDetails;

    // Construct result
    const result = {
      orders,
      customerName: userDetails.fullName,
      customerEmail: userDetails.email,
      customerPhone: userDetails.phone,
    };

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error in getOrderUserId:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const {
      orderStatus,
      companyName,
      page = 0,
      rowsPerPage = 10,
      bookingId,
    } = req.query;

    // Validate query parameters
    if (orderStatus && typeof orderStatus !== "string") {
      return res.status(400).json({ error: "Invalid orderStatus value" });
    }
    const pageNumber = Number(isNaN(page) ? 0 : page);
    const limit = Number(isNaN(rowsPerPage) ? 10 : rowsPerPage);

    // Construct the filter
    let filter = {};
    if (companyName) {
      const users = await UserModel.find({
        companyName: { $regex: new RegExp(companyName, "i") }, // Case-insensitive search
      }).select("_id");

      if (users.length === 0) {
        return res.status(200).json({ orders: [], totalOrders: 0 });
      }

      const userIds = users.map((user) => user._id);
      filter.userId = { $in: userIds };
    }

    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }
    if (bookingId) {
      filter.bookingId = { $regex: new RegExp(bookingId, "i") }; // Fixed the regex syntax
    }

    // Get total count
    const totalOrders = await OrderModel.countDocuments(filter);

    // Construct the aggregation pipeline
    let pipeline = [
      { $match: filter },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$items" },
      { $unwind: "$userDetails" },
      {
        $group: {
          _id: "$_id",
          bookingId: { $first: "$bookingId" },
          createdAt: { $first: "$createdAt" },
          items: { $push: "$items" },
          quantity: { $sum: "$items.itemcount" },
          userId: { $first: "$userId" },
          paymentMethod: { $first: "$paymentMethod" },
          orderStatus: { $first: "$orderStatus" },
          paymentStatus: { $first: "$paymentStatus" },
          __v: { $first: "$__v" },
          userfullName: { $first: "$userDetails.fullName" },
          username: { $first: "$userDetails.username" },
          userEmail: { $first: "$userDetails.email" },
          userPhone: { $first: "$userDetails.phone" },
          userCompanyName: { $first: "$userDetails.companyName" },
          amount: { $first: "$totalAmount" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: pageNumber * limit,
      },
      {
        $limit: limit,
      },
    ];

    // Execute the aggregation pipeline
    const orders = await OrderModel.aggregate(pipeline);

    if (orders.length === 0) {
      return res.status(200).json({ orders: [], totalOrders });
    }

    return res.status(200).json({ orders, totalOrders });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateOrderById = async (req, res) => {
  try {
    const { updateStatus, orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "orderId not found" });
    }

    if (!updateStatus) {
      return res.status(400).json({ error: "updateStatus not found" });
    }

    const { orderStatus, paymentStatus } = updateStatus;

    // Construct the update object conditionally
    const updateFields = {};
    if (orderStatus !== undefined) updateFields.orderStatus = orderStatus;
    if (paymentStatus !== undefined) updateFields.paymentStatus = paymentStatus;

    // Perform the update
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: updateFields },
      { new: true } // Return the updated document
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).send(updatedOrder);
  } catch (error) {
    console.error("Error in updateOrderById:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
