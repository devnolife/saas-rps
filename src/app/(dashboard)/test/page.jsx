'use client';

import { useState } from 'react';

import {
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import axios from 'axios';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }


  return color;
};



const generateRps = {
  "bahan_kajian": [
    "Topik 1",
    "Topik 2",
    "Topik 3"
  ],
  "deskripsi_matakuliah": "Mata kuliah ini memberikan pemahaman dasar tentang algoritma dan pemrograman, termasuk pengenalan metode pemecahan masalah menggunakan bahasa pemrograman.",
  "matakuliah": {
    "kode": "IF-101",
    "nama": "Algoritma dan Pemrograman",
    "rumpun_mk": "Informatika",
    "sks": 3,
    "semester": 2
  },
  "capaian_pembelajaran_lulusan": {
    "kode": [
      "CPL1",
      "CPL2",
      "CPL3"
    ],
    "nama": [
      "Menunjukkan sikap profesional dan bertanggung jawab dalam bidang keilmuan.",
      "Mampu memahami dan mengaplikasikan prinsip atau konsep ilmu yang diajarkan.",
      "Mampu menyelesaikan masalah atau proyek secara kolaboratif dan mandiri."
    ]
  },
  "capaian_pembelajaran_matakuliah": {
    "kode": [
      "CPMK1",
      "CPMK2",
      "CPMK3"
    ],
    "nama": [
      "Memahami dasar teori dan konsep dari mata kuliah.",
      "Mengaplikasikan konsep tersebut dalam tugas praktis.",
      "Menyusun solusi atau produk sesuai dengan materi pembelajaran."
    ]
  },
  "topik_perpekan_item": [
    {
      "pekan": 1,
      "sub_cpmk": [
        "Sub-CPMK1"
      ],
      "indikator": [
        "Mahasiswa dapat menjelaskan konsep dasar algoritma."
      ],
      "bahan_kajian": [
        "Pengantar Algoritma"
      ]
    },
    {
      "pekan": 2,
      "sub_cpmk": [
        "Sub-CPMK1"
      ],
      "indikator": [
        "Mahasiswa mampu memberikan contoh aplikasi algoritma."
      ],
      "bahan_kajian": [
        "Contoh-contoh Algoritma dalam Kehidupan Sehari-hari"
      ]
    },
    {
      "pekan": 3,
      "sub_cpmk": [
        "Sub-CPMK2"
      ],
      "indikator": [
        "Mahasiswa dapat mengimplementasikan algoritma dasar."
      ],
      "bahan_kajian": [
        "Struktur Data Dasar"
      ]
    },
    {
      "pekan": 4,
      "sub_cpmk": [
        "Sub-CPMK2"
      ],
      "indikator": [
        "Mampu menggunakan bahasa pemrograman untuk menyelesaikan masalah."
      ],
      "bahan_kajian": [
        "Bahasa Pemrograman (Python/C++)"
      ]
    },
    {
      "pekan": 5,
      "sub_cpmk": [
        "Sub-CPMK3"
      ],
      "indikator": [
        "Mahasiswa dapat merancang algoritma untuk masalah sederhana."
      ],
      "bahan_kajian": [
        "Pembuatan Algoritma Sederhana"
      ]
    },
    {
      "pekan": 6,
      "sub_cpmk": [
        "Sub-CPMK3"
      ],
      "indikator": [
        "Mampu mengimplementasikan algoritma dalam kode."
      ],
      "bahan_kajian": [
        "Implementasi Algoritma dalam Program"
      ]
    },
    {
      "pekan": 7,
      "sub_cpmk": [
        "Sub-CPMK3"
      ],
      "indikator": [
        "Mahasiswa dapat menyelesaikan proyek kecil dengan algoritma."
      ],
      "bahan_kajian": [
        "Proyek Pembuatan Program"
      ]
    },
    {
      "pekan": 8,
      "sub_cpmk": [
        "Sub-CPMK3"
      ],
      "indikator": [
        "Presentasi Proyek"
      ],
      "bahan_kajian": [
        "Penilaian Proyek"
      ]
    },
    {
      "pekan": 9,
      "sub_cpmk": [
        "Sub-CPMK1"
      ],
      "indikator": [
        "Mahasiswa dapat mereview algoritma yang digunakan."
      ],
      "bahan_kajian": [
        "Review Algoritma"
      ]
    },
    {
      "pekan": 10,
      "sub_cpmk": [
        "Sub-CPMK2"
      ],
      "indikator": [
        "Mampu menjelaskan kesalahan umum dalam pemrograman."
      ],
      "bahan_kajian": [
        "Debugging dan Penanganan Error"
      ]
    },
    {
      "pekan": 11,
      "sub_cpmk": [
        "Sub-CPMK3"
      ],
      "indikator": [
        "Mampu berkolaborasi dalam tim pada proyek."
      ],
      "bahan_kajian": [
        "Kerja Tim dalam Proyek"
      ]
    },
    {
      "pekan": 12,
      "sub_cpmk": [
        "Sub-CPMK1"
      ],
      "indikator": [
        "Menyusun laporan akhir proyek."
      ],
      "bahan_kajian": [
        "Penyusunan Laporan Proyek"
      ]
    }
  ],
  "komponen_penilaian": {
    "kehadiran": 10,
    "tugas": 30,
    "praktikum": 40,
    "UTS": 10,
    "UAS": 10
  },
  "dosen_pengembang": {
    "dosen_pengampuh": [
      "Dr. Akbar Wijaya, S.Kom., M.Kom.",
      "Ir. Junaidi Alfian, M.T.",
      "Fahri Firdausillah, S.Kom., M.Cs."
    ],
    "koordinator_matakuliah": "Dr. Jane Kusumawati, S.T., M.Cs.",
    "ketua_program_studi": "Prof. Dr. Maikel Sanjaya, M.Sc."
  }
}

export default function ResultDisplay() {

  const matakuliah = generateRps?.matakuliah || {};
  const dosen_pengembang = generateRps?.dosen_pengembang || {};
  const komponen_penilaian = generateRps?.komponen_penilaian || {};

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('mata-kuliah');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleGenerateDocument = async () => {
    setLoading(true);

    try {
      const response = await axios.post('/api/generate', generateRps, { responseType: 'blob' });

      const courseName = generateRps?.matakuliah?.nama?.replace(/\s+/g, '_') || 'document';
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', `${courseName}_rps.docx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='previewCard'>
      <CardContent className='sm:!p-12'>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center' }}>
              {matakuliah.nama}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
              {matakuliah.kode} | {matakuliah.rumpun_mk} | {matakuliah.sks} SKS | Semester {matakuliah.semester}
            </Typography>
            <Divider sx={{ mb: 1 }} />
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: 2, borderColor: 'divider', mb: 3 }}>
          <TabContext value={activeTab}>
            <TabList onChange={handleTabChange} variant='fullWidth'>
              <Tab label="Mata Kuliah" value="mata-kuliah" />
              <Tab label="Topik Mingguan" value="topik-mingguan" />
              <Tab label="Penilaian" value="penilaian" />
              <Tab label="Dosen" value="dosen" />
            </TabList>
            <TabPanel value="mata-kuliah">
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Deskripsi Mata Kuliah</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {generateRps?.deskripsi_matakuliah}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1 }}>Capaian Pembelajaran Lulusan</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {generateRps?.capaian_pembelajaran_lulusan?.kode?.map((code, idx) => (
                      <Chip
                        key={idx}
                        label={`${code}: ${generateRps?.capaian_pembelajaran_lulusan?.nama?.[idx]}`}
                      />
                    ))}
                  </Box>
                  <Typography variant="h6" sx={{ mt: 2 }}>Capaian Pembelajaran Mata Kuliah</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {generateRps?.capaian_pembelajaran_matakuliah?.kode?.map((code, idx) => (
                      <Chip
                        key={idx}
                        label={`${code}: ${generateRps?.capaian_pembelajaran_matakuliah?.nama?.[idx]}`}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value="topik-mingguan">
              {/* Tampilkan topik mingguan dari generateRps */}
            </TabPanel>
            <TabPanel value="penilaian">
              {/* Tampilkan komponen penilaian dari generateRps */}
            </TabPanel>
            <TabPanel value="dosen-bersangkutan">
              {/* Tampilkan dosen pengembang dari generateRps */}
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
}
