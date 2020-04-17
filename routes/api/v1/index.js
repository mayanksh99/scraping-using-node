const express = require("express");
const router = express.Router();

// load controller
const { index, getData } = require("../../../controllers/index_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { allAuth } = require("../../../middlewares/auth");

// routes
router.get("/index", catchErrors(index));
router.get("/getData", catchErrors(getData));

// export router
module.exports = router;
