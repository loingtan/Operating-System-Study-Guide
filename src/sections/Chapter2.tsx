import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, Terminal, Cpu, FileText, MessageSquare, 
  AlertTriangle, BarChart3, Shield, Code, Settings,
  CheckCircle, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter2() {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 2</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Operating System Structures</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Deep dive into OS services, system calls, design approaches, and real-world backend applications
        </p>
      </motion.div>

      {/* OS Services - Detailed with Comparisons */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-gray-500" />
              Operating System Services (Detailed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="ui">UI</TabsTrigger>
                <TabsTrigger value="syscalls">System Calls</TabsTrigger>
                <TabsTrigger value="types">Types</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="structure">Structure</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: Terminal, title: "User Interface", desc: "All OS provide UI for user interaction", details: ["CLI: bash, zsh, PowerShell, cmd.exe", "GUI: Windows Explorer, macOS Finder, GNOME, KDE", "Batch: Scripts that run without interaction", "Voice: Siri, Alexa, Google Assistant"] },
                    { icon: Cpu, title: "Program Execution", desc: "Load, run, and terminate programs", details: ["Load program into memory", "Set up execution environment", "Handle program termination", "Return exit status to parent"] },
                    { icon: ArrowRight, title: "I/O Operations", desc: "Transfer data to/from devices", details: ["Read from keyboard, mouse, disk", "Write to display, printer, disk", "Handle device errors", "Buffer and cache I/O for performance"] },
                    { icon: FileText, title: "File System", desc: "Create, delete, read, write files and directories", details: ["Hierarchical directory structure", "File permissions and access control", "File metadata (size, timestamps)", "Mount/unmount filesystems"] },
                    { icon: MessageSquare, title: "Communications", desc: "IPC between processes", details: ["Shared memory: Fast, needs synchronization", "Message passing: Slower, easier to use", "Pipes: Unidirectional byte streams", "Sockets: Network communication"] },
                    { icon: AlertTriangle, title: "Error Detection", desc: "Handle hardware and software errors", details: ["Detect CPU errors (divide by zero)", "Handle I/O errors (disk failure)", "Memory errors (page faults)", "Log errors for debugging"] },
                    { icon: BarChart3, title: "Resource Allocation", desc: "Manage CPU, memory, disk, devices", details: ["CPU scheduling algorithms", "Memory allocation strategies", "Disk space management", "Device allocation"] },
                    { icon: BarChart3, title: "Accounting", desc: "Track resource usage", details: ["CPU time per user/process", "Disk space usage", "Network bandwidth", "For billing or statistics"] },
                    { icon: Shield, title: "Protection & Security", desc: "Control access to resources", details: ["Authentication (who are you?)", "Authorization (what can you do?)", "Encryption of sensitive data", "Audit logging"] },
                  ].map((service, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                            <service.icon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{service.title}</h4>
                            <p className="text-sm text-gray-600">{service.desc}</p>
                            <ul className="mt-2 space-y-1">
                              {service.details.map((detail, j) => (
                                <li key={j} className="text-xs text-gray-500">• {detail}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ui" className="mt-6">
                <div className="space-y-6">
                  {/* CLI vs GUI Comparison */}
                  <div className="bg-slate-50 p-5 rounded-lg">
                    <h4 className="font-semibold mb-4">CLI vs GUI Comparison for Backend Engineers</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-200">
                            <th className="p-3 text-left">Aspect</th>
                            <th className="p-3 text-left text-gray-700">CLI (Command Line)</th>
                            <th className="p-3 text-left text-gray-700">GUI (Graphical)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Speed</td>
                            <td className="p-3">Fast for experienced users</td>
                            <td className="p-3">Slower, requires navigation</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Automation</td>
                            <td className="p-3">Easy (scripts, cron)</td>
                            <td className="p-3">Hard (requires tools)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Remote Access</td>
                            <td className="p-3">SSH (low bandwidth)</td>
                            <td className="p-3">VNC/RDP (high bandwidth)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Resource Usage</td>
                            <td className="p-3">Minimal</td>
                            <td className="p-3">Higher (graphics)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Learning Curve</td>
                            <td className="p-3">Steep</td>
                            <td className="p-3">Gentle</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">Backend Use</td>
                            <td className="p-3">Essential (servers, automation)</td>
                            <td className="p-3">Optional (monitoring dashboards)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-5 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2 mb-4">
                        <Terminal className="w-5 h-5" />
                        Command-Line Interface (CLI)
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border">
                          <p className="font-medium text-sm">Advantages</p>
                          <ul className="text-sm text-gray-600 mt-1 space-y-1">
                            <li>• Direct control and precision</li>
                            <li>• Easy to script and automate</li>
                            <li>• Lower resource usage</li>
                            <li>• Remote access via SSH</li>
                            <li>• Powerful text processing (pipes, redirection)</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <p className="font-medium text-sm">Common Shells</p>
                          <ul className="text-sm text-gray-600 mt-1 space-y-1">
                            <li>• <strong>bash</strong> - Bourne Again Shell (Linux/macOS default)</li>
                            <li>• <strong>zsh</strong> - Z Shell (modern, extensible)</li>
                            <li>• <strong>fish</strong> - Friendly Interactive Shell</li>
                            <li>• <strong>PowerShell</strong> - Windows modern shell</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-slate-900 rounded text-gray-400 font-mono text-xs">
                        <p className="text-gray-500"># Backend tasks with CLI</p>
                        <p>$ find /var/log -name "*.log" -size +100M -delete</p>
                        <p>$ netstat -tlnp | grep :8080</p>
                        <p>$ ps aux --sort=-%mem | head -10</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2 mb-4">
                        <Layers className="w-5 h-5" />
                        Graphical User Interface (GUI)
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border">
                          <p className="font-medium text-sm">History</p>
                          <p className="text-sm text-gray-600 mt-1">
                            First developed at Xerox PARC in the 1970s. Popularized by 
                            Apple Macintosh (1984) and Microsoft Windows (1985).
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <p className="font-medium text-sm">Desktop Environments</p>
                          <ul className="text-sm text-gray-600 mt-1 space-y-1">
                            <li>• <strong>Windows</strong> - Explorer shell</li>
                            <li>• <strong>macOS</strong> - Aqua interface</li>
                            <li>• <strong>GNOME</strong> - Modern Linux desktop</li>
                            <li>• <strong>KDE Plasma</strong> - Customizable Linux desktop</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-3 bg-gray-50 p-3 rounded text-sm">
                        <p className="text-gray-700">
                          <strong>Backend use:</strong> GUI is mostly for local development. 
                          Production servers typically run headless (no GUI) to save resources.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="syscalls" className="mt-6">
                <div className="space-y-6">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">What are System Calls?</h4>
                    <p className="text-gray-700">
                      System calls provide the interface between a running program and the operating system. 
                      They are the mechanism by which user programs request services from the kernel.
                    </p>
                  </div>

                  {/* Syscall Comparison Table */}
                  <div className="bg-slate-50 p-5 rounded-lg">
                    <h4 className="font-semibold mb-4">System Call APIs Comparison</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-200">
                            <th className="p-3 text-left">API</th>
                            <th className="p-3 text-left">Platform</th>
                            <th className="p-3 text-left">~# of Calls</th>
                            <th className="p-3 text-left">Portability</th>
                            <th className="p-3 text-left">Best For</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3 font-medium">POSIX</td>
                            <td className="p-3">Unix/Linux/macOS</td>
                            <td className="p-3">~150</td>
                            <td className="p-3">High</td>
                            <td className="p-3">Cross-platform C/C++</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Win32 API</td>
                            <td className="p-3">Windows</td>
                            <td className="p-3">~1000+</td>
                            <td className="p-3">Low</td>
                            <td className="p-3">Windows-only apps</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Java API</td>
                            <td className="p-3">JVM (all platforms)</td>
                            <td className="p-3">~1000+</td>
                            <td className="p-3">Very High</td>
                            <td className="p-3">Enterprise applications</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">Go Runtime</td>
                            <td className="p-3">All platforms</td>
                            <td className="p-3">Abstracted</td>
                            <td className="p-3">High</td>
                            <td className="p-3">Cloud-native services</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h4 className="text-gray-400 font-mono text-sm mb-2">// File copy using system calls (C)</h4>
                      <pre className="text-gray-300 text-xs overflow-x-auto">
{`#include <fcntl.h>
#include <unistd.h>

int main() {
    char buffer[1024];
    ssize_t n;
    
    // 1. Open source file
    int fd1 = open("source.txt", O_RDONLY);
    if (fd1 < 0) { perror("open"); return 1; }
    
    // 2. Create destination file
    int fd2 = creat("dest.txt", 0644);
    if (fd2 < 0) { perror("create"); return 1; }
    
    // 3. Read from source, write to dest
    while ((n = read(fd1, buffer, sizeof(buffer))) > 0) {
        if (write(fd2, buffer, n) != n) {
            perror("write"); return 1;
        }
    }
    
    // 4. Close both files
    close(fd1);
    close(fd2);
    return 0;
}`}
                      </pre>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">How System Calls Work</h4>
                        <ol className="text-sm text-gray-700 space-y-2 mt-2">
                          <li><strong>1. API Call:</strong> Application calls library function</li>
                          <li><strong>2. Parameter Setup:</strong> Arguments placed in registers/stack</li>
                          <li><strong>3. Trap:</strong> Special instruction switches to kernel mode</li>
                          <li><strong>4. Dispatch:</strong> Kernel identifies which syscall</li>
                          <li><strong>5. Execute:</strong> Kernel performs the operation</li>
                          <li><strong>6. Return:</strong> Result returned, mode switches back</li>
                        </ol>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">Syscall Overhead</h4>
                        <p className="text-sm text-gray-700">
                          Each syscall requires context switching between user and kernel mode, 
                          which has overhead (~100-1000 CPU cycles).
                        </p>
                        <p className="text-xs text-gray-700 mt-2">
                          <strong>Backend implication:</strong> Minimize syscalls in hot paths. 
                          Use buffered I/O, batch operations, async I/O.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Backend Task: Syscall Optimization */}
                  <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Backend Task: Reducing Syscall Overhead
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-sm text-gray-700">❌ Unbuffered (slow)</p>
                        <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// One syscall per character!
for (int i = 0; i < len; i++) {
    write(fd, &buf[i], 1);  // Syscall each iteration
}
// 1000 chars = 1000 syscalls!`}
                        </code>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-sm text-gray-700">✅ Buffered (fast)</p>
                        <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// Use stdio buffering
FILE *f = fopen("file", "w");
fwrite(buf, 1, len, f);  // One syscall
fclose(f);

// Or use writev for scatter-gather
struct iovec iov[3];
writev(fd, iov, 3);  // One syscall`}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="types" className="mt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Six Major Categories of System Calls</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: "Process Control", examples: ["fork() - Create child process", "exec() - Execute new program", "exit() - Terminate process", "wait() - Wait for child", "kill() - Send signal to process"], color: "blue" },
                      { title: "File Management", examples: ["open() - Open file", "read() - Read from file", "write() - Write to file", "close() - Close file", "lseek() - Change file position"], color: "green" },
                      { title: "Device Management", examples: ["ioctl() - Device-specific control", "read() - Read from device", "write() - Write to device", "mmap() - Map device to memory"], color: "purple" },
                      { title: "Information Maintenance", examples: ["getpid() - Get process ID", "gettimeofday() - Get time", "setrlimit() - Set resource limits", "uname() - Get system info"], color: "orange" },
                      { title: "Communications", examples: ["pipe() - Create pipe", "socket() - Create socket", "connect() - Connect to socket", "send()/recv() - Send/receive data"], color: "red" },
                      { title: "Protection", examples: ["chmod() - Change permissions", "chown() - Change owner", "setuid() - Set user ID", "umask() - Set file mode mask"], color: "yellow" },
                    ].map((type, i) => (
                      <Card key={i} className={`bg-${type.color}-50`}>
                        <CardContent className="p-4">
                          <h5 className={`font-semibold text-${type.color}-900`}>{type.title}</h5>
                          <ul className={`text-sm text-${type.color}-800 mt-2 space-y-1`}>
                            {type.examples.map((ex, j) => (
                              <li key={j} className="font-mono text-xs">{ex}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="programs" className="mt-6">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    System programs provide a convenient environment for program development and execution. 
                    They are not part of the kernel but are essential for making the system usable.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { title: "File Management", items: ["ls - List directory", "cp - Copy files", "mv - Move/rename", "rm - Remove files", "mkdir - Make directory", "find - Search files", "grep - Search text"] },
                      { title: "Status Information", items: ["date - Show date/time", "ps - Process status", "top - System monitor", "htop - Interactive monitor", "df - Disk free space", "du - Disk usage", "free - Memory usage"] },
                      { title: "File Modification", items: ["vi/vim - Text editor", "nano - Simple editor", "emacs - Extensible editor", "sed - Stream editor", "awk - Text processing", "sort - Sort lines", "uniq - Remove duplicates"] },
                      { title: "Programming Support", items: ["gcc - C compiler", "javac - Java compiler", "python - Python interpreter", "gdb - Debugger", "make - Build automation", "git - Version control", "strace - Trace syscalls"] },
                      { title: "Program Execution", items: ["bash - Shell", "ld - Linker", "ld.so - Dynamic linker", "strace - Trace execution", "ltrace - Library trace", "time - Measure execution", "nohup - Run detached"] },
                      { title: "Communications", items: ["ssh - Secure shell", "scp - Secure copy", "curl - Transfer data", "wget - Download files", "mail - Send email", "write - Message user", "ping - Test connectivity"] },
                    ].map((cat, i) => (
                      <Card key={i} className="bg-gray-50">
                        <CardContent className="p-3">
                          <h5 className="font-semibold text-sm">{cat.title}</h5>
                          <ul className="text-xs text-gray-600 space-y-1 mt-2">
                            {cat.items.map((item, j) => (
                              <li key={j} className="font-mono">{item}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="structure" className="mt-6">
                <div className="space-y-6">
                  {/* OS Structure Comparison */}
                  <div className="bg-slate-50 p-5 rounded-lg">
                    <h4 className="font-semibold mb-4">OS Structure Comparison</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-200">
                            <th className="p-3 text-left">Structure</th>
                            <th className="p-3 text-left">Complexity</th>
                            <th className="p-3 text-left">Performance</th>
                            <th className="p-3 text-left">Maintainability</th>
                            <th className="p-3 text-left">Examples</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Simple (MS-DOS)</td>
                            <td className="p-3">Low</td>
                            <td className="p-3">Fast</td>
                            <td className="p-3">Poor</td>
                            <td className="p-3">MS-DOS, early systems</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Layered</td>
                            <td className="p-3">Medium</td>
                            <td className="p-3">Slower (layer crossing)</td>
                            <td className="p-3">Good</td>
                            <td className="p-3">THE OS</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Microkernel</td>
                            <td className="p-3">High</td>
                            <td className="p-3">Slower (IPC overhead)</td>
                            <td className="p-3">Excellent</td>
                            <td className="p-3">QNX, Minix, L4</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Monolithic</td>
                            <td className="p-3">High</td>
                            <td className="p-3">Fast</td>
                            <td className="p-3">Poor</td>
                            <td className="p-3">Traditional Linux</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">Modular/Hybrid</td>
                            <td className="p-3">Medium-High</td>
                            <td className="p-3">Fast</td>
                            <td className="p-3">Good</td>
                            <td className="p-3">Modern Linux, macOS, Windows</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-l-4 border-l-red-500">
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-gray-900">Simple Structure (MS-DOS)</h4>
                        <p className="text-sm text-gray-600 mt-2">
                          No separation between components. Applications can access hardware directly. 
                          No protection - any bug can crash the system.
                        </p>
                        <div className="mt-3 bg-slate-100 p-3 rounded font-mono text-xs">
                          <p>┌─────────────────┐</p>
                          <p>│   Applications  │</p>
                          <p>├─────────────────┤</p>
                          <p>│   Device Drivers│</p>
                          <p>├─────────────────┤</p>
                          <p>│   BIOS          │</p>
                          <p>├─────────────────┤</p>
                          <p>│   Hardware      │</p>
                          <p>└─────────────────┘</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-gray-900">Microkernel</h4>
                        <p className="text-sm text-gray-600 mt-2">
                          Moves as much as possible from kernel into user space. 
                          Only essential functions in kernel: process/memory management, IPC.
                        </p>
                        <div className="mt-3 bg-slate-100 p-3 rounded font-mono text-xs">
                          <p>┌─────────────────────────┐</p>
                          <p>│  User: File System      │</p>
                          <p>│  User: Device Drivers   │</p>
                          <p>│  User: Network Stack    │</p>
                          <p>├─────────────────────────┤</p>
                          <p>│  Kernel: IPC, Memory    │</p>
                          <p>│  Kernel: Scheduling     │</p>
                          <p>├─────────────────────────┤</p>
                          <p>│  Hardware               │</p>
                          <p>└─────────────────────────┘</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Examples: Mach, QNX, L4, Minix</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Boot - Detailed */}
      <motion.div {...fadeIn}>
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-gray-400" />
              System Boot Process (Detailed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { step: "1", title: "Power On / Reset", desc: "Power supply sends signal to CPU. CPU resets and starts executing at fixed memory address (reset vector).", detail: "On x86: CS:IP = FFFF:0000 = FFFF0 (top of BIOS ROM)" },
                { step: "2", title: "POST (Power-On Self Test)", desc: "BIOS/UEFI firmware checks hardware components (RAM, CPU, devices).", detail: "Tests: RAM, CPU, keyboard, storage devices, video. Beeps or displays errors if problems found." },
                { step: "3", title: "Find Boot Device", desc: "BIOS checks configured boot order (HDD, SSD, USB, Network).", detail: "Looks for boot signature (0xAA55) at end of first sector (MBR) or EFI partition" },
                { step: "4", title: "Load Boot Loader", desc: "Boot loader (GRUB, Windows Boot Manager) loaded into memory.", detail: "Stage 1: MBR boot code (446 bytes). Stage 2: Full boot loader from filesystem" },
                { step: "5", title: "Load Kernel", desc: "Boot loader loads OS kernel into memory and transfers control.", detail: "Kernel is typically compressed; boot loader decompresses it" },
                { step: "6", title: "Kernel Initialization", desc: "Kernel sets up data structures, initializes subsystems.", detail: "Memory management, scheduler, device drivers, VFS, network stack" },
                { step: "7", title: "Mount Root Filesystem", desc: "Kernel mounts the root filesystem read-only initially.", detail: "May use initramfs (initial RAM filesystem) to load drivers first" },
                { step: "8", title: "Start Init Process", desc: "First user-space process starts (PID 1).", detail: "Modern: systemd. Traditional: SysV init. macOS: launchd" },
                { step: "9", title: "Start Services", desc: "System services and daemons start.", detail: "Network, logging (syslog/journald), cron, SSH, etc." },
                { step: "10", title: "User Login", desc: "Login prompt (getty) or GUI (display manager) presented.", detail: "getty → login → shell OR display manager (GDM, LightDM)" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-500 text-black flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-slate-700 p-3 rounded-lg">
                    <h5 className="font-semibold text-gray-300">{item.title}</h5>
                    <p className="text-sm text-gray-300">{item.desc}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Real World for Backend Engineers */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-6 h-6 text-gray-500" />
              For Backend Engineers: Practical Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Debugging with strace</h4>
                <p className="text-sm text-gray-700 mb-2">
                  See all system calls your application makes:
                </p>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Trace all syscalls
strace ./my_server

# Count syscalls by type
strace -c ./my_server

# Trace specific syscalls only
strace -e open,read,write,connect ./my_server

# Follow child processes
strace -f ./my_server`}
                </code>
                <p className="text-xs text-gray-600 mt-2">
                  Useful for finding unnecessary file operations or network calls.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Understanding /proc</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Linux exposes process info through a virtual filesystem:
                </p>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Process status
cat /proc/$(pidof myapp)/status

# Memory maps
cat /proc/$(pidof myapp)/maps

# Open files
ls -la /proc/$(pidof myapp)/fd/

# Current working directory
ls -la /proc/$(pidof myapp)/cwd`}
                </code>
                <p className="text-xs text-gray-600 mt-2">
                  Get info without special tools.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Topics */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-gray-500" />
              Advanced Topic: Capability-Based Microkernels and Formal Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                The next generation of secure operating systems replaces ACL-based access control with <strong>capabilities</strong> and uses mathematical proof to guarantee correctness. These concepts are no longer academic—they power billions of devices.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">seL4 and Fuchsia Zircon</h4>
                <p className="text-sm text-gray-700 mb-3">
                  A <strong>capability</strong> is an unforgeable token that grants rights to an object. All authority in these systems derives from holding capabilities.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>seL4:</strong> The world's first OS kernel with a complete formal proof of functional correctness. Written in C/Haskell, ~8,700 LOC. Powers drones, medical devices, and automotive systems.</li>
                  <li>• <strong>Zircon:</strong> The microkernel underlying Google's Fuchsia OS. Uses capability-based handles for all kernel objects (VMOs, channels, threads). Every syscall requires a valid handle.</li>
                </ul>
                <code className="block mt-3 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// Zircon: all kernel objects are referenced by handles
zx_handle_t vmo;
zx_vmo_create(4096, 0, &vmo);  // capability to a VMO

// Pass handle to another process via channel
zx_channel_write(channel, 0, buffer, buf_size, &vmo, 1);`}
                </code>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Formal Verification in OS Design</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Formal verification uses theorem provers to prove that code matches its specification. seL4's proof stack is the gold standard.
                </p>
                <div className="bg-white p-3 rounded mb-3">
                  <p className="font-semibold text-sm text-gray-700">seL4 Proof Hierarchy</p>
                  <pre className="text-xs text-gray-600 mt-1 font-mono">
{`Abstract Spec        (Haskell prototype)
     ↓ refinement
Executable Spec      (C model)
     ↓ refinement
C Implementation     (Actual kernel)
     ↓ translation
Binary (ARM/x86/RISC-V)`}
                  </pre>
                </div>
                <p className="text-xs text-gray-600">
                  <strong>Proof guarantees:</strong> functional correctness, integrity (kernel data cannot be tampered with), confidentiality (no information leaks), and binary verification.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
              <h4 className="font-semibold text-gray-900 mb-3">POSIX Real-Time Extensions and Linux PREEMPT_RT</h4>
              <p className="text-sm text-gray-700 mb-3">
                Hard real-time systems require deterministic latency bounds. The PREEMPT_RT patchset turns Linux into a real-time OS by making almost the entire kernel preemptible.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">PREEMPT_RT Mechanisms</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• Threaded interrupt handlers</li>
                    <li>• Spinlocks converted to mutexes with priority inheritance</li>
                    <li>• High-resolution timers (hrtimers)</li>
                    <li>• Priority ceiling and priority inheritance protocols</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">Latency Comparison</p>
                  <table className="w-full text-xs mt-1">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-1">Vanilla Linux</td>
                        <td className="py-1">~100μs - 10ms</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1">PREEMPT_RT</td>
                        <td className="py-1">~10μs - 100μs</td>
                      </tr>
                      <tr>
                        <td className="py-1">Dedicated RTOS</td>
                        <td className="py-1">~1μs - 10μs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <code className="block mt-3 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// Configure SCHED_FIFO real-time thread
struct sched_param param;
param.sched_priority = 80;
sched_setscheduler(0, SCHED_FIFO, &param);

// Lock memory to prevent page faults
mlockall(MCL_CURRENT | MCL_FUTURE);`}
              </code>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Modular Monolithic vs Pure Microkernel Debates</h4>
              <p className="text-sm text-gray-700 mb-3">
                Linux pioneered the <strong>modular monolithic</strong> approach: loadable kernel modules (LKMs) give runtime extensibility while retaining the performance of a single address space. The debate between this and pure microkernels remains active.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Criterion</th>
                      <th className="p-3 text-left">Pure Microkernel</th>
                      <th className="p-3 text-left">Modular Monolithic</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Fault Isolation</td>
                      <td className="p-3">Excellent (user-space drivers crash independently)</td>
                      <td className="p-3">Moderate (module bug can panic kernel)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Performance</td>
                      <td className="p-3">IPC overhead for every I/O operation</td>
                      <td className="p-3">Near-zero overhead for in-kernel paths</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Code Size in TCB</td>
                      <td className="p-3">Very small (~10K LOC)</td>
                      <td className="p-3">Very large (~25M LOC)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Verification Feasibility</td>
                      <td className="p-3">Practical (seL4)</td>
                      <td className="p-3">Impractical at scale</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Real-World Adoption</td>
                      <td className="p-3">QNX, seL4, Zircon</td>
                      <td className="p-3">Linux, Windows NT, macOS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                <strong>Backend relevance:</strong> Linux kernel modules (e.g., eBPF, netfilter, device drivers) and the rise of user-space networking (DPDK) represent a practical middle ground—keeping the fast path in the kernel while moving complex logic to user space.
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
                "OS services range from UI to resource management to error handling",
                "System calls are the bridge between applications and the kernel (typically 100-300 syscalls)",
                "Different OS structures (monolithic, microkernel, modular) have different tradeoffs",
                "System programs make the OS usable for developers and administrators",
                "Understanding system calls helps optimize application performance",
                "The boot process involves firmware, boot loader, kernel, and init system",
                "Modern Linux has ~350 system calls; Windows has ~1000+ APIs"
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
