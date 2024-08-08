import containerModel from "../models/containerModel.js";
import CartModel from "../models/userCartModel.js";

export const addCart = async (req, res) => {
  try {
    const { containerId, price, sellerId, stockCount, itemcount, userId } =
      req.body;

    // Validate input
    if (!containerId || !price || !sellerId || !stockCount || !userId) {
      return res.status(400).send({ message: "Invalid item details" });
    }

    // Ensure sellerId is an array
    const sellerIds = Array.isArray(sellerId) ? sellerId : [sellerId];

    // Check if the container exists
    const container = await containerModel.findById(containerId);
    if (!container) {
      return res.status(404).send({ message: "Container not found" });
    }
    // Find if the cart item already exists
    const existingCart = await CartModel.findOne({
      country: container.country,
      portLocation: container.portLocation,
      size: container.size,
      type: container.type,
      condition: container.condition,
      userId,
    });

    if (existingCart) {
      // Update the existing cart item

      const updatedCart = await CartModel.findByIdAndUpdate(
        existingCart._id,
        {
          $set: {
            itemcount,
            stockCount,
            sellerId: sellerIds,
          },
        },
        { new: true } // Return the updated document
      );

      if (!updatedCart) {
        return res.status(400).send({ message: "Cart not updated" });
      }

      return res.status(200).send({ message: "cart Uploaded successfully" });
    } else {
      // Create a new cart item
      const newCart = new CartModel({
        country: container.country || "",
        portLocation: container.portLocation || "",
        size: container.size || "",
        type: container.type || "",
        condition: container.condition || "",
        price,
        sellerId: sellerIds,
        stockCount: parseInt(stockCount, 10), // Convert to number
        itemcount,
        userId,
      });

      const result = await newCart.save();
      return res.status(201).send(result); // 201 for resource creation success
    }
  } catch (error) {
    console.error("Error in addCart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getCartById = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).send({ message: "userId is required" });
    }

    const userCarts = await CartModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).send(userCarts);
  } catch (error) {
    console.error("Error in getCartById:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { itemId, userId } = req.query;

    // Validate input
    if (!itemId || !userId) {
      return res.status(400).send({ message: "Invalid item details" });
    }

    // Find and delete the cart item
    const result = await CartModel.deleteOne({ _id: itemId, userId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send({ message: "Item not found or not belonging to user" });
    }

    return res.status(200).send({ message: "Item successfully deleted" });
  } catch (error) {
    console.error("Error in deleteCart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const updateCart = async (req, res) => {
  try {
    // Extract query parameters
    const { itemId, quantity } = req.query;

    // Sanitize and validate input
    if (!itemId || isNaN(quantity)) {
      return res
        .status(400)
        .send({ message: "Invalid item details or quantity" });
    }

    // Convert quantity to a number
    const quantityNumber = Number(quantity);

    // Find and update the cart item
    const result = await CartModel.findByIdAndUpdate(
      itemId,
      {
        $set: {
          itemcount: quantityNumber,
        },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ message: "Item not found" });
    }

    return res
      .status(200)
      .send({ message: "Item successfully updated", item: result });
  } catch (error) {
    console.error("Error in updateCart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
