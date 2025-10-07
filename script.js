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
const resultFeedback = document.getElementById("result-feedback"); // ✅ 새로 추가된 부분

// 시작 버튼
document.getElementById("start-btn").addEventListener("click", () => {
  mainPage.style.display = "none";
  questionPage.style.display = "block";
  current = 0;
  score = 0;
  loadQuestion();

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
// 결과 표시
function showResult() {
  questionPage.style.display = "none";
  resultPage.style.display = "block";

  let emoji = "🌞";
  let title = "튼튼한 마음형";
  let desc = "감각이 섬세하지만 외부 자극에 크게 흔들리지 않는 편이에요.";
  let feedback = "“당신은 감정의 파도 속에서도 중심을 잘 잡는 사람이에요. 안정감이 당신의 큰 힘이에요.”";

  if (score >= 8 && score < 14) {
    emoji = "🌤️";
    title = "균형감각형 HSP";
    desc = "감정이 풍부하면서도 환경에 따라 적절히 조절할 수 있는 타입이에요.";
    feedback = "“당신의 민감함은 공감 능력의 원천이에요. 때로는 쉬어가며 그 감각을 잘 돌봐주세요.”";
  } else if (score >= 14 && score < 20) {
    emoji = "🌧️";
    title = "감정 공명형 HSP";
    desc = "타인의 감정과 분위기에 강하게 반응하고 쉽게 피로를 느낄 수 있어요.";
    feedback = "“세상에 공감이 많은 당신, 그만큼 마음의 에너지도 많이 쓰고 있어요. 스스로를 위한 ‘정지 시간’을 자주 주세요.”";
  } else if (score >= 20) {
    emoji = "⛈️";
    title = "초민감형 HSP";
    desc = "감각과 정서가 매우 예민해 세상의 소리를 깊게 받아들이는 타입이에요.";
    feedback = "“당신의 감수성은 선물이에요. 하지만 그 선물을 지키려면 ‘조용한 공간’과 ‘마음의 안전지대’가 꼭 필요해요.”";
  }

  resultEmoji.textContent = emoji;
  resultTitle.textContent = title;
  resultDesc.textContent = desc;
  resultFeedback.textContent = feedback;

  // ✅ 이제 appendChild 대신 한 번만 문구 세팅
  document.getElementById("extra-advice").textContent =
    "최근 신경 쓰이거나 스트레스 받는 일이 있진 않았나요? 생각이 많고 힘들 땐 너무 고민하지 말고 상담을 받아보는 것도 좋은 방법이에요 🌱";
}

});
