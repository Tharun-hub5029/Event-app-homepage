const University = require("../model/universities");
exports.getAllUniversities = async (req, res) => {
  try {
    const universities = await University.findAll();

    if (universities.length === 0) {
      return res.status(404).json({ message: "No universities found" });
    }

    res.status(200).json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error); // Log error for debugging
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
