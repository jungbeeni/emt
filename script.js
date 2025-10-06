const questions = [
  "혼란스럽거나 소음이 많은 상황이 나를 쉽게 지치게 한다.",
  "한 번에 여러 일을 하면 스트레스가 쌓인다.",
  "사람들의 감정 변화에 민감하게 반응하는 편이다.",
  "시끄러운 공간보다 조용한 환경을 선호한다.",
  "감정이 쉽게 요동친다.",
  "사람 많은 곳에 가면 피로감이 빨리 온다.",
  "타인의 기분이 나에게 쉽게 옮겨온다.",
  "혼자만의 시간이 꼭 필요하다.",
  "밝은 빛이나 강한 냄새에 예민하게 반응한다.",
  "내가 실수하면 오래도록 생각이 머문다.",
  "누군가 다투는 장면을 보면 불편하다.",
  "감정 기복이 심할 때가 있다.",
  "작은 일에도 쉽게 놀라거나 당황한다.",
  "내 기분이 날씨나 주변 분위기에 영향을 받는다.",
  "휴식 후에도 피로감이 쉽게 사라지지 않는다."
];

let current = 0;
let score = 0;

// DOM 요소
const mainPage = document.getElementById("main-page");
const questionPage = document.getElementById("question-page");
const resultPage = document.getElementById("result-page");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const resultEmoji = document.getElementById("result-emoji");
const resultTitle = document.getElementById("result-title");
const resultDesc = document.getElementById("result-description");

// 시작 버튼
document.getElementById("start-btn").addEventListener("click", () => {
  mainPage.style.display = "none";
  questionPage.style.display = "block";
  current = 0;
  score = 0;
  loadQuestion();
});

// 답변 버튼 생성
function loadQuestion() {
  if (current >= questions.length) {
    showResult();
    return;
  }

  questionText.textContent = `Q${current + 1}. ${questions[current]}`;
  answerButtons.innerHTML = "";

  const options = [
    { text: "전혀 아니다 (0점)", value: 0 },
    { text: "가끔 그렇다 (1점)", value: 1 },
    { text: "자주 그렇다 (2점)", value: 2 },
    { text: "매우 그렇다 (3점)", value: 3 },
  ];

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      score += opt.value;
      current++;
      updateProgress();
      loadQuestion();
    };
    answerButtons.appendChild(btn);
  });

  updateProgress();
}

// 진행 바 업데이트
function updateProgress() {
  const percent = (current / questions.length) * 100;
  progressBar.style.width = percent + "%";
  progressText.textContent = `${current} / ${questions.length}`;
}

// 결과 표시
function showResult() {
  questionPage.style.display = "none";
  resultPage.style.display = "block";

  let emoji = "☀️";
  let title = "햇살 마음형";
  let desc = "당신의 마음은 안정적이에요. 잔잔한 햇살이 머물고 있습니다 ☀️";

  if (score >= 20 && score < 30) {
    emoji = "🌤️";
    title = "흐림 마음형";
    desc = "조금의 구름이 마음을 덮고 있어요. 잠시 쉬어가도 괜찮아요 🍵";
  } else if (score >= 30 && score < 40) {
    emoji = "🌧️";
    title = "비 마음형";
    desc = "마음이 지쳐있어요. 감정의 빗방울이 떨어지는 중이에요 ☔";
  } else if (score >= 40) {
    emoji = "⛈️";
    title = "폭풍 마음형";
    desc = "지금은 감정의 폭풍 속에 있어요. 혼자 감당하지 말고 도움을 받아보세요 🌱";
  }

  resultEmoji.textContent = emoji;
  resultTitle.textContent = title;
  resultDesc.textContent = desc;
}

// 다시 시작
document.getElementById("restart-btn").addEventListener("click", () => {
  resultPage.style.display = "none";
  mainPage.style.display = "block";
});
