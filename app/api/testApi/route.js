// app/api/products/route.js
import { db } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure dynamic fetching

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const compatibility = searchParams.get("compatibility");
    const limit = parseInt(searchParams.get("limit") || 10);
    const lastId = searchParams.get("lastId");

    // Validate required parameters
    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    // Build base query
    let query = db
      .collection("products")
      .where("category", "==", category)
      .limit(limit);

    // Add optional filters
    if (subcategory && subcategory !== "all") {
      query = query.where("subcategory", "==", subcategory);
    }

    if (compatibility && compatibility !== "all") {
      query = query.where("compatibility", "array-contains", compatibility);
    }

    // Add pagination
    if (lastId) {
      const lastDocRef = db.collection("products").doc(lastId);
      const lastDoc = await lastDocRef.get();

      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    // Execute query
    const snapshot = await query.get();

    // Handle empty results
    if (snapshot.empty) {
      return NextResponse.json(
        { products: [], lastId: null, count: 0 },
        { status: 200 }
      );
    }

    // Process results
    const products = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Get last document for pagination
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    return NextResponse.json({
      success: true,
      products,
      lastId: lastDoc.id,
      count: products.length,
    });
  } catch (error) {
    console.error("Products API Error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message || "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
