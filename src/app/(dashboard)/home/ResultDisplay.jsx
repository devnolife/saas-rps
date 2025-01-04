import React, { useState } from 'react';
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

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function ResultDisplay({ generateRps }) {
  const matakuliah = generateRps?.matakuliah || {};
  const dosen_pengembang = generateRps?.dosen_pengembang || {};
  const komponen_penilaian = generateRps?.komponen_penilaian || {};

  const [loading, setLoading] = useState(false);

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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
              Hasil Rancangan Pembelajaran Semester
            </Typography>
            <Divider sx={{ mb: 3 }} />
          </Grid>
          <Grid item xs={12}>
            <div className='p-6 rounded bg-actionHover'>
              <div className='flex flex-col justify-between gap-y-4 sm:flex-row'>
                <div className='flex flex-col gap-6'>
                  <div>
                    <Typography color='text.primary'>Deskripsi Mata Kuliah</Typography>
                    <Typography color='text.primary'>{generateRps?.deskripsi_matakuliah || 'Tidak tersedia'}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Detail Mata Kuliah</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <ListItemText primary="Kode Mata Kuliah" secondary={matakuliah.kode || '-'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Nama Mata Kuliah" secondary={matakuliah.nama || '-'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Rumpun MK" secondary={matakuliah.rumpun_mk || '-'} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <ListItemText primary="SKS" secondary={matakuliah.sks || '-'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Semester" secondary={matakuliah.semester || '-'} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Bahan Kajian</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {(generateRps?.bahan_kajian ?? []).map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  sx={{ backgroundColor: getRandomColor(), color: '#fff' }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Capaian Pembelajaran Lulusan</Typography>
            <ul>
              {generateRps.capaian_pembelajaran_lulusan?.kode.map((kode, index) => (
                <li key={index}>{`${kode} : ${generateRps.capaian_pembelajaran_lulusan.nama[index]}`}</li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Komponen Penilaian</Typography>
            <Typography variant="body1" color="text.secondary">
              {komponen_penilaian
                ? `Kehadiran: ${komponen_penilaian.kehadiran}%, Tugas: ${komponen_penilaian.tugas}%, Praktikum: ${komponen_penilaian.praktikum}%, UTS: ${komponen_penilaian.UTS}%, UAS: ${komponen_penilaian.UAS}%`
                : 'Tidak tersedia'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateDocument}
              disabled={loading}
              sx={{ width: '100%', height: 50 }}
            >
              {loading ? <CircularProgress size={20} /> : 'Download RPS'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
