/* LOGIK AI & KNOWLEDGE BASE DENGAN ALASAN MEDIS */
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const knowledgeBase = {
    "tidur": "Untuk masalah susah tidur, aku merekomendasikan Teh Seduh Chamomile. Teh ini mengandung apigenin, yaitu antioksidan kuat yang mengikat reseptor di otak untuk memicu rasa kantuk dan relaksasi. Seduh air hangat 30 menit sebelum tidur ya.",
    "insomnia": "Untuk insomnia, aku merekomendasikan Teh Seduh Chamomile. Karena bebas kafein dan mengandung apigenin, teh ini sangat aman untuk menenangkan sistem saraf sebelum tidur.",
    "batuk": "Batuk & radang bisa diredakan dengan Jahe Merah Instan. Alasannya, jahe merah mengandung gingerol tingkat tinggi yang berfungsi sebagai anti-inflamasi alami untuk melegakan tenggorokan. Bisa dibeli di waruhg/apotek terdekat.",
    "radang": "Batuk & radang bisa diredakan dengan Jahe Merah Instan karena kandungan gingerolnya bertindak sebagai analgesik alami.",
    "pegal": "Pegal-pegal atau tegang otot? Coba gunakan Minyak Urut Sereh Wangi. Ekstrak citronella di dalamnya efektif memberikan efek hangat yang menembus pori-pori dan melancarkan sirkulasi darah perifer.",
    "imun": "Untuk menjaga daya tahan tubuh, Madu Hutan Tropis sangat cocok. Madu murni kaya akan flavonoid dan enzim diastase yang terbukti klinis meningkatkan respon imun alami tubuh.",
    "kudis": "Untuk infeksi kulit seperti kudis, aku merekomendasikan Sabun Sulfur Organik. Kandungan belerang murninya bertindak sebagai agen keratolitik yang mampu membasmi tungau dan bakteri penyebab gatal. Kamu bisa mencarinya di apotek terdekat.",
    "gatal": "Gatal, alergi, atau biduran sangat cocok diobati dengan kapsul Herba Histaminic. Ramuan ini mengandung antihistamin alami yang memblokir reaksi alergi dari dalam tubuh.",
    "cacar": "Untuk gatal cacar atau eksim, Herba Histaminic direkomendasikan karena kemampuannya menekan pelepasan histamin di kulit.",
    "maag": "Untuk masalah lambung/GERD, Zativa dari Kalbe adalah pilihan tepat. Kandungan Curcumin dari kunyit berfungsi melapisi dinding lambung, sementara Habbatussauda mengurangi peradangan usus. Dapatkan di apotek ya.",
    "pencernaan": "Untuk merawat pencernaan, Zativa (Kalbe) atau Ekstrak Daun Jambu sangat baik karena sifat antibakterinya.",
    "diare": "Segera konsumsi Ekstrak Daun Jambu Biji. Ekstrak ini mengandung Quercetin yang bekerja cepat menghambat pelepasan asetilkolin, sehingga feses cepat memadat dan bakteri mati.",
    "diabetes": "Bagi penderita diabetes, Diagard dari Nutrimax sangat direkomendasikan. Ekstrak Bitter Melon (Pare) di dalamnya meniru kerja insulin, sementara Chromemate membantu sel tubuh merespons insulin dengan lebih baik.",
    "gula darah": "Untuk menstabilkan gula darah, Diagard adalah suplemen yang pas karena bekerja langsung di tingkat metabolisme sel. Dapatkan di apotek resmi.",
    "asam urat": "Nyeri asam urat/encok? Gunakan Paket Herbal Asam Urat De Nature. Ramuan ini bekerja dengan cara meluruhkan kristal purin yang menumpuk di persendian melalui saluran kemih.",
    "encok": "Nyeri sendi atau encok bisa diredakan dengan Paket Herbal Asam Urat De Nature karena sifat diuretik alaminya.",
    "default": "Maaf, aku belum menemukan rekomendasi herbal yang spesifik untuk itu. Coba sebutkan keluhan utamanya (contoh: maag, gatal, asam urat, atau susah tidur). Seluruh produk rekomendasi kami tervalidasi dan bisa didapatkan di warung/apotek."
};

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'd-flex justify-content-end mb-3' : 'd-flex justify-content-start mb-3';
    const bubbleClass = sender === 'user' ? 'user-message shadow-sm' : 'bot-message shadow-sm';
    messageDiv.innerHTML = `<div class="${bubbleClass}">${text}</div>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function processInput() {
    const text = userInput.value.trim().toLowerCase();
    if (text === "") return;
    appendMessage('user', userInput.value);
    userInput.value = "";
    setTimeout(function() {
        let response = knowledgeBase["default"]
        for (let key in knowledgeBase) {
            if (text.includes(key)) {
                response = knowledgeBase[key];
                break;
            }
        }
        appendMessage('bot', response);
    }, 1000);
}

sendBtn.addEventListener('click', processInput);
userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') processInput();
});

/* LOGIK FORM MITRA */
const formMitra = document.getElementById('formMitra');
if(formMitra) {
    formMitra.addEventListener('submit', function(event) {
        event.preventDefault();
        const namaUsaha = document.getElementById('namaUmkm').value;
        alert(`Terima kasih, pendaftaran untuk "${namaUsaha}" berhasil terkirim!\n\nTim Healthy Playbook akan segera memvalidasi data Anda.`);
        formMitra.reset();
    });
}

/* LOGIK PAGINASI */
document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll('.product-item');
    const paginationUI = document.getElementById('paginationUI');
    let currentPage = 1;
    
    let itemsPerPage = window.innerWidth < 768 ? 4 : 8; 

    function getTotalPages() { return Math.ceil(products.length / itemsPerPage); }

    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        products.forEach((product, index) => {
            product.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
        renderPaginationUI();
    }

    function renderPaginationUI() {
        paginationUI.innerHTML = ""; 
        const totalPages = getTotalPages();
        if (totalPages <= 1) {
            paginationUI.style.display = 'none';
            return;
        } else {
            paginationUI.style.display = 'flex';
        }

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            const a = document.createElement('a');
            a.className = "page-link";
            a.href = "#katalog";
            a.innerText = i;
            a.addEventListener('click', function(e) {
                e.preventDefault();
                showPage(i);
            });
            li.appendChild(a);
            paginationUI.appendChild(li);
        }
    }

    window.addEventListener('resize', function() {
        let newItemsPerPage = window.innerWidth < 768 ? 4 : 8;
        if (newItemsPerPage !== itemsPerPage) {
            itemsPerPage = newItemsPerPage;
            showPage(1); 
        }
    });

    showPage(1);
});