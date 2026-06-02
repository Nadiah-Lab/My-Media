let score = 0;
let currentIsland = "";
let currentQuestionIndex = 0;
let timerInterval = null;
let timeLeft = 10;
let nextActionAfterFeedback = null;
let audioStarted = false;

function kembaliKeMenuUtama() {
    document.getElementById("homeScreen").style.display = "block";
    
    const videoBg = document.getElementById("bg-video");
    if (videoBg) {
        videoBg.currentTime = 0; 
        videoBg.play();         
    }
}

document.addEventListener('click', function() {
    const videoBg = document.getElementById('bg-video');
    
    if (videoBg) {
        videoBg.muted = false; 
        
        videoBg.volume = 0.6; 
        
        videoBg.play().catch(function(error) {
            console.log("Suara video gagal dibuka:", error);
        });
    }
}, { once: true }); 

const badgeInfo = {
    sabang: { 
        title: "⚓ Lencana Titik Nol", 
        desc: "Selamat! Jangkar kapalmu telah menancap di titik nol kilometer maritim Indonesia yang menjadi gerbang paling barat Nusantara. Kamu terbukti mampu menerapkan sifat dasar (identitas) logaritma." 
    },
    sumatera: { 
        title: "🐯 Lencana Harimau Sumatra", 
        desc: "Kamu mendapatkan kekuatan Harimau Sumatra (<em> Panthera Tigris Sondaica </em>), sang ikon puncak rantai makanan di pulau Sumatra. Kamu sukses menerapkan sifat pangkat logaritma." 
    },
    jawa: { 
        title: "🦅 Lencana Elang Jawa", 
        desc: "Kamu dianugerahi ketajaman Elang Jawa (<em> Nisaetus Bartelsi </em>), satwa endemik langka yang menjadi inspirasi nyata di balik sosok garuda, lambang Negara Indonesia. Selamat kamu berhasil menerapkan sifat perkalian logaritma." 
    },
    kalimantan: { 
        title: "🦧 Lencana Penjaga Hutan", 
        desc: "Terima kasih dari Orangutan, primata endemik vital penjaga kelestarian hutan hujan tropis Kalimantan. Kamu terbukti mampu menerapkan sifat pembagian logaritma." 
    },
    sulawesi: { 
        title: "🐃 Lencana Ksatria Anoa", 
        desc: "Kamu mewarisi keteguhan Anoa (<em> Bubalus Depressicornis </em>), mamalia purba terkecil kerabat kerbau yang hanya hidup di Pulau Sulawesi. Luar biasa, kamu mampu menggunakan sifat pangkat numerus untuk menyederhanakan perhitungan." 
    },
    papua: { 
        title: "🪶 Lencana Mahkota Cendrawasih", 
        desc: "Kamu dianugerahi keindahan Cendrawasih, dijuluki burung surga (<em> Bird of Paradise </em>) sakral yang dijunjung tinggi adat Papua. Selamat kamu mampu mengubah basis dan memanipulasi sifat kebalikan pecahan." 
    },
    merauke: { 
        title: "🏰 Lencana Master Anim Ha", 
        desc: "Luar biasa! Kamu telah melintasi Nusantara dari ujung barat hingga tiba di titik nol Daratan Timur, Bumi Anim Ha (Merauke). Layaknya Musamus, istana tanah kokoh yang dibangun dengan gotong royong, kamu telah mengerahkan seluruh kerja kerasmu untuk menyelesaikan operasi perkalian berantai logaritma." 
    }
};

const gameDatabase = {
    sabang: {
        name: "Pulau Weh (Sabang)",
        timeLimit: 15,
        story: "Selamat datang di titik nol Barat Indonesia, Pulau Weh. Mulailah perjalananmu dengan mempelajari dua sifat logaritma dasar (identitas).",
        materi: `Logaritma merupakan kebalikan (invers) dari eksponen (perpangkatan). 
                 Jika bentuk pangkatnya adalah <strong>a<sup>b</sup> = c</strong>, maka bentuk logaritmanya menjadi:
                 
                 <div class="math-block"><sup>a</sup>log c = b</div>
                 
                 <strong>📋 Keterangan Komponen:</strong>
                 <ul style="list-style-type: disc; padding-left: 20px; margin: 10px 0; text-align: left;">
                     <li><strong>a</strong> = <strong>Basis</strong> (bilangan pokok), syaratnya harus positif dan tidak boleh sama dengan 1 (a > 0, a ≠ 1).</li>
                     <li><strong>b</strong> = <strong>Numerus</strong> (b > 0).</li>
                     <li><strong>c</strong> = <strong>Hasil logaritma</strong> (bilangan yang dicari nilai logaritmanya).</li>
                 </ul>
                 
                 <hr style="border: 0; border-top: 1px dashed #dfa620; margin: 15px 0;">
                 
                 Di level awal ini, kamu wajib mempelajari <strong>dua sifat dasar logaritma (identitas)</strong> berikut:
                 <div class="math-block">1. <sup>a</sup>log a = 1</div>
                 <div class="math-block">2. <sup>a</sup>log 1 = 0</div>
                 
                 <div style="text-align: left; margin-top: 15px; font-size: 0.95rem;">
                     <strong>💡 Contoh:</strong>
                     
                     <div style="margin-top: 8px; margin-bottom: 12px;">
                         <span style="color: #ffff; font-weight: bold;">1. Sifat Identitas:</span><br>
                         <sup>5</sup>log 5 = <span style="color: #ffff;">1</span> &nbsp;&nbsp;➔ &nbsp;<em>(karena 5<sup>1</sup> = 5)</em>
                     </div>
                     
                     <div style="margin-top: 8px;">
                         <span style="color: #ffff; font-weight: bold;">2. Sifat Identitas:</span><br>
                         <sup>7</sup>log 1 = <span style="color: #ffff;">0</span> &nbsp;&nbsp;➔ &nbsp;<em>(karena 7<sup>0</sup> = 1)</em>
                     </div>
                     
                     <p style="margin-top: 10px; font-size: 0.9rem; color: #bbb;">
                         <em>Kesimpulan: Berapapun angka basisnya, jika angka numerusnya adalah 1, hasilnya pasti 0.</em>
                     </p>
                 </div>`,
        questions: [
            { q: "Berapakah nilai dari <sup>3</sup>log 3?", o: ["3", "1", "0", "9"], a: 1 },
            { q: "Nilai dari <sup>5</sup>log 1 adalah...", o: ["5", "1", "0", "25"], a: 2 },
            { q: "Berapa hasil dari <sup>2</sup>log 2 + <sup>4</sup>log 1?", o: ["1", "2", "0", "3"], a: 0 }
        ],
        badgeSymbol: "⚓",
        nextIsland: "sumatera"
    },
    sumatera: {
        name: "Pulau Sumatra",
        timeLimit: 25, 
        story: "Kapalmu tiba di Pulau Sumatra, tantangan mulai sulit. Mari kita gunakan sifat dari Pulau Sabang untuk menguasai sifat pangkat logaritma.",
        materi: `Jika nilai numerus merupakan bilangan berpangkat yang basisnya sama dengan basis logaritma, maka hasil logaritma adalah nilai dari pangkat tersebut:
                 <div class="math-block"><sup>a</sup>log a<sup>n</sup> = n</div>
                 
                 <strong> Penjelasan: </strong>
                 <div style="text-align: left; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; margin: 10px 0; font-family: monospace; font-size: 1rem;">
                     <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 8px; line-height: 1.8;">
                         <div><sup>a</sup>log a<sup>n</sup></div> <div>=</div> <div>n × <span style="color: #ffff;"><sup>a</sup>log a</span></div>
                         <div></div>                   <div>=</div> <div>n × <span style="color: #ffff;">1</span> &nbsp;&nbsp;&nbsp;<em>(sifat dasar sebelumnya)</em></div>
                         <div></div>                   <div>=</div> <div><span style="color: #ffff; font-weight: bold;">n</span></div>
                     </div>
                 </div>
                 
                 <div style="text-align: left; margin-top: 15px; font-size: 0.95rem;">
                     <strong>💡 Contoh:</strong>
                     <div style="background: rgba(255,255,255,0.05); padding: 12px; border-left: 3px solid #ffff; margin-top: 5px; font-family: monospace;">
                         <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 8px; line-height: 1.8;">
                             <div><sup>2</sup>log 2<sup>5</sup></div> <div>=</div> <div>5 × <sup>2</sup>log 2</div>
                             <div></div>                 <div>=</div> <div>5 × 1</div>
                             <div></div>                 <div>=</div> <div><span>5</span></div>
                         </div>
                     </div>
                     <p style="margin-top: 8px; font-size: 0.9rem; color: #bbb;">
                         <em>Kesimpulan: Jika angka basis dan angka numerus sama, kamu bisa langsung mengambil angka pangkatnya saja sebagai jawaban akhir.</em>
                     </p>
                 </div>`,
        questions: [
            { q: "Berapakah nilai dari <sup>3</sup>log 3<sup>4</sup>?", o: ["3", "4", "12", "1"], a: 1 },
            { q: "Berapa nilai akhir dari <sup>5</sup>log 25?", o: ["5", "25", "2", "1"], a: 2 },
            { q: "Hasil dari <sup>2</sup>log 8 + <sup>3</sup>log 1 adalah...", o: ["3", "4", "8", "0"], a: 0 },
            { q: "Berapakah nilai dari <sup>10</sup>log 1000?", o: ["10", "100", "2", "3"], a: 3 },
            { q: "Berapa hasil dari <sup>2</sup>log 2<sup>7</sup> - <sup>5</sup>log 5<sup>3</sup>?", o: ["4", "10", "2", "3"], a: 0 }
        ],
        badgeSymbol: "🐯",
        nextIsland: "jawa"
    },
    jawa: {
        name: "Pulau Jawa",
        timeLimit: 35, 
        story: "Selamat datang di Pulau Jawa! Di pulau ini, kamu akan belajar sifat perkalian logaritma.",
        materi: `Sifat perkalian numerus dapat dipecah menjadi penjumlahan logaritma dan sebaliknya, penjumlahan logaritma dengan basis yang sama dapat digabung menjadi perkalian numerus:
                 
                 <div class="math-block">
                     <sup>a</sup>log(b × c) = <sup>a</sup>log b + <sup>a</sup>log c <br>
                     <sup>a</sup>log b + <sup>a</sup>log c = <sup>a</sup>log(b × c)
                 </div>
                 
                 <strong>Penjelasan:</strong>
                 <p style="text-align: left; font-size: 0.9rem; margin-bottom: 5px; color: #bbb;">
                     Misalkan <sup>a</sup>log b = x (maka a<sup>x</sup> = b) dan <sup>a</sup>log c = y (maka a<sup>y</sup> = c). Jika dikalikan:
                 </p>
                 <div style="text-align: left; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; margin: 10px 0; font-family: monospace; font-size: 0.95rem;">
                     <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 8px; line-height: 1.8;">
                         <div>b × c</div> <div>=</div> <div>a<sup>x</sup> × a<sup>y</sup></div>
                         <div>b × c</div> <div>=</div> <div>a<sup>x + y</sup> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>(Sifat Eksponen)</em></div>
                         <div><sup>a</sup>log(b × c)</div> <div>=</div> <div>x + y &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>(Ubah ke Logaritma)</em></div>
                         <div><sup>a</sup>log(b × c)</div> <div>=</div> <div><span style="font-weight: bold;"><sup>a</sup>log b + <sup>a</sup>log c</span></div>
                     </div>
                 </div>
                 
                 <div style="text-align: left; margin-top: 15px; font-size: 0.95rem;">
                     <strong>💡 Contoh:</strong>
                     <div style="background: rgba(255,255,255,0.05); padding: 12px; border-left: 3px solid #ffff; margin-top: 5px; font-family: monospace;">
                         <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 8px; line-height: 1.8; align-items: center;">
                             
                             <div>1. <sup>2</sup>log(4 × 8)</div> <div>=</div> <div><sup>2</sup>log 4 + <sup>2</sup>log 8</div>
                                                    <div></div>   <div>=</div> <div>5</div>
                             
                             <div style="grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,0.1); margin: 5px 0;"></div>
                             
                             <div>2. <sup>3</sup>log 9 + <sup>3</sup>log 3</div> <div>=</div> <div><sup>3</sup>log(9 × 3)</div>
                             <div></div> <div>=</div> <div><sup>3</sup>log 27</div>
                             <div></div> <div>=</div> <div>3</div>
                             
                             <div style="grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,0.1); margin: 5px 0;"></div>
                             
                             <div>3. <sup>2</sup>log 2 + <sup>5</sup>log 5<sup>3</sup> + <sup>2</sup>log 4</div> <div>=</div> <div>1 + 3 + 2 &nbsp;<em></em></div>
                             <div></div> <div>=</div> <div>4 + 2</div>
                             <div></div> <div>=</div> <div><span>6</span></div>
                         </div>
                     </div>
                     <p style="margin-top: 8px; font-size: 0.9rem; color: #bbb; padding-left: 5px;">
                         <em>Kesimpulan: Sifat perkalian ini hanya berlaku jika angka basis bernilai sama.</em>
                     </p>
                 </div>`,
        questions: [
            { q: "Bentuk sederhana dari operasi <sup>2</sup>log 4 + <sup>2</sup>log 8 adalah...", o: ["<sup>2</sup>log 12", "<sup>2</sup>log 32", "<sup>4</sup>log 32", "<sup>2</sup>log 2"], a: 1 },
            { q: "Jika diketahui <sup>3</sup>log(3 × 9), bentuk penjumlahannya yang benar adalah...", o: ["<sup>3</sup>log 3 × <sup>3</sup>log 9", "<sup>3</sup>log 3 + <sup>3</sup>log 9", "<sup>9</sup>log 3 + <sup>3</sup>log 3", "<sup>3</sup>log 27"], a: 1 },
            { q: "Berapakah nilai akhir dari <sup>6</sup>log 4 + <sup>6</sup>log 9?", o: ["2", "3", "13", "36"], a: 0 }, 
            { q: "Berapakah hasil dari <sup>2</sup>log 5 + <sup>2</sup>log 0,2 + <sup>5</sup>log 1?", o: ["1", "0", "2", "5"], a: 1 }, 
            { q: "Berapa hasil dari <sup>3</sup>log 2 + <sup>3</sup>log 4,5 + <sup>2</sup>log 2<sup>3</sup>?", o: ["4", "5", "6", "9"], a: 1 }, 
            { q: "Manakah operasi penjumlahan berikut yang numerusnya tidak boleh dikalikan secara langsung?", o: ["<sup>2</sup>log 3 + <sup>2</sup>log 5", "<sup>3</sup>log 4 + <sup>3</sup>log 2", "<sup>2</sup>log 8 + <sup>3</sup>log 3", "<sup>10</sup>log 2 + <sup>10</sup>log 5"], a: 2 } 
        ],
        badgeSymbol: "🦅",
        nextIsland: "kalimantan"
    },
    kalimantan: {
        name: "Pulau Kalimantan",
        timeLimit: 40, 
        story: "Menembus belantara hutan Kalimantan. Saatnya mempelajari sifat pembagian logaritma.",
        materi: `Sifat pembagian numerus dapat dipecah menjadi pengurangan logaritma dan sebaliknya, pengurangan logaritma yang basisnya sama dapat digabung menjadi pembagian numerus:
                 
                 <div class="math-block">
                     <sup>a</sup>log <div style="color: #f1c40f; display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid #f1c40f; padding: 0 5px;">b</div><div>c</div></div> = <sup>a</sup>log b - <sup>a</sup>log c <br>
                     <span style="color: #f1c40f;"><sup>a</sup>log b - <sup>a</sup>log c = <sup>a</sup>log <div style="display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid #f1c40f; padding: 0 5px;">b</div><div>c</div></div></span>
                 </div>
                 
                 <strong>Penjelasan:</strong>
                 <div style="text-align: left; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; margin: 10px 0; font-family: monospace; font-size: 0.95rem;">
                     <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 10px; align-items: center;">
                         <div><div style="display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid white; padding: 0 5px;">b</div><div>c</div></div></div> 
                         <div>=</div> 
                         <div><div style="display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid white; padding: 0 5px;">a<sup>x</sup></div><div>a<sup>y</sup></div></div></div>
                         
                         <div><div style="display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid white; padding: 0 5px;">b</div><div>c</div></div></div> 
                         <div>=</div> 
                         <div>a<sup>x - y</sup> &nbsp;<em>(Sifat Eksponen)</em></div>
                         
                         <div><sup>a</sup>log <div style="display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid white; padding: 0 5px;">b</div><div>c</div></div></div> 
                         <div>=</div> 
                         <div>x - y &nbsp;&nbsp;&nbsp;<em>(Ubah ke Log)</em></div>
                         
                         <div><sup>a</sup>log <div style="display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid white; padding: 0 5px;">b</div><div>c</div></div></div> 
                         <div>=</div> 
                         <div><span style="color: #ffff; font-weight: bold;"><sup>a</sup>log b - <sup>a</sup>log c</span></div>
                     </div>
                 </div>
                 
                 <div style="text-align: left; margin-top: 15px; font-size: 0.95rem;">
                     <strong>💡 Contoh:</strong>
                     <div style="background: rgba(255,255,255,0.05); padding: 12px; border-left: 3px solid #ffff; margin-top: 5px; font-family: monospace;">
                         <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 8px; line-height: 1.8; align-items: center;">
                             <div><sup>2</sup>log 16 - <sup>2</sup>log 2</div> <div>=</div> <div><sup>2</sup>log <div style="display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid white; padding: 0 5px;">16</div><div>2</div></div></div>
                             <div></div> <div>=</div> <div><sup>2</sup>log 8</div>
                             <div></div> <div>=</div> <div><span style="color: #ffff;">3</span></div>
                             
                             <div style="grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,0.1); margin: 5px 0;"></div>

                             <div><sup>2</sup>log 6 + <sup>2</sup>log 4 - <sup>2</sup>log 3</div> <div>=</div> <div><sup>2</sup>log <div style="display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid white; padding: 0 5px;">6 × 4</div><div>3</div></div></div>
                             <div></div> <div>=</div> <div><sup>2</sup>log <div style="display: inline-block; vertical-align: middle; text-align: center;"><div style="border-bottom: 1px solid white; padding: 0 5px;">24</div><div>3</div></div></div>
                             <div></div> <div>=</div> <div><sup>2</sup>log 8</div>
                             <div></div> <div>=</div> <div><span style="color: #ffff;">3</span></div>
                         </div>
                     </div>
                 </div>`,
        questions: [
            { 
                q: "Bentuk sederhana dari operasi <sup>3</sup>log 30 - <sup>3</sup>log 10 adalah...", 
                o: [
                    "<sup>3</sup>log 20", 
                    "<sup>3</sup>log 3", 
                    "<sup>3</sup>log 300", 
                    "3"
                ], 
                a: 1 
            },
            { 
                q: "Berapakah nilai akhir dari operasi <sup>2</sup>log 24 - <sup>2</sup>log 3?", 
                o: [
                    "<sup>2</sup>log 21", 
                    "3", 
                    "4", 
                    "8"
                ], 
                a: 1 
            },
            { 
                q: "Bentuk <sup>3</sup>log b - <sup>3</sup>log c jika disatukan menggunakan sifat pembagian akan menjadi...", 
                o: [
                    "<sup>3</sup>log (b × c)", 
                    "<sup>3</sup>log (b - c)", 
                    "<sup>3</sup>log <div style='display: inline-block; vertical-align: middle; text-align: center;'><div style='border-bottom: 1px solid white; padding: 0 5px;'>b</div><div>c</div></div>", 
                    "<sup>9</sup>log <div style='display: inline-block; vertical-align: middle; text-align: center;'><div style='border-bottom: 1px solid white; padding: 0 5px;'>b</div><div>c</div></div>"
                ], 
                a: 2 
            },
            { 
                q: "Berapa hasil dari <sup>5</sup>log 50 - <sup>5</sup>log 2 - <sup>3</sup>log 3?", 
                o: [
                    "1", 
                    "0", 
                    "2", 
                    "5"
                ], 
                a: 0 
            },
            { 
                q: "Berapakah hasil dari <sup>2</sup>log 6 + <sup>2</sup>log 4 - <sup>2</sup>log 3?", 
                o: [
                    "2", 
                    "3", 
                    "4", 
                    "8"
                ], 
                a: 1 
            },
            { 
                q: "Berapakah hasil dari operasi <sup>3</sup>log 3<sup>5</sup> - (<sup>2</sup>log 40 - <sup>2</sup>log 5)?", 
                o: [
                    "1", 
                    "2", 
                    "3", 
                    "5"
                ], 
                a: 1 
            }
        ],
        badgeSymbol: "🦧",
        nextIsland: "sulawesi"
    },
   sulawesi: {
        name: "Pulau Sulawesi",
        timeLimit: 35, 
        story: "Berlayar ke Pulau Sulawesi, persiapkan dirimu untuk belajar sifat pangkat numerus logaritma.",
        materi: `Berdasarkan sifat perpangkatan numerus, jika bilangan numerus memiliki eksponen (pangkat), maka eksponen tersebut dapat dipindahkan ke depan menjadi koefisien pengali logaritma dan sebaliknya, koefisien pengali di depan logaritma dapat dinyatakan kembali sebagai pangkat dari bilangan numerus tersebut:
                 
                 <div class="math-block">
                     <sup>a</sup>log b<sup>n</sup> = n &middot; <sup>a</sup>log b <br>
                     <span style="color: #f1c40f;">n &middot; <sup>a</sup>log b = <sup>a</sup>log b<sup>n</sup></span>
                 </div>
                 
                 <strong>Penjelasan:</strong>
                 <p style="text-align: left; font-size: 0.9rem; margin-bottom: 5px; color: #bbb;">
                     Berdasarkan sifat penjumlahan berulang, jika b<sup>n</sup> dijabarkan sebagai perkalian b sebanyak n kali:
                 </p>
                 <div style="text-align: left; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; margin: 10px 0; font-family: monospace; font-size: 0.95rem;">
                     <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 8px; line-height: 1.8;">
                         <div><sup>a</sup>log b<sup>n</sup></div> <div>=</div> <div><sup>a</sup>log (b &times; b &times; b &times; ... &times; b) &nbsp;<em>(sebanyak n kali)</em></div>
                         <div></div>            <div>=</div> <div><sup>a</sup>log b + <sup>a</sup>log b + ... + <sup>a</sup>log b &nbsp;</div>
                         <div><sup>a</sup>log b<sup>n</sup></div> <div>=</div> <div><span style="color: #ffff; font-weight: bold;">n &middot; <sup>a</sup>log b</span></div>
                     </div>
                 </div>
                 
                 <div style="text-align: left; margin-top: 15px; font-size: 0.95rem;">
                     <strong>💡 Contoh:</strong>
                     <div style="background: rgba(255,255,255,0.05); padding: 12px; border-left: 3px solid #ffff; margin-top: 5px; font-family: monospace;">
                         <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 8px; line-height: 1.8; align-items: center;">
                             <div>1. <sup>2</sup>log 2<sup>3</sup></div> <div>=</div> <div>3 &middot; <sup>2</sup>log 2</div>
                             <div></div> <div>=</div> <div>3 &times; 1</div>
                             <div></div> <div>=</div> <div style="color: #ffff;">3</div>
                             
                             <div style="grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,0.1); margin: 5px 0;"></div>
                             
                             <div>2. 2 &middot; <sup>2</sup>log 5</div> <div>=</div> <div><sup>2</sup>log 5<sup>2</sup></div>
                             <div></div> <div>=</div> <div><sup>2</sup>log 25</div>
                             
                             <div style="grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,0.1); margin: 5px 0;"></div>
                             
                             <div>3. <sup>3</sup>log 25 - 2 &middot; <sup>3</sup>log 5</div> <div>=</div> <div><sup>3</sup>log 25 - <sup>3</sup>log 5<sup>2</sup></div>
                             <div></div> <div>=</div> <div><sup>3</sup>log 25 - <sup>3</sup>log 25</div>
                             <div></div> <div>=</div> <div><span style="color: #ffff;">0</span></div>
                         </div>
                     </div>
                 </div>`,
        questions: [
            { 
                q: "Bentuk sifat pangkat numerus dari <sup>3</sup>log x<sup>5</sup> adalah...", 
                o: ["5 &middot; <sup>3</sup>log x", "<sup>3</sup>log 5x", "x &middot; <sup>3</sup>log 5", "5 &middot; <sup>x</sup>log 3"], 
                a: 0 
            },
            { 
                q: "Berapa nilai akhir dari <sup>5</sup>log 25<sup>3</sup>?", 
                o: ["3", "5", "6", "25"], 
                a: 2 
            },
            { 
                q: "Bentuk sederhana dari operasi 2 &middot; <sup>2</sup>log 5 jika dikembalikan ke sifat asalnya adalah...", 
                o: ["<sup>2</sup>log 10", "<sup>2</sup>log 25", "<sup>4</sup>log 5", "<sup>2</sup>log 5"], 
                a: 1 
            },
            { 
                q: "Sederhanakan operasi berikut: <sup>2</sup>log 48 - 2 &middot; <sup>2</sup>log 2", 
                o: ["<sup>2</sup>log 44", "3", "<sup>2</sup>log 12", "4"], 
                a: 2 
            },
            { 
                q: "Tentukan nilai akhir dari <sup>3</sup>log 3<sup>2</sup> + 3 &middot; <sup>2</sup>log 2", 
                o: ["5", "6", "8", "9"], 
                a: 0 
            },
            { 
                q: "Berapakah hasil dari operasi: 7 &middot; <sup>5</sup>log 1 + <sup>2</sup>log 2<sup>4</sup>", 
                o: ["11", "7", "0", "4"], 
                a: 3 
            }
        ],
        badgeSymbol: "🐃",
        nextIsland: "papua"
    },
    papua: {
        name: "Pulau Papua",
        timeLimit: 40,
        story: "Kita sudah tiba di Pulau Papua. Kumpulkan seluruh sisa kekuatanmu untuk mempelajari sifat perubahan basis serta pembalikan posisi logaritma.",
        materi: `Berdasarkan sifat perubahan basis, suatu bentuk logaritma dapat diubah menjadi pembagian dua bentuk logaritma baru dengan basis yang sama. Selain itu, jika posisi basis dan numerus saling ditukarkan, nilainya akan menjadi kebalikan perkaliannya (invers):
                 
                 <div class="math-block">
                     <sup>a</sup>log b = <div class="log-fraction"><div class="log-frac-line"><sup>m</sup>log b</div><div><sup>m</sup>log a</div></div> <br><br>
                     <span style="color: #f1c40f;"><sup>a</sup>log b = <div class="log-fraction"><div style="border-bottom: 1px solid #f1c40f; padding: 0 5px;">1</div><div><sup>b</sup>log a</div></div></span>
                 </div>
                 
                 <strong>Penjelasan:</strong>
                 <p class="log-text-muted">
                     Misalkan <sup>a</sup>log b = x (maka a<sup>x</sup> = b). Jika kedua ruas diberikan logaritma berbasis m (<sup>m</sup>log):
                 </p>
                 
                 <div class="log-proof-container">
                     <div class="log-grid-container">
                         <div><sup>m</sup>log(a<sup>x</sup>)</div> <div>=</div> <div><sup>m</sup>log b</div>
                         <div>x &middot; <sup>m</sup>log a</div> <div>=</div> <div><sup>m</sup>log b &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>(Sifat pangkat sebelumnya)</em></div>
                         <div>x</div> <div>=</div> <div><div class="log-fraction"><div class="log-frac-line"><sup>m</sup>log b</div><div><sup>m</sup>log a</div></div></div>
                         <div><sup>a</sup>log b</div> <div>=</div> <div><span class="log-highlight"><div class="log-fraction"><div style="border-bottom: 1px solid #ffff; padding: 0 5px;"><sup>m</sup>log b</div><div><sup>m</sup>log a</div></div></span></div>
                     </div>
                 </div>
                 
                 <div class="log-example-container">
                     <strong>💡 Contoh:</strong>
                     <div class="log-example-box" style="border-left-color: #f1c40f;">
                         <div class="log-grid-container" style="align-items: center;">
                             <div>1. Jika <sup>2</sup>log 3 = p, maka nilai <sup>3</sup>log 2</div> <div>=</div> <div><div class="log-fraction"><div class="log-frac-line">1</div><div><sup>2</sup>log 3</div></div></div>
                             <div></div> <div>=</div> <div><span class="log-highlight"><div class="log-fraction"><div style="border-bottom: 1px solid #ffff; padding: 0 5px;">1</div><div>p</div></div></span></div>
                             
                             <div class="log-divider"></div>
                             
                             <div>2. Nilai dari <div class="log-fraction"><div class="log-frac-line"><sup>3</sup>log 8</div><div><sup>3</sup>log 2</div></div></div> <div>=</div> <div><sup>2</sup>log 8</div>
                             <div></div> <div>=</div> <div><sup>2</sup>log 2<sup>3</sup> &nbsp;</div>
                             <div></div> <div>=</div> <div>3 &middot; <sup>2</sup>log 2</div>
                             <div></div> <div>=</div> <div class="log-highlight">3</div>
                         </div>
                     </div>
                 </div>`,
        questions: [
            { 
                q: "Jika diketahui <sup>2</sup>log 5 = x, maka nilai dari <sup>5</sup>log 2 berdasar sifat invers adalah...", 
                o: [
                    "x", 
                    "-x", 
                    "<div class='log-fraction'><div class='log-frac-line'>1</div><div>x</div></div>", 
                    "x²"
                ], 
                a: 2 
            },
            { 
                q: "Bentuk pembagian yang paling tepat untuk mengubah <sup>3</sup>log 7 dengan menggunakan basis baru 2 adalah...", 
                o: [
                    "<div class='log-fraction'><div class='log-frac-line'><sup>2</sup>log 7</div><div><sup>2</sup>log 3</div></div>", 
                    "<div class='log-fraction'><div class='log-frac-line'><sup>2</sup>log 3</div><div><sup>2</sup>log 7</div></div>", 
                    "<div class='log-fraction'><div class='log-frac-line'><sup>7</sup>log 2</div><div><sup>3</sup>log 2</div></div>", 
                    "<sup>2</sup>log 21"
                ], 
                a: 0 
            },
            { 
                q: "Diketahui <sup>3</sup>log 2 = a dan <sup>3</sup>log 5 = b. Berapakah nilai dari bentuk <sup>2</sup>log 5?", 
                o: [
                    "a &middot; b", 
                    "<div class='log-fraction'><div class='log-frac-line'>a</div><div>b</div></div>", 
                    "<div class='log-fraction'><div class='log-frac-line'>b</div><div>a</div></div>", 
                    "<div class='log-fraction'><div class='log-frac-line'>1</div><div>a &middot; b</div></div>"
                ], 
                a: 2 
            },
            { 
                q: "Jika diketahui <sup>2</sup>log 3 = m, tentukan nilai dari <sup>9</sup>log 2!", 
                o: [
                    "2m", 
                    "<div class='log-fraction'><div class='log-frac-line'>2</div><div>m</div></div>", 
                    "<div class='log-fraction'><div class='log-frac-line'>1</div><div>2m</div></div>", 
                    "m²"
                ], 
                a: 2 
            },
            { 
                q: "Hitunglah nilai akhir dari operasi pecahan berikut: <div class='log-fraction'><div class='log-frac-line'><sup>5</sup>log 81</div><div><sup>5</sup>log 3</div></div>", 
                o: ["3", "4", "9", "27"], 
                a: 1 
            },
            { 
                q: "Sederhanakan nilai dari operasi berikut: (<sup>2</sup>log 5 + <sup>2</sup>log 6 - <sup>2</sup>log 3) &middot; <sup>5</sup>log 2", 
                o: ["1", "2", "5", "10"], 
                a: 0 
            }
        ],
        badgeSymbol: "🪶",
        nextIsland: "merauke"
    },
    merauke: {
        name: "Merauke (Titik Timur)",
        timeLimit: 40, 
        story: "Selamat tiba di ujung timur Indonesia, Merauke. Pelajari sifat perkalian berantai logaritma terakhir ini untuk menyelesaikan permainan!",
        materi: `Berdasarkan sifat perkalian berantai logaritma, jika dua atau lebih bentuk logaritma dikalikan secara berurutan, dan nilai numerus suatu logaritma sama dengan nilai basis pada logaritma berikutnya, maka komponen yang sama tersebut dapat saling mengeliminasi:
                 
                 <div class="math-block">
                     <sup>a</sup>log b &middot; <sup>b</sup>log c = <sup>a</sup>log c <br>
                     <span style="color: #f1c40f;"><sup>a</sup>log b &middot; <sup>b</sup>log c &middot; <sup>c</sup>log d = <sup>a</sup>log d</span>
                 </div>
                 
                 <strong>Pembuktian Sifat:</strong>
                 <p class="log-text-muted">
                     Dengan mengubah setiap komponen logaritma menjadi bentuk pembagian berbasis baru m, kita dapat melihat hukum pembatalan aljabar:
                 </p>
                 
                 <div class="log-proof-container">
                     <div class="log-grid-container">
                         <div><sup>a</sup>log b &middot; <sup>b</sup>log c</div> <div>=</div> <div><div class="log-fraction"><div class="log-frac-line"><sup>m</sup>log b</div><div><sup>m</sup>log a</div></div> &times; <div class="log-fraction"><div class="log-frac-line"><sup>m</sup>log c</div><div><sup>m</sup>log b</div></div></div>
                         <div></div> <div>=</div> <div><div class="log-fraction"><div class="log-frac-line"><sup>m</sup>log c</div><div><sup>m</sup>log a</div></div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>(Eliminasi <sup>m</sup>log b yang sama)</em></div>
                         <div><sup>a</sup>log b &middot; <sup>b</sup>log c</div> <div>=</div> <div><span class="log-highlight" style="color: #ffff;"><sup>a</sup>log c</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>(Kembalikan ke sifat awal)</em></div>
                     </div>
                 </div>
                 
                 <div class="log-example-container">
                     <strong>💡 Contoh:</strong>
                     <div class="log-example-box">
                         <div class="log-grid-container" style="align-items: center;">
                             <div>1. <sup>2</sup>log 3 &middot; <sup>3</sup>log 8</div> <div>=</div> <div><sup>2</sup>log 8</div>
                             <div></div> <div>=</div> <div><sup>2</sup>log 2<sup>3</sup></div>
                             <div></div> <div>=</div> <div>3 &middot; <sup>2</sup>log 2 </div>
                             <div></div> <div>=</div> <div class="log-highlight">3</div>
                             
                             <div class="log-divider"></div>
                             
                             <div>2. <sup>5</sup>log 2 &middot; <sup>2</sup>log 7 &middot; <sup>7</sup>log 25</div> <div>=</div> <div><sup>5</sup>log 25</div>
                             <div></div> <div>=</div> <div><sup>5</sup>log 5<sup>2</sup></div>
                             <div></div> <div>=</div> <div class="log-highlight">2</div>
                         </div>
                     </div>
                 </div>`,
        questions: [
            { 
                q: "Berapa hasil dari <sup>2</sup>log 5 &middot; <sup>5</sup>log 16?", 
                o: ["<sup>2</sup>log 5", "<sup>5</sup>log 16", "4", "2"], 
                a: 2 
            },
            { 
                q: "Hitunglah hasil dari operasi berikut! <sup>3</sup>log 2 &middot; <sup>2</sup>log 7 &middot; <sup>7</sup>log 81", 
                o: ["<sup>3</sup>log 81", "3", "4", "2"], 
                a: 2 
            },
            { 
                q: "Jika bentuk <sup>a</sup>log b &middot; <sup>b</sup>log c &middot; <sup>c</sup>log d disederhanakan, maka bentuknya adalah...", 
                o: ["<sup>a</sup>log b", "<sup>a</sup>log d", "<sup>b</sup>log c", "1"], 
                a: 1 
            },
            { 
                q: "Tentukan nilai dari operasi perkalian: <sup>2</sup>log 9 &middot; <sup>3</sup>log 8", 
                o: ["5", "6", "8", "12"], 
                a: 1 
            },
            { 
                q: "Hitunglah hasil dari operasi berikut! <div class='log-fraction'><div class='log-frac-line'>1</div><div><sup>3</sup>log 5</div></div> &middot; <sup>5</sup>log 27", 
                o: ["1", "2", "3", "9"], 
                a: 2 
            },
            { 
                q: "Tentukan hasil akhir dari operasi ini! (<sup>3</sup>log 10 + <sup>3</sup>log 6 - <sup>3</sup>log 2) &middot; <sup>30</sup>log 9", 
                o: ["1", "2", "3", "30"], 
                a: 1 
            }
        ],
        badgeSymbol: "🏰 ",
        nextIsland: "final"
    },
};


let badges = { sabang: false, sumatera: false, jawa: false, kalimantan: false, sulawesi: false, papua: false, merauke: false };


const boatCoordinates = {
    start: { bottom: '70%', left: '2%' }, 
    sabang: { bottom: '78%', left: '6%' },
    sumatera: { bottom: '55%', left: '18%' },
    jawa: { bottom: '8%', left: '40%' },
    kalimantan: { bottom: '63%', left: '46%' },
    sulawesi: { bottom: '53%', left: '64%' },
    papua: { bottom: '48%', left: '81%' },
    merauke: { bottom: '25%', left: '91%' }
};

window.addEventListener('click', () => {
    if (!audioStarted) {
        document.getElementById('bgmAudio').volume = 0.25;
        document.getElementById('bgmAudio').play().catch(e => {});
        audioStarted = true;
    }
});

function playSFX(id) {
    const sfx = document.getElementById(id);
    if(sfx) {
        sfx.currentTime = 0;
        sfx.volume = 0.4;
        sfx.play().catch(e => {});
    }
}

function switchScreen(screenId) {
    const targetScreen = document.getElementById(screenId);
    
    if (!targetScreen) {
        console.error(`Gagal pindah layar: Elemen dengan ID "${screenId}" tidak ditemukan di HTML!`);
        return; 
    }

    document.querySelectorAll('.screen, .screen-map-layout').forEach(s => s.classList.remove('active'));
    
    targetScreen.classList.add('active');
    
    if (screenId === 'mapScreen') {
        updateMapUI();
        if (typeof badges !== 'undefined' && typeof boatCoordinates !== 'undefined') {
            let hasWonAny = Object.values(badges).some(b => b === true);
            if (!hasWonAny) {
                let boat = document.getElementById('playerBoat');
                if (boat) { 
                    boat.style.transition = 'none'; 
                    boat.style.bottom = boatCoordinates.start.bottom;
                    boat.style.left = boatCoordinates.start.left;
                    
                    setTimeout(() => {
                        boat.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 50);
                }
            }
        }
    }
}

function updateMapUI() {
    document.getElementById('lblScore').innerText = score;
    
    let islands = ['sabang', 'sumatera', 'jawa', 'kalimantan', 'sulawesi', 'papua', 'merauke'];
    let currentUnlocked = true; 

    islands.forEach(isl => {
        let pin = document.getElementById(`pin-${isl}`);
        
        if (!pin) return; 

        if (currentUnlocked) {
            pin.className = "map-pin unlocked";
            pin.innerHTML = `${gameDatabase[isl].badgeSymbol} ${gameDatabase[isl].name}`;
        } else {
            pin.className = "map-pin locked";
            pin.innerHTML = `🔒 Terkunci`; 
        }
        
        if (!badges[isl]) currentUnlocked = false;
    });
}

function selectIsland(islandKey) {
    let pin = document.getElementById(`pin-${islandKey}`);
    if (!pin || pin.classList.contains('locked')) {
        playSFX('sfxLose');
        showFeedbackPopup("❌ AKSES DI TOLAK", "Selesaikan tantangan pulau sebelumnya terlebih dahulu!");
        return;
    }
    currentIsland = islandKey;
    let boat = document.getElementById('playerBoat');
    if (boat && boatCoordinates[islandKey]) {
        boat.style.bottom = boatCoordinates[islandKey].bottom;
        boat.style.left = boatCoordinates[islandKey].left;
    }
    setTimeout(() => { startLevelFlow(islandKey); }, 1300);
}

function startLevelFlow(islandKey) {
    const data = gameDatabase[islandKey];
    const levelScreen = document.getElementById('levelScreen');
    if (levelScreen) {
        levelScreen.className = "screen"; // Reset kelas lama
        levelScreen.classList.add(`bg-${islandKey}`); // Pasang kelas pulau baru
    }
    document.getElementById('storyTitle').innerText = data.name;
    document.getElementById('storyText').innerText = data.story;
    document.getElementById('storyPhase').classList.remove('hidden');
    document.getElementById('materiPhase').classList.add('hidden');
    switchScreen('levelScreen');
}

function startMateriPhase() {
    document.getElementById('storyPhase').classList.add('hidden');
    const data = gameDatabase[currentIsland];
    document.getElementById('materiContent').innerHTML = data.materi;
    document.getElementById('materiPhase').classList.remove('hidden');
}

function startQuizPhase() {
    currentQuestionIndex = 0;
    const quizScreen = document.getElementById('quizScreen');
    if (quizScreen) {
        quizScreen.className = "screen"; // Reset kelas lama
        quizScreen.classList.add(`bg-${currentIsland}`); // Gunakan pulau yang sedang aktif
    }
    switchScreen('quizScreen');
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval);
    const data = gameDatabase[currentIsland];
    if (currentQuestionIndex >= data.questions.length) {
        receiveReward();
        return;
    }
    document.getElementById('quizIslandName').innerText = data.name;
    let pct = (currentQuestionIndex / data.questions.length) * 100;
    document.getElementById('quizProgress').style.width = pct + "%";

    let currentQuestion = data.questions[currentQuestionIndex];
    document.getElementById('questionText').innerHTML = currentQuestion.q;
    
    const optionsGrid = document.getElementById('optionsContainer');
    optionsGrid.innerHTML = "";

    currentQuestion.o.forEach((opt, idx) => {
        let btn = document.createElement('button');
        btn.className = "btn btn-secondary";
        btn.innerHTML = opt;
        btn.onclick = () => checkAnswer(idx);
        optionsGrid.appendChild(btn);
    });

    timeLeft = data.timeLimit || 10; 
    
    document.getElementById('timerText').innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timerText').innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            timeOutHandler();
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    clearInterval(timerInterval);
    const currentQuestion = gameDatabase[currentIsland].questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.a) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        playSFX('sfxLose');
        nextActionAfterFeedback = () => { switchScreen('mapScreen'); };
        showFeedbackPopup("❌ SALAH", "Jawaban keliru. Silakan pelajari kembali materi pulau!");
    }
}

function timeOutHandler() {
    playSFX('sfxLose');
    nextActionAfterFeedback = () => { switchScreen('mapScreen'); };
    showFeedbackPopup("⏳ WAKTU HABIS", "Waktu habis, jangan ragu untuk mengulang!");
}

function receiveReward() {
    playSFX('sfxWin');
    const data = gameDatabase[currentIsland];
    const info = badgeInfo[currentIsland];
    
    if (!badges[currentIsland]) {
        badges[currentIsland] = true;
        score += 10;
    }

    nextActionAfterFeedback = () => {
        if(data.nextIsland === 'final') triggerFinalScreen();
        else switchScreen('mapScreen');
    };

    showFeedbackPopup(
        `🏅 LEVEL SELESAI`, 
        `<div style='font-size: 2.8rem; text-align:center;'>${data.badgeSymbol}</div>
         <h4 style='color:#dfa620; margin: 5px 0;'>${info.title}</h4>
         <p style='font-size:0.9rem; color:#bdc3c7; line-height:1.4;'>${info.desc}</p>`
    );
}

function triggerFinalScreen() {
    switchScreen('finalScreen');
    const container = document.getElementById('finalBadgeContainer');
    container.innerHTML = "";
    Object.keys(badges).forEach(key => {
        let box = document.createElement('div');
        box.className = "badge-item-box";
        let img = document.createElement('div');
        img.className = `badge-img ${badges[key] ? '' : 'badge-locked'}`;
        img.innerText = gameDatabase[key].badgeSymbol;
        let lbl = document.createElement('span');
        lbl.innerText = key.toUpperCase();
        box.appendChild(img);
        box.appendChild(lbl);
        container.appendChild(box);
    });
}

function submitReflection() {
    const text = document.getElementById('reflectionInput').value.trim();
    
    if(text === "") {
        showFeedbackPopup("✍️ PERINGATAN", "Harap isi refleksi terlebih dahulu sebelum mengakhiri petualangan!");
        return;
    }
    
    playSFX('sfxWin');
    showFeedbackPopup("🎉 REFLEKSI DIKIRIM", "Refleksi petualanganmu berhasil terkirim. Selamat kamu telah menyelesaikan Log Adventure Nusantara sebagai siswa yang hebat!");

    document.getElementById('reflectionInput').value = "";
    
    document.getElementById('btnKirimRefleksi').style.display = "none";
    document.getElementById('reflectionInput').disabled = true;
    document.getElementById('btnMainLagi').style.display = "inline-block";
}

function toggleBag() {
    const popup = document.getElementById('bagPopup');
    if(popup.classList.contains('hidden')) {
        const container = document.getElementById('bagBadgeContainer');
        container.innerHTML = "";
        Object.keys(badges).forEach(key => {
            let box = document.createElement('div');
            box.className = "badge-item-box";
            let img = document.createElement('div');
            img.className = `badge-img ${badges[key] ? '' : 'badge-locked'}`;
            img.innerText = gameDatabase[key].badgeSymbol;
            let lbl = document.createElement('span');
            lbl.innerText = key.substring(0,3).toUpperCase();
            box.appendChild(img);
            box.appendChild(lbl);
            container.appendChild(box);
        });
        popup.classList.remove('hidden');
    } else {
        popup.classList.add('hidden');
    }
}

function showFeedbackPopup(title, contentHTML) {
    document.getElementById('feedbackTitle').innerHTML = title;
    document.getElementById('feedbackContent').innerHTML = contentHTML;
    document.getElementById('feedbackPopup').classList.remove('hidden');
}

function closeFeedback() {
    document.getElementById('feedbackPopup').classList.add('hidden');
    if (nextActionAfterFeedback) {
        let action = nextActionAfterFeedback;
        nextActionAfterFeedback = null;
        action();
    }
}

function restartGame() {
    score = 0;
    Object.keys(badges).forEach(k => badges[k] = false);
    
    let boat = document.getElementById('playerBoat');
    if (boat) {
        boat.style.transition = 'none'; 
        boat.style.bottom = boatCoordinates.start.bottom;
        boat.style.left = boatCoordinates.start.left;
    }
    
    switchScreen('homeScreen');
}
