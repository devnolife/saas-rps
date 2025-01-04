import fs from 'fs';

import path from 'path';

import { NextResponse } from 'next/server';

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

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
      path.resolve(process.cwd(), "src/app/api/bahan-ajar/bahan_ajar.docx"),
      "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    });

    const pertemuanPerPekanUpper = data?.pertemuan_per_pekan?.map((item) => ({

      ...item,
      PEKAN: `${item.pekan}`.toUpperCase(),
      deskripsi_topik: item?.deskripsi_topik || '',
      cpmk_pekan: Array.isArray(item?.cpmk) ? item.cpmk.map((cpmk, index) => ({
        cpmk_value: `${index + 1}. ${cpmk}`,
      })) : [],
      sub_cpmk_pekan: Array.isArray(item?.sub_cpmk) ? item.sub_cpmk.map((cpmk, index) => ({
        sub_cpmk_value: `${index + 1}. ${cpmk}`,
      })) : [],
    }));

    doc.render({
      kata_pengantar: data?.kata_pengantar,
      deskripsi_maata_kuliah: data?.pengantar_matakuliah?.deskripsi_maata_kuliah,
      cpl: data?.pengantar_matakuliah?.capaian_pembelajaran?.capaian_pembelajaran_lulusan.map((cpl, index) => ({
        capaian_pembelajaran_lulusan: `${index + 1}. ${cpl}`,
      })),
      cpmk: data?.pengantar_matakuliah?.capaian_pembelajaran?.capaian_pembelajaran_matakuliah.map((cpmk, index) => ({
        capaian_pembelajaran_matakuliah: `${index + 1}. ${cpmk}`,
      })),
      topik_materi_ajar: data?.topik_materi_ajar.map((topik, index) => ({
        topik: `${index + 1}. ${topik}`,
      })),
      cara_penggunaan_module: data?.cara_penggunaan_module,
      referensi: data?.referensi,
      per_pekan: pertemuanPerPekanUpper
    });


    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    const courseName = data?.matakuliah?.nama?.replace(/\s+/g, '_') || 'document';
    const fileName = `${courseName}_rps.docx`;
    const filePath = path.resolve(process.cwd(), `src/app/api/bahan-ajar/${fileName}`);

    fs.writeFileSync(filePath, buffer);

    const fileBuffer = fs.readFileSync(filePath);


    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename=${fileName}`
      }
    });
  } catch (e) {
    console.log("🚀 ~ POST ~ e:", e)

    return NextResponse.json({ error: e }, { status: 500 });
  }
}

