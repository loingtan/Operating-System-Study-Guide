import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HardDrive, Database, Activity, Server,
  Terminal, CheckCircle
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

export default function Chapter10() {
  const [showRealWorld, setShowRealWorld] = useState(false);

  return (
    <div className="space-y-8">
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 10</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Mass-Storage Structure</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive deep dive into disk architecture, scheduling algorithms, RAID, SSD technology, and real-world storage engineering
        </p>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-6 h-6 text-gray-500" />
              Hard Disk Drive (HDD) Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              A <strong>Hard Disk Drive (HDD)</strong> is a non-volatile electromechanical data storage device that stores and retrieves digital data using magnetic storage and one or more rigid rapidly rotating platters coated with magnetic material. Understanding the physical geometry of a hard disk is fundamental to understanding disk scheduling and performance optimization.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Physical Components</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Platters:</strong> Circular disks (typically aluminum or glass) coated with a thin magnetic film. Modern drives have 1-5 platters. Each platter has two surfaces (top and bottom).</li>
                  <li><strong>Spindle:</strong> The central axis that rotates the platters at constant speed (5400, 7200, 10000, or 15000 RPM).</li>
                  <li><strong>Read/Write Heads:</strong> Electromagnetic devices that fly nanometers above the platter surface on an air bearing. One head per surface.</li>
                  <li><strong>Actuator Arm:</strong> Moves the heads in unison across the platter surfaces.</li>
                  <li><strong>Voice Coil Motor (VCM):</strong> The motor that swings the actuator arm to position heads over the correct track.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Logical Geometry Concepts</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Tracks:</strong> Concentric circles on a platter surface. A 3.5" drive may have 100,000+ tracks per surface.</li>
                  <li><strong>Sectors:</strong> The smallest addressable unit, traditionally 512 bytes. Modern Advanced Format drives use 4096-byte sectors.</li>
                  <li><strong>Cylinders:</strong> The collection of all tracks at the same radial distance from the spindle across all platter surfaces. Moving from track to track within the same cylinder requires no seek.</li>
                  <li><strong>Clusters/Blocks:</strong> The minimum unit of allocation used by the file system, typically multiple sectors (e.g., 4KB = 8 sectors).</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">HDD Geometry Visualization (Top View)</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
         Outer Diameter
    <--------------------->
    
         +-----------------+
        /   Track 0         \
       /   +-------------+   \
      /   /   Track 1     \\   \
     |   /   +---------+   \\   |
     |  |   /  Track 2  \\   |  |
     |  |  |  +-------+  |  |  |
     |  |  |  | Sector |  |  |  |   <- Each wedge is a sector
     |  |  |  +-------+  |  |  |
     |  |   \\  Track 3  /   |  |
      \\   \\ +---------+   /
       \\   \\_____________/
        \\_________________/
         +-----------------+
    
    Note: Tracks are concentric, not a spiral (unlike CDs)
`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">CHS vs LBA Addressing</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-700 font-semibold">CHS (Cylinder-Head-Sector)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    The original addressing scheme specifying the physical location: which cylinder (track radius), which head (platter surface), and which sector. Modern drives still emulate CHS for compatibility but internally translate to LBA.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-semibold">LBA (Logical Block Addressing)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    A linear addressing scheme where each sector is assigned a unique integer starting from 0. The disk controller maps LBA to physical CHS internally. LBA eliminates the need for the OS to know disk geometry.
                  </p>
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
              <Activity className="w-6 h-6 text-gray-500" />
              Disk Access Time: Mathematics and Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Disk I/O performance is dominated by mechanical delays. The total time to service a disk request consists of several components. Understanding these formulas is critical for backend engineers designing high-throughput database systems.
            </p>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Disk Access Time Formula</h4>
              <div className="bg-white p-4 rounded border border-gray-300">
                <p className="text-center text-lg text-gray-800 font-mono">
                  T<sub>access</sub> = T<sub>seek</sub> + T<sub>rotation</sub> + T<sub>transfer</sub> + T<sub>controller</sub>
                </p>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p><strong>Seek Time (T<sub>seek</sub>):</strong> Time for the actuator arm to move the head to the correct cylinder. This is the most expensive operation, typically 3-15 ms on modern drives. Average seek time is often quoted as the time to move 1/3 of the way across the disk.</p>
                <p><strong>Rotational Latency (T<sub>rotation</sub>):</strong> Time for the desired sector to rotate under the head. Average latency is half a rotation period: T<sub>avg_rotation</sub> = 60 / (2 * RPM) seconds. For 7200 RPM: 4.17 ms average.</p>
                <p><strong>Transfer Time (T<sub>transfer</sub>):</strong> Time to actually read/write the data. T<sub>transfer</sub> = (bytes to transfer) / (bytes per track * rotational speed). Modern drives sustain 100-250 MB/s.</p>
                <p><strong>Controller Overhead (T<sub>controller</sub>):</strong> Time for the disk controller to process the command, typically 0.1-1 ms.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-400">
              <h4 className="font-semibold text-gray-900 mb-3">Worked Example: Database Read</h4>
              <p className="text-sm text-gray-700 mb-2">Consider a 7200 RPM disk with average seek time 8 ms, transfer rate 150 MB/s, and controller overhead 0.5 ms. How long to read a random 4KB page?</p>
              <ul className="text-sm text-gray-700 space-y-1 font-mono">
                <li>T_seek = 8.0 ms</li>
                <li>T_rotation_avg = 60 / (2 * 7200) * 1000 = 4.17 ms</li>
                <li>T_transfer = 4KB / 150MB/s = 0.026 ms</li>
                <li>T_controller = 0.5 ms</li>
                <li className="text-gray-900 font-bold mt-2">T_total = 8.0 + 4.17 + 0.026 + 0.5 = 12.696 ms</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                <strong>Insight:</strong> The actual data transfer is only 0.026 ms! 99.7% of the time is seek and rotational latency. This is why disk scheduling and caching are so important.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Comparison: Inner vs Outer Tracks</h4>
              <p className="text-sm text-gray-700 mb-3">
                Modern drives use <strong>Zone Bit Recording (ZBR)</strong>: outer tracks have more sectors per track than inner tracks because the circumference is larger. This means sequential read speeds are higher on outer tracks.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Metric</th>
                      <th className="p-3 text-left">Inner Tracks</th>
                      <th className="p-3 text-left">Outer Tracks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Sectors per track</td>
                      <td className="p-3">Fewer</td>
                      <td className="p-3">More</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Sequential throughput</td>
                      <td className="p-3">Lower (~80-120 MB/s)</td>
                      <td className="p-3">Higher (~180-250 MB/s)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Latency</td>
                      <td className="p-3">Same RPM</td>
                      <td className="p-3">Same RPM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-gray-500" />
              Disk Scheduling Algorithms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Because seek time is the most expensive component of disk access, the operating system can improve disk throughput by reordering pending I/O requests. The disk scheduler maintains a queue of pending requests and selects the next one to service based on various policies.
            </p>

            <Tabs defaultValue="fcfs" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="fcfs">FCFS</TabsTrigger>
                <TabsTrigger value="sstf">SSTF</TabsTrigger>
                <TabsTrigger value="scan">SCAN</TabsTrigger>
                <TabsTrigger value="cscan">C-SCAN</TabsTrigger>
                <TabsTrigger value="look">LOOK</TabsTrigger>
                <TabsTrigger value="clook">C-LOOK</TabsTrigger>
              </TabsList>

              <TabsContent value="fcfs" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">First-Come-First-Served (FCFS)</h4>
                  <p className="text-sm text-gray-700 mt-2">Services requests in the order they arrive. Simple and fair but can result in excessive head movement.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  <p className="text-gray-400 text-xs mb-2">Example: Head at 50. Queue: 82, 170, 43, 140, 24, 16, 190</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
Head movement: 50 -> 82 -> 170 -> 43 -> 140 -> 24 -> 16 -> 190
Seek distances: 32 + 88 + 127 + 97 + 116 + 8 + 174 = 642 cylinders

0    16  24  43       82     140    170         190   199
|-----|---|---|--------|-------|-------|-----------|-----|
      H<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">Total head movement: <strong>642 cylinders</strong></p>
              </TabsContent>

              <TabsContent value="sstf" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Shortest Seek Time First (SSTF)</h4>
                  <p className="text-sm text-gray-700 mt-2">Selects the request closest to the current head position. Minimizes seek time locally but can cause starvation of distant requests.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  <p className="text-gray-400 text-xs mb-2">Example: Head at 50. Queue: 82, 170, 43, 140, 24, 16, 190</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
Order: 50 -> 43 -> 24 -> 16 -> 82 -> 140 -> 170 -> 190
Seek distances: 7 + 19 + 8 + 66 + 58 + 30 + 20 = 208 cylinders

0    16  24  43   50   82     140    170    190   199
|-----|---|---|---|----|-------|-------|-------|-----|
           <-<-<-<-H->->->->->
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">Total head movement: <strong>208 cylinders</strong>. Much better than FCFS but starvation possible.</p>
              </TabsContent>

              <TabsContent value="scan" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">SCAN (Elevator Algorithm)</h4>
                  <p className="text-sm text-gray-700 mt-2">The arm starts at one end and moves toward the other, servicing requests as it goes. Then it reverses direction. Like an elevator.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  <p className="text-gray-400 text-xs mb-2">Example: Head at 50, moving toward 0. Queue: 82, 170, 43, 140, 24, 16, 190</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
Order: 50 -> 43 -> 24 -> 16 -> 0 -> 82 -> 140 -> 170 -> 190
Seek distances: 7 + 19 + 8 + 16 + 82 + 58 + 30 + 20 = 260 cylinders

0    16  24  43   50   82     140    170    190   199
|-----|---|---|---|----|-------|-------|-------|-----|
 <-<-<-<-<-<-<-H|->->->->->->->->->->->
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">Total head movement: <strong>260 cylinders</strong>. No starvation but requests at the ends wait longer.</p>
              </TabsContent>

              <TabsContent value="cscan" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">C-SCAN (Circular SCAN)</h4>
                  <p className="text-sm text-gray-700 mt-2">Like SCAN, but when the head reaches one end, it immediately returns to the other end without servicing requests on the return trip. Provides more uniform wait times.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  <p className="text-gray-400 text-xs mb-2">Example: Head at 50, moving toward 199. Queue: 82, 170, 43, 140, 24, 16, 190</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
Order: 50 -> 82 -> 140 -> 170 -> 190 -> 199 -> 0 -> 16 -> 24 -> 43
Seek: 32 + 58 + 30 + 20 + 9 + 199 + 16 + 8 + 19 = 391 cylinders

0    16  24  43   50   82     140    170    190   199
|-----|---|---|---|----|-------|-------|-------|-----|
           ->->->H->->->->->->->|_______|<-<-<-<-<-
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">Total head movement: <strong>391 cylinders</strong>. More uniform service than SCAN.</p>
              </TabsContent>

              <TabsContent value="look" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">LOOK</h4>
                  <p className="text-sm text-gray-700 mt-2">An optimization of SCAN where the arm only goes as far as the last request in each direction, rather than to the physical end of the disk.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  <p className="text-gray-400 text-xs mb-2">Example: Head at 50, moving toward 0. Queue: 82, 170, 43, 140, 24, 16, 190</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
Order: 50 -> 43 -> 24 -> 16 -> 82 -> 140 -> 170 -> 190
Seek distances: 7 + 19 + 8 + 66 + 58 + 30 + 20 = 208 cylinders

0    16  24  43   50   82     140    170    190   199
|-----|---|---|---|----|-------|-------|-------|-----|
      <-<-<-<-H|->->->->->->->->->->->
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">Total head movement: <strong>208 cylinders</strong>. Better than SCAN because it avoids traveling to the physical end.</p>
              </TabsContent>

              <TabsContent value="clook" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">C-LOOK</h4>
                  <p className="text-sm text-gray-700 mt-2">Circular LOOK. The arm goes to the last request in the current direction, then jumps directly to the furthest request in the opposite direction.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  <p className="text-gray-400 text-xs mb-2">Example: Head at 50, moving up. Queue: 82, 170, 43, 140, 24, 16, 190</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
Order: 50 -> 82 -> 140 -> 170 -> 190 -> 16 -> 24 -> 43
Seek: 32 + 58 + 30 + 20 + 174 + 8 + 19 = 341 cylinders

0    16  24  43   50   82     140    170    190   199
|-----|---|---|---|----|-------|-------|-------|-----|
           ->->->H->->->->->->->|_____|<-<-<-<-
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">Total head movement: <strong>341 cylinders</strong>. Most practical algorithm for general-purpose systems.</p>
              </TabsContent>
            </Tabs>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Algorithm</th>
                    <th className="p-3 text-left">Total Movement*</th>
                    <th className="p-3 text-left">Starvation</th>
                    <th className="p-3 text-left">Fairness</th>
                    <th className="p-3 text-left">Real-World Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">FCFS</td>
                    <td className="p-3">642</td>
                    <td className="p-3">None</td>
                    <td className="p-3">Excellent</td>
                    <td className="p-3">Simple embedded systems</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">SSTF</td>
                    <td className="p-3">208</td>
                    <td className="p-3">Possible</td>
                    <td className="p-3">Poor</td>
                    <td className="p-3">Rarely used standalone</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">SCAN</td>
                    <td className="p-3">260</td>
                    <td className="p-3">None</td>
                    <td className="p-3">Good</td>
                    <td className="p-3">Legacy systems</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">C-SCAN</td>
                    <td className="p-3">391</td>
                    <td className="p-3">None</td>
                    <td className="p-3">Better uniform</td>
                    <td className="p-3">Some Unix variants</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">LOOK</td>
                    <td className="p-3">208</td>
                    <td className="p-3">None</td>
                    <td className="p-3">Good</td>
                    <td className="p-3">Common default</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">C-LOOK</td>
                    <td className="p-3">341</td>
                    <td className="p-3">None</td>
                    <td className="p-3">Best uniform</td>
                    <td className="p-3">Linux CFQ/BFQ, modern OS</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">*Based on the example queue: head at 50, requests at 82, 170, 43, 140, 24, 16, 190</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-400">
              <h4 className="font-semibold text-gray-900 mb-2">Linux I/O Schedulers in Practice</h4>
              <p className="text-sm text-gray-700 mb-3">Modern Linux supports multiple I/O schedulers selectable per block device:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>NOOP:</strong> Simple FIFO, best for SSDs (no seek penalty)</li>
                <li><strong>CFQ (Completely Fair Queuing):</strong> Default for HDDs. Gives each process a fair share of disk time, similar to C-LOOK per process.</li>
                <li><strong>Deadline:</strong> Ensures no request waits longer than a specified time (read: 500ms, write: 5s). Prevents starvation.</li>
                <li><strong>Kyber:</strong> Simple scheduler targeting low latency.</li>
                <li><strong>BFQ (Budget Fair Queuing):</strong> Advanced fairness with low latency for interactive tasks.</li>
              </ul>
              <code className="block mt-3 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check current scheduler for sda
cat /sys/block/sda/queue/scheduler
# Output: noop deadline [cfq]

# Change scheduler to deadline
echo deadline | sudo tee /sys/block/sda/queue/scheduler`}
              </code>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-gray-500" />
              Disk Management and Swap Space
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Disk Formatting</h4>
                <p className="text-sm text-gray-700 mb-2">Before a disk can store files, it must be formatted at multiple levels:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Low-level formatting (Physical):</strong> Divides the disk into sectors with headers, data areas, and trailers (containing ECC codes). This is done at the factory.</li>
                  <li><strong>Partitioning:</strong> Dividing the disk into one or more logical volumes. Each partition appears as a separate disk to the OS. Partition tables include MBR (legacy, 4 primary partitions) and GPT (modern, up to 128 partitions, 9.4 ZB max size).</li>
                  <li><strong>High-level formatting (Logical):</strong> Creating the file system structure: superblock, free space management structures, root directory, and empty data area.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Boot Block and Bad Blocks</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Boot Block:</strong> Most disks have a boot block containing the initial bootstrap program. The system ROM loads this small program, which then loads the full OS kernel.</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Bad Blocks:</strong> Sectors that are physically damaged and cannot reliably store data. Modern drives handle bad blocks transparently through sector sparing: the controller maintains a pool of spare sectors and remaps LBA references to good sectors.</p>
                <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check for bad sectors on Linux (read-only)
badblocks -v /dev/sda

# Check SMART status for reallocated sectors
smartctl -a /dev/sda | grep Reallocated`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Swap-Space Management</h4>
              <p className="text-gray-700 mb-3">
                Swap space is disk space used when physical RAM is full. The OS moves inactive pages from memory to swap (page out) and brings them back when needed (page in). Because disk access is orders of magnitude slower than RAM, excessive swapping (&quot;thrashing&quot;) destroys performance.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-gray-300">
                  <p className="font-semibold text-sm text-gray-800">Swap-Space Allocation Strategies</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li><strong>Swap partition:</strong> Dedicated disk partition. Faster because no file system overhead.</li>
                    <li><strong>Swap file:</strong> A regular file on an existing file system. More flexible but slightly slower due to FS indirection.</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded border border-gray-300">
                  <p className="font-semibold text-sm text-gray-800">Swap Performance Considerations</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>Place swap on the fastest disk</li>
                    <li>Use multiple swap spaces on different disks for RAID-0-like striping</li>
                    <li>SSD swap is much faster than HDD but causes wear</li>
                    <li>Use swappiness parameter to tune OS tendency to swap</li>
                  </ul>
                </div>
              </div>
              <code className="block mt-4 p-3 bg-slate-900 rounded text-gray-300 text-xs">
{`# View swap usage
swapon --show
free -h

# Adjust swappiness (0-100, lower = less swapping)
cat /proc/sys/vm/swappiness
sudo sysctl vm.swappiness=10

# Add a swap file
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile`}
              </code>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-gray-500" />
              RAID: Redundant Array of Independent Disks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              RAID combines multiple physical disk drives into a single logical unit to improve performance, capacity, or reliability (fault tolerance). RAID can be implemented in hardware (dedicated RAID controller) or software (OS-level, like Linux mdadm or ZFS).
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">RAID 0 - Striping</h4>
                <p className="text-sm text-gray-700 mt-1">Data is split across multiple disks. No redundancy. If one disk fails, all data is lost.</p>
                <p className="text-xs text-gray-500 mt-2">Capacity: N * min(disk_size) | Fault Tolerance: 0 disks | Read/Write: Nx improvement</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">RAID 1 - Mirroring</h4>
                <p className="text-sm text-gray-700 mt-1">Identical data written to two or more disks. Excellent read performance, fault tolerance.</p>
                <p className="text-xs text-gray-500 mt-2">Capacity: min(disk_size) | Fault Tolerance: N-1 disks | Read: Nx, Write: 1x</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">RAID 2 - Bit-level Hamming Code</h4>
                <p className="text-sm text-gray-700 mt-1">Stripes data at bit level with Hamming code error correction. Requires synchronized disks. Rarely used today.</p>
                <p className="text-xs text-gray-500 mt-2">Capacity: varies | Fault Tolerance: 1 disk | Historical interest only</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">RAID 3 - Byte-level Parity</h4>
                <p className="text-sm text-gray-700 mt-1">Stripes data at byte level with a dedicated parity disk. Good for sequential access but poor for random I/O due to parity disk bottleneck.</p>
                <p className="text-xs text-gray-500 mt-2">Capacity: (N-1) * disk_size | Fault Tolerance: 1 disk | Parity disk bottleneck</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">RAID 4 - Block-level Parity</h4>
                <p className="text-sm text-gray-700 mt-1">Stripes at block level with a dedicated parity disk. Better random read than RAID 3, but write parity still bottlenecked on one disk.</p>
                <p className="text-xs text-gray-500 mt-2">Capacity: (N-1) * disk_size | Fault Tolerance: 1 disk | Write bottleneck</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">RAID 5 - Distributed Parity</h4>
                <p className="text-sm text-gray-700 mt-1">Block-level striping with parity distributed across all disks. Most popular balanced RAID. Good read performance, slower writes due to parity calculation.</p>
                <p className="text-xs text-gray-500 mt-2">Capacity: (N-1) * disk_size | Fault Tolerance: 1 disk | Best cost/performance balance</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">RAID 6 - Double Distributed Parity</h4>
                <p className="text-sm text-gray-700 mt-1">Like RAID 5 but with two independent parity schemes. Can survive two simultaneous disk failures. Used for large arrays where rebuild time increases failure probability.</p>
                <p className="text-xs text-gray-500 mt-2">Capacity: (N-2) * disk_size | Fault Tolerance: 2 disks | Higher write overhead</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">RAID 10 (1+0) - Mirrored Stripes</h4>
                <p className="text-sm text-gray-700 mt-1">Stripes across mirrored pairs. Combines speed of RAID 0 with redundancy of RAID 1. Can survive multiple disk failures if they are in different mirrors.</p>
                <p className="text-xs text-gray-500 mt-2">Capacity: N/2 * disk_size | Fault Tolerance: 1+ disks (per mirror) | Excellent performance</p>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">RAID Level Diagrams</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
RAID 0 (Striping)          RAID 1 (Mirroring)         RAID 5 (Distributed Parity)
Disk0  Disk1               Disk0  Disk1               Disk0  Disk1  Disk2  Disk3
+---+  +---+               +---+  +---+               +---+  +---+  +---+  +---+
| A1|  | A2|               | A1|  | A1|               | A1|  | A2|  | A3|  | P1|
+---+  +---+               +---+  +---+               +---+  +---+  +---+  +---+
| B1|  | B2|               | B1|  | B1|               | B2|  | B3|  | P2|  | B1|
+---+  +---+               +---+  +---+               +---+  +---+  +---+  +---+
| C1|  | C2|               | C1|  | C1|               | C3|  | P3|  | C1|  | C2|
+---+  +---+               +---+  +---+               +---+  +---+  +---+  +---+
`}
              </pre>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Level</th>
                    <th className="p-3 text-left">Min Disks</th>
                    <th className="p-3 text-left">Capacity</th>
                    <th className="p-3 text-left">Fault Tolerance</th>
                    <th className="p-3 text-left">Read Perf</th>
                    <th className="p-3 text-left">Write Perf</th>
                    <th className="p-3 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3 font-medium">RAID 0</td><td className="p-3">2</td><td className="p-3">100%</td><td className="p-3">None</td><td className="p-3">N * single</td><td className="p-3">N * single</td><td className="p-3">Temp data, speed</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">RAID 1</td><td className="p-3">2</td><td className="p-3">50%</td><td className="p-3">N-1</td><td className="p-3">N * single</td><td className="p-3">1 * single</td><td className="p-3">OS drives, critical small data</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">RAID 5</td><td className="p-3">3</td><td className="p-3">(N-1)/N</td><td className="p-3">1</td><td className="p-3">(N-1) * single</td><td className="p-3">~0.25 * N (read-modify-write)</td><td className="p-3">General file servers</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">RAID 6</td><td className="p-3">4</td><td className="p-3">(N-2)/N</td><td className="p-3">2</td><td className="p-3">(N-2) * single</td><td className="p-3">Lower than RAID 5</td><td className="p-3">Large arrays, archives</td></tr>
                  <tr><td className="p-3 font-medium">RAID 10</td><td className="p-3">4</td><td className="p-3">50%</td><td className="p-3">1 per mirror</td><td className="p-3">N * single</td><td className="p-3">N/2 * single</td><td className="p-3">Databases, high-transaction systems</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-400">
              <h4 className="font-semibold text-gray-900 mb-2">RAID Write Penalty Explained</h4>
              <p className="text-sm text-gray-700 mb-2">
                Every random write to RAID 5 or 6 requires reading old data and old parity, calculating new parity, then writing new data and new parity. This is the <strong>read-modify-write</strong> penalty:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>RAID 5:</strong> 1 read (old data) + 1 read (old parity) + 1 write (new data) + 1 write (new parity) = 4 I/O operations per write. Write penalty = 4.</li>
                <li><strong>RAID 6:</strong> 2 reads (old data, two old parities) + 2 writes (new data, two new parities) = 6 I/O operations. Write penalty = 6.</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">This is why databases on RAID 5/6 can have poor write performance compared to RAID 10.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-6 h-6 text-gray-500" />
              Solid-State Drives (SSD) Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Unlike HDDs, SSDs have no moving parts. They store data in flash memory chips, providing much faster random access, lower latency, and higher resistance to physical shock. However, they introduce new challenges: finite write endurance, erase-before-write requirements, and complex controller logic.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">NAND Flash Memory</h4>
                <p className="text-sm text-gray-700 mb-2">SSDs use NAND flash memory, organized hierarchically:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Cell:</strong> Stores 1 bit (SLC), 2 bits (MLC), 3 bits (TLC), or 4 bits (QLC). More bits per cell = higher density but lower endurance and slower speeds.</li>
                  <li><strong>Page:</strong> The smallest unit that can be read or written, typically 4KB to 16KB.</li>
                  <li><strong>Block:</strong> The smallest unit that can be erased, typically 128 to 256 pages. You cannot overwrite a page without erasing the entire block.</li>
                  <li><strong>Plane / Die / Chip:</strong> Multiple blocks form a plane, multiple planes form a die, and multiple dies form the flash package.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">SSD Controller Functions</h4>
                <p className="text-sm text-gray-700 mb-2">The SSD controller is a small computer that manages the flash:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Wear Leveling:</strong> Distributes writes evenly across all blocks to maximize lifespan.</li>
                  <li><strong>Bad Block Management:</strong> Maintains a pool of spare blocks to replace worn-out ones.</li>
                  <li><strong>Garbage Collection:</strong> Copies valid pages from old blocks into new blocks so old blocks can be erased and reused.</li>
                  <li><strong>DRAM Cache:</strong> Stores the mapping table (LBA to physical flash address) for fast lookups.</li>
                  <li><strong>Error Correction (ECC):</strong> Advanced LDPC codes to correct bit errors as cells wear out.</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">NAND Flash Organization</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
Flash Chip
├── Die 0
│   ├── Plane 0
│   │   ├── Block 0  [Page 0][Page 1]...[Page 255]
│   │   ├── Block 1  [Page 0][Page 1]...[Page 255]
│   │   └── ...
│   └── Plane 1
│       ├── Block 0
│       └── ...
└── Die 1
    └── ...

Operations:
  Read:  Per page (~25-100 microseconds)
  Write: Per page (~200-2000 microseconds), must be to erased page
  Erase: Per block (~1-3 milliseconds)
`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">SSD vs HDD Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Characteristic</th>
                      <th className="p-3 text-left">HDD</th>
                      <th className="p-3 text-left">SSD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-3 font-medium">Random Read Latency</td><td className="p-3">5-10 ms</td><td className="p-3">0.025-0.1 ms</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Random IOPS</td><td className="p-3">~100</td><td className="p-3">10,000-1,000,000+</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Sequential Throughput</td><td className="p-3">100-250 MB/s</td><td className="p-3">500-7,000+ MB/s</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Power Consumption</td><td className="p-3">6-15W</td><td className="p-3">2-5W</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Noise / Vibration</td><td className="p-3">Yes</td><td className="p-3">Silent</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Endurance</td><td className="p-3">Unlimited writes</td><td className="p-3">Finite (TBW rating)</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Cost per GB</td><td className="p-3">Lower</td><td className="p-3">Higher (decreasing)</td></tr>
                    <tr><td className="p-3 font-medium">Data Recovery</td><td className="p-3">Often possible</td><td className="p-3">Very difficult if controller fails</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-400">
              <h4 className="font-semibold text-gray-900 mb-2">The TRIM Command</h4>
              <p className="text-sm text-gray-700 mb-2">
                Because SSDs cannot overwrite pages directly, the controller needs to know which blocks are no longer in use by the file system. The <strong>TRIM</strong> command allows the OS to inform the SSD that certain LBAs are deleted, so the SSD can proactively erase those blocks during idle time.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Without TRIM:</strong> The SSD thinks all previously written pages are valid. When the OS writes to a &quot;free&quot; block, the SSD may need to read the entire block, merge valid pages, erase, and rewrite - causing write amplification.</li>
                <li><strong>With TRIM:</strong> The SSD marks trimmed pages as invalid. Garbage collection can erase blocks without copying invalid pages, improving performance and endurance.</li>
              </ul>
              <code className="block mt-3 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check if TRIM is enabled on Linux
sudo systemctl status fstrim.timer
lsblk --discard

# Manual TRIM
sudo fstrim -av /`}
              </code>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Terminal className="w-6 h-6 text-gray-400" />
              Real-World Backend Engineering Scenarios
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
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 1: Database Disk Layout Optimization</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Databases like PostgreSQL and MySQL are highly sensitive to disk layout. Separate data files, WAL (write-ahead log), and indexes onto different physical disks or RAID arrays.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# PostgreSQL directory layout recommendation
/pgdata        -> RAID 10 (random read/write workload)
/pgwal         -> RAID 1 or dedicated SSD (sequential write)
/pgarchive     -> RAID 5/6 (cold storage)

# In postgresql.conf:
# data_directory = '/pgdata'
# wal_level = replica
# max_wal_size = 4GB`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 2: SAN vs NAS in the Enterprise</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Backend architects must choose between SAN (Storage Area Network) and NAS (Network Attached Storage).
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-gray-300">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="p-2 text-left">Feature</th>
                          <th className="p-2 text-left">SAN (iSCSI/FC)</th>
                          <th className="p-2 text-left">NAS (NFS/SMB)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-700"><td className="p-2">Protocol</td><td className="p-2">Block-level (looks like local disk)</td><td className="p-2">File-level</td></tr>
                        <tr className="border-b border-gray-700"><td className="p-2">Performance</td><td className="p-2">Higher, lower latency</td><td className="p-2">Lower overhead for shared files</td></tr>
                        <tr className="border-b border-gray-700"><td className="p-2">Use Case</td><td className="p-2">Databases, VMs</td><td className="p-2">File sharing, backups</td></tr>
                        <tr><td className="p-2">Examples</td><td className="p-2">EMC VMAX, NetApp FAS (block)</td><td className="p-2">NetApp, AWS EFS</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 3: Cloud Storage Selection (AWS)</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    AWS offers multiple block and object storage options with different performance profiles:
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li><strong>EBS gp3:</strong> General purpose SSD, 3,000 IOPS baseline, good for boot volumes and databases.</li>
                    <li><strong>EBS io2:</strong> Provisioned IOPS SSD, up to 256,000 IOPS, for mission-critical workloads.</li>
                    <li><strong>Instance Store:</strong> Physically attached SSD/NVMe, ephemeral but highest performance.</li>
                    <li><strong>S3:</strong> Object storage, 11 9s durability, for backups, archives, and static assets.</li>
                  </ul>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 4: Disk Benchmarking with fio and iostat</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Accurate disk benchmarking requires tools that can simulate real workloads.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# fio: Random read benchmark (4KB)
fio --name=randread --ioengine=libaio --iodepth=32 \
    --rw=randread --bs=4k --direct=1 --size=4G \
    --numjobs=4 --runtime=60 --group_reporting

# fio: Sequential write benchmark
fio --name=seqwrite --rw=write --bs=1M --size=4G \
    --direct=1 --numjobs=1 --ioengine=libaio

# iostat: Monitor live disk stats
iostat -x 1
# Focus on %util (should stay < 80% for healthy latency)
# and await (average wait time in ms)`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 5: Detecting and Replacing a Failing Drive</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Monitoring SMART data is critical for predicting drive failures before they cause data loss.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Install smartmontools and check health
sudo smartctl -H /dev/sda
sudo smartctl -a /dev/sda | grep -E "Reallocated|Pending|Uncorrectable"

# Key indicators of failure:
# Reallocated_Sector_Ct > 0
# Current_Pending_Sector > 10
# Offline_Uncorrectable > 0

# If using software RAID (mdadm), check array status
cat /proc/mdstat
mdadm --detail /dev/md0`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 6: SSD Endurance Planning</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Enterprise SSDs are rated by DWPD (Drive Writes Per Day) or TBW (Total Bytes Written).
                  </p>
                  <div className="bg-slate-900 p-3 rounded text-xs text-gray-300 font-mono">
{`Required DWPD = (Daily Write Volume) / (SSD Capacity)

Example:
- Database writes 500 GB/day
- SSD capacity = 1 TB
- Required DWPD = 500 / 1000 = 0.5 DWPD

A consumer SSD (0.3 DWPD) might not last long enough.
An enterprise read-intensive SSD (1 DWPD) is suitable.
A write-intensive SSD (3-10 DWPD) provides significant headroom.`}
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-6 h-6 text-gray-500" />
              Next-Generation Storage Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Storage Class Memory and CXL.mem</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Storage Class Memory (SCM) such as Intel Optane sits between DRAM and NAND SSDs in the latency hierarchy. It is byte-addressable like DRAM but persistent like flash. Although Intel exited the consumer Optane market, enterprise SCM and CXL.mem (Compute Express Link) are redefining memory-centric storage.
                </p>
                <p className="text-sm text-gray-700">
                  CXL.mem allows hosts to cache-attached memory devices over PCIe, enabling memory pooling and tiering across a datacenter rack. A server can dynamically allocate memory from a CXL memory pool without physical DIMM installation.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# Typical latency hierarchy
DRAM:        ~100 ns
CXL.mem:     ~200-400 ns
Optane SCM:  ~1-3 us
NVMe SSD:    ~25-100 us
HDD:         ~5-10 ms`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">NVMe over Fabrics and Computational Storage</h4>
                <p className="text-sm text-gray-700 mb-2">
                  NVMe-oF extends the NVMe protocol over networks (RDMA, RoCE, TCP), allowing remote SSDs to appear as local block devices. This enables disaggregated storage where compute and storage scale independently.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Computational Storage Drives (CSDs)</strong> embed processing units (FPGAs or ARM cores) inside the SSD. They can run filters, compression, or encryption near the data, reducing host CPU load and network traffic.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# NVMe-oF target configuration (SPDK)
./nvmf_create_transport -t RDMA
./nvmf_subsystem_create nqn.2016-06.io.spdk:cnode1
./nvmf_subsystem_add_ns nqn.2016-06.io.spdk:cnode1 Nvme0n1

# Connect initiator
nvme connect -t rdma -n nqn.2016-06.io.spdk:cnode1 -a 192.168.1.10 -s 4420`}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Zoned Namespace (ZNS) SSDs</h4>
                <p className="text-sm text-gray-700 mb-2">
                  ZNS exposes the SSD's internal erase-block structure to the host. Storage is divided into zones that must be written sequentially and reset (erased) as a unit. This eliminates the SSD's internal garbage collection overhead.
                </p>
                <p className="text-sm text-gray-700">
                  ZNS is ideal for write-optimized databases like RocksDB. The host can align LSM-tree compactions with zone resets, reducing write amplification and improving latency predictability.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# Zone states: EMPTY, OPEN, CLOSED, FULL, READONLY, OFFLINE
# Write pointer advances sequentially within a zone
# Reset zone command clears all data

# List zones with nvme-cli
nvme zns list-ns /dev/nvme0n1
nvme zns report-zones /dev/nvme0n1`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">SMR: Shingled Magnetic Recording</h4>
                <p className="text-sm text-gray-700 mb-2">
                  SMR HDDs overlap tracks like roof shingles, increasing areal density but requiring sequential writes within zones. Random writes trigger expensive read-modify-write operations because modifying one track corrupts overlapping adjacent tracks.
                </p>
                <p className="text-sm text-gray-700">
                  Host-managed SMR (HM-SMR) pushes zone management to the filesystem or application. Drive-managed SMR (DM-SMR) hides the complexity but can exhibit unpredictable latency spikes.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# SMR zone layout
Zone 0: [Track 0][Track 1][Track 2] ... (sequential writes only)
Zone 1: [Track N][Track N+1] ...

# Filesystems supporting HM-SMR
# btrfs, F2FS, ext4 (with zoned block device support)`}
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
              <Database className="w-6 h-6 text-gray-500" />
              Distributed and Object Storage Engineering
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Object Storage Internals</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Object stores like S3, Ceph RADOS, and MinIO distribute data across thousands of disks. They use <strong>consistent hashing</strong> to map objects to storage nodes. When a node is added or removed, only 1/N of objects need to move.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Erasure coding</strong> replaces RAID in large-scale object storage. A (k,m) code splits an object into k data chunks and m parity chunks. Any k chunks can reconstruct the object. This provides better durability with lower storage overhead than replication.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# Reed-Solomon erasure coding example
# 4+2 EC: 4 data chunks + 2 parity chunks
# Storage overhead = 6/4 = 1.5x (vs 3x for 3-way replication)
# Can tolerate any 2 failures

# Ceph commands
ceph osd pool set mypool erasure_code_profile default
ceph osd pool set mypool size 1  # EC handles redundancy`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Distributed Consensus in Storage</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Distributed storage systems need consensus for metadata and configuration. <strong>Raft</strong> is the most widely adopted consensus algorithm, used in etcd (Kubernetes backing store), TiKV, and Ceph's MON daemons.
                </p>
                <p className="text-sm text-gray-700">
                  Raft elects a leader for a term. All writes go through the leader, which replicates log entries to followers. A commit requires a majority quorum (N/2+1). This ensures safety even during network partitions.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# Raft log replication flow
Client -> Leader -> AppendEntries -> Followers
Followers ack -> Leader commits -> Client receives success

# etcd cluster: 3 nodes = tolerates 1 failure
# 5 nodes = tolerates 2 failures
# Recommended: odd number of nodes (3 or 5)`}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Ceph Architecture</h4>
              <p className="text-sm text-gray-700 mb-3">
                Ceph is a unified distributed storage system providing object, block, and file interfaces. It uses CRUSH (Controlled Replication Under Scalable Hashing) instead of a central lookup table to place objects deterministically.
              </p>
              <div className="bg-gray-900 p-3 rounded text-gray-300 text-xs font-mono">
{`# Ceph components
MON:  Monitors - maintain cluster map and state (Raft consensus)
OSD:  Object Storage Daemons - store data on local disks
MDS:  Metadata Servers - manage POSIX file metadata (CephFS)
RGW:  RADOS Gateway - S3/Swift object API
Mgr:  Managers - expose metrics and orchestration

# Data path: Client -> CRUSH -> OSD (no central bottleneck)`}
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Storage Technology Selection Matrix</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
Workload                    | Recommended Technology
----------------------------|-------------------------------------------
Low-latency DB (OLTP)       | NVMe SSD, RAID-10, CXL.mem tiering
Analytics / Data Lake       | ZNS SSD, SMR HDD, Erasure Coded object store
Container / VM boot         | NVMe-oF, EBS gp3, distributed block (Ceph RBD)
Archive / Cold storage      | SMR HDD, tape, EC object store (S3 Glacier)
High-throughput streaming   | NVMe SSD, log-structured filesystem
`}
              </pre>
            </div>
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
                "HDD performance is dominated by seek time and rotational latency, not transfer rate",
                "Disk scheduling algorithms (LOOK, C-LOOK) significantly reduce average access time",
                "RAID provides performance, capacity, and/or redundancy tradeoffs; RAID 10 is preferred for databases",
                "SSDs eliminate mechanical delays but require wear leveling, garbage collection, and TRIM support",
                "Swap space is essential for virtual memory but excessive swapping causes severe performance degradation",
                "Cloud storage choices (EBS gp3 vs io2 vs S3) depend heavily on workload I/O patterns",
                "Always monitor disk health via SMART and benchmark with tools like fio before production deployment"
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
