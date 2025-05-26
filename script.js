// 여러 게시판 정보 배열 (예시)
const BOARDS = [
  {
    name: '학생소식',
    url: 'https://www.kongju.ac.kr/KNU/16909/subview.do',
  },
  {
    name: '행정소식',
    url: 'https://www.kongju.ac.kr/KNU/16910/subview.do',
  },
  {
    name: '행사안내',
    url: 'https://www.kongju.ac.kr/KNU/16911/subview.do',
  },
  {
    name: '채용소식',
    url: 'https://www.kongju.ac.kr/KNU/16917/subview.do',
  },
];

// 각 게시판별 새 공지 개수 fetch (임시 랜덤)
async function fetchNoticeCount(board) {
  try {
    const proxyUrl = `http://localhost:3001/proxy?url=${encodeURIComponent(board.url)}`;
    const res = await fetch(proxyUrl);
    const html = await res.text();
    console.log(`==== ${board.name} HTML ====`);
    console.log(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const dateCells = doc.querySelectorAll('tr:not(.notice) td.td-date');
    const now = new Date();
    let count = 0;

    dateCells.forEach(cell => {
      let dateStr = cell.textContent.trim();
      dateStr = dateStr.replace(/\./g, '-');
      const noticeDate = new Date(dateStr);
      if (
        noticeDate.getFullYear() === now.getFullYear() &&
        noticeDate.getMonth() === now.getMonth() &&
        noticeDate.getDate() === now.getDate()
      ) {
        count++;
      }
    });

    return count;
  } catch (e) {
    return 0;
  }
}

async function renderNoticeList() {
  const list = document.getElementById('notice-list');
  list.innerHTML = '';
  for (const board of BOARDS) {
    const count = await fetchNoticeCount(board);
    const item = document.createElement('a');
    item.className = 'notice-item';
    item.href = board.url;
    item.target = '_blank';
    item.innerHTML = `
      <span class="notice-title">${board.name}</span>
      <span class="notice-count">${count}</span>
    `;
    list.appendChild(item);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderNoticeList();
}); 