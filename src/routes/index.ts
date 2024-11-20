const router = require("express").Router();
const apiRoutes = require("./api");
import { Request, Response } from "express";

router.use("/api", apiRoutes);

router.use((req: Request, res: Response) => {
  return res.send("Wrong route!");
});

// module.exports = router;
export default router;