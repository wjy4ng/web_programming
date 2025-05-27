const axios = require('axios');

module.exports = async (req, res) => {
  const targetUrl = req.query.url; // 요청의 쿼리 파라미터에서 url 값을 가져옵니다.

  if (!targetUrl) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(400).send('url query required');
    return;
  }

  try {
    // axios를 사용하여 외부 URL에서 데이터를 가져옵니다.
    const externalResponse = await axios.get(targetUrl, {
       headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    // axios 응답에서 데이터와 상태 코드를 가져옵니다.
    const data = externalResponse.data; // 응답 본문
    const statusCode = externalResponse.status; // HTTP 상태 코드

    res.status(statusCode);
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS 헤더 설정
    res.send(data);

  } catch (error) {
    console.error('Error fetching external URL:', error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // axios 오류 응답 처리
    if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        res.status(error.response.status).send('fetch error: ' + (error.response.data || error.message));
    } else if (error.request) {
        // 요청이 이루어졌지만 응답을 받지 못했습니다.
        res.status(500).send('fetch error: No response received. ' + error.message);
    } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        res.status(500).send('fetch error: Error setting up request. ' + error.message);
    }
  }
}; 