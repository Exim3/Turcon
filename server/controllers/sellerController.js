import containerModel from "../models/containerModel.js";
import sellerModel from "../models/sellerModel.js";

//get seller
export const getTotalSellers = async (req, res) => {
  try {
    const TotalSellers = await sellerModel.find();
    console.log(TotalSellers);
    res.status(201).json({ sellers: TotalSellers });
  } catch (error) {
    console.log("Error in getTotalSellers  : ", error.message);
    res.status(500).json({
      error: "Internal server error or check the property of containers",
    });
  }
};
export const getSellerById = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const Seller = await sellerModel.findById(sellerId);
    const containers = await containerModel.find({
      _id: { $in: Seller.containers },
    });
    res.status(201).json({ seller: Seller, containers: containers });
  } catch (error) {
    console.log("Error in getTotalSellers  : ", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

//add seller
export const addSeller = async (req, res) => {
  try {
    const { phone, sellerName } = req.body;
    if (!phone || !sellerName) {
      return res.status(400).json({ error: "please Fill all the fields" });
    }
    const seller = await sellerModel.findOne({ phone });
    if (seller) {
      return res.status(400).json({
        error: "seller is already exits",
      });
    }
    const newSeller = new sellerModel({
      sellerName,
      phone,
    });
    if (newSeller) {
      await newSeller.save();
      res.status(201).json({
        message: "seller created",
        detail: newSeller,
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error in addSeller : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//update seller

export const updateSeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    if (!sellerId) {
      return res.status(400).json({ error: "sellerId not found" });
    }
    const { sellerName, phone } = req.body;
    if (!sellerName || !phone) {
      return res.status(400).json({ error: "please fill all the fields" });
    }
    const seller = await sellerModel.findByIdAndUpdate(
      sellerId,
      {
        sellerName: sellerName,
        phone: phone,
      },
      { new: true }
    );

    if (!seller) {
      return res
        .status(400)
        .json({ error: "seller not updated-error in internal server" });
    }
    res
      .status(200)
      .json({ message: "seller updated successfully", updatedSeller: seller });
  } catch (error) {
    console.error("Error in updateSeller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
//delete seller
export const deleteSeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    if (!sellerId) {
      return res.status(400).json({ error: "sellerId not found" });
    }
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(400).json({ error: "seller not found" });
    }
    let deletedContainers = [];
    seller.containers.map(async (containerId) => {
      const deleteContainer = await containerModel.findByIdAndDelete(
        containerId
      );
      deletedContainers.push(deleteContainer);
    });
    const deleteSeller = await sellerModel.findByIdAndDelete(sellerId);

    if (!deleteSeller) {
      return res.status(400).json({ error: "seller not deleted" });
    }
    res.status(200).json({
      message: "deleted seller successfully",
      deletedSeller: deleteSeller,
      deletedSellerContainers: deletedContainers,
    });
  } catch (error) {
    console.error("Error in deleteSeller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//add seller container
export const addSellerContainer = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Check if sellerId exists
    if (!sellerId) {
      return res.status(400).json({ error: "Seller Id not found" });
    }

    const bulkContainers = req.body.containers;

    // Check if bulkcontainers exist
    if (
      !bulkContainers ||
      !Array.isArray(bulkContainers) ||
      bulkContainers.length === 0
    ) {
      return res.status(400).json({ error: "Please upload valid containers" });
    }
    const transformedBulkContainers = bulkContainers.map((container) => ({
      ...container,
      country: container.country
        ? container.country.toUpperCase()
        : container.country,
      portLocation: container.portLocation
        ? container.portLocation.toUpperCase()
        : container.portLocation,
      condition: container.condition
        ? container.condition.toUpperCase()
        : container.condition,
      size: container.size ? container.size.toUpperCase() : container.size,
      type: container.type ? container.type.toUpperCase() : container.type,
    }));

    const filteredBulkContainers = transformedBulkContainers.filter(
      (container) =>
        container.size &&
        container.type &&
        container.portLocation &&
        container.country &&
        container.condition &&
        container.price &&
        container.stockCount
    );

    if (filteredBulkContainers.length !== transformedBulkContainers.length) {
      return res.status(400).json({
        error:
          "one of the container property is missing...please check your data",
      });
    }

    let newContainerIds = [];

    for (const container of filteredBulkContainers) {
      const containerWithSeller = { ...container, sellerId: sellerId };
      const newContainer = new containerModel(containerWithSeller);
      await newContainer.save(); // Save container to database
      newContainerIds.push(newContainer._id); // Push new container's ID to array
    }

    const updatedSeller = await sellerModel.findByIdAndUpdate(
      sellerId,
      { $push: { containers: { $each: newContainerIds } } },
      { new: true }
    );

    res.status(200).json(updatedSeller);
  } catch (error) {
    console.error("Error in addSellerContainer:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//update container
export const updateContainerOfSeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Check if sellerId exists
    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID not found." });
    }

    const bulkContainers = req.body.containers;
    const updatedContainers = [];

    // Check if bulkContainers is valid
    if (
      !bulkContainers ||
      !Array.isArray(bulkContainers) ||
      bulkContainers.length === 0
    ) {
      return res.status(400).json({ error: "Please upload valid containers." });
    }

    // Transform fields to uppercase
    const transformedBulkContainers = bulkContainers.map((container) => ({
      ...container,
      country: container.country
        ? container.country.toUpperCase()
        : container.country,
      portLocation: container.portLocation
        ? container.portLocation.toUpperCase()
        : container.portLocation,
      condition: container.condition
        ? container.condition.toUpperCase()
        : container.condition,
      size: container.size ? container.size.toUpperCase() : container.size,
      type: container.type ? container.type.toUpperCase() : container.type,
    }));

    // Process each container
    for (const con of transformedBulkContainers) {
      // Find existing container for the seller with the same type, country, and other relevant fields
      const existingContainer = await containerModel.findOne({
        sellerId: sellerId,
        type: con.type,
        country: con.country,
        size: con.size,
        condition: con.condition,
        portLocation: con.portLocation,
      });

      if (existingContainer) {
        // Update the existing container
        const updatedContainer = await containerModel.findByIdAndUpdate(
          existingContainer._id,
          {
            price: con.price,
            stockCount: con.stockCount,
          },
          { new: true }
        );
        updatedContainers.push(updatedContainer);
      } else {
        // Create a new container
        const containerWithSeller = { ...con, sellerId: sellerId };
        const newContainer = new containerModel(containerWithSeller);
        await newContainer.save();

        // Update seller document with the new container ID
        const newContainerId = newContainer._id.toString();
        await sellerModel.findByIdAndUpdate(
          sellerId,
          { $push: { containers: newContainerId } },
          { new: true }
        );

        updatedContainers.push(newContainer);
      }
    }

    res.status(200).json({
      updatedContainers,
    });
  } catch (error) {
    console.error("Error in updateContainerOfSeller:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
