import { Router, Request, Response } from "express";
import { Shop } from "./shop";

const shops: Shop[] = [
  { id: 1, name: "Pepper's Pizza", rating: 4.5 },
  { id: 2, name: "Clive's Chives", rating: 3.4 },
  { id: 3, name: "Betty's Brews", rating: 4.3 },
  { id: 4, name: "Sylvester's Shoes", rating: 3.8 },
  { id: 5, name: "Teddy's Tunes", rating: 4.7 },
];

export const shopRouter = Router();

shopRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json(shops);
});

shopRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let shopById = shops.find((x) => x.id === Number(req.params.id));
    if (shopById === undefined) {
      return res
        .status(404)
        .send({ error: `Shop not found: ${req.params.id}` });
    } else {
      return res.status(200).json(shopById);
    }
  }
);

shopRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
  if (req.query.minRating !== undefined) {
    let ratingArray = shops.filter(
      (x) => x.rating <= Number(req.query.minRating)
    );
    return res.status(200).json(ratingArray);
  } else {
    return res.status(200).json(shops);
  }
});
