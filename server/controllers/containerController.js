import containerModel from "../models/containerModel.js";
import sellerModel from "../models/sellerModel.js";

//get
export const getAllContainer = async (req, res) => {
  try {
    const {
      type,
      condition,
      size,
      country,
      port,
      page = 0,
      rowsPerPage = 10,
    } = req.query;

    // Validate query parameters
    const pageNumber = Number(isNaN(page) ? 0 : page);
    const limit = Number(isNaN(rowsPerPage) ? 10 : rowsPerPage);

    // Construct the filter
    let filter = {};
    if (type) {
      filter.type = { $regex: type, $options: "i" }; // Case-insensitive search
    }
    if (condition) {
      filter.condition = { $regex: condition, $options: "i" }; // Case-insensitive search
    }
    if (size) {
      filter.size = { $regex: size, $options: "i" }; // Case-insensitive search
    }
    if (country) {
      filter.country = { $regex: country, $options: "i" }; // Case-insensitive search
    }
    if (port) {
      filter.portLocation = { $regex: port, $options: "i" }; // Case-insensitive search
    }

    // Get total count
    const totalContainers = await containerModel.countDocuments(filter);

    // Construct the aggregation pipeline
    let pipeline = [
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
          // Add other fields if needed
        },
      },
      {
        $sort: { createdAt: -1 }, // Ensure you have 'createdAt' field in UserModel
      },
      {
        $skip: pageNumber * limit,
      },
      {
        $limit: limit,
      },
    ];

    // Execute the aggregation pipeline
    const containers = await containerModel.aggregate(pipeline);

    return res.status(200).json({ containers, totalContainers });
  } catch (error) {
    console.error("Error in getAllContainer : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get country & port

const getUniquePort = async (countries = [], country = "") => {
  try {
    const uniqueCountries = await containerModel.aggregate([
      {
        $match: {
          ...(countries.length > 0 && { country: { $in: countries } }),
          ...(country && { country }),
        },
      },
      {
        $group: {
          _id: "$portLocation",
        },
      },

      {
        $project: {
          _id: 0,
          label: "$_id",
          value: {
            $toLower: {
              $replaceAll: {
                input: "$_id",
                find: " ",
                replacement: "",
              },
            },
          },
        },
      },
      {
        $sort: {
          label: 1, // 1 for ascending order
        },
      },
    ]);
    return uniqueCountries;
  } catch (error) {
    console.error("Error fetching unique countries:", error.message);
    throw error;
  }
};

const getUniqueCountries = async () => {
  try {
    const uniqueCountries = await containerModel.aggregate([
      {
        $group: {
          _id: "$country",
        },
      },

      {
        $project: {
          _id: 0,
          label: "$_id",
          value: {
            $toLower: {
              $replaceAll: {
                input: "$_id",
                find: " ",
                replacement: "",
              },
            },
          },
        },
      },
      {
        $sort: {
          label: 1, // 1 for ascending order
        },
      },
    ]);
    return uniqueCountries;
  } catch (error) {
    console.error("Error fetching unique countries:", error.message);
    throw error;
  }
};

export const getCountryPort = async (req, res) => {
  try {
    const countries = req.query.countries ? req.query.countries.split(",") : [];
    const country = req.query.country ? req.query.country : "";
    const uniqueCountries = await getUniqueCountries();
    const uniqueport = await getUniquePort(countries, country);
    res.status(200).json({ countries: uniqueCountries, ports: uniqueport });
  } catch (error) {
    console.error("Error in getContainer : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//pgwise
const getGroupedContainers = async (
  page,
  itemsPerPage,
  countries = [],
  ports = [],
  sizes = [],
  types = [],
  conditions = []
) => {
  try {
    const skip = (page - 1) * itemsPerPage;

    // Aggregation Pipeline with $facet
    const [results] = await containerModel.aggregate([
      {
        $match: {
          ...(countries.length > 0 && { country: { $in: countries } }),
          ...(ports.length > 0 && { portLocation: { $in: ports } }),
          ...(sizes.length > 0 && { size: { $in: sizes } }),
          ...(types.length > 0 && { type: { $in: types } }),
          ...(conditions.length > 0 && { condition: { $in: conditions } }),
        },
      },
      {
        $group: {
          _id: {
            country: "$country",
            portLocation: "$portLocation",
          },
          stockCount: { $sum: { $toInt: "$stockCount" } },
          price: { $first: "$price" },
          conditions: { $addToSet: "$condition" },
          types: { $addToSet: "$type" },
          sizes: { $addToSet: "$size" },
          ids: { $addToSet: "$_id" },
        },
      },
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            { $sort: { stockCount: -1 } },
            { $skip: skip },
            { $limit: itemsPerPage },
            {
              $project: {
                _id: 0,
                country: "$_id.country",
                portLocation: "$_id.portLocation",
                stockCount: 1,
                price: 1,
                conditions: 1,
                types: 1,
                sizes: 1,
                ids: 1,
              },
            },
          ],
        },
      },
    ]);

    const totalCount =
      results.metadata.length > 0 ? results.metadata[0].totalCount : 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      containers: results.data,
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error in getGroupedContainers:", error);
    throw new Error("Internal server error");
  }
};

export const getContainerPageWise = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage, 10) || 10;
    const countries = req.query.countries ? req.query.countries.split(",") : [];
    const ports = req.query.ports ? req.query.ports.split(",") : [];
    const sizes = req.query.sizes ? req.query.sizes.split(",") : [];
    const types = req.query.types ? req.query.types.split(",") : [];
    const conditions = req.query.conditions
      ? req.query.conditions.split(",")
      : [];

    const result = await getGroupedContainers(
      page,
      itemsPerPage,
      countries,
      ports,
      sizes,
      types,
      conditions
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getContainerPageWise:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

///selected

const getselectedContainer = async (
  page,
  itemsPerPage,
  country = "",
  port = "",
  sizes = [],
  types = [],
  conditions = []
) => {
  try {
    const skip = (page - 1) * itemsPerPage;

    // Aggregation Pipeline with $facet
    const [results] = await containerModel.aggregate([
      {
        $match: {
          ...(country && { country }),
          ...(port && { portLocation: port }),
          ...(sizes.length > 0 && { size: { $in: sizes } }),
          ...(types.length > 0 && { type: { $in: types } }),
          ...(conditions.length > 0 && { condition: { $in: conditions } }),
        },
      },
      {
        $group: {
          _id: {
            size: "$size",
            type: "$type",
            condition: "$condition",
            country: "$country",
            port: "$portLocation",
          },
          stockCount: { $sum: { $toInt: "$stockCount" } },
          price: { $max: "$price" },
          sellerId: { $addToSet: "$sellerId" },
          containerId: { $first: "$_id" },
        },
      },
      {
        $addFields: {
          adjustedPrice: { $multiply: ["$price", 1.1] }, // Calculate adjusted price (price * 1.1)
        },
      },
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            { $sort: { stockCount: -1 } },
            { $skip: skip },
            { $limit: itemsPerPage },
            {
              $project: {
                _id: 0,
                country: "$_id.country",
                portLocation: "$_id.port",
                stockCount: 1,
                price: 1,
                adjustedPrice: 1, // Include adjusted price in the output
                condition: "$_id.condition",
                type: "$_id.type",
                size: "$_id.size",
                sellerId: 1,
                containerId: 1,
              },
            },
          ],
        },
      },
    ]);

    const totalCount =
      results.metadata.length > 0 ? results.metadata[0].totalCount : 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      containers: results.data,
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error in getselectedContainer:", error);
    throw new Error("Internal server error");
  }
};

export const getSelectedContainerPageWise = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage, 10) || 10;
    const country = req.query.country ? req.query.country : "";
    const port = req.query.port ? req.query.port : [];
    const sizes = req.query.sizes ? req.query.sizes.split(",") : [];
    const types = req.query.types ? req.query.types.split(",") : [];
    const conditions = req.query.conditions
      ? req.query.conditions.split(",")
      : [];

    const result = await getselectedContainer(
      page,
      itemsPerPage,
      country,
      port,
      sizes,
      types,
      conditions
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getSelectedContainerPageWise:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//add
export const addContainer = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const seller = await sellerModel.findById(sellerId);
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
    const countrycase = country.toUpperCase();
    const port = portLocation.toUpperCase();
    const conditioncase = condition.toUpperCase();
    const sizecase = size.toUpperCase();
    const typecase = type.toUpperCase();

    const newcontainer = new containerModel({
      containerNumber: containerNumber,
      size: sizecase,
      type: typecase,
      condition: conditioncase,
      country: countrycase,
      portLocation: port,
      price: price,
      stockCount: stockCount,
      sellerId: sellerId,
    });
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
    console.error("Error in addContainer : ", error.message);
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

    const countrycase = country.toUpperCase();
    const port = portLocation.toUpperCase();
    const conditioncase = condition.toUpperCase();
    const sizecase = size.toUpperCase();
    const typecase = type.toUpperCase();

    const sellerId = container.sellerId;

    const updateContainer = await containerModel.findByIdAndUpdate(
      containerId,
      {
        containerNumber: containerNumber,
        size: sizecase,
        type: typecase,
        condition: conditioncase,
        country: countrycase,
        portLocation: port,
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

    res.status(200).json({
      message: "container updated",
      updatedContainer: updateContainer,
    });
  } catch (error) {
    console.error("Error in updateContainer : ", error.message);
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
    console.error("Error in deleteContainer : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
