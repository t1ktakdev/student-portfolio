import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname,join} from "node:path";
const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const read=name=>readFileSync(join(root,name),"utf8");
test("site exposes navigable sections",()=>{
 const html=read("index.html");
 for(const id of ["main","work","about","process","themeToggle","projectSearch","projectCategory"]) {
   assert.ok(html.includes('id="'+id+'"'),"Missing "+id);
 }
});
test("responsive and accessible styling",()=>{
 const css=read("style.css");
 assert.match(css, /prefers-reduced-motion/);
 assert.match(css, /:focus-visible/);
 assert.match(css, /@media\(max-width:720px\)/);
});
test("repository data includes verified public URLs",()=>{
 const js=read("script.js");
 const links=[...js.matchAll(/url: "(https:\/\/github\.com\/t1ktakdev\/[^"]+)"/g)].map(m=>m[1]);
 assert.equal(links.length,6);
 assert.equal(new Set(links).size,6);
});
test("privacy-sensitive files are excluded",()=>{
 const ignore=read(".gitignore");
 for(const pattern of [".env","*.docx","*.pdf","node_modules/"])assert.ok(ignore.includes(pattern));
});
