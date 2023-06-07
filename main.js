// 영화 목록 데이터 가져오기
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTM2NWEzNmZhNmQwMmFlYTFmMzEyZjkwNmQzMTJlZCIsInN1YiI6IjY0NzViNGJkOTYzODY0MDExODQ4MDRlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kof3JjFhDwtfeYITdsJhMA4XedswNta1T8HVSunc7Sw'
  }
};
const getMovie = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
  const data = await response.json();
  return data;
};

const searchInput = document.getElementById('searchinput');
const searchBtn = document.getElementById('searchbtn');

// 검색 수행 
const Search = async () => {
  const keyword = searchInput.value.trim();

  if (keyword !== ' ') { // 검색 입력값이 비어있지 않은 경우 필터링 영화 카드 표시
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&query=${keyword}`, options);
    const data = await response.json();

    const filterMovies = data.results.filter((info) => {
      const title = info.title.toLowerCase(); // 영화 제목을 소문자로 가져오기
      return title.includes(keyword);
    })
    createCards(filterMovies); 
  } else { // 검색 입력이 비어있는 경우, 모든 영화 카드 표시
    getMovie().then((data) => {
      createCards(data.results);
    });
  }
};

// 검색 버튼 클릭 이벤트
searchBtn.addEventListener('click', Search);

// 검색 입력에서 Enter 키를 누를 때 이벤트
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    Search();
  }
});

// 영화 카드 생성
const createCards = (movies) => {
  const cardBox = document.querySelector('.card-box');
  cardBox.innerHTML = ''; // 카드 생성 전 비워주기

  movies.forEach((info) => {
    // 영화 정보 HTML 생성
    let temp_html = `<div id="cards" class="card" onclick="js:begin()">
              <img src="https://www.themoviedb.org/t/p/w500/${info.poster_path}" alt="...">
              <div class="card-body">
                <h4 class="title">${info.title}</h4>
                <p class="contents">${info.overview}</p>
                <p class="rate">평점 : ${info.vote_average}</p>
              </div>
            </div>`;
    cardBox.innerHTML += temp_html;
  });
};

// 모든 영화 카드 표시
getMovie().then((data) => {
  createCards(data.results);
});

//페이지 전환
const main = document.querySelector("#main")
const detail = document.querySelector("#detail")

function begin(){
    main.style.display = "none"
    detail.style.display = "block"
}

//클릭한 영화 ${info.id} 받아서 detail로 전달, 수정 필요
function myFunction() {
  document.getElementById("field2").value = document.getElementById("field1").value;
}

//전환 페이지에서 클릭한 카드 표시
const recreateCards = (movies) => {
  const cardBox = document.querySelector('.recard-box');
  cardBox.innerHTML = ''; // 카드 생성 전 비워주기

  movies.forEach((info) => {
    // 영화 정보 HTML 생성
    let temp_html = `<div id="cards" class="card" onclick="${info.id}">
              <img src="https://www.themoviedb.org/t/p/w500/${info.poster_path}" alt="...">
              <div class="card-body">
                <h4 class="title">${info.title}</h4>
                <p class="contents">${info.overview}</p>
                <p class="rate">평점 : ${info.vote_average}</p>
              </div>
            </div>`;
    cardBox.innerHTML += temp_html;
  });
};

// 클릭한 영화 카드 표시(${info.id}에 해당하는 데이터만 출력, 수정 필요)
getMovie().then((data) => {
  recreateCards(data.results);
});