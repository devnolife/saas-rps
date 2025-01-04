'use client';
import { useState, useEffect } from 'react'

import axios from 'axios';

import { Button, Typography, Box, Card, CardHeader, CardContent, Grid, InputAdornment, Divider, IconButton, MenuItem, CardActions, CircularProgress } from '@mui/material';

import { toast, ToastContainer } from 'react-toastify';

import useGraphql from '@utils/useGraphql'
import InputForm from './InputForm'

export default function Page() {
  const [formData, setFormData] = useState({
    namaMataKuliah: '',
    kodeMataKuliah: '',
    rumpunMataKuliah: '',
    sks: '',
    sksTeori: '',
    sksPraktikum: '',
    jumlahPertemuan: '',
    semester: '',
    dosenPengampu: '',
    dosenKoordinator: '',
    ketuaProgram: '',
    bahanKajian: '',
    cpl: ''
  });


  const [result, setResult] = useState(null);

  useEffect(() => {
    setFormData({
      namaMataKuliah: '',
      kodeMataKuliah: '',
      rumpunMataKuliah: '',
      sks: '',
      sksTeori: '',
      sksPraktikum: '',
      jumlahPertemuan: '',
      semester: '',
      dosenPengampu: '',
      dosenKoordinator: '',
      ketuaProgram: '',
      bahanKajian: '',
      cpl: ''
    })
    setResult(null)
  }, [])

  const { mutate, loading } = useGraphql();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'sks' || name === 'sksTeori' || name === 'sksPraktikum' || name === 'jumlahPertemuan' || name === 'semester' ? parseFloat(value) || 0 : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mutation = `
      mutation GenerateBahanAjar($input: GenerateBahanAjarInput!) {
        generateBahanAjar(input: $input) {
          matakuliah_info {
            kode
            nama
            rumpun_mk
            sks
            semester
          }
          kata_pengantar
          pengantar_matakuliah {
            deskripsi_maata_kuliah
            capaian_pembelajaran {
              capaian_pembelajaran_lulusan
              capaian_pembelajaran_matakuliah
              sub_cpmk
            }
          }
          topik_materi_ajar
          cara_penggunaan_module
          referensi
          pertemuan_per_pekan {
            pekan
            sub_cpmk
            indikator
            bahan_kajian
          }
        }
      }
    `;

    const variables = {
      input: {
        ...formData,
        sks: parseFloat(formData.sks),
        sksTeori: parseFloat(formData.sksTeori),
        sksPraktikum: parseFloat(formData.sksPraktikum),
        jumlahPertemuan: parseFloat(formData.jumlahPertemuan),
        semester: parseFloat(formData.semester)
      }
    };

    const result = await mutate(mutation, variables)

    setResult(result?.data?.generateBahanAjar);
  };

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
    <>
      <Card>
        <CardHeader title='Informasi Mata Kuliah' />
        <Divider />
        {loading ? (
          <Box display='flex' justifyContent='center' alignItems='center' height='80dvh'>
            <CircularProgress />
          </Box>
        ) : (
          <InputForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Card>
      {result && (
        <>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateDocument}
              disabled={loading}
              sx={{ width: '100%', height: 50 }}
            >
              {loading ? <CircularProgress size={20} /> : 'Download Bahan Ajar'}
            </Button>
          </CardActions>
        </>
      )}
    </>
  )
}

