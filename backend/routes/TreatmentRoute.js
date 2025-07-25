const express = require("express");
const router = express.Router();

const {
  createTreatment,
  viewAllTreatments,
  viewTreatmentById,
  deleteTreatment,
  updateTreatment,
  countAllTreatments,
} = require("../controllers/TreatmentController");

router.post("/create-treatment", createTreatment);
router.get("/view-all-treatments", viewAllTreatments);
router.get("/view-treatment-by-id/:id", viewTreatmentById);
router.delete("/delete-treatment/:id", deleteTreatment);
router.put("/update-treatment/:id", updateTreatment);
router.get("/count-all-treatment", countAllTreatments);

module.exports = router;
