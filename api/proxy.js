const fetch = require('node-fetch'); // Use node-fetch for compatibility

module.exports = async (req, res) => {
  const targetUrl = req.query.url; // 요청의 쿼리 파라미터에서 url 값을 가져옵니다.

  if (!targetUrl) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(400).send('url query required');
    return;
  }

  try {
    // 외부 URL에서 데이터를 가져옵니다.
    const externalResponse = await fetch(targetUrl, {
       headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    // 외부 응답의 상태 코드를 그대로 전달합니다.
    res.status(externalResponse.status);

    // 외부 응답의 본문을 그대로 전달합니다.
    const data = await externalResponse.text();
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS 헤더 설정
    res.send(data);

  } catch (error) {
    console.error('Error fetching external URL:', error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).send('fetch error: ' + error.message);
  }
}; 