## Part A: Review and Improve Portfolio
# Get a code review
- Suggested nav links for my header section-Home,About,Contact,Projects,Skills
- Suggested changes in my footer section(remove hardcoded year in span tag)
- Improvised by removing spaces and adding defensive check in scripts.js

# Note improvements & Implement the changes
I have added nav bar to my protfolio,updated footer section along with scripts file.

# ASCII diagram of my portfolio project
using‑ai‑in‑development/          ← project root folder
├── index.html                   ← main entry point
│
│   <!-- high‑level sections inside index.html -->
│   <head>…</head>
│   <body>
│      ├─ <a class="skip-link">…</a>
│      ├─ <header>               ← site title + <nav>
│      │     └─ <nav>…</nav>
│      ├─ <main id="main-content">
│      │     ├─ <section id="introduction">        ← profile pic + about me
│      │     ├─ <section id="my-skills">…</section>
│      │     ├─ <section id="projects">…</section>
│      │     ├─ <section id="contact-details">…</section>
│      │     └─ <section class="change-color">…</section>
│      └─ <footer>…<span id="year"></span>…</footer>
│
├── style.css                    ← all the styling rules
│
└── script.js                    ← DOM‑manipulation / random color + year

# Reflect on learnings
- I didnt knew that ASCII diagram is nothing but our folder structure.
- sometimes we focus on more technicality but ignore small things like empty spaces(it doesnt cause issue but still not good for readability)
- learnt about accessibility 



    