import fs from "node:fs";

const LANGS = ["es", "en", "pt"];
const load = (l) =>
  JSON.parse(fs.readFileSync(`src/app/dictionaries/${l}.json`, "utf8"));

function keys(obj, prefix = "") {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    out.push(path);
    if (v && typeof v === "object" && !Array.isArray(v)) out.push(...keys(v, path));
    if (Array.isArray(v)) out.push(`${path}[${v.length}]`);
  }
  return out.sort();
}

const sets = Object.fromEntries(LANGS.map((l) => [l, keys(load(l))]));
const base = sets.es;
let failed = false;

for (const l of LANGS.slice(1)) {
  const missing = base.filter((k) => !sets[l].includes(k));
  const extra = sets[l].filter((k) => !base.includes(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`\n❌ ${l}.json difiere de es.json`);
    missing.forEach((k) => console.error(`   falta:  ${k}`));
    extra.forEach((k) => console.error(`   sobra:  ${k}`));
  }
}

if (failed) process.exit(1);
console.log(`✅ Los ${LANGS.length} diccionarios tienen la misma estructura (${base.length} claves)`);
