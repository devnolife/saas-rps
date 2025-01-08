/* eslint-disable react/jsx-key */
'use client';

import { useState, useEffect } from 'react';

import axios from 'axios';

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
  Skeleton,
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

const Page = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeWeek, setActiveWeek] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const [result, setResult] = useState({
    matakuliah_info: null,
    pengantar_matakuliah: null,
    kata_pengantar: null,
    topik_materi_ajar: null,
    cara_penggunaan_module: null,
    soal_evaluasi: null,
    pertemuan_per_pekan: null,
    referensi: null,
    glosarium: null
  });

  useEffect(() => {
    const loadData = async () => {
      const data = {
        matakuliah_info: {
          nama: 'Matematika Diskrit',
          kode: 'MD101',
          sks: 3,
          semester: 2,
        },
        pengantar_matakuliah: {
          deskripsi_maata_kuliah: 'Deskripsi mata kuliah Matematika Diskrit.',
          capaian_pembelajaran: {
            capaian_pembelajaran_lulusan: ['CPL 1', 'CPL 2'],
            capaian_pembelajaran_matakuliah: ['CPMK 1', 'CPMK 2'],
            sub_cpmk: ['Sub-CPMK 1', 'Sub-CPMK 2'],
          },
        },
        kata_pengantar: 'Selamat datang di mata kuliah Matematika Diskrit.',
        topik_materi_ajar: ['Topik 1', 'Topik 2'],
        cara_penggunaan_module: 'Cara penggunaan modul ini adalah...',
        soal_evaluasi: [
          {
            soal: 'Apa itu Matematika Diskrit?',
            jawaban: ['Jawaban 1', 'Jawaban 2'],
            kunci_jawaban: 'Jawaban 1',
          },
        ],
        pertemuan_per_pekan: [
          {
            pekan: 1,
            deskripsi_topik: 'Deskripsi topik pekan 1',
            cpmk: ['CPMK 1'],
            sub_cpmk: ['Sub-CPMK 1'],
            indikator: ['Indikator 1'],
            bahan_kajian: ['Bahan Kajian 1'],
            petunjuk_belajar_topik: 'Petunjuk belajar topik pekan 1',
          },
        ],
        referensi: ['Referensi 1', 'Referensi 2'],
        glosarium: 'Glosarium untuk mata kuliah Matematika Diskrit.',
      };

      for (const key in data) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay for each object
        setResult(prev => ({ ...prev, [key]: data[key] }));
      }
    };

    loadData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAccordionChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const expandIcon = value => <i className={expanded === value ? 'tabler-minus' : 'tabler-plus'} />

  const handleGenerateDocument = async () => {
    if (!result) return;

    try {
      const response = await axios.post('/api/bahan-ajar', result, { responseType: 'blob' });

      const courseName = result?.matakuliah_info?.nama?.replace(/\s+/g, '_') || 'document';
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', `${courseName}_rps.docx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  return (
    <div>
      <Card sx={{ mb: 4, width: '100%' }}>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {result.matakuliah_info?.nama || <Skeleton width={200} />}
            </Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={
                <i className='tabler-download' />
              }
              onClick={handleGenerateDocument}
              disabled={!result.matakuliah_info}
            >
              Download
            </Button>
          </div>
          <Typography variant="subtitle1" color="text.secondary">
            {result.matakuliah_info ? (
              `Kode: ${result.matakuliah_info.kode} | SKS: ${result.matakuliah_info.sks} | Semester: ${result.matakuliah_info.semester}`
            ) : (
              <Skeleton width={300} />
            )}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {result.pengantar_matakuliah?.deskripsi_maata_kuliah || <Skeleton width="100%" />}
          </Typography>
        </CardContent>
      </Card>

      <Box
        sx={{ borderBottom: 2, borderColor: 'divider', mb: 2 }}>
        <TabContext value={activeTab}>
          <TabList onChange={handleTabChange} aria-label='Minimal Tabs' variant='fullWidth'>
            <Tab icon={<i className='tabler-users' />} value='overview' label='Pendahuluan' iconPosition='start' />
            <Tab icon={<i className='tabler-lock' />} value='capaian-pembelajaran' label='Capaian Pembelajaran' iconPosition='start' />
            <Tab icon={<i className='tabler-bookmark' />} value='topik-mingguan' label='Topik Mingguan' iconPosition='start' />
            <Tab icon={<i className='tabler-bell' />} value='referensi' label='Referensi' iconPosition='start' />
            <Tab icon={<i className='tabler-question-mark' />} value='soal-evaluasi' label='Soal Evaluasi' iconPosition='start' />
          </TabList>
          <CardContent>
            <TabPanel value='overview'>
              <Card sx={{ mt: 2, maxHeight: 400, overflow: 'auto', width: '100%' }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>Kata Pengantar</Typography>
                  {result.kata_pengantar ? (
                    <Typography variant="body1">{result.kata_pengantar}</Typography>
                  ) : (
                    <Skeleton variant='rectangular' width='100%' height={200} />
                  )}
                </CardContent>
              </Card>
              <Card sx={{ mt: 2, maxHeight: 400, overflow: 'auto', width: '100%' }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>Topik Materi Ajar</Typography>
                  {result.topik_materi_ajar ? (
                    <List>
                      {result.topik_materi_ajar.map((topik, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <i className='tabler-player-record-filled text-[12px]' />
                          </ListItemIcon>
                          <ListItemText primary={topik} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Skeleton variant='rectangular' width='100%' height={200} />
                  )}
                  <Typography variant="h6" gutterBottom>Cara Penggunaan Modul</Typography>
                  {result.cara_penggunaan_module ? (
                    <Typography variant="body1">{result.cara_penggunaan_module}</Typography>
                  ) : (
                    <Skeleton variant='rectangular' width='100%' height={200} />
                  )}
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel
              value='capaian-pembelajaran'>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>Capaian Pembelajaran</Typography>
                  <Accordion expanded={expanded === 'cpl'} onChange={handleAccordionChange('cpl')}>
                    <AccordionSummary expandIcon={expandIcon('cpl')}>
                      <Typography>Capaian Pembelajaran Lulusan</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {result.pengantar_matakuliah?.capaian_pembelajaran?.capaian_pembelajaran_lulusan ? (
                        <List>
                          {result.pengantar_matakuliah.capaian_pembelajaran.capaian_pembelajaran_lulusan.map((cpl, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <i className='tabler-player-record-filled text-[12px]' />
                              </ListItemIcon>
                              <ListItemText primary={cpl} />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Skeleton variant='rectangular' width='100%' height={200} />
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'cpmk'} onChange={handleAccordionChange('cpmk')}>
                    <AccordionSummary expandIcon={expandIcon('cpmk')}>
                      <Typography>Capaian Pembelajaran Mata Kuliah</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {result.pengantar_matakuliah?.capaian_pembelajaran?.capaian_pembelajaran_matakuliah ? (
                        <List>
                          {result.pengantar_matakuliah.capaian_pembelajaran.capaian_pembelajaran_matakuliah.map((cpmk, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <i className='tabler-player-record-filled text-[12px]' />
                              </ListItemIcon>
                              <ListItemText primary={cpmk} />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Skeleton variant='rectangular' width='100%' height={200} />
                      )}
                    </AccordionDetails>
                  </Accordion>
                  {result.pengantar_matakuliah?.capaian_pembelajaran?.sub_cpmk ? (
                    <Accordion expanded={expanded === 'sub-cpmk'} onChange={handleAccordionChange('sub-cpmk')}>
                      <AccordionSummary expandIcon={expandIcon('sub-cpmk')}>
                        <Typography>Sub-CPMK</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {result.pengantar_matakuliah.capaian_pembelajaran.sub_cpmk.map((subCpmk, index) => (
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
                  ) : (
                    <Skeleton variant='rectangular' width='100%' height={200} />
                  )}
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value='soal-evaluasi'>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>Soal Evaluasi</Typography>
                  {result.soal_evaluasi ? (
                    result.soal_evaluasi.map((soal, index) => (
                      <Box key={index} sx={{ mb: 4 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Soal {index + 1}:</Typography>
                        <Typography>{soal.soal}</Typography>
                        <List>
                          {soal.jawaban.map((jawaban, idx) => (
                            <ListItem key={idx}>
                              <ListItemIcon>
                                <i className='tabler-player-record-filled text-[12px]' />
                              </ListItemIcon>
                              <ListItemText primary={jawaban} />
                            </ListItem>
                          ))}
                        </List>
                        <Typography>Kunci Jawaban: {soal.kunci_jawaban}</Typography>
                      </Box>
                    ))
                  ) : (
                    <Skeleton variant='rectangular' width='100%' height={200} />
                  )}
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value='topik-mingguan'>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>Topik Mingguan</Typography>
                  <Box>
                    <Box sx={{ mb: 2 }}>
                      {result.pertemuan_per_pekan?.map((pertemuan) => (
                        <Chip
                          key={pertemuan.pekan}
                          label={`Pekan ${pertemuan.pekan}`}
                          onClick={() => setActiveWeek(pertemuan.pekan)}
                          color={activeWeek === pertemuan.pekan ? "primary" : "default"}
                          sx={{ mr: 2, mb: 1 }}
                        />
                      ))}
                    </Box>
                    {result.pertemuan_per_pekan?.map((pertemuan) => (
                      pertemuan.pekan === activeWeek ? (
                        <Box key={pertemuan.pekan}>
                          <Typography variant="h6" gutterBottom>{pertemuan.deskripsi_topik}</Typography>
                          {pertemuan.cpmk ? (
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
                          ) : (
                            <Skeleton variant='rectangular' width='100%' height={200} />
                          )}
                          {pertemuan.sub_cpmk ? (
                            <Accordion>
                              <AccordionSummary expandIcon={expandIcon('sub-cpmk')}>
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
                          ) : (
                            <Skeleton variant='rectangular' width='100%' height={200} />
                          )}
                          {pertemuan.indikator ? (
                            <Accordion>
                              <AccordionSummary expandIcon={expandIcon('indikator')}>
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
                          ) : (
                            <Skeleton variant='rectangular' width='100%' height={200} />
                          )}
                          {pertemuan.bahan_kajian ? (
                            <Accordion>
                              <AccordionSummary expandIcon={expandIcon('bahan-kajian')}>
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
                          ) : (
                            <Skeleton variant='rectangular' width='100%' height={200} />
                          )}
                          <Card sx={{ mt: 1 }}>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>Petunjuk Belajar</Typography>
                              <Typography variant="body2">{pertemuan.petunjuk_belajar_topik}</Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      ) : (
                        <Skeleton variant='rectangular' width='100%' height={200} />
                      )
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value='referensi'>
              <Card sx={{ mt: 2, width: '100%' }}>
                <CardContent>
                  <Box>
                    <Typography variant="h4" gutterBottom>Referensi</Typography>
                    <List>
                      {result.referensi?.map((ref, index) => (
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
              {result.glosarium ? (
                <Card sx={{ mt: 2, width: '100%' }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>Glosarium</Typography>
                    <Typography variant="body1">{result.glosarium}</Typography>
                  </CardContent>
                </Card>
              ) : (
                <Skeleton variant='rectangular' width='100%' height={200} />
              )}
            </TabPanel>
          </CardContent>
        </TabContext>
      </Box>
    </div>
  );
};

export default Page;
