"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Loader2,
  Sparkles,
  BookOpen,
  GraduationCap,
  CalendarDays,
  User,
  Users,
  BookText,
  School,
  Award,
  Clock,
  Hash,
  FileSpreadsheet,
  Lightbulb,
  CheckCircle2,
  Info,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { RpsResultView } from "@/components/rps-result-view"
import confetti from "canvas-confetti"

// Define the form schema with validation
const rpsFormSchema = z.object({
  namaMataKuliah: z.string().min(2, { message: "Nama mata kuliah harus diisi" }),
  kodeMataKuliah: z.string().min(2, { message: "Kode mata kuliah harus diisi" }),
  rumpunMataKuliah: z.string().min(2, { message: "Rumpun mata kuliah harus diisi" }),
  sks: z.coerce.number().min(1, { message: "SKS minimal 1" }),
  sksTeori: z.coerce.number().min(0, { message: "SKS Teori minimal 0" }),
  sksPraktikum: z.coerce.number().min(0, { message: "SKS Praktikum minimal 0" }),
  jumlahPertemuan: z.coerce.number().min(1, { message: "Jumlah pertemuan minimal 1" }),
  semester: z.string().min(2, { message: "Semester harus diisi" }),
  dosenPengampu: z.string().min(2, { message: "Dosen pengampu harus diisi" }),
  dosenKoordinator: z.string().min(2, { message: "Dosen koordinator harus diisi" }),
  ketuaProgram: z.string().min(2, { message: "Ketua program harus diisi" }),
  bahanKajian: z.string().min(10, { message: "Bahan kajian minimal 10 karakter" }),
  cpl: z.string().min(2, { message: "CPL harus diisi" }),
})

type RpsFormValues = z.infer<typeof rpsFormSchema>

// Default values for the form
const defaultValues: Partial<RpsFormValues> = {
  namaMataKuliah: "",
  kodeMataKuliah: "",
  rumpunMataKuliah: "",
  sks: 3,
  sksTeori: 2,
  sksPraktikum: 1,
  jumlahPertemuan: 16,
  semester: "",
  dosenPengampu: "",
  dosenKoordinator: "",
  ketuaProgram: "",
  bahanKajian: "",
  cpl: "",
}

export function RpsGeneratorForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("course-info")
  const [progress, setProgress] = useState(0)
  const [generatedRpsData, setGeneratedRpsData] = useState<any>(null)

  // Initialize the form
  const form = useForm<RpsFormValues>({
    resolver: zodResolver(rpsFormSchema),
    defaultValues,
  })

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Handle form submission
  async function onSubmit(data: RpsFormValues) {
    setIsGenerating(true)
    setProgress(0)

    try {
      // Simulate API call for the GraphQL mutation with progress updates
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 100)

      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearInterval(interval)
      setProgress(100)

      console.log("Mutation data:", {
        input: data,
      })

      // Sample RPS data based on the form input
      const sampleRpsData = {
        generateRps: {
          matakuliah: {
            kode: data.kodeMataKuliah,
            nama: data.namaMataKuliah,
            rumpun_mk: data.rumpunMataKuliah,
            sks: data.sks,
            semester: Number.parseInt(data.semester.split(" ")[0]),
          },
          bahan_kajian: [data.bahanKajian],
          dosen_pengembang: {
            dosen_pengampuh: [data.dosenPengampu],
            koordinator_matakuliah: data.dosenKoordinator,
            ketua_program_studi: data.ketuaProgram,
          },
          deskripsi_matakuliah:
            `Mata kuliah ${data.namaMataKuliah} ini memperkenalkan konsep dasar dalam bidang ${data.rumpunMataKuliah}. Mahasiswa akan mempelajari berbagai teknik dan konsep penting, serta mampu mengaplikasikan pengetahuan tersebut dalam konteks praktis.`,
          capaian_pembelajaran_lulusan: {
            kode: data.cpl.split(",").map(cpl => cpl.trim()),
            nama: [
              "Menunjukkan sikap profesional dan bertanggung jawab dalam bidang keilmuan.",
              "Mampu memahami dan mengaplikasikan prinsip atau konsep ilmu yang diajarkan.",
              "Mampu menyelesaikan masalah atau proyek secara kolaboratif dan mandiri.",
            ],
          },
          capaian_pembelajaran_matakuliah: {
            kode: ["CPMK1", "CPMK2", "CPMK3"],
            nama: [
              `Memahami dasar teori dan konsep ${data.rumpunMataKuliah}.`,
              `Mengaplikasikan konsep ${data.rumpunMataKuliah} dalam pemecahan masalah.`,
              "Menyusun solusi atau produk berbasis pengetahuan yang diperoleh.",
            ],
          },
          sub_cpmk: {
            kode: ["Sub-CPMK1", "Sub-CPMK2", "Sub-CPMK3"],
            nama: [
              `Mampu menjelaskan konsep dasar ${data.rumpunMataKuliah}.`,
              "Mampu menggunakan metode analisis dalam pemecahan masalah.",
              "Mampu mendemonstrasikan penerapan konsep dalam studi kasus.",
            ],
          },
          topik_perpekan_item: Array.from({ length: data.jumlahPertemuan }, (_, i) => ({
            pekan: i + 1,
            sub_cpmk: ["Sub-CPMK" + ((i % 3) + 1)],
            indikator: [`Mahasiswa dapat menjelaskan materi pertemuan ${i + 1}.`],
            bahan_kajian: [`Topik ${i + 1}`, `Subtopik ${i + 1}.1`, `Subtopik ${i + 1}.2`],
          })),
          komponen_penilaian: {
            kehadiran: 10,
            tugas: 30,
            praktikum: 20,
            UTS: 20,
            UAS: 20,
          },
        },
      };

      setGeneratedRpsData(sampleRpsData);

      toast({
        title: "RPS berhasil dibuat! 🎉",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span>
              RPS untuk mata kuliah <span className="font-semibold">{data.namaMataKuliah}</span> telah berhasil dibuat.
            </span>
          </div>
        ),
        variant: "success",
      })

      // Trigger confetti after a short delay
      setTimeout(() => {
        triggerConfetti();
      }, 300);

      // Show results after generation is complete
      setTimeout(() => {
        setShowResults(true);
        setIsGenerating(false);
      }, 500);

    } catch (error) {
      console.error("Error generating RPS:", error)
      toast({
        title: "Gagal membuat RPS",
        description: "Terjadi kesalahan saat membuat RPS. Silakan coba lagi.",
        variant: "destructive",
      })
      setIsGenerating(false)
      setProgress(0)
    }
  }

  // Calculate completion percentage for each tab
  const getCourseInfoCompletion = () => {
    const fields = [
      "namaMataKuliah",
      "kodeMataKuliah",
      "rumpunMataKuliah",
      "sks",
      "sksTeori",
      "sksPraktikum",
      "jumlahPertemuan",
      "semester",
    ]
    const filledFields = fields.filter((field) => form.getValues(field as any))
    return Math.round((filledFields.length / fields.length) * 100)
  }

  const getInstructorInfoCompletion = () => {
    const fields = ["dosenPengampu", "dosenKoordinator", "ketuaProgram"]
    const filledFields = fields.filter((field) => form.getValues(field as any))
    return Math.round((filledFields.length / fields.length) * 100)
  }

  const getContentInfoCompletion = () => {
    const fields = ["bahanKajian", "cpl"]
    const filledFields = fields.filter((field) => form.getValues(field as any))
    return Math.round((filledFields.length / fields.length) * 100)
  }

  const getTotalCompletion = () => {
    const courseWeight = 0.5
    const instructorWeight = 0.25
    const contentWeight = 0.25

    return Math.round(
      getCourseInfoCompletion() * courseWeight +
        getInstructorInfoCompletion() * instructorWeight +
        getContentInfoCompletion() * contentWeight,
    )
  }

  // Add a function to reset the form and go back to input
  const handleReset = () => {
    setShowResults(false);
    setGeneratedRpsData(null);
    form.reset(defaultValues);
  }

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border-0">
              {/* Keep the existing card content */}
              <div className="relative h-3">
                <Progress
                  value={getTotalCompletion()}
                  className="absolute top-0 left-0 right-0 h-3 rounded-none bg-gray-100 dark:bg-gray-700"
                  indicatorClassName="bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6]"
                />
              </div>

              <div className="p-8">
                {/* Keep the existing header and form */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] text-white p-3 rounded-2xl">
                      <FileSpreadsheet className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Rencana Pembelajaran Semester</h2>
                      <p className="text-muted-foreground">Lengkapi informasi untuk membuat RPS</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-medium">Kelengkapan</p>
                      <p className="text-2xl font-bold text-[#5fa2db] dark:text-[#7ab8e6]">{getTotalCompletion()}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e6f1fa"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#5fa2db"
                          strokeWidth="3"
                          strokeDasharray={`${getTotalCompletion()}, 100`}
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid grid-cols-3 w-full mb-8 bg-gray-100 dark:bg-gray-700 p-1.5 rounded-full">
                        <TabsTrigger
                          value="course-info"
                          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5fa2db] data-[state=active]:to-[#7ab8e6] data-[state=active]:text-white"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span className="hidden sm:inline">Informasi Mata Kuliah</span>
                            <span className="sm:hidden">Mata Kuliah</span>
                            <Badge variant="outline" className="ml-1 bg-white/20 border-0 text-white">
                              {getCourseInfoCompletion()}%
                            </Badge>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger
                          value="instructor-info"
                          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5fa2db] data-[state=active]:to-[#7ab8e6] data-[state=active]:text-white"
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Informasi Pengajar</span>
                            <span className="sm:hidden">Pengajar</span>
                            <Badge variant="outline" className="ml-1 bg-white/20 border-0 text-white">
                              {getInstructorInfoCompletion()}%
                            </Badge>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger
                          value="content-info"
                          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5fa2db] data-[state=active]:to-[#7ab8e6] data-[state=active]:text-white"
                        >
                          <div className="flex items-center gap-2">
                            <BookText className="h-4 w-4" />
                            <span className="hidden sm:inline">Konten & Capaian</span>
                            <span className="sm:hidden">Konten</span>
                            <Badge variant="outline" className="ml-1 bg-white/20 border-0 text-white">
                              {getContentInfoCompletion()}%
                            </Badge>
                          </div>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="course-info" className="space-y-6 animate-in fade-in-50 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="namaMataKuliah"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-[#5fa2db]" />
                                  Nama Mata Kuliah
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Contoh: Algoritma dan Pemrograman"
                                    className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Nama lengkap mata kuliah</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="kodeMataKuliah"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  <Hash className="h-4 w-4 text-[#5fa2db]" />
                                  Kode Mata Kuliah
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Contoh: CS101"
                                    className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Kode unik mata kuliah</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="rumpunMataKuliah"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium flex items-center gap-2">
                                <BookText className="h-4 w-4 text-[#5fa2db]" />
                                Rumpun Mata Kuliah
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12">
                                    <SelectValue placeholder="Pilih rumpun mata kuliah" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl">
                                  <SelectItem value="Ilmu Komputer">Ilmu Komputer</SelectItem>
                                  <SelectItem value="Teknik Informatika">Teknik Informatika</SelectItem>
                                  <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                                  <SelectItem value="Matematika">Matematika</SelectItem>
                                  <SelectItem value="Fisika">Fisika</SelectItem>
                                  <SelectItem value="Kimia">Kimia</SelectItem>
                                  <SelectItem value="Biologi">Biologi</SelectItem>
                                </SelectContent>
                                <FormDescription>Kategori atau kelompok mata kuliah</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="sks"
                            render={({ field }) => (
                              <FormItem className="bg-[#e6f1fa] dark:bg-[#2c4c6b]/20 p-4 rounded-xl border border-[#a8d1f0] dark:border-[#3a5d7d]">
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  <Award className="h-4 w-4 text-[#5fa2db]" />
                                  Total SKS
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={1}
                                    className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Jumlah SKS total</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="sksTeori"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4 text-[#5fa2db]" />
                                  SKS Teori
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={0}
                                    className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Jumlah SKS teori</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="sksPraktikum"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  <School className="h-4 w-4 text-[#5fa2db]" />
                                  SKS Praktikum
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={0}
                                    className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Jumlah SKS praktikum</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="jumlahPertemuan"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-[#5fa2db]" />
                                  Jumlah Pertemuan
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={1}
                                    className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Jumlah pertemuan dalam satu semester</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="semester"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  <CalendarDays className="h-4 w-4 text-[#5fa2db]" />
                                  Semester
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12">
                                      <SelectValue placeholder="Pilih semester" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-xl">
                                    <SelectItem value="Ganjil 2023/2024">Ganjil 2023/2024</SelectItem>
                                    <SelectItem value="Genap 2023/2024">Genap 2023/2024</SelectItem>
                                    <SelectItem value="Ganjil 2024/2025">Ganjil 2024/2025</SelectItem>
                                    <SelectItem value="Genap 2024/2025">Genap 2024/2025</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>Semester pelaksanaan mata kuliah</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-full px-6 border-[#a8d1f0] text-[#5fa2db] hover:bg-[#e6f1fa]"
                            onClick={() => form.reset(defaultValues)}
                          >
                            Reset
                          </Button>
                          <Button
                            type="button"
                            className="rounded-full bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] text-white border-0"
                            onClick={() => setActiveTab("instructor-info")}
                          >
                            Lanjutkan
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="instructor-info" className="space-y-6 animate-in fade-in-50 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="dosenPengampu"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  <User className="h-4 w-4 text-[#5fa2db]" />
                                  Dosen Pengampu
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Contoh: Dr. Jane Doe, M.Kom."
                                    className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Nama lengkap dosen pengampu mata kuliah</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dosenKoordinator"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  <Users className="h-4 w-4 text-[#5fa2db]" />
                                  Dosen Koordinator
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Contoh: Prof. John Smith, Ph.D."
                                    className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Nama lengkap dosen koordinator mata kuliah</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="ketuaProgram"
                          render={({ field }) => (
                            <FormItem className="bg-[#e6f1fa] dark:bg-[#2c4c6b]/20 p-4 rounded-xl border border-[#a8d1f0] dark:border-[#3a5d7d]">
                              <FormLabel className="text-base font-medium flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-[#5fa2db]" />
                                Ketua Program Studi
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Contoh: Dr. Michael Johnson, M.Sc."
                                  className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Nama lengkap ketua program studi</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-full px-6"
                            onClick={() => setActiveTab("course-info")}
                          >
                            Kembali
                          </Button>
                          <Button
                            type="button"
                            className="rounded-full bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] text-white border-0"
                            onClick={() => setActiveTab("content-info")}
                          >
                            Lanjutkan
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="content-info" className="space-y-6 animate-in fade-in-50 duration-300">
                        <FormField
                          control={form.control}
                          name="bahanKajian"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium flex items-center gap-2">
                                <BookText className="h-4 w-4 text-[#5fa2db]" />
                                Bahan Kajian
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Contoh: Dasar-dasar algoritma, struktur data, dan implementasi dalam bahasa pemrograman"
                                  className="rounded-xl resize-none border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Deskripsi materi yang akan dibahas dalam mata kuliah</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cpl"
                          render={({ field }) => (
                            <FormItem className="bg-[#e6f1fa] dark:bg-[#2c4c6b]/20 p-4 rounded-xl border border-[#a8d1f0] dark:border-[#3a5d7d]">
                              <FormLabel className="text-base font-medium flex items-center gap-2">
                                <Award className="h-4 w-4 text-[#5fa2db]" />
                                Capaian Pembelajaran Lulusan (CPL)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Contoh: CPL-01, CPL-03, CPL-05"
                                  className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-[#5fa2db] h-12"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Kode CPL yang terkait dengan mata kuliah (pisahkan dengan koma)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="bg-gradient-to-r from-[#e6f1fa] to-[#d0e4f5] dark:from-[#2c4c6b]/20 dark:to-[#3a5d7d]/20 rounded-xl p-4 border border-[#a8d1f0] dark:border-[#3a5d7d]">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-5 w-5 text-[#5fa2db]" />
                            <h3 className="font-medium">Contoh CPL</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge className="bg-white dark:bg-gray-800 text-[#5fa2db] dark:text-[#a8d1f0] hover:bg-white/80 dark:hover:bg-gray-800/80">
                              CPL-01: Mampu menerapkan pemikiran logis dan kritis
                            </Badge>
                            <Badge className="bg-white dark:bg-gray-800 text-[#5fa2db] dark:text-[#a8d1f0] hover:bg-white/80 dark:hover:bg-gray-800/80">
                              CPL-02: Mampu menganalisis masalah
                            </Badge>
                            <Badge className="bg-white dark:bg-gray-800 text-[#5fa2db] dark:text-[#a8d1f0] hover:bg-white/80 dark:hover:bg-gray-800/80">
                              CPL-03: Mampu merancang solusi
                            </Badge>
                            <Badge className="bg-white dark:bg-gray-800 text-[#5fa2db] dark:text-[#a8d1f0] hover:bg-white/80 dark:hover:bg-gray-800/80">
                              CPL-04: Mampu mengimplementasikan solusi
                            </Badge>
                            <Badge className="bg-white dark:bg-gray-800 text-[#5fa2db] dark:text-[#a8d1f0] hover:bg-white/80 dark:hover:bg-gray-800/80">
                              CPL-05: Mampu berkomunikasi efektif
                            </Badge>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-full px-6"
                            onClick={() => setActiveTab("instructor-info")}
                          >
                            Kembali
                          </Button>
                          <Button
                            type="submit"
                            disabled={isGenerating}
                            className="rounded-full bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] text-white border-0"
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Membuat RPS...
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Buat RPS
                              </>
                            )}
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </form>
                </Form>
              </div>
            </Card>

            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border-0 p-8 mt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] text-white p-3 rounded-2xl">
                      <Sparkles className="h-6 w-6 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Membuat RPS dengan AI</h2>
                      <p className="text-muted-foreground">Mohon tunggu sebentar...</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Progress
                      value={progress}
                      className="h-3 rounded-full"
                      indicatorClassName="bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6]"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-[#e6f1fa] dark:bg-[#2c4c6b]/20 p-4 rounded-xl border border-[#a8d1f0] dark:border-[#3a5d7d] flex items-center gap-3">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                          <BookOpen className="h-5 w-5 text-[#5fa2db]" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Menganalisis</p>
                          <p className="font-medium">Informasi Mata Kuliah</p>
                        </div>
                      </div>

                      <div className="bg-[#e6f1fa] dark:bg-[#2c4c6b]/20 p-4 rounded-xl border border-[#a8d1f0] dark:border-[#3a5d7d] flex items-center gap-3">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                          <BookText className="h-5 w-5 text-[#5fa2db]" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Menyusun</p>
                          <p className="font-medium">Materi Pembelajaran</p>
                        </div>
                      </div>

                      <div className="bg-[#e6f1fa] dark:bg-[#2c4c6b]/20 p-4 rounded-xl border border-[#a8d1f0] dark:border-[#3a5d7d] flex items-center gap-3">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                          <Award className="h-5 w-5 text-[#5fa2db]" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Menentukan</p>
                          <p className="font-medium">Metode Evaluasi</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                      <Info className="h-4 w-4" />
                      <p>
                        AI sedang menyusun RPS berdasarkan informasi yang Anda berikan. Proses ini mungkin memakan waktu
                        beberapa saat.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <Card className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border-0 flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[#d0e4f5] dark:bg-[#3a5d7d]/30 p-2 rounded-xl">
                        <Info className="h-5 w-5 text-[#5fa2db]" />
                      </div>
                      <h3 className="text-lg font-bold">Tips Membuat RPS</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="bg-[#d0e4f5] dark:bg-[#3a5d7d]/30 text-[#5fa2db] rounded-full p-1 mt-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <span>Pastikan bahan kajian sesuai dengan capaian pembelajaran</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-[#d0e4f5] dark:bg-[#3a5d7d]/30 text-[#5fa2db] rounded-full p-1 mt-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <span>Tentukan metode pembelajaran yang sesuai dengan karakteristik mata kuliah</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-[#d0e4f5] dark:bg-[#3a5d7d]/30 text-[#5fa2db] rounded-full p-1 mt-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <span>Sesuaikan bobot penilaian dengan tingkat kesulitan tugas</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] text-white rounded-3xl shadow-lg overflow-hidden border-0 flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white/20 p-2 rounded-xl">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold">Fitur AI</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="bg-white/20 rounded-full p-1 mt-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <span>Otomatis menyusun rencana pembelajaran mingguan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-white/20 rounded-full p-1 mt-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <span>Menyarankan metode pembelajaran yang sesuai</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-white/20 rounded-full p-1 mt-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <span>Membuat rubrik penilaian berdasarkan capaian pembelajaran</span>
                      </li>
                    </ul>
                    <Button className="mt-4 bg-white text-[#5fa2db] hover:bg-white/90 hover:text-[#4a8bc7] rounded-full w-full">
                      Pelajari Lebih Lanjut
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              className="absolute -z-10 top-20 right-20 w-72 h-72 bg-[#d0e4f5] dark:bg-[#2c4c6b]/20 rounded-full blur-3xl opacity-30"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute -z-10 bottom-20 left-20 w-80 h-80 bg-[#e6f1fa] dark:bg-[#3a5d7d]/20 rounded-full blur-3xl opacity-30"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.4, 0.3]
              }}
              transition={{ 
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse"
              }}
            />
            
            <div className="flex justify-between items-center mb-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <Button 
                  onClick={handleReset} 
                  variant="outline" 
                  className="rounded-full border-[#a8d1f0] text-[#5fa2db] hover:bg-[#e6f1fa]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Form
                </Button>
                <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
                <h2 className="text-2xl font-bold">Hasil RPS</h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button 
                  onClick={triggerConfetti}
                  className="rounded-full bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] text-white"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Rayakan
                </Button>
              </motion.div>
            </div>
            
            <RpsResultView data={generatedRpsData} isLoading={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

