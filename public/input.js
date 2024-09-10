//index.html 부여되어있는 id가 있는 html 태그를
//getElementById로 변수에 담는다.
const answerForm = document.getElementById('answer-form');
const answerBox = document.getElementById('answerbox');
const leftAnswer = document.getElementById('answer');
const leftNickname = document.getElementById('nickname');

const HOST = 'vercel-notion-express.vercel.app'; // *** local ip
// const PORT = 3000; // *** port num

//4. 버튼의 연쇄반응으로 새롭게 짠 json 구조를 POST로 데이터를 DB에 넣는다.
// submitFormToNotion_left
function submitFormToNotion(newAnsobj) {
  // console.log("i will make", newAnsobj);
  fetch(`https://${HOST}/submitFormToNotion`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      Nickname: newAnsobj.nickname,
      Answer: newAnsobj.answer,
      Date: newAnsobj.time,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('success!', data);
    })
    .catch((err) => {
      console.log('Error: ' + err);
    });
}

// 3. send 버튼이 눌릴 때 발생하는 이벤트로
// 들어온 값으로 새로운 json구조를 짠다.
function handleTodoSubmit(e) {
  e.preventDefault();
  // console.log("click!");
  // console.log(e);
  // console.log(
  //   `leftAnswer: ${leftAnswer.value}, leftnickname: ${leftNickname.value}`
  // );
  const answer = leftAnswer.value;
  const nickname = leftNickname.value;
  const timestamp = success();

  //값을 비워준다.
  leftAnswer.value = '';
  leftNickname.value = '';

  //들어온 값으로 새로운 json구조를 짠다.
  const newAnsobj = {
    answer: answer,
    nickname: nickname,
    time: timestamp,
  };

  // console.log(newAnsobj);

  submitFormToNotion(newAnsobj);

  //4. Update Input Data to Website
  const section = document.createElement('section');
  section.classList.add('post');
  section.innerHTML = `
          <div class="answer">${newAnsobj.answer}</div>
          <div class="guest">${newAnsobj.nickname}</div>
        `;
  // answerbox_left.appendChild(section);
  answerBox.insertBefore(section, answerBox.firstElementChild);
}

answerForm.addEventListener('submit', handleTodoSubmit);

// 시간기록하기Time Recording
const success = () => {
  const date = new Date();
  const year = date.getFullYear();
  // (조건) ? 조건이 참일 때 배출하는 값 :조건이 거짓일때 배출하는 값
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  // console.log(`year: ${year}, month: ${month}, date: ${day}, hour: ${hour}, minute: ${minute}`);
  // console.log(
  //   `${year}-${month}-${day},${hour}:${minute}`
  // );
  return `${year}-${month}-${day}, ${hour}:${minute}`;
};
