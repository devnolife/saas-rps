'use client';

import { useState } from 'react';

import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  ListItemIcon,
} from '@mui/material';

import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

import Button from '@mui/material/Button';

const courseData = {
  kata_pengantar: "Modul ini dibuat untuk memenuhi kebutuhan dosen dan mahasiswa dalam memahami materi konsep dasar Algoritma dan Pemrograman, dengan tujuan untuk mendukung pembelajaran mandiri serta memberikan materi yang lebih inovatif dan terstruktur. Mata kuliah ini sangat relevan bagi mahasiswa dalam bidang pemrograman dan teknologi informasi, mendasari berbagai kursus lanjut dan aplikasi nyata dalam kehidupan sehari-hari. Melalui modul ini, diharapkan mahasiswa dapat memahami prinsip-prinsip dasar algoritma, mampu menerapkannya dalam pemrograman, dan mengembangkan kemampuan analisis logika. Materi yang akan dibahas mencakup pengantar algoritma, struktur data dasar, serta metode dan teknik pemrograman. Ucapan terima kasih kami sampaikan kepada semua pihak yang telah membantu dalam penyusunan modul ini. Harapan kami adalah agar modul ini bermanfaat bagi mahasiswa dalam mendalami materi dan meningkatkan prestasi belajar mereka.",
  topik_materi_ajar: [
    "Pengantar Algoritma",
    "Struktur Data Dasar",
    "Pengantar Bahasa Pemrograman"
  ],
  cara_penggunaan_module: "Mahasiswa disarankan untuk mempelajari modul secara berurutan sesuai dengan topik yang disediakan. Untuk pemahaman maksimal, baca materi yang disediakan dan lakukan latihan serta tugas yang terlampir.",
  referensi: [
    "Algoritma dan Pemrograman - Author 1",
    "Dasar-Dasar Pemrograman - Author 2"
  ],
  matakuliah_info: {
    kode: "alpro",
    nama: "alpro",
    rumpun_mk: "alpro",
    sks: 2,
    semester: 2
  },
  pengantar_matakuliah: {
    deskripsi_maata_kuliah: "Mata kuliah Algoritma dan Pemrograman (Alpro) memberikan pemahaman tentang dasar-dasar algoritma dan cara implementasinya dalam bahasa pemrograman. Materi yang dibahas mencakup logika pemrograman, struktur data, serta perancangan algoritma. Relevansi mata kuliah ini sangat tinggi, karena memberikan pondasi yang kuat bagi mahasiswa dalam dunia pemrograman dan pengembangan perangkat lunak.",
    capaian_pembelajaran: {
      capaian_pembelajaran_lulusan: [
        "Mampu berkomunikasi dengan baik dalam lingkungan profesional",
        "Mempunyai sikap inovatif dan kreatif dalam memecahkan masalah",
        "Bertanggung jawab atas pekerjaan individu ataupun kelompok."
      ],
      capaian_pembelajaran_matakuliah: [
        "Mampu memahami dan menjelaskan dasar-dasar algoritma dan pemrograman",
        "Menganalisis persoalan dan merancang algoritma sebagai solusi",
        "Mampu memprogram menggunakan bahasa pemrograman tertentu."
      ],
      sub_cpmk: [
        "Menjelaskan konsep dasar algoritma",
        "Mengimplementasikan algoritma sederhana dalam kode",
        "Menganalisis dan melakukan debugging program."
      ]
    }
  },
  pertemuan_per_pekan: [
    {
      pekan: 1,
      deskripsi_topik: "Pengantar Algoritma",
      cpmk: [
        "Mampu memahami konsep dasar algoritma"
      ],
      sub_cpmk: [
        "Menjelaskan apa itu algoritma"
      ],
      indikator: [
        "Mahasiswa dapat menjelaskan definisi algoritma",
        "Mahasiswa dapat memberikan contoh algoritma sederhana"
      ],
      bahan_kajian: [
        "Materi pengantar tentang algoritma",
        "Contoh algoritma sederhana"
      ],
      petunjuk_belajar_topik: "Mulailah dengan memahami definisi algoritma, kemudian baca contoh yang diberikan."
    },
    {
      pekan: 2,
      deskripsi_topik: "Struktur Data Dasar",
      cpmk: [
        "Mampu memahami struktur data dalam pemrograman"
      ],
      sub_cpmk: [
        "Menjelaskan berbagai jenis struktur data"
      ],
      indikator: [
        "Mahasiswa dapat membedakan antara array dan linked list",
        "Mahasiswa dapat menggunakan struktur data dasar"
      ],
      bahan_kajian: [
        "Pengertian dan jenis-jenis struktur data",
        "Contoh penggunaan struktur data dalam program"
      ],
      petunjuk_belajar_topik: "Pahami jenis-jenis struktur data yang ada, dan lakukan latihan menggunakan array dalam kode."
    },
    {
      pekan: 3,
      deskripsi_topik: "Pengantar Bahasa Pemrograman",
      cpmk: [
        "Mampu memprogram menggunakan bahasa pemrograman tertentu"
      ],
      sub_cpmk: [
        "Menjelaskan sintaks dasar dalam bahasa pemrograman"
      ],
      indikator: [
        "Mahasiswa dapat menulis kode sederhana menggunakan bahasa pemrograman yang dipilih"
      ],
      bahan_kajian: [
        "Pengenalan bahasa pemrograman yang akan digunakan",
        "Sintaks dasar dan struktur program"
      ],
      petunjuk_belajar_topik: "Pelajari sintaks dasar dalam bahasa pemrograman, kemudian coba untuk menulis program sederhana."
    }
  ]
};

const Accordion = styled(MuiAccordion)({
  margin: '0 !important',
  borderRadius: 0,
  boxShadow: 'none !important',
  border: '1px solid var(--mui-palette-divider)',
  '&:not(:last-of-type)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&:first-of-type': {
    '& .MuiButtonBase-root': {
      borderTopLeftRadius: 'var(--mui-shape-borderRadius)',
      borderTopRightRadius: 'var(--mui-shape-borderRadius)'
    }
  },
  '&:last-of-type': {
    '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
      borderBottomLeftRadius: 'var(--mui-shape-borderRadius)',
      borderBottomRightRadius: 'var(--mui-shape-borderRadius)'
    }
  }
})

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  borderBlockEnd: '0 !important',
  minHeight: theme.spacing(11.5),
  transition: 'min-height 0.15s ease-in-out',
  backgroundColor: 'var(--mui-palette-customColors-greyLightBg)',
  '&.Mui-expanded': {
    minHeight: theme.spacing(11.5),
    borderBlockEnd: '1px solid var(--mui-palette-divider) !important',
    '& .MuiAccordionSummary-expandIconWrapper': {
      transform: 'rotate(180deg)'
    }
  }
}))

// Styled component for AccordionDetails component
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingBlockStart: `${theme.spacing(6)} !important`
}))

const CourseDisplayMUI = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeWeek, setActiveWeek] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAccordionChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const expandIcon = value => <i className={expanded === value ? 'tabler-minus' : 'tabler-plus'} />

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Algoritma dan Pemrograman
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={
                    <i className='tabler-download' />
                  }
                  href="/path/to/document.pdf"
                  download
                >
                  Download
                </Button>
              </div>
              <Typography variant="subtitle1" color="text.secondary">
                Kode: {courseData.matakuliah_info.kode} | SKS: {courseData.matakuliah_info.sks} | Semester: {courseData.matakuliah_info.semester}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {courseData.pengantar_matakuliah.deskripsi_maata_kuliah}
              </Typography>
            </Box>

          </CardContent>
        </Card>

        <Box sx={{ borderBottom: 2, borderColor: 'divider', mb: 2 }}>
          <TabContext value={activeTab}>
            <TabList onChange={handleTabChange} aria-label='Minimal Tabs' variant='fullWidth'>
              <Tab icon={<i className='tabler-users' />} value='overview' label='Pendahuluan' iconPosition='start' />
              <Tab icon={<i className='tabler-lock' />} value='capaian-pembelajaran' label='Capaian Pembelajaran' iconPosition='start' />
              <Tab icon={<i className='tabler-bookmark' />} value='topik-mingguan' label='Topik Mingguan' iconPosition='start' />
              <Tab icon={<i className='tabler-bell' />} value='referensi' label='Referensi' iconPosition='start' />
            </TabList>
            <CardContent>
              <TabPanel value='overview'>
                <Card sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>Kata Pengantar</Typography>
                    <Typography variant="body1">{courseData.kata_pengantar}</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>Topik Materi Ajar</Typography>
                    <List>
                      {courseData.topik_materi_ajar.map((topik, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <i className='tabler-player-record-filled text-[12px]' />
                          </ListItemIcon>
                          <ListItemText primary={topik} />
                        </ListItem>
                      ))}
                    </List>

                    <Typography variant="h6" gutterBottom>Cara Penggunaan Modul</Typography>
                    <Typography variant="body1">{courseData.cara_penggunaan_module}</Typography>
                  </CardContent>
                </Card>
              </TabPanel>
              <TabPanel value='capaian-pembelajaran'>
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>Capaian Pembelajaran</Typography>
                    <Accordion expanded={expanded === 'cpl'} onChange={handleAccordionChange('cpl')}>
                      <AccordionSummary expandIcon={expandIcon('cpl')}>
                        <Typography>Capaian Pembelajaran Lulusan</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {courseData.pengantar_matakuliah.capaian_pembelajaran.capaian_pembelajaran_lulusan.map((cpl, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <i className='tabler-player-record-filled text-[12px]' />
                              </ListItemIcon>
                              <ListItemText primary={cpl} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'cpmk'} onChange={handleAccordionChange('cpmk')}>
                      <AccordionSummary expandIcon={expandIcon('cpmk')}>
                        <Typography>Capaian Pembelajaran Mata Kuliah</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {courseData.pengantar_matakuliah.capaian_pembelajaran.capaian_pembelajaran_matakuliah.map((cpmk, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <i className='tabler-player-record-filled text-[12px]' />
                              </ListItemIcon>
                              <ListItemText primary={cpmk} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'sub-cpmk'} onChange={handleAccordionChange('sub-cpmk')}>
                      <AccordionSummary expandIcon={expandIcon('sub-cpmk')}>
                        <Typography>Sub-CPMK</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {courseData.pengantar_matakuliah.capaian_pembelajaran.sub_cpmk.map((subCpmk, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <i className='tabler-player-record-filled text-[12px]' />
                              </ListItemIcon>
                              <ListItemText primary={subCpmk} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabPanel>
              <TabPanel value='topik-mingguan'>
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>Capaian Pembelajaran</Typography>
                    <Box>
                      <Box sx={{ mb: 2 }}>
                        {courseData.pertemuan_per_pekan.map((pertemuan) => (
                          <Chip
                            key={pertemuan.pekan}
                            label={`Pekan ${pertemuan.pekan}`}
                            onClick={() => setActiveWeek(pertemuan.pekan)}
                            color={activeWeek === pertemuan.pekan ? "primary" : "default"}
                            sx={{ mr: 2, mb: 1 }}
                          />
                        ))}
                      </Box>
                      {courseData.pertemuan_per_pekan.map((pertemuan) => (
                        pertemuan.pekan === activeWeek && (
                          <Box key={pertemuan.pekan}>
                            <Typography variant="h6" gutterBottom>{pertemuan.deskripsi_topik}</Typography>
                            <Accordion expanded={expanded === 'weekly-cpmk'} onChange={handleAccordionChange('weekly-cpmk')}>
                              <AccordionSummary expandIcon={expandIcon('weekly-cpmk')}>
                                <Typography>CPMK</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <List>
                                  {pertemuan.cpmk.map((item, index) => (
                                    <ListItem key={index}>
                                      <ListItemIcon>
                                        <i className='tabler-player-record-filled text-[12px]' />
                                      </ListItemIcon>
                                      <ListItemText primary={item} />
                                    </ListItem>
                                  ))}
                                </List>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary expandIcon={
                                <i className='tabler-copy-plus'></i>
                              }>
                                <Typography>Sub-CPMK</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <List>
                                  {pertemuan.sub_cpmk.map((item, index) => (
                                    <ListItem key={index}>
                                      <ListItemIcon>
                                        <i className='tabler-player-record-filled text-[12px]' />
                                      </ListItemIcon>
                                      <ListItemText primary={item} />
                                    </ListItem>
                                  ))}
                                </List>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary expandIcon={
                                <i className='tabler-copy-plus'></i>
                              }>
                                <Typography>Indikator</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <List>
                                  {pertemuan.indikator.map((item, index) => (
                                    <ListItem key={index}>
                                      <ListItemIcon>
                                        <i className='tabler-player-record-filled text-[12px]' />
                                      </ListItemIcon>
                                      <ListItemText primary={item} />
                                    </ListItem>
                                  ))}
                                </List>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary expandIcon={
                                <i className='tabler-copy-plus'></i>
                              }>
                                <Typography>Bahan Kajian</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <List>
                                  {pertemuan.bahan_kajian.map((item, index) => (
                                    <ListItem key={index}>
                                      <ListItemIcon>
                                        <i className='tabler-player-record-filled text-[12px]' />
                                      </ListItemIcon>
                                      <ListItemText primary={item} />
                                    </ListItem>
                                  ))}
                                </List>
                              </AccordionDetails>
                            </Accordion>
                            <Card sx={{ mt: 2 }}>
                              <CardContent>
                                <Typography variant="h6" gutterBottom>Petunjuk Belajar</Typography>
                                <Typography variant="body2">{pertemuan.petunjuk_belajar_topik}</Typography>
                              </CardContent>
                            </Card>
                          </Box>
                        )
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </TabPanel>
              <TabPanel value='referensi'>
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Box>
                      <Typography variant="h4" gutterBottom>Referensi</Typography>
                      <List>
                        {courseData.referensi.map((ref, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <i className='tabler-player-record-filled text-[12px]' />
                            </ListItemIcon>
                            <ListItemText primary={ref} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </CardContent>
                </Card>
              </TabPanel>
            </CardContent>
          </TabContext>
        </Box>
      </Container>
    </div>
  );
};

export default CourseDisplayMUI;

