"use client"

import { useState, useEffect } from "react"
import { RpsResultView } from "@/components/rps-result-view"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCcw } from "lucide-react"
import Link from "next/link"

// Sample RPS data based on the provided JSON
const sampleRpsData = {
  generateRps: {
    matakuliah: {
      kode: "IF2012",
      nama: "Algoritma dan Pemograman",
      rumpun_mk: "Pemograman",
      sks: 2,
      semester: 2,
    },
    bahan_kajian: [
      "Materi kuliah yang diambil dari berbagai sumber online yang dapat diakses melalui internet, termasuk tutorial, video, dan jurnal akademik.",
    ],
    dosen_pengembang: {
      dosen_pengampuh: ["Pak Akbar"],
      koordinator_matakuliah: "Pak Dhia",
      ketua_program_studi: "Pak Iqram",
    },
    deskripsi_matakuliah:
      "Mata kuliah Algoritma dan Pemograman ini memperkenalkan konsep dasar dalam merancang algoritma yang efisien dan implementasinya dalam pemrograman komputer. Mahasiswa akan mempelajari berbagai teknik algoritma dan struktur data, serta mampu membuat program sederhana menggunakan bahasa pemrograman yang dipilih.",
    capaian_pembelajaran_lulusan: {
      kode: ["CPL1", "CPL2", "CPL3"],
      nama: [
        "Menunjukkan sikap profesional dan bertanggung jawab dalam bidang keilmuan.",
        "Mampu memahami dan mengaplikasikan prinsip atau konsep ilmu yang diajarkan.",
        "Mampu menyelesaikan masalah atau proyek secara kolaboratif dan mandiri.",
      ],
    },
    capaian_pembelajaran_matakuliah: {
      kode: ["CPMK1", "CPMK2", "CPMK3"],
      nama: [
        "Memahami dasar teori dan konsep pemrograman.",
        "Mengaplikasikan konsep pemrograman dalam pembuatan program.",
        "Menyusun solusi atau produk berbasis algoritma.",
      ],
    },
    sub_cpmk: {
      kode: ["Sub-CPMK1", "Sub-CPMK2", "Sub-CPMK3"],
      nama: [
        "Mampu menjelaskan konsep dasar algoritma.",
        "Mampu menggunakan struktur kontrol dalam pemrograman.",
        "Mampu mendemonstrasikan penggunaan fungsi dalam pemrograman.",
      ],
    },
    topik_perpekan_item: [
      {
        pekan: 1,
        sub_cpmk: ["Sub-CPMK1"],
        indikator: ["Mahasiswa dapat menjelaskan pengertian algoritma dan pemrograman."],
        bahan_kajian: ["Pengertian algoritma", "Sejarah pemrograman", "Bahasa pemrograman umum"],
      },
      {
        pekan: 2,
        sub_cpmk: ["Sub-CPMK2"],
        indikator: ["Mahasiswa dapat menggunakan struktur kontrol dalam pemrograman."],
        bahan_kajian: [
          "Struktur kontrol: if, switch",
          "Struktur perulangan: for, while",
          "Contoh aplikasi struktur kontrol",
        ],
      },
      {
        pekan: 3,
        sub_cpmk: ["Sub-CPMK3"],
        indikator: ["Mahasiswa dapat mendemonstrasikan penggunaan fungsi dalam pemrograman."],
        bahan_kajian: [
          "Pengantar fungsi dalam pemrograman",
          "Pembagian program menjadi fungsi",
          "Contoh penggunaan fungsi",
        ],
      },
    ],
    komponen_penilaian: {
      kehadiran: 10,
      tugas: 30,
      praktikum: 30,
      UTS: 15,
      UAS: 15,
    },
  },
}

export default function RpsResultDemoPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<typeof sampleRpsData | undefined>(undefined)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(sampleRpsData)
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleReload = () => {
    setIsLoading(true)
    setData(undefined)

    // Simulate loading again
    setTimeout(() => {
      setData(sampleRpsData)
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link href="/rps-generator">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 mr-1">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Hasil RPS</h1>
        </div>

        <Button variant="outline" className="rounded-full" onClick={handleReload}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Muat Ulang
        </Button>
      </div>

      <RpsResultView data={data} isLoading={isLoading} />
    </div>
  )
}

