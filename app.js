/* ==========================================================================
   WEDDING INVITATION — PARTHIBAN & KAVYA
   INTERACTIVE JAVASCRIPT ENGINE & EVENT HANDLERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const envelopeScreen = document.getElementById('envelope-screen');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const envFlap = document.getElementById('env-flap');
  const envLetter = document.getElementById('env-letter');
  const mainContent = document.getElementById('main-content');
  const weddingAudio = document.getElementById('wedding-audio');
  const AUDIO_VOLUME = 0.3;
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioLabel = document.getElementById('audio-label');
  const likeBtn = document.getElementById('like-btn');
  const likeCountEl = document.getElementById('like-count');
  const reelLikesPreview = document.getElementById('reel-likes-preview');
  const heartIcon = document.getElementById('heart-icon');

  let isAudioPlaying = false;
  let envelopeOpened = false;

  function setInviteVolume() {
    if (!weddingAudio) return;
    weddingAudio.volume = AUDIO_VOLUME;
  }

  if (weddingAudio) {
    setInviteVolume();
    weddingAudio.addEventListener('playing', setInviteVolume);
    weddingAudio.addEventListener('loadeddata', setInviteVolume);
  }

  // --------------------------------------------------------------------------
  // 1. BACKGROUND FLOATING PARTICLES (GOLD DUST & PETALS)
  // --------------------------------------------------------------------------
  initBackgroundParticles();

  function initBackgroundParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 26;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: Math.sin(Math.random() * Math.PI) * 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        isPetal: Math.random() > 0.6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.isPetal) {
          // Soft golden/rose petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.2, p.radius * 1.2, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230, 180, 90, ${p.opacity * 0.7})`;
          ctx.fill();
        } else {
          // Shimmering gold speck
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 230, 150, ${p.opacity})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ffd700';
          ctx.fill();
        }
        ctx.restore();
      });

      requestAnimationFrame(render);
    }
    render();
  }

  // --------------------------------------------------------------------------
  // 2. ENVELOPE OPENING & AUDIO PLAYBACK (Wax Seal Trigger)
  // --------------------------------------------------------------------------
  waxSealBtn.addEventListener('click', openEnvelope);
  waxSealBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    // Trigger golden sparkles from wax seal
    if (typeof confetti === 'function') {
      const rect = waxSealBtn.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 45,
        spread: 70,
        startVelocity: 25,
        colors: ['#ffd700', '#f5d061', '#ffec99', '#ffffff'],
        origin: { x: originX, y: originY }
      });
    }

    // Play Background Music, then force lower volume after open
    playAudio();
    setInviteVolume();
    setTimeout(setInviteVolume, 150);
    setTimeout(setInviteVolume, 600);
    setTimeout(setInviteVolume, 1400);

    // Wax seal breaking animation
    waxSealBtn.classList.add('breaking');

    // 3D Flap opens
    setTimeout(() => {
      envFlap.classList.add('open');
    }, 200);

    // Letter slides up
    setTimeout(() => {
      envLetter.classList.add('slide-up');
    }, 600);

    // Transition to Main Content
    setTimeout(() => {
      mainContent.classList.remove('hidden');
      envelopeScreen.classList.add('opened');
      setInviteVolume();
      
      // Secondary celebration confetti
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 90,
          origin: { y: 0.3 }
        });
      }

      // Initialize scratch card once visible
      setTimeout(initScratchCard, 300);
    }, 1400);
  }

  // --------------------------------------------------------------------------
  // 3. AUDIO CONTROLLER & EQUALIZER
  // --------------------------------------------------------------------------
  function playAudio() {
    if (!weddingAudio) return;
    setInviteVolume();
    weddingAudio.play().then(() => {
      setInviteVolume();
      isAudioPlaying = true;
      audioToggleBtn.classList.add('playing');
      audioLabel.textContent = 'Music On';
    }).catch(err => {
      console.log('Audio autoplay prevented:', err);
      isAudioPlaying = false;
      audioToggleBtn.classList.remove('playing');
      audioLabel.textContent = 'Play Music';
    });
  }

  audioToggleBtn.addEventListener('click', () => {
    if (!weddingAudio) return;
    if (isAudioPlaying) {
      weddingAudio.pause();
      isAudioPlaying = false;
      audioToggleBtn.classList.remove('playing');
      audioLabel.textContent = 'Play';
      showToast('Music paused');
    } else {
      setInviteVolume();
      weddingAudio.play().then(() => {
        setInviteVolume();
        isAudioPlaying = true;
        audioToggleBtn.classList.add('playing');
        audioLabel.textContent = 'Music On';
        showToast('Music playing 🎵');
      }).catch(err => {
        console.error(err);
      });
    }
  });

  // --------------------------------------------------------------------------
  // 4. INSTAGRAM-STYLE LIKE BUTTON WITH HEARTS BURST
  // --------------------------------------------------------------------------
  let likeCount = parseInt(localStorage.getItem('pk_wedding_likes') || '1842', 10);
  likeCountEl.textContent = likeCount.toLocaleString();
  reelLikesPreview.textContent = `${(likeCount / 1000).toFixed(1)}k`;

  likeBtn.addEventListener('click', (e) => {
    likeCount++;
    localStorage.setItem('pk_wedding_likes', likeCount);
    likeCountEl.textContent = likeCount.toLocaleString();
    reelLikesPreview.textContent = `${(likeCount / 1000).toFixed(1)}k`;

    // Heart icon animation
    heartIcon.classList.remove('liked');
    void heartIcon.offsetWidth; // trigger reflow
    heartIcon.classList.add('liked');

    // Create floating heart particle
    createFloatingHearts(e.clientX, e.clientY);
  });

  function createFloatingHearts(originX, originY) {
    const count = 5;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = ['❤️', '💖', '✨', '💍', '🥰'][Math.floor(Math.random() * 5)];
      heart.style.left = `${(originX || window.innerWidth - 60) + (Math.random() * 40 - 20)}px`;
      heart.style.top = `${(originY || 40) + (Math.random() * 20 - 10)}px`;
      heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 80}px`);
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1500);
    }
  }

  // --------------------------------------------------------------------------
  // 5. INTERACTIVE CANVAS "SCRATCH TO REVEAL" CARD
  // --------------------------------------------------------------------------
  let scratchCardInitialized = false;

  function initScratchCard() {
    if (scratchCardInitialized) return;
    scratchCardInitialized = true;

    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width = 300;
    const height = canvas.height = 240;

    // Create luxury gold glitter background on canvas
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e5bb52');
    gradient.addColorStop(0.3, '#fff4b8');
    gradient.addColorStop(0.6, '#caa03d');
    gradient.addColorStop(1, '#8f681a');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add gold speckles texture
    for (let i = 0; i < 450; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(100, 70, 10, 0.25)';
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Heart illustration in center of scratch surface
    ctx.save();
    ctx.strokeStyle = 'rgba(75, 15, 25, 0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const hx = width / 2;
    const hy = height / 2 - 10;
    ctx.moveTo(hx, hy + 35);
    ctx.bezierCurveTo(hx - 50, hy - 5, hx - 45, hy - 50, hx, hy - 25);
    ctx.bezierCurveTo(hx + 45, hy - 50, hx + 50, hy - 5, hx, hy + 35);
    ctx.fillStyle = 'rgba(92, 15, 28, 0.35)';
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Instructional Text on Scratch Foil
    ctx.fillStyle = '#3f0c15';
    ctx.font = 'bold 17px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch to Reveal ✨', width / 2, height / 2 + 65);
    ctx.font = '12px "Outfit", sans-serif';
    ctx.fillStyle = '#5c1622';
    ctx.fillText('Swipe with finger or mouse', width / 2, height / 2 + 85);

    // Scratching logic
    let isScratching = false;
    let scratchedPixels = 0;
    let hasExplodedConfetti = false;

    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    }

    function scratch(e) {
      if (!isScratching) return;
      const { x, y } = getCoords(e);
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      // Periodically check scratched area
      scratchedPixels++;
      if (scratchedPixels % 8 === 0 && !hasExplodedConfetti) {
        checkScratchPercentage();
      }
    }

    function checkScratchPercentage() {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let transparentCount = 0;
      const totalPixels = data.length / 4;

      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) transparentCount++;
      }

      const ratio = transparentCount / (totalPixels / 4);
      if (ratio > 0.35 && !hasExplodedConfetti) {
        hasExplodedConfetti = true;
        // Fade out remainder of canvas
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.style.display = 'none';
        }, 600);

        // Celebratory confetti explosion!
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 80,
            spread: 85,
            origin: { y: 0.55 },
            colors: ['#ffd700', '#ff6b81', '#ffffff', '#e6c260']
          });
        }
        showToast('Our Forever Begins! 💖');
      }
    }

    // Event listeners
    canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    window.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => { isScratching = false; });

    canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, { passive: false });
    window.addEventListener('touchmove', (e) => { if (isScratching) { e.preventDefault(); scratch(e); } }, { passive: false });
    window.addEventListener('touchend', () => { isScratching = false; });
  }

  // --------------------------------------------------------------------------
  // 6. LIVE COUNTDOWN TIMER (Target: Nov 15, 2026 07:00:00 AM IST)
  // --------------------------------------------------------------------------
  const daysVal = document.getElementById('days-val');
  const hoursVal = document.getElementById('hours-val');
  const minutesVal = document.getElementById('minutes-val');
  const secondsVal = document.getElementById('seconds-val');

  const weddingTimestamp = new Date('2026-11-15T07:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingTimestamp - now;

    if (diff <= 0) {
      daysVal.textContent = '00';
      hoursVal.textContent = '00';
      minutesVal.textContent = '00';
      secondsVal.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysVal.textContent = String(days).padStart(2, '0');
    hoursVal.textContent = String(hours).padStart(2, '0');
    minutesVal.textContent = String(minutes).padStart(2, '0');
    secondsVal.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);



  // --------------------------------------------------------------------------
  // 9. ORIGINAL PRINTED CARD MODAL
  // --------------------------------------------------------------------------
  const viewOriginalBtn = document.getElementById('view-original-card-btn');
  const cardModal = document.getElementById('card-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (viewOriginalBtn && cardModal && closeModalBtn) {
    viewOriginalBtn.addEventListener('click', () => {
      cardModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
      cardModal.classList.add('hidden');
    });

    cardModal.addEventListener('click', (e) => {
      if (e.target === cardModal) {
        cardModal.classList.add('hidden');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. SOCIAL SHARE BUTTONS
  // --------------------------------------------------------------------------
  const shareInviteBtn = document.getElementById('share-invite-btn');
  const barShareBtn = document.getElementById('bar-share');

  function shareInvitation() {
    const shareData = {
      title: 'Parthiban & Kavya — Wedding Invitation',
      text: 'You are cordially invited to grace the wedding celebration of Parthiban & Kavya on November 14 & 15, 2026 at Sri Padmavathi Mahal, Chennai. ✨',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(err => console.log('Share dismissed', err));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Invitation link copied to clipboard! 🔗');
      });
    }
  }

  if (shareInviteBtn) shareInviteBtn.addEventListener('click', shareInvitation);
  if (barShareBtn) barShareBtn.addEventListener('click', shareInvitation);

  // --------------------------------------------------------------------------
  // 11. FLOATING BOTTOM BAR ACTIVE HIGHLIGHT ON SCROLL
  // --------------------------------------------------------------------------
  const sections = [
    { id: 'hero-section', linkId: 'bar-home' },
    { id: 'timeline-section', linkId: 'bar-timeline' },
    { id: 'venue-section', linkId: 'bar-venue' }
  ];

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(({ id, linkId }) => {
      const section = document.getElementById(id);
      const link = document.getElementById(linkId);
      if (section && link) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.bottom-action-bar .bar-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 13. TOAST NOTIFICATION HELPER
  // --------------------------------------------------------------------------
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[m];
    });
  }
});
