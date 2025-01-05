'use client';

import { useState } from 'react';

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

const HasilGenerate = ({ result }) => {
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

  if (!result) return null;

  return (
    <div>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {result.matakuliah_info?.nama || 'Mata Kuliah'}
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={
                  <i className='tabler-download' />
                }
                onClick={handleGenerateDocument}
              >
                Download
              </Button>
            </div>
            <Typography variant="subtitle1" color="text.secondary">
              Kode: {result.matakuliah_info?.kode} | SKS: {result.matakuliah_info?.sks} | Semester: {result.matakuliah_info?.semester}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {result.pengantar_matakuliah?.deskripsi_maata_kuliah}
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
              {result.kata_pengantar && (
                <Card sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>Kata Pengantar</Typography>
                    <Typography variant="body1">{result.kata_pengantar}</Typography>
                  </CardContent>
                </Card>
              )}
              {result.topik_materi_ajar && (
                <Card sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>Topik Materi Ajar</Typography>
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
                    <Typography variant="h6" gutterBottom>Cara Penggunaan Modul</Typography>
                    <Typography variant="body1">{result.cara_penggunaan_module}</Typography>
                  </CardContent>
                </Card>
              )}
            </TabPanel>
            <TabPanel value='capaian-pembelajaran'>
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>Capaian Pembelajaran</Typography>
                  {result.pengantar_matakuliah?.capaian_pembelajaran?.capaian_pembelajaran_lulusan && (
                    <Accordion expanded={expanded === 'cpl'} onChange={handleAccordionChange('cpl')}>
                      <AccordionSummary expandIcon={expandIcon('cpl')}>
                        <Typography>Capaian Pembelajaran Lulusan</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
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
                      </AccordionDetails>
                    </Accordion>
                  )}
                  {result.pengantar_matakuliah?.capaian_pembelajaran?.capaian_pembelajaran_matakuliah && (
                    <Accordion expanded={expanded === 'cpmk'} onChange={handleAccordionChange('cpmk')}>
                      <AccordionSummary expandIcon={expandIcon('cpmk')}>
                        <Typography>Capaian Pembelajaran Mata Kuliah</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
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
                      </AccordionDetails>
                    </Accordion>
                  )}
                  {result.pengantar_matakuliah?.capaian_pembelajaran?.sub_cpmk && (
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
                  )}
                </CardContent>
              </Card>
              {result.soal_evaluasi && (
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>Soal Evaluasi</Typography>
                    {result.soal_evaluasi.map((soal, index) => (
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
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabPanel>
            <TabPanel value='topik-mingguan'>
              <Card sx={{ mt: 2 }}>
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
                      pertemuan.pekan === activeWeek && (
                        <Box key={pertemuan.pekan}>
                          <Typography variant="h6" gutterBottom>{pertemuan.deskripsi_topik}</Typography>
                          {pertemuan.cpmk && (
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
                          )}
                          {pertemuan.sub_cpmk && (
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
                          )}
                          {pertemuan.indikator && (
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
                          )}
                          {pertemuan.bahan_kajian && (
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
                          )}
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
              {result.glosarium && (
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>Glosarium</Typography>
                    <Typography variant="body1">{result.glosarium}</Typography>
                  </CardContent>
                </Card>
              )}
            </TabPanel>
          </CardContent>
        </TabContext>
      </Box>
    </div>
  );
};

export default HasilGenerate;

