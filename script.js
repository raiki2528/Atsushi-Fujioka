const pages = [
  ["profile.html", "Profile", "プロフィール"],
  ["story.html", "Story", "歩み"],
  ["philippines.html", "Philippines", "フィリピン"],
  ["education.html", "Education", "教育"],
  ["community.html", "Community", "地域づくり"],
  ["art.html", "Art", "アート"],
  ["research.html", "Research", "研究"],
  ["publications.html", "Publications", "研究発表"],
  ["projects.html", "Projects", "活動・所属"],
  ["gallery.html", "Gallery", "写真"]
];

const current = location.pathname.split("/").pop() || "index.html";
const currentAttr = (file) => file === current ? ' aria-current="page"' : "";
const pageLinks = pages.map(([file, en, ja]) =>
  `<a href="${file}"${currentAttr(file)}><span>${en}</span> <small>${ja}</small></a>`
).join("");

document.querySelector("[data-site-header]")?.replaceWith(
  Object.assign(document.createElement("div"), {
    innerHTML: `
      <a class="skip-link" href="#main">本文へ移動</a>
      <header class="site-header">
        <nav class="nav" aria-label="メインナビゲーション">
          <a class="brand" href="index.html"${currentAttr("index.html")}>
            <span class="brand-mark">AF</span>
            <span>ATSUSHI FUJIOKA<small>People & Community Builder</small></span>
          </a>
          <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
          <div class="nav-links">
            <a href="index.html"${currentAttr("index.html")}>Home</a>
            <a href="story.html"${currentAttr("story.html")}>Story</a>
            <a href="projects.html"${currentAttr("projects.html")}>Projects</a>
            <a href="gallery.html"${currentAttr("gallery.html")}>Gallery</a>
            <div class="menu-wrap">
              <button class="menu-button" type="button" aria-haspopup="true">Explore ＋</button>
              <div class="dropdown">${pageLinks}</div>
            </div>
          </div>
        </nav>
      </header>`
  })
);

document.querySelector("[data-site-footer]")?.replaceWith(
  Object.assign(document.createElement("div"), {
    innerHTML: `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div><p class="footer-name">ATSUSHI FUJIOKA</p><p class="footer-tagline">教育、福祉、国際協力、地域づくり。人と人のあいだに学びと活躍の場をひらく。</p></div>
            <div class="footer-links">
              <a href="profile.html">Profile</a><a href="story.html">Story</a>
              <a href="philippines.html">Philippines</a><a href="education.html">Education</a>
              <a href="community.html">Community</a><a href="art.html">Art</a>
              <a href="research.html">Research</a><a href="publications.html">Publications</a>
              <a href="projects.html">Projects</a><a href="gallery.html">Gallery</a>
              <a href="https://researchmap.jp/fujioka_atsushi" target="_blank" rel="noopener">researchmap ↗</a>
              <a href="https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202401006218208820" target="_blank" rel="noopener">J-GLOBAL ↗</a>
            </div>
          </div>
          <div class="footer-bottom"><span>© <span data-year></span> Atsushi Fujioka Portfolio</span><span>公開情報と本人提供資料をもとに構成しています。</span></div>
        </div>
      </footer>`
  })
);

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const updateHeader = () => header?.classList.toggle("scrolled", scrollY > 12);
updateHeader();
addEventListener("scroll", updateHeader, { passive: true });

toggle?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  document.body.classList.toggle("menu-open", open);
});
links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  links.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const careerMap = document.querySelector("[data-career-map]");
if (careerMap) {
  const stage = careerMap.querySelector(".career-map-stage");
  const svg = careerMap.querySelector(".career-map-lines");
  const nodes = [...careerMap.querySelectorAll("[data-map-node]")];
  const centerNode = careerMap.querySelector(".map-node-center");
  const title = careerMap.querySelector("[data-map-title]");
  const meta = careerMap.querySelector("[data-map-meta]");
  const detail = careerMap.querySelector("[data-map-detail]");
  const detailLink = careerMap.querySelector("[data-map-link]");

  const selectNode = (node) => {
    nodes.forEach((item) => item.setAttribute("aria-pressed", String(item === node)));
    title.textContent = node.dataset.label;
    meta.textContent = node.dataset.meta;
    detail.textContent = node.dataset.detail;
    detailLink.href = node.dataset.href;
    detailLink.textContent = `${node.dataset.link} →`;
  };

  nodes.forEach((node) => node.addEventListener("click", () => selectNode(node)));

  const drawCareerLines = () => {
    svg.querySelectorAll("path").forEach((path) => path.remove());
    if (matchMedia("(max-width: 560px)").matches) return;

    const stageBox = stage.getBoundingClientRect();
    const centerBox = centerNode.getBoundingClientRect();
    const centerX = centerBox.left + centerBox.width / 2 - stageBox.left;
    const centerY = centerBox.top + centerBox.height / 2 - stageBox.top;
    svg.setAttribute("viewBox", `0 0 ${stageBox.width} ${stageBox.height}`);

    nodes.filter((node) => node !== centerNode).forEach((node) => {
      const nodeBox = node.getBoundingClientRect();
      const x = nodeBox.left + nodeBox.width / 2 - stageBox.left;
      const y = nodeBox.top + nodeBox.height / 2 - stageBox.top;
      const controlX = centerX + (x - centerX) * .48;
      const controlY = centerY + (y - centerY) * .2;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${x} ${y}`);
      path.setAttribute("vector-effect", "non-scaling-stroke");
      svg.append(path);
    });
  };

  requestAnimationFrame(drawCareerLines);
  if ("ResizeObserver" in window) {
    new ResizeObserver(drawCareerLines).observe(stage);
  } else {
    addEventListener("resize", drawCareerLines);
  }
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
