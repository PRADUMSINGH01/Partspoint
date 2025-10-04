// import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

// // helper to build the same key your front‑end uses
// function makeCompatibilityKey(brand, model, year, engine) {
//   return [brand, model, year, engine]
//     .map((p) => encodeURIComponent(p))
//     .join("|");
// }

export async function GET() {
  //   try {
  //     const { searchParams } = new URL(request.url);

  //     // 1. grab all the params
  //     const categories = searchParams.getAll("category");
  //     const subcategories = searchParams.getAll("subcategory");
  //     const compatibility = searchParams.get("compatibility");
  //     const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  //     const lastId = searchParams.get("lastId");

  //     // 2. build base Firestore query (without compatibility)
  //     let query = db.collection("Products");

  //     if (categories.length && !categories.includes("all")) {
  //       query =
  //         categories.length === 1
  //           ? query.where("category", "==", categories[0])
  //           : query.where("category", "in", categories);
  //     }
  //     if (subcategories.length && !subcategories.includes("all")) {
  //       query =
  //         subcategories.length === 1
  //           ? query.where("subcategory", "==", subcategories[0])
  //           : query.where("subcategory", "in", subcategories);
  //     }

  //     // 3. apply cursor pagination before fetch
  //     if (lastId) {
  //       const lastSnap = await db.collection("Products").doc(lastId).get();
  //       if (lastSnap.exists) {
  //         query = query.startAfter(lastSnap);
  //       }
  //     }

  //     // 4. limit + executes
  //     query = query.limit(limit);
  //     const snap = await query.get();

  //     if (snap.empty) {
  //       return NextResponse.json({
  //         success: true,
  //         products: [],
  //         lastId: null,
  //         count: 0,
  //       });
  //     }

  //     // 5. map docs and post‑filter by compatibility key
  //     const allProducts = snap.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     const filtered = allProducts.filter((prod) => {
  //       // if no compatibility filter, keep all
  //       if (!compatibility || compatibility === "all") {
  //         return true;
  //       }

  //       // build array of keys for this product
  //       const keys = (prod.compatibility || []).map(makeCompatibilityKey);
  //       // keep if any key matches the query string
  //       return keys.includes(compatibility);
  //     });

  //     // 6. compute newLastId from the *filtered* list, if you still want cursor
  //     const newLastId = filtered.length ? filtered[filtered.length - 1].id : null;

  //     return NextResponse.json({
  //       success: true,
  //       products: filtered,
  //       lastId: newLastId,
  //       count: filtered.length,
  //     });
  //   } catch (err) {
  //     console.error("[Part API] Error fetching products:", err);
  //     return NextResponse.json(
  //       { success: false, error: "Internal Server Error", message: err.message },
  //       { status: 500 }
  //     );
  //   }
  // }

  return NextResponse.json({ status: 200 });
}
