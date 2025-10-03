document.getElementById('startBtn').addEventListener('click', () => {
  alert('게임을 곧 시작합니다!\n다음 단계에서 퀴즈 데이터를 추가해요.');
});

const questions = [
  { q: '대한민국의 수도는?', choices: ['부산','서울','대구','인천'], answer: 1 },
  { q: '2 + 2 = ?',       choices: ['2','3','4','5'],          answer: 2 },
  { q: '한글을 만든 왕?', choices: ['세종대왕','이성계','광개토대왕','정조'], answer: 0 },
  { q: '태양계 행성 수?', choices: ['7개','8개','9개','10개'], answer: 1 },
  { q: '물의 화학식?',    choices: ['CO2','O2','H2O','NaCl'],  answer: 2 },
];

/* 예시: 다음 단계에서 이런 식으로 문제 데이터를 추가할 수 있어요.
const questions = [
  { q: '대한민국의 수도는?', choices: ['부산', '서울', '대구', '인천'], answer: 1 },
  { q: '2 + 2 = ?', choices: ['2', '3', '4', '5'], answer: 2 },
];
*/
