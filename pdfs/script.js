/**
 * Digital Union Council Certificate Generator - JavaScript
 * Dynamic Two-Way Data Binding & QR Code Generation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Default Data Mapping (matches the original PDF)
  const defaultData = {
    up_name: '০৩নং আমঝুপি ইউনিয়ন পরিষদ',
    upazila: 'মেহেরপুর সদর',
    district: 'মেহেরপুর',
    website: 'www.lgoms.org',
    serial_no: '00000018',
    cert_title: 'অবিবাহিত সনদ',
    issue_date: '29-06-2026',
    person_name: 'মুনতাহির রহমান রহিত',
    nid_no: '7382309735',
    father_name: 'মৃত মোঃ আবু তালেব',
    mother_name: 'মোছাঃ কাজল রেখা',
    village: 'আমঝুপি',
    house_no: '০০',
    ward_no: '04',
    post_office: 'আমঝুপি',
    person_upazila: 'মেহেরপুর সদর',
    person_district: 'মেহেরপুর',
    signatory_name: 'মোঃ সিরাজুল ইসলাম',
    signatory_role: 'চেয়ারম্যান(ভারপ্রাপ্ত)',
    trn_no: '10422',
    qr_url: 'https://www.lgoms.org/umc_certificates.php?id=10422'
  };

  // Field Binding Map
  const fields = [
    'up_name', 'upazila', 'district', 'website',
    'serial_no', 'cert_title', 'issue_date',
    'person_name', 'nid_no', 'father_name', 'mother_name',
    'village', 'house_no', 'ward_no', 'post_office',
    'person_upazila', 'person_district',
    'signatory_name', 'signatory_role', 'trn_no', 'qr_url'
  ];

  // Function to generate / update QR Code
  let qrCodeInstance = null;
  function updateQRCode(urlText) {
    const qrHolder = document.getElementById('qrcode');
    if (!qrHolder) return;
    qrHolder.innerHTML = '';
    
    try {
      if (typeof QRCode !== 'undefined') {
        qrCodeInstance = new QRCode(qrHolder, {
          text: urlText || 'https://www.lgoms.org/umc_certificates.php?id=10422',
          width: 90,
          height: 90,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    } catch (e) {
      console.warn('QR Code generation error:', e);
    }
  }

  // Update Display elements from Input fields
  function syncData() {
    fields.forEach(field => {
      const inputElem = document.getElementById(`input_${field}`);
      const displayElem = document.getElementById(`display_${field}`);
      
      if (inputElem && displayElem) {
        displayElem.textContent = inputElem.value;
      }
    });

    // Signatory Office & Location Sync
    const upName = document.getElementById('input_up_name')?.value || '';
    const upazila = document.getElementById('input_upazila')?.value || '';
    const district = document.getElementById('input_district')?.value || '';

    const officeElem = document.getElementById('display_signatory_office');
    const locElem = document.getElementById('display_signatory_loc');

    if (officeElem) officeElem.textContent = upName;
    if (locElem) locElem.textContent = `${upazila}, ${district}।`;

    // QR URL Sync
    const qrInput = document.getElementById('input_qr_url');
    if (qrInput) {
      updateQRCode(qrInput.value);
    }
  }

  // Bind live input listeners
  fields.forEach(field => {
    const inputElem = document.getElementById(`input_${field}`);
    if (inputElem) {
      inputElem.addEventListener('input', syncData);
    }
  });

  // Action Buttons
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      Object.keys(defaultData).forEach(key => {
        const inputElem = document.getElementById(`input_${key}`);
        if (inputElem) {
          inputElem.value = defaultData[key];
        }
      });
      syncData();
    });
  }

  const toggleFormBtn = document.getElementById('toggleFormBtn');
  const editDrawer = document.getElementById('editDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  if (toggleFormBtn && editDrawer) {
    toggleFormBtn.addEventListener('click', () => {
      editDrawer.classList.toggle('collapsed');
    });
  }

  if (closeDrawerBtn && editDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      editDrawer.classList.add('collapsed');
    });
  }

  // Initial Sync & QR Code Render
  syncData();
});
