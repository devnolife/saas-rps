import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
let PizZipUtils = null;
if (typeof window !== 'undefined') {
  import('pizzip/utils/index.js').then(function (r) {
    PizZipUtils = r;
  });
}

function changeFormatJSON(data) {
  const result = [];
  const keys = Object.keys(data);
  for (let i = 0; i < data[keys[0]].length; i++) {
    const obj = {};
    keys.forEach(key => {
      obj[key] = data[key][i];
    });
    result.push(obj);
  }
  return result;
}

export async function POST(request) {
  try {
    const data = await request.json();
    const content = fs.readFileSync(
      path.resolve(process.cwd(), "src/app/api/generate/Template-RPS-2025.docx"),
      "binary"
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    });

    doc.render({
      upm_faculty: 'Fakultas Teknik',
      tanggal_dibuat: '2025-01-05' || data?.tanggal_dibuat,
      nama_matakuliah: data?.matakuliah?.nama,
      kode_matakuliah: data?.matakuliah?.kode,
      rumpun_mk: data?.matakuliah?.rumpun_mk,
      semester: data?.matakuliah?.semester,
      deskripsi_matakuliah: data?.deskripsi_matakuliah,
      koordinator_matakuliah: data?.dosen_pengembang?.koordinator_matakuliah,
      ketua_program_studi: data?.dosen_pengembang?.ketua_program_studi,
      cpl: changeFormatJSON(data?.capaian_pembelajaran_lulusan),
      cpmk: changeFormatJSON(data?.capaian_pembelajaran_matakuliah),
      sub_cpmk: changeFormatJSON(data?.kemampuan_akhir),
      bahan_kajian: data?.bahan_kajian.map((item, index) => ({ key: `${index + 1}. ${item}` }))
    });

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    const courseName = data?.matakuliah?.nama?.replace(/\s+/g, '_') || 'document';
    const fileName = `${courseName}_rps.docx`;
    const filePath = path.resolve(process.cwd(), `src/app/api/generate/${fileName}`);
    fs.writeFileSync(filePath, buffer);

    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename=${fileName}`
      }
    });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}

