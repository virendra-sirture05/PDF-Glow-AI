export function formatFileNameAsTitle(fileName: string): string {
  // 1. Remove file extension
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");

  // 2. Replace underscores & dashes with spaces
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, " ")
    // Add space between camelCase (example: helloWorld → hello World)
    .replace(/([a-z])([A-Z])/g, "$1 $2");

  // 3. Convert to Title Case
  const title = withSpaces
    .split(" ")
    .map((word) => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ")
    .trim();

  return title;
}
