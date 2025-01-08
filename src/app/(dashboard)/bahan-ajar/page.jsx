/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react'

import { Button, Box, Card, CardHeader, Divider, CardActions, CircularProgress, Typography, Alert } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

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
    cpl: '',
    instruksiKhusus: '',
    programStudi: ''
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

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
      cpl: '',
      instruksiKhusus: '',
      programStudi: ''
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

    if (name === 'namaMataKuliah' && value) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.namaMataKuliah) {
      setError('Nama Mata Kuliah tidak boleh kosong');

      return;
    }

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
          glosarium
          soal_evaluasi {
            soal
            jawaban
            kunci_jawaban
          }
          pertemuan_per_pekan {
            pekan
            deskripsi_topik
            cpmk
            sub_cpmk
            indikator
            bahan_kajian
            petunjuk_belajar_topik
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
        semester: parseFloat(formData.semester),
        instruksiKhusus: formData.instruksiKhusus,
        programStudi: formData.programStudi
      }
    };

    const result = await mutate(mutation, variables);

    if (result.errors) {
      setError('Terjadi kesalahan saat mengirim data');
    } else {
      setError('');
      setResult(result?.data?.generateBahanAjar);
    }
  };

  return (
    <>
      <Card>
        <CardHeader title='Informasi Mata Kuliah' />
        <Divider />
        {!result ? (
          <>
            <InputForm
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            {error && (
              <Alert severity='error' style={{
                marginTop: 5,
                display: 'flex', justifyContent: 'center',
              }}>
                {error}
              </Alert>
            )}
          </>
        ) : (
          <HasilGenerate result={result} />
        )}
      </Card>
    </>
  )
}

