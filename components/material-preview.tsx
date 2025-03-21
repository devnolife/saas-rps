"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookText, Download, Edit, Copy, Sparkles } from "lucide-react"

interface MaterialPreviewProps {
  materialType: string
}

export function MaterialPreview({ materialType }: MaterialPreviewProps) {
  const [activeTab, setActiveTab] = useState("content")

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-primary">✨</span>
            Data Structures Overview
          </h2>
          <p className="text-muted-foreground text-lg ml-7">
            CS202 •{" "}
            {materialType === "lecture-notes"
              ? "Lecture Notes"
              : materialType === "quizzes"
                ? "Quiz"
                : materialType === "assignments"
                  ? "Assignment"
                  : "Presentation"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full px-6 border-2 hover:border-primary hover:bg-primary-lighter/20"
          >
            <Download className="h-5 w-5 mr-2" />
            Download
          </Button>
          <Button className="rounded-full bg-primary hover:bg-primary-dark text-white px-6 shadow-md hover:shadow-lg transition-all duration-300">
            <Edit className="h-5 w-5 mr-2" />
            Edit Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" onValueChange={setActiveTab} className="w-full">
        <TabsList className="rounded-full bg-gray-100 dark:bg-gray-700 p-1.5 w-full max-w-md">
          <TabsTrigger
            value="content"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            value="structure"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Structure
          </TabsTrigger>
          <TabsTrigger
            value="metadata"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Metadata
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-8">
          <div className="border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-8 bg-white dark:bg-gray-800 shadow-md">
            <h1 className="text-3xl font-bold mb-6">Data Structures: An Overview</h1>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction to Data Structures</h2>
            <p className="mb-4 text-lg">
              Data structures are specialized formats for organizing, processing, retrieving and storing data. They
              provide a means to manage large amounts of data efficiently for uses such as large databases and internet
              indexing services.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">1.1 Why Data Structures Matter</h3>
            <ul className="list-disc pl-8 space-y-2 mb-6 text-lg">
              <li>Efficiency in data processing and retrieval</li>
              <li>Organization of information in computer memory</li>
              <li>Simplification of complex data handling operations</li>
              <li>Foundation for algorithm design and implementation</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Types of Data Structures</h2>
            <p className="mb-4 text-lg">
              Data structures can be broadly classified into two categories: linear and non-linear data structures.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">2.1 Linear Data Structures</h3>
            <p className="mb-3 text-lg">
              Linear data structures arrange data elements sequentially, where each element is attached to its previous
              and next adjacent elements.
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-6 text-lg">
              <li>
                <strong>Arrays:</strong> Collection of elements identified by index
              </li>
              <li>
                <strong>Linked Lists:</strong> Collection of nodes linked via references
              </li>
              <li>
                <strong>Stacks:</strong> LIFO (Last In First Out) principle
              </li>
              <li>
                <strong>Queues:</strong> FIFO (First In First Out) principle
              </li>
            </ul>

            <div className="my-8 p-6 bg-primary-lighter/30 dark:bg-primary/20 rounded-3xl border-2 border-primary-lighter dark:border-primary/30 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 gen-z-blob-alt bg-primary/10"></div>
              <div className="relative z-10">
                <h4 className="font-medium text-xl mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Example: Array Implementation
                </h4>
                <pre className="bg-white dark:bg-gray-800 p-4 rounded-2xl text-base overflow-x-auto shadow-md">
                  {`int[] numbers = new int[5];
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
numbers[3] = 40;
numbers[4] = 50;`}
                </pre>
                <div className="flex justify-end mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 rounded-full text-primary hover:text-primary-dark hover:bg-primary-lighter/30"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-medium mt-6 mb-3">2.2 Non-Linear Data Structures</h3>
            <p className="mb-3 text-lg">
              Non-linear data structures do not organize data in a sequential manner. Instead, they establish
              relationships between elements in a hierarchical or networked way.
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-6 text-lg">
              <li>
                <strong>Trees:</strong> Hierarchical structure with a root node and child nodes
              </li>
              <li>
                <strong>Graphs:</strong> Collection of nodes connected by edges
              </li>
              <li>
                <strong>Hash Tables:</strong> Key-value pairs for efficient data retrieval
              </li>
              <li>
                <strong>Heaps:</strong> Special tree-based structure for priority operations
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Choosing the Right Data Structure</h2>
            <p className="mb-4 text-lg">
              Selecting an appropriate data structure depends on various factors including:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-6 text-lg">
              <li>Nature of the data being processed</li>
              <li>Required operations (insertion, deletion, searching, etc.)</li>
              <li>Memory constraints of the system</li>
              <li>Time complexity requirements for operations</li>
              <li>Implementation complexity and maintainability</li>
            </ul>

            <div className="my-8 p-6 bg-secondary/50 dark:bg-secondary/20 rounded-3xl border-2 border-secondary dark:border-secondary/30 relative overflow-hidden">
              <div className="absolute -left-8 -bottom-8 w-32 h-32 gen-z-blob bg-accent/10"></div>
              <div className="relative z-10">
                <h4 className="font-medium text-xl mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Comparison: Time Complexity
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
                    <thead className="bg-primary-lighter/30 dark:bg-primary/20">
                      <tr>
                        <th className="text-left p-4 font-semibold">Data Structure</th>
                        <th className="text-left p-4 font-semibold">Access</th>
                        <th className="text-left p-4 font-semibold">Search</th>
                        <th className="text-left p-4 font-semibold">Insertion</th>
                        <th className="text-left p-4 font-semibold">Deletion</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="p-4 font-medium">Array</td>
                        <td className="p-4">O(1)</td>
                        <td className="p-4">O(n)</td>
                        <td className="p-4">O(n)</td>
                        <td className="p-4">O(n)</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="p-4 font-medium">Linked List</td>
                        <td className="p-4">O(n)</td>
                        <td className="p-4">O(n)</td>
                        <td className="p-4">O(1)</td>
                        <td className="p-4">O(1)</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Hash Table</td>
                        <td className="p-4">N/A</td>
                        <td className="p-4">O(1)</td>
                        <td className="p-4">O(1)</td>
                        <td className="p-4">O(1)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Conclusion</h2>
            <p className="mb-4 text-lg">
              Understanding data structures is fundamental to computer science and software development. Efficient data
              structures lead to efficient algorithms, which in turn lead to efficient programs. As a computer
              scientist, having a strong grasp of various data structures and their applications is essential for
              solving complex computational problems.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="structure" className="mt-8">
          <div className="border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-8 bg-white dark:bg-gray-800 shadow-md">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Document Structure
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 p-4 rounded-2xl hover:bg-primary-lighter/20 transition-colors duration-300">
                <div className="mt-1 text-primary bg-primary-lighter p-2 rounded-xl">
                  <BookText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-lg">Title: Data Structures: An Overview</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-2xl hover:bg-primary-lighter/20 transition-colors duration-300">
                <div className="mt-1 text-primary bg-primary-lighter p-2 rounded-xl">
                  <BookText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-lg">Section 1: Introduction to Data Structures</p>
                  <ul className="pl-8 mt-2 space-y-2">
                    <li className="text-muted-foreground">Subsection 1.1: Why Data Structures Matter</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-2xl hover:bg-primary-lighter/20 transition-colors duration-300">
                <div className="mt-1 text-primary bg-primary-lighter p-2 rounded-xl">
                  <BookText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-lg">Section 2: Types of Data Structures</p>
                  <ul className="pl-8 mt-2 space-y-2">
                    <li className="text-muted-foreground">Subsection 2.1: Linear Data Structures</li>
                    <li className="text-muted-foreground">Subsection 2.2: Non-Linear Data Structures</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-2xl hover:bg-primary-lighter/20 transition-colors duration-300">
                <div className="mt-1 text-primary bg-primary-lighter p-2 rounded-xl">
                  <BookText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-lg">Section 3: Choosing the Right Data Structure</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-2xl hover:bg-primary-lighter/20 transition-colors duration-300">
                <div className="mt-1 text-primary bg-primary-lighter p-2 rounded-xl">
                  <BookText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-lg">Section 4: Conclusion</p>
                </div>
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="metadata" className="mt-8">
          <div className="border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-8 bg-white dark:bg-gray-800 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Document Information
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <span className="text-muted-foreground font-medium">Title:</span>
                    <span className="font-medium text-lg">Data Structures Overview</span>
                  </li>
                  <li className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <span className="text-muted-foreground font-medium">Type:</span>
                    <span className="font-medium text-lg">Lecture Notes</span>
                  </li>
                  <li className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <span className="text-muted-foreground font-medium">Course:</span>
                    <span className="font-medium text-lg">CS202 - Data Structures</span>
                  </li>
                  <li className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <span className="text-muted-foreground font-medium">Created:</span>
                    <span className="font-medium text-lg">Today</span>
                  </li>
                  <li className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <span className="text-muted-foreground font-medium">Last Modified:</span>
                    <span className="font-medium text-lg">Today</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Learning Objectives
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 p-3 rounded-xl bg-primary-lighter/30 dark:bg-primary/20">
                    <div className="bg-primary text-white p-1 rounded-lg">✓</div>
                    <span className="font-medium">Understand the concept and importance of data structures</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-xl bg-primary-lighter/30 dark:bg-primary/20">
                    <div className="bg-primary text-white p-1 rounded-lg">✓</div>
                    <span className="font-medium">Differentiate between linear and non-linear data structures</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-xl bg-primary-lighter/30 dark:bg-primary/20">
                    <div className="bg-primary text-white p-1 rounded-lg">✓</div>
                    <span className="font-medium">Identify appropriate data structures for specific problems</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-xl bg-primary-lighter/30 dark:bg-primary/20">
                    <div className="bg-primary text-white p-1 rounded-lg">✓</div>
                    <span className="font-medium">Compare time complexity of operations across data structures</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

