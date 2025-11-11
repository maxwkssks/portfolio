(function(){
  // CSS 로드 확인 배너
  function ensureCssLoaded(){
    const v = getComputedStyle(document.documentElement).getPropertyValue('--text');
    if(!v){
      const bar = document.createElement('div');
      bar.style.cssText = 'position:fixed;left:0;right:0;top:0;z-index:9999;background:#ff3b30;color:#000;padding:10px 12px;font-weight:700;text-align:center';
      bar.textContent = '⚠️ styles.css가 로드되지 않았습니다. 경로를 확인하세요: assets/css/styles.css';
      document.body.appendChild(bar);
    }
  }
  document.addEventListener('DOMContentLoaded', ensureCssLoaded);

  // ===== PROFILE =====
  const PROFILE = {
    name: "윤희수 (Youn hee soo)",
    role: "Game Dev & Full-stack Student",
    bio: "Unity·웹·IoT 프로젝트를 만드는 개발자/크리에이터. 실험을 즐기며, 사용자 경험과 퍼포먼스를 함께 챙깁니다.",
    phone: "010-8339-9585",
    badges: ["Unity","Web","IoT"],
    links: {
      github: "https://github.com/maxwkssks",
      linkedin: "https://www.linkedin.com",
      resume: "assets/Resume.pdf",
      mainppt: "https://www.canva.com/design/DAG3sREn_Ok/ct9-J-V8xhXe5tddPFdknQ/view?utm_content=DAG3sREn_Ok&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc72d08d293"
    }
  };

  // ===== SKILLS =====
  const SKILLS = [
    { name: "C", level: 3 }, { name: "C++", level: 2 }, { name: "Java", level: 2 },
    { name: "Python", level: 5 }, { name: "JavaScript", level: 4 }, { name: "TypeScript", level: 3 },
    { name: "HTML/CSS", level: 4 }, { name: "React / Node.js", level: 3 },
    { name: "Firebase", level: 3 }, { name: "Unity (C#)", level: 4 },
    { name: "Arduino / IoT", level: 3 }, { name: "Figma", level: 4 }, { name: "PPT / Keynote", level: 4 }
  ];

  // ===== PROJECTS =====
  const PROJECTS = [
  {
    id:"p1",
    title:"CookShare — 레시피 웹 (Firebase + Vercel)",
    type:"web",
    tags:["HTML","CSS","JS","Firebase"],
    desc:"레시피 카드, 즐겨찾기, 태그 필터를 갖춘 반응형 요리 웹.",
    cover:"assets/creamy_shrimp_pasta.jpg",
    url:"https://cookshar2.vercel.app/",
    repo:"https://github.com/yourname/cookshare-web"
  },
  {
    id:"p2",
    title:"🎮 MiniFun — 미니게임 허브 사이트",
    type:"web",
    tags:["Game","JavaScript","Firebase"],
    desc:"퍼즐, 퀴즈, 반응속도 등 다양한 미니게임을 웹에서 즐길 수 있는 허브 사이트.",
    cover:"assets/cover_minifun.jpg",
    url:"https://minifun-hub.vercel.app/",
    repo:"https://github.com/yourname/minifun-hub"
  },
  {
    id:"p3",
    title:"UX — 야구 리그 온보딩 흐름",
    type:"ux",
    tags:["User Flow","A/B","Sports"],
    desc:"리그 가입→팀 선택→일정 구독까지의 UX 개선 케이스.",
    cover:"assets/cover_baseball_ppt.jpg",
    pptUrl:"https://www.miricanvas.com/v/1561dtk"
  },
  {
  id: "p4",
  title: "Unity — 싱글 플레이 레이싱 게임",
  type: "web",
  tags: ["Unity", "C#", "Racing"],
  desc: "드리프트, 랩 타이머, 고스트 리플레이를 갖춘 싱글 플레이 레이싱 프로젝트.",
  cover: "assets/cover_RACING GAME.jpg",
  url: "https://youtu.be/QGU8zy8iPy8?si=hY1VIMG849l_adah",   // 데모 영상 링크로 교체
  },
  
  { 
    id:"p5",
    title:"문서 — 기술 스택 & 학습 노트(PDF)",
    type:"doc",
    tags:["Docs","Study"],
    desc:"최근 학습 내용과 레퍼런스를 정리한 PDF 문서.",
    cover:"assets/cover_notes_pdf.jpg",
    docUrl:"assets/StudyNotes.pdf"
  },
  {
    id:"p6",
    title:"⚾ 야구 기록 사이트 (SportVerse)",
    type:"web",
    tags:["Baseball","Firebase","Vercel"],
    desc:"팀별 경기 기록, 선수 통계, 청백전 관리가 가능한 실시간 야구 웹 서비스.",
    cover:"assets/cover_baseball_record.jpg",
    url:"https://cook-shar.vercel.app/",
    
  }
];


  const FILTERS = [
    { key:"all", label:"전체" },
    { key:"web", label:"웹" },
    { key:"ui",  label:"UI" },
    { key:"ux",  label:"UX" },
    { key:"ppt", label:"PPT" },
    { key:"doc", label:"문서" }
  ];

  const $ = (sel,root=document)=>root.querySelector(sel);

  // 프로필 데이터 바인딩
  $("#profileName").textContent = PROFILE.name;
  $("#profileRole").textContent = PROFILE.role;
  $("#profileBio").textContent = PROFILE.bio;
  $("#profilePhone").textContent = PROFILE.phone;

  $("#githubLink").href = PROFILE.links.github;
  $("#linkedinLink").href = PROFILE.links.linkedin;
  $("#footerGithub").href = PROFILE.links.github;
  $("#footerLinkedin").href = PROFILE.links.linkedin;
  $("#resumeBtn").href = PROFILE.links.resume;

  const pptEl = $("#profilePPT");
  if (pptEl && PROFILE.links.mainppt) pptEl.href = PROFILE.links.mainppt;

  document.querySelector("#copyright").textContent =
    `© ${new Date().getFullYear()} ${PROFILE.name}. All rights reserved.`;

  const badgesWrap = $("#profileBadges");
  PROFILE.badges.forEach(b=>{
    const span=document.createElement("span");
    span.className="chip";
    span.textContent=b;
    badgesWrap.appendChild(span);
  });

  // 필터 버튼 생성
  const filterBtns = $("#filterBtns");
  let currentFilter = "all";
  function drawFilters(){
    filterBtns.innerHTML="";
    FILTERS.forEach(f=>{
      const a=document.createElement("a");
      a.href="#";
      a.className = `btn ${currentFilter===f.key?"is-active":""}`;
      a.textContent = f.label;
      a.addEventListener("click",(e)=>{
        e.preventDefault();
        currentFilter=f.key;
        renderProjects();
        drawFilters();
      });
      filterBtns.appendChild(a);
    });
  }

  // 프로젝트 렌더링
  const projectGrid = $("#projectGrid");
  const searchInput = $("#searchInput");
  function matchQuery(p, q){
    if(!q) return true;
    const hay = [p.title, p.desc, ...(p.tags||[])].join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function projectCard(p){
    const card = document.createElement("article");
    card.className = "card project";
    card.innerHTML = `
      <div class="thumb">
        ${p.cover?`<img src="${p.cover}" alt="${p.title}" loading="lazy" style="object-fit:cover;object-position:center;">`:''}
        <span class="type">${p.type.toUpperCase()}</span>
      </div>
      <div class="body">
        <div class="title">${p.title}</div>
        <p class="desc">${p.desc}</p>
        <div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}</div>
        <div class="actions">
          ${p.url?`<a href="${p.url}" target="_blank" rel="noreferrer">열기</a>`:""}
          ${p.figmaEmbed?`<a href="${p.figmaEmbed}" target="_blank" rel="noreferrer">Figma</a>`:""}
          ${p.pptUrl?`<a href="${p.pptUrl}" target="_blank" rel="noreferrer">PPT</a>`:""}
          ${p.docUrl?`<a href="${p.docUrl}" target="_blank" rel="noreferrer">문서</a>`:""}
        </div>
      </div>`;
    return card;
  }

  function renderProjects(){
    const q = searchInput.value.trim();
    const list = PROJECTS.filter(p=> (currentFilter==='all' || p.type===currentFilter) && matchQuery(p,q));
    projectGrid.innerHTML = "";
    list.forEach(p=> projectGrid.appendChild(projectCard(p)));
  }

  searchInput.addEventListener("input", renderProjects);

  // 첫 임베드 자동 설정
  const firstFigma = (PROJECTS.find(p=>p.figmaEmbed)||{}).figmaEmbed || "";
  const firstSlides = (PROJECTS.find(p=>p.pptUrl)||{}).pptUrl || "";
  const firstPdf = (PROJECTS.find(p=>p.docUrl)||{}).docUrl || "assets/StudyNotes.pdf";
  if(firstFigma) document.querySelector("#figmaEmbed").src = firstFigma;
  if(firstSlides) document.querySelector("#slidesEmbed").src = firstSlides;
  if(firstPdf) document.querySelector("#pdfEmbed").src = firstPdf;

  drawFilters();
  renderProjects();
})();
