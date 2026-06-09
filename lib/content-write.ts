import fs from "fs";
import path from "path";

export function saveContent(data: object) {
  const filePath = path.join(process.cwd(), "data", "content.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
