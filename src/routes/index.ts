// const router = require("express").Router();
// const apiRoutes = require("./api");
// import { Request, Response } from "express";

// router.use("/api", apiRoutes);

// router.use((req: Request, res: Response) => {
//   return res.send("Wrong route!");
// });

// // module.exports = router;
// export default router;

import { Router, Request, Response } from "express";
import apiRoutes from "./api";

const router = Router(); // Use ES6 Router import

router.use("/api", apiRoutes);

// Handle undefined routes
router.use((req: Request, res: Response) => {
  res.send("Wrong route!");
});

export default router; // Use ES6 default export
