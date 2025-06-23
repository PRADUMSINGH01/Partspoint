// import necessary functions from Firestore client SDK
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // your initialized Firestore client

// Import our utilities
import {
  normalizeForKey,
  buildCompatibilityKeysFromArrays,
  buildLowercaseFromKeys,
} from "@/lib/firestoreCompatibility";

interface ProductToAdd {
  name: string;
  partNumber: string;
  price: number;
  compatibleMakes: string[];
  compatibleModels: string[];
  compatibleYears: number[];
  compatibleEngineNames: string[];
  compatibilityKeys?: string[];
  compatibilityKeys_lowercase: string[];
  description?: string;
  manufacturer?: string;
  stockQty?: number;
  imageURL?: string;
}

interface AddProductResult {
  success: boolean;
  partNumber: string;
  id?: string;
  reason?: string;
  error?: string;
}

/**
 * Adds multiple products to Firestore, skipping those whose partNumber already exists.
 * Generates full compatibilityKeys_lowercase for each new product.
 */
const addProducts = async (): Promise<AddProductResult[]> => {
  const productsToAdd: ProductToAdd[] = [
    {
      name: "Cabin Air Filter",
      partNumber: "CF-XUV300-19",
      price: 420.0,
      compatibleMakes: ["Mahindra"],
      compatibleModels: ["XUV 300"],
      compatibleYears: [2019, 2020, 2021, 2022],
      compatibleEngineNames: ["1.2L Turbo Petrol", "1.5L Diesel"],
      compatibilityKeys: [
        "Mahindra|XUV 300|2019|1.2L Turbo Petrol",
        "Mahindra|XUV 300|2019|1.5L Diesel",
        "Mahindra|XUV 300|2020|1.2L Turbo Petrol",
        "Mahindra|XUV 300|2020|1.5L Diesel",
        "Mahindra|XUV 300|2021|1.2L Turbo Petrol",
        "Mahindra|XUV 300|2021|1.5L Diesel",
        "Mahindra|XUV 300|2022|1.2L Turbo Petrol",
        "Mahindra|XUV 300|2022|1.5L Diesel",
      ],
      compatibilityKeys_lowercase: [
        "mahindra|xuv 300|2019|1.2l turbo petrol",
        "mahindra|xuv 300|2019|1.5l diesel",
        "mahindra|xuv 300|2020|1.2l turbo petrol",
        "mahindra|xuv 300|2020|1.5l diesel",
        "mahindra|xuv 300|2021|1.2l turbo petrol",
        "mahindra|xuv 300|2021|1.5l diesel",
        "mahindra|xuv 300|2022|1.2l turbo petrol",
        "mahindra|xuv 300|2022|1.5l diesel",
      ],
      description:
        "Cabin air filter for Mahindra XUV300 petrol & diesel (2019–2022).",
      manufacturer: "Aftermarket FilterCo",
      stockQty: 35,
      imageURL: "https://example.com/images/CF-XUV300-19.jpg",
    },
    {
      name: "Air Filter Element",
      partNumber: "AF-CRETA-15",
      price: 600.0,
      compatibleMakes: ["Hyundai"],
      compatibleModels: ["Creta"],
      compatibleYears: [
        2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
      ],
      compatibleEngineNames: [
        "1.5 L Petrol",
        "1.5 L Diesel",
        "1.4 L Turbo Petrol",
      ],
      compatibilityKeys: [
        "Hyundai|Creta|2015|1.5 L Petrol",
        "Hyundai|Creta|2015|1.5 L Diesel",
        "Hyundai|Creta|2015|1.4 L Turbo Petrol",
        "Hyundai|Creta|2016|1.5 L Petrol",
        "Hyundai|Creta|2016|1.5 L Diesel",
        "Hyundai|Creta|2016|1.4 L Turbo Petrol",
        "Hyundai|Creta|2017|1.5 L Petrol",
        "Hyundai|Creta|2017|1.5 L Diesel",
        "Hyundai|Creta|2017|1.4 L Turbo Petrol",
        "Hyundai|Creta|2018|1.5 L Petrol",
        "Hyundai|Creta|2018|1.5 L Diesel",
        "Hyundai|Creta|2018|1.4 L Turbo Petrol",
        "Hyundai|Creta|2019|1.5 L Petrol",
        "Hyundai|Creta|2019|1.5 L Diesel",
        "Hyundai|Creta|2019|1.4 L Turbo Petrol",
        "Hyundai|Creta|2020|1.5 L Petrol",
        "Hyundai|Creta|2020|1.5 L Diesel",
        "Hyundai|Creta|2020|1.4 L Turbo Petrol",
        "Hyundai|Creta|2021|1.5 L Petrol",
        "Hyundai|Creta|2021|1.5 L Diesel",
        "Hyundai|Creta|2021|1.4 L Turbo Petrol",
        "Hyundai|Creta|2022|1.5 L Petrol",
        "Hyundai|Creta|2022|1.5 L Diesel",
        "Hyundai|Creta|2022|1.4 L Turbo Petrol",
        "Hyundai|Creta|2023|1.5 L Petrol",
        "Hyundai|Creta|2023|1.5 L Diesel",
        "Hyundai|Creta|2023|1.4 L Turbo Petrol",
        "Hyundai|Creta|2024|1.5 L Petrol",
        "Hyundai|Creta|2024|1.5 L Diesel",
        "Hyundai|Creta|2024|1.4 L Turbo Petrol",
      ],
      compatibilityKeys_lowercase: [
        "hyundai|creta|2015|1.5 l petrol",
        "hyundai|creta|2015|1.5 l diesel",
        "hyundai|creta|2015|1.4 l turbo petrol",
        "hyundai|creta|2016|1.5 l petrol",
        "hyundai|creta|2016|1.5 l diesel",
        "hyundai|creta|2016|1.4 l turbo petrol",
        "hyundai|creta|2017|1.5 l petrol",
        "hyundai|creta|2017|1.5 l diesel",
        "hyundai|creta|2017|1.4 l turbo petrol",
        "hyundai|creta|2018|1.5 l petrol",
        "hyundai|creta|2018|1.5 l diesel",
        "hyundai|creta|2018|1.4 l turbo petrol",
        "hyundai|creta|2019|1.5 l petrol",
        "hyundai|creta|2019|1.5 l diesel",
        "hyundai|creta|2019|1.4 l turbo petrol",
        "hyundai|creta|2020|1.5 l petrol",
        "hyundai|creta|2020|1.5 l diesel",
        "hyundai|creta|2020|1.4 l turbo petrol",
        "hyundai|creta|2021|1.5 l petrol",
        "hyundai|creta|2021|1.5 l diesel",
        "hyundai|creta|2021|1.4 l turbo petrol",
        "hyundai|creta|2022|1.5 l petrol",
        "hyundai|creta|2022|1.5 l diesel",
        "hyundai|creta|2022|1.4 l turbo petrol",
        "hyundai|creta|2023|1.5 l petrol",
        "hyundai|creta|2023|1.5 l diesel",
        "hyundai|creta|2023|1.4 l turbo petrol",
        "hyundai|creta|2024|1.5 l petrol",
        "hyundai|creta|2024|1.5 l diesel",
        "hyundai|creta|2024|1.4 l turbo petrol",
      ],
      description:
        "Air filter for Hyundai Creta petrol and diesel variants (2015–2024); includes support for new 1.4L Turbo Petrol in 2024.",
      manufacturer: "Hyundai Genuine",
      stockQty: 22,
      imageURL: "https://example.com/images/AF-CRETA-15.jpg",
    },
  ];
  const productsRef = collection(db, "New");
  const results: AddProductResult[] = [];

  try {
    // 1. Collect all partNumbers to check for duplicates
    const partNumbers = productsToAdd.map((p) => p.partNumber.trim());
    if (partNumbers.length === 0) {
      console.log("No products to add.");
      return [];
    }

    // Firestore 'in' queries accept up to 10 items. If >10, you must batch your checks.
    if (partNumbers.length > 10) {
      console.warn(
        "More than 10 products to check at once; consider batching the duplicate-check queries."
      );
      // For simplicity, here we proceed by splitting into batches of 10
    }

    // 2. Query Firestore for existing documents with same partNumber
    //    If >10 partNumbers, run multiple queries and gather existingPartNumbers.
    const existingPartNumbers = new Set<string>();
    const BATCH_SIZE = 10;
    for (let i = 0; i < partNumbers.length; i += BATCH_SIZE) {
      const batchPartNumbers = partNumbers.slice(i, i + BATCH_SIZE);
      const existingQuery = query(
        productsRef,
        where("partNumber", "in", batchPartNumbers)
      );
      const existingSnapshot = await getDocs(existingQuery);
      existingSnapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        if (typeof data.partNumber === "string") {
          existingPartNumbers.add(data.partNumber.trim());
        }
      });
    }

    // 3. Filter out products that already exist
    const newProducts = productsToAdd.filter((product) => {
      const pn = product.partNumber.trim();
      if (existingPartNumbers.has(pn)) {
        console.log(`❌ Product already exists: ${pn}`);
        results.push({
          success: false,
          reason: "already exists",
          partNumber: pn,
        });
        return false;
      }
      return true;
    });

    // 4. Batch write new products
    if (newProducts.length > 0) {
      // Firestore batch can handle up to 500 operations per batch
      const batch = writeBatch(db);
      for (const product of newProducts) {
        // Validate required fields
        if (
          !product.name ||
          !product.partNumber ||
          typeof product.price !== "number" ||
          !Array.isArray(product.compatibleMakes) ||
          !Array.isArray(product.compatibleModels) ||
          !Array.isArray(product.compatibleYears) ||
          !Array.isArray(product.compatibleEngineNames)
        ) {
          console.warn(
            `Skipping product due to missing required fields: ${product.partNumber}`
          );
          results.push({
            success: false,
            partNumber: product.partNumber.trim(),
            reason: "missing required fields",
          });
          continue;
        }

        // Normalize main fields
        const nameNorm = product.name.trim();
        const partNumberNorm = product.partNumber.trim();
        const price = product.price;

        // Normalize arrays: trim strings, collapse spaces
        const makesNorm = product.compatibleMakes.map((m) =>
          m.trim().replace(/\s+/g, " ")
        );
        const modelsNorm = product.compatibleModels.map((m) =>
          m.trim().replace(/\s+/g, " ")
        );
        const enginesNorm = product.compatibleEngineNames.map((e) =>
          e.trim().replace(/\s+/g, " ")
        );
        const yearsNorm = product.compatibleYears.filter(
          (y) => typeof y === "number" && !isNaN(y)
        );

        // Build compatibilityKeys and lowercase variants
        let compatibilityKeys: string[];
        let compatibilityKeys_lowercase: string[];

        if (
          Array.isArray(product.compatibilityKeys) &&
          product.compatibilityKeys.length > 0
        ) {
          // If user manually supplied compatibilityKeys array, use it, but also normalize/trims
          compatibilityKeys = product.compatibilityKeys
            .map((k) =>
              typeof k === "string" ? k.trim().replace(/\s+/g, " ") : ""
            )
            .filter((k) => k.length > 0);

          compatibilityKeys_lowercase =
            buildLowercaseFromKeys(compatibilityKeys);
        } else {
          // Otherwise, build from arrays
          const built = buildCompatibilityKeysFromArrays(
            makesNorm,
            modelsNorm,
            yearsNorm,
            enginesNorm
          );
          compatibilityKeys = built.compatibilityKeys;
          compatibilityKeys_lowercase = built.compatibilityKeys_lowercase;
        }

        // Prepare document data
        const docData: Record<string, any> = {
          name: nameNorm,
          partNumber: partNumberNorm,
          price,
          compatibleMakes: makesNorm,
          compatibleModels: modelsNorm,
          compatibleYears: yearsNorm,
          compatibleEngineNames: enginesNorm,
          compatibilityKeys,
          compatibilityKeys_lowercase,
          description:
            typeof product.description === "string"
              ? product.description.trim()
              : "",
          manufacturer:
            typeof product.manufacturer === "string"
              ? product.manufacturer.trim()
              : "",
          stockQty: typeof product.stockQty === "number" ? product.stockQty : 0,
          imageURL:
            typeof product.imageURL === "string" ? product.imageURL.trim() : "",
          createdAt: Timestamp.now(),
          // Optionally updatedAt: Timestamp.now()
        };

        // Create a new document reference with auto-generated ID
        const docRef = doc(productsRef);
        batch.set(docRef, docData);
        results.push({
          success: true,
          id: docRef.id,
          partNumber: partNumberNorm,
        });
      }

      // Commit the batch
      await batch.commit();
      console.log(`✅ Successfully added ${newProducts.length} new products.`);
    } else {
      console.log("No new products to add.");
    }
  } catch (error: any) {
    console.error("❗ Error adding products:", error);
    results.push();
  }

  return results;
};

export default addProducts;
