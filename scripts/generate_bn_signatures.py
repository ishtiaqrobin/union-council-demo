from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

sig_html = """<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'>
<style>
  @font-face {
    font-family: 'SolaimanLipi';
    src: url('../fonts/SolaimanLipi_Bold.ttf') format('truetype');
    font-weight: bold;
  }
  body { background: transparent; padding: 20px; }
  .sig-card { display: inline-block; margin: 15px; border: 1px dashed #ccc; padding: 10px; }
</style>
</head>
<body>

  <!-- Bengali Handwritten Calligraphy Signature: মোঃ সাহাবুদ্দিন -->
  <div id='sig_bengali' class='sig-card'>
    <svg width='220' height='75' viewBox='0 0 220 75' xmlns='http://www.w3.org/2000/svg'>
      <g transform='rotate(-4 110 37)'>
        <text x='15' y='42' font-family='SolaimanLipi, cursive, sans-serif' font-size='26' font-weight='bold' font-style='italic' fill='#0e2a54' letter-spacing='0.5'>
          মোঃ সাহাবুদ্দিন
        </text>
        <!-- Fluid ballpen underline with flourish tail -->
        <path d='M 12,52 C 55,50 115,50 195,46 C 204,45 208,41 202,36' stroke='#0e2a54' stroke-width='2.2' fill='none' stroke-linecap='round' />
        <circle cx='95' cy='62' r='1.8' fill='#0e2a54' />
        <circle cx='108' cy='62' r='1.8' fill='#0e2a54' />
      </g>
    </svg>
  </div>

  <!-- Secretary Bengali Signature: সৈয়দ মেহেদী মাসুদ -->
  <div id='sig_sec_bn' class='sig-card'>
    <svg width='220' height='75' viewBox='0 0 220 75' xmlns='http://www.w3.org/2000/svg'>
      <g transform='rotate(-3 110 37)'>
        <text x='15' y='42' font-family='SolaimanLipi, cursive, sans-serif' font-size='24' font-weight='bold' font-style='italic' fill='#1e3a8a' letter-spacing='0.5'>
          মেহেদী মাসুদ
        </text>
        <path d='M 12,52 C 50,50 100,50 185,46 C 195,45 200,40 196,35' stroke='#1e3a8a' stroke-width='2.2' fill='none' stroke-linecap='round' />
        <circle cx='90' cy='62' r='1.8' fill='#1e3a8a' />
      </g>
    </svg>
  </div>

</body>
</html>"""

with open('e:/Mission404/NextJs/Union Council/Demo/scripts/sig_bn_test.html', 'w', encoding='utf-8') as f:
    f.write(sig_html)

options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)
driver.get('file:///e:/Mission404/NextJs/Union Council/Demo/scripts/sig_bn_test.html')
driver.find_element(By.ID, 'sig_bengali').screenshot('e:/Mission404/NextJs/Union Council/Demo/scripts/sig_bengali.png')
driver.find_element(By.ID, 'sig_sec_bn').screenshot('e:/Mission404/NextJs/Union Council/Demo/scripts/sig_sec_bn.png')
driver.quit()
print('Bengali signatures captured!')
