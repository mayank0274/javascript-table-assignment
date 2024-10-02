const cacheName = "chemical_supplies_data_v1";
const cacheAsset = [
  "/js/script.js",
  "/css/style.css",
  "/index.html",
  "/assets/fonts/space_mono.woff2",
  "/assets/icons/addBtn.svg",
  "/assets/icons/arrowDown.svg",
  "/assets/icons/arrowUp.svg",
  "/assets/icons/checkMark.svg",
  "/assets/icons/edit.svg",
  "/assets/icons/refresh.svg",
  "/assets/icons/save.svg",
  "/assets/icons/trash.svg",
];

const filesUpdate = (cache) => {
  const stack = [];
  console.log("[service worker]: caching files");
  cacheAsset.forEach((file) =>
    stack.push(
      cache.add(file).catch((_) => console.error(`can't load ${file} to cache`))
    )
  );
  return Promise.all(stack);
};

self.addEventListener("install", async (e) => {
  console.log("[service worker] : installed");
  e.waitUntil(caches.open(cacheName).then(filesUpdate));
  console.log("[service worker]: all files cached");
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("service worker: fetching");

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
