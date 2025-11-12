(function(){
  // ===== CSS 로드 확인 배너 =====
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
    name: "공용 포트폴리오",
    role: "웹 프론트엔드 · UIUX 디자이너",
    bio: "다양한 웹 프로젝트를 기획·디자인·개발까지 직접 진행하며 완성도를 높여가고 있습니다.",
    phone: "010-0000-0000",
    badges: ["HTML", "CSS", "JavaScript", "Firebase", "Figma"],
    links: {
      github: "https://github.com/yourname",
      linkedin: "https://linkedin.com/in/yourname",
      resume: "assets/Resume.pdf",
      mainppt: "https://docs.google.com/presentation/your-ppt-link"
    }
  };

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
      tags:["Game","JavaScript"],
      desc:"퍼즐, 퀴즈, 반응속도 등 다양한 미니게임을 웹에서 즐길 수 있는 허브 사이트.",
      cover:"assets/cover_minifun.jpg",
      url:"https://minifun-hub.vercel.app/",
      repo:"https://github.com/yourname/minifun-hub"
    },
    {
      id:"p6",
      title:"⚾ 야구 기록 사이트 (SportVerse)",
      type:"web",
      tags:["Baseball","Firebase","Vercel"],
      desc:"팀별 경기 기록, 선수 통계, 청백전 관리가 가능한 실시간 야구 웹 서비스.",
      cover:"assets/cover_baseball_record.jpg",
      url:"https://cook-shar.vercel.app/",
      repo:"https://github.com/yourname/baseball-record"
    }
  ];

  // ===== FILTERS =====
  const FILTERS = [
    { key:"all", label:"전체" },
    { key:"web", label:"웹" },
    { key:"ui",  label:"UI" },
    { key:"ux",  label:"UX" },
    { key:"ppt", label:"PPT" },
    { key:"doc", label:"문서" }
  ];

  // ===== 유틸 =====
  const $ = (sel,root=document)=>root.querySelector(sel);

  // ===== 프로필 데이터 바인딩 =====
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

  // ===== 필터 버튼 생성 =====
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

  // ===== 프로젝트 렌더링 =====
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

  // ===== 첫 임베드 자동 설정 =====
  const firstFigma = (PROJECTS.find(p=>p.figmaEmbed)||{}).figmaEmbed || "";
  const firstSlides = (PROJECTS.find(p=>p.pptUrl)||{}).pptUrl || "";
  const firstPdf = (PROJECTS.find(p=>p.docUrl)||{}).docUrl || "assets/StudyNotes.pdf";
  if(firstFigma) document.querySelector("#figmaEmbed").src = firstFigma;
  if(firstSlides) document.querySelector("#slidesEmbed").src = firstSlides;
  if(firstPdf) document.querySelector("#pdfEmbed").src = firstPdf;

  // ===== 실행 =====
  drawFilters();
  renderProjects(PROJECTS);
})();
