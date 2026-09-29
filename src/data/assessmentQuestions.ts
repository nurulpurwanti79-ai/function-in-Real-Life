import { AssessmentQuestion } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    type: 'multiple-choice',
    category: 'Fungsi Irasional',
    scenario: 'Arsitek lanskap merancang kolam teratai berbentuk persegi dengan panjang sisi s(x) = √(2x - 6) meter.',
    question: 'Berapakah nilai minimum x yang diperbolehkan agar kolam tersebut nyata (dapat dibangun dalam dunia fisik)?',
    options: [
      'x ≥ 0',
      'x ≥ 3',
      'x ≥ 6',
      'x > -3'
    ],
    correctAnswer: 'x ≥ 3',
    hint1: 'Ingat syarat fungsi akar kuadrat: bilangan di dalam akar (radikan) tidak boleh bernilai negatif.',
    hint2: 'Selesaikan pertidaksamaan 2x - 6 ≥ 0. Pindahkan -6 ke ruas kanan lalu bagi kedua sisi dengan 2.',
    conceptSummary: 'Untuk f(x) = √g(x), daerah asal real mensyaratkan g(x) ≥ 0. Di sini 2x - 6 ≥ 0 ⟹ 2x ≥ 6 ⟹ x ≥ 3. Nilai minimum x adalah 3 (panjang sisi = √0 = 0 m).',
    explanation: 'Agar panjang sisi s(x) bernilai bilangan real (nyata), radikan harus memenuhi 2x - 6 ≥ 0. Menghasilkan 2x ≥ 6 sehingga x ≥ 3.'
  },
  {
    id: 2,
    type: 'true-false',
    category: 'Fungsi Nilai Mutlak',
    scenario: 'Seorang siswa berpendapat bahwa karena posisi rumah A berada di koordinat x = -15 km dari stasiun pusat, maka jaraknya dari stasiun adalah -15 km.',
    question: 'Pernyataan: "Jarak fisik antara dua titik pada garis koordinat dapat bernilai negatif."',
    options: [
      'BENAR',
      'SALAH'
    ],
    correctAnswer: 'SALAH',
    hint1: 'Bedakan antara "posisi" (yang memiliki arah / tanda) dengan "jarak" (panjang lintasan/skalar).',
    hint2: 'Jarak selalu dihitung menggunakan nilai mutlak: d = |-15 - 0| = 15 km. Nilai mutlak tidak pernah negatif.',
    conceptSummary: 'Jarak adalah konsep geometris non-negatif. Secara matematis, d = |x| ≥ 0 untuk setiap x ∈ ℝ. Tanda minus pada koordinat hanya menunjukkan arah posisi (misal: ke arah barat/kiri).',
    explanation: 'SALAH. Jarak fisik selalu bernilai non-negatif (|x| ≥ 0). Tanda negatif pada -15 km hanya menyatakan orientasi/arah posisi terhadap titik acuan stasiun.'
  },
  {
    id: 3,
    type: 'multiple-choice',
    category: 'Fungsi Nilai Mutlak',
    scenario: 'Diberikan fungsi nilai mutlak dengan transformasi: f(x) = |x + 3| - 5.',
    question: 'Di titik koordinat manakah titik puncak (titik balik V) dari grafik fungsi tersebut berada?',
    options: [
      '(3, -5)',
      '(-3, -5)',
      '(-3, 5)',
      '(3, 5)'
    ],
    correctAnswer: '(-3, -5)',
    hint1: 'Bentuk umum fungsi nilai mutlak adalah f(x) = |x - a| + b dengan titik balik di (a, b).',
    hint2: 'Perhatikan bahwa |x + 3| sama dengan |x - (-3)|. Jadi a = -3 dan b = -5.',
    conceptSummary: 'Grafik dasar y = |x| berpuncak di (0, 0). Bentuk |x - a| + b menggeser grafik sejauh a satuan horizontal dan b satuan vertikal. Titik puncak menjadi (a, b).',
    explanation: 'Karena f(x) = |x - (-3)| + (-5), maka pergeseran horizontal adalah ke kiri 3 satuan (x = -3) dan vertikal turun 5 satuan (y = -5). Titik baliknya adalah (-3, -5).'
  },
  {
    id: 4,
    type: 'number-input',
    category: 'Aplikasi Real Life',
    scenario: 'Sebuah drone patroli harus mengorbit di sekitar menara pemancar pada posisi x = 5 km. Sistem keamanan mensyaratkan jarak drone ke pemancar tidak boleh lebih dari 4 km, yaitu |x - 5| ≤ 4.',
    question: 'Berapakah posisi koordinat maksimum (paling timur/kanan) yang masih dalam batas aman drone?',
    correctAnswer: 9,
    hint1: 'Pertidaksamaan |x - a| ≤ r memiliki interval solusi [a - r, a + r].',
    hint2: 'Hitung batas atas dengan menjumlahkan posisi pusat (5) dengan radius toleransi (4).',
    conceptSummary: '|x - 5| ≤ 4 berarti -4 ≤ x - 5 ≤ 4. Tambahkan 5 pada semua ruas: 1 ≤ x ≤ 9. Posisi aman berada pada rentang x = 1 hingga x = 9.',
    explanation: 'Posisi maksimum diperoleh saat x - 5 = +4, yang menghasilkan x = 9 km.'
  },
  {
    id: 5,
    type: 'multiple-choice',
    category: 'Fungsi Irasional',
    scenario: 'Diberikan fungsi irasional rasional: f(x) = √((x + 2) / (x - 1)).',
    question: 'Manakah nilai x berikut yang TIDAK termasuk dalam daerah asal (domain) fungsi tersebut?',
    options: [
      'x = 2',
      'x = -3',
      'x = 0',
      'x = 5'
    ],
    correctAnswer: 'x = 0',
    hint1: 'Coba substitusikan setiap opsi ke dalam ekspresi pecahan di dalam akar.',
    hint2: 'Untuk x = 0: (0 + 2) / (0 - 1) = 2 / (-1) = -2. Apakah √(-2) terdefinisi pada bilangan real?',
    conceptSummary: 'Pecahan (x+2)/(x-1) harus bernilai ≥ 0 dan penyebut x-1 ≠ 0. Pada x = 0, hasilnya bernilai negatif (-2), sehingga √(-2) bukan bilangan real.',
    explanation: 'Ketika x = 0, nilai di bawah tanda akar adalah (0+2)/(0-1) = -2. Karena akar dari bilangan negatif tidak terdefinisi dalam bilangan real, maka x = 0 bukan anggota domain.'
  },
  {
    id: 6,
    type: 'multiple-choice',
    category: 'Sintesis',
    scenario: 'Menghubungkan dua konsep seperti pada Final Boss: g(x) = √( |2x + 8| ).',
    question: 'Apakah daerah asal (domain) dari fungsi g(x) di atas?',
    options: [
      'x ≥ -4 saja',
      'x ≥ 0 saja',
      'Seluruh bilangan real (x ∈ ℝ)',
      'x ≤ -4 atau x ≥ 4'
    ],
    correctAnswer: 'Seluruh bilangan real (x ∈ ℝ)',
    hint1: 'Perhatikan sifat nilai mutlak: berapapun nilai input di dalamnya, apa tanda hasil dari |2x + 8|?',
    hint2: 'Karena |t| ≥ 0 untuk setiap t, maka radikan tidak pernah bernilai negatif.',
    conceptSummary: 'Sifat dasar nilai mutlak adalah |u| ≥ 0 untuk setiap u ∈ ℝ. Karena radikan di bawah akar selalu tak-negatif (≥ 0), syarat akar kuadrat selalu terpenuhi untuk setiap x ∈ ℝ.',
    explanation: 'Nilai mutlak |2x + 8| dijamin selalu ≥ 0 untuk SEMUA x ∈ ℝ. Karena bilangan di dalam akar tidak pernah negatif, fungsi g(x) terdefinisi untuk seluruh bilangan real x ∈ ℝ.'
  },
  {
    id: 7,
    type: 'multiple-choice',
    category: 'Aplikasi Real Life',
    scenario: 'Sistem pendingin server ruang data diprogram menjaga temperatur ruangan T pada target 22°C dengan toleransi selisih suhu tidak lebih dari 2°C, dirumuskan: |T - 22| ≤ 2.',
    question: 'Berapakah rentang temperatur ruang server yang diizinkan sistem?',
    options: [
      '20°C ≤ T ≤ 24°C',
      '22°C ≤ T ≤ 24°C',
      '18°C ≤ T ≤ 26°C',
      '0°C ≤ T ≤ 22°C'
    ],
    correctAnswer: '20°C ≤ T ≤ 24°C',
    hint1: 'Pertidaksamaan |T - 22| ≤ 2 berarti jarak T dari 22 tidak boleh melebihi 2.',
    hint2: 'Uraikan menjadi -2 ≤ T - 22 ≤ 2, lalu tambahkan 22 ke semua bagian pertidaksamaan.',
    conceptSummary: '|T - c| ≤ r merepresentasikan batas toleransi rekayasa: c - r ≤ T ≤ c + r. Di sini 22 - 2 = 20 dan 22 + 2 = 24.',
    explanation: '-2 ≤ T - 22 ≤ 2 ⟹ 22 - 2 ≤ T ≤ 22 + 2 ⟹ 20°C ≤ T ≤ 24°C.'
  },
  {
    id: 8,
    type: 'multiple-choice',
    category: 'Fungsi Irasional',
    scenario: 'Seorang siswa mengamati kurva grafik fungsi y = √(x) pada bidang koordinat Cartesius.',
    question: 'Mengapa kurva y = √(x) hanya muncul di kuadran I dan tidak ada di kuadran II, III, atau IV?',
    options: [
      'Karena x harus positif/nol dan hasil akar utama (akar kuadrat prinsipal) selalu non-negatif (y ≥ 0)',
      'Karena koordinat sumbu Y negatif tidak memiliki arti matematis',
      'Hanya karena konvensi software pembuat grafik semata',
      'Karena kurva tersebut sebenarnya adalah garis lurus yang terpotong'
    ],
    correctAnswer: 'Karena x harus positif/nol dan hasil akar utama (akar kuadrat prinsipal) selalu non-negatif (y ≥ 0)',
    hint1: 'Perhatikan domain (syarat nilai x) dan kodomain/range (hasil nilai y dari simbol √).',
    hint2: 'Simbol √ mendefinisikan nilai akar non-negatif. Jadi x ≥ 0 (kanan) dan y ≥ 0 (atas) ⟹ Kuadran I.',
    conceptSummary: 'Fungsi y = √x memiliki domain x ≥ 0 (mengecualikan kuadran II & III) dan range y ≥ 0 (mengecualikan kuadran III & IV), sehingga kurva hanya berada di kuadran I.',
    explanation: 'Domain fungsi akar mensyaratkan x ≥ 0, dan definisi tanda akar tunggal (principal square root) menghasilkan nilai y ≥ 0. Daerah di mana x ≥ 0 dan y ≥ 0 secara simultan adalah Kuadran I.'
  },
  {
    id: 9,
    type: 'number-input',
    category: 'Fungsi Nilai Mutlak',
    scenario: 'Diberikan fungsi f(x) = |x - 2| + 3.',
    question: 'Berapakah nilai f(-5)? Hitung dan ketikkan nilainya:',
    correctAnswer: 10,
    hint1: 'Ganti x dengan -5 ke dalam rumus f(x): f(-5) = |(-5) - 2| + 3.',
    hint2: 'Hitung nilai di dalam mutlak terlebih dahulu: (-5) - 2 = -7. Berapa |-7|?',
    conceptSummary: '|-7| = 7. Kemudian tambahkan dengan 3: 7 + 3 = 10.',
    explanation: 'f(-5) = |(-5) - 2| + 3 = |-7| + 3 = 7 + 3 = 10.'
  },
  {
    id: 10,
    type: 'multiple-choice',
    category: 'Sintesis',
    scenario: 'Kamu telah menyelesaikan penyelidikan di Root Mystery, Distance Lab, Graph Lab, dan Final Boss.',
    question: 'Manakah pernyataan filosofis dan matematis yang PALING TEPAT mengenai hubungan fungsi irasional dan nilai mutlak?',
    options: [
      'Fungsi nilai mutlak selalu bernilai non-negatif (|u| ≥ 0), sehingga dapat berfungsi sebagai penjamin domain (tameng) bagi fungsi irasional yang mensyaratkan radikan ≥ 0.',
      'Fungsi irasional dan nilai mutlak sama sekali tidak berhubungan dalam matematika sains.',
      'Nilai mutlak hanya digunakan untuk menyelesaikan jarak di fisika dan tidak memiliki rumus grafik.',
      'Akar kuadrat dari bilangan berapapun selalu menghasilkan dua jawaban positif dan negatif secara bersamaan dalam relasi fungsi.'
    ],
    correctAnswer: 'Fungsi nilai mutlak selalu bernilai non-negatif (|u| ≥ 0), sehingga dapat berfungsi sebagai penjamin domain (tameng) bagi fungsi irasional yang mensyaratkan radikan ≥ 0.',
    hint1: 'Ingat kembali fenomena di Final Boss saat f(x) = √|x - 4| diuji untuk berbagai nilai x.',
    hint2: 'Akar butuh input non-negatif, dan nilai mutlak selalu menghasilkan nilai non-negatif.',
    conceptSummary: 'Hubungan elegan: Domain f(x) = √g(x) adalah g(x) ≥ 0. Karena |u| selalu ≥ 0, menyematkan nilai mutlak di dalam akar membuat fungsi tersebut selalu terdefinisi untuk seluruh bilangan real.',
    explanation: 'Tepat sekali! Sifat mendasar |u| ≥ 0 menjamin bahwa berapapun nilai inputnya, bilangan di dalam akar kuadrat tidak akan pernah negatif. Inilah keindahan keterhubungan antar-konsep matematika.'
  }
];
