import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from PIL import Image

def build_seals_and_signatures_html():
    return """<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<title>Official UP Seals and Signatures</title>
<style>
  @font-face {
    font-family: 'SolaimanLipi';
    src: url('../fonts/SolaimanLipi_Bold.ttf') format('truetype');
    font-weight: bold;
  }
  @font-face {
    font-family: 'SolaimanLipi';
    src: url('../fonts/SolaimanLipi.ttf') format('truetype');
    font-weight: normal;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background: transparent;
    margin: 0;
    padding: 30px;
    font-family: 'SolaimanLipi', 'Vrinda', 'Nirmala UI', sans-serif;
  }
  .asset-box {
    display: inline-block;
    background: transparent;
    margin: 20px;
  }
</style>
</head>
<body>

  <!-- 1. CHAIRMAN SEAL (৩৬০x৩৬০ HD) -->
  <div id="chairman-seal" class="asset-box">
    <svg width="340" height="340" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Top Arc: clockwise from left to right -->
        <path id="topArc" d="M 44,170 A 126,126 0 0,1 296,170" fill="none" />
        <!-- Bottom Arc: sweeping under from left to right (counter-clockwise sweep=0) so text is upright -->
        <path id="bottomArc" d="M 52,176 A 122,122 0 0,0 288,176" fill="none" />
      </defs>

      <!-- Outer Double Border -->
      <circle cx="170" cy="170" r="162" fill="none" stroke="#1b3b8b" stroke-width="4.5" />
      <circle cx="170" cy="170" r="154" fill="none" stroke="#1b3b8b" stroke-width="1.2" />

      <!-- Inner Border with decorative serration/dots -->
      <circle cx="170" cy="170" r="108" fill="none" stroke="#1b3b8b" stroke-width="1.8" />
      <circle cx="170" cy="170" r="102" fill="none" stroke="#1b3b8b" stroke-width="1.0" stroke-dasharray="3.5,3" />

      <!-- Top Curved Text: ১নং বসন্তপুর ইউনিয়ন পরিষদ -->
      <text font-family="'SolaimanLipi', 'Vrinda', sans-serif" font-size="20.5" font-weight="bold" fill="#1b3b8b" letter-spacing="1.2">
        <textPath href="#topArc" startOffset="50%" text-anchor="middle">
          ১নং বসন্তপুর ইউনিয়ন পরিষদ
        </textPath>
      </text>

      <!-- Dividing Stars -->
      <text x="38" y="177" font-size="18" fill="#1b3b8b" text-anchor="middle">★</text>
      <text x="302" y="177" font-size="18" fill="#1b3b8b" text-anchor="middle">★</text>

      <!-- Bottom Curved Text: রাজবাড়ী সদর, রাজবাড়ী -->
      <text font-family="'SolaimanLipi', 'Vrinda', sans-serif" font-size="18" font-weight="bold" fill="#1b3b8b" letter-spacing="1.5">
        <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">
          রাজবাড়ী সদর, রাজবাড়ী
        </textPath>
      </text>

      <!-- Center Box for Designation -->
      <rect x="58" y="146" width="224" height="48" rx="6" fill="none" stroke="#1b3b8b" stroke-width="2.2" />
      <text x="170" y="178" font-family="'SolaimanLipi', 'Vrinda', sans-serif" font-size="26" font-weight="bold" fill="#1b3b8b" text-anchor="middle" letter-spacing="2">
        চেয়ারম্যান
      </text>
    </svg>
  </div>


  <!-- 2. SECRETARY SEAL (৩৬০x৩৬০ HD) -->
  <div id="secretary-seal" class="asset-box">
    <svg width="340" height="340" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="secTopArc" d="M 44,170 A 126,126 0 0,1 296,170" fill="none" />
        <path id="secBottomArc" d="M 52,176 A 122,122 0 0,0 288,176" fill="none" />
      </defs>

      <!-- Outer Double Border -->
      <circle cx="170" cy="170" r="162" fill="none" stroke="#1e3a8a" stroke-width="4.5" />
      <circle cx="170" cy="170" r="154" fill="none" stroke="#1e3a8a" stroke-width="1.2" />

      <!-- Inner Border -->
      <circle cx="170" cy="170" r="108" fill="none" stroke="#1e3a8a" stroke-width="1.8" />
      <circle cx="170" cy="170" r="102" fill="none" stroke="#1e3a8a" stroke-width="1.0" stroke-dasharray="3.5,3" />

      <!-- Top Curved Text -->
      <text font-family="'SolaimanLipi', 'Vrinda', sans-serif" font-size="20.5" font-weight="bold" fill="#1e3a8a" letter-spacing="1.2">
        <textPath href="#secTopArc" startOffset="50%" text-anchor="middle">
          ১নং বসন্তপুর ইউনিয়ন পরিষদ
        </textPath>
      </text>

      <!-- Stars -->
      <text x="38" y="177" font-size="18" fill="#1e3a8a" text-anchor="middle">★</text>
      <text x="302" y="177" font-size="18" fill="#1e3a8a" text-anchor="middle">★</text>

      <!-- Bottom Curved Text -->
      <text font-family="'SolaimanLipi', 'Vrinda', sans-serif" font-size="18" font-weight="bold" fill="#1e3a8a" letter-spacing="1.5">
        <textPath href="#secBottomArc" startOffset="50%" text-anchor="middle">
          রাজবাড়ী সদর, রাজবাড়ী
        </textPath>
      </text>

      <!-- Center Box for Designation -->
      <rect x="48" y="146" width="244" height="48" rx="6" fill="none" stroke="#1e3a8a" stroke-width="2.2" />
      <text x="170" y="178" font-family="'SolaimanLipi', 'Vrinda', sans-serif" font-size="21.5" font-weight="bold" fill="#1e3a8a" text-anchor="middle" letter-spacing="1">
        প্রশাসনিক কর্মকর্তা
      </text>
    </svg>
  </div>


  <!-- 3. ASSISTANT SEAL (৩৬০x৩৬০ HD) -->
  <div id="assistant-seal" class="asset-box">
    <svg width="340" height="340" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="asstTopArc" d="M 44,170 A 126,126 0 0,1 296,170" fill="none" />
        <path id="asstBottomArc" d="M 52,176 A 122,122 0 0,0 288,176" fill="none" />
      </defs>

      <!-- Outer Double Border -->
      <circle cx="170" cy="170" r="162" fill="none" stroke="#0e7490" stroke-width="4.5" />
      <circle cx="170" cy="170" r="154" fill="none" stroke="#0e7490" stroke-width="1.2" />

      <!-- Inner Border -->
      <circle cx="170" cy="170" r="108" fill="none" stroke="#0e7490" stroke-width="1.8" />
      <circle cx="170" cy="170" r="102" fill="none" stroke="#0e7490" stroke-width="1.0" stroke-dasharray="3.5,3" />

      <!-- Top Curved Text -->
      <text font-family="'SolaimanLipi', 'Vrinda', sans-serif" font-size="20.5" font-weight="bold" fill="#0e7490" letter-spacing="1.2">
        <textPath href="#asstTopArc" startOffset="50%" text-anchor="middle">
          ১নং বসন্তপুর ইউনিয়ন পরিষদ
        </textPath>
      </text>

      <!-- Stars -->
      <text x="38" y="177" font-size="18" fill="#0e7490" text-anchor="middle">★</text>
      <text x="302" y="177" font-size="18" fill="#0e7490" text-anchor="middle">★</text>

      <!-- Bottom Curved Text -->
      <text font-family="'SolaimanLipi', 'Vrinda', sans-serif" font-size="18" font-weight="bold" fill="#0e7490" letter-spacing="1.5">
        <textPath href="#asstBottomArc" startOffset="50%" text-anchor="middle">
          রাজবাড়ী সদর, রাজবাড়ী
        </textPath>
      </text>

      <!-- Center Box for Designation -->
      <rect x="42" y="146" width="256" height="48" rx="6" fill="none" stroke="#0e7490" stroke-width="2.2" />
      <text x="170" y="177" font-family="'SolaimanLipi', 'Vrinda', sans-serif" font-size="19" font-weight="bold" fill="#0e7490" text-anchor="middle" letter-spacing="0.5">
        হিসাবসহকারী/প্রস্তুতকারী
      </text>
    </svg>
  </div>


  <!-- 4. CHAIRMAN SIGNATURE (REALISTIC EXECUTIVE CALLIGRAPHIC BALLPEN STROKE) -->
  <div id="chairman-signature" class="asset-box">
    <svg width="260" height="95" viewBox="0 0 260 95" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#0f2b5c" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Initial 'Md.' artistic flourish -->
        <path d="M 24,62 C 20,44 24,24 34,18 C 42,12 48,26 46,45 C 44,58 54,28 62,22 C 70,16 74,32 72,50" />
        <circle cx="78" cy="54" r="1.6" fill="#0f2b5c" />
        
        <!-- Cursive 'Sahabuddin' swift pen strokes -->
        <path d="M 88,40 C 82,28 92,15 106,14 C 118,13 112,30 98,36 C 85,42 94,56 110,50 C 122,45 125,35 132,28 C 138,22 144,36 148,45 C 153,32 160,25 168,27 C 177,29 175,44 182,41 C 190,37 197,23 208,19 C 215,16 220,28 224,40 C 226,44 232,32 236,26" />
        
        <!-- Graceful Underline Flourish extending under name -->
        <path d="M 32,72 C 78,70 148,68 238,62 C 244,61 250,58 252,52" stroke-width="2.3" />
        
        <!-- Elegant accent dots -->
        <circle cx="130" cy="82" r="1.8" fill="#0f2b5c" />
        <circle cx="144" cy="82" r="1.8" fill="#0f2b5c" />
      </g>
    </svg>
  </div>


  <!-- 5. SECRETARY SIGNATURE (SWIFT EXECUTIVE STROKES) -->
  <div id="secretary-signature" class="asset-box">
    <svg width="260" height="95" viewBox="0 0 260 95" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#1e3a8a" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Initial 'Syed' loop and sharp stroke -->
        <path d="M 28,48 C 32,30 44,18 58,18 C 70,18 64,36 48,46 C 36,52 50,62 68,55 C 82,48 76,32 88,25 C 96,20 104,38 112,48" />
        
        <!-- 'Mehdi Masud' flowing calligraphy -->
        <path d="M 120,50 C 124,32 132,20 142,20 C 152,20 150,38 158,46 C 164,32 172,24 182,24 C 192,24 194,40 202,46 C 210,34 220,20 232,16" />
        
        <!-- Terminal flourish with sharp backward return underline -->
        <path d="M 232,16 C 242,28 244,52 234,64 C 220,78 158,74 58,76" stroke-width="2.1" />
        <circle cx="152" cy="85" r="1.8" fill="#1e3a8a" />
      </g>
    </svg>
  </div>


  <!-- 6. ASSISTANT SIGNATURE (CLEAN PROFESSIONAL CLERK INITIALS) -->
  <div id="assistant-signature" class="asset-box">
    <svg width="240" height="85" viewBox="0 0 240 85" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#0e7490" stroke-width="2.3" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Quick 'A. Karim' / প্রস্তুতকারী signature -->
        <path d="M 32,58 C 38,40 48,22 60,18 C 70,15 66,34 62,48 C 58,60 74,50 86,40 C 95,31 102,44 110,50 C 116,36 126,27 136,30 C 146,33 148,46 156,48 C 166,40 176,24 190,20" />
        <!-- Quick underline -->
        <path d="M 48,66 C 92,64 148,62 205,58" stroke-width="2.0" />
        <circle cx="125" cy="74" r="1.6" fill="#0e7490" />
      </g>
    </svg>
  </div>

</body>
</html>
"""

def generate():
    html_content = build_seals_and_signatures_html()
    html_path = "e:/Mission404/NextJs/Union Council/Demo/scripts/seals_preview.html"
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--window-size=1400,900")
    options.add_argument("--hide-scrollbars")
    
    driver = webdriver.Chrome(options=options)
    driver.get("file:///" + os.path.abspath(html_path).replace("\\\\", "/"))
    time.sleep(1)

    output_dir = "e:/Mission404/NextJs/Union Council/Demo/public/assets/signature"
    os.makedirs(output_dir, exist_ok=True)

    elements = {
        "chairman-seal": "chairman-seal.png",
        "secretary-seal": "secretary-seal.png",
        "assistant-seal": "assistant-seal.png",
        "chairman-signature": "chairman-signature.png",
        "secretary-signature": "secretary-signature.png",
        "assistant-signature": "assistant-signature.png",
    }

    for elem_id, filename in elements.items():
        elem = driver.find_element(By.ID, elem_id)
        out_path = os.path.join(output_dir, filename)
        elem.screenshot(out_path)
        print(f"Captured {elem_id} -> {out_path}")

    # Synchronize default placeholders with the authentic Chairman assets
    Image.open(os.path.join(output_dir, "chairman-seal.png")).save(
        os.path.join(output_dir, "seal-placeholder.png")
    )
    Image.open(os.path.join(output_dir, "chairman-signature.png")).save(
        os.path.join(output_dir, "signature-placeholder.png")
    )
    print("Updated seal-placeholder.png and signature-placeholder.png successfully!")

    driver.quit()

if __name__ == "__main__":
    generate()
