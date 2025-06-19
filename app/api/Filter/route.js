// app/api/parts/filter/route.js

import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // Ensure this path is correct and firebaseAdmin.js properly initializes the Firebase Admin SDK

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body, "body received for filtering"); // Log the incoming request body for debugging

    // Ensure brands and categories are arrays, defaulting to empty arrays if not provided or invalid.
    // This makes the subsequent .length checks safe and prevents errors like `null.length`.
    const brands = Array.isArray(body.brands) ? body.brands : [];
    const categories = Array.isArray(body.categories) ? body.categories : [];

    // Pagination parameters with default values and validation
    const limit =
      Number.isInteger(body.limit) && body.limit > 0 && body.limit <= 100
        ? body.limit
        : 25; // Default limit of 25 items per page
    const page = Number.isInteger(body.page) && body.page >= 1 ? body.page : 1; // Default to page 1
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Start with a base query on the "Part" collection
    let query = db.collection("Part");

    // --- Diagnostic Log: Total documents in collection (unfiltered) ---
    // This helps verify if the issue is with the filter itself not matching,
    // or if the query is being skipped.
    const allDocsCountSnapshot = await db.collection("Part").count().get();
    const totalCollectionDocs = allDocsCountSnapshot.data().count;
    console.log(
      "Total documents in collection (unfiltered):",
      totalCollectionDocs
    );

    // Apply filters conditionally.
    // A filter is only applied if the corresponding array contains valid, non-empty string values.
    // This prevents attempting to query with empty arrays or invalid types, which Firestore rejects.

    // Filter by 'brand'
    if (brands.length > 0) {
      // Further filter out any non-string or empty string values from the input array.
      // This is crucial for Firestore's `in` and `==` operators.
      const validBrands = brands.filter(
        (item) => typeof item === "string" && item.trim() !== ""
      );

      // --- Diagnostic Log: What brands are considered valid for the query ---
      console.log(
        "Processing brands. Input:",
        brands,
        "Valid for query:",
        validBrands
      );

      if (validBrands.length > 0) {
        // Use '==' for a single value, 'in' for multiple values.
        // Firestore's 'in' operator is limited to 10 values per query.
        query = query.where(
          "brand",
          validBrands.length === 1 ? "==" : "in",
          validBrands.length === 1 ? validBrands[0] : validBrands
        );
        console.log("Brand filter applied to query."); // Confirm filter application
      } else {
        console.warn(
          "No valid brands found after filtering input, skipping brand query."
        );
      }
    }

    // Filter by 'category'
    if (categories.length > 0) {
      // Filter out non-string or empty string values.
      const validCategories = categories.filter(
        (item) => typeof item === "string" && item.trim() !== ""
      );

      // --- Diagnostic Log: What categories are considered valid for the query ---
      console.log(
        "Processing categories. Input:",
        categories,
        "Valid for query:",
        validCategories
      );

      if (validCategories.length > 0) {
        query = query.where(
          "category",
          validCategories.length === 1 ? "==" : "in",
          validCategories.length === 1 ? validCategories[0] : validCategories
        );
        console.log("Category filter applied to query."); // Confirm filter application
      } else {
        console.warn(
          "No valid categories found after filtering input, skipping category query."
        );
      }
    }

    // You can add more filters here following the same pattern:
    // Example: Filtering by a specific part number if provided in the body
    // if (body.partNumber && typeof body.partNumber === 'string' && body.partNumber.trim() !== '') {
    //   query = query.where("partNumber", "==", body.partNumber.trim());
    //   console.log("Part number filter applied:", body.partNumber.trim());
    // }

    // First, count the total number of documents that match the *applied filters*.
    // This is an efficient way to get the total count without fetching all documents.
    const countSnapshot = await query.count().get();
    const totalResults = countSnapshot.data().count;

    // --- Diagnostic Log: Total results after filters, before pagination ---
    console.log(
      "Total results matching filters (before pagination):",
      totalResults
    );

    // If no results are found after applying filters, return an empty array and pagination details.
    if (totalResults === 0) {
      return NextResponse.json({
        success: true,
        parts: [],
        pagination: {
          page,
          limit,
          totalResults: 0,
          totalPages: 0,
          nextPage: null,
          prevPage: null,
        },
      });
    }

    // Now, apply pagination and ordering to the query.
    // An `orderBy` clause is crucial for consistent and reliable pagination in Firestore.
    // 'sku' is used as the ordering field as per your last update. Ensure this field exists and is indexed.
    let paginatedQuery = query.orderBy("sku").offset(offset).limit(limit);

    // Execute the paginated query to get the actual documents for the current page.
    const snapshot = await paginatedQuery.get();

    // This case handles scenarios where `totalResults` might be > 0 but the current `offset`
    // pushes beyond the available documents for the specific page.
    if (snapshot.empty) {
      console.warn(
        "Paginated snapshot is empty despite totalResults > 0, likely due to offset exceeding available results."
      );
      return NextResponse.json({
        success: true,
        parts: [],
        pagination: {
          page,
          limit,
          totalResults, // Still reflects the total count for the filters
          totalPages: Math.ceil(totalResults / limit),
          nextPage: null, // No more pages if the current snapshot is empty
          prevPage: page > 1 ? page - 1 : null,
        },
      });
    }

    // Map the Firestore documents to a plain JavaScript array of part objects.
    const parts = [];
    snapshot.forEach((doc) => {
      parts.push({
        id: doc.id, // Include the document ID
        ...doc.data(), // Spread all other fields from the document
      });
    });

    // --- Diagnostic Log: Number of parts found for the current page ---
    console.log(
      "Found",
      parts.length,
      "parts for the current page after pagination."
    );

    // Calculate total pages for comprehensive pagination metadata
    const totalPages = Math.ceil(totalResults / limit);

    // Return the successful response with the filtered parts and full pagination details.
    return NextResponse.json({
      success: true,
      parts: parts,
      pagination: {
        page,
        limit,
        totalResults,
        totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      },
    });
  } catch (error) {
    // Log the full error object for detailed server-side debugging.
    console.error("Parts Filter API Error:", error);

    // Provide user-friendly error messages based on common Firestore errors or parsing issues.
    let errorMessage = "Internal server error occurred.";
    if (error.code === "FAILED_PRECONDITION") {
      errorMessage =
        "A Firestore query requires a composite index. Please check your Firestore database indexes in the Firebase console. The error message should provide a link to create the necessary index.";
    } else if (
      error.code === "INVALID_ARGUMENT" &&
      error.message.includes("in()")
    ) {
      errorMessage =
        "Too many values provided for a filter (Firestore 'in' operator has a maximum of 10 values).";
    } else if (error.message.includes("Unexpected token '<'")) {
      // This usually indicates receiving an HTML response (e.g., 404 page) instead of JSON.
      errorMessage =
        "Invalid JSON in request body, or HTML response received instead of JSON. Verify client-side request and server logs.";
    } else if (error.message.includes("Unexpected end of JSON input")) {
      errorMessage =
        "Empty or malformed JSON body received. Please ensure a valid JSON is sent.";
    }

    // Return an error response to the client with a 500 status code.
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: error.message, // Include original error message for more detail on client-side debugging
      },
      { status: 500 }
    );
  }
}
