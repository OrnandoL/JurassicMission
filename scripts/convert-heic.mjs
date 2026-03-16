import fs from "node:fs/promises";
import path from "node:path";
import heicConvertPackage from "heic-convert";
import sharp from "sharp";

const imagesDir = path.resolve("assets/images");
const allowedExtensions = new Set([".heic", ".HEIC"]);
const maxWidth = 1800;
const jpegQuality = 82;
const heicConvert = heicConvertPackage.default ?? heicConvertPackage;

async function findHeicFiles() {
  const entries = await fs.readdir(imagesDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && allowedExtensions.has(path.extname(entry.name)))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

async function convertFile(fileName) {
  const sourcePath = path.join(imagesDir, fileName);
  const outputName = `${path.parse(fileName).name}.jpg`;
  const outputPath = path.join(imagesDir, outputName);

  const sourceStat = await fs.stat(sourcePath);
  let shouldConvert = true;

  try {
    const outputStat = await fs.stat(outputPath);
    if (outputStat.mtimeMs >= sourceStat.mtimeMs) {
      shouldConvert = false;
    }
  } catch {
    // Output file does not exist yet.
  }

  if (!shouldConvert) {
    console.log(`skip ${fileName} -> ${outputName}`);
    return;
  }

  const inputBuffer = await fs.readFile(sourcePath);
  const convertedBuffer = await heicConvert({
    buffer: inputBuffer,
    format: "JPEG",
    quality: 0.82
  });
  const image = sharp(convertedBuffer, { failOn: "warning" }).rotate();
  const metadata = await image.metadata();

  if (metadata.width && metadata.width > maxWidth) {
    image.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await image.jpeg({ quality: jpegQuality }).toFile(outputPath);
  console.log(`done ${fileName} -> ${outputName}`);
}

async function main() {
  const files = await findHeicFiles();

  if (files.length === 0) {
    console.log("No HEIC files found in assets/images.");
    return;
  }

  let hadError = false;

  for (const fileName of files) {
    try {
      await convertFile(fileName);
    } catch (error) {
      hadError = true;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`fail ${fileName}: ${message}`);
    }
  }

  if (hadError) {
    process.exitCode = 1;
  }
}

await main();
