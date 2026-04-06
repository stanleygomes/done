import fs from "fs";
import path from "path";

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === "ENOTDIR" || err.code === "EBADF")
        filelist = [...filelist, dirFile];
      else throw err;
    }
  });
  return filelist;
};

const files = walkSync("apps/auth-api/src").filter((f) => f.endsWith(".ts"));

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  content = content.replace(
    /(from\s+['"])(\.[^'"]+)(['"])/g,
    (match, p1, p2, p3) => {
      if (!p2.endsWith(".js") && !p2.endsWith(".ts") && !p2.endsWith(".json")) {
        changed = true;
        return `${p1}${p2}.js${p3}`;
      }
      return match;
    },
  );

  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    // console.log(`Updated ${file}`);
  }
});
