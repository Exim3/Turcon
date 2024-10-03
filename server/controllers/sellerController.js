import containerModel from "../models/containerModel.js";
import sellerModel from "../models/sellerModel.js";
import mongoose from "mongoose";

//get seller
export const getTotalSellers = async (req, res) => {
  try {
    const { sellerName } = req.query;
    const pipeline = [
      {
        $match: sellerName
          ? { sellerName: { $regex: sellerName, $options: "i" } }
          : {},
      },
    ];
    const totalSellers = await sellerModel.aggregate(pipeline);

    res.status(200).json({ sellers: totalSellers });
  } catch (error) {
    console.error("Error in getTotalSellers:", error.message);
    res.status(500).json({
      error:
        "Internal server error. Please check your query or server configuration.",
    });
  }
};

export const getSellerById = async (req, res) => {
  try {
    const { sellerId } = req.query;

    const Seller = await sellerModel.findById(sellerId);
    if (!Seller) return res.status(400).json({ error: "Seller not found" });
    res.status(201).json({ seller: Seller });
  } catch (error) {
    console.error("Error in getSellerById  : ", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

//add seller
export const addSeller = async (req, res) => {
  try {
    const { address, sellerName } = req.body;

    if (!address || !sellerName) {
      return res.status(400).json({ error: "please Fill all the fields" });
    }
    const seller = await sellerModel.findOne({ sellerName });

    if (seller) {
      return res.status(400).json({
        error: "seller is already exits",
      });
    }
    const newSeller = new sellerModel({
      sellerName,
      address,
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
    console.error("Error in addSeller : ", error.message);
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
    const { sellerId } = req.query;
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
      message: "Seller deleted successfully",
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
    const { sellerId } = req.query;

    // Check if sellerId exists
    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID not found." });
    }

    const bulkContainers = req.body.containers;

    // Check if bulkContainers is valid
    if (
      !bulkContainers ||
      !Array.isArray(bulkContainers) ||
      bulkContainers.length === 0
    ) {
      return res.status(400).json({ error: "Please upload valid containers." });
    }

    // Validation arrays
    const allowedSizes = [
      "20'FT",
      "40'FT",
      "45'FT",
      "20'FT HC",
      "40'FT HC",
      "45'FT HC",
      "45'FT HC PW",
    ];
    const allowedConditions = [
      "NEW",
      "USED",
      "IICL",
      "ASIS",
      "WWT",
      "SCRAP",
      "CARGOWORTHY",
      "DAMAGED",
    ];
    const allowedTypes = ["DRY", "OPENTOP", "FLATRACK", "TANKS", "REEFERS"];

    const errors = [];
    const transformedBulkContainers = [];

    // Validate and transform fields
    for (const container of bulkContainers) {
      const errorsForContainer = [];

      // Validate size
      if (
        container.size &&
        !allowedSizes.includes(container.size.toUpperCase().trim())
      ) {
        errorsForContainer.push(`Invalid size: ${container.size}`);
      }

      // Validate condition
      if (
        container.condition &&
        !allowedConditions.includes(container.condition.toUpperCase().trim())
      ) {
        errorsForContainer.push(`Invalid condition: ${container.condition}`);
      }

      // Validate type
      if (
        container.type &&
        !allowedTypes.includes(container.type.toUpperCase().trim())
      ) {
        errorsForContainer.push(`Invalid type: ${container.type}`);
      }

      if (errorsForContainer.length > 0) {
        errors.push({ container, errors: errorsForContainer });
      } else {
        transformedBulkContainers.push({
          ...container,
          country: container.country
            ? container.country.toUpperCase().trim()
            : container.country,
          portLocation: container.portLocation
            ? container.portLocation.toUpperCase().trim()
            : container.portLocation,
          condition: container.condition
            ? container.condition.toUpperCase().trim()
            : container.condition,
          size: container.size
            ? container.size.toUpperCase().trim()
            : container.size,
          type: container.type
            ? container.type.toUpperCase().trim()
            : container.type,
        });
      }
    }

    // If there are any errors, return them without processing the containers
    if (errors.length > 0) {
      return res.status(400).json({
        errors: errors,
      });
    }

    // Proceed with updating or creating containers
    const updatedContainers = [];

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
      updatedContainers: updatedContainers,
      message: "Stocks Updated",
    });
  } catch (error) {
    console.error("Error in updateContainerOfSeller:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getSellerContainer = async (req, res) => {
  try {
    const {
      type,
      condition,
      size,
      country,
      port,
      page = 0,
      rowsPerPage = 10,
      sellerId,
    } = req.query;

    // Validate sellerId
    if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ error: "Invalid or missing sellerId" });
    }

    // Validate query parameters
    const pageNumber = Number.isNaN(Number(page)) ? 0 : Number(page);
    const limit = Number.isNaN(Number(rowsPerPage)) ? 10 : Number(rowsPerPage);

    // Construct the filter
    const filter = { sellerId };
    if (type) {
      filter.type = { $regex: type, $options: "i" };
    }
    if (condition) {
      filter.condition = { $regex: condition, $options: "i" };
    }
    if (size) {
      filter.size = { $regex: size, $options: "i" };
    }
    if (country) {
      filter.country = { $regex: country, $options: "i" };
    }
    if (port) {
      filter.portLocation = { $regex: port, $options: "i" };
    }

    // Get total count
    const totalContainers = await containerModel.countDocuments(filter);

    // Construct the aggregation pipeline
    const pipeline = [
      { $match: filter },
      {
        $project: {
          _id: 1,
          type: 1,
          size: 1,
          portLocation: 1,
          condition: 1,
          country: 1,
          stockCount: 1,
          price: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: pageNumber * limit },
      { $limit: limit },
    ];

    // const containers = await containerModel.aggregate(pipeline);
    const containers = await containerModel
      .find({ sellerId })
      .limit(limit)
      .skip(pageNumber * limit);

    // Fetch seller name
    const seller = await sellerModel.findById(sellerId).select("sellerName");

    return res
      .status(200)
      .json({ containers, totalContainers, sellerName: seller });
  } catch (error) {
    console.error("Error in getSellerContainer: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
