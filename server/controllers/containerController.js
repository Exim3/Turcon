import containerModel from "../models/containerModel.js";
import sellerModel from "../models/sellerModel.js";

//get
export const getContainer = async (req, res) => {
  try {
    const getcontainer = await containerModel.find();
    console.log(getcontainer);
    res.status(201).send(getcontainer);
  } catch (error) {
    console.log("Error in getContainer : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//add
export const addContainer = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const seller = await sellerModel.findById(sellerId);
    console.log(sellerId, "hi", seller);
    if (!seller) {
      return res
        .status(400)
        .json({ error: "sellerId not found please add seller" });
    }

    const {
      containerNumber,
      size,
      type,
      condition,
      country,
      portLocation,
      price,
      stockCount,
    } = req.body;
    if (
      !size ||
      !type ||
      !condition | !country ||
      !portLocation ||
      !price ||
      !stockCount
    ) {
      return res.status(400).json({ error: "please fill all the fields" });
    }

    const newcontainer = new containerModel({
      containerNumber: containerNumber,
      size: size,
      type: type,
      condition: condition,
      country: country,
      portLocation: portLocation,
      price: price,
      stockCount: stockCount,
      sellerId: sellerId,
    });
    console.log(newcontainer);

    const containerId = newcontainer._id;
    const updateSeller = await sellerModel.findByIdAndUpdate(
      sellerId,
      { $push: { containers: containerId } },
      { new: true }
    );
    if (!newcontainer || !updateSeller) {
      return res.status(400).json({ error: "container not created" });
    }
    await Promise.all([newcontainer.save(), updateSeller.save()]);
    res
      .status(201)
      .json({ newcontainer, message: "container created successfully" });
  } catch (error) {
    console.log("Error in addContainer : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//update

export const updateContainer = async (req, res) => {
  try {
    const containerId = req.params.containerId;
    if (!containerId) {
      return res.status(400).json({ error: "containerId not found" });
    }
    const container = await containerModel.findById(containerId);
    if (!container) {
      return res.status(400).json({ error: "container not found" });
    }

    const {
      containerNumber,
      size,
      type,
      condition,
      country,
      portLocation,
      price,
      stockCount,
    } = req.body;
    if (
      !size ||
      !type ||
      !condition | !country ||
      !portLocation ||
      !price ||
      !stockCount
    ) {
      return res.status(400).json({ error: "please fill all the fields" });
    }

    const sellerId = container.sellerId;

    const updateContainer = await containerModel.findByIdAndUpdate(
      containerId,
      {
        containerNumber: containerNumber,
        size: size,
        type: type,
        condition: condition,
        country: country,
        portLocation: portLocation,
        price: price,
        stockCount: stockCount,
        sellerId: sellerId,
      },
      {
        new: true,
      }
    );
    if (!updateContainer) {
      return res.status(400).json({ error: "container not updated" });
    }

    console.log(updateContainer, "container");
    res.status(200).json({
      message: "container updated",
      updatedContainer: updateContainer,
    });
  } catch (error) {
    console.log("Error in updateContainer : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete

export const deleteContainer = async (req, res) => {
  try {
    const containerId = req.params.containerId;
    if (!containerId) {
      return res.status(400).json({ error: "containerId not found" });
    }
    const container = await containerModel.findById(containerId);
    if (!container) {
      return res.status(400).json({ error: "container not found" });
    }
    const sellerId = container.sellerId.toString();
    if (!sellerId) {
      return res.status(400).json({ error: "sellerId not found" });
    }
    const updateSeller = await sellerModel.findByIdAndUpdate(
      sellerId,
      {
        $pull: { containers: containerId },
      },
      { new: true }
    );

    if (!updateSeller) {
      return res.status(400).json({ error: "updateSeller not updated" });
    }
    const deleteContainer = await containerModel.findByIdAndDelete(containerId);
    if (!deleteContainer) {
      const updateSeller = await sellerModel.findByIdAndUpdate(
        sellerId,
        {
          $push: { containers: containerId },
        },
        { new: true }
      );

      return res
        .status(400)
        .json({ error: "container not deleted", updatedSeller: updateSeller });
    }
    res.status(201).json({
      message: "container deleted successfully",
      deletedContainer: deleteContainer,
    });
  } catch (error) {
    console.log("Error in deleteContainer : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
