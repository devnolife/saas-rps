'use client';
import { useState } from 'react';

import { TextField, Button, Typography, Box, Card, CardHeader, CardContent, Grid, InputAdornment, Divider, CardActions } from '@mui/material';

import CustomTextField from '@/@core/components/mui/TextField';

export default function CourseForm({ formData, setFormData, handleChange, handleSubmit }) {
  const [errors, setErrors] = useState({});

  const handleNumberChange = (event) => {
    const { name, value } = event.target;

    if (['sks', 'sksTeori', 'sksPraktikum'].includes(name)) {
      const regexFloat = /^[0-9]*\.?[0-9]+$/;

      if (!regexFloat.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: 'Inputan harus berupa angka'
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
      }
    } else if (/^\d*$/.test(value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: 'Inputan harus berupa angka'
      }));
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const invalidFields = Object.keys(errors).filter(key => errors[key]);

    if (invalidFields.length === 0) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='body2' className='font-medium'>
              1. Detail Mata Kuliah
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nama Mata Kuliah"
              name="namaMataKuliah"
              value={formData.namaMataKuliah}
              onChange={handleChange}
              placeholder="Contoh: Algoritma dan Pemrograman"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-book" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kode Mata Kuliah"
              name="kodeMataKuliah"
              value={formData.kodeMataKuliah}
              onChange={handleChange}
              placeholder="Contoh: IF1234"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-code" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Rumpun Mata Kuliah"
              name="rumpunMataKuliah"
              value={formData.rumpunMataKuliah}
              onChange={handleChange}
              placeholder="Contoh: Informatika"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-tree" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SKS"
              name="sks"
              type="text"
              value={formData.sks}
              onChange={handleNumberChange}
              placeholder="Contoh: 0.0 atau 3.5"
              error={!!errors.sks}
              helperText={errors.sks}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-calculator" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SKS Teori"
              name="sksTeori"
              type="text"
              value={formData.sksTeori}
              onChange={handleNumberChange}
              placeholder="Contoh: 0.9 atau 3.5"
              error={!!errors.sksTeori}
              helperText={errors.sksTeori}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-book-open" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SKS Praktikum"
              name="sksPraktikum"
              type="text"
              value={formData.sksPraktikum}
              onChange={handleNumberChange}
              placeholder="Contoh: 0.91 atau 4"
              error={!!errors.sksPraktikum}
              helperText={errors.sksPraktikum}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-flask" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Jumlah Pertemuan"
              name="jumlahPertemuan"
              type="text"
              value={formData.jumlahPertemuan}
              onChange={handleNumberChange}
              placeholder="Contoh: 14"
              error={!!errors.jumlahPertemuan}
              helperText={errors.jumlahPertemuan}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-calendar" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Semester"
              name="semester"
              type="text"
              value={formData.semester}
              onChange={handleNumberChange}
              placeholder="Contoh: 2"
              error={!!errors.semester}
              helperText={errors.semester}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-clock" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Program Studi"
              name="programStudi"
              value={formData.programStudi}
              onChange={handleChange}
              placeholder="Contoh: Teknik Informatika"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-school" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' className='font-medium'>
              2. Detail Dosen
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dosen Koordinator"
              name="dosenKoordinator"
              value={formData.dosenKoordinator}
              onChange={handleChange}
              placeholder="Contoh: Dr. Jane Smith"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-user-check" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ketua Program"
              name="ketuaProgram"
              value={formData.ketuaProgram}
              onChange={handleChange}
              placeholder="Contoh: Prof. Michael Johnson"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-user-tie" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              rows={4}
              multiline
              label="Dosen Pengampu"
              name="dosenPengampu"
              value={formData.dosenPengampu}
              onChange={handleChange}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  setFormData({ ...formData, dosenPengampu: formData.dosenPengampu + ', ' })
                }
              }}
              placeholder="Tekan Enter untuk menambahkan dosen"
              sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="tabler-user" />
                    </InputAdornment>
                  )
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' className='font-medium'>
              3. Bahan Kajian
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              rows={4}
              multiline
              label="Bahan Kajian"
              name="bahanKajian"
              value={formData.bahanKajian}
              onChange={handleChange}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  setFormData({ ...formData, bahanKajian: formData.bahanKajian + ', ' })
                }
              }}
              placeholder="Topic 1, Topic 2, Topic 3"
              sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="tabler-bookmark" />
                    </InputAdornment>
                  )
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              rows={4}
              multiline
              label="CPL"
              name="cpl"
              value={formData.cpl}
              onChange={handleChange}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  setFormData({ ...formData, cpl: formData.cpl + ', ' })
                }
              }}

              placeholder="Outcome 1, Outcome 2, Outcome 3"
              sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="tabler-list" />
                    </InputAdornment>
                  )
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' className='font-medium'>
              4. Instruksi Khusus (Opsional)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Instruksi Khusus"
              name="instruksiKhusus"
              value={formData.instruksiKhusus}
              onChange={handleChange}
              placeholder="Tambahkan instruksi khusus di sini"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Button type="submit" variant="contained" className='mie-2'>
          Generate
        </Button>
        <Button
          type="reset"
          variant="tonal"
          color="secondary"
          onClick={() => setFormData({
            namaMataKuliah: '',
            kodeMataKuliah: '',
            rumpunMataKuliah: '',
            sks: '',
            sksTeori: '',
            sksPraktikum: '',
            jumlahPertemuan: '',
            semester: '',
            programStudi: '',
            dosenPengampu: '',
            dosenKoordinator: '',
            ketuaProgram: '',
            bahanKajian: '',
            cpl: '',
            instruksiKhusus: ''
          })}
        >
          Atur Ulang
        </Button>
      </CardActions>
    </form>
  )
}

