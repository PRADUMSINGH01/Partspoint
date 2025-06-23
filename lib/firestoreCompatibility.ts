// utils/firestoreCompatibility.ts

/**
 * Normalize a string for consistent key-building:
 * - trim whitespace
 * - collapse multiple internal spaces to one
 * - optionally Unicode-normalize if needed
 * - toLowerCase for lowercase variant
 */
export function normalizeForKey(s: string): string {
  return s
    .trim()
    .replace(/\s+/g, " ") // collapse multiple spaces into one
    .toLowerCase();
}

/**
 * Given arrays of makes, models, years, engineNames, build the compatibility keys:
 * Returns an object with:
 *  - compatibilityKeys: properly cased keys (using trimmed original strings, collapsing spaces)
 *  - compatibilityKeys_lowercase: all-lowercase versions
 *
 * This is useful if you don't want to manually enumerate every key in your data.
 */
export function buildCompatibilityKeysFromArrays(
  makes: string[],
  models: string[],
  years: number[],
  engineNames: string[]
): { compatibilityKeys: string[]; compatibilityKeys_lowercase: string[] } {
  const compatibilityKeys: string[] = [];
  const compatibilityKeys_lowercase: string[] = [];

  // First, trim & collapse spaces on original arrays
  const normMakesCased = makes.map((m) => m.trim().replace(/\s+/g, " "));
  const normModelsCased = models.map((m) => m.trim().replace(/\s+/g, " "));
  const normEnginesCased = engineNames.map((e) =>
    e.trim().replace(/\s+/g, " ")
  );

  for (const make of normMakesCased) {
    for (const model of normModelsCased) {
      for (const year of years) {
        for (const engine of normEnginesCased) {
          const key = `${make}|${model}|${year}|${engine}`;
          compatibilityKeys.push(key);

          // Lowercase version: use normalizeForKey on each segment, or simply lowercase the full string:
          const makeLc = normalizeForKey(make);
          const modelLc = normalizeForKey(model);
          const engineLc = normalizeForKey(engine);
          const keyLc = `${makeLc}|${modelLc}|${year}|${engineLc}`;
          compatibilityKeys_lowercase.push(keyLc);
        }
      }
    }
  }
  return { compatibilityKeys, compatibilityKeys_lowercase };
}

/**
 * Given an existing array of compatibilityKeys, generate the lowercase array.
 * Trims and lowercases each key string.
 */
export function buildLowercaseFromKeys(keys: string[]): string[] {
  return keys
    .map((k) => (typeof k === "string" ? k.trim().toLowerCase() : ""))
    .filter((k) => k.length > 0);
}
