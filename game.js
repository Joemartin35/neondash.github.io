(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best');
  const modeLabelEl = document.getElementById('modeLabel');
  const levelProgressWrap = document.getElementById('levelProgressWrap');
  const levelNameEl = document.getElementById('levelName');
  const levelTimerEl = document.getElementById('levelTimer');
  const progressBarFill = document.getElementById('progressBarFill');
  const practiceTagEl = document.getElementById('practiceTag');
  const checkpointBtnEl = document.getElementById('checkpointBtn');

  const menuScreen = document.getElementById('menuScreen');
  const gameOverScreen = document.getElementById('gameOverScreen');
  const levelCompleteScreen = document.getElementById('levelCompleteScreen');
  const menuBestEl = document.getElementById('menuBest');
  const menuHardcoreBestEl = document.getElementById('menuHardcoreBest');
  const menuShipBestEl = document.getElementById('menuShipBest');
  const levelGridEl = document.getElementById('levelGrid');
  const endlessBtn = document.getElementById('endlessBtn');
  const hardcoreBtn = document.getElementById('hardcoreBtn');
  const shipBtn = document.getElementById('shipBtn');
  const retryBtn = document.getElementById('retryBtn');
  const gameOverMenuBtn = document.getElementById('gameOverMenuBtn');
  const gameOverStat1 = document.getElementById('gameOverStat1');
  const gameOverStat2 = document.getElementById('gameOverStat2');
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const completeMenuBtn = document.getElementById('completeMenuBtn');
  const completeLevelName = document.getElementById('completeLevelName');
  const completeTime = document.getElementById('completeTime');
  const completeBestTime = document.getElementById('completeBestTime');
  const muteBtn = document.getElementById('muteBtn');

  const dailyChestBtn = document.getElementById('dailyChestBtn');
  const chestStatusEl = document.getElementById('chestStatus');
  const chestRevealScreen = document.getElementById('chestRevealScreen');
  const chestRevealSwatch = document.getElementById('chestRevealSwatch');
  const chestRevealName = document.getElementById('chestRevealName');
  const chestRevealSub = document.getElementById('chestRevealSub');
  const chestRevealBtn = document.getElementById('chestRevealBtn');
  const collectionBtn = document.getElementById('collectionBtn');
  const collectionCountEl = document.getElementById('collectionCount');
  const collectionScreen = document.getElementById('collectionScreen');
  const collectionProgress = document.getElementById('collectionProgress');
  const collectionGridEl = document.getElementById('collectionGrid');
  const rarityLegendEl = document.getElementById('rarityLegend');
  const collectionBackBtn = document.getElementById('collectionBackBtn');

  const createLevelBtn = document.getElementById('createLevelBtn');
  const customLevelListEl = document.getElementById('customLevelList');
  const editorPanel = document.getElementById('editorPanel');
  const editorNameInput = document.getElementById('editorName');
  const editorLengthInput = document.getElementById('editorLength');
  const editorSpeedInput = document.getElementById('editorSpeed');
  const editorSideToggleBtn = document.getElementById('editorSideToggle');
  const editorScrollLeftBtn = document.getElementById('editorScrollLeft');
  const editorScrollRightBtn = document.getElementById('editorScrollRight');
  const editorClearBtn = document.getElementById('editorClearBtn');
  const editorTestBtn = document.getElementById('editorTestBtn');
  const editorSaveBtn = document.getElementById('editorSaveBtn');
  const editorBackBtn = document.getElementById('editorBackBtn');

  const COMPLETED_KEY = 'neonDashCompletedLevels';
  const BEST_TIMES_KEY = 'neonDashBestTimes';
  const CUSTOM_LEVELS_KEY = 'neonDashCustomLevels';
  const BEST_KEYS = { endless: 'neonDashBest', hardcore: 'neonDashHardcoreBest', ship: 'neonDashShipBest' };
  const UNLOCKED_SKINS_KEY = 'neonDashUnlockedSkins';
  const EQUIPPED_SKIN_KEY = 'neonDashEquippedSkin';
  const LAST_CHEST_KEY = 'neonDashLastChest';

  const RARITY_INFO = {
    common: { label: 'COMMON', color: '#9fb3c8', weight: 60 },
    rare: { label: 'RARE', color: '#4ff2ff', weight: 27 },
    epic: { label: 'EPIC', color: '#c48bff', weight: 10 },
    legendary: { label: 'LEGENDARY', color: '#ffe14f', weight: 3 }
  };

  const SIGNATURE_SKINS = [
    { id: 'default', name: 'NEON', c1: '#4ff2ff', c2: '#ff3df0', rarity: 'common' },
    { id: 'solar', name: 'SOLAR FLARE', c1: '#fff35c', c2: '#ff7a1a', rarity: 'common' },
    { id: 'toxic', name: 'TOXIC', c1: '#baff3d', c2: '#00c46a', rarity: 'common' },
    { id: 'royal', name: 'ROYAL', c1: '#9d6bff', c2: '#3d5bff', rarity: 'rare' },
    { id: 'crimson', name: 'CRIMSON', c1: '#ff6b6b', c2: '#8a0026', rarity: 'rare' },
    { id: 'glacier', name: 'GLACIER', c1: '#c8faff', c2: '#3d8bff', rarity: 'rare' },
    { id: 'gilded', name: 'GILDED', c1: '#fff2b8', c2: '#c9971f', rarity: 'epic' },
    { id: 'void', name: 'VOID', c1: '#c48bff', c2: '#3d1a66', rarity: 'legendary' }
  ];

  const SKIN_ADJ = ['NEON', 'PLASMA', 'QUANTUM', 'CYBER', 'LASER', 'PHANTOM', 'GLITCH', 'VAPOR', 'CHROME', 'STATIC',
    'VOLT', 'RETRO', 'ATOMIC', 'LUNAR', 'SOLAR', 'ARCANE', 'FROST', 'EMBER', 'SHADOW', 'CRYSTAL',
    'TURBO', 'HYPER', 'COSMIC', 'RADIANT', 'FERAL', 'SPECTRAL', 'MIDNIGHT', 'GOLDEN', 'CRIMSON', 'AZURE'];
  const SKIN_NOUN = ['WAVE', 'FLARE', 'BLADE', 'CORE', 'DRIFT', 'SURGE', 'SPARK', 'HAZE', 'PULSE', 'ECHO',
    'STORM', 'CIRCUIT', 'MERIDIAN', 'CASCADE', 'RUSH', 'BLOOM', 'RIOT', 'FRACTURE', 'HALO', 'VORTEX',
    'PRISM', 'NEBULA', 'SIGNAL', 'GRID', 'FLUX', 'ORBIT', 'ZENITH', 'ECLIPSE', 'MIRAGE', 'GLARE'];

  function buildGeneratedSkins(count) {
    const rng = mulberry32(918273645);
    const used = new Set();
    const list = [];
    for (let i = 0; i < count; i++) {
      let name;
      do {
        const a = SKIN_ADJ[(rng() * SKIN_ADJ.length) | 0];
        const n = SKIN_NOUN[(rng() * SKIN_NOUN.length) | 0];
        name = a + ' ' + n;
      } while (used.has(name));
      used.add(name);

      const hue1 = rng() * 360;
      const hue2 = (hue1 + 30 + rng() * 90) % 360;
      const sat = 70 + rng() * 25;
      const c1 = `hsl(${hue1.toFixed(0)}, ${sat.toFixed(0)}%, ${(58 + rng() * 12).toFixed(0)}%)`;
      const c2 = `hsl(${hue2.toFixed(0)}, ${sat.toFixed(0)}%, ${(20 + rng() * 18).toFixed(0)}%)`;

      const roll = rng();
      const rarity = roll < 0.55 ? 'common' : roll < 0.85 ? 'rare' : roll < 0.97 ? 'epic' : 'legendary';

      list.push({ id: 'gen' + i, name, c1, c2, rarity });
    }
    return list;
  }

  const SKINS = [...SIGNATURE_SKINS, ...buildGeneratedSkins(100)];

  function rollRarity() {
    const total = Object.values(RARITY_INFO).reduce((s, r) => s + r.weight, 0);
    let roll = Math.random() * total;
    for (const key of Object.keys(RARITY_INFO)) {
      roll -= RARITY_INFO[key].weight;
      if (roll <= 0) return key;
    }
    return 'common';
  }

  function todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function getUnlockedSkins() {
    try {
      const list = JSON.parse(localStorage.getItem(UNLOCKED_SKINS_KEY) || '["default"]');
      return list.includes('default') ? list : ['default', ...list];
    } catch (e) { return ['default']; }
  }
  function setUnlockedSkins(list) {
    localStorage.setItem(UNLOCKED_SKINS_KEY, JSON.stringify(list));
  }
  function getEquippedSkinId() {
    return localStorage.getItem(EQUIPPED_SKIN_KEY) || 'default';
  }
  function setEquippedSkinId(id) {
    localStorage.setItem(EQUIPPED_SKIN_KEY, id);
  }
  function getEquippedSkin() {
    return SKINS.find(s => s.id === getEquippedSkinId()) || SKINS[0];
  }
  function isChestAvailable() {
    return localStorage.getItem(LAST_CHEST_KEY) !== todayStr();
  }

  const LEVELS = [
    { id: 1, name: 'NEON DAWN', length: 3600, speed: 320, seed: 101, gapMin: 340, gapMax: 500, doubleChance: 0.05, blockChance: 0.25, tripleChance: 0 },
    { id: 2, name: 'PULSE DRIVE', length: 4400, speed: 360, seed: 202, gapMin: 300, gapMax: 460, doubleChance: 0.12, blockChance: 0.30, tripleChance: 0 },
    { id: 3, name: 'GRID RUSH', length: 5200, speed: 400, seed: 303, gapMin: 280, gapMax: 420, doubleChance: 0.20, blockChance: 0.32, tripleChance: 0 },
    { id: 4, name: 'VOID CIRCUIT', length: 6200, speed: 440, seed: 404, gapMin: 260, gapMax: 400, doubleChance: 0.28, blockChance: 0.34, tripleChance: 0 },
    { id: 5, name: 'HYPER OVERDRIVE', length: 7200, speed: 480, seed: 505, gapMin: 250, gapMax: 380, doubleChance: 0.35, blockChance: 0.36, tripleChance: 0 },
    { id: 6, name: 'CHROME HORIZON', length: 7600, speed: 500, seed: 606, gapMin: 300, gapMax: 450, doubleChance: 0.30, blockChance: 0.34, tripleChance: 0.05 },
    { id: 7, name: 'STATIC BLOOM', length: 8000, speed: 520, seed: 707, gapMin: 290, gapMax: 440, doubleChance: 0.32, blockChance: 0.34, tripleChance: 0.08 },
    { id: 8, name: 'QUANTUM FLUX', length: 8400, speed: 540, seed: 808, gapMin: 280, gapMax: 430, doubleChance: 0.33, blockChance: 0.35, tripleChance: 0.10 },
    { id: 9, name: 'SIGNAL STORM', length: 8800, speed: 560, seed: 909, gapMin: 270, gapMax: 420, doubleChance: 0.34, blockChance: 0.35, tripleChance: 0.12 },
    { id: 10, name: 'PHANTOM CIRCUIT', length: 9200, speed: 580, seed: 1010, gapMin: 260, gapMax: 410, doubleChance: 0.35, blockChance: 0.36, tripleChance: 0.14 },
    { id: 11, name: 'RETROWAVE RIOT', length: 9600, speed: 600, seed: 1111, gapMin: 255, gapMax: 400, doubleChance: 0.36, blockChance: 0.36, tripleChance: 0.16 },
    { id: 12, name: 'GLITCH CASCADE', length: 10000, speed: 615, seed: 1212, gapMin: 250, gapMax: 390, doubleChance: 0.37, blockChance: 0.37, tripleChance: 0.18 },
    { id: 13, name: 'LASER MERIDIAN', length: 10400, speed: 630, seed: 1313, gapMin: 245, gapMax: 380, doubleChance: 0.38, blockChance: 0.37, tripleChance: 0.20 },
    { id: 14, name: 'SYNTH APOCALYPSE', length: 10800, speed: 645, seed: 1414, gapMin: 240, gapMax: 370, doubleChance: 0.39, blockChance: 0.38, tripleChance: 0.22 },
    { id: 15, name: 'TERMINAL VELOCITY', length: 11200, speed: 660, seed: 1515, gapMin: 235, gapMax: 360, doubleChance: 0.40, blockChance: 0.38, tripleChance: 0.25 }
  ];

  const ENDLESS_CONFIGS = {
    endless: { baseSpeed: 340, maxSpeed: 620, ramp: 4.5, gapMin: 300, gapMax: 460 },
    hardcore: { baseSpeed: 430, maxSpeed: 780, ramp: 7.5, gapMin: 250, gapMax: 380 },
    ship: { baseSpeed: 300, maxSpeed: 560, ramp: 5, gapMin: 260, gapMax: 400 }
  };

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function getCompleted() {
    try { return JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function markCompleted(id) {
    const done = getCompleted();
    if (!done.includes(id)) {
      done.push(id);
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(done));
    }
  }
  function isUnlocked(level) {
    if (level.id === 1) return true;
    return getCompleted().includes(level.id - 1);
  }
  function getBestTimes() {
    try { return JSON.parse(localStorage.getItem(BEST_TIMES_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function setBestTime(id, t) {
    const times = getBestTimes();
    times[id] = t;
    localStorage.setItem(BEST_TIMES_KEY, JSON.stringify(times));
  }
  function getCustomLevels() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_LEVELS_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function setCustomLevels(list) {
    localStorage.setItem(CUSTOM_LEVELS_KEY, JSON.stringify(list));
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function generateLevelObstacles(level) {
    const rnd = mulberry32(level.seed);
    const list = [];
    let x = 500;
    let genMini = false;
    let genGravity = 'floor';
    while (x < level.length - 500) {
      const gap = level.gapMin + rnd() * (level.gapMax - level.gapMin);
      x += gap;
      const roll = rnd();
      const tripleC = level.tripleChance || 0;
      if (rnd() < 0.05) {
        list.push({ type: 'portal', worldX: x - 30, mini: !genMini });
        genMini = !genMini;
      }
      if (rnd() < 0.04) {
        list.push({ type: 'gravityPortal', worldX: x - 60 });
        genGravity = genGravity === 'floor' ? 'ceil' : 'floor';
      }
      const side = genGravity;
      if (roll < tripleC) {
        const h = 34 + rnd() * 8;
        list.push({ type: 'spike', worldX: x, width: 30, height: h, side });
        list.push({ type: 'spike', worldX: x + 34, width: 30, height: h, side });
        list.push({ type: 'spike', worldX: x + 68, width: 30, height: h, side });
        x += 68;
      } else if (roll < tripleC + level.doubleChance) {
        const h = 36 + rnd() * 10;
        list.push({ type: 'spike', worldX: x, width: 34, height: h, side });
        list.push({ type: 'spike', worldX: x + 40, width: 34, height: h, side });
        x += 40;
      } else if (roll < tripleC + level.doubleChance + level.blockChance) {
        list.push({ type: 'block', worldX: x, width: 44 + rnd() * 16, height: 46 + rnd() * 26, side });
      } else if (rnd() < 0.12) {
        list.push({ type: 'pad', worldX: x, width: 46, height: 14, side });
      } else {
        list.push({ type: 'spike', worldX: x, width: 40, height: 38 + rnd() * 16, side });
      }
      if (rnd() < 0.15) {
        list.push({ type: 'orb', worldX: x + 60 + rnd() * 40, height: 90 + rnd() * 50, radius: ORB_RADIUS, side });
      }
    }
    return list;
  }

  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    GROUND_Y = H - Math.max(70, H * 0.14);
    CEIL_Y = Math.max(50, H * 0.10);
  }

  const GRAVITY = 2600;
  const JUMP_VELOCITY = -840;
  const ORB_VELOCITY = -880;
  const ORB_RADIUS = 16;
  const PAD_VELOCITY = -1080;
  const NORMAL_PLAYER_SIZE = 42;
  const MINI_PLAYER_SIZE = NORMAL_PLAYER_SIZE * 0.6;
  let PLAYER_SIZE = NORMAL_PLAYER_SIZE;
  let miniMode = false;
  let gravityDir = 1; // 1 = floor (normal), -1 = ceiling (flipped)
  const PLAYER_X = 130;

  const SHIP_GRAVITY = 1500;
  const SHIP_THRUST = -3100;
  const SHIP_MAX_VY = 560;

  let GROUND_Y = 0;
  let CEIL_Y = 0;

  let state = 'menu'; // menu | playing | gameover | levelcomplete | editor
  let mode = 'endless'; // endless | hardcore | ship | level
  let levelPlayMode = 'normal'; // normal | practice | timetrial
  let currentLevel = null;
  let practiceCheckpoint = null;
  let distance = 0;
  let speed = 0;
  let levelElapsed = 0;
  let inputHeld = false;

  let editorTool = 'spike'; // spike | double | triple | block | erase
  let editorSide = 'floor'; // floor | ceil — placement side for hazard tools
  let editorScroll = 0;
  let editorHoverX = null;
  let editingCustomId = null;
  let editorTestActive = false;

  const bestScores = {
    endless: Number(localStorage.getItem(BEST_KEYS.endless) || 0),
    hardcore: Number(localStorage.getItem(BEST_KEYS.hardcore) || 0),
    ship: Number(localStorage.getItem(BEST_KEYS.ship) || 0)
  };

  const player = { y: 0, vy: 0, onGround: true, rot: 0, squash: 0 };

  function resetPlayer() {
    miniMode = miniModeSelected;
    PLAYER_SIZE = miniModeSelected ? MINI_PLAYER_SIZE : NORMAL_PLAYER_SIZE;
    gravityDir = 1;
    player.y = GROUND_Y - PLAYER_SIZE;
    player.vy = 0;
    player.onGround = true;
    player.rot = 0;
    player.squash = 0;
  }

  function setMiniMode(mini) {
    if (miniMode === mini) return;
    miniMode = mini;
    if (gravityDir === 1) {
      const bottom = player.y + PLAYER_SIZE;
      PLAYER_SIZE = mini ? MINI_PLAYER_SIZE : NORMAL_PLAYER_SIZE;
      player.y = bottom - PLAYER_SIZE;
    } else {
      const top = player.y;
      PLAYER_SIZE = mini ? MINI_PLAYER_SIZE : NORMAL_PLAYER_SIZE;
      player.y = top;
    }
    bursts.push(makeBurst(PLAYER_X + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2, mini ? '#7cf9ff' : '#ff9df7'));
  }

  function setGravityDir(dir) {
    if (gravityDir === dir) return;
    gravityDir = dir;
    player.vy = 0;
    bursts.push(makeBurst(PLAYER_X + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2, dir === -1 ? '#39ff8a' : '#ffb347'));
  }

  let obstacles = [];
  let lastObstacleWorldX = 0;
  let spawnGravitySide = 'floor';
  let trail = [];
  let bursts = [];
  let hue = 190;

  function rand(min, max) { return min + Math.random() * (max - min); }
  function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

  function spawnObstacleEndless(cfg) {
    const type = pick(['spike', 'spike', 'block', 'double']);
    const speedFactor = speed / cfg.baseSpeed;
    const gap = rand(cfg.gapMin, cfg.gapMax) * (0.85 + speedFactor * 0.15);
    lastObstacleWorldX += gap;

    if (Math.random() < 0.05) {
      obstacles.push({ type: 'gravityPortal', worldX: lastObstacleWorldX - 30 });
      spawnGravitySide = spawnGravitySide === 'floor' ? 'ceil' : 'floor';
    }
    const side = spawnGravitySide;

    if (type === 'spike') {
      if (Math.random() < 0.12) {
        obstacles.push({ type: 'pad', worldX: lastObstacleWorldX, width: 46, height: 14, side });
      } else {
        obstacles.push({ type: 'spike', worldX: lastObstacleWorldX, width: 40, height: rand(38, 54), side });
      }
    } else if (type === 'double') {
      const h = rand(36, 46);
      obstacles.push({ type: 'spike', worldX: lastObstacleWorldX, width: 34, height: h, side });
      obstacles.push({ type: 'spike', worldX: lastObstacleWorldX + 40, width: 34, height: h, side });
      lastObstacleWorldX += 40;
    } else {
      obstacles.push({ type: 'block', worldX: lastObstacleWorldX, width: rand(44, 60), height: rand(46, 72), side });
    }

    if (Math.random() < 0.16) {
      obstacles.push({ type: 'orb', worldX: lastObstacleWorldX + rand(70, 130), height: rand(90, 150), radius: ORB_RADIUS, side });
    }
  }

  function spawnShipObstacle() {
    const cfg = ENDLESS_CONFIGS.ship;
    const speedFactor = speed / cfg.baseSpeed;
    const gap = rand(cfg.gapMin, cfg.gapMax) * (0.85 + speedFactor * 0.15);
    lastObstacleWorldX += gap;
    const gapHeight = Math.max(150, 240 - distance * 0.006);
    const margin = 50;
    const center = rand(margin + gapHeight / 2, GROUND_Y - margin - gapHeight / 2);
    obstacles.push({ type: 'pipe', worldX: lastObstacleWorldX, width: 56, topHeight: center - gapHeight / 2, bottomY: center + gapHeight / 2 });
  }

  function hideAllScreens() {
    menuScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    levelCompleteScreen.classList.add('hidden');
    chestRevealScreen.classList.add('hidden');
    collectionScreen.classList.add('hidden');
    editorPanel.classList.add('hidden');
  }

  function playMusic(theme) {
    if (!window.NeonAudio) return;
    NeonAudio.setTheme(theme);
    NeonAudio.init();
    NeonAudio.start();
  }

  function renderMenu() {
    menuBestEl.textContent = bestScores.endless;
    menuHardcoreBestEl.textContent = bestScores.hardcore;
    menuShipBestEl.textContent = bestScores.ship;
    levelGridEl.innerHTML = '';
    const completed = getCompleted();
    const bestTimes = getBestTimes();
    LEVELS.forEach(level => {
      const btn = document.createElement('button');
      const unlocked = isUnlocked(level);
      const done = completed.includes(level.id);
      btn.className = 'levelBtn' + (done ? ' completed' : '') + (!unlocked ? ' locked' : '');
      btn.innerHTML = String(level.id) + (done ? '<span class="starMark">&#9733;</span>' : '');
      btn.disabled = !unlocked;
      btn.title = level.name + (bestTimes[level.id] !== undefined ? ' - best ' + bestTimes[level.id].toFixed(1) + 's' : '');
      if (unlocked) btn.addEventListener('click', () => startLevel(level));
      levelGridEl.appendChild(btn);
    });
    renderCustomLevels();
    renderChest();
    renderCollectionButton();
  }

  function renderChest() {
    const available = isChestAvailable();
    dailyChestBtn.disabled = !available;
    dailyChestBtn.classList.toggle('available', available);
    chestStatusEl.textContent = available ? 'TAP TO OPEN' : 'COME BACK TOMORROW';
  }

  function renderCollectionButton() {
    collectionCountEl.textContent = getUnlockedSkins().length + ' / ' + SKINS.length;
  }

  function renderRarityLegend() {
    rarityLegendEl.innerHTML = '';
    Object.keys(RARITY_INFO).forEach(key => {
      const info = RARITY_INFO[key];
      const item = document.createElement('span');
      item.className = 'rarityLegendItem';
      item.style.color = info.color;
      const dot = document.createElement('span');
      dot.className = 'rarityLegendDot';
      dot.style.background = info.color;
      dot.style.boxShadow = `0 0 6px ${info.color}`;
      item.appendChild(dot);
      item.appendChild(document.createTextNode(info.label));
      rarityLegendEl.appendChild(item);
    });
  }

  function renderCollectionGrid() {
    const unlocked = getUnlockedSkins();
    const equipped = getEquippedSkinId();
    collectionProgress.textContent = unlocked.length + ' / ' + SKINS.length + ' UNLOCKED';
    collectionGridEl.innerHTML = '';
    SKINS.forEach(skin => {
      const owned = unlocked.includes(skin.id);
      const sw = document.createElement('button');
      sw.className = 'collectionSwatch rarity-' + skin.rarity + (owned ? '' : ' locked') + (owned && skin.id === equipped ? ' equipped' : '');
      sw.style.background = `linear-gradient(135deg, ${skin.c1}, ${skin.c2})`;
      sw.title = owned ? (skin.name + ' — ' + RARITY_INFO[skin.rarity].label) : (skin.name + ' (LOCKED)');
      sw.disabled = !owned;
      if (owned) sw.addEventListener('click', () => { setEquippedSkinId(skin.id); renderCollectionGrid(); });
      collectionGridEl.appendChild(sw);
    });
  }

  function openCollection() {
    renderCollectionGrid();
    hideAllScreens();
    collectionScreen.classList.remove('hidden');
  }

  function openChest() {
    if (!isChestAvailable()) return;
    localStorage.setItem(LAST_CHEST_KEY, todayStr());
    const unlocked = getUnlockedSkins();
    const lockedAll = SKINS.filter(s => !unlocked.includes(s.id));
    let pool = SKINS;
    if (lockedAll.length) {
      const rarity = rollRarity();
      const byRarity = lockedAll.filter(s => s.rarity === rarity);
      pool = byRarity.length ? byRarity : lockedAll;
    }
    const won = pick(pool);
    const isNew = !unlocked.includes(won.id);
    if (isNew) {
      setUnlockedSkins([...unlocked, won.id]);
      setEquippedSkinId(won.id);
    }
    const rarityInfo = RARITY_INFO[won.rarity];
    chestRevealSwatch.style.background = `linear-gradient(135deg, ${won.c1}, ${won.c2})`;
    chestRevealSwatch.style.borderColor = rarityInfo.color;
    chestRevealSwatch.style.boxShadow = `0 0 30px ${rarityInfo.color}`;
    chestRevealName.textContent = won.name;
    chestRevealName.style.color = rarityInfo.color;
    chestRevealSub.textContent = rarityInfo.label + ' — ' + (isNew ? 'NEW SKIN UNLOCKED & EQUIPPED' : 'DUPLICATE, ALREADY OWNED');
    renderChest();
    renderCollectionButton();
    hideAllScreens();
    chestRevealScreen.classList.remove('hidden');
  }

  function renderCustomLevels() {
    const list = getCustomLevels();
    customLevelListEl.innerHTML = '';
    if (list.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'hint';
      empty.style.opacity = '0.6';
      empty.textContent = 'NO CUSTOM LEVELS YET';
      customLevelListEl.appendChild(empty);
      return;
    }
    list.forEach(level => {
      const row = document.createElement('div');
      row.className = 'customLevelRow';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'customLevelName';
      nameSpan.textContent = level.name;
      row.appendChild(nameSpan);

      const playBtn = document.createElement('button');
      playBtn.className = 'menuBtnSmall tiny';
      playBtn.textContent = 'PLAY';
      playBtn.addEventListener('click', () => startLevel(level));
      row.appendChild(playBtn);

      const editBtn = document.createElement('button');
      editBtn.className = 'menuBtnSmall tiny';
      editBtn.textContent = 'EDIT';
      editBtn.addEventListener('click', () => openEditLevel(level));
      row.appendChild(editBtn);

      const delBtn = document.createElement('button');
      delBtn.className = 'menuBtnSmall tiny danger';
      delBtn.textContent = 'DELETE';
      delBtn.addEventListener('click', () => {
        if (!confirm('Delete "' + level.name + '"?')) return;
        setCustomLevels(getCustomLevels().filter(l => l.id !== level.id));
        renderCustomLevels();
      });
      row.appendChild(delBtn);

      customLevelListEl.appendChild(row);
    });
  }

  function setHudForRun() {
    if (mode === 'level') {
      scoreEl.classList.add('hidden');
      bestEl.classList.add('hidden');
      modeLabelEl.classList.add('hidden');
      levelProgressWrap.classList.remove('hidden');
    } else {
      levelProgressWrap.classList.add('hidden');
      practiceTagEl.classList.add('hidden');
      checkpointBtnEl.classList.add('hidden');
      levelTimerEl.classList.add('hidden');
      scoreEl.classList.remove('hidden');
      bestEl.classList.remove('hidden');
      if (mode === 'hardcore' || mode === 'ship') {
        modeLabelEl.textContent = mode.toUpperCase();
        modeLabelEl.classList.remove('hidden');
      } else {
        modeLabelEl.classList.add('hidden');
      }
    }
  }

  function goToMenu() {
    state = 'menu';
    hideAllScreens();
    menuScreen.classList.remove('hidden');
    renderMenu();
    scoreEl.classList.remove('hidden');
    bestEl.classList.remove('hidden');
    modeLabelEl.classList.add('hidden');
    levelProgressWrap.classList.add('hidden');
    playMusic(window.NeonAudio ? NeonAudio.THEMES.menu : null);
  }

  function commonReset() {
    distance = 0;
    trail = [];
    bursts = [];
    levelElapsed = 0;
    spawnGravitySide = 'floor';
    resetPlayer();
  }

  function startEndless() {
    mode = 'endless';
    currentLevel = null;
    const cfg = ENDLESS_CONFIGS.endless;
    speed = cfg.baseSpeed;
    obstacles = [];
    lastObstacleWorldX = W * 0.9;
    commonReset();
    for (let i = 0; i < 4; i++) spawnObstacleEndless(cfg);

    bestEl.textContent = 'BEST ' + bestScores.endless;
    setHudForRun();
    hideAllScreens();
    state = 'playing';
    playMusic(window.NeonAudio ? NeonAudio.THEMES.endless : null);
  }

  function startHardcore() {
    mode = 'hardcore';
    currentLevel = null;
    const cfg = ENDLESS_CONFIGS.hardcore;
    speed = cfg.baseSpeed;
    obstacles = [];
    lastObstacleWorldX = W * 0.9;
    commonReset();
    for (let i = 0; i < 4; i++) spawnObstacleEndless(cfg);

    bestEl.textContent = 'BEST ' + bestScores.hardcore;
    setHudForRun();
    hideAllScreens();
    state = 'playing';
    playMusic(window.NeonAudio ? NeonAudio.THEMES.hardcore : null);
  }

  function startShip() {
    mode = 'ship';
    currentLevel = null;
    const cfg = ENDLESS_CONFIGS.ship;
    speed = cfg.baseSpeed;
    obstacles = [];
    lastObstacleWorldX = W * 0.9;
    commonReset();
    player.y = GROUND_Y / 2 - PLAYER_SIZE / 2;
    player.vy = 0;
    for (let i = 0; i < 3; i++) spawnShipObstacle();

    bestEl.textContent = 'BEST ' + bestScores.ship;
    setHudForRun();
    hideAllScreens();
    state = 'playing';
    playMusic(window.NeonAudio ? NeonAudio.THEMES.ship : null);
  }

  function startLevel(level) {
    mode = 'level';
    currentLevel = level;
    speed = level.speed;
    obstacles = level.custom ? level.obstacles.map(o => ({ ...o })) : generateLevelObstacles(level);
    commonReset();
    practiceCheckpoint = null;

    setHudForRun();
    levelNameEl.textContent = level.name;
    progressBarFill.style.width = '0%';

    if (levelPlayMode === 'practice') {
      practiceTagEl.classList.remove('hidden');
      checkpointBtnEl.classList.remove('hidden');
    } else {
      practiceTagEl.classList.add('hidden');
      checkpointBtnEl.classList.add('hidden');
    }
    if (levelPlayMode === 'timetrial') {
      levelTimerEl.classList.remove('hidden');
      levelTimerEl.textContent = '0.0s';
    } else {
      levelTimerEl.classList.add('hidden');
    }

    hideAllScreens();
    state = 'playing';
    const theme = level.custom
      ? (window.NeonAudio ? NeonAudio.THEMES.custom : null)
      : (window.NeonAudio ? NeonAudio.THEMES.levels[level.id - 1] : null);
    playMusic(theme);
  }

  function jump() {
    if (state !== 'playing') return;
    const orb = findActiveOrb();
    if (orb) {
      orb.used = true;
      player.vy = ORB_VELOCITY * gravityDir;
      player.onGround = false;
      player.squash = 1;
      bursts.push(makeBurst(PLAYER_X + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2, '#ffe14f'));
      return;
    }
    if (player.onGround) {
      player.vy = JUMP_VELOCITY * gravityDir;
      player.onGround = false;
      player.squash = 1;
    }
  }

  function placeCheckpoint() {
    if (mode === 'level' && levelPlayMode === 'practice' && state === 'playing' && player.onGround) {
      practiceCheckpoint = { distance };
      bursts.push(makeBurst(PLAYER_X + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2, '#ffe14f'));
    }
  }

  function respawnAtCheckpoint() {
    bursts.push(makeBurst(PLAYER_X + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2));
    distance = practiceCheckpoint.distance;
    resetPlayer();
  }

  function retrySame() {
    if (mode === 'level' && currentLevel) startLevel(currentLevel);
    else if (mode === 'hardcore') startHardcore();
    else if (mode === 'ship') startShip();
    else startEndless();
  }

  function getEditorLength() { return clamp(parseInt(editorLengthInput.value, 10) || 4000, 500, 20000); }
  function getEditorSpeed() { return clamp(parseInt(editorSpeedInput.value, 10) || 380, 150, 900); }

  function buildGhostObstacles(tool, worldX) {
    const side = editorSide;
    if (tool === 'spike') return [{ type: 'spike', worldX, width: 40, height: 44, side }];
    if (tool === 'double') return [
      { type: 'spike', worldX, width: 34, height: 40, side },
      { type: 'spike', worldX: worldX + 40, width: 34, height: 40, side }
    ];
    if (tool === 'triple') return [
      { type: 'spike', worldX, width: 30, height: 38, side },
      { type: 'spike', worldX: worldX + 34, width: 30, height: 38, side },
      { type: 'spike', worldX: worldX + 68, width: 30, height: 38, side }
    ];
    if (tool === 'block') return [{ type: 'block', worldX, width: 50, height: 60, side }];
    if (tool === 'orb') return [{ type: 'orb', worldX, height: 110, radius: ORB_RADIUS, side }];
    if (tool === 'pad') return [{ type: 'pad', worldX, width: 46, height: 14, side }];
    if (tool === 'miniPortal') return [{ type: 'portal', worldX, mini: true }];
    if (tool === 'normalPortal') return [{ type: 'portal', worldX, mini: false }];
    if (tool === 'gravityPortal') return [{ type: 'gravityPortal', worldX }];
    return [];
  }

  function handleEditorClick(clientX, clientY) {
    const worldX = Math.round((clientX + editorScroll) / 10) * 10;

    if (editorTool === 'erase') {
      const idx = obstacles.findIndex(o => {
        const sx = o.worldX - editorScroll;
        if (o.type === 'orb') {
          const cy = (o.side === 'ceil') ? CEIL_Y + o.height : GROUND_Y - o.height;
          const dx = clientX - sx, dy = clientY - cy;
          return dx * dx + dy * dy <= (o.radius + 10) * (o.radius + 10);
        }
        if (o.type === 'portal' || o.type === 'gravityPortal') {
          return clientX >= sx - 10 && clientX <= sx + 10 && clientY >= -10 && clientY <= GROUND_Y + 10;
        }
        const ceil = o.side === 'ceil';
        const topY = o.type === 'pipe' ? 0 : (ceil ? CEIL_Y : GROUND_Y - o.height);
        const botY = o.type === 'pipe' ? GROUND_Y : (ceil ? CEIL_Y + o.height : GROUND_Y);
        return clientX >= sx - 6 && clientX <= sx + o.width + 6 && clientY >= topY - 10 && clientY <= botY + 10;
      });
      if (idx !== -1) obstacles.splice(idx, 1);
      return;
    }

    if (worldX < 20 || worldX > getEditorLength() - 20) return;
    obstacles.push(...buildGhostObstacles(editorTool, worldX));
  }

  function openCreateLevel() {
    editingCustomId = null;
    obstacles = [];
    editorScroll = 0;
    editorNameInput.value = '';
    editorLengthInput.value = 4000;
    editorSpeedInput.value = 380;
    enterEditor();
  }

  function openEditLevel(level) {
    editingCustomId = level.id;
    obstacles = level.obstacles.map(o => ({ ...o }));
    editorScroll = 0;
    editorNameInput.value = level.name;
    editorLengthInput.value = level.length;
    editorSpeedInput.value = level.speed;
    enterEditor();
  }

  function enterEditor() {
    state = 'editor';
    obstacles.forEach(o => {
      if (o.type === 'orb') o.used = false;
      if (o.type === 'pad') o.triggered = false;
      if (o.type === 'portal' || o.type === 'gravityPortal') o.passed = false;
    });
    hideAllScreens();
    editorPanel.classList.remove('hidden');
    scoreEl.classList.add('hidden');
    bestEl.classList.add('hidden');
    modeLabelEl.classList.add('hidden');
    levelProgressWrap.classList.add('hidden');
    checkpointBtnEl.classList.add('hidden');
    playMusic(window.NeonAudio ? NeonAudio.THEMES.menu : null);
  }

  function testPlayLevel() {
    const testLevel = {
      id: 'editor-test',
      name: editorNameInput.value.trim() || 'TEST LEVEL',
      length: getEditorLength(),
      speed: getEditorSpeed(),
      custom: true,
      obstacles: obstacles.slice()
    };
    editorTestActive = true;
    startLevel(testLevel);
  }

  function saveCustomLevel() {
    const name = editorNameInput.value.trim() || 'UNTITLED LEVEL';
    const length = getEditorLength();
    const speedVal = getEditorSpeed();
    const list = getCustomLevels();
    const savedObstacles = obstacles.map(o => ({ ...o }));

    if (editingCustomId) {
      const idx = list.findIndex(l => l.id === editingCustomId);
      const updated = { id: editingCustomId, name, length, speed: speedVal, custom: true, obstacles: savedObstacles };
      if (idx !== -1) list[idx] = updated; else list.push(updated);
    } else {
      editingCustomId = 'custom-' + Date.now();
      list.push({ id: editingCustomId, name, length, speed: speedVal, custom: true, obstacles: savedObstacles });
    }
    setCustomLevels(list);
    alert('Level saved!');
  }

  function endGame() {
    state = 'gameover';
    bursts.push(makeBurst(PLAYER_X + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2));

    if (mode === 'level') {
      const pct = Math.min(100, Math.floor((distance / currentLevel.length) * 100));
      gameOverStat1.textContent = currentLevel.name + (levelPlayMode === 'practice' ? ' (PRACTICE)' : '');
      gameOverStat2.textContent = 'REACHED ' + pct + '%';
    } else {
      const finalScore = Math.floor(distance / 10);
      if (finalScore > bestScores[mode]) {
        bestScores[mode] = finalScore;
        localStorage.setItem(BEST_KEYS[mode], String(finalScore));
      }
      gameOverStat1.textContent = 'SCORE: ' + finalScore;
      gameOverStat2.textContent = 'BEST: ' + bestScores[mode];
    }

    gameOverMenuBtn.textContent = editorTestActive ? 'BACK TO EDITOR' : 'MENU';
    hideAllScreens();
    gameOverScreen.classList.remove('hidden');
  }

  function getNextLevel(level) {
    if (!level || level.custom) return null;
    const idx = LEVELS.findIndex(l => l.id === level.id);
    return idx === -1 ? null : LEVELS[idx + 1] || null;
  }

  function levelComplete() {
    state = 'levelcomplete';
    const isPractice = levelPlayMode === 'practice';
    const isCustom = !!currentLevel.custom;
    const isEphemeralTest = currentLevel.id === 'editor-test';
    const bestTimes = getBestTimes();
    let bestTime = bestTimes[currentLevel.id];
    let isNewBest = false;

    if (!isPractice && !isCustom) markCompleted(currentLevel.id);
    if (!isPractice && !isEphemeralTest) {
      if (bestTime === undefined || levelElapsed < bestTime) {
        isNewBest = true;
        bestTime = levelElapsed;
        setBestTime(currentLevel.id, bestTime);
      }
    }

    completeLevelName.textContent = currentLevel.name;
    completeTime.textContent = (isPractice ? 'PRACTICE TIME: ' : 'TIME: ') + levelElapsed.toFixed(1) + 's';
    completeBestTime.textContent = isPractice
      ? 'PRACTICE RUNS ARE NOT SAVED'
      : (isEphemeralTest ? 'TEST RUN' : (isNewBest ? 'NEW BEST TIME!' : 'BEST: ' + bestTime.toFixed(1) + 's'));

    const next = getNextLevel(currentLevel);
    if (next && isUnlocked(next)) {
      nextLevelBtn.disabled = false;
      nextLevelBtn.onclick = () => startLevel(next);
    } else {
      nextLevelBtn.disabled = true;
      nextLevelBtn.onclick = null;
    }

    completeMenuBtn.textContent = editorTestActive ? 'BACK TO EDITOR' : 'MENU';
    hideAllScreens();
    levelCompleteScreen.classList.remove('hidden');
  }

  function makeBurst(x, y, colorOverride) {
    const parts = [];
    for (let i = 0; i < 26; i++) {
      const a = rand(0, Math.PI * 2);
      const sp = rand(80, 420);
      parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, color: colorOverride || (Math.random() > 0.5 ? '#4ff2ff' : '#ff3df0') });
    }
    return parts;
  }

  function updateMuteBtn() {
    if (!window.NeonAudio) return;
    muteBtn.classList.toggle('muted', NeonAudio.isMuted());
  }

  muteBtn.addEventListener('click', () => {
    if (window.NeonAudio) {
      NeonAudio.init();
      NeonAudio.toggleMute();
      updateMuteBtn();
    }
  });
  checkpointBtnEl.addEventListener('click', placeCheckpoint);

  document.querySelectorAll('#playModeRow .playModePill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#playModeRow .playModePill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      levelPlayMode = btn.dataset.playMode;
    });
  });

  const miniModeToggleBtn = document.getElementById('miniModeToggle');
  let miniModeSelected = false;
  miniModeToggleBtn.addEventListener('click', () => {
    miniModeSelected = !miniModeSelected;
    miniModeToggleBtn.classList.toggle('active', miniModeSelected);
  });

  dailyChestBtn.addEventListener('click', openChest);
  chestRevealBtn.addEventListener('click', goToMenu);
  collectionBtn.addEventListener('click', openCollection);
  collectionBackBtn.addEventListener('click', goToMenu);

  endlessBtn.addEventListener('click', startEndless);
  hardcoreBtn.addEventListener('click', startHardcore);
  shipBtn.addEventListener('click', startShip);
  retryBtn.addEventListener('click', retrySame);

  function handleMenuOrEditorReturn() {
    if (editorTestActive) { editorTestActive = false; enterEditor(); }
    else goToMenu();
  }
  gameOverMenuBtn.addEventListener('click', handleMenuOrEditorReturn);
  completeMenuBtn.addEventListener('click', handleMenuOrEditorReturn);

  createLevelBtn.addEventListener('click', openCreateLevel);
  document.querySelectorAll('.toolBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.toolBtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      editorTool = btn.dataset.tool;
    });
  });
  editorSideToggleBtn.addEventListener('click', () => {
    editorSide = editorSide === 'floor' ? 'ceil' : 'floor';
    editorSideToggleBtn.textContent = editorSide === 'floor' ? 'FLOOR MODE' : 'CEILING MODE';
    editorSideToggleBtn.classList.toggle('danger', editorSide === 'ceil');
  });
  editorScrollLeftBtn.addEventListener('click', () => {
    editorScroll = Math.max(0, editorScroll - 400);
  });
  editorScrollRightBtn.addEventListener('click', () => {
    editorScroll = Math.max(0, Math.min(editorScroll + 400, Math.max(0, getEditorLength() - 200)));
  });
  editorClearBtn.addEventListener('click', () => {
    if (obstacles.length && !confirm('Clear all obstacles?')) return;
    obstacles = [];
  });
  editorTestBtn.addEventListener('click', testPlayLevel);
  editorSaveBtn.addEventListener('click', saveCustomLevel);
  editorBackBtn.addEventListener('click', () => {
    if (!editingCustomId && obstacles.length && !confirm('Discard this unsaved level?')) return;
    goToMenu();
  });

  window.addEventListener('resize', () => {
    resize();
    if (state !== 'playing') resetPlayer();
  });

  function handleNonPlayingPress() {
    if (state === 'gameover') { retrySame(); return; }
    if (state === 'levelcomplete') {
      const next = getNextLevel(currentLevel);
      if (mode === 'level' && next && isUnlocked(next)) startLevel(next);
      else handleMenuOrEditorReturn();
    }
  }

  function onPressStart() {
    inputHeld = true;
    if (window.NeonAudio) NeonAudio.init();
    if (state === 'playing') { if (mode !== 'ship') jump(); return; }
    if (state === 'gameover' || state === 'levelcomplete') handleNonPlayingPress();
  }
  function onPressEnd() { inputHeld = false; }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      onPressStart();
    } else if (e.code === 'KeyZ') {
      placeCheckpoint();
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') onPressEnd();
  });
  window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    if (state === 'editor') {
      if (e.target === canvas) handleEditorClick(e.clientX, e.clientY);
      return;
    }
    e.preventDefault();
    onPressStart();
  }, { passive: false });
  window.addEventListener('pointerup', onPressEnd);
  window.addEventListener('pointercancel', onPressEnd);
  window.addEventListener('pointermove', (e) => {
    if (state !== 'editor') return;
    editorHoverX = (e.target === canvas) ? e.clientX : null;
  });
  window.addEventListener('wheel', (e) => {
    if (state !== 'editor') return;
    e.preventDefault();
    editorScroll = clamp(editorScroll + e.deltaY, 0, Math.max(0, getEditorLength() - 200));
  }, { passive: false });

  function playerRect(inset = 0) {
    return { x: PLAYER_X + inset, y: player.y + inset, w: PLAYER_SIZE - inset * 2, h: PLAYER_SIZE - inset * 2 };
  }

  function obstacleScreenRect(o) {
    const screenX = o.worldX - distance;
    if ((o.side || 'floor') === 'ceil') return { x: screenX, y: CEIL_Y, w: o.width, h: o.height };
    return { x: screenX, y: GROUND_Y - o.height, w: o.width, h: o.height };
  }

  function obstacleWidth(o) {
    if (o.type === 'orb') return o.radius * 2;
    if (o.type === 'portal' || o.type === 'gravityPortal') return 10;
    return o.width;
  }

  function orbScreenPos(o) {
    const ceil = (o.side || 'floor') === 'ceil';
    return { x: o.worldX - distance, y: ceil ? CEIL_Y + o.height : GROUND_Y - o.height };
  }

  function circleRectOverlap(cx, cy, r, rect) {
    const closestX = clamp(cx, rect.x, rect.x + rect.w);
    const closestY = clamp(cy, rect.y, rect.y + rect.h);
    const dx = cx - closestX, dy = cy - closestY;
    return dx * dx + dy * dy <= r * r;
  }

  function findActiveOrb() {
    const p = playerRect(-8);
    for (const o of obstacles) {
      if (o.type !== 'orb' || o.used) continue;
      const pos = orbScreenPos(o);
      if (circleRectOverlap(pos.x, pos.y, o.radius, p)) return o;
    }
    return null;
  }

  function rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function checkCollision() {
    const p = playerRect(6);

    if (mode === 'ship') {
      if (player.y <= 0 || player.y + PLAYER_SIZE >= GROUND_Y) return true;
      for (const o of obstacles) {
        const screenX = o.worldX - distance;
        const topRect = { x: screenX, y: 0, w: o.width, h: o.topHeight };
        const bottomRect = { x: screenX, y: o.bottomY, w: o.width, h: GROUND_Y - o.bottomY };
        if (rectsOverlap(p, topRect) || rectsOverlap(p, bottomRect)) return true;
      }
      return false;
    }

    for (const o of obstacles) {
      if (o.type === 'orb' || o.type === 'pad' || o.type === 'portal' || o.type === 'gravityPortal') continue;
      const r = obstacleScreenRect(o);
      if (o.type === 'spike') {
        const inset = { x: r.x + r.w * 0.28, y: r.y + r.h * 0.35, w: r.w * 0.44, h: r.h * 0.65 };
        if (rectsOverlap(p, inset)) return true;
      } else {
        const inset = { x: r.x + 3, y: r.y + 3, w: r.w - 6, h: r.h - 6 };
        if (rectsOverlap(p, inset)) return true;
      }
    }
    return false;
  }

  let lastTime = performance.now();

  function updateShip(dt) {
    const cfg = ENDLESS_CONFIGS.ship;
    speed = Math.min(cfg.maxSpeed, cfg.baseSpeed + Math.sqrt(distance) * cfg.ramp * 0.15);
    distance += speed * dt;

    const netAccel = SHIP_GRAVITY + (inputHeld ? SHIP_THRUST : 0);
    player.vy = clamp(player.vy + netAccel * dt, -SHIP_MAX_VY, SHIP_MAX_VY);
    player.y += player.vy * dt;
    player.rot = clamp(player.vy / SHIP_MAX_VY, -1, 1) * 0.5;

    trail.push({ x: PLAYER_X + PLAYER_SIZE / 2, y: player.y + PLAYER_SIZE / 2, life: 1 });
    if (trail.length > 40) trail.shift();
    trail.forEach(t => t.life -= dt * 2.4);
    trail = trail.filter(t => t.life > 0);

    while (lastObstacleWorldX - distance < W * 1.3) spawnShipObstacle();
    obstacles = obstacles.filter(o => (o.worldX - distance + o.width) > -50);

    if (checkCollision()) { endGame(); }
    hue += dt * 18;
  }

  function update(dt) {
    if (state !== 'playing') return;
    levelElapsed += dt;

    if (mode === 'ship') { updateShip(dt); return; }

    if (mode === 'endless' || mode === 'hardcore') {
      const cfg = ENDLESS_CONFIGS[mode];
      speed = Math.min(cfg.maxSpeed, cfg.baseSpeed + Math.sqrt(distance) * cfg.ramp * 0.15);
    }
    distance += speed * dt;

    for (const o of obstacles) {
      if (o.passed) continue;
      if (o.type === 'portal') {
        if (distance + PLAYER_X >= o.worldX) { o.passed = true; setMiniMode(o.mini); }
      } else if (o.type === 'gravityPortal') {
        if (distance + PLAYER_X >= o.worldX) { o.passed = true; setGravityDir(-gravityDir); }
      }
    }

    player.vy += GRAVITY * gravityDir * dt;
    const prevLeading = gravityDir === 1 ? (player.y + PLAYER_SIZE) : player.y;
    player.y += player.vy * dt;

    let grounded = false;
    const activeSide = gravityDir === 1 ? 'floor' : 'ceil';
    const fallingTowardSurface = gravityDir === 1 ? (player.vy >= 0) : (player.vy <= 0);
    if (fallingTowardSurface) {
      const playerLeft = PLAYER_X, playerRight = PLAYER_X + PLAYER_SIZE;
      for (const o of obstacles) {
        if (o.type !== 'block' || (o.side || 'floor') !== activeSide) continue;
        const screenX = o.worldX - distance;
        if (screenX + o.width <= playerLeft || screenX >= playerRight) continue;
        if (gravityDir === 1) {
          const blockTop = GROUND_Y - o.height;
          if (prevLeading <= blockTop + 0.5 && player.y + PLAYER_SIZE >= blockTop) {
            player.y = blockTop - PLAYER_SIZE;
            player.vy = 0;
            grounded = true;
            break;
          }
        } else {
          const blockBottom = CEIL_Y + o.height;
          if (prevLeading >= blockBottom - 0.5 && player.y <= blockBottom) {
            player.y = blockBottom;
            player.vy = 0;
            grounded = true;
            break;
          }
        }
      }
      if (!grounded) {
        if (gravityDir === 1 && player.y >= GROUND_Y - PLAYER_SIZE) {
          player.y = GROUND_Y - PLAYER_SIZE;
          player.vy = 0;
          grounded = true;
        } else if (gravityDir === -1 && player.y <= CEIL_Y) {
          player.y = CEIL_Y;
          player.vy = 0;
          grounded = true;
        }
      }
    }

    if (grounded) {
      const playerLeft = PLAYER_X, playerRight = PLAYER_X + PLAYER_SIZE;
      for (const o of obstacles) {
        if (o.type !== 'pad' || o.triggered || (o.side || 'floor') !== activeSide) continue;
        const screenX = o.worldX - distance;
        if (screenX + o.width <= playerLeft || screenX >= playerRight) continue;
        o.triggered = true;
        player.vy = PAD_VELOCITY * gravityDir;
        grounded = false;
        bursts.push(makeBurst(PLAYER_X + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2, '#39ff8a'));
        break;
      }
    }
    if (grounded && !player.onGround) player.squash = 1;
    player.onGround = grounded;

    if (player.onGround) {
      player.rot = Math.round(player.rot / (Math.PI / 2)) * (Math.PI / 2);
    } else {
      player.rot += dt * 9;
    }
    player.squash = Math.max(0, player.squash - dt * 4);

    trail.push({ x: PLAYER_X + PLAYER_SIZE / 2, y: player.y + PLAYER_SIZE / 2, life: 1 });
    if (trail.length > 40) trail.shift();
    trail.forEach(t => t.life -= dt * 2.4);
    trail = trail.filter(t => t.life > 0);

    if (mode === 'endless' || mode === 'hardcore') {
      const cfg = ENDLESS_CONFIGS[mode];
      while (lastObstacleWorldX - distance < W * 1.3) spawnObstacleEndless(cfg);
      obstacles = obstacles.filter(o => (o.worldX - distance + obstacleWidth(o)) > -50);
    } else {
      progressBarFill.style.width = Math.min(100, (distance / currentLevel.length) * 100) + '%';
      if (levelPlayMode === 'timetrial') levelTimerEl.textContent = levelElapsed.toFixed(1) + 's';
      if (distance >= currentLevel.length) {
        levelComplete();
        hue += dt * 18;
        return;
      }
    }

    if (checkCollision()) {
      if (mode === 'level' && levelPlayMode === 'practice' && practiceCheckpoint) {
        respawnAtCheckpoint();
      } else {
        endGame();
      }
      hue += dt * 18;
      return;
    }

    hue += dt * 18;
  }

  function updateBursts(dt) {
    for (const parts of bursts) {
      for (const p of parts) {
        p.vy += GRAVITY * 0.5 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 1.4;
      }
    }
    bursts = bursts.filter(parts => parts.some(p => p.life > 0));
  }

  function drawBackground(dir) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    const h1 = (hue) % 360;
    const h2 = (hue + 60) % 360;
    g.addColorStop(0, `hsl(${h1}, 60%, 8%)`);
    g.addColorStop(1, `hsl(${h2}, 70%, 4%)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.strokeStyle = `hsla(${h1}, 100%, 60%, 0.08)`;
    ctx.lineWidth = 1;
    const spacing = 60;
    const offset = (distance * 0.4) % spacing;
    for (let x = -offset; x < W; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, GROUND_Y);
      ctx.stroke();
    }
    ctx.restore();

    const surfaceY = dir === -1 ? CEIL_Y : GROUND_Y;

    ctx.save();
    ctx.shadowColor = `hsl(${h1}, 100%, 60%)`;
    ctx.shadowBlur = 20;
    ctx.strokeStyle = `hsl(${h1}, 100%, 60%)`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, surfaceY);
    ctx.lineTo(W, surfaceY);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = 'rgba(8,6,18,0.9)';
    ctx.save();
    ctx.strokeStyle = `hsla(${h2}, 100%, 60%, 0.35)`;
    ctx.lineWidth = 2;
    const gSpacing = 46;
    const gOffset = (distance) % gSpacing;
    if (dir === -1) {
      ctx.fillRect(0, 0, W, Math.max(0, CEIL_Y - 2));
      for (let x = -gOffset; x < W; x += gSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, CEIL_Y - 8);
        ctx.lineTo(x + 20, 0);
        ctx.stroke();
      }
    } else {
      ctx.fillRect(0, GROUND_Y + 2, W, H - GROUND_Y);
      for (let x = -gOffset; x < W; x += gSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, GROUND_Y + 8);
        ctx.lineTo(x + 20, H);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawTrail() {
    const skin = getEquippedSkin();
    for (const t of trail) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, t.life) * 0.5;
      ctx.fillStyle = skin.c1;
      ctx.shadowColor = skin.c1;
      ctx.shadowBlur = 10;
      const s = PLAYER_SIZE * 0.5 * t.life;
      ctx.fillRect(t.x - s / 2, t.y - s / 2, s, s);
      ctx.restore();
    }
  }

  function drawPlayer() {
    if (state === 'gameover') return;
    const skin = getEquippedSkin();
    ctx.save();
    const cx = PLAYER_X + PLAYER_SIZE / 2;
    const cy = player.y + PLAYER_SIZE / 2;
    ctx.translate(cx, cy);
    ctx.rotate(player.rot);

    if (mode === 'ship') {
      const w = PLAYER_SIZE * 1.3, h = PLAYER_SIZE * 0.7;
      ctx.shadowColor = skin.c1;
      ctx.shadowBlur = 22;
      const grad = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      grad.addColorStop(0, skin.c2);
      grad.addColorStop(1, skin.c1);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(-w / 2, 0);
      ctx.lineTo(w / 2 - 8, -h / 2);
      ctx.lineTo(w / 2, 0);
      ctx.lineTo(w / 2 - 8, h / 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      const squash = player.squash;
      const sx = 1 + squash * 0.18;
      const sy = 1 - squash * 0.18;
      ctx.scale(sx, sy);
      ctx.shadowColor = skin.c2;
      ctx.shadowBlur = 24;
      const grad = ctx.createLinearGradient(-PLAYER_SIZE / 2, -PLAYER_SIZE / 2, PLAYER_SIZE / 2, PLAYER_SIZE / 2);
      grad.addColorStop(0, skin.c1);
      grad.addColorStop(1, skin.c2);
      ctx.fillStyle = grad;
      const r = 8;
      const s = PLAYER_SIZE;
      ctx.beginPath();
      ctx.moveTo(-s / 2 + r, -s / 2);
      ctx.arcTo(s / 2, -s / 2, s / 2, s / 2, r);
      ctx.arcTo(s / 2, s / 2, -s / 2, s / 2, r);
      ctx.arcTo(-s / 2, s / 2, -s / 2, -s / 2, r);
      ctx.arcTo(-s / 2, -s / 2, s / 2, -s / 2, r);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawObstacles() {
    for (const o of obstacles) {
      if (o.type === 'pipe') {
        const screenX = o.worldX - distance;
        if (screenX > W + 10 || screenX + o.width < -10) continue;
        ctx.save();
        ctx.shadowColor = '#4ff2ff';
        ctx.shadowBlur = 16;
        const gradTop = ctx.createLinearGradient(0, 0, 0, o.topHeight);
        gradTop.addColorStop(0, '#0f7a86');
        gradTop.addColorStop(1, '#4ff2ff');
        ctx.fillStyle = gradTop;
        ctx.fillRect(screenX, 0, o.width, o.topHeight);
        const gradBot = ctx.createLinearGradient(0, o.bottomY, 0, GROUND_Y);
        gradBot.addColorStop(0, '#4ff2ff');
        gradBot.addColorStop(1, '#0f7a86');
        ctx.fillStyle = gradBot;
        ctx.fillRect(screenX, o.bottomY, o.width, GROUND_Y - o.bottomY);
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(screenX + 1, 1, o.width - 2, Math.max(0, o.topHeight - 2));
        ctx.strokeRect(screenX + 1, o.bottomY + 1, o.width - 2, Math.max(0, GROUND_Y - o.bottomY - 2));
        ctx.restore();
        continue;
      }

      if (o.type === 'portal') {
        const screenX = o.worldX - distance;
        if (screenX > W + 20 || screenX < -20) continue;
        const color = o.mini ? '#7cf9ff' : '#ff9df7';
        ctx.save();
        ctx.globalAlpha = o.passed ? 0.35 : 0.85;
        ctx.shadowColor = color;
        ctx.shadowBlur = 24;
        const grad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
        grad.addColorStop(0, color);
        grad.addColorStop(1, o.mini ? '#0f4d86' : '#7a0068');
        ctx.fillStyle = grad;
        ctx.fillRect(screenX - 5, 0, 10, GROUND_Y);
        ctx.restore();
        continue;
      }

      if (o.type === 'gravityPortal') {
        const screenX = o.worldX - distance;
        if (screenX > W + 20 || screenX < -20) continue;
        const color = '#39ff8a';
        ctx.save();
        ctx.globalAlpha = o.passed ? 0.35 : 0.85;
        ctx.shadowColor = color;
        ctx.shadowBlur = 24;
        const grad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
        grad.addColorStop(0, '#ffb347');
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, '#ffb347');
        ctx.fillStyle = grad;
        ctx.fillRect(screenX - 5, 0, 10, GROUND_Y);
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 2;
        const midY = GROUND_Y / 2;
        ctx.beginPath();
        ctx.moveTo(screenX - 9, midY - 14);
        ctx.lineTo(screenX, midY - 24);
        ctx.lineTo(screenX + 9, midY - 14);
        ctx.moveTo(screenX - 9, midY + 14);
        ctx.lineTo(screenX, midY + 24);
        ctx.lineTo(screenX + 9, midY + 14);
        ctx.stroke();
        ctx.restore();
        continue;
      }

      if (o.type === 'orb') {
        const pos = orbScreenPos(o);
        if (pos.x > W + 30 || pos.x < -30) continue;
        const pulse = 0.75 + 0.25 * Math.sin(distance * 0.02 + o.worldX * 0.01);
        ctx.save();
        ctx.globalAlpha = o.used ? 0.35 : pulse;
        ctx.shadowColor = '#ffe14f';
        ctx.shadowBlur = 20;
        const grad = ctx.createRadialGradient(pos.x, pos.y, 2, pos.x, pos.y, o.radius);
        grad.addColorStop(0, '#fff8d0');
        grad.addColorStop(1, '#ffe14f');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, o.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        continue;
      }

      const r = obstacleScreenRect(o);
      if (r.x > W + 10 || r.x + r.w < -10) continue;
      ctx.save();
      ctx.shadowColor = '#ff3df0';
      ctx.shadowBlur = 16;
      const ceilSide = (o.side || 'floor') === 'ceil';
      if (o.type === 'spike') {
        const grad = ctx.createLinearGradient(r.x, r.y, r.x, r.y + r.h);
        if (ceilSide) {
          grad.addColorStop(0, '#7a0068');
          grad.addColorStop(0.85, '#ff3df0');
          grad.addColorStop(1, '#fff');
        } else {
          grad.addColorStop(0, '#fff');
          grad.addColorStop(0.15, '#ff3df0');
          grad.addColorStop(1, '#7a0068');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        if (ceilSide) {
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x + r.w / 2, r.y + r.h);
          ctx.lineTo(r.x + r.w, r.y);
        } else {
          ctx.moveTo(r.x, r.y + r.h);
          ctx.lineTo(r.x + r.w / 2, r.y);
          ctx.lineTo(r.x + r.w, r.y + r.h);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else if (o.type === 'pad') {
        ctx.shadowColor = '#39ff8a';
        const grad = ctx.createLinearGradient(r.x, r.y, r.x, r.y + r.h);
        grad.addColorStop(0, '#eaffdb');
        grad.addColorStop(1, '#39ff8a');
        ctx.fillStyle = o.triggered ? 'rgba(57,255,138,0.3)' : grad;
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
        ctx.beginPath();
        if (ceilSide) {
          ctx.moveTo(r.x + r.w / 2, r.y + r.h + 12);
          ctx.lineTo(r.x + r.w * 0.22, r.y + r.h - 2);
          ctx.lineTo(r.x + r.w * 0.78, r.y + r.h - 2);
        } else {
          ctx.moveTo(r.x + r.w / 2, r.y - 12);
          ctx.lineTo(r.x + r.w * 0.22, r.y + 2);
          ctx.lineTo(r.x + r.w * 0.78, r.y + 2);
        }
        ctx.closePath();
        ctx.fillStyle = o.triggered ? 'rgba(57,255,138,0.3)' : '#39ff8a';
        ctx.fill();
      } else {
        const grad = ctx.createLinearGradient(r.x, r.y, r.x, r.y + r.h);
        grad.addColorStop(0, '#4ff2ff');
        grad.addColorStop(1, '#0f7a86');
        ctx.fillStyle = grad;
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
      }
      ctx.restore();
    }
  }

  function drawFinishGate() {
    if (mode !== 'level' || !currentLevel) return;
    const screenX = currentLevel.length - distance;
    if (screenX > W + 20 || screenX < -20) return;
    ctx.save();
    ctx.shadowColor = '#ffe14f';
    ctx.shadowBlur = 26;
    const grad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    grad.addColorStop(0, '#ffe14f');
    grad.addColorStop(1, '#ff3df0');
    ctx.fillStyle = grad;
    ctx.fillRect(screenX - 4, 0, 8, GROUND_Y);
    ctx.restore();
  }

  function drawCheckpointMarker() {
    if (mode !== 'level' || levelPlayMode !== 'practice' || !practiceCheckpoint) return;
    const screenX = practiceCheckpoint.distance - distance;
    if (screenX > W + 20 || screenX < -20) return;
    ctx.save();
    ctx.shadowColor = '#ffe14f';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = '#ffe14f';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(screenX, 0);
    ctx.lineTo(screenX, GROUND_Y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  function drawBursts() {
    for (const parts of bursts) {
      for (const p of parts) {
        if (p.life <= 0) continue;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        const s = 6 * p.life;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        ctx.restore();
      }
    }
  }

  function render() {
    ctx.clearRect(0, 0, W, H);
    drawBackground(mode === 'ship' ? 1 : gravityDir);
    drawTrail();
    drawFinishGate();
    drawCheckpointMarker();
    drawObstacles();
    drawPlayer();
    drawBursts();
  }

  function renderEditor() {
    distance = editorScroll;
    const lengthVal = getEditorLength();

    ctx.clearRect(0, 0, W, H);
    drawBackground(1);

    const finishX = lengthVal - editorScroll;
    if (finishX > -20 && finishX < W + 20) {
      ctx.save();
      ctx.shadowColor = '#ffe14f';
      ctx.shadowBlur = 26;
      const grad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
      grad.addColorStop(0, '#ffe14f');
      grad.addColorStop(1, '#ff3df0');
      ctx.fillStyle = grad;
      ctx.fillRect(finishX - 4, 0, 8, GROUND_Y);
      ctx.restore();
    }

    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '11px Orbitron, sans-serif';
    for (let wx = 0; wx <= lengthVal; wx += 200) {
      const sx = wx - editorScroll;
      if (sx < -20 || sx > W + 20) continue;
      ctx.beginPath();
      ctx.moveTo(sx, GROUND_Y - 10);
      ctx.lineTo(sx, GROUND_Y + 10);
      ctx.stroke();
      ctx.fillText(String(wx), sx + 3, GROUND_Y - 14);
    }
    ctx.restore();

    drawObstacles();

    if (editorHoverX !== null && editorTool !== 'erase') {
      const worldX = Math.round((editorHoverX + editorScroll) / 10) * 10;
      const ghosts = buildGhostObstacles(editorTool, worldX);
      const real = obstacles;
      obstacles = ghosts;
      ctx.save();
      ctx.globalAlpha = 0.45;
      drawObstacles();
      ctx.restore();
      obstacles = real;
    }

    ctx.save();
    ctx.fillStyle = '#4ff2ff';
    ctx.font = '14px Orbitron, sans-serif';
    ctx.shadowColor = '#4ff2ff';
    ctx.shadowBlur = 6;
    ctx.fillText('EDITOR - ' + Math.round(editorScroll) + ' / ' + lengthVal, 16, 24);
    ctx.restore();
  }

  function loop(now) {
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    dt = Math.min(dt, 1 / 30);

    if (state === 'editor') {
      renderEditor();
      requestAnimationFrame(loop);
      return;
    }

    update(dt);
    updateBursts(dt);
    render();

    if (state === 'playing' && mode !== 'level') {
      scoreEl.textContent = Math.floor(distance / 10);
    }

    requestAnimationFrame(loop);
  }

  resize();
  resetPlayer();
  renderRarityLegend();
  renderMenu();
  updateMuteBtn();
  if (window.NeonAudio) NeonAudio.setTheme(NeonAudio.THEMES.menu);
  requestAnimationFrame(loop);
})();
