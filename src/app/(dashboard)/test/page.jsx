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
  Box,
  LinearProgress
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
                  <Typography variant="h4" gutterBottom>Deskripsi Mata Kuliah</Typography>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    {generateRps?.deskripsi_matakuliah}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>Capaian Pembelajaran Lulusan</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {generateRps?.capaian_pembelajaran_lulusan?.kode?.map((code, idx) => (
                      <Box key={idx} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1, p: 1, border: '1px solid #ddd',
                        borderRadius: 1,
                        width: '100%'
                      }}>
                        <Chip variant='tonal' label={code} color="success" sx={{ mr: 1, width: '68px' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {generateRps?.capaian_pembelajaran_lulusan?.nama?.[idx]}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>Capaian Pembelajaran Mata Kuliah</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {generateRps?.capaian_pembelajaran_matakuliah?.kode?.map((code, idx) => (
                      <Box key={idx} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1, p: 1, border: '1px solid #ddd',
                        borderRadius: 1,
                        width: '100%'
                      }}>
                        <Chip variant='tonal' label={code} color="warning" sx={{ mr: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {generateRps?.capaian_pembelajaran_matakuliah?.nama?.[idx]}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value="topik-mingguan">
              <Grid container spacing={2}>
                {generateRps?.topik_perpekan_item?.map((item, idx) => (
                  <Grid item xs={12} sm={generateRps.topik_perpekan_item.length > 6 ? 4 : 6} key={idx}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2, flex: 'center' }}>
                          <i className='tabler-school' />
                          <Typography sx={{ ml: 2 }}
                            variant="h5">Pekan {item.pekan}</Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Chip variant='tonal' label="Sub-CPMK" color="secondary" sx={{ mr: 1, mb: 1 }} />
                          <Typography
                            variant="body2" sx={{ display: 'block', marginLeft: 2 }}>
                            {item.sub_cpmk.join(', ')}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Chip variant='tonal' label="Indikator" color="success" sx={{ mr: 1, mb: 1 }} />
                          <Typography variant="body2" sx={{ display: 'block', marginLeft: 2 }}>
                            {item.indikator.join(', ')}
                          </Typography>
                        </Box>
                        <Box>
                          <Chip variant='tonal' label="Bahan Kajian" color="warning" sx={{ mr: 1, mb: 1 }} />
                          <Typography variant="body2" sx={{ display: 'block', marginLeft: 2 }}>
                            {item.bahan_kajian.join(', ')}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value="penilaian">
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>Komponen Penilaian</Typography>
                  {Object.entries(komponen_penilaian).map(([key, value]) => (
                    <Box key={key} sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', mb: 2 }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}%
                      </Typography>
                      <LinearProgress color='info'
                        variant="determinate" value={value} sx={{ height: 15 }} />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value="dosen">
              <Grid container spacing={2}>
                {dosen_pengembang?.dosen_pengampuh?.map((dosen, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                          <i className="tabler-icon-user" style={{ marginRight: 8, fontSize: '20px', color: '#1976d2' }}></i>
                          {dosen}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Card sx={{ border: '2px solid #1976d2', backgroundColor: '#e3f2fd', mt: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <i className="tabler-icon-user-check" style={{ marginRight: 8, fontSize: '20px', color: '#1976d2' }}></i>
                        Koordinator Mata Kuliah: {dosen_pengembang?.koordinator_matakuliah}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ border: '2px solid #388e3c', backgroundColor: '#e8f5e9', mt: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <i className="tabler-icon-school" style={{ marginRight: 8, fontSize: '20px', color: '#388e3c' }}></i>
                        Ketua Program Studi: {dosen_pengembang?.ketua_program_studi}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
}
