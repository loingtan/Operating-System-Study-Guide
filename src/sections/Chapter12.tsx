import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HardDrive, Link, Database, Server, Terminal,
  CheckCircle, Layers, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter12() {
  const [showRealWorld, setShowRealWorld] = useState(false);

  return (
    <div className="space-y-8">
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 12</Badge>
        <h1 className="text-4xl font-bold text-gray-900">File-System Implementation</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Deep dive into file system layers, directory implementation, allocation methods, free space management, journaling, and real-world file systems
        </p>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-gray-500" />
              File System Structure Layers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              A file system is implemented as a layered architecture. Each layer abstracts the details of the layer below it, providing a cleaner interface to the layer above. This modularity allows different file systems to coexist on the same operating system.
            </p>

            <div className="bg-slate-900 p-5 rounded-lg overflow-x-auto">
              <pre className="text-gray-300 text-xs font-mono">
{`
+---------------------------+
|  Application Programs     |  User programs, databases, web servers
+---------------------------+
            |
+---------------------------+
|  Logical File System      |  Manages metadata, directory structure,
|                           |  file control blocks (FCB/inodes), protection
+---------------------------+
            |
+---------------------------+
|  File-Organization Module |  Translates logical file addresses to
|                           |  physical block addresses, manages free space
+---------------------------+
            |
+---------------------------+
|  Basic File System        |  Issues generic commands (read block N,
|                           |  write block N) to device driver
+---------------------------+
            |
+---------------------------+
|  I/O Control              |  Device drivers, interrupt handlers,
|                           |  DMA controllers
+---------------------------+
            |
+---------------------------+
|  Devices                  |  Physical storage (HDD, SSD, NVMe, tape)
+---------------------------+
`}
              </pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Logical File System</h4>
                <p className="text-sm text-gray-700">Handles all metadata operations: creating and deleting files, managing directories, maintaining file attributes, and enforcing access control. It manages the File Control Block (FCB), which in Unix is the inode.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">File-Organization Module</h4>
                <p className="text-sm text-gray-700">Knows about files and their logical blocks, as well as the physical blocks on the disk. It translates logical block addresses to physical block addresses and manages the free-space manager.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Basic File System</h4>
                <p className="text-sm text-gray-700">Issues generic commands to the appropriate device driver to read and write physical blocks on the disk. It also manages memory buffers and caches for these blocks.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">I/O Control Layer</h4>
                <p className="text-sm text-gray-700">Consists of device drivers and interrupt handlers. It receives high-level commands like &quot;retrieve block 123&quot; and translates them into hardware-specific instructions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-gray-500" />
              Directory Implementation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              The directory structure is how the file system maps human-readable filenames to the internal data structures (like inodes) that describe the actual file. The efficiency of this mapping directly impacts file creation, deletion, and lookup performance.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Linear List</h4>
                <p className="text-sm text-gray-700 mb-2">The simplest directory implementation stores file names and pointers as a linear list of data structures.</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Pros:</strong> Simple to program, minimal overhead</li>
                  <li><strong>Cons:</strong> Searching is O(n). Creating a file requires a linear scan to check for duplicates. Deletion can leave holes (requires compaction or free-list management).</li>
                </ul>
                <pre className="mt-3 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
Directory Block:
+----------------+----------------+
| file1.txt      | inode 1042     |
+----------------+----------------+
| report.pdf     | inode 2056     |
+----------------+----------------+
| data.csv       | inode 3081     |
+----------------+----------------+
| (deleted)      | inode 0        |  <-- hole
+----------------+----------------+
| notes.md       | inode 4099     |
+----------------+----------------+
`}
                </pre>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Hash Table</h4>
                <p className="text-sm text-gray-700 mb-2">A hash table is used to speed up directory searches. The file name is hashed to produce an index into the directory entries.</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Pros:</strong> Average search time is O(1). Very fast lookups.</li>
                  <li><strong>Cons:</strong> Hash collisions require chaining or open addressing. The table size is fixed unless dynamic rehashing is implemented. Does not support ordered listing natively.</li>
                </ul>
                <pre className="mt-3 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
Hash Function: H(filename) = sum(ascii) % TABLE_SIZE

Hash Table:
Index 0: [config.ini, inode 501] -> [crash.log, inode 890]
Index 1: NULL
Index 2: [main.c, inode 102]
Index 3: [README, inode 333] -> [Makefile, inode 444]
...
`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">B-Tree / B+ Tree Directories</h4>
              <p className="text-sm text-gray-700">
                Modern file systems (NTFS, XFS, Btrfs, APFS) use B-trees or B+ trees for directories. These balanced tree structures provide O(log n) lookup, insertion, and deletion, and naturally support ordered iteration (e.g., listing files alphabetically).
              </p>
              <pre className="mt-3 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
       [M]
      /   \
   [A,F]  [P,Z]
   / | \
  ... (leaf nodes contain filename -> inode mappings)

B+ Tree properties:
- Balanced: all leaf nodes at same depth
- Sorted: natural alphabetical ordering
- Efficient range queries (ls, find)
- Used by NTFS (MFT index), XFS, Btrfs
`}
              </pre>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Implementation</th>
                    <th className="p-3 text-left">Lookup</th>
                    <th className="p-3 text-left">Insertion</th>
                    <th className="p-3 text-left">Deletion</th>
                    <th className="p-3 text-left">Ordered Listing</th>
                    <th className="p-3 text-left">Used By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3 font-medium">Linear List</td><td className="p-3">O(n)</td><td className="p-3">O(n)</td><td className="p-3">O(n)</td><td className="p-3">Requires sort</td><td className="p-3">FAT12/16, simple FS</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Hash Table</td><td className="p-3">O(1) avg</td><td className="p-3">O(1) avg</td><td className="p-3">O(1) avg</td><td className="p-3">No</td><td className="p-3">Some UFS implementations</td></tr>
                  <tr><td className="p-3 font-medium">B-Tree / B+ Tree</td><td className="p-3">O(log n)</td><td className="p-3">O(log n)</td><td className="p-3">O(log n)</td><td className="p-3">Yes</td><td className="p-3">NTFS, XFS, Btrfs, APFS</td></tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-6 h-6 text-gray-500" />
              Allocation Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              The allocation method determines how disk blocks are assigned to files. The choice affects file access speed, storage efficiency, and fragmentation.
            </p>

            <Tabs defaultValue="contiguous" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="contiguous">Contiguous</TabsTrigger>
                <TabsTrigger value="linked">Linked</TabsTrigger>
                <TabsTrigger value="fat">FAT</TabsTrigger>
                <TabsTrigger value="indexed">Indexed</TabsTrigger>
              </TabsList>

              <TabsContent value="contiguous" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Contiguous Allocation</h4>
                  <p className="text-sm text-gray-700 mt-2">Each file occupies a set of contiguous blocks on the disk. The directory entry stores the starting address and the length (in blocks).</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <pre className="text-gray-300 text-xs font-mono">
{`
Disk blocks:
[0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10] [11] [12]
     |file A|      |    file B     |       |file C|

Directory:
File A: start=1, length=2
File B: start=4, length=4
File C: start=10, length=3
`}
                  </pre>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded"><p className="font-semibold text-sm">Advantages</p><ul className="text-xs text-gray-600 mt-1 space-y-1"><li>Minimal disk seeks (optimal sequential access)</li><li>Simple: only start address and length needed</li><li>Fast random access: block = start + n</li></ul></div>
                  <div className="bg-gray-50 p-3 rounded"><p className="font-semibold text-sm">Disadvantages</p><ul className="text-xs text-gray-600 mt-1 space-y-1"><li>External fragmentation over time</li><li>File size must be known at creation</li><li>Difficult to extend files</li></ul></div>
                </div>
              </TabsContent>

              <TabsContent value="linked" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Linked Allocation</h4>
                  <p className="text-sm text-gray-700 mt-2">Each file is a linked list of disk blocks. Each block contains a pointer to the next block. The directory entry stores the start and end block numbers.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <pre className="text-gray-300 text-xs font-mono">
{`
Directory: File X starts at block 2

Block 2: [data........... | pointer -> 5]
Block 5: [data........... | pointer -> 8]
Block 8: [data........... | pointer -> 12]
Block 12: [data.......... | pointer -> NULL]

Pros: No external fragmentation, files can grow dynamically
Cons: Poor random access (must follow chain), pointer overhead
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">To access block N, the OS must read N-1 blocks to follow the pointers. This makes random access extremely slow.</p>
              </TabsContent>

              <TabsContent value="fat" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">File Allocation Table (FAT)</h4>
                  <p className="text-sm text-gray-700 mt-2">FAT is a variation of linked allocation where all pointers are stored in a central table in memory (the FAT), rather than in the data blocks themselves. This avoids the random-access penalty of linked allocation.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <pre className="text-gray-300 text-xs font-mono">
{`
Directory: File A starts at block 2

FAT Table:
Block 0:  --
Block 1:  --
Block 2:  5     <-- File A, next block is 5
Block 3:  11    <-- File B
Block 4:  --
Block 5:  8     <-- File A, next block is 8
Block 6:  --
...
Block 8:  EOF   <-- File A ends here
Block 11: 7     <-- File B
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Versions:</strong> FAT12 (12-bit entries, up to 4096 blocks), FAT16 (65,536 blocks), FAT32 (~268 million blocks). exFAT removes the 4GB file size limit and is optimized for flash drives.
                </p>
              </TabsContent>

              <TabsContent value="indexed" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Indexed Allocation</h4>
                  <p className="text-sm text-gray-700 mt-2">Each file has its own index block, which is an array of pointers to the data blocks. The directory entry contains the address of the index block. This supports direct access without external fragmentation.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <pre className="text-gray-300 text-xs font-mono">
{`
Directory: File C index block = 25

Index Block 25:
[0]  -> 4
[1]  -> 19
[2]  -> 2
[3]  -> 31
[4]  -> 15
...

Data blocks: 4, 19, 2, 31, 15 (not contiguous)

To read block N: lookup index_block[N], then read that disk block.
`}
                  </pre>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                  <h4 className="font-semibold text-gray-900 mb-2">Unix Inode Structure (Multilevel Indexing)</h4>
                  <p className="text-sm text-gray-700 mb-2">Unix inodes use a hybrid approach: direct pointers for small files, single indirect, double indirect, and triple indirect pointers for large files.</p>
                  <pre className="p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
inode structure (typical ext2/ext3):
- 12 direct pointers
- 1 single indirect pointer  (points to block of pointers)
- 1 double indirect pointer  (points to block of blocks of pointers)
- 1 triple indirect pointer

Assuming 4KB blocks and 4-byte pointers:
Direct:      12 * 4KB = 48 KB
Single ind:  1024 * 4KB = 4 MB
Double ind:  1024 * 1024 * 4KB = 4 GB
Triple ind:  1024^3 * 4KB = 4 TB
Total max file size ~ 4 TB
`}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Criterion</th>
                    <th className="p-3 text-left">Contiguous</th>
                    <th className="p-3 text-left">Linked</th>
                    <th className="p-3 text-left">FAT</th>
                    <th className="p-3 text-left">Indexed (Inode)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3 font-medium">Sequential access</td><td className="p-3">Excellent</td><td className="p-3">Good</td><td className="p-3">Good</td><td className="p-3">Good</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Random access</td><td className="p-3">Excellent</td><td className="p-3">Poor</td><td className="p-3">Good</td><td className="p-3">Excellent</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Fragmentation</td><td className="p-3">External</td><td className="p-3">None</td><td className="p-3">None</td><td className="p-3">None</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Space overhead</td><td className="p-3">Minimal</td><td className="p-3">Pointer per block</td><td className="p-3">One FAT table</td><td className="p-3">One index block per file</td></tr>
                  <tr><td className="p-3 font-medium">Real-world FS</td><td className="p-3">CD-ROM (ISO 9660)</td><td className="p-3">None modern</td><td className="p-3">FAT12/16/32, exFAT</td><td className="p-3">Unix ext2/3/4, UFS</td></tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="w-6 h-6 text-gray-500" />
              Free-Space Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              The file system must track which disk blocks are free so it can allocate them to new files or directories. The efficiency of free-space management affects allocation speed and disk utilization.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Bit Vector (Bitmap)</h4>
                <p className="text-sm text-gray-700 mt-1">Each block is represented by one bit. 1 means free, 0 means allocated (or vice versa).</p>
                <pre className="mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
Blocks: 0 1 2 3 4 5 6 7 8 9
State:  1 0 0 1 1 0 1 1 0 1

Bit vector: 1001101101

Block n status = bit_vector[n]
Find n free blocks = scan for n consecutive 1s
`}
                </pre>
                <p className="text-xs text-gray-600 mt-2"><strong>Pros:</strong> Simple, efficient for finding contiguous blocks. <strong>Cons:</strong> Requires memory proportional to disk size. For a 1TB disk with 4KB blocks, bitmap is 32MB.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Linked List</h4>
                <p className="text-sm text-gray-700 mt-1">Link all free blocks together. The first free block pointer is cached in memory.</p>
                <pre className="mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
Free block list:
[2] -> [5] -> [8] -> [10] -> [12] -> NULL

Allocate: remove head
Free: insert at head
`}
                </pre>
                <p className="text-xs text-gray-600 mt-2"><strong>Pros:</strong> Minimal memory overhead. <strong>Cons:</strong> Traversing the list requires many disk reads. Not efficient for finding contiguous blocks.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Grouping</h4>
                <p className="text-sm text-gray-700 mt-1">The first free block contains addresses of n free blocks. The last address points to another block of addresses.</p>
                <pre className="mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
Block 2: [5, 8, 10, 12, 14, 16, 18, 20, 22, -> 25]
Block 25: [26, 27, 28, 29, 30, 31, 32, 33, 34, -> 40]
...

Advantage: Addresses of many free blocks can be found quickly
without reading every free block individually.
`}
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Counting</h4>
                <p className="text-sm text-gray-700 mt-1">Store (address, count) pairs. Because contiguous blocks are often allocated and freed together, we can group them.</p>
                <pre className="mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
Free space list:
(2, 1)    -- block 2 is free
(5, 3)    -- blocks 5, 6, 7 are free
(10, 5)   -- blocks 10-14 are free

Very efficient when blocks are freed in runs.
Used in some extents-based file systems.
`}
                </pre>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Method</th>
                    <th className="p-3 text-left">Memory Overhead</th>
                    <th className="p-3 text-left">Allocation Speed</th>
                    <th className="p-3 text-left">Contiguous Support</th>
                    <th className="p-3 text-left">Used By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3 font-medium">Bit Vector</td><td className="p-3">1 bit per block</td><td className="p-3">Fast scan</td><td className="p-3">Excellent</td><td className="p-3">ext4, XFS, Btrfs</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Linked List</td><td className="p-3">One pointer</td><td className="p-3">Slow (disk I/O)</td><td className="p-3">Poor</td><td className="p-3">FAT (implicitly)</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Grouping</td><td className="p-3">Low</td><td className="p-3">Fast batch</td><td className="p-3">Moderate</td><td className="p-3">UFS</td></tr>
                  <tr><td className="p-3 font-medium">Counting</td><td className="p-3">Low</td><td className="p-3">Fast for runs</td><td className="p-3">Excellent</td><td className="p-3">Extent-based FS</td></tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-gray-500" />
              Efficiency, Performance, and Recovery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Performance Optimizations</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Buffer Cache:</strong> The OS caches disk blocks in memory. Reads and writes hit the cache when possible, avoiding physical disk I/O.</li>
                  <li><strong>Directory Cache:</strong> Caches directory entries and inode metadata to speed up path resolution.</li>
                  <li><strong>Read-Ahead:</strong> The OS predicts sequential reads and prefetches subsequent blocks into the cache.</li>
                  <li><strong>Write Buffering:</strong> Writes are buffered and flushed asynchronously. This batches writes and reduces disk seeks.</li>
                  <li><strong>Synchronous Writes:</strong> Forces data to disk immediately (e.g., database commits). Slower but guarantees durability.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Journaling (Write-Ahead Logging)</h4>
                <p className="text-sm text-gray-700 mb-2">A journal is a circular log of transactions. Before modifying the file system structures, the changes are written to the journal. This ensures quick recovery after a crash.</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Journal Mode:</strong> All data and metadata are journaled. Safest but slowest.</li>
                  <li><strong>Ordered Mode:</strong> Only metadata is journaled, but data is forced to disk before metadata. Good balance (ext4 default).</li>
                  <li><strong>Writeback Mode:</strong> Only metadata is journaled. Fastest but can leave old data in files after a crash.</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-3">Journaling Transaction Flow</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
1. Write transaction contents to journal
2. Mark transaction as COMMITTED in journal
3. Write metadata (and optionally data) to disk
4. Mark transaction as CHECKPOINTED (free journal space)

On crash recovery:
- Scan journal for committed but not checkpointed transactions
- Replay (redo) those transactions to ensure consistency
`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Recovery Techniques</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-gray-300">
                  <p className="font-semibold text-sm text-gray-800">fsck (File System Consistency Check)</p>
                  <p className="text-xs text-gray-600 mt-1">Scans the entire file system after an unclean shutdown. Compares allocation bitmaps with directory entries, checks superblock consistency, and repairs orphaned inodes.</p>
                  <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check ext4 filesystem
sudo fsck -n /dev/sda1

# Force check on next boot
sudo tune2fs -c 1 /dev/sda1`}
                  </code>
                </div>
                <div className="bg-white p-4 rounded border border-gray-300">
                  <p className="font-semibold text-sm text-gray-800">Log-Structured File Systems (LFS)</p>
                  <p className="text-xs text-gray-600 mt-1">Treats the entire disk as a circular log. All writes are sequential appends. A map (inode map) tracks the current location of each inode. Examples: WAFL (NetApp), F2FS (flash-optimized).</p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-300">
                  <p className="font-semibold text-sm text-gray-800">Snapshots</p>
                  <p className="text-xs text-gray-600 mt-1">A point-in-time read-only copy of the file system. Implemented using copy-on-write: when a block is modified, the old block is preserved for the snapshot. Used by ZFS, Btrfs, and LVM.</p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-300">
                  <p className="font-semibold text-sm text-gray-800">Copy-on-Write (CoW)</p>
                  <p className="text-xs text-gray-600 mt-1">Instead of overwriting data in place, new data is written to new blocks, and pointers are updated. If the system crashes, the old state remains intact.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-6 h-6 text-gray-500" />
              Real-World File Systems Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">File System</th>
                    <th className="p-3 text-left">Allocation</th>
                    <th className="p-3 text-left">Journaling</th>
                    <th className="p-3 text-left">Max File Size</th>
                    <th className="p-3 text-left">Key Features</th>
                    <th className="p-3 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">ext4</td>
                    <td className="p-3">Extents + inodes</td>
                    <td className="p-3">Ordered journal</td>
                    <td className="p-3">16 TB / 1 EB volume</td>
                    <td className="p-3">Backward compatible with ext2/3, fast, stable</td>
                    <td className="p-3">General Linux use</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">XFS</td>
                    <td className="p-3">Extents + B+ trees</td>
                    <td className="p-3">Metadata journal</td>
                    <td className="p-3">8 EB / 8 EB volume</td>
                    <td className="p-3">Excellent for large files, parallel I/O, fast deletion</td>
                    <td className="p-3">Large file servers, media</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Btrfs</td>
                    <td className="p-3">Extents + B-trees</td>
                    <td className="p-3">CoW (no traditional journal)</td>
                    <td className="p-3">16 EB</td>
                    <td className="p-3">Snapshots, RAID integration, checksums, subvolumes</td>
                    <td className="p-3">Advanced desktops, NAS</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">ZFS</td>
                    <td className="p-3">Dynamic striping</td>
                    <td className="p-3">Intent log + CoW</td>
                    <td className="p-3">16 EB</td>
                    <td className="p-3">Data integrity (checksums), snapshots, compression, dedup</td>
                    <td className="p-3">Enterprise storage, NAS</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">NTFS</td>
                    <td className="p-3">Extents in MFT</td>
                    <td className="p-3">Yes (journal)</td>
                    <td className="p-3">16 EB</td>
                    <td className="p-3">ACLs, encryption, compression, sparse files</td>
                    <td className="p-3">Windows systems</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">APFS</td>
                    <td className="p-3">B-trees + CoW</td>
                    <td className="p-3">Atomic writes + CoW</td>
                    <td className="p-3">8 EB</td>
                    <td className="p-3">Snapshots, encryption, space sharing, fast directory sizing</td>
                    <td className="p-3">macOS, iOS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Terminal className="w-6 h-6 text-gray-400" />
              Practical Backend Engineering Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setShowRealWorld(!showRealWorld)}
              variant="outline" 
              className="border-gray-400 text-gray-400 hover:bg-gray-700"
            >
              {showRealWorld ? 'Hide Examples' : 'Show All Examples'}
            </Button>

            {showRealWorld && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 1: Using fsck to Repair a Corrupt Filesystem</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    After an unexpected power loss, a filesystem may be left in an inconsistent state. Always unmount before running fsck.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check filesystem without repairing
sudo fsck -n /dev/sda1

# Interactive repair
sudo fsck /dev/sda1

# Force full check (even if clean)
sudo fsck -f /dev/sda1

# For XFS (uses xfs_repair, not fsck)
sudo xfs_repair /dev/sdb1`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 2: Understanding Disk Usage (du vs df)</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    <code>df</code> reports filesystem-level free space. <code>du</code> sums up directory contents. Discrepancies often occur due to deleted files held open by processes or sparse files.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Filesystem-level usage
df -h

# Directory-level usage
du -sh /var/log

# Find largest directories
du -h /var | sort -rh | head -20

# Find deleted but held-open files (common cause of df > du)
sudo lsof +L1`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 3: Debugging Filesystem Performance</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    When a system is slow due to disk I/O, use these tools to identify the bottleneck.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# iostat: identify busy devices and high latency
iostat -xz 1
# Watch %util (should be < 80%) and await (avg wait ms)

# iotop: per-process disk usage
sudo iotop -o

# blktrace: deep block-level analysis
sudo blktrace -d /dev/sda -o - | blkparse -i -

# Check filesystem mount options (noatime can reduce writes)
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 4: Creating and Tuning ext4 for Databases</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Databases benefit from specific ext4 mount options that reduce journaling overhead and improve I/O patterns.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Format with large file support and no reserved blocks
sudo mkfs.ext4 -m 0 -E stride=128,stripe-width=256 /dev/sdb1

# Mount with database-friendly options
sudo mount -o noatime,nodiratime,nobarrier,data=writeback /dev/sdb1 /db

# Explanation:
# noatime      - don't update access times (fewer writes)
# nodiratime   - don't update directory access times
# nobarrier    - disable write barriers (only with battery-backed RAID!)
# data=writeback - fastest journal mode`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 5: Filesystem Snapshots with LVM</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    LVM snapshots allow you to back up a live filesystem without stopping the application.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Create a snapshot of the /data volume
sudo lvcreate -L 10G -s -n data_snap /dev/vg0/data

# Mount the snapshot read-only for backup
sudo mkdir /mnt/snap
sudo mount -o ro /dev/vg0/data_snap /mnt/snap
rsync -a /mnt/snap/ backup-server:/backups/data/

# Remove snapshot when done
sudo umount /mnt/snap
sudo lvremove /dev/vg0/data_snap`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 6: Inode Exhaustion</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    A filesystem can run out of inodes before it runs out of disk space, typically caused by millions of tiny files (e.g., caches, mail queues).
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check inode usage
df -i

# If inodes are exhausted, you cannot create new files
# even if disk space is available.

# Find directories with many files
sudo find /var -xdev -printf '%h\n' | sort | uniq -c | sort -k 1 -n | tail -20

# When creating ext4, adjust bytes-per-inode ratio
sudo mkfs.ext4 -i 16384 /dev/sdb1  # 1 inode per 16KB (more inodes)`}
                  </code>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-gray-500" />
              Key Takeaways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "File systems use layered architecture to separate logical operations from physical disk I/O",
                "B-trees are the modern standard for directory implementation due to O(log n) performance",
                "Indexed allocation (inodes) with multilevel indirect blocks enables efficient random access for files of any size",
                "FAT centralizes linked allocation pointers in memory, improving performance over simple linked lists",
                "Free-space bitmaps are fast for finding contiguous blocks; linked lists and grouping use less memory",
                "Journaling ensures fast recovery after crashes by replaying committed transactions",
                "Different file systems optimize for different workloads: ext4 for general use, XFS for large files, ZFS for data integrity",
                "Backend engineers must understand tools like fsck, du, df, and iostat to diagnose and resolve storage issues"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
