/* ==========================================
   Egypt Math Game - Client Logic
   ========================================== */

// Game Constants and Parameters
const MAX_HP = 10;

// Companion Speech Data
const COMPANIONS = {
    scarab: {
        name: "聖甲蟲",
        avatar: "assets/images/scarab_avatar.png",
        quotes: {
            welcome: "「我是聖甲蟲小精靈，用你的數學智慧跟著我走，一定能解開機關！」",
            correct: "「做得好！這是太陽神的智慧，通道打開了一點！」",
            incorrect: "「噢！這一定是個陷阱！再仔細算算，別慌張。」",
            lowHp: "「火把生命正在減弱！加油，冒險隊員，再仔細思考一下！」",
            stage1: "「眼前就是『阿努比斯的黃金天秤』，第一關的數量位值與加減乘除題目來了，專心思考！」",
            stage2: "「我們來到了『甲蟲壁畫的分數迷宮』！這裡的題目充滿了分數、小數與計量單位，跟上我！」",
            stage3: "「這是最後的『人面獅身最後提問』！幾何、規律、併式與統計表格... 終點就在眼前了！」",
            victory: "「太不可思議了！你用完美的數學頭腦解開了圖坦卡門的詛咒！我們成功逃出金字塔了！」",
            defeat: "「火把全熄滅了... 密室大門被沙塵淹沒，我們被困在裡面了...」"
        }
    },
    bastet: {
        name: "巴斯特貓神",
        avatar: "assets/images/bastet_avatar.png",
        quotes: {
            welcome: "「喵～我是巴斯特貓神！放心吧，本喵會用敏捷的身手保護你的，只要你的數學算得夠快！」",
            correct: "「太棒了喵！本喵高興得想抓魚吃，繼續前進！」",
            incorrect: "「喵嗚！好痛，觸發了暗箭機關！你算錯了啦喵！」",
            lowHp: "「火把快熄滅了喵！本喵的尾巴都嚇直了，加把勁想清楚答案喵！」",
            stage1: "「第一關『黃金天秤』開始喵！數值和計算可難不倒我們！」",
            stage2: "「第二關『分數迷宮』到了喵！注意那些分母和小數點，別看漏了喵！」",
            stage3: "「第三關『最後提問』！衝啊喵！把所有的圖形和密碼規律全部解開！」",
            victory: "「喵呀！我們真的衝出金字塔了！你的大腦簡真比最閃亮的黃金還要耀眼喵！」",
            defeat: "「喵嗚嗚... 火把都滅了，本喵要變成貓咪木乃伊了嗎，嗚嗚...」"
        }
    },
    anubis: {
        name: "阿努比斯",
        avatar: "assets/images/anubis_avatar.png",
        quotes: {
            welcome: "「我是阿努比斯。此行乃是靈魂的考驗，真理天秤的兩端容不下 any 虛妄，用數學證實你的價值吧。」",
            correct: "「真理天秤維持了平衡。你的智慧得到了眾神的認可。」",
            incorrect: "「天秤傾斜了！你被詛咒的陰影籠罩，小心行事。」",
            lowHp: "「光芒即將消逝，火把漸熄。靜下心來，回顧所學。」",
            stage1: "「『黃金天秤』已開啟。審判你的數值與運算概念是否踏實。」",
            stage2: "「已入『分數迷宮』。此處乃是衡量細心與單位換算之所。」",
            stage3: "「人面獅身在金字塔頂端等候。最後的幾何與邏輯考驗，不可退縮。」",
            victory: "「不可思議。你用無瑕的智慧通過了審判，法老的詛咒已被消除，前路已開。」",
            defeat: "「火把全熄，天秤徹底失衡。你的靈魂將永遠留在這座黃金陵墓中...」"
        }
    },
    sphinx: {
        name: "人面獅身",
        avatar: "assets/images/sphinx_avatar.png",
        quotes: {
            welcome: "「我是斯芬克斯。三千年來，無數凡人挑戰我的謎題都失敗了。你，能用數學逃出這片迷宮嗎？」",
            correct: "「精彩！這題連大祭司也得想上半天，你果然有些本事！」",
            incorrect: "「鋪張的錯誤！巨石又落下一寸，你離深淵更近了！」",
            lowHp: "「你的火把就要燃盡了，凡人。難道你的智慧到此為止了嗎？」",
            stage1: "「準備好應對『黃金天秤』的位值與基礎四則算術了嗎？希望你的大腦轉得夠快！」",
            stage2: "「哼，居然來到了『分數迷宮』。接下來的度量衡與分數小數，才是真正的考驗！」",
            stage3: "「歡迎來到我的主場『最後提問』！只要答錯，巨石便會落下，用幾何公式為自己爭取生路吧！」",
            victory: "「我認輸了！在你的終極智慧面前，再複雜的謎題也形同虛設。走吧，去迎接你的陽光！」",
            defeat: "「火把全滅，沙塵淹埋了一切。又一個凡人成為了金字塔的祭品...」"
        }
    }
};

// Synth Sound Engine using Web Audio API
const Synth = {
    ctx: null,
    
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    
    playCorrect() {
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = "sine";
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + 0.08);
        osc.frequency.setValueAtTime(784, now + 0.16);
        
        osc.start(now);
        osc.stop(now + 0.3);
    },
    
    playIncorrect() {
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = "sawtooth";
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.35);
        
        osc.start(now);
        osc.stop(now + 0.4);
    },
    
    playCoin() {
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = "triangle";
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        
        osc.frequency.setValueAtTime(784, now);
        osc.frequency.setValueAtTime(1046, now + 0.06);
        
        osc.start(now);
        osc.stop(now + 0.25);
    },
    
    playAlert() {
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = "sine";
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        
        osc.frequency.setValueAtTime(880, now);
        
        osc.start(now);
        osc.stop(now + 0.15);
    },

    playVictory() {
        this.init();
        const now = this.ctx.currentTime;
        
        // detuned synthesizer fanfare brass trumpets
        const playTrumpet = (freq, delay, duration, volume = 0.08) => {
            const osc = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(freq, now + delay);
            
            osc2.type = "triangle";
            osc2.frequency.setValueAtTime(freq * 1.005, now + delay); 
            
            gain.gain.setValueAtTime(volume, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration - 0.02);
            
            osc.connect(gain);
            osc2.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now + delay);
            osc2.start(now + delay);
            
            osc.stop(now + delay + duration);
            osc2.stop(now + delay + duration);
        };
        
        // Fanfare major chord arpeggio
        playTrumpet(261.63, 0.0, 0.15); // C4
        playTrumpet(329.63, 0.15, 0.15); // E4
        playTrumpet(392.00, 0.3, 0.15); // G4
        playTrumpet(523.25, 0.45, 0.3); // C5
        
        // Final Chord (Triumphant C Major)
        playTrumpet(523.25, 0.75, 1.2, 0.06); // C5
        playTrumpet(659.25, 0.75, 1.2, 0.06); // E5
        playTrumpet(784.00, 0.75, 1.2, 0.06); // G5
        playTrumpet(1046.50, 0.75, 1.2, 0.04); // C6

        // Generate synthetic crowd cheering noise (applause)
        try {
            const bufferSize = this.ctx.sampleRate * 2.0; 
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            
            // White Noise Generation
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            
            // Filter noise into a cheering frequency spectrum (Bandpass around 900Hz)
            const filter = this.ctx.createBiquadFilter();
            filter.type = "bandpass";
            filter.frequency.value = 900;
            filter.Q.value = 1.2;
            
            const noiseGain = this.ctx.createGain();
            noiseGain.gain.setValueAtTime(0, now);
            noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.3);
            noiseGain.gain.setValueAtTime(0.15, now + 1.2);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
            
            noise.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(this.ctx.destination);
            
            noise.start(now);
            noise.stop(now + 2.0);
        } catch (e) {
            console.log("Synthetic cheer audio failed: ", e);
        }
    },

    playDefeat() {
        this.init();
        const now = this.ctx.currentTime;
        
        const playNote = (freq, delay, duration) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sawtooth";
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            gain.gain.setValueAtTime(0.1, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration - 0.02);
            osc.frequency.setValueAtTime(freq, now + delay);
            osc.start(now + delay);
            osc.stop(now + delay + duration);
        };
        
        playNote(392, 0.0, 0.25); 
        playNote(349, 0.25, 0.25); 
        playNote(311, 0.5, 0.25); 
        playNote(261, 0.75, 0.6); 
    }
};

// ==========================================
// Fireworks Canvas Animation System
// ==========================================
const Fireworks = {
    canvas: null,
    ctx: null,
    animationFrameId: null,
    particles: [],
    rockets: [],
    active: false,

    init() {
        this.canvas = document.getElementById("fireworks-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.resize();
        window.addEventListener("resize", () => this.resize());
    },

    resize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    },

    start() {
        this.active = true;
        this.canvas.style.display = "block";
        this.particles = [];
        this.rockets = [];
        this.loop();
    },

    stop() {
        this.active = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.canvas) {
            this.canvas.style.display = "none";
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    loop() {
        if (!this.active) return;
        this.animationFrameId = requestAnimationFrame(() => this.loop());

        // Semi-transparent clean to leave particle trails
        this.ctx.fillStyle = "rgba(10, 8, 6, 0.2)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Spawn rockets randomly
        if (Math.random() < 0.06) {
            this.spawnRocket();
        }

        // Update & Draw Rockets
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const r = this.rockets[i];
            r.update();
            r.draw(this.ctx);
            if (r.exploded) {
                this.createExplosion(r.x, r.y, r.color);
                this.rockets.splice(i, 1);
            }
        }

        // Update & Draw Explosion Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            p.draw(this.ctx);
            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
    },

    spawnRocket() {
        const startX = Math.random() * this.canvas.width;
        const startY = this.canvas.height;
        const targetX = Math.random() * this.canvas.width;
        const targetY = Math.random() * (this.canvas.height * 0.45); // Explode in top half
        const color = `hsl(${Math.random() * 360}, 100%, 65%)`;
        this.rockets.push(new FireworkRocket(startX, startY, targetX, targetY, color));
    },

    createExplosion(x, y, color) {
        const count = 35 + Math.floor(Math.random() * 20);
        for (let i = 0; i < count; i++) {
            this.particles.push(new FireworkParticle(x, y, color));
        }
    }
};

class FireworkRocket {
    constructor(x, y, tx, ty, color) {
        this.x = x;
        this.y = y;
        this.tx = tx;
        this.ty = ty;
        this.color = color;
        this.speed = 4 + Math.random() * 3;
        this.exploded = false;
        
        const dx = tx - x;
        const dy = ty - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.vx = (dx / dist) * this.speed;
        this.vy = (dy / dist) * this.speed;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Trigger explosion when rocket reaches or passes target height
        if (this.vy < 0 && this.y <= this.ty) {
            this.exploded = true;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class FireworkParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.gravity = 0.07;
        this.friction = 0.97;
        this.alpha = 1;
        this.decay = 0.012 + Math.random() * 0.015;
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// Game State
let gameState = {
    playerName: "",
    companionId: "scarab",
    trialMode: "amulet", // "mask", "dagger", "amulet"
    maxHp: MAX_HP,
    totalQuestions: 50,
    currentQuestionIndex: 0, // 0 to max-1
    score: 0,
    hp: MAX_HP, 
    questions: [], // shuffled questions array
    isGameOver: false,
    godMode: false
};

// Helper: Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Assign unique indices to QUESTIONS_DATABASE when database is loaded
QUESTIONS_DATABASE.forEach((q, i) => {
    q.originalIndex = i;
});

// Stage Definition based on the original database index of the question
function getStage(index) {
    const q = gameState.questions[index];
    const origIdx = q.originalIndex;
    if (origIdx < 17) {
        return 1; // Stage 1: 阿努比斯的黃金天秤 (Q1-17)
    } else if (origIdx < 34) {
        return 2; // Stage 2: 甲蟲壁畫的分數迷宮 (Q18-34)
    } else {
        return 3; // Stage 3: 人面獅身的最後提問 (Q35-50)
    }
}

// Navigate to Mode Selection Screen (validates name)
function goToModeScreen() {
    const nameInput = document.getElementById("player-name").value.trim();
    
    if (!nameInput) {
        alert("「考古調查隊冒險隊員，請務必輸入你的姓名，否則金字塔傳送機關將無法為你開啟！」");
        document.getElementById("player-name").focus();
        return;
    }
    
    gameState.playerName = nameInput;

    showScreen("mode-screen");
    Synth.playCoin();
}

// Initialize and Start Game
function initGame() {
    const activeCompanionCard = document.querySelector(".companion-card.active");
    gameState.companionId = activeCompanionCard ? activeCompanionCard.dataset.id : "scarab";

    // Read selected Trial Mode
    const activeModeCard = document.querySelector(".mode-card.active");
    gameState.trialMode = activeModeCard ? activeModeCard.dataset.mode : "amulet";
    
    if (gameState.trialMode === "mask") {
        gameState.maxHp = 3;
        gameState.totalQuestions = 25;
    } else if (gameState.trialMode === "dagger") {
        gameState.maxHp = 7;
        gameState.totalQuestions = 40;
    } else {
        gameState.maxHp = MAX_HP; // 10
        gameState.totalQuestions = 50;
    }

    gameState.currentQuestionIndex = 0;
    gameState.score = 0;
    gameState.hp = gameState.maxHp;
    gameState.isGameOver = false;
    gameState.godMode = false; // Reset godMode on game start

    // Load and shuffle questions based on mode proportion
    let stage1Pool = QUESTIONS_DATABASE.slice(0, 17);
    let stage2Pool = QUESTIONS_DATABASE.slice(17, 34);
    let stage3Pool = QUESTIONS_DATABASE.slice(34, 50);

    shuffleArray(stage1Pool);
    shuffleArray(stage2Pool);
    shuffleArray(stage3Pool);

    let selectedQuestions = [];
    if (gameState.trialMode === "mask") {
        selectedQuestions = [
            ...stage1Pool.slice(0, 8),
            ...stage2Pool.slice(0, 8),
            ...stage3Pool.slice(0, 9)
        ];
    } else if (gameState.trialMode === "dagger") {
        selectedQuestions = [
            ...stage1Pool.slice(0, 13),
            ...stage2Pool.slice(0, 13),
            ...stage3Pool.slice(0, 14)
        ];
    } else {
        selectedQuestions = [
            ...stage1Pool,
            ...stage2Pool,
            ...stage3Pool
        ];
    }

    gameState.questions = selectedQuestions;

    // Setup HUD UI
    document.getElementById("hud-player-name").textContent = gameState.playerName;
    updateHUD();

    showScreen("game-screen");

    const comp = COMPANIONS[gameState.companionId];
    setCompanionQuote(comp.quotes.welcome + " " + comp.quotes.stage1);
    updateCompanionAvatar(comp.avatar, comp.name);

    Synth.playCoin();
    loadQuestion();
}

// Update HUD Display Elements
function updateHUD() {
    // HP Torches Display: 🔥 for lit, ⚫ for extinguished
    const hpContainer = document.getElementById("hud-hp-hearts");
    hpContainer.textContent = "🔥".repeat(gameState.hp) + "⚫".repeat(gameState.maxHp - gameState.hp);

    // Score and Progress
    document.getElementById("hud-score").textContent = `${Math.min(100, Math.round(gameState.score))} / 100`;
    document.getElementById("question-progress").textContent = `進度: ${gameState.currentQuestionIndex + 1} / ${gameState.totalQuestions}`;
}

// Set Companion Speaking Bubble
function setCompanionQuote(text) {
    document.getElementById("companion-dialogue").textContent = text;
}

function updateCompanionAvatar(avatar, name) {
    const avatarEl = document.getElementById("active-companion-avatar");
    avatarEl.innerHTML = `<img src="${avatar}" alt="${name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    
    const titleDiv = document.getElementById("active-companion-title");
    titleDiv.textContent = name;
}

// Helper to format fraction notations (X/Y) as vertical fractions
function formatFractions(text) {
    if (!text) return "";
    return text.replace(/(\d+)\/(\d+)/g, '<span class="fraction"><span class="numerator">$1</span><span class="denominator">$2</span></span>');
}

// Display Next Question
function loadQuestion() {
    const qIndex = gameState.currentQuestionIndex;
    const q = gameState.questions[qIndex];

    // Check Stage Transitions
    const currentStage = getStage(qIndex);
    const prevStage = qIndex > 0 ? getStage(qIndex - 1) : null;
    
    // Update UI Stage Title
    const stageNames = {
        1: "關卡 1/3：阿努比斯的黃金天秤",
        2: "關卡 2/3：甲蟲壁畫的分數迷宮",
        3: "關卡 3/3：人面獅身的最後提問"
    };
    document.getElementById("current-stage-title").textContent = stageNames[currentStage];
    
    if (prevStage !== null && currentStage !== prevStage) {
        let transitionQuote = "";
        if (currentStage === 2) transitionQuote = COMPANIONS[gameState.companionId].quotes.stage2;
        if (currentStage === 3) transitionQuote = COMPANIONS[gameState.companionId].quotes.stage3;
        setCompanionQuote(transitionQuote);
        Synth.playCoin();
    }

    // Set question text
    document.getElementById("question-text").innerHTML = formatFractions(q.text);

    // Handle Diagrams / Media
    const mediaContainer = document.getElementById("question-media-container");
    const imgEl = document.getElementById("question-img");
    if (q.image) {
        imgEl.src = q.image;
        mediaContainer.classList.remove("hidden");
    } else {
        imgEl.src = "";
        mediaContainer.classList.add("hidden");
    }

    // Handle HTML tables
    const tableContainer = document.getElementById("question-table-container");
    tableContainer.innerHTML = "";
    if (q.htmlTable) {
        tableContainer.classList.remove("hidden");
        if (q.htmlTable === "totem") {
            tableContainer.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>圖騰</th>
                            <th>數量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>聖甲蟲 𓆣</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>老鷹 𓅂</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>貓 𓃠</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>狼 𓃥</td>
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (q.htmlTable === "mana") {
            tableContainer.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>起點 和 終點</th>
                            <th>吉薩金字塔 𓉴</th>
                            <th>塞加拉金字塔 𓉴</th>
                            <th>阿布西爾金字塔 𓉴</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>吉薩金字塔 𓉴</th>
                            <td>0</td>
                            <td>15</td>
                            <td>40</td>
                        </tr>
                        <tr>
                            <th>塞加拉金字塔 𓉴</th>
                            <td>15</td>
                            <td>0</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <th>阿布西爾金字塔 𓉴</th>
                            <td>40</td>
                            <td>25</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            `;
        }
    } else {
        tableContainer.classList.add("hidden");
    }

    // Render Options
    const optionsCopy = [...q.options];
    shuffleArray(optionsCopy);

    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((btn, idx) => {
        const optionData = optionsCopy[idx];
        btn.className = "option-btn"; 
        btn.disabled = false;
        
        const indicator = btn.querySelector(".opt-indicator");
        indicator.textContent = String.fromCharCode(65 + idx); 
        
        const optTextSpan = btn.querySelector(".opt-text");
        optTextSpan.innerHTML = formatFractions(optionData.text);

        btn.dataset.originalLetter = optionData.letter;
    });
}

// Process Option Selection
function handleOptionClick(btn) {
    if (btn.disabled) return;
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(b => b.disabled = true);

    const qIndex = gameState.currentQuestionIndex;
    const q = gameState.questions[qIndex];
    const selectedLetter = btn.dataset.originalLetter; 

    const isCorrect = (selectedLetter === q.answer);

    if (isCorrect) {
        Synth.playCorrect();
        btn.classList.add("correct");
        
        // Calculate points based on the trial question count
        const questionValue = 100 / gameState.totalQuestions;
        gameState.score = Math.min(100, gameState.score + questionValue); 

        setCompanionQuote(COMPANIONS[gameState.companionId].quotes.correct);

        setTimeout(() => {
            nextQuestion();
        }, 1200);
    } else {
        Synth.playIncorrect();
        btn.classList.add("incorrect");
        if (!gameState.godMode) {
            gameState.hp--;
        } else {
            showDebugNotification("無敵模式：免扣火把！");
        }
        
        // Warning when low on torches (HP <= 40% of max HP)
        if (gameState.hp <= gameState.maxHp * 0.4) {
            setCompanionQuote(COMPANIONS[gameState.companionId].quotes.lowHp);
        } else {
            setCompanionQuote(COMPANIONS[gameState.companionId].quotes.incorrect);
        }

        updateHUD();

        // Check if game over
        if (gameState.hp <= 0) {
            setTimeout(() => {
                endGame(false, "hp_out");
            }, 1200);
        } else {
            setTimeout(() => {
                nextQuestion();
            }, 1200);
        }
    }
}

// Go to next question or end game
function nextQuestion() {
    gameState.currentQuestionIndex++;
    if (gameState.currentQuestionIndex >= gameState.totalQuestions) {
        endGame(true, "victory");
    } else {
        updateHUD();
        loadQuestion();
    }
}

// End Game Function
function endGame(isVictory, reason) {
    gameState.isGameOver = true;

    const titleEl = document.getElementById("result-title");
    const emojiEl = document.getElementById("result-emoji");
    const boxEl = document.querySelector(".result-box");
    
    const evalTextEl = document.getElementById("res-companion-text");
    const evalAvatar = document.getElementById("res-companion-avatar");
    const evalTitle = document.getElementById("res-companion-title");
    
    const comp = COMPANIONS[gameState.companionId];
    evalAvatar.innerHTML = `<img src="${comp.avatar}" alt="${comp.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    evalTitle.textContent = comp.name;

    if (isVictory) {
        boxEl.className = "result-box scroll-bg victory";
        titleEl.textContent = "解開詛咒！順利逃出！";
        emojiEl.innerHTML = `<img src="assets/images/horus_eye.png" alt="發光漂浮的荷魯斯之眼" class="victory-horus-eye">`;
        evalTextEl.textContent = comp.quotes.victory;
        Synth.playVictory();
        Fireworks.start(); // Trigger fireworks overlay
    } else {
        boxEl.className = "result-box scroll-bg defeat";
        titleEl.textContent = "火把全熄！冒險失敗...";
        emojiEl.innerHTML = "<span>💀</span>";
        evalTextEl.textContent = comp.quotes.defeat;
        Synth.playDefeat();
    }

    // Stats filling
    document.getElementById("res-player-name").textContent = gameState.playerName;
    document.getElementById("res-companion").textContent = comp.name;
    document.getElementById("res-score").textContent = `${Math.min(100, Math.round(gameState.score))} / 100 分`;
    document.getElementById("res-progress").textContent = `${Math.min(gameState.totalQuestions, gameState.currentQuestionIndex)} / ${gameState.totalQuestions} 題`;

    showScreen("result-screen");
}

// Show / Switch Screen
function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach(s => {
        if (s.id === screenId) {
            s.classList.remove("hidden");
        } else {
            s.classList.add("hidden");
        }
    });
}

// ==========================================
// Developer Debug Shortcuts & Notifications
// ==========================================
function showDebugNotification(text) {
    console.log(text);
    let toast = document.getElementById("debug-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "debug-toast";
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "rgba(229, 169, 60, 0.95)";
        toast.style.color = "#0a0806";
        toast.style.padding = "10px 20px";
        toast.style.borderRadius = "4px";
        toast.style.fontFamily = "sans-serif";
        toast.style.fontWeight = "bold";
        toast.style.zIndex = "9999";
        toast.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.6)";
        toast.style.pointerEvents = "none";
        toast.style.transition = "opacity 0.3s";
        document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.style.opacity = "1";
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
        toast.style.opacity = "0";
    }, 1500);
}

function debugCorrectAnswer() {
    if (gameState.isGameOver || !gameState.playerName || !gameState.questions || !gameState.questions.length) return;
    const qIndex = gameState.currentQuestionIndex;
    const q = gameState.questions[qIndex];
    const correctAnswer = q.answer;
    const optionButtons = document.querySelectorAll(".option-btn");
    let targetBtn = null;
    optionButtons.forEach(btn => {
        if (btn.dataset.originalLetter === correctAnswer) {
            targetBtn = btn;
        }
    });
    if (targetBtn) {
        showDebugNotification("F2: 自動選對！");
        handleOptionClick(targetBtn);
    }
}

function toggleGodMode() {
    if (gameState.isGameOver || !gameState.playerName) return;
    gameState.godMode = !gameState.godMode;
    showDebugNotification("F3: 無敵模式 " + (gameState.godMode ? "開啟 🔥" : "關閉 ❌"));
}

function debugInstantVictory() {
    if (gameState.isGameOver || !gameState.playerName) return;
    showDebugNotification("F4: 瞬間通關！");
    gameState.score = 100;
    gameState.currentQuestionIndex = gameState.totalQuestions;
    endGame(true, "victory");
}

function debugJumpToQuestion() {
    if (gameState.isGameOver || !gameState.playerName || !gameState.questions || !gameState.questions.length) {
        alert("請先開始遊戲再使用跳題功能！");
        return;
    }
    const maxQ = gameState.totalQuestions;
    const input = prompt(`請輸入要跳轉的當前進度題號 (1 - ${maxQ})，或輸入 # 加「原資料庫題號」（例如 #39）跳至特定題目：`);
    if (input === null) return;
    
    const trimmed = input.trim();
    if (trimmed.startsWith("#")) {
        const origNum = parseInt(trimmed.substring(1), 10);
        if (isNaN(origNum) || origNum < 1 || origNum > QUESTIONS_DATABASE.length) {
            alert(`請輸入有效的原資料庫題號 (1 - ${QUESTIONS_DATABASE.length})！`);
            return;
        }
        const targetOrigIndex = origNum - 1;
        const idx = gameState.questions.findIndex(q => q.originalIndex === targetOrigIndex);
        if (idx !== -1) {
            gameState.currentQuestionIndex = idx;
            showDebugNotification(`F8: 已跳至原資料庫第 ${origNum} 題 (當前進度第 ${idx + 1} 題)`);
            updateHUD();
            loadQuestion();
        } else {
            alert(`在目前的試煉難度題庫中找不到原資料庫第 ${origNum} 題！\n（部分模式只會隨機抽選部分題目，請切換至「心臟聖甲蟲護身符」完整 50 題模式）`);
        }
    } else {
        const num = parseInt(trimmed, 10);
        if (isNaN(num) || num < 1 || num > maxQ) {
            alert(`請輸入 1 到 ${maxQ} 之間的有效數字！`);
            return;
        }
        gameState.currentQuestionIndex = num - 1;
        showDebugNotification(`F8: 已跳轉至當前進度第 ${num} 題`);
        updateHUD();
        loadQuestion();
    }
}

// ==========================================
// DOM Event Listeners & Startup
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Init canvas fireworks
    Fireworks.init();

    const companionCards = document.querySelectorAll(".companion-card");
    companionCards.forEach(card => {
        card.addEventListener("click", () => {
            companionCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            Synth.playCoin();
        });
    });

    // Add event listeners for Pharaoh's Trial Mode Selection Cards
    const modeCards = document.querySelectorAll(".mode-card");
    modeCards.forEach(card => {
        card.addEventListener("click", () => {
            modeCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            Synth.playCoin();
        });
    });

    // Screen transitions
    document.getElementById("to-mode-screen-btn").addEventListener("click", () => {
        goToModeScreen();
    });

    document.getElementById("back-to-entrance-btn").addEventListener("click", () => {
        showScreen("entrance-screen");
        Synth.playCoin();
    });

    document.getElementById("start-game-btn").addEventListener("click", () => {
        initGame();
    });

    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            handleOptionClick(btn);
        });
    });

    document.getElementById("restart-btn").addEventListener("click", () => {
        Fireworks.stop(); // Stop fireworks animation
        showScreen("entrance-screen");
    });

    // Register developer debug hotkeys
    window.addEventListener("keydown", (e) => {
        if (e.key === "F2") {
            e.preventDefault();
            debugCorrectAnswer();
        } else if (e.key === "F3") {
            e.preventDefault();
            toggleGodMode();
        } else if (e.key === "F4") {
            e.preventDefault();
            debugInstantVictory();
        } else if (e.key === "F8") {
            e.preventDefault();
            debugJumpToQuestion();
        }
    });
});
