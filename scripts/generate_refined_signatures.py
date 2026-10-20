from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

sig_html = """<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'>
<style>
  body { background: transparent; padding: 25px; margin: 0; }
  .sig-box { display: inline-block; margin: 20px; background: transparent; }
</style>
</head>
<body>

  <!-- 1. CHAIRMAN SIGNATURE: Md. Sahabuddin Mia (Chairman) -->
  <div id='chair-sig' class='sig-box'>
    <svg width='240' height='85' viewBox='0 0 240 85' xmlns='http://www.w3.org/2000/svg'>
      <!-- Flowing Dark Blue Ballpen Ink (#0e2a54) -->
      <g stroke='#0e2a54' stroke-width='2.3' fill='none' stroke-linecap='round' stroke-linejoin='round'>
        <!-- Initial 'M' with executive loops -->
        <path d='M 18,58 L 26,16 C 30,14 36,26 40,42 L 52,18 C 56,16 62,30 60,46' />
        <circle cx='68' cy='48' r='1.8' fill='#0e2a54' />
        
        <!-- Cursive 'S' flourish and flowing body 'ahabuddin' -->
        <path d='M 82,24 C 74,18 70,28 78,36 C 88,44 98,52 86,56 C 78,58 72,52 76,44 C 80,36 88,44 94,44 C 102,44 100,28 106,24 C 112,20 114,38 120,44 C 128,34 136,26 144,28 C 152,30 150,44 156,44 C 164,36 172,26 182,26 C 190,26 188,44 196,44 C 204,36 212,26 220,24 C 226,22 228,38 230,48' />
        
        <!-- Confident, sweeping underline with flourish tail -->
        <path d='M 22,66 C 75,64 140,62 220,58 C 228,57 234,54 232,46' stroke-width='2.1' />
        <circle cx='120' cy='74' r='1.8' fill='#0e2a54' />
        <circle cx='135' cy='74' r='1.8' fill='#0e2a54' />
      </g>
    </svg>
  </div>

  <!-- 2. SECRETARY SIGNATURE: Syed Mehdi Masud (Administrative Officer) -->
  <div id='sec-sig' class='sig-box'>
    <svg width='240' height='85' viewBox='0 0 240 85' xmlns='http://www.w3.org/2000/svg'>
      <g stroke='#1b3b8b' stroke-width='2.3' fill='none' stroke-linecap='round' stroke-linejoin='round'>
        <!-- Swift 'S. Mehdi' sharp loops -->
        <path d='M 20,46 C 26,30 38,18 52,18 C 64,18 58,34 44,44 C 32,52 46,62 62,56 C 74,50 72,32 82,26 C 90,20 98,38 106,46' />
        <circle cx='114' cy='46' r='1.7' fill='#1b3b8b' />
        
        <!-- 'Masud' cursive flourish -->
        <path d='M 124,46 L 130,22 L 140,42 L 150,22 L 158,44 C 166,34 174,24 184,24 C 194,24 192,42 200,44 C 208,34 216,22 226,18' />
        
        <!-- Dynamic terminal underline with backward stroke -->
        <path d='M 226,18 C 234,30 236,52 224,64 C 210,76 150,72 45,74' stroke-width='2.0' />
        <circle cx='135' cy='82' r='1.7' fill='#1b3b8b' />
      </g>
    </svg>
  </div>

  <!-- 3. ASSISTANT SIGNATURE: Md. Abdul Karim (Prepared By / Accounts Assistant) -->
  <div id='asst-sig' class='sig-box'>
    <svg width='220' height='80' viewBox='0 0 220 80' xmlns='http://www.w3.org/2000/svg'>
      <g stroke='#0e7490' stroke-width='2.2' fill='none' stroke-linecap='round' stroke-linejoin='round'>
        <!-- 'A. Karim' swift clerk initials -->
        <path d='M 24,56 L 36,20 L 48,56 M 28,42 L 44,42' />
        <circle cx='54' cy='56' r='1.6' fill='#0e7490' />
        <!-- 'Karim' cursive -->
        <path d='M 66,20 L 66,54 M 84,24 L 68,40 L 86,54 C 94,44 102,32 110,34 C 118,36 116,50 124,50 C 132,42 140,30 152,28 C 162,26 168,40 174,48' />
        <!-- Quick underline -->
        <path d='M 30,64 C 75,62 130,60 190,56' stroke-width='1.9' />
        <circle cx='110' cy='72' r='1.5' fill='#0e7490' />
      </g>
    </svg>
  </div>

</body>
</html>
"""

with open('e:/Mission404/NextJs/Union Council/Demo/scripts/sig_final_preview.html', 'w', encoding='utf-8') as f:
    f.write(sig_html)

options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)
driver.get('file:///e:/Mission404/NextJs/Union Council/Demo/scripts/sig_final_preview.html')

output_dir = 'e:/Mission404/NextJs/Union Council/Demo/public/assets/signature'
driver.find_element(By.ID, 'chair-sig').screenshot(output_dir + '/chairman-signature.png')
driver.find_element(By.ID, 'sec-sig').screenshot(output_dir + '/secretary-signature.png')
driver.find_element(By.ID, 'asst-sig').screenshot(output_dir + '/assistant-signature.png')
driver.quit()
print('Refined signatures generated successfully!')
