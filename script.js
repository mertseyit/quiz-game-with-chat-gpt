// DOM Elementleri
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const finishButton = document.getElementById('finish-button');
const restartButton = document.getElementById('restart-button');
const usernameInput = document.getElementById('username');
const userScores = document.getElementById('user-scores');
const questionTitle = document.getElementById('question-title');
const choices = document.getElementById('choices');
const scoreText = document.getElementById('score-text');
const timerText = document.getElementById('timer-text');  // Süreyi gösterecek element

// Sorular
const questions = [
  {
    question: "HTML neyin kısaltmasıdır?",
    choices: [
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "HyperText Markup Language",
      "HyperText Machine Language",
      "Hyperlink Markup Language"
    ],
    answer: 2 // Doğru cevap "HyperText Markup Language", şık 2
  },
  {
    question: "CSS hangi amaca hizmet eder?",
    choices: [
      "Web sayfasının stilini belirler",
      "Web sayfası kodlamasını yapar",
      "Web sayfası içeriğini tanımlar",
      "Web sayfası tasarımını yapar",
      "Web sayfası veri yönetimini sağlar"
    ],
    answer: 0 // Doğru cevap "Web sayfasının stilini belirler", şık 0
  },
  {
    question: "JavaScript, hangi tür programlama dilidir?",
    choices: [
        "Statik programlama dili",
        "Veritabanı yönetim dili",
        "Makine dili",
        "Komple programlama dili",
        "Dinamik programlama dili"
    ],
    answer: 4 // Doğru cevap "Dinamik programlama dili", şık 0
  },
  {
    question: "'Responsive' tasarım neyi ifade eder?",
    choices: [
        "Yalnızca tabletlerde çalışan tasarım",
        "Ekran boyutuna göre uyum sağlayan tasarım",
        "Ekran rengine göre tasarım",
      "Mobil cihazlar için özel tasarım",
      "Yalnızca metin tabanlı tasarım"
    ],
    answer: 1 // Doğru cevap "Ekran boyutuna göre uyum sağlayan tasarım", şık 0
  },
  {
    question: "Git ile ilgili aşağıdakilerden hangisi doğrudur?",
    choices: [
        "Veritabanı yönetim sistemidir",
        "Sadece HTML dosyalarını düzenler",
        "Versiyon kontrolü yapmak için kullanılan bir yazılımdır",
      "Web sunucusu yönetim aracı olarak kullanılır",
      "İnternet üzerinden dosya paylaşımlarını sağlar"
    ],
    answer: 2 // Doğru cevap "Versiyon kontrolü yapmak için kullanılan bir yazılımdır", şık 0
  },
  {
    question: "HTML5 ile gelen yeni özelliklerden biri hangisidir?",
    choices: [
      "Video ve ses etiketleri",
      "Yeni CSS özellikleri",
      "Mobil uyumlu tasarım",
      "Web soketlerini destekleme",
      "Yalnızca metin etiketleri"
    ],
    answer: 0 // Doğru cevap "Video ve ses etiketleri", şık 0
  },
  {
    question: "React nedir?",
    choices: [
        "Bir sunucu yönetim aracıdır",
        "Bir web framework'üdür",
        "Bir veritabanı yönetim sistemidir",
        "Bir JavaScript kütüphanesidir",
      "Bir programlama dilidir"
    ],
    answer: 3 // Doğru cevap "Bir JavaScript kütüphanesidir", şık 0
  },
  {
    question: "Aşağıdakilerden hangisi SQL dilinde veri sorgulama komutudur?",
    choices: [
        "UPDATE",
        "INSERT",
        "SELECT",
      "DELETE",
      "CREATE"
    ],
    answer: 2 // Doğru cevap "SELECT", şık 0
  },
  {
    question: "AJAX teknolojisi nedir?",
    choices: [
        "Automated JavaScript Application XML",
        "Asynchronous JavaScript and XML",
      "Advanced JavaScript XML",
      "Asynchronous JavaScript and XHTML",
      "Active JavaScript and XHR"
    ],
    answer: 1 // Doğru cevap "Asynchronous JavaScript and XML", şık 0
  },
  {
    question: "Aşağıdakilerden hangisi sunucu tarafı programlama dilidir?",
    choices: [
        "HTML",
        "CSS",
        "JavaScript",
        "Python",
      "Ruby"
    ],
    answer: 3 // Doğru cevap "Python", şık 0
  }
];



// Durum Değişkenleri
let currentQuestion = 0;
let score = 0;
let timeLeft = 300; // 5 dakika = 300 saniye
let userData = JSON.parse(localStorage.getItem('userData')) || [];
let timer;

// Kullanıcı Skorlarını Listele
function renderScores() {
  userScores.innerHTML = '';
  userData.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name}: ${user.score} puan`;
    userScores.appendChild(li);
  });
}

// Soruyu Göster
function showQuestion() {
  const question = questions[currentQuestion];
  questionTitle.textContent = question.question;
  choices.innerHTML = '';
  question.choices.forEach((choice, index) => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.onclick = () => selectAnswer(index);
    choices.appendChild(li);
  });
}

// Şık Seçimi
function selectAnswer(index) {
  const correctAnswer = questions[currentQuestion].answer;
  Array.from(choices.children).forEach((li, i) => {
    li.classList.remove('selected', 'correct', 'wrong');
    if (i === index) li.classList.add(index === correctAnswer ? 'correct' : 'wrong');
    if (i === correctAnswer) li.classList.add('correct');
  });
  score += index === correctAnswer ? 10 : -5;
  nextButton.classList.remove('hidden');
  if (currentQuestion === questions.length - 1) {
    nextButton.classList.add('hidden');
    finishButton.classList.remove('hidden');
  }
}

// Süreyi Göster ve Güncelle
function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);  // Zaman bittiğinde zamanlayıcıyı durdur
    finishTest();
  } else {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerText.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

// Testi Başlat
startButton.onclick = () => {
  const username = usernameInput.value.trim();
  if (!username) return alert('Lütfen kullanıcı adınızı girin.');

  // Kullanıcı adı kontrolü
  const existingUser = userData.find(user => user.name === username);
  if (existingUser) {
    // Kullanıcı varsa, veriyi güncelle
    existingUser.score = 0;  // Yeni test için puanı sıfırla
  } else {
    // Yeni kullanıcı ekle
    userData.push({ name: username, score: 0 });
  }

  localStorage.setItem('userData', JSON.stringify(userData));  // Veriyi güncelle

  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  renderScores();  // Skorları göster
  showQuestion();

  // Butonları sıfırla
  nextButton.classList.add('hidden');
  finishButton.classList.add('hidden');

  timeLeft = 300;  // Süreyi sıfırla
  timer = setInterval(updateTimer, 1000);  // Zamanlayıcıyı başlat
};

// Sonraki Soru
nextButton.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextButton.classList.add('hidden');  // Sonraki soru butonunu gizle
  }
};

// Testi Bitir
finishButton.onclick = () => {
  const username = usernameInput.value.trim();
  const existingUser = userData.find(user => user.name === username);
  if (existingUser) {
    existingUser.score = score;  // Puanı güncelle
  }

  localStorage.setItem('userData', JSON.stringify(userData));
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreText.textContent = `${score} puan aldınız!`;
  clearInterval(timer);  // Zamanlayıcıyı durdur
};

// Yeniden Başlat
restartButton.onclick = () => {
  currentQuestion = 0;
  score = 0;
  timeLeft = 300;  // Süreyi sıfırla
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  renderScores();
  
  // Butonları sıfırla
  nextButton.classList.add('hidden');
  finishButton.classList.add('hidden');

  clearInterval(timer);  // Zamanlayıcıyı durdur
  timer = setInterval(updateTimer, 1000);  // Yeni oyun başlat
};

// Kullanıcı Skorlarını Listele ve Son Oyuncuyu Vurgula
function renderScores() {
  userScores.innerHTML = '';
  userData.forEach((user, index) => {
    const li = document.createElement('li');
    li.textContent = `${user.name}: ${user.score} puan`;

    // Eğer şu anki kullanıcıysa, arka planı yeşil yap
    const username = usernameInput.value.trim();
    if (user.name === username) {
      li.style.backgroundColor = "rgba(0, 255, 0, 0.2)"; // %20 opaklıkla yeşil
    }

    userScores.appendChild(li);
  });
}

// Sayfa Yüklenince
renderScores();
