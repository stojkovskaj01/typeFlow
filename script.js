
// ------------------------------------------------------
// LOAD CONTENT
// ------------------------------------------------------

const {
    passages,
    tips,
    categoryNames
} = window.TypeFlowContent;

const $ = (id) => document.getElementById(id);


// ------------------------------------------------------
// APPLICATION STATE
// ------------------------------------------------------

let category = "mix";
let duration = 60;
let level = "medium";

let passage = "";
let typed = "";

let startedAt = null;
let timerId = null;

let finished = false;

let soundOn = false;
let audioContext = null;

let history = [];

try {
    history = JSON.parse(
        localStorage.getItem("typeflow-sessions") || "[]"
    );
} catch {
    history = [];
}

let lastCategory = "";
let lastTipIndex = -1;

// Timers for temporary keyboard feedback
const keyFeedbackTimers = new Map();


// ------------------------------------------------------
// KEYBOARD HELPERS
// ------------------------------------------------------

function getKeyboardLabel(char) {
    if (char === " ") return "SPACE";
    return char.toUpperCase();
}

function getKeyboardKeys() {
    return [...document.querySelectorAll(".key-row span")];
}

function findKeyboardKey(char) {
    const label = getKeyboardLabel(char);

    return getKeyboardKeys().find(
        key => key.textContent.trim() === label
    );
}


// ------------------------------------------------------
// TIME FORMATTING
// ------------------------------------------------------

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}


// ------------------------------------------------------
// TEMPORARY KEY FEEDBACK
// Green and red disappear automatically.
// ------------------------------------------------------

function showKeyFeedback(key, className) {
    if (!key) return;

    const previousTimer = keyFeedbackTimers.get(key);

    if (previousTimer) {
        clearTimeout(previousTimer);
    }

    key.classList.remove("correct", "incorrect");
    key.classList.add(className);

    const timer = setTimeout(() => {
        key.classList.remove(className);
        keyFeedbackTimers.delete(key);
    }, 300);

    keyFeedbackTimers.set(key, timer);
}


// ------------------------------------------------------
// CHOOSE RANDOM PASSAGE
// ------------------------------------------------------

function choosePassage() {
    let selected = category;

    if (selected === "mix") {
        const choices = Object.keys(passages)
            .filter(item => item !== lastCategory);

        selected = choices[
            Math.floor(Math.random() * choices.length)
            ];
    }

    lastCategory = selected;

    const options = passages[selected][level];

    passage = options[
        Math.floor(Math.random() * options.length)
        ];

    $("textTag").textContent = categoryNames[selected];

    $("textMeta").textContent =
        `${level[0].toUpperCase() + level.slice(1)} · English passage`;
}


// ------------------------------------------------------
// RESET KEYBOARD
// ------------------------------------------------------

function resetKeyboard() {
    keyFeedbackTimers.forEach(timer => clearTimeout(timer));
    keyFeedbackTimers.clear();

    getKeyboardKeys().forEach(key => {
        key.classList.remove(
            "active",
            "correct",
            "incorrect",
            "key-press",
            "heat-1",
            "heat-2",
            "heat-3"
        );

        key.style.removeProperty("--error-level");
        key.style.removeProperty("--error-count");
    });
}


// ------------------------------------------------------
// RESET TEST
// ------------------------------------------------------

function resetTest(focus = true) {
    clearInterval(timerId);

    timerId = null;
    startedAt = null;

    typed = "";
    finished = false;

    choosePassage();

    $("startOverlay").classList.remove("hidden");

    $("typingStatus").innerHTML =
        '<i class="status-dot"></i> Waiting for your first keystroke';

    $("time").innerHTML = duration === 0
        ? '∞<small>UP</small>'
        : formatTime(duration);

    $("timeMode").textContent = duration === 0
        ? "NO LIMIT"
        : "COUNTDOWN";

    $("wpm").textContent = "0";
    $("accuracy").innerHTML = '100<small>%</small>';
    $("errors").textContent = "0";

    $("progressText").textContent = "0%";
    $("progressBar").style.width = "0%";

    $("resultCard").classList.add("hidden");

    $("finishBtn").disabled = false;

    resetKeyboard();

    const heatmap = $("heatmapContainer");

    if (heatmap) {
        heatmap.innerHTML = "";
        heatmap.classList.add("hidden");
    }

    renderPassage();
    highlightKey(passage[0]);

    showTip();

    if (focus) {
        $("quoteArea").focus();
    }
}


// ------------------------------------------------------
// RENDER PASSAGE
// ------------------------------------------------------

function renderPassage() {
    const holder = $("typingText");

    holder.innerHTML = "";

    [...passage].forEach((char, index) => {
        const span = document.createElement("span");

        span.textContent = char;

        if (index < typed.length) {
            span.className =
                typed[index] === char
                    ? "correct"
                    : "incorrect";

        } else if (index === typed.length && !finished) {
            span.className = "cursor";
        }

        holder.appendChild(span);
    });
}


// ------------------------------------------------------
// START TEST
// Timer starts with the first typed character.
// ------------------------------------------------------

function startTest() {
    if (startedAt || finished) {
        return;
    }

    startedAt = Date.now();

    $("startOverlay").classList.add("hidden");

    $("typingStatus").innerHTML =
        '<i class="status-dot"></i> In the flow · keep going';

    timerId = setInterval(updateTimer, 100);
}


// ------------------------------------------------------
// CALCULATE RESULTS
// ------------------------------------------------------

function calculate() {
    let correct = 0;
    let errors = 0;

    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === passage[i]) {
            correct++;
        } else {
            errors++;
        }
    }

    const elapsed = startedAt
        ? Math.max(0.1, (Date.now() - startedAt) / 60000)
        : 0;

    const wpm = elapsed
        ? Math.round((correct / 5) / elapsed)
        : 0;

    const accuracy = typed.length
        ? Math.round(correct / typed.length * 100)
        : 100;

    return {
        correct,
        errors,
        wpm,
        accuracy
    };
}


// ------------------------------------------------------
// UPDATE STATISTICS
// ------------------------------------------------------

function updateStats() {
    const stats = calculate();

    $("wpm").textContent = stats.wpm;

    $("accuracy").innerHTML =
        `${stats.accuracy}<small>%</small>`;

    $("errors").textContent = stats.errors;

    const progress = Math.min(
        100,
        Math.round(typed.length / passage.length * 100)
    );

    $("progressText").textContent = `${progress}%`;
    $("progressBar").style.width = `${progress}%`;
}


// ------------------------------------------------------
// TIMER
// ------------------------------------------------------

function updateTimer() {
    if (!startedAt || finished) {
        return;
    }

    const elapsed = (Date.now() - startedAt) / 1000;

    if (duration === 0) {
        const totalSeconds = Math.floor(elapsed);

        $("time").innerHTML =
            `${formatTime(totalSeconds)}<small>UP</small>`;
    } else {
        const left = Math.max(
            0,
            Math.ceil(duration - elapsed)
        );

        $("time").textContent = formatTime(left);

        if (left <= 0) {
            updateStats();
            completeTest();
            return;
        }
    }

    updateStats();
}


// ------------------------------------------------------
// KEYBOARD PRESS ANIMATION
// ------------------------------------------------------

function animateKeyPress(char) {
    const key = findKeyboardKey(char);

    if (!key) return;

    key.classList.remove("key-press");

    void key.offsetWidth;

    key.classList.add("key-press");

    setTimeout(() => {
        key.classList.remove("key-press");
    }, 160);
}


// ------------------------------------------------------
// UPDATE KEYBOARD FEEDBACK
// Only the latest key gets temporary feedback.
// ------------------------------------------------------

function updateKeyboardFeedback() {
    if (typed.length === 0) return;

    const index = typed.length - 1;
    const typedChar = typed[index];

    const key = findKeyboardKey(typedChar);

    if (!key) return;

    const isCorrect = typedChar === passage[index];

    showKeyFeedback(
        key,
        isCorrect ? "correct" : "incorrect"
    );
}


// ------------------------------------------------------
// NEXT EXPECTED KEY
// ------------------------------------------------------

function highlightKey(char) {
    getKeyboardKeys().forEach(key => {
        key.classList.remove("active");
    });

    if (!char) {
        return;
    }

    const key = findKeyboardKey(char);

    if (key) {
        key.classList.add("active");
    }
}


// ------------------------------------------------------
// HEATMAP
// Counts incorrectly pressed keys.
// ------------------------------------------------------

function renderHeatmap() {
    const errorCounts = {};

    for (let i = 0; i < typed.length; i++) {
        if (typed[i] !== passage[i]) {
            const label = getKeyboardLabel(typed[i]);

            if (findKeyboardKey(typed[i])) {
                errorCounts[label] = (errorCounts[label] || 0) + 1;
            }
        }
    }

    let container = $("heatmapContainer");

    if (!container) {
        container = document.createElement("div");
        container.id = "heatmapContainer";
        container.className = "heatmap-container";

        const againButton = $("againBtn");

        if (againButton) {
            againButton.before(container);
        } else {
            $("resultCard").appendChild(container);
        }
    }

    container.classList.remove("hidden");

    const entries = Object.entries(errorCounts)
        .sort((a, b) => b[1] - a[1]);

    if (entries.length === 0) {
        container.innerHTML = `
<div class="heatmap-heading">
    <span class="mini-label">KEYBOARD ANALYSIS</span>
    <h3>Key heatmap</h3>
</div>

<p class="heatmap-description">
    No keyboard errors this round. Excellent accuracy!
</p>
        `;

        return;
    }

    const maxErrors = entries[0][1];

    keyFeedbackTimers.forEach(timer => clearTimeout(timer));
    keyFeedbackTimers.clear();

    getKeyboardKeys().forEach(key => {
        key.classList.remove(
            "correct",
            "incorrect",
            "active",
            "heat-1",
            "heat-2",
            "heat-3"
        );

        const count = errorCounts[key.textContent.trim()] || 0;

        if (!count) return;

        const ratio = count / maxErrors;

        if (ratio <= 0.33) {
            key.classList.add("heat-1");
        } else if (ratio <= 0.66) {
            key.classList.add("heat-2");
        } else {
            key.classList.add("heat-3");
        }

        key.style.setProperty("--error-count", count);
    });

    const mostProblematic = entries
        .slice(0, 5)
        .map(([key, count]) => `
<div class="heatmap-key-item">
    <b>${key}</b>
    <small>${count} ${count === 1 ? "error" : "errors"}</small>
</div>
        `)
        .join("");

    container.innerHTML = `
<div class="heatmap-heading">
    <h3>Your most problematic keys</h3>
    <span>KEYBOARD ANALYSIS</span>
</div>

<p class="heatmap-description">
    These keys had the highest number of incorrect presses.
    Use this overview to identify which keys need more practice.
</p>

<div class="heatmap-top-keys">
    ${mostProblematic}
</div>

<div class="heatmap-legend">
    <span><i class="heat-low"></i> Few errors</span>
    <span><i class="heat-medium"></i> Some errors</span>
    <span><i class="heat-high"></i> Most errors</span>
</div>
    `;
}


// ------------------------------------------------------
// COMPLETE TEST
// ------------------------------------------------------

function completeTest() {
    if (finished) {
        return;
    }

    finished = true;

    $("finishBtn").disabled = true;

    clearInterval(timerId);
    timerId = null;

    const stats = calculate();

    $("typingStatus").innerHTML =
        '<i class="status-dot"></i> Session complete · beautifully done';

    $("finalWpm").innerHTML =
        `${stats.wpm} <i>WPM</i>`;

    $("finalAccuracy").textContent =
        `${stats.accuracy}%`;

    $("finalChars").textContent =
        typed.length;

    $("finalErrors").textContent =
        stats.errors;

    $("resultMessage").textContent =
        stats.accuracy >= 95
            ? "Beautiful precision. Keep that rhythm going."
            : "Every round teaches your fingers something new.";

    renderHeatmap();

    $("resultCard").classList.remove("hidden");

    history.unshift({
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        date: new Date().toLocaleDateString("en-GB")
    });

    history = history.slice(0, 8);

    localStorage.setItem(
        "typeflow-sessions",
        JSON.stringify(history)
    );

    renderHistory();

    if (soundOn) {
        playTone(660, 120, 0.04);
    }
}


// ------------------------------------------------------
// HANDLE TYPED CHARACTERS
// ------------------------------------------------------

function handleCharacter(char) {
    if (finished || typed.length >= passage.length) {
        return;
    }

    // BACKSPACE

    if (char === "Backspace") {
        typed = typed.slice(0, -1);
    }

    // NORMAL CHARACTER

    else if (
        char.length === 1 &&
        !char.match(/[\u0000-\u001f]/)
    ) {
        if (!startedAt) {
            startTest();
        }

        typed += char;

        animateKeyPress(char);

        const lastIndex = typed.length - 1;
        const isCorrect = char === passage[lastIndex];

        if (isCorrect) {
            playTone(650, 50, 0.025);
        } else {
            playTone(220, 100, 0.04);
        }
    } else {
        return;
    }

    renderPassage();
    updateStats();
    updateKeyboardFeedback();

    highlightKey(passage[typed.length] || "");

    if (typed.length >= passage.length) {
        completeTest();
    }
}


// ------------------------------------------------------
// SESSION HISTORY
// ------------------------------------------------------

function renderHistory() {
    const list = $("historyList");

    if (!history.length) {
        list.innerHTML =
            '<p class="empty-history">Your sessions will show up here.</p>';

        $("best").textContent = "BEST —";

        return;
    }

    list.innerHTML = history
        .slice(0, 4)
        .map(item => {
            return `
<div class="history-entry">
    <span>
        <b>${item.wpm} WPM</b>
        · ${item.accuracy}% accuracy
    </span>

    <small>${item.date}</small>
</div>
            `;
        })
        .join("");

    $("best").textContent =
        `BEST ${Math.max(...history.map(x => x.wpm))} WPM`;
}


// ------------------------------------------------------
// SOUND
// ------------------------------------------------------

function playTone(frequency = 500, duration = 70, volume = 0.04) {
    if (!soundOn) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    if (!audioContext) {
        audioContext = new AudioContext();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(volume, audioContext.currentTime);

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration / 1000
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration / 1000);
}


// ------------------------------------------------------
// RANDOM TYPING TIP
// Avoid repeating the same tip immediately.
// ------------------------------------------------------

function showTip() {
    if (!tips || tips.length === 0) {
        return;
    }

    let randomIndex;

    if (tips.length === 1) {
        randomIndex = 0;
    } else {
        do {
            randomIndex = Math.floor(Math.random() * tips.length);
        } while (randomIndex === lastTipIndex);
    }

    lastTipIndex = randomIndex;

    const tip = tips[randomIndex];

    $("tipTitle").textContent = tip.title;
    $("tipText").textContent = tip.text;
}


// ------------------------------------------------------
// CUSTOM TIMER
// ------------------------------------------------------

function applyCustomDuration() {
    const minutesInput = $("customMinutes");
    const secondsInput = $("customSeconds");

    if (!minutesInput || !secondsInput) {
        return;
    }

    const minutes = Number(minutesInput.value);
    const seconds = Number(secondsInput.value);

    if (
        minutesInput.value.trim() === "" ||
        secondsInput.value.trim() === "" ||
        !Number.isInteger(minutes) ||
        !Number.isInteger(seconds) ||
        minutes < 0 ||
        minutes > 999 ||
        seconds < 0 ||
        seconds > 59
    ) {
        alert("Please enter valid minutes and seconds. Seconds must be between 0 and 59.");
        return;
    }

    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0) {
        alert("Please enter a time greater than 0. Use No limit for unlimited practice.");
        return;
    }

    setDuration(totalSeconds);
}


// ------------------------------------------------------
// CUSTOM TIMER EVENT LISTENERS
// ------------------------------------------------------

const customMinutes = $("customMinutes");
const customSeconds = $("customSeconds");
const applyCustomButton = $("applyCustomDuration");

if (applyCustomButton) {
    applyCustomButton.addEventListener(
        "click",
        applyCustomDuration
    );
}

[customMinutes, customSeconds].forEach(input => {
    if (!input) return;

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            applyCustomDuration();
        }
    });
});


// ------------------------------------------------------
// CLICK ON TYPING AREA
// Hide overlay, but do not start timer.
// ------------------------------------------------------

$("quoteArea").addEventListener("click", () => {
    if (finished) {
        return;
    }

    $("startOverlay").classList.add("hidden");
    $("quoteArea").focus();
});


// ------------------------------------------------------
// KEYBOARD SHORTCUTS AND PHYSICAL TYPING
// ------------------------------------------------------

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        event.preventDefault();
        resetTest();
        return;
    }

    if (
        event.target.matches("input, textarea, select") ||
        event.target.isContentEditable
    ) {
        return;
    }

    if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
    ) {
        return;
    }

    if (
        event.code === "Space" &&
        !startedAt &&
        !finished &&
        typed.length === 0
    ) {
        event.preventDefault();

        $("startOverlay").classList.add("hidden");
        $("quoteArea").focus();

        return;
    }

    if (event.key === "Tab") {
        event.preventDefault();
        resetTest();

        return;
    }

    if (event.key === "Enter") {
        event.preventDefault();

        if (startedAt && !finished) {
            completeTest();
        }

        return;
    }

    if (event.key === "Backspace") {
        event.preventDefault();
        handleCharacter("Backspace");
        return;
    }

    if (!startedAt && !finished) {
        const shortcuts = {
            "1": 15,
            "2": 30,
            "3": 60,
            "4": 120,
            "0": 0
        };

        if (
            Object.prototype.hasOwnProperty.call(
                shortcuts,
                event.key
            )
        ) {
            event.preventDefault();
            setDuration(shortcuts[event.key]);
            return;
        }
    }

    if (event.key.length === 1) {
        event.preventDefault();
        handleCharacter(event.key);
    }
});


// ------------------------------------------------------
// SET DURATION
// ------------------------------------------------------

function setDuration(value) {
    const newDuration = Number(value);

    if (
        !Number.isInteger(newDuration) ||
        newDuration < 0
    ) {
        return;
    }

    duration = newDuration;

    document.querySelectorAll("[data-time]").forEach(button => {
        button.classList.toggle(
            "selected",
            Number(button.dataset.time) === duration
        );
    });

    resetTest();
}


// ------------------------------------------------------
// CATEGORY SELECTION
// ------------------------------------------------------

$("categories").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");

    if (!button) {
        return;
    }

    category = button.dataset.category;

    document.querySelectorAll(".category").forEach(element => {
        element.classList.toggle(
            "active",
            element === button
        );
    });

    resetTest();
});


// ------------------------------------------------------
// DURATION SELECTION
// ------------------------------------------------------

$("durations").addEventListener("click", event => {
    const button = event.target.closest("[data-time]");

    if (!button) {
        return;
    }

    setDuration(Number(button.dataset.time));
});


// ------------------------------------------------------
// LEVEL SELECTION
// ------------------------------------------------------

$("level").addEventListener("change", event => {
    level = event.target.value;
    resetTest();
});


// ------------------------------------------------------
// NEW TEXT BUTTON
// ------------------------------------------------------

$("newText").addEventListener("click", () => {
    resetTest();
});


// ------------------------------------------------------
// AGAIN BUTTON
// ------------------------------------------------------

$("againBtn").addEventListener("click", () => {
    resetTest();
});


// ------------------------------------------------------
// FINISH BUTTON
// ------------------------------------------------------

$("finishBtn").addEventListener("click", () => {
    if (startedAt && !finished) {
        completeTest();

    } else if (!startedAt && !finished) {
        $("typingStatus").innerHTML =
            '<i class="status-dot"></i> Start typing before finishing your session';
    }
});


// ------------------------------------------------------
// SOUND TOGGLE
// ------------------------------------------------------

$("soundToggle").addEventListener("click", () => {
    soundOn = !soundOn;

    $("soundToggle").textContent = soundOn ? "🔊" : "🔇";
    $("soundToggle").classList.toggle("enabled", soundOn);
    $("soundToggle").title = soundOn ? "Sound on" : "Sound off";

    if (soundOn) {
        playTone(600, 100, 0.04);
    }
});


// ------------------------------------------------------
// DARK / LIGHT MODE
// ------------------------------------------------------

let lightMode = false;

$("modeToggle").addEventListener("click", () => {
    lightMode = !lightMode;

    document.documentElement.dataset.theme =
        lightMode ? "light" : "dark";

    $("modeToggle").textContent =
        lightMode ? "☾" : "☀";

    $("modeToggle").title = lightMode
        ? "Switch to dark mode"
        : "Switch to light mode";

    $("modeToggle").classList.toggle("enabled", lightMode);
});


// ------------------------------------------------------
// ACCENT COLOR
// ------------------------------------------------------

let accentIndex = 0;

const accentColors = [
    "#a18af7",
    "#55c6bd",
    "#f0a36c",
    "#e77ba9",
    "#8bb7ff"
];

$("themeToggle").addEventListener("click", () => {
    accentIndex = (accentIndex + 1) % accentColors.length;

    const nextColor = accentColors[accentIndex];

    document.documentElement.style.setProperty(
        "--accent",
        nextColor
    );

    document.documentElement.style.setProperty(
        "--accent-soft",
        `${nextColor}20`
    );
});


// ------------------------------------------------------
// INITIALIZE APPLICATION
// ------------------------------------------------------

renderHistory();
resetTest();
