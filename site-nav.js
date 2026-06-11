(function () {
  var site = {
    home: "home_page.html",
    chapters: [
      {
        id: "light",
        title: "Light: Reflection and Refraction",
        meta: "Chapters 10 and 11",
        file: "light_reflection_refraction.html",
        topics: [
          ["fundamentals", "Textbook Fundamentals"],
          ["sign-convention", "Sign Convention Playground"],
          ["ray-tracker", "Interactive Ray Tracker"],
          ["snell", "Snell's Law Refraction Lab"],
          ["glass-slab", "Glass Slab Lateral Shifter"],
          ["lens-power", "Lens Power Combiner"],
          ["reference", "Complete Reference Sheet"]
        ]
      },
      {
        id: "eye",
        title: "The Human Eye and the Colorful World",
        meta: "Chapter 11",
        file: "human_eye_interactive.html",
        topics: [
          ["anatomy", "The Optical Camera of the Body"],
          ["accommodation", "Power of Accommodation"],
          ["defects", "Vision Defects"],
          ["prism", "Dispersion of Light"],
          ["atmosphere", "Atmospheric Phenomena"],
          ["formulas", "Complete Formula Ledger"],
          ["quiz", "Knowledge Check"]
        ]
      },
      {
        id: "electricity",
        title: "Electricity",
        meta: "Chapter 12",
        file: "electricity_interactive.html",
        topics: [
          ["current", "Electric Current and Potential"],
          ["ohm", "Ohm's Law"],
          ["circuits", "Resistance Combinations"],
          ["heating", "Heating Effect of Current"],
          ["formulas", "Complete Formula Ledger"]
        ]
      },
      {
        id: "magnetic",
        title: "Magnetic Effects of Electric Current",
        meta: "Chapter 13",
        file: "magnetic_effects_chapter13.html",
        topics: [
          ["s1", "Magnetic Fields and Field Lines"],
          ["s2", "Conductor Geometries"],
          ["s3", "Solenoid Simulator"],
          ["s4", "Force on Conductor"],
          ["s5", "Electric Motor"],
          ["s6", "Electromagnetic Induction"],
          ["s7", "Domestic Electric Circuits"]
        ]
      },
      {
        id: "energy",
        title: "Sources of Energy",
        meta: "Chapter 14",
        file: "sources_of_energy_ch14.html",
        topics: [
          ["ideal", "Ideal Energy Source"],
          ["conventional", "Conventional Energy Sources"],
          ["nonconv", "Non-Conventional Energy Sources"],
          ["compare", "Comprehensive Comparison"],
          ["quiz", "Knowledge Check"]
        ]
      },
      {
        id: "environment",
        title: "Our Environment",
        meta: "Chapter 15",
        file: "our_environment_interactive.html",
        topics: [
          ["ecosystem", "What is an Ecosystem?"],
          ["energy", "Lindeman's 10% Rule"],
          ["biomag", "Biological Magnification"],
          ["ozone", "Ozone Layer Depletion"],
          ["waste", "Solid Waste Management"],
          ["quiz", "Test Your Knowledge"]
        ]
      },
      {
        id: "sustainability",
        title: "Sustainable Management of Natural Resources",
        meta: "Chapter 16",
        file: "sustainability_enhanced.html",
        topics: [
          ["theory", "Core Concepts"],
          ["five-r", "The 5 R's Framework"],
          ["forests", "Forest Conservation"],
          ["water", "Water: Dams vs Harvesting"],
          ["fossil", "Fossil Fuel Simulator"],
          ["environment", "Ecosystem Dynamics"],
          ["waste", "Waste Classification Game"],
          ["quiz", "NCERT Quiz"]
        ]
      }
    ]
  };

  window.CodexSiteData = site;

  function baseName(path) {
    return (path.split("/").pop() || site.home).split("#")[0] || site.home;
  }

  function setMissingIds() {
    var slugMap = {
      "Textbook Fundamentals": "fundamentals",
      "Sign Convention Playground": "sign-convention",
      "Interactive Ray Tracker": "ray-tracker",
      "Snell's Law Refraction Lab": "snell",
      "Glass Slab Lateral Shifter": "glass-slab",
      "Lens Power Combiner": "lens-power",
      "Complete Reference Sheet": "reference",
      "Complete Formula Ledger": "formulas"
    };

    document.querySelectorAll("section").forEach(function (section) {
      if (section.id) return;
      var heading = section.querySelector("h2, .section-title");
      if (!heading) return;
      var text = heading.textContent.replace(/\s+/g, " ").trim();
      if (slugMap[text]) section.id = slugMap[text];
    });

    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) setTimeout(function () { target.scrollIntoView({ block: "start" }); }, 60);
    }
  }

  function makeLink(href, className, text) {
    var a = document.createElement("a");
    a.href = href;
    a.className = className;
    a.textContent = text;
    return a;
  }

  function buildNav() {
    if (document.querySelector(".codex-content-panel")) return;

    var currentFile = baseName(location.pathname);
    if (currentFile === "" || currentFile === "index.html") document.body.classList.add("codex-page-home");
    if (currentFile === site.home) document.body.classList.add("codex-page-home");

    var toggle = document.createElement("button");
    toggle.className = "codex-content-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open all content");
    toggle.setAttribute("title", "All content");
    toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16M4 12h16M4 17.5h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

    var backdrop = document.createElement("div");
    backdrop.className = "codex-content-backdrop";

    var panel = document.createElement("aside");
    panel.className = "codex-content-panel";
    panel.setAttribute("aria-label", "All class content");
    panel.innerHTML = '<div class="codex-content-head"><div><span class="codex-content-kicker">Class 10 modules</span><h2 class="codex-content-title">All Content</h2></div><button class="codex-content-close" type="button" aria-label="Close all content">X</button></div><div class="codex-content-list"></div>';

    var list = panel.querySelector(".codex-content-list");
    list.appendChild(makeLink(site.home, "codex-content-home", "Home"));
    list.appendChild(makeLink("virtual_lab.html", "codex-content-home", "Virtual Lab 🧪"));

    site.chapters.forEach(function (chapter) {
      var block = document.createElement("div");
      block.className = "codex-chapter-block";

      var chapterLink = document.createElement("a");
      chapterLink.href = chapter.file;
      chapterLink.className = "codex-chapter-link";
      if (currentFile === chapter.file) chapterLink.classList.add("is-current");
      chapterLink.innerHTML = '<span>' + chapter.title + '<span class="codex-chapter-meta">' + chapter.meta + '</span></span><span aria-hidden="true">></span>';
      block.appendChild(chapterLink);

      var topics = document.createElement("div");
      topics.className = "codex-subtopic-list";
      chapter.topics.forEach(function (topic) {
        var topicLink = makeLink(chapter.file + "#" + topic[0], "codex-subtopic-link", topic[1]);
        if (currentFile === chapter.file && location.hash === "#" + topic[0]) topicLink.classList.add("is-current");
        topics.appendChild(topicLink);
      });
      block.appendChild(topics);
      list.appendChild(block);
    });

    document.body.appendChild(toggle);
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    function openPanel() {
      toggle.setAttribute("aria-expanded", "true");
      backdrop.classList.add("is-open");
      panel.classList.add("is-open");
    }

    function closePanel() {
      toggle.setAttribute("aria-expanded", "false");
      backdrop.classList.remove("is-open");
      panel.classList.remove("is-open");
    }

    toggle.addEventListener("click", openPanel);
    backdrop.addEventListener("click", closePanel);
    panel.querySelector(".codex-content-close").addEventListener("click", closePanel);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closePanel();
    });
  }

  function enhanceHome() {
    var currentFile = baseName(location.pathname);
    if (currentFile !== site.home && currentFile !== "index.html" && currentFile !== "") return;

    var chapterByName = {
      "Light": "light_reflection_refraction.html",
      "Human Eye": "human_eye_interactive.html",
      "Electricity": "electricity_interactive.html",
      "Magnetic Effects": "magnetic_effects_chapter13.html",
      "Energy Sources": "sources_of_energy_ch14.html",
      "Our Environment": "our_environment_interactive.html",
      "Sustainability": "sustainability_enhanced.html"
    };

    document.querySelectorAll("h4").forEach(function (heading) {
      var title = heading.textContent.trim();
      var href = chapterByName[title];
      if (!href) return;
      var card = heading.closest(".group");
      if (!card || card.dataset.codexLinked) return;
      card.dataset.codexLinked = "true";
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.addEventListener("click", function () { location.href = href; });
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          location.href = href;
        }
      });
    });

    var startButton = Array.from(document.querySelectorAll("button")).find(function (button) {
      return button.textContent.trim().toUpperCase() === "START LEARNING";
    });
    if (startButton) startButton.addEventListener("click", function () {
      var grid = document.querySelector("h2");
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setMissingIds();
    buildNav();
    enhanceHome();
  });
})();
