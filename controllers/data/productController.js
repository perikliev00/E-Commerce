const Home = require('../../models/Home');
const CpuContent = require('../../models/CpuContent');
const CoolingContent = require('../../models/CoolingContent');
const RamContent = require('../../models/RamContent');
const CoresContent = require('../../models/CoresContent');
const OtherPartsContent = require('../../models/OtherPartsContent');
const GraphicsCardContent = require('../../models/GraphicsCardContent');
const StorageContent = require('../../models/StorageContent');
const PowerSupplyContent = require('../../models/PowerSupplyContent');
const PcCaseContent = require('../../models/PcCaseContent');


exports.getHomeContent = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const content = await Home.findOne({});
    if (!content) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: [],
        user: req.session.user
      });
    }

    const totalItems = content.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = content.products.slice(startIndex, endIndex);

    res.json({
      'description-title': content['description-title'],
      description: content.description,
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



exports.getCpus = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const doc = await CpuContent.findOne();

    if (!doc) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: []
      });
    }

    console.log('DOC FROM DB:', doc);

    const totalItems = doc.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = doc.products.slice(startIndex, endIndex);

    res.json({
      'description-title': doc.descriptionTitle || 'Default CPU Title',
      description: doc.description || 'Default CPU Description',
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });
  } catch (error) {
    console.error('Error in getCpus:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCooling = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const doc = await CoolingContent.findOne();

    if (!doc) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: []
      });
    }

    const totalItems = doc.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = doc.products.slice(startIndex, endIndex);

    res.json({
      'description-title': doc.descriptionTitle || 'Default Cooling Title',
      description: doc.description || 'Default Cooling Description',
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.error('Error in getCooling:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getRam = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const doc = await RamContent.findOne();

    if (!doc) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: []
      });
    }

    const totalItems = doc.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = doc.products.slice(startIndex, endIndex);

    res.json({
      'description-title': doc.descriptionTitle || 'Default RAM Title',
      description: doc.description || 'Default RAM Description',
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.error('Error in getRam:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getCores = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const doc = await CoresContent.findOne();

    if (!doc) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: []
      });
    }

    const totalItems = doc.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = doc.products.slice(startIndex, endIndex);

    res.json({
      'description-title': doc.descriptionTitle || 'Default Cores Title',
      description: doc.description || 'Default Cores Description',
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.error('Error in getCores:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getOtherParts = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const doc = await OtherPartsContent.findOne();

    if (!doc) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: []
      });
    }

    const totalItems = doc.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = doc.products.slice(startIndex, endIndex);

    res.json({
      'description-title': doc.descriptionTitle || 'Default Other Parts Title',
      description: doc.description || 'Default Other Parts Description',
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.error('Error in getOtherParts:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getGraphicsCard = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const doc = await GraphicsCardContent.findOne();

    if (!doc) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: []
      });
    }

    const totalItems = doc.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = doc.products.slice(startIndex, endIndex);

    res.json({
      'description-title': doc.descriptionTitle || 'Default Graphics Title',
      description: doc.description || 'Default Graphics Description',
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.error('Error in getGraphicsCard:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getStorage = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const doc = await StorageContent.findOne();

    if (!doc) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: []
      });
    }

    const totalItems = doc.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = doc.products.slice(startIndex, endIndex);

    res.json({
      'description-title': doc.descriptionTitle || 'Default Storage Title',
      description: doc.description || 'Default Storage Description',
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.error('Error in getStorage:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getPowerSupply = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const doc = await PowerSupplyContent.findOne();

    if (!doc) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: []
      });
    }

    const totalItems = doc.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = doc.products.slice(startIndex, endIndex);

    res.json({
      'description-title': doc.descriptionTitle || 'Default PSU Title',
      description: doc.description || 'Default PSU Description',
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.error('Error in getPowerSupply:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getPcCases = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = +req.query.page || 1;

  try {
    const doc = await PcCaseContent.findOne();

    if (!doc) {
      return res.json({
        'description-title': 'No Title',
        description: 'No description available',
        products: []
      });
    }

    const totalItems = doc.products.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = doc.products.slice(startIndex, endIndex);

    res.json({
      'description-title': doc.descriptionTitle || 'Default Cases Title',
      description: doc.description || 'Default Cases Description',
      products: currentProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.error('Error in getPcCases:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};