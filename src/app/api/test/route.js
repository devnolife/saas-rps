// import { NextResponse } from 'next/server';

// // Example data objects
// const overviewData = {
//   kata_pengantar: 'Modul ini disusun untuk memenuhi kebutuhan akan bahan ajar yang lebih spesifik dalam mata kuliah Algoritma, mendukung pembelajaran mandiri mahasiswa, dan menyajikan materi dengan pendekatan yang lebih inovatif. Mata kuliah Algoritma merupakan bagian penting dari program studi Informatika, yang membekali mahasiswa dengan keterampilan dasar dalam pemrograman dan pemecahan masalah komputasional. Tujuan utama dari modul ini adalah agar mahasiswa memahami konsep dasar algoritma, mampu menganalisis dan menerapkannya dalam berbagai konteks pemrograman, khususnya menggunakan bahasa pemrograman Java. Materi yang dibahas dalam modul ini mencakup pengenalan algoritma, struktur data dasar, dan penerapan algoritma dalam pemrograman Java. Terima kasih kepada semua pihak yang telah berkontribusi dalam pembuatan modul ini. Harapan kami, modul ini dapat membantu mahasiswa dalam memahami materi, meningkatkan prestasi belajar, dan menjadi referensi yang baik.',
//   topik_materi_ajar: [
//     'Pengenalan Algoritma dan Struktur Data',
//     'Penerapan Algoritma Sorting dan Searching dalam Java'
//   ],
//   cara_penggunaan_module: 'Untuk menggunakan modul ini secara efektif, mahasiswa disarankan untuk mengikuti urutan materi yang telah disusun, memanfaatkan contoh-contoh yang diberikan, dan aktif berpartisipasi dalam diskusi serta latihan yang disediakan. Mahasiswa juga harus menyelesaikan tugas dan tes formatif untuk mengukur pemahaman mereka.',
//   glosarium: 'Glosarium adalah bagian penting dari modul ini yang menyajikan daftar istilah atau kata-kata kunci yang sering digunakan dalam bidang studi algoritma dan pemrograman. Dalam konteks modul ini, glosarium membantu mahasiswa memahami terminologi khusus yang mungkin belum familiar atau baru pertama kali ditemui. Istilah-istilah dalam glosarium disusun secara alfabetis untuk memudahkan pencarian dan pemahaman. Beberapa istilah yang mungkin termasuk dalam glosarium ini antara lain adalah \'algoritma\', \'struktur data\', \'kompleksitas waktu\', dan \'rekursif\'. Dengan adanya glosarium, diharapkan mahasiswa dapat lebih mudah mengakses penjelasan singkat mengenai istilah-istilah penting yang menunjang pemahaman mereka terhadap materi yang diajarkan. Selain itu, glosarium juga berfungsi sebagai referensi cepat yang dapat digunakan kapan saja selama proses pembelajaran berlangsung. Dengan pemahaman yang lebih baik terhadap istilah-istilah ini, mahasiswa akan lebih siap dalam menghadapi tantangan dalam mata kuliah Algoritma dan penerapannya dalam dunia nyata.',
//   matakuliah_info: {
//     kode: 'if2021',
//     nama: 'Algoritma',
//     rumpun_mk: 'Informatika',
//     sks: 2,
//     semester: 3
//   },
//   pengantar_matakuliah: {
//     deskripsi_matakuliah: 'Mata kuliah Algoritma memberikan dasar-dasar pemahaman tentang konsep dan teknik dalam pengembangan algoritma. Mahasiswa akan mempelajari bagaimana algoritma diimplementasikan dalam bahasa pemrograman Java dan relevansinya dalam pemecahan masalah sehari-hari, seperti pengolahan data dan pengembangan aplikasi.'
//   }
// };

// const capaianData = {
//   pengantar_matakuliah: {
//     capaian_pembelajaran: {
//       capaian_pembelajaran_lulusan: [
//         'Memiliki sikap profesional dalam menerapkan ilmu pengetahuan dan teknologi.',
//         'Memahami konsep dasar algoritma dan penerapannya dalam pemrograman.',
//         'Mampu menggunakan keterampilan teknis dalam pengembangan perangkat lunak.'
//       ],
//       capaian_pembelajaran_matakuliah: [
//         'Mampu menjelaskan konsep dasar algoritma dan strukturnya.',
//         'Mampu menerapkan algoritma dasar dalam pemrograman Java.',
//         'Mampu menganalisis efisiensi algoritma dalam konteks pemrograman.'
//       ],
//       sub_cpmk: [
//         'Mampu menjelaskan konsep dasar algoritma.',
//         'Mampu menerapkan algoritma sorting dan searching dalam Java.',
//         'Mampu menganalisis efisiensi algoritma dengan notasi Big O.'
//       ]
//     }
//   }
// };

// const topikMingguanData = {
//   pertemuan_per_pekan: [
//     {
//       pekan: 1,
//       deskripsi_topik: 'Pengenalan Algoritma dan Struktur Data',
//       cpmk: [
//         'Mampu menjelaskan konsep dasar algoritma dan strukturnya.'
//       ],
//       sub_cpmk: [
//         'Mampu menjelaskan konsep dasar algoritma.'
//       ],
//       indikator: [
//         'Menjelaskan definisi dan fungsi algoritma.',
//         'Mengidentifikasi jenis-jenis struktur data dasar.'
//       ],
//       bahan_kajian: [
//         'Definisi Algoritma',
//         'Struktur Data Dasar'
//       ],
//       petunjuk_belajar_topik: 'Mulailah dengan membaca bahan kajian tentang definisi algoritma. Lanjutkan dengan mempelajari jenis-jenis struktur data dasar. Diskusikan contoh-contoh yang diberikan dalam modul.'
//     },
//     {
//       pekan: 2,
//       deskripsi_topik: 'Penerapan Algoritma Sorting dan Searching dalam Java',
//       cpmk: [
//         'Mampu menerapkan algoritma sorting dan searching dalam Java.'
//       ],
//       sub_cpmk: [
//         'Mampu menerapkan algoritma sorting dan searching dalam Java.'
//       ],
//       indikator: [
//         'Mengimplementasikan algoritma sorting dalam Java.',
//         'Mengimplementasikan algoritma searching dalam Java.'
//       ],
//       bahan_kajian: [
//         'Algoritma Sorting',
//         'Algoritma Searching'
//       ],
//       petunjuk_belajar_topik: 'Pelajari algoritma sorting dan searching yang dijelaskan dalam modul. Implementasikan contoh-contoh kode dalam Java dan uji coba hasilnya. Berpartisipasilah dalam forum diskusi untuk berbagi pengalaman dan solusi.'
//     }
//   ]
// };

// const soalEvaluasiData = {
//   soal_evaluasi: [
//     {
//       soal: 'Apa yang dimaksud dengan algoritma?',
//       jawaban: [
//         'Sebuah prosedur atau formula untuk memecahkan masalah.',
//         'Sebuah jenis data.',
//         'Sebuah bahasa pemrograman.',
//         'Sebuah sistem operasi.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa fungsi utama dari struktur data?',
//       jawaban: [
//         'Untuk menyimpan dan mengatur data.',
//         'Untuk menjalankan program.',
//         'Untuk mengakses internet.',
//         'Untuk mendesain antarmuka pengguna.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan notasi Big O?',
//       jawaban: [
//         'Mengukur efisiensi algoritma dalam hal waktu dan ruang.',
//         'Mengukur ukuran file.',
//         'Menghitung jumlah baris kode.',
//         'Menentukan versi perangkat lunak.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa itu algoritma sorting?',
//       jawaban: [
//         'Proses mengatur data dalam urutan tertentu.',
//         'Proses menghapus data.',
//         'Proses menggabungkan data.',
//         'Proses memisahkan data.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa perbedaan utama antara algoritma searching dan sorting?',
//       jawaban: [
//         'Searching menemukan data, sorting mengatur data.',
//         'Sorting menemukan data, searching mengatur data.',
//         'Searching dan sorting adalah hal yang sama.',
//         'Tidak ada perbedaan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma linear search?',
//       jawaban: [
//         'Mencari elemen dalam daftar satu per satu.',
//         'Mengatur elemen dalam urutan menaik.',
//         'Menghitung jumlah elemen.',
//         'Menghapus elemen dari daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma binary search?',
//       jawaban: [
//         'Mencari elemen dengan membagi daftar menjadi dua bagian.',
//         'Mengatur elemen dalam urutan menurun.',
//         'Menghubungkan dua daftar.',
//         'Menggandakan elemen dalam daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelebihan algoritma binary search dibandingkan linear search?',
//       jawaban: [
//         'Lebih cepat pada daftar yang diurutkan.',
//         'Lebih lambat pada daftar yang diurutkan.',
//         'Lebih mudah diimplementasikan.',
//         'Lebih banyak menggunakan memori.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma bubble sort?',
//       jawaban: [
//         'Mengganti elemen bersebelahan jika dalam urutan yang salah.',
//         'Menghapus elemen yang duplikat.',
//         'Menggabungkan dua daftar.',
//         'Menghitung jumlah elemen.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelemahan utama dari algoritma bubble sort?',
//       jawaban: [
//         'Efisiensi waktu yang buruk pada daftar besar.',
//         'Kompleksitas kode yang tinggi.',
//         'Memerlukan banyak memori.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma quicksort?',
//       jawaban: [
//         'Menggunakan teknik divide and conquer untuk mengurutkan elemen.',
//         'Mengurutkan elemen dari yang terbesar ke terkecil.',
//         'Mencari elemen tertentu dalam daftar.',
//         'Menggabungkan dua daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelebihan dari algoritma quicksort?',
//       jawaban: [
//         'Efisiensi waktu yang baik pada daftar besar.',
//         'Memerlukan lebih banyak memori.',
//         'Kompleksitas kode yang tinggi.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma merge sort?',
//       jawaban: [
//         'Menggabungkan dua daftar yang sudah diurutkan.',
//         'Menghitung jumlah elemen dalam daftar.',
//         'Menghapus elemen duplikat.',
//         'Mencari elemen tertentu dalam daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelebihan dari algoritma merge sort?',
//       jawaban: [
//         'Stabil dan efisien untuk daftar besar.',
//         'Memerlukan lebih banyak memori.',
//         'Kompleksitas kode yang tinggi.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma insertion sort?',
//       jawaban: [
//         'Menyisipkan elemen ke dalam posisi yang tepat.',
//         'Menghapus elemen dari daftar.',
//         'Menggabungkan dua daftar.',
//         'Menghitung jumlah elemen dalam daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelebihan dari algoritma insertion sort?',
//       jawaban: [
//         'Efisien untuk daftar kecil atau hampir terurut.',
//         'Memerlukan lebih banyak memori.',
//         'Kompleksitas kode yang tinggi.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma selection sort?',
//       jawaban: [
//         'Memilih elemen terkecil dan menempatkannya di posisi awal.',
//         'Menghapus elemen duplikat.',
//         'Menggabungkan dua daftar.',
//         'Menghitung jumlah elemen dalam daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelemahan utama dari algoritma selection sort?',
//       jawaban: [
//         'Efisiensi waktu yang buruk pada daftar besar.',
//         'Kompleksitas kode yang tinggi.',
//         'Memerlukan lebih banyak memori.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan kompleksitas waktu?',
//       jawaban: [
//         'Ukuran waktu yang diperlukan untuk menjalankan algoritma.',
//         'Ukuran ruang memori yang digunakan oleh algoritma.',
//         'Jumlah baris kode dalam algoritma.',
//         'Versi dari perangkat lunak.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan kompleksitas ruang?',
//       jawaban: [
//         'Ukuran ruang memori yang digunakan oleh algoritma.',
//         'Ukuran waktu yang diperlukan untuk menjalankan algoritma.',
//         'Jumlah baris kode dalam algoritma.',
//         'Versi dari perangkat lunak.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma rekursif?',
//       jawaban: [
//         'Algoritma yang memanggil dirinya sendiri untuk menyelesaikan masalah.',
//         'Algoritma yang diulang dalam loop.',
//         'Algoritma yang menghapus elemen duplikat.',
//         'Algoritma yang menggabungkan dua daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelebihan dari algoritma rekursif?',
//       jawaban: [
//         'Menyederhanakan kode untuk masalah berstruktur.',
//         'Memerlukan lebih banyak memori.',
//         'Kompleksitas kode yang tinggi.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma iteratif?',
//       jawaban: [
//         'Algoritma yang menggunakan loop untuk menyelesaikan masalah.',
//         'Algoritma yang memanggil dirinya sendiri.',
//         'Algoritma yang menghapus elemen duplikat.',
//         'Algoritma yang menggabungkan dua daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelebihan dari algoritma iteratif?',
//       jawaban: [
//         'Lebih mudah dipahami dan diimplementasikan.',
//         'Memerlukan lebih banyak memori.',
//         'Kompleksitas kode yang tinggi.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma greedy?',
//       jawaban: [
//         'Algoritma yang membuat pilihan optimal pada setiap langkah.',
//         'Algoritma yang menghapus elemen duplikat.',
//         'Algoritma yang menggabungkan dua daftar.',
//         'Algoritma yang menghitung jumlah elemen dalam daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelemahan dari algoritma greedy?',
//       jawaban: [
//         'Tidak selalu memberikan solusi optimal secara keseluruhan.',
//         'Memerlukan lebih banyak memori.',
//         'Kompleksitas kode yang tinggi.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma dynamic programming?',
//       jawaban: [
//         'Algoritma yang memecah masalah menjadi sub-masalah dan menyimpan hasilnya.',
//         'Algoritma yang menghapus elemen duplikat.',
//         'Algoritma yang menggabungkan dua daftar.',
//         'Algoritma yang menghitung jumlah elemen dalam daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelebihan dari algoritma dynamic programming?',
//       jawaban: [
//         'Mengurangi waktu komputasi dengan menyimpan hasil sub-masalah.',
//         'Memerlukan lebih banyak memori.',
//         'Kompleksitas kode yang tinggi.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa yang dimaksud dengan algoritma backtracking?',
//       jawaban: [
//         'Algoritma yang mencoba semua kemungkinan solusi dan kembali jika menemui jalan buntu.',
//         'Algoritma yang menghapus elemen duplikat.',
//         'Algoritma yang menggabungkan dua daftar.',
//         'Algoritma yang menghitung jumlah elemen dalam daftar.'
//       ],
//       kunci_jawaban: 'A'
//     },
//     {
//       soal: 'Apa kelebihan dari algoritma backtracking?',
//       jawaban: [
//         'Dapat menemukan semua solusi yang mungkin untuk masalah tertentu.',
//         'Memerlukan lebih banyak memori.',
//         'Kompleksitas kode yang tinggi.',
//         'Sulit diimplementasikan.'
//       ],
//       kunci_jawaban: 'A'
//     }
//   ]
// };

// const referensiData = {
//   referensi: [
//     'Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). Introduction to Algorithms. MIT Press.',

//     'Weiss, M. A. (2013). Data Structures and Algorithm Analysis in Java. Addison-Wesley.',
//     'Sedgewick, R., & Wayne, K. (2011). Algorithms. Addison-Wesley.'
//   ],
//   glosarium: 'Glosarium adalah bagian penting dari modul ini yang menyajikan daftar istilah atau kata-kata kunci yang sering digunakan dalam bidang studi algoritma dan pemrograman. Dalam konteks modul ini, glosarium membantu mahasiswa memahami terminologi khusus yang mungkin belum familiar atau baru pertama kali ditemui. Istilah-istilah dalam glosarium disusun secara alfabetis untuk memudahkan pencarian dan pemahaman. Beberapa istilah yang mungkin termasuk dalam glosarium ini antara lain adalah \'algoritma\', \'struktur data\', \'kompleksitas waktu\', dan \'rekursif\'. Dengan adanya glosarium, diharapkan mahasiswa dapat lebih mudah mengakses penjelasan singkat mengenai istilah-istilah penting yang menunjang pemahaman mereka terhadap materi yang diajarkan. Selain itu, glosarium juga berfungsi sebagai referensi cepat yang dapat digunakan kapan saja selama proses pembelajaran berlangsung. Dengan pemahaman yang lebih baik terhadap istilah-istilah ini, mahasiswa akan lebih siap dalam menghadapi tantangan dalam mata kuliah Algoritma dan penerapannya dalam dunia nyata.'
// };

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const tab = searchParams.get('tab');

//   if (tab === 'overview') {
//     return NextResponse.json(overviewData);
//   } else if (tab === 'capaian-pembelajaran') {
//     return NextResponse.json(capaianData);
//   } else if (tab === 'topik-mingguan') {
//     return NextResponse.json(topikMingguanData);
//   } else if (tab === 'soal-evaluasi') {
//     return NextResponse.json(soalEvaluasiData);
//   } else if (tab === 'referensi') {
//     return NextResponse.json(referensiData);
//   }

//   return NextResponse.json({ message: 'Invalid tab' });
// }


