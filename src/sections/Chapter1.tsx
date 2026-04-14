import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Cpu, Shield, Layers, 
  Globe, Terminal, Info,
  CheckCircle, Zap, Database,
  Code
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter1() {
  const [showRealWorld, setShowRealWorld] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 1</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Introduction to Operating Systems</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive deep dive into OS concepts with extensive comparisons and real-world backend engineering applications
        </p>
      </motion.div>

      {/* What is an OS - Deep Dive */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-6 h-6 text-gray-500" />
              What is an Operating System?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                An <strong>Operating System (OS)</strong> is a program that acts as an intermediary between 
                the computer user and the computer hardware. The purpose of an OS is to provide an 
                environment in which a user can execute programs in a convenient and efficient manner.
              </p>
            </div>

            {/* Comparison: Program vs OS */}
            <div className="bg-slate-50 p-5 rounded-lg">
              <h4 className="font-semibold mb-4">Program vs Operating System Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="p-3 text-left">Aspect</th>
                      <th className="p-3 text-left">Regular Program</th>
                      <th className="p-3 text-left">Operating System</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Purpose</td>
                      <td className="p-3">Solve specific user problems</td>
                      <td className="p-3">Manage hardware and enable other programs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Execution</td>
                      <td className="p-3">Runs when user starts it</td>
                      <td className="p-3">Runs continuously from boot to shutdown</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Privilege</td>
                      <td className="p-3">User mode (restricted)</td>
                      <td className="p-3">Kernel mode (full access)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Hardware Access</td>
                      <td className="p-3">Indirect (through OS)</td>
                      <td className="p-3">Direct control of all hardware</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Failure Impact</td>
                      <td className="p-3">Affects only that program</td>
                      <td className="p-3">Can crash entire system</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Computer System Components */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Computer System Components
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="font-medium text-gray-700">Hardware</p>
                    <p className="text-sm text-gray-600">CPU, memory, I/O devices (keyboard, mouse, disk, network), graphics cards, and other physical components that provide basic computing resources.</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="font-medium text-gray-700">Operating System</p>
                    <p className="text-sm text-gray-600">Controls and coordinates hardware use among various applications and users. Acts as the resource manager.</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="font-medium text-gray-700">Application Programs</p>
                    <p className="text-sm text-gray-600">Web browsers, compilers, databases, games - define how system resources are used to solve computing problems.</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="font-medium text-gray-700">Users</p>
                    <p className="text-sm text-gray-600">People, machines, other computers who interact with the system.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  What the OS Does
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Process Management:</strong> Creates, schedules, and terminates processes; provides mechanisms for synchronization and communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Memory Management:</strong> Tracks memory usage, decides which processes get memory and when, allocates/deallocates memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>File System Management:</strong> Creates, deletes, reads, writes files; manages directories; maps files to disk storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>I/O System Management:</strong> Manages devices through drivers, provides uniform interface, buffers and caches I/O</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Protection & Security:</strong> Controls access to system resources, authenticates users, prevents interference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Networking:</strong> Manages network protocols, connections, and distributed systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Command Interpretation:</strong> Parses and executes user commands (shell)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* OS Definition Variations */}
            <div className="bg-slate-100 p-5 rounded-lg">
              <h4 className="font-semibold mb-3">Two Perspectives on "What is the OS?"</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border-2 border-gray-200">
                  <h5 className="font-semibold text-gray-900">The Minimalist View (Just the Kernel)</h5>
                  <p className="text-sm text-gray-700 mt-2">
                    The OS is only the kernel - the program running at all times on the computer. 
                    Everything else (shells, utilities, libraries) are system programs, not part of the OS.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Examples: Linux kernel, Windows NT kernel, XNU (macOS)
                  </p>
                </div>
                <div className="bg-white p-4 rounded border-2 border-gray-200">
                  <h5 className="font-semibold text-gray-900">The Comprehensive View (Everything)</h5>
                  <p className="text-sm text-gray-700 mt-2">
                    The OS includes the kernel plus all system programs that come with it - 
                    shells, compilers, utilities, windowing systems, etc.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Examples: "Ubuntu Linux", "Windows 11", "macOS Sonoma"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Storage Hierarchy - Detailed with Comparisons */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-gray-500" />
              Storage Hierarchy (Detailed Comparison)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-50 p-5 rounded-lg">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Storage Hierarchy Comparison Table
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="p-3 text-left">Level</th>
                      <th className="p-3 text-left">Access Time</th>
                      <th className="p-3 text-left">Typical Size</th>
                      <th className="p-3 text-left">Cost/GB</th>
                      <th className="p-3 text-left">Volatility</th>
                      <th className="p-3 text-left">Managed By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium">CPU Registers</td>
                      <td className="p-3">&lt; 1 ns</td>
                      <td className="p-3">64-512 bytes</td>
                      <td className="p-3">Very High</td>
                      <td className="p-3">Volatile</td>
                      <td className="p-3">Compiler</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium">L1 Cache</td>
                      <td className="p-3">1-2 ns</td>
                      <td className="p-3">32-64 KB</td>
                      <td className="p-3">Very High</td>
                      <td className="p-3">Volatile</td>
                      <td className="p-3">Hardware</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium">L2 Cache</td>
                      <td className="p-3">3-10 ns</td>
                      <td className="p-3">256 KB - 1 MB</td>
                      <td className="p-3">High</td>
                      <td className="p-3">Volatile</td>
                      <td className="p-3">Hardware</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium">L3 Cache</td>
                      <td className="p-3">10-20 ns</td>
                      <td className="p-3">4-64 MB</td>
                      <td className="p-3">Medium-High</td>
                      <td className="p-3">Volatile</td>
                      <td className="p-3">Hardware</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium">Main Memory (RAM)</td>
                      <td className="p-3">50-100 ns</td>
                      <td className="p-3">8-128 GB</td>
                      <td className="p-3">Medium</td>
                      <td className="p-3">Volatile</td>
                      <td className="p-3">OS</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium">SSD (NVMe)</td>
                      <td className="p-3">10-100 μs</td>
                      <td className="p-3">256 GB - 4 TB</td>
                      <td className="p-3">Low-Medium</td>
                      <td className="p-3">Persistent</td>
                      <td className="p-3">OS + FS</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium">HDD</td>
                      <td className="p-3">5-10 ms</td>
                      <td className="p-3">1-18 TB</td>
                      <td className="p-3">Low</td>
                      <td className="p-3">Persistent</td>
                      <td className="p-3">OS + FS</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 font-medium">Network Storage</td>
                      <td className="p-3">10-100 ms</td>
                      <td className="p-3">Unlimited</td>
                      <td className="p-3">Very Low</td>
                      <td className="p-3">Persistent</td>
                      <td className="p-3">Network + OS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Key Principle:</strong> As we go down the hierarchy, cost per bit decreases, 
                capacity increases, and access time increases. The OS manages this hierarchy using caching.
              </p>
            </div>

            {/* Backend Task: Cache Optimization */}
            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Backend Task: Cache-Aware Programming
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Understanding cache hierarchy helps you write faster code. Here's a practical example:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">❌ Cache-Unfriendly (Row-major access on column-major)</p>
                  <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// Bad: Jumping around memory
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        sum += matrix[j][i]; // Column access
    }
}
// Cache misses: ~n²`}
                  </code>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">✅ Cache-Friendly (Sequential access)</p>
                  <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// Good: Sequential memory access
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        sum += matrix[i][j]; // Row access
    }
}
// Cache misses: ~n²/cache_line`}
                  </code>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                <strong>Real-world impact:</strong> This optimization can make matrix operations 10-100x faster!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dual Mode Operation - Deep Dive */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-gray-500" />
              Dual-Mode Operation: User vs Kernel Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Modern CPUs support at least two modes of operation to protect the operating system and other programs 
              from errant or malicious programs. The mode bit (in the hardware) distinguishes between these modes.
            </p>

            {/* Detailed Comparison */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="p-3 text-left">Characteristic</th>
                    <th className="p-3 text-left text-gray-700">User Mode</th>
                    <th className="p-3 text-left text-gray-700">Kernel Mode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Mode Bit Value</td>
                    <td className="p-3">1</td>
                    <td className="p-3">0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">What Runs Here</td>
                    <td className="p-3">User applications, shells, utilities</td>
                    <td className="p-3">OS kernel, device drivers</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Memory Access</td>
                    <td className="p-3">Only its own address space</td>
                    <td className="p-3">Complete access to all memory</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">CPU Instructions</td>
                    <td className="p-3">Non-privileged only</td>
                    <td className="p-3">All instructions including privileged</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Hardware Access</td>
                    <td className="p-3">Indirect (through syscalls)</td>
                    <td className="p-3">Direct control</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Failure Impact</td>
                    <td className="p-3">Only that process crashes</td>
                    <td className="p-3">Can crash entire system</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Switch Overhead</td>
                    <td className="p-3">N/A (already in user mode)</td>
                    <td className="p-3">~100-1000 cycles to switch</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mode Transition */}
            <div className="bg-slate-100 p-5 rounded-lg">
              <h4 className="font-semibold mb-4">Mode Transition: How User Mode Enters Kernel Mode</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                  <h5 className="font-semibold text-gray-900">1. System Call</h5>
                  <p className="text-sm text-gray-600 mt-2">
                    User program requests OS service (e.g., read file, allocate memory). 
                    Executes a special trap instruction.
                  </p>
                  <code className="block mt-2 p-2 bg-slate-800 rounded text-gray-300 text-xs">
{`# Linux x86_64 syscall
mov rax, 0    # syscall number (read)
mov rdi, 0    # file descriptor
mov rsi, buf  # buffer
mov rdx, 512  # count
syscall       # enters kernel mode`}
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Backend use:</strong> Every database query, file read, network send uses syscalls
                  </p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                  <h5 className="font-semibold text-gray-900">2. Interrupt</h5>
                  <p className="text-sm text-gray-600 mt-2">
                    Hardware signals need attention (timer, I/O completion, keyboard). 
                    CPU suspends current process and executes interrupt handler.
                  </p>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1">
                    <li>• Timer interrupt: For scheduling</li>
                    <li>• I/O interrupt: Disk read complete</li>
                    <li>• Network interrupt: Packet received</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Backend use:</strong> High-performance servers rely on interrupts for async I/O
                  </p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                  <h5 className="font-semibold text-gray-900">3. Exception/Trap</h5>
                  <p className="text-sm text-gray-600 mt-2">
                    Error or unusual condition (divide by zero, page fault, illegal instruction). 
                    Kernel handles the condition.
                  </p>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1">
                    <li>• Page fault: Accessed memory not in RAM</li>
                    <li>• Segfault: Accessed invalid memory</li>
                    <li>• Divide by zero: Arithmetic error</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Backend use:</strong> Page faults trigger memory allocation; segfaults kill buggy processes
                  </p>
                </div>
              </div>
            </div>

            {/* Backend Task: Syscall Monitoring */}
            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Backend Task: Monitor System Calls in Production
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-700 mb-2">
                    Use <code>strace</code> (Linux) or <code>dtruss</code> (macOS) to see what your application is doing:
                  </p>
                  <code className="block p-3 bg-slate-900 rounded text-gray-300 text-xs">
{`# Trace all syscalls of a running process
strace -p $(pidof myapp)

# Count syscalls by type
strace -c -p $(pidof myapp)

# Trace specific syscalls only
strace -e open,read,write,connect,sendto,recvfrom ./myapp

# Save to file for analysis
strace -o app.strace -f ./myapp`}
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Real-world scenario:</strong> Debugging a slow API endpoint
                  </p>
                  <div className="bg-white p-3 rounded text-sm">
                    <p className="text-gray-600">
                      You notice an API endpoint is slow. Using strace, you discover it's making 
                      1000+ <code>open()</code> calls per request - each config file is being re-read! 
                      Solution: Cache config in memory.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Alert>
              <Info className="w-4 h-4" />
              <AlertDescription>
                <strong>Why This Matters:</strong> If your Node.js server has a memory leak and tries to 
                access memory outside its allocated space, the MMU detects this, triggers a page fault (exception), 
                and the kernel can terminate the misbehaving process without crashing the entire system. 
                This is the foundation of system stability.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </motion.div>

      {/* Computing Environments - Detailed */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-gray-500" />
              Computing Environments (Detailed with Comparisons)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="comparison" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                <TabsTrigger value="cloud">Cloud</TabsTrigger>
                <TabsTrigger value="containers">Containers</TabsTrigger>
                <TabsTrigger value="serverless">Serverless</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="mt-4">
                <div className="bg-slate-50 p-5 rounded-lg">
                  <h4 className="font-semibold mb-4">Computing Environment Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-200">
                          <th className="p-3 text-left">Environment</th>
                          <th className="p-3 text-left">Control Level</th>
                          <th className="p-3 text-left">Scaling</th>
                          <th className="p-3 text-left">Cost Model</th>
                          <th className="p-3 text-left">Best For</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium">On-Premise</td>
                          <td className="p-3">Full</td>
                          <td className="p-3">Manual/Hard</td>
                          <td className="p-3">CapEx (upfront)</td>
                          <td className="p-3">Compliance, legacy</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">IaaS (VMs)</td>
                          <td className="p-3">High</td>
                          <td className="p-3">Auto-scaling</td>
                          <td className="p-3">Pay per hour</td>
                          <td className="p-3">Flexibility, lift-shift</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">PaaS</td>
                          <td className="p-3">Medium</td>
                          <td className="p-3">Automatic</td>
                          <td className="p-3">Pay per use</td>
                          <td className="p-3">Web apps, APIs</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Containers</td>
                          <td className="p-3">High</td>
                          <td className="p-3">Fast/Kubernetes</td>
                          <td className="p-3">Resource-based</td>
                          <td className="p-3">Microservices</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Serverless</td>
                          <td className="p-3">Low</td>
                          <td className="p-3">Instant/Auto</td>
                          <td className="p-3">Per invocation</td>
                          <td className="p-3">Event-driven, sporadic</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cloud" className="mt-4">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Cloud Service Models (IaaS vs PaaS vs SaaS)</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded border-t-4 border-gray-500">
                      <h5 className="font-semibold text-gray-900">IaaS</h5>
                      <p className="text-sm text-gray-600 mt-2">Infrastructure as a Service</p>
                      <p className="text-xs text-gray-500 mt-2">You manage: OS, runtime, apps, data</p>
                      <p className="text-xs text-gray-600 mt-2">Provider manages: Virtualization, servers, storage, networking</p>
                      <p className="text-xs text-gray-400 mt-2">Examples: AWS EC2, Azure VMs, GCP Compute</p>
                    </div>
                    <div className="bg-white p-4 rounded border-t-4 border-gray-500">
                      <h5 className="font-semibold text-gray-900">PaaS</h5>
                      <p className="text-sm text-gray-600 mt-2">Platform as a Service</p>
                      <p className="text-xs text-gray-500 mt-2">You manage: Apps, data</p>
                      <p className="text-xs text-gray-600 mt-2">Provider manages: Runtime, middleware, OS, virtualization, infrastructure</p>
                      <p className="text-xs text-gray-400 mt-2">Examples: Heroku, AWS Elastic Beanstalk, Google App Engine</p>
                    </div>
                    <div className="bg-white p-4 rounded border-t-4 border-gray-500">
                      <h5 className="font-semibold text-gray-900">SaaS</h5>
                      <p className="text-sm text-gray-600 mt-2">Software as a Service</p>
                      <p className="text-xs text-gray-500 mt-2">You manage: Nothing (just use it)</p>
                      <p className="text-xs text-gray-600 mt-2">Provider manages: Everything</p>
                      <p className="text-xs text-gray-400 mt-2">Examples: Gmail, Salesforce, Dropbox, Slack</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="containers" className="mt-4">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">VMs vs Containers Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-3 text-left">Aspect</th>
                          <th className="p-3 text-left">Virtual Machines</th>
                          <th className="p-3 text-left">Containers</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium">OS</td>
                          <td className="p-3">Each VM has full OS</td>
                          <td className="p-3">Share host OS kernel</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Startup Time</td>
                          <td className="p-3">Minutes</td>
                          <td className="p-3">Seconds</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Size</td>
                          <td className="p-3">GBs</td>
                          <td className="p-3">MBs</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Isolation</td>
                          <td className="p-3">Strong (hardware-level)</td>
                          <td className="p-3">Process-level (cgroups, namespaces)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Performance</td>
                          <td className="p-3">Near-native</td>
                          <td className="p-3">Native (no hypervisor overhead)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Use Case</td>
                          <td className="p-3">Different OS requirements, strong isolation</td>
                          <td className="p-3">Microservices, CI/CD, dev environments</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="serverless" className="mt-4">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Serverless: When to Use vs When to Avoid</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                      <h5 className="font-semibold text-gray-900">✅ Good For</h5>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Event-driven processing</li>
                        <li>• Sporadic/variable workloads</li>
                        <li>• Rapid prototyping</li>
                        <li>• Microservices with low traffic</li>
                        <li>• Scheduled tasks</li>
                        <li>• Webhooks</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                      <h5 className="font-semibold text-gray-900">❌ Avoid For</h5>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Long-running processes</li>
                        <li>• High throughput (&gt;1000 req/s)</li>
                        <li>• Low latency requirements</li>
                        <li>• Stateful applications</li>
                        <li>• Large dependencies</li>
                        <li>• Predictable steady workloads</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Real World Examples for Backend Engineers - EXTENSIVE */}
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
              className="border-gray-400 text-gray-400 hover:bg-green-400/10"
            >
              {showRealWorld ? 'Hide Examples' : 'Show All Examples'}
            </Button>

            {showRealWorld && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                {/* Scenario 1: Container Resource Limits */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-400 mb-2">Scenario 1: Container Resource Limits</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    When you set CPU and memory limits in Docker/Kubernetes, you're using OS features 
                    (cgroups in Linux) to constrain resources. The OS enforces these limits using 
                    the same dual-mode protection we discussed.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Limit container to 512MB RAM and 1 CPU
docker run --memory=512m --cpus=1.0 myapp

# In Kubernetes
resources:
  limits:
    memory: "512Mi"
    cpu: "1000m"
  requests:
    memory: "256Mi"
    cpu: "500m"

# Check cgroup limits inside container
cat /sys/fs/cgroup/memory/memory.limit_in_bytes
cat /sys/fs/cgroup/cpu/cpu.cfs_quota_us`}
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Task:</strong> Set up a container with memory limits and observe OOM kills when it exceeds them.
                  </p>
                </div>

                {/* Scenario 2: Debugging with strace */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-400 mb-2">Scenario 2: Debugging Slow API with strace</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Every file operation, network request, or memory allocation in your application 
                    eventually becomes a system call. Understanding this helps debug performance issues.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Real example: API endpoint taking 5 seconds
$ strace -c -p $(pidof myapi)
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
 85.23    4.256789       42567       100           openat
 10.11    0.505432        5054       100           read
  2.34    0.117123        1171       100           write

# Problem found: 100 open() calls!
# Root cause: Loading config file on every request
# Solution: Cache config in memory`}
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Task:</strong> Use strace to find why your app is slow. Look for repeated syscalls.
                  </p>
                </div>

                {/* Scenario 3: Understanding /proc */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-400 mb-2">Scenario 3: Monitoring Without Tools</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Linux exposes process info through a virtual filesystem. This is how tools like 
                    ps, top, and htop get their data without special privileges.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Build your own process monitor
PID=$(pidof myapp)

# Memory usage
cat /proc/$PID/status | grep -E 'VmRSS|VmSize'

# CPU time
cat /proc/$PID/stat | awk '{print "User: " $14 " Kernel: " $15}'

# Open files (file descriptors)
ls -la /proc/$PID/fd/ | wc -l

# Current working directory
ls -la /proc/$PID/cwd

# Environment variables
cat /proc/$PID/environ | tr '\\0' '\\n' | grep -E 'PATH|DATABASE'`}
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Task:</strong> Write a script that monitors your app's memory and alerts if it grows.
                  </p>
                </div>

                {/* Scenario 4: File Descriptor Limits */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-400 mb-2">Scenario 4: "Too Many Open Files" Error</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Every connection uses a file descriptor. Check and increase limits:
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check current limits
ulimit -n                    # Soft limit
ulimit -Hn                   # Hard limit
cat /proc/$(pidof myapp)/limits | grep "Max open files"

# Check current usage
ls /proc/$(pidof myapp)/fd/ | wc -l

# Increase limit for current session
ulimit -n 65536

# Permanent: edit /etc/security/limits.conf
myuser soft nofile 65536
myuser hard nofile 65536

# System-wide: /etc/sysctl.conf
fs.file-max = 2097152`}
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Task:</strong> Monitor fd usage during load testing. Find the leak source.
                  </p>
                </div>

                {/* Scenario 5: Cloud VM Detection */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-400 mb-2">Scenario 5: Detecting Virtualization</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    When you provision a VM in AWS/Azure/GCP, you're getting a virtualized environment.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check if you're in a VM
systemd-detect-virt          # Returns: kvm, vmware, xen, etc.

# Check CPU info for hypervisor flag
grep -E 'vmx|svm|hypervisor' /proc/cpuinfo

# Check DMI info (requires root)
dmidecode -s system-product-name

# Check cloud-init
cloud-init query datasource

# Performance implications:
# - Network: Virtualized NICs (lower throughput)
# - Disk: Shared storage (variable latency)
# - CPU: May be oversubscribed`}
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Task:</strong> Benchmark network/disk in cloud vs bare metal. Understand the overhead.
                  </p>
                </div>

                {/* Scenario 6: OOM Killer */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-400 mb-2">Scenario 6: Debugging OOM Kills</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    When memory runs out, the Linux OOM killer terminates processes.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check dmesg for OOM kills
dmesg | grep -i "killed process"

# Example output:
[12345.678901] Out of memory: Killed process 1234 (node) 
               total-vm:2097152kB, anon-rss:1048576kB

# Check which process was killed
journalctl -k | grep -i "oom"

# Adjust OOM score (higher = more likely to be killed)
echo 1000 > /proc/$(pidof myapp)/oom_score_adj

# Or disable OOM killer for a process
echo -17 > /proc/$(pidof myapp)/oom_adj`}
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Task:</strong> Set up monitoring to alert when OOM kills occur in production.
                  </p>
                </div>

                {/* Scenario 7: CPU Affinity */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-400 mb-2">Scenario 7: CPU Affinity for Performance</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Pin processes to specific CPUs to improve cache locality.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Run process on CPU 0 only
taskset -c 0 ./myapp

# Check current affinity
taskset -p $(pidof myapp)

# Set affinity programmatically (C)
#include <sched.h>
cpu_set_t cpuset;
CPU_ZERO(&cpuset);
CPU_SET(0, &cpuset);
sched_setaffinity(0, sizeof(cpuset), &cpuset);

# In Docker:
docker run --cpuset-cpus="0-3" myapp

# In Kubernetes:
spec:
  containers:
  - name: myapp
    resources:
      limits:
        cpu: "4"`}
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Task:</strong> Compare performance with and without CPU affinity for your workload.
                  </p>
                </div>

                {/* Scenario 8: Namespaces */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-400 mb-2">Scenario 8: Understanding Linux Namespaces</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Namespaces are what make containers possible. They isolate processes.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# List namespaces of a process
ls -la /proc/$(pidof myapp)/ns/

# Check which namespace you're in
readlink /proc/self/ns/pid
readlink /proc/self/ns/net
readlink /proc/self/ns/mnt

# Enter a container's namespace
nsenter -t $(pidof containerd-shim) -n /bin/bash

# Types of namespaces:
# PID: Process isolation
# NET: Network isolation
# MNT: Filesystem mount points
# UTS: Hostname/domain name
# IPC: Inter-process communication
# USER: User/group IDs`}
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Task:</strong> Explore how Docker uses namespaces to isolate containers.
                  </p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Topics */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-gray-500" />
              Advanced Topic: Unikernels, Library OSes, and Exokernels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                Beyond monolithic and microkernel designs, modern systems engineering has produced several radical OS architectures that strip away abstraction layers to maximize performance and minimize attack surface.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Unikernels and Library OSes</h4>
                <p className="text-sm text-gray-700 mb-3">
                  A <strong>unikernel</strong> is a specialized, single-address-space machine image constructed by linking application code with only the OS libraries it needs. The result boots in milliseconds and has a memory footprint measured in megabytes.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>OSv:</strong> Java and POSIX unikernel designed for cloud VMs. Runs unmodified Linux binaries with near-bare-metal performance.</li>
                  <li>• <strong>MirageOS:</strong> OCaml-based library OS. Compiles OCaml code into standalone unikernels for Xen/KVM. Used in production DNS and TLS appliances.</li>
                  <li>• <strong>IncludeOS:</strong> C++ unikernel where your application <em>is</em> the OS. Boots in ~10ms on KVM.</li>
                </ul>
                <code className="block mt-3 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# MirageOS unikernel build workflow
$ mirage configure -t hvt
$ make depend
$ make
# Produces: ./hello.hvt (Solo5/HVT unikernel)`}
                </code>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Exokernels and L3 Microkernel</h4>
                <p className="text-sm text-gray-700 mb-3">
                  An <strong>exokernel</strong> pushes almost all OS abstractions into user-space libraries. The kernel's only job is to securely multiplex hardware resources. The <strong>L3 microkernel</strong> demonstrated that with proper IPC design, microkernels can be practical.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Exokernel philosophy:</strong> Securely export hardware, don't abstract it. Applications download "libOS" code to manage their own virtual memory, file systems, and network stacks.</li>
                  <li>• <strong>L3:</strong> Designed by Jochen Liedtke. Showed that IPC can be made fast (~100 cycles) with direct context switching and small TCB.</li>
                  <li>• <strong>XOK/ExOS:</strong> MIT's exokernel research OS. Achieved 5-10x better network throughput than BSD by eliminating kernel copies.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
              <h4 className="font-semibold text-gray-900 mb-3">Kernel Bypass Networking: DPDK and RDMA</h4>
              <p className="text-sm text-gray-700 mb-3">
                In high-frequency trading and telco, every microsecond of kernel networking stack latency matters. Kernel bypass techniques give user-space applications direct access to NIC hardware.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">DPDK (Data Plane Development Kit)</p>
                  <p className="text-xs text-gray-600 mt-1">Intel-led framework that polls NIC rings directly from user space. Eliminates interrupts and syscalls. Used in NFV, Open vSwitch, and 5G base stations.</p>
                  <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// DPDK packet receive loop (simplified)
while (!force_quit) {
    nb_rx = rte_eth_rx_burst(port_id, 0, 
                             mbufs, BURST_SIZE);
    for (i = 0; i < nb_rx; i++) {
        process_packet(mbufs[i]);
        rte_pktmbuf_free(mbufs[i]);
    }
}`}
                  </code>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">RDMA (Remote Direct Memory Access)</p>
                  <p className="text-xs text-gray-600 mt-1">InfiniBand/RoCE technology allowing one machine to read/write another's memory without CPU involvement on either side. Latency: ~1μs.</p>
                  <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// RDMA one-sided read via libibverbs
struct ibv_send_wr wr = {0};
wr.opcode = IBV_WR_RDMA_READ;  // no remote CPU
wr.wr.rdma.remote_addr = peer_addr;
wr.wr.rdma.rkey = peer_rkey;
ibv_post_send(qp, &wr, &bad_wr);`}
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Architectural Comparison: Monolithic vs Microkernel vs Unikernel vs Exokernel</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Characteristic</th>
                      <th className="p-3 text-left">Monolithic</th>
                      <th className="p-3 text-left">Microkernel</th>
                      <th className="p-3 text-left">Unikernel</th>
                      <th className="p-3 text-left">Exokernel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Kernel Size</td>
                      <td className="p-3">Large (millions of LOC)</td>
                      <td className="p-3">Small (~10K LOC)</td>
                      <td className="p-3">None (library linked)</td>
                      <td className="p-3">Minimal (~few K LOC)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Isolation</td>
                      <td className="p-3">Process-level</td>
                      <td className="p-3">Strong (user-space drivers)</td>
                      <td className="p-3">VM-level</td>
                      <td className="p-3">Application-level</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Performance</td>
                      <td className="p-3">High (no IPC overhead)</td>
                      <td className="p-3">Moderate (IPC cost)</td>
                      <td className="p-3">Very high (no ring transitions)</td>
                      <td className="p-3">Very high (no abstractions)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Deploy Unit</td>
                      <td className="p-3">Full OS image</td>
                      <td className="p-3">OS + user servers</td>
                      <td className="p-3">Single-purpose VM</td>
                      <td className="p-3">Application + libOS</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Best Use Case</td>
                      <td className="p-3">General purpose</td>
                      <td className="p-3">Safety-critical systems</td>
                      <td className="p-3">Cloud microservices</td>
                      <td className="p-3">High-performance networking</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Backend Engineering Takeaway</h4>
              <p className="text-sm text-gray-700">
                While you won't deploy unikernels for every microservice, understanding kernel bypass is essential for building low-latency backends. DPDK and RDMA are foundational technologies in high-frequency trading, in-memory databases, and distributed storage systems like Ceph and NVMe-oF.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Takeaways */}
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
                "The OS is a resource manager - it doesn't produce value directly but enables everything else",
                "Dual-mode operation (user/kernel) is fundamental to system stability and security",
                "System calls are the gateway between applications and OS services (~350 in Linux)",
                "The timer prevents any single process from monopolizing the CPU",
                "Storage hierarchy trades speed for capacity and cost - understand cache locality",
                "Different computing environments (cloud, containers, serverless) have different tradeoffs",
                "Understanding OS concepts helps you write better, more efficient, and more secure applications",
                "Tools like strace, /proc, and cgroups are essential for backend debugging"
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
