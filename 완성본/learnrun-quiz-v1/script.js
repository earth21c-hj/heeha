// ---------- 6-1) 문제 데이터 만들기 ----------
const questions = [
  {
    q: '대한민국의 수도는?',
    choices: ['부산', '서울', '대구', '인천'],
    answer: 1 // 0부터 시작(서울=1)
  },
  {
    q: '2 + 2 = ?',
    choices: ['2', '3', '4', '5'],
    answer: 2
  },
  {
    q: '한글을 창제한 왕은 누구일까요?',
    choices: ['세종대왕', '태조 이성계', '광개토대왕', '정조'],
    answer: 0
  },
  {
    q: '태양계 행성 수는(왜소행성 제외)?',
    choices: ['7개', '8개', '9개', '10개'],
    answer: 1
  },
  {
    q: '물의 화학식은 무엇일까요?',
    choices: ['CO2', 'O2', 'H2O', 'NaCl'],
    answer: 2
  },
];

// ---------- 6-2) 상태 값 ----------
let current = 0; // 현재 문제 인덱스
let score = 0;   // 맞힌 개수

// ---------- 6-3) DOM 참조 ----------
const homeSection = document.getElementById('home');
const quizSection = document.getElementById('quiz');
const resultSection = document.getElementById('result');

const questionText = document.getElementById('questionText');
const choicesList = document.getElementById('choices');
const progressEl = document.getElementById('progress');
const scoreEl = document.getElementById('score');

const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const retryBtn = document.getElementById('retryBtn');
const resultText = document.getElementById('resultText');

// ---------- 6-4) 유틸: 섹션 전환 ----------
function showSection(section) {
  homeSection.classList.add('hidden');
  quizSection.classList.add('hidden');
  resultSection.classList.add('hidden');
  section.classList.remove('hidden');
}

// ---------- 6-5) 문제 렌더링 ----------
function renderQuestion() {
  const item = questions[current];
  questionText.textContent = item.q;

  // 보기 목록 초기화
  choicesList.innerHTML = '';
  item.choices.forEach((label, idx) => {
    const li = document.createElement('li');
    li.className = 'choice-item';
    li.setAttribute('role', 'option');

    // 라디오 버튼
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'choice';
    input.value = String(idx);
    input.id = `choice-${idx}`;

    const lab = document.createElement('label');
    lab.setAttribute('for', input.id);
    lab.textContent = label;

    // 클릭 영역 넓히기
    li.addEventListener('click', () => {
      input.checked = true;
      nextBtn.disabled = false;
    });

    li.appendChild(input);
    li.appendChild(lab);
    choicesList.appendChild(li);
  });

  // 진행도 & 점수 업데이트
  progressEl.textContent = `문제 ${current + 1} / ${questions.length}`;
  scoreEl.textContent = `점수 ${score}`;

  // 다음 버튼 초기화
  nextBtn.disabled = true;
}

// ---------- 6-6) 정답 체크 ----------
function getSelectedIndex() {
  const selected = document.querySelector('input[name="choice"]:checked');
  return selected ? Number(selected.value) : null;
}

function handleNext() {
  const selectedIdx = getSelectedIndex();
  if (selectedIdx === null) {
    alert('보기를 선택해주세요!');
    return;
  }

  // 정답이면 점수 +1
  if (selectedIdx === questions[current].answer) {
    score += 1;
  }

  // 다음 문제로 이동 또는 결과
  current += 1;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// ---------- 6-7) 결과 화면 ----------
function showResult() {
  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  let message = '';
  if (percent === 100) message = '완벽해요! 대단해요 🎉';
  else if (percent >= 80) message = '아주 훌륭해요 👍';
  else if (percent >= 60) message = '좋아요! 조금만 더!';
  else message = '시작이 반! 한 번 더 도전해볼까요?';

  resultText.textContent = `점수: ${score} / ${total} (${percent}%) — ${message}`;
  showSection(resultSection);
}

// ---------- 6-8) 다시하기 ----------
function resetGame() {
  current = 0;
  score = 0;
  renderQuestion();
  showSection(quizSection);
}

// ---------- 6-9) 이벤트 바인딩 ----------
startBtn.addEventListener('click', () => {
  resetGame();
});

nextBtn.addEventListener('click', handleNext);

retryBtn.addEventListener('click', () => {
  showSection(homeSection);
});

// 접근성/키보드: Enter로 다음 진행
document.addEventListener('keydown', (e) => {
  if (!quizSection.classList.contains('hidden') && e.key === 'Enter' && !nextBtn.disabled) {
    handleNext();
  }
});
