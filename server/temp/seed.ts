require("dotenv").config();

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Product } from "../src/lib/types";

const seed = async () => {
  try {
    console.log("[seed]:running");

    const db = await connectDatabase();

    const products: Product[] = [
      {
        _id: new ObjectId(),
        title: "Samsung Electronics EVO Select 256GB",
        description:
          "Ideal for Recording 4K UHD Video: Samsung micro SD EVO Select is perfect for high res photos, gaming, music, tablets, laptops, action cameras, DSLR's, drones, smartphones (Galaxy S20 5G, S20+ 5G, S20 Ultra 5G, S10, S10+, S10e, S9, S9+, Note9, S8, S8+, Note8, S7, S7 Edge, etc. ), Android devices and more",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/61wKZ4noXaL._AC_SX679_.jpg",
        price: 24.99,
        rating: 4.5,
        seller: "Vitalii Polushkin",
      },
      {
        _id: new ObjectId(),
        title: "Logitech G502 Hero High Performance Gaming Mouse",
        description:
          "Hero 25K sensor through a software update from G HUB, this upgrade is free to all players: Our most advanced, with 1:1 tracking, 400+ ips, and 100 - 25,600 max dpi sensitivity plus zero smoothing, filtering, or acceleration",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/51IOmsWQVAL._AC_SX679_.jpg",
        price: 38.99,
        rating: 4.8,
        seller: "Pablo Esqobar",
      },
      {
        _id: new ObjectId(),
        title: "Apple Electronics EVO Select 256GB",
        description:
          "Apple for Recording 4K UHD Video: Samsung micro SD EVO Select is perfect for high res photos, gaming, music, tablets, laptops, action cameras, DSLR's, drones, smartphones (Galaxy S20 5G, S20+ 5G, S20 Ultra 5G, S10, S10+, S10e, S9, S9+, Note9, S8, S8+, Note8, S7, S7 Edge, etc. ), Android devices and more",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/61wKZ4noXaL._AC_SX679_.jpg",
        price: 124.99,
        rating: 4.8,
        seller: "Apple",
      },
      {
        _id: new ObjectId(),
        title: "Turtle Beach Ear Force Recon 50X ",
        description:
          "Nokia 25K sensor through a software update from G HUB, this upgrade is free to all players: Our most advanced, with 1:1 tracking, 400+ ips, and 100 - 25,600 max dpi sensitivity plus zero smoothing, filtering, or acceleration",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/71wkJ5I657L._SX522_.jpg",
        price: 32.99,
        rating: 4.1,
        seller: "R50",
      },
    ];
    for (const product of products) {
      await db.products.insertOne(product);
    }
    console.log("[seed] success");
  } catch {
    throw new Error("Failed to seed");
  }
};

seed();
