import containerModel from "../models/containerModel.js";
import sellerModel from "../models/sellerModel.js";

const transformContainers = (containers) => {
  if (containers && Array.isArray(containers)) {
    const transformedContainers = [];

    containers.forEach((container) => {
      Object.keys(container).forEach((key) => {
        if (typeof container[key] === "string") {
          const transformedValue =
            container[key].trim().charAt(0).toUpperCase() +
            container[key].trim().slice(1).toLowerCase();
          transformedContainers.push({ [key.toLowerCase()]: transformedValue });
        }
      });
    });

    return transformedContainers;
  }

  return containers;
};

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
    console.log(sellerId, "sellerid");
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

    const bulkcontainers = req.body.containers;

    // Check if bulkcontainers exist
    if (
      !bulkcontainers ||
      !Array.isArray(bulkcontainers) ||
      bulkcontainers.length === 0
    ) {
      return res.status(400).json({ error: "Please upload valid containers" });
    }

    const filteredBulkContainers = bulkcontainers.filter(
      (container) => container.size && container.type
    );

    if (filteredBulkContainers.length !== bulkcontainers.length) {
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

    res.status(200).json(updatedSeller); // Respond with updated seller document
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
      return res.status(400).json({ error: "Seller Id not found" });
    }

    const bulkcontainers = req.body.containers;
    const updatedContainer = [];

    // Check if bulkcontainers exist
    if (
      !bulkcontainers ||
      !Array.isArray(bulkcontainers) ||
      bulkcontainers.length === 0
    ) {
      return res.status(400).json({ error: "Please upload valid containers" });
    }

    for (const con of bulkcontainers) {
      // Find existing containers for the seller with the same type
      const sellercontainer = await containerModel.find({
        sellerId: sellerId,
        type: con.type,
        country: con.type,
        size: con.type,
        condition: con.type,
        portLocation: con.type,
      });

      if (sellercontainer.length > 0) {
        const updatecontainerId = sellercontainer[0]._id;

        console.log(updatecontainerId, "containerId");

        const updatingContainer = await containerModel.findByIdAndUpdate(
          updatecontainerId,
          {
            price: con.price,
            stockCount: con.stockCount,
          },
          { new: true }
        );
        updatedContainer.push(updatingContainer);
        console.log(updatingContainer, "updated");
      } else {
        const containerWithSeller = { ...con, sellerId: sellerId };
        const newContainer = new containerModel(containerWithSeller);
        await newContainer.save();

        const newContainerId = newContainer._id.toString();

        const updateseller = await sellerModel.findByIdAndUpdate(
          sellerId,
          { $push: { containers: newContainerId } },
          { new: true }
        );
        updatedContainer.push(newContainer);
        console.log(updateseller, "sellerupdateId");
      }
    }

    res.status(200).json({
      updatedContainers: updatedContainer,
    });
  } catch (error) {
    console.error("Error in addSellerContainer:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
