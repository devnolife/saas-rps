'use client';
import { useState, useEffect } from 'react'
import { TextField, Button, Typography, Box, Card, CardHeader, CardContent, Grid, InputAdornment, Divider, IconButton, MenuItem, CardActions, CircularProgress } from '@mui/material';

import useGraphql from '@utils/useGraphql'
import CourseForm from './CourseForm'
import ResultDisplay from './ResultDisplay'

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
      mutation GenerateRps($input: GenerateRpsInput!) {
        generateRps(input: $input) {
          bahan_kajian
          deskripsi_matakuliah
          matakuliah {
            kode
            nama
            rumpun_mk
            sks
            semester
          }

          capaian_pembelajaran_lulusan {
            kode
            nama
          }
          capaian_pembelajaran_matakuliah {
            kode
            nama
          }
          kemampuan_akhir {
            kode
            nama
          }
          topik_perpekan_item {
            pekan
            sub_cpmk
            indikator
            bahan_kajian
          }
          komponen_penilaian {
            kehadiran
            tugas
            praktikum
            UTS
            UAS
          }
          dosen_pengembang {
            dosen_pengampuh
            koordinator_matakuliah
            ketua_program_studi
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
    setResult(result?.data?.generateRps);
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
          <CourseForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Card>
      {result && <ResultDisplay generateRps={result} />}
    </>
  )
}

