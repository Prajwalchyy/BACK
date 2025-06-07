// mathController.js
export function calculateSum(req, res) {
  try {
    const a = 2;
    const b = 2;
    const sum = a + b;
    return res.status(200).json({ message: "correct", sum });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "problem in calculate sum" });
  }
}
