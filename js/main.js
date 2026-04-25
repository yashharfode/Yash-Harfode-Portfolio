// ─── INITIALIZATION & DATA ───
    lucide.createIcons();

    const dataObj = {
      otherProjects: [
        { name: "Avloria", desc: "A discovery platform uncovering hidden tourist destinations in Madhya Pradesh.", tech: ["HTML5", "CSS3", "JS"], link: "https://github.com/yashharfode/Avloria" },
        { name: "Spotify-Clone", desc: "Responsive music streaming UI with integrated playlist management.", tech: ["React", "Tailwind"], link: "https://github.com/yashharfode" },
        { name: "X (Twitter) Clone", desc: "Microblogging frontend replicating Twitter's core features via REST APIs.", tech: ["React", "Axios"], link: "https://github.com/yashharfode" },
        { name: "TrackMyMedi", desc: "Healthcare application focused on tracking medical schedules.", tech: ["MERN Stack"], link: "https://github.com/yashharfode" },
        { name: "Worst-UI-Competition", desc: "A humorous take on bad UI/UX design patterns, built for a competition.", tech: ["HTML", "CSS", "JS"], link: "https://github.com/yashharfode" },
        { name: "iTask", desc: "A robust task management application with local storage persistence.", tech: ["React.js"], link: "https://github.com/yashharfode" },
        { name: "Browser-Extensions", desc: "A UI built to manage and monitor installed browser extensions easily.", tech: ["JS", "DOM"], link: "https://github.com/yashharfode" },
        { name: "Kampuz", desc: "College utility platform UI focused on campus engagement.", tech: ["HTML", "CSS"], link: "https://github.com/yashharfode" }
      ]
    };

    const renderGrid = (containerId, dataArray) => {
      const container = document.getElementById(containerId);
      dataArray.forEach(proj => {
        const card = document.createElement('a');
        card.href = proj.link;
        card.target = "_blank";
        card.className = 'project-card tilt-card interactive';
        card.innerHTML = `
          <div class="pc-header" style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <i data-lucide="folder-code" class="text-gold"></i>
            <div class="interactive" style="color: var(--text-muted); transition: 0.3s;"><i data-lucide="arrow-up-right" style="width: 20px;"></i></div>
          </div>
          <h4 style="font-size: 20px; font-family: var(--font-serif); margin-bottom: 12px; color: var(--text);">${proj.name}</h4>
          <p style="font-size: 14px; color: var(--text-muted); flex-grow: 1; margin-bottom: 24px; line-height: 1.6;">${proj.desc}</p>
          <div class="tech-stack" style="margin-bottom: 0;">
            ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        `;
        container.appendChild(card);
      });
    };
    renderGrid('otherProjects', dataObj.otherProjects);
    lucide.createIcons();

// ─── SMOOTH SCROLL (LENIS) ───
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);

    // ─── CUSTOM CURSOR & MAGNETIC EFFECT ───
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const interactiveEls = document.querySelectorAll('.interactive, a, button, input, textarea');
    const magneticEls = document.querySelectorAll('.magnetic');

    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`; cursorDot.style.top = `${e.clientY}px`;
        cursorRing.style.left = `${e.clientX}px`; cursorRing.style.top = `${e.clientY}px`;
      });

      interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
      });

      // Magnetic Buttons
      magneticEls.forEach(el => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        });
      });
    }

    // ─── 3D TILT EFFECT ───
    const tiltCards = document.querySelectorAll('.tilt-card');
    if (window.innerWidth > 768) {
      tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left; const y = e.clientY - rect.top;
          const centerX = rect.width / 2; const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5; 
          const rotateY = ((x - centerX) / centerX) * 5;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
      });
    }

    // ─── TEXT REVEAL & GSAP ANIMATIONS ───
    window.addEventListener('load', () => {
      const words = document.querySelectorAll('.reveal-word');
      gsap.to(words, { y: "0%", opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 });

      gsap.fromTo('.gs-fade', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.8 });

      gsap.utils.toArray('.gs-up').forEach(el => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });

      // Number Counter
      gsap.to('.counter', {
        innerHTML: 10, duration: 2, snap: { innerHTML: 1 }, ease: "power2.out",
        scrollTrigger: { trigger: '#metrics', start: "top 80%" },
        onUpdate: function() { document.querySelector('.counter').innerHTML = Math.round(this.targets()[0].innerHTML); }
      });

      const nav = document.getElementById('nav');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      });
    });

    // ─── EMAILJS FORM ───
    emailjs.init("YOUR_PUBLIC_KEY");
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const overlay = document.getElementById('form-overlay');
      const msg = document.getElementById('form-message');
      document.getElementById('form-spinner').style.display = 'block';
      overlay.classList.add('active'); msg.innerText = "Transmitting securely...";

      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
        .then(() => {
          document.getElementById('form-spinner').style.display = 'none';
          msg.innerText = "Message transmitted successfully!"; this.reset();
          setTimeout(() => overlay.classList.remove('active'), 3000);
        }, (err) => {
          document.getElementById('form-spinner').style.display = 'none';
          msg.innerText = "Error transmitting message."; msg.style.color = "#EF4444";
          setTimeout(() => { overlay.classList.remove('active'); msg.style.color = "var(--gold)"; }, 3000);
        });
    });

    // ─── THREE.JS CYBER NETWORK BACKGROUND ───
    const init3D = () => {
      const container = document.getElementById('canvas-container');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const coreGroup = new THREE.Group();
      
      const geo1 = new THREE.IcosahedronGeometry(2.5, 1);
      const mat1 = new THREE.MeshBasicMaterial({ color: 0xC9A96E, wireframe: true, transparent: true, opacity: 0.08 });
      const mesh1 = new THREE.Mesh(geo1, mat1);
      
      const geo2 = new THREE.IcosahedronGeometry(2.0, 1);
      const mat2 = new THREE.MeshBasicMaterial({ color: 0x3B82F6, wireframe: true, transparent: true, opacity: 0.04 });
      const mesh2 = new THREE.Mesh(geo2, mat2);

      coreGroup.add(mesh1); coreGroup.add(mesh2);
      coreGroup.position.x = 2;
      scene.add(coreGroup);

      const particlesGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(800 * 3);
      for(let i=0; i < 2400; i++) posArray[i] = (Math.random() - 0.5) * 15;
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMat = new THREE.PointsMaterial({ size: 0.015, color: 0xC9A96E, transparent: true, opacity: 0.3 }); 
      const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particlesMesh);

      let mouseX = 0; let mouseY = 0;
      document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
      });

      const animate = () => {
        requestAnimationFrame(animate);
        
        coreGroup.rotation.y += 0.001; coreGroup.rotation.x += 0.0005;
        mesh1.rotation.y += 0.001; mesh2.rotation.z -= 0.001;
        particlesMesh.rotation.y -= 0.0003;
        
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
        
        renderer.render(scene, camera);
      };
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    };
    init3D();
