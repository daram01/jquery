// 문제도 객체임. 문제를 제시하고, 보기와 정답을 준다. 


// 문제 객체
                //보기, 선택, 정답
function Question(text, choice, answer){
    this.text = text;           // 문제의 내용
    this.choice = choice;       // 선택한 번호 (보기)
    this.answer = answer;       // 정답 내용
}

// 퀴즈 정보 객체
function Quiz(questions){ // questions >> 배열을 받는 매개변수.
    this.score = 0; // 점수 관리 하는 변수
    this.questions = questions; // 질문 ( 문제 )
    this.questionIndex = 0; // 질문 순서
}

// Question 객체를 값으로 정의 하는 배열
let questions = [
    new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', '인터넷익스플로러', '구글 크롬', '넷스케이프 네비게이터'], '넷스케이프 네비게이터'),
    new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'XML'], 'CSS'),
    new Question('명령어 기반의 인터페이스를 의미하는 용어는?', ['GUI', 'CLI', 'HUD', 'SI'], 'CLI'),
    new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-variant'], 'font-weight')
]

// 정답을 확인하는 기능(함수)
// 프로토 타입으로 제작
// 문제의 정답을 확인하는 역할.
Quiz.prototype.correctAnswer = function(answer){
    return answer == this.questions[this.questionIndex].answer;
};

let quiz = new Quiz(questions);


// 문제를 표시하는 기능
function update_quiz(){ // 화면에 진행 사항에 맞게 문제를 표시
    let question = document.getElementById("question"); // 문제를 표시하는 부분을 객체 정보로 가져옴
    //querySelectorAll() **는 특정 name, id, class를 제한하지 않고 css선택자를 사용하여 요소를 찾는다.
    let choice = document.querySelectorAll('.btn'); // 보기를 표시하는 부분을 객체 정보로 가져옴
    let idx = quiz.questionIndex + 1; 

    //문제 출력
    question.innerHTML = '문제' + idx + ')' + quiz.questions[quiz.questionIndex].text;

    //보기 출력
    for(let i=0; i<4; i++){
        choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
    }
    progress();
};

function progress(){
    let progress = document.getElementById("progress");
    progress.innerHTML = '문제' + (quiz.questionIndex + 1) + ' / ' + quiz.questions.length;
}

function result(){
    let quiz_div = document.getElementById('quiz');
    let per = parseInt((quiz.score * 100)/quiz.questions.length);

    let txt ="<h1>결과</h1>" +
             "<h2 id='score'> 당신의 점수 : " + quiz.score + " / " +
             quiz.questions.length + "<br><br>" + per + '점</h2>' ;
    
    quiz_div.innerHTML = txt;

    if(per < 60){
        txt += '<h2 style="color:red">좀 더 분발하세요</h2>';
        quiz_div.innerHTML = txt;
    }else if(per >= 60 && per < 80){
        txt += '<h2 style="color:red">무난한 점수네요.</h2>';
        quiz_div.innerHTML = txt;
    }else if(per >= 80){
        txt += '<h2 style="color:red">훌륭합니다.</h2>';
        quiz_div.innerHTML = txt;
    }
}

let btn = document.querySelectorAll('.btn');

function checkAnswer(i){
    btn[i].addEventListener('click', function(){
        let answer = btn[i].innerHTML // 선택한 버튼의 텍스트를 가져오라는 뜻.
        if(quiz.correctAnswer(answer)){
            alert("정답입니다.");
            quiz.score++;
        }else{
            alert("틀렸습니다.");
        }

        if(quiz.questionIndex < quiz.questions.length - 1){
            quiz.questionIndex++;
            update_quiz();
        }else{
            result();
        }
    });
}

for(let i = 0; i <btn.length;i++){
    checkAnswer(i);
}



update_quiz();