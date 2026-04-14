import { motion } from 'framer-motion';
import { 
  Activity, HardDrive, Layers, CheckCircle,
  Terminal, Server, Database, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter13() {
  return (
    <div className="space-y-8">
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 13</Badge>
        <h1 className="text-4xl font-bold text-gray-900">I/O Systems</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive deep dive into I/O hardware, interfaces, kernel subsystems, and performance optimization
        </p>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-6 h-6 text-gray-500" />
              I/O Hardware Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              I/O devices vary enormously in function and speed. They communicate with the CPU through ports, buses, and device controllers. Understanding the hardware architecture is essential for optimizing system performance and writing efficient device drivers.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Device Categories</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Block devices:</strong> Disk, SSD, USB drives. Transfer data in fixed-size blocks. Support seek operations. Examples: NVMe SSDs, SATA HDDs.</li>
                  <li><strong>Character devices:</strong> Keyboards, mice, serial ports. Transfer data as a stream of bytes. No seek support. Examples: /dev/tty, /dev/null.</li>
                  <li><strong>Network devices:</strong> Ethernet, WiFi, InfiniBand. Transfer packets rather than byte streams or blocks. Examples: eth0, wlan0.</li>
                  <li><strong>Special devices:</strong> Clocks, timers, random number generators. Provide system-wide services. Examples: /dev/rtc, /dev/urandom.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Device Controller</h4>
                <p className="text-sm text-gray-700 mb-2">
                  The electronics that operate the physical device and interface with the system bus. A controller typically has:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Control registers for CPU communication</li>
                  <li>• A local buffer for staging data transfers</li>
                  <li>• Device-specific protocol handling logic</li>
                  <li>• DMA engine (in modern controllers)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">System Bus Hierarchy</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Bus Type</th>
                      <th className="p-3 text-left">Bandwidth (typical)</th>
                      <th className="p-3 text-left">Latency</th>
                      <th className="p-3 text-left">Common Uses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">PCIe 4.0 x16</td>
                      <td className="p-3">~64 GB/s</td>
                      <td className="p-3">~1 μs</td>
                      <td className="p-3">GPUs, NVMe SSDs, high-speed NICs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">PCIe 3.0 x4</td>
                      <td className="p-3">~4 GB/s</td>
                      <td className="p-3">~1-2 μs</td>
                      <td className="p-3">NVMe SSDs, 10GbE NICs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">SATA III</td>
                      <td className="p-3">~600 MB/s</td>
                      <td className="p-3">~50-100 μs</td>
                      <td className="p-3">HDDs, SATA SSDs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">USB 3.2 Gen 2x2</td>
                      <td className="p-3">~2.5 GB/s</td>
                      <td className="p-3">~10-100 μs</td>
                      <td className="p-3">External storage, peripherals</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">SAS-4</td>
                      <td className="p-3">~2.4 GB/s</td>
                      <td className="p-3">~50-100 μs</td>
                      <td className="p-3">Enterprise HDDs/SSDs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">I/O Hardware Organization</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
    +---------------------------------------------------------+
    |                         CPU                             |
    |  +--------+    +--------+    +-----------------------+  |
    |  | Core 0 |    | Core 1 |    |    Memory Controller  |  |
    |  +----+---+    +----+---+    +-----------+-----------+  |
    |       |             |                    |              |
    +-------|-------------|--------------------|--------------+
            |             |                    |
    +-------|-------------|--------------------|--------------+
    |       |             |                    |              |
    |  +----v----+   +----v----+          +----v----+         |
    |  |  L1/L2  |   |  L1/L2  |          |  DRAM   |         |
    |  |  Cache  |   |  Cache  |          | Memory  |         |
    |  +----+----+   +----+----+          +----+----+         |
    |       |             |                    |              |
    |       +-------------+--------------------+              |
    |                     |                                   |
    |              +------v-------+                           |
    |              |     Bus      |                           |
    |              |  (PCIe, etc) |                           |
    |              +------+-------+                           |
    |                     |                                   |
    |     +---------------+---------------+                   |
    |     |               |               |                   |
    |  +--v----+     +---v---+      +----v----+              |
    |  |  GPU  |     |  NVMe |      |  NIC    |              |
    |  |Ctrl   |     | Ctrl  |      | Ctrl    |              |
    |  +-------+     +-------+      +---------+              |
    +---------------------------------------------------------+
`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-gray-500" />
              I/O Techniques: Polling, Interrupts, and DMA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                <h4 className="font-semibold text-gray-900">Programmed I/O (Polling)</h4>
                <p className="text-sm text-gray-700 mt-2">
                  The CPU repeatedly checks the device status register until the device is ready. The CPU then transfers data one word at a time.
                </p>
                <div className="mt-3 bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono">
{`while (status != READY);
write_data(word);
while (status != READY);
write_data(word);`}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Overhead:</strong> High CPU utilization. One status check per word.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                <h4 className="font-semibold text-gray-900">Interrupt-Driven I/O</h4>
                <p className="text-sm text-gray-700 mt-2">
                  The CPU issues a command and continues with other work. The device interrupts the CPU when it is ready, and the CPU then transfers the data.
                </p>
                <div className="mt-3 bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono">
{`issue_command(READ);
// CPU does other work
// ...
// Interrupt handler:
transfer_word();
acknowledge_interrupt();`}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Overhead:</strong> Context switch per word/transfer. Better than polling.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                <h4 className="font-semibold text-gray-900">DMA (Direct Memory Access)</h4>
                <p className="text-sm text-gray-700 mt-2">
                  A DMA controller handles the entire data transfer between device and memory, interrupting the CPU only when the entire block is done.
                </p>
                <div className="mt-3 bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono">
{`// CPU programs DMA controller
set_dma_source(device_buffer);
set_dma_dest(memory_addr);
set_dma_count(bytes);
start_dma();
// Interrupt only when done`}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Overhead:</strong> Minimal CPU involvement. One interrupt per block.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Mathematical Analysis: CPU Cycles per Transfer</h4>
              <p className="text-sm text-gray-700 mb-3">
                For transferring N words of data, the approximate CPU overhead is:
              </p>
              <div className="bg-gray-900 p-3 rounded text-gray-300 text-sm font-mono space-y-2">
                <div>Polling: C_poll = N * (status_check_cycles + transfer_cycles)</div>
                <div>Interrupt: C_int = N * (interrupt_overhead + transfer_cycles)</div>
                <div>DMA: C_dma = block_setup_cycles + 1 * interrupt_overhead</div>
              </div>
              <p className="text-sm text-gray-700 mt-3">
                If status_check_cycles = 10, transfer_cycles = 20, interrupt_overhead = 1000, block_setup = 200, and N = 4096 words:
              </p>
              <ul className="text-sm text-gray-700 mt-2 space-y-1">
                <li>Polling: 4096 * 30 = 122,880 cycles</li>
                <li>Interrupt: 4096 * 1020 = 4,177,920 cycles</li>
                <li>DMA: 200 + 1000 = 1,200 cycles</li>
              </ul>
              <p className="text-sm text-gray-700 mt-2">
                DMA reduces CPU overhead by over 99% for large transfers.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">DMA Operation Step-by-Step</h4>
              <ol className="text-sm text-gray-700 space-y-2">
                <li><strong>1. CPU programs DMA controller:</strong> Sets source address, destination address, transfer count, and direction (read/write) into DMA registers.</li>
                <li><strong>2. DMA requests bus:</strong> When device is ready, DMA controller asserts a bus request (BR) signal to the CPU.</li>
                <li><strong>3. CPU grants bus:</strong> CPU completes current bus cycle, asserts bus grant (BG), and floats its bus lines.</li>
                <li><strong>4. DMA transfers data:</strong> DMA controller drives address and control lines, transferring one word per bus cycle directly between device and memory.</li>
                <li><strong>5. DMA releases bus:</strong> After each word (or burst), DMA may release the bus if other devices need it (cycle stealing).</li>
                <li><strong>6. Completion interrupt:</strong> When the transfer count reaches zero, DMA asserts an interrupt to inform the CPU.</li>
              </ol>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">DMA Cycle Stealing Timing Diagram</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
CPU:  | Exec | Exec | Wait | Exec | Exec | Wait | Exec |
Bus:  | CPU  | CPU  | DMA  | CPU  | CPU  | DMA  | CPU  |
                   ^                    ^
                   |                    |
              DMA steals            DMA steals
              1 cycle               1 cycle
`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-gray-500" />
              I/O Application Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              The OS provides a uniform interface to hide the differences among I/O devices. Applications interact with devices through well-defined abstractions.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Block and Character Devices</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Block devices present a structured interface of fixed-size blocks (typically 512 bytes or 4096 bytes). Character devices present an unstructured byte stream.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`// Block device interface (Linux)
int fd = open("/dev/sda1", O_RDWR);
lseek(fd, 4096, SEEK_SET);  // seek to block
read(fd, buffer, 4096);     // read one block

// Character device interface
int fd = open("/dev/tty0", O_RDWR);
read(fd, buffer, n);        // read n bytes
// No seek support`}
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Memory-Mapped I/O</h4>
                <p className="text-sm text-gray-700 mb-2">
                  A portion of the device controller's registers or buffer is mapped into the process's address space. The CPU reads and writes to device registers using standard memory access instructions.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`// Map device registers into memory
volatile uint32_t *regs = mmap(
    NULL, 4096, PROT_READ | PROT_WRITE,
    MAP_SHARED, fd, 0);

// Write to control register
regs[CONTROL_REG] = 0x1;

// Read status register
uint32_t status = regs[STATUS_REG];`}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">I/O Models Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Model</th>
                      <th className="p-3 text-left">Behavior</th>
                      <th className="p-3 text-left">CPU Usage During I/O</th>
                      <th className="p-3 text-left">Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Blocking</td>
                      <td className="p-3">Process suspended until I/O completes</td>
                      <td className="p-3">Zero (process waits)</td>
                      <td className="p-3">Simple</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Nonblocking</td>
                      <td className="p-3">I/O returns immediately with available data</td>
                      <td className="p-3">High (polling loop)</td>
                      <td className="p-3">Moderate</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Asynchronous</td>
                      <td className="p-3">I/O initiated, process continues, notification on completion</td>
                      <td className="p-3">Low (interrupt-driven)</td>
                      <td className="p-3">Complex</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Memory-mapped</td>
                      <td className="p-3">File accessed via memory loads/stores</td>
                      <td className="p-3">Varies (page fault overhead)</td>
                      <td className="p-3">Moderate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Clocks and Timers</h4>
              <p className="text-sm text-gray-700 mb-3">
                Hardware clocks and timers provide several critical functions: maintaining the time of day, preventing processes from monopolizing the CPU, and implementing timers for delays and periodic execution.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">Programmable Interval Timer (PIT)</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Generates periodic interrupts (e.g., 1000 Hz) for scheduling. The OS scheduler runs on each tick.
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">High-Resolution Timers (HPET)</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Provides microsecond or nanosecond precision. Used for profiling, network timeouts, and real-time applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Asynchronous I/O Flow</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
Application              Kernel                Device
     |                      |                     |
     |-- aio_read() ------->|                     |
     |                      |-- submit request -->|
     |<-- returns immediately |                     |
     |                      |                     |
     | (continues execution)|                     |
     |                      |                     |
     |                      |<-- interrupt -------|
     |                      | (I/O complete)      |
     |<-- signal/callback --|                     |
     |                      |                     |
`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-6 h-6 text-gray-500" />
              Kernel I/O Subsystem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              The kernel I/O subsystem provides services that bridge the gap between the hardware and the application I/O interface. These services include scheduling, buffering, caching, spooling, device reservation, and error handling.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">I/O Scheduling</h4>
                <p className="text-sm text-gray-700 mb-2">
                  The kernel maintains a queue of I/O requests per device and schedules them to improve overall system performance and fairness.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>FCFS (First-Come, First-Served):</strong> Simple but can result in poor performance for disk I/O.</li>
                  <li>• <strong>SSTF (Shortest Seek Time First):</strong> Minimizes head movement on disks. Can cause starvation.</li>
                  <li>• <strong>SCAN (Elevator):</strong> Disk arm moves back and forth across the disk, serving requests along the way.</li>
                  <li>• <strong>C-SCAN:</strong> Only services requests while moving in one direction, providing more uniform wait times.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Buffering</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Data stored in memory while being transferred between two devices or between a device and an application.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Single buffering:</strong> One buffer in memory. Producer and consumer must synchronize.</li>
                  <li>• <strong>Double buffering:</strong> Two buffers. Device fills one while CPU empties the other.</li>
                  <li>• <strong>Circular buffering:</strong> Multiple buffers arranged in a ring. Smooths out bursts.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Caching</h4>
                <p className="text-sm text-gray-700 mb-2">
                  A cache is a region of fast memory that holds copies of data. When a read request arrives, the kernel can satisfy it from the cache if the data is present.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono">
{`read(file, buf, 4096);
// Kernel checks page cache
if (data_in_page_cache) {
    memcpy(buf, cache_page, 4096);
} else {
    // Issue I/O to device
    // Store result in page cache
}`}
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Spooling and Device Reservation</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Spooling holds output for a device that can only serve one request at a time, like a printer. The kernel writes output to a disk buffer, and a separate daemon sends it to the device.
                </p>
                <p className="text-sm text-gray-700">
                  Device reservation allows processes to gain exclusive access to a device, preventing interleaving of I/O streams from different processes.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Error Handling</h4>
              <p className="text-sm text-gray-700 mb-3">
                The kernel I/O subsystem must handle a wide variety of device errors gracefully:
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">Transient Errors</p>
                  <p className="text-xs text-gray-600 mt-1">Temporary failures (e.g., network timeout, read error). Strategy: retry with exponential backoff.</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">Persistent Errors</p>
                  <p className="text-xs text-gray-600 mt-1">Hardware failure or bad sector. Strategy: report to application, remap sector, or fail the device.</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">Parity/CRC Errors</p>
                  <p className="text-xs text-gray-600 mt-1">Data corruption detected during transfer. Strategy: retry transfer; if unrecoverable, report error.</p>
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
              Transforming I/O Requests to Hardware Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              When an application issues an I/O request, the kernel must translate that high-level request into a sequence of low-level device operations.
            </p>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">The I/O Request Path</h4>
              <ol className="text-sm text-gray-700 space-y-2">
                <li><strong>1. System call:</strong> Application calls read(), write(), or open(). Trap to kernel mode.</li>
                <li><strong>2. File system layer:</strong> Translate file name and offset to logical block number via inode/directory structures.</li>
                <li><strong>3. Volume manager / RAID:</strong> Map logical block to physical block(s) on underlying devices.</li>
                <li><strong>4. Generic block layer:</strong> Create a bio (block I/O) structure describing the operation.</li>
                <li><strong>5. I/O scheduler:</strong> Queue and merge requests to optimize device access patterns.</li>
                <li><strong>6. Device driver:</strong> Convert generic request to device-specific commands (e.g., SCSI CDB, NVMe SQE).</li>
                <li><strong>7. Device controller:</strong> Execute command on hardware, using DMA for data transfer.</li>
                <li><strong>8. Interrupt handler:</strong> On completion, driver interrupt handler marks request complete and wakes waiting processes.</li>
              </ol>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">I/O Stack Layers (Linux)</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
+--------------------------+
|  User Application        |
|  (read/write/mmap)       |
+--------------------------+
|  System Call Interface   |
+--------------------------+
|  VFS (Virtual File Sys)  |
|  (generic file ops)      |
+--------------------------+
|  File System (ext4/xfs)  |
|  (inodes, block mapping) |
+--------------------------+
|  Page Cache / Buffer     |
|  Cache                   |
+--------------------------+
|  Block I/O Layer         |
|  (bio, request struct)   |
+--------------------------+
|  I/O Scheduler           |
|  (mq-deadline, kyber)    |
+--------------------------+
|  Device Driver           |
|  (SCSI, NVMe, SATA)      |
+--------------------------+
|  Hardware Controller     |
|  (DMA, interrupts)       |
+--------------------------+
`}
              </pre>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">STREAMS</h4>
              <p className="text-sm text-gray-700 mb-3">
                STREAMS is a mechanism in UNIX System V for implementing device drivers and network protocols as a stack of modules. Each module performs some processing on data passing between the user process and the device driver.
              </p>
              <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`User Process
     |
  Stream Head  <-->  Module 1  <-->  Module 2  <-->  Driver  <-->  Device
(read/write)       (processing)    (processing)   (hardware)

// Messages flow upstream (device to user) and downstream (user to device)`}
              </div>
              <p className="text-sm text-gray-700 mt-3">
                Each module can filter, transform, or route messages. This modular design makes it easy to add functionality like encryption, compression, or logging transparently.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-gray-500" />
              I/O Performance Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              I/O performance is often the bottleneck in modern systems. Optimizing I/O requires understanding scheduling algorithms, RAID configurations, buffering strategies, and zero-copy techniques.
            </p>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">RAID Levels Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Level</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-left">Capacity</th>
                      <th className="p-3 text-left">Read Perf</th>
                      <th className="p-3 text-left">Write Perf</th>
                      <th className="p-3 text-left">Fault Tolerance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">RAID 0</td>
                      <td className="p-3">Striping, no redundancy</td>
                      <td className="p-3">100%</td>
                      <td className="p-3">N x single</td>
                      <td className="p-3">N x single</td>
                      <td className="p-3">None</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">RAID 1</td>
                      <td className="p-3">Mirroring</td>
                      <td className="p-3">50%</td>
                      <td className="p-3">~N x single</td>
                      <td className="p-3">~1 x single</td>
                      <td className="p-3">N-1 disks</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">RAID 5</td>
                      <td className="p-3">Striping + distributed parity</td>
                      <td className="p-3">(N-1)/N</td>
                      <td className="p-3">(N-1) x single</td>
                      <td className="p-3">~0.25 x single (parity calc)</td>
                      <td className="p-3">1 disk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">RAID 6</td>
                      <td className="p-3">Striping + double parity</td>
                      <td className="p-3">(N-2)/N</td>
                      <td className="p-3">(N-2) x single</td>
                      <td className="p-3">~0.15 x single</td>
                      <td className="p-3">2 disks</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">RAID 10</td>
                      <td className="p-3">Striped mirrors</td>
                      <td className="p-3">50%</td>
                      <td className="p-3">N x single</td>
                      <td className="p-3">N/2 x single</td>
                      <td className="p-3">1 per mirror</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Buffering Strategies and Performance</h4>
              <p className="text-sm text-gray-700 mb-3">
                The choice of buffering strategy affects throughput, latency, and memory usage:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">No Buffering</p>
                  <p className="text-xs text-gray-600 mt-1">Every byte transferred immediately. Highest overhead. Used only for special devices.</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">Block Buffering</p>
                  <p className="text-xs text-gray-600 mt-1">Data accumulated until a full block is ready. Reduces system calls and I/O operations.</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">Line Buffering</p>
                  <p className="text-xs text-gray-600 mt-1">Data buffered until a newline character. Common for terminal I/O.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Double Buffering Diagram</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
Time T0:  [Device] --fills--> Buffer A
          [CPU]    --reads--> Buffer B

Time T1:  [Device] --fills--> Buffer B
          [CPU]    --reads--> Buffer A

Time T2:  [Device] --fills--> Buffer A
          [CPU]    --reads--> Buffer B

Throughput limited by MAX(device_rate, cpu_rate)
instead of device_rate + cpu_rate overhead.
`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-6 h-6 text-gray-500" />
              Real-World: Linux I/O Subsystem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="schedulers" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="schedulers">I/O Schedulers</TabsTrigger>
                <TabsTrigger value="async">Async I/O</TabsTrigger>
                <TabsTrigger value="zerocopy">Zero-Copy</TabsTrigger>
                <TabsTrigger value="direct">Direct I/O</TabsTrigger>
              </TabsList>

              <TabsContent value="schedulers" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  Linux supports multiple I/O schedulers, each optimized for different workloads and storage technologies.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-3 text-left">Scheduler</th>
                        <th className="p-3 text-left">Best For</th>
                        <th className="p-3 text-left">Behavior</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">none / noop</td>
                        <td className="p-3">NVMe SSDs, RAID controllers</td>
                        <td className="p-3">Minimal scheduling overhead. FIFO with basic merging.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">mq-deadline</td>
                        <td className="p-3">General purpose, SATA SSDs</td>
                        <td className="p-3">Two queues (read/write) with deadlines to prevent starvation.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">kyber</td>
                        <td className="p-3">Fast NVMe devices</td>
                        <td className="p-3">Internal latency targets. Self-tuning. Low latency focus.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">bfq</td>
                        <td className="p-3">Interactive desktops, HDDs</td>
                        <td className="p-3">Budget Fair Queueing. Provides guaranteed bandwidth per process.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`# Check current scheduler for a disk
cat /sys/block/sda/queue/scheduler
# Output: [mq-deadline] kyber none

# Change scheduler to none (for NVMe)
echo none > /sys/block/nvme0n1/queue/scheduler

# Check queue depth
cat /sys/block/nvme0n1/queue/nr_requests`}
                </div>
              </TabsContent>

              <TabsContent value="async" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  Modern high-performance applications use asynchronous I/O to handle thousands of concurrent operations without blocking threads. Linux offers epoll, io_uring, and POSIX AIO.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-sm">epoll (event-driven)</p>
                    <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono mt-2">
{`int epfd = epoll_create1(0);
struct epoll_event ev;
ev.events = EPOLLIN;
ev.data.fd = fd;
epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &ev);

// Wait for events
struct epoll_event events[10];
int n = epoll_wait(epfd, events, 10, -1);`}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Used by Nginx, Redis, Node.js libuv. O(1) for large numbers of fds.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-sm">io_uring (next-gen async I/O)</p>
                    <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono mt-2">
{`// Setup ring
struct io_uring ring;
io_uring_queue_init(32, &ring, 0);

// Submit read request
struct io_uring_sqe *sqe = io_uring_get_sqe(&ring);
io_uring_prep_read(sqe, fd, buf, size, offset);
io_uring_submit(&ring);

// Poll for completion
struct io_uring_cqe *cqe;
io_uring_wait_cqe(&ring, &cqe);`}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Zero system calls for completions with polled mode. Lowest latency async I/O on Linux.</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="zerocopy" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  Zero-copy techniques eliminate unnecessary data copies between kernel and user space, dramatically improving throughput for network and file I/O.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-sm mb-2">sendfile() System Call</p>
                  <p className="text-sm text-gray-700 mb-2">
                    Transfers data directly from a file descriptor to a socket without passing through user space.
                  </p>
                  <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`// Traditional approach: 4 copies, 4 context switches
read(fd, buf, size);      // kernel -> user
write(sockfd, buf, size); // user -> kernel

// sendfile approach: 2 copies, 2 context switches
sendfile(sockfd, fd, &offset, size);
// Data moves directly from page cache to NIC buffer

// splice() for pipe-to-pipe/file/socket
splice(fd_in, &off_in, fd_out, &off_out, len, flags);`}
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-300 text-xs font-mono">
{`
Traditional File Transfer:
  Disk -> Page Cache -> User Buffer -> Socket Buffer -> NIC
                      ^             ^
                      |             |
                   copy 2        copy 3

Zero-Copy (sendfile):
  Disk -> Page Cache -------------> NIC DMA
                      (kernel directly programs NIC DMA)
`}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="direct" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  Direct I/O (O_DIRECT) bypasses the kernel page cache, allowing applications to manage caching themselves. This is critical for databases like MySQL and PostgreSQL.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`// Open file with Direct I/O
int fd = open("/data/dbfile", O_RDWR | O_DIRECT);

// Buffer must be aligned to device sector size
void *buf;
posix_memalign(&buf, 4096, 4096);

// Read directly from disk, bypassing page cache
pread(fd, buf, 4096, offset);

// Pros: Predictable performance, no double caching
// Cons: No read-ahead, no write-back buffering, alignment requirements`}
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="font-semibold text-sm">When to Use O_DIRECT</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• Database systems with their own buffer pool</li>
                      <li>• Video streaming servers</li>
                      <li>• Large sequential I/O where page cache is wasteful</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="font-semibold text-sm">Alignment Requirements</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• File offset must be multiple of block size (512 or 4096)</li>
                      <li>• User buffer must be page-aligned</li>
                      <li>• Transfer length must be multiple of block size</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
                "I/O devices communicate through controllers and buses; understanding bus bandwidth and latency is essential for system design",
                "DMA is vastly more efficient than polling or interrupt-driven I/O for large transfers, reducing CPU overhead by over 99%",
                "The kernel I/O subsystem provides scheduling, buffering, caching, spooling, and error handling to bridge hardware and applications",
                "I/O requests traverse many layers: system call -> VFS -> file system -> page cache -> block layer -> scheduler -> driver -> hardware",
                "Linux offers multiple I/O schedulers (noop, mq-deadline, kyber, bfq) tuned for different storage devices and workloads",
                "Asynchronous I/O (epoll, io_uring) enables handling massive concurrency without blocking threads",
                "Zero-copy techniques (sendfile, splice) eliminate unnecessary data movement and are critical for high-throughput networking",
                "Direct I/O (O_DIRECT) bypasses the page cache and is essential for databases that manage their own caching"
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
