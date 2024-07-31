//index.html input에 부여되어있는 id값이다 
const answerFormLeft = document.getElementById("answer-form-left");
const answerBoxLeft = document.getElementById("answerbox_left");
const leftAnswer = document.getElementById("answer");
const leftNickname = document.getElementById("nickname");

const HOST = "172.30.1.31";//here!!
const PORT = 8000;

//4. 버튼의 연쇄반응으로 새롭게 짠 json 구조를 POST로 데이터를 DB에 넣는다.
// submitFormToNotion_left 
function submitFormToNotion_left(newAnsobj) {
  // console.log("i will make", newAnsobj);
  fetch(`http://${HOST}:${PORT}/submitFormToNotion_left`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Nickname: newAnsobj.nickname,
      Answer: newAnsobj.answer,
      Date: newAnsobj.time,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("success!", data);
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
}

// 3. send 버튼이 눌릴 때 발생하는 이벤트로 
// 들어온 값으로 새로운 json구조를 짠다.
function handleTodoSubmit_left(e) {
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
  leftAnswer.value = "";
  leftNickname.value = "";

  //들어온 값으로 새로운 json구조를 짠다.
  const newAnsobj = {
    answer: answer,
    nickname: nickname,
    time: timestamp,
  };

  // console.log(newAnsobj);

  submitFormToNotion_left(newAnsobj);

  //Update Input Data to Website
  const section = document.createElement("section");
  section.classList.add("post");
  section.innerHTML = `
          <div class="answer">
            <li>${newAnsobj.answer}</li>
          </div>
          <footer class="footer">
            <span class="post__author">${newAnsobj.nickname}</span>
          </footer>
        `;
  // answerbox_left.appendChild(section);
  answerbox_left.insertBefore(section, answerBoxLeft.firstElementChild);
}

answerFormLeft.addEventListener("submit", handleTodoSubmit_left);

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


