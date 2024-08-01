const HOST = "localhost";
const PORT = 8000;

// 2. /leftpage에 뜬 데이터를 받아서,
// .json() 형식으로 저장한 data를 getDataFromBackend_1()로 반환한다.
const getDataFromBackend_1 = async () => {
  const rest = await fetch(`http://${HOST}:${PORT}/leftpage`);
  const data = await rest.json();
  // console.log(data);
  return data;
};

// 2번에서 받은 /leftpage의 json정보를 getDataFromBackend_1()로 넘겨 받고,
// 데이터를 forEach()로 쪼개서 웹에 초기 업데이트 한다.
const addDataLeft = async () => {
  const data = await getDataFromBackend_1();
  data.forEach((value) => {
    const section = document.createElement("section");
    section.classList.add("post");
    // console.log(value);
    section.innerHTML = `
          <div class="answer">
            <li>${value.answer}</li>
          </div>
          <footer class="footer">
            <span class="post__author">${value.nickname}</span>
          </footer>
    `;
    answerbox_left.append(section);
  });
};

addDataLeft();
