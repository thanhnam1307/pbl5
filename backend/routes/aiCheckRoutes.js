const express = require("express");
const router = express.Router();
const aiCheckController = require("../controllers/aiCheckController");

router.post("/", aiCheckController.createAICheck);
router.get("/", aiCheckController.getAllAIChecks);
router.get("/:id", aiCheckController.getAICheckById);
router.put("/:id", aiCheckController.updateAICheck);
router.delete("/:id", aiCheckController.deleteAICheck);

module.exports = router;
