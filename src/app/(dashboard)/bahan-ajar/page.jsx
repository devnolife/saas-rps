/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react'

import { Button, Box, Card, CardHeader, Divider, CardActions, CircularProgress } from '@mui/material';

import useGraphql from '@utils/useGraphql'
import InputForm from './InputForm'
import HasilGenerate from './HasilGenerate';

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
          <HasilGenerate result={result} />
        </>
      )}
    </>
  )
}

