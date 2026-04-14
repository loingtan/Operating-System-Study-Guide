import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Play, Pause, Square, GitBranch, 
  MessageSquare, Server, Cpu, ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter3() {
  const [processState, setProcessState] = useState<'new' | 'ready' | 'running' | 'waiting' | 'terminated'>('new');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 3</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Processes</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Deep dive into process concepts, lifecycle, scheduling, and inter-process communication
        </p>
      </motion.div>

      {/* What is a Process - Deep Dive */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-gray-500" />
              What is a Process? (Deep Dive)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                A <strong>process</strong> is a program in execution. It is the unit of work in a modern time-sharing system. 
                A process is more than just program code (text section) - it includes the current activity represented by 
                the program counter, processor registers, and the process stack.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Process Memory Layout</h4>
                <div className="space-y-2">
                  <div className="bg-gray-100 p-3 rounded">
                    <p className="font-semibold text-gray-700">Stack (High Address)</p>
                    <p className="text-gray-700 text-sm">Local variables, function parameters, return addresses. Grows downward.</p>
                    <p className="text-xs text-gray-600 mt-1">Automatic allocation/deallocation</p>
                  </div>
                  <div className="text-center text-gray-400 text-sm py-1">
                    ↓ Grows Down ↓
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-center text-gray-500 text-sm">
                    Free Space (Heap can grow up, Stack grows down)
                  </div>
                  <div className="text-center text-gray-400 text-sm py-1">
                    ↑ Grows Up ↑
                  </div>
                  <div className="bg-gray-100 p-3 rounded">
                    <p className="font-semibold text-gray-700">Heap</p>
                    <p className="text-gray-700 text-sm">Dynamic memory allocation (malloc, new). Grows upward.</p>
                    <p className="text-xs text-gray-600 mt-1">Manual allocation, must free</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded">
                    <p className="font-semibold text-gray-700">Data Section</p>
                    <p className="text-gray-700 text-sm">Global and static variables.</p>
                    <p className="text-xs text-gray-600 mt-1">Initialized and uninitialized (BSS)</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded">
                    <p className="font-semibold text-gray-700">Text Section (Low Address)</p>
                    <p className="text-gray-700 text-sm">Program code (machine instructions). Read-only.</p>
                    <p className="text-xs text-gray-600 mt-1">Shared among processes running same program</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Program vs Process</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2">Program</th>
                        <th className="text-left py-2">Process</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Passive entity</td>
                        <td className="py-2">Active entity</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Stored on disk (executable file)</td>
                        <td className="py-2">Loaded in memory</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">One copy on disk</td>
                        <td className="py-2">Multiple instances possible</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">No resources allocated</td>
                        <td className="py-2">Has allocated resources (CPU, memory, files)</td>
                      </tr>
                      <tr>
                        <td className="py-2">Doesn't change over time</td>
                        <td className="py-2">State changes as it executes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Process Attributes (in PCB)</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>PID:</strong> Unique process identifier (integer)</li>
                    <li>• <strong>PPID:</strong> Parent process ID</li>
                    <li>• <strong>Program Counter:</strong> Address of next instruction</li>
                    <li>• <strong>CPU Registers:</strong> All register values</li>
                    <li>• <strong>Memory Limits:</strong> Base and limit registers</li>
                    <li>• <strong>Open Files:</strong> List of open file descriptors</li>
                    <li>• <strong>Scheduling Info:</strong> Priority, state, CPU time</li>
                    <li>• <strong>Accounting:</strong> CPU time used, real time elapsed</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Process States - Interactive */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-6 h-6 text-gray-500" />
              Process States (Interactive)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {(['new', 'ready', 'running', 'waiting', 'terminated'] as const).map((state) => (
                <button
                  key={state}
                  onClick={() => setProcessState(state)}
                  className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                    processState === state
                      ? 'bg-gray-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                {processState === 'new' && <Activity className="w-10 h-10 text-gray-500" />}
                {processState === 'ready' && <Server className="w-10 h-10 text-gray-500" />}
                {processState === 'running' && <Cpu className="w-10 h-10 text-gray-500" />}
                {processState === 'waiting' && <Pause className="w-10 h-10 text-gray-500" />}
                {processState === 'terminated' && <Square className="w-10 h-10 text-gray-500" />}
                <div>
                  <h3 className="text-2xl font-bold capitalize">{processState} State</h3>
                  <p className="text-gray-500">
                    {processState === 'new' && 'Process is being created'}
                    {processState === 'ready' && 'Waiting to be assigned to CPU'}
                    {processState === 'running' && 'Instructions are being executed'}
                    {processState === 'waiting' && 'Waiting for some event to occur'}
                    {processState === 'terminated' && 'Process has finished execution'}
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                {processState === 'new' && (
                  <>
                    <h4 className="font-semibold mb-3">What happens in New state:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Allocate PID:</strong> Get unique process identifier from system</li>
                      <li>• <strong>Create PCB:</strong> Allocate and initialize Process Control Block</li>
                      <li>• <strong>Allocate Memory:</strong> Set up address space (text, data, heap, stack)</li>
                      <li>• <strong>Load Program:</strong> Load executable from disk into memory</li>
                      <li>• <strong>Initialize Registers:</strong> Set program counter to entry point</li>
                      <li>• <strong>Link to Parent:</strong> Set PPID, add to parent's child list</li>
                      <li>• <strong>Add to Ready Queue:</strong> Process is now ready to run</li>
                    </ul>
                  </>
                )}
                {processState === 'ready' && (
                  <>
                    <h4 className="font-semibold mb-3">What happens in Ready state:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>In Ready Queue:</strong> Waiting in a queue for CPU time</li>
                      <li>• <strong>Has All Resources:</strong> Except CPU - memory, files allocated</li>
                      <li>• <strong>Could Run Immediately:</strong> If given CPU, can execute right away</li>
                      <li>• <strong>Competing:</strong> Multiple ready processes compete for CPU</li>
                      <li>• <strong>Scheduler Decides:</strong> CPU scheduler picks next process</li>
                      <li>• <strong>Short-term Queue:</strong> Typically multiple ready queues by priority</li>
                    </ul>
                  </>
                )}
                {processState === 'running' && (
                  <>
                    <h4 className="font-semibold mb-3">What happens in Running state:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Executing Instructions:</strong> CPU is executing process code</li>
                      <li>• <strong>One Per Core:</strong> Only one process per CPU core at a time</li>
                      <li>• <strong>Until:</strong> Process can run until it blocks, is preempted, or terminates</li>
                      <li>• <strong>Timer Interrupt:</strong> Enables time-sharing between processes</li>
                      <li>• <strong>Mode:</strong> User mode for process code, kernel mode for syscalls</li>
                      <li>• <strong>Quantum:</strong> May have limited time slice before preemption</li>
                    </ul>
                  </>
                )}
                {processState === 'waiting' && (
                  <>
                    <h4 className="font-semibold mb-3">What happens in Waiting state:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Voluntary:</strong> Process gives up CPU to wait for event</li>
                      <li>• <strong>Waiting For:</strong> I/O completion, signal, resource availability</li>
                      <li>• <strong>Cannot Run:</strong> Even if given CPU, can't make progress</li>
                      <li>• <strong>In Wait Queue:</strong> Waiting for specific event/resource</li>
                      <li>• <strong>Wake Up:</strong> Event occurrence moves process back to ready</li>
                      <li>• <strong>Multiple Queues:</strong> Different queues for different events</li>
                    </ul>
                  </>
                )}
                {processState === 'terminated' && (
                  <>
                    <h4 className="font-semibold mb-3">What happens in Terminated state:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Finished Execution:</strong> Process completed or was killed</li>
                      <li>• <strong>Deallocate Resources:</strong> Free memory, close files</li>
                      <li>• <strong>Exit Status:</strong> Return code to parent (0 = success)</li>
                      <li>• <strong>PCB Kept:</strong> Until parent calls wait() to get status</li>
                      <li>• <strong>Zombie:</strong> If parent doesn't wait, process becomes zombie</li>
                      <li>• <strong>Orphan:</strong> If parent dies first, init adopts the process</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* State Diagram */}
            <div className="mt-6 p-4 bg-slate-900 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Process State Diagram</h4>
              <pre className="text-gray-300 text-xs md:text-sm font-mono">
{`
                    admit
    [NEW] ──────────────> [READY] <──────────┐
                            │                │
                            │ (scheduler)    │ (interrupt/timeout)
                            ↓                │
                       [RUNNING] ────────────┘
                            │
                            │ (I/O request or wait)
                            ↓
                       [WAITING] ──I/O complete──> [READY]
                            │
                            │ (I/O complete)
                            ↓
                      [TERMINATED]
`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Process Control Block - Detailed */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-6 h-6 text-gray-500" />
              Process Control Block (PCB) - Detailed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              The PCB is a data structure containing all information about a process. 
              It's created when the process is created and deleted when the process terminates.
              The PCB is the manifestation of a process in the operating system.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Process State Information</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Process State:</strong> new, ready, running, waiting, terminated</li>
                  <li>• <strong>Program Counter:</strong> Address of next instruction</li>
                  <li>• <strong>CPU Registers:</strong> Accumulator, index registers, stack pointer, general-purpose registers</li>
                  <li>• <strong>Stack Pointer:</strong> Current position in process stack</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Process Control Information</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Process ID (PID):</strong> Unique identifier</li>
                  <li>• <strong>Parent PID (PPID):</strong> Creator process</li>
                  <li>• <strong>User ID (UID):</strong> Owner of process</li>
                  <li>• <strong>Scheduling Priority:</strong> For CPU scheduling</li>
                  <li>• <strong>Time Information:</strong> CPU time used, time limits</li>
                  <li>• <strong>Signal Mask:</strong> Which signals are blocked</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Resource Information</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Memory Management:</strong> Page tables, segment tables, base/limit registers</li>
                  <li>• <strong>Open Files:</strong> Array of file descriptors</li>
                  <li>• <strong>Current Directory:</strong> Working directory</li>
                  <li>• <strong>Accounting:</strong> Resources consumed</li>
                  <li>• <strong>I/O Status:</strong> Pending I/O requests</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Context Switch (Detailed)</h4>
              <p className="text-sm text-gray-700 mb-3">
                When switching CPUs between processes, the OS saves the state of the old process in its PCB 
                and loads the saved state for the new process. This is pure overhead - no useful work is done.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm">What Happens</p>
                  <ol className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>1. Save state of current process to its PCB</li>
                    <li>2. Update PCB (e.g., change state to ready/waiting)</li>
                    <li>3. Move PCB to appropriate queue</li>
                    <li>4. Select new process to run (scheduler)</li>
                    <li>5. Restore state from new process's PCB</li>
                    <li>6. Resume new process at saved PC</li>
                  </ol>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm">Overhead Factors</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• Memory speed (accessing PCB)</li>
                    <li>• Number of registers to save/restore</li>
                    <li>• Hardware support (special instructions)</li>
                    <li>• Cache effects (cold cache after switch)</li>
                    <li>• TLB flush (memory translation cache)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    Typical: 1-1000 microseconds depending on hardware
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Process Creation - Detailed */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-gray-500" />
              Process Creation: fork() and exec() (Detailed)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-5 rounded-lg">
                <h4 className="text-gray-400 font-mono text-sm mb-3">// Parent Process (C)</h4>
                <pre className="text-gray-300 text-xs overflow-x-auto">
{`#include <unistd.h>
#include <sys/wait.h>
#include <stdio.h>

int main() {
    pid_t pid;
    int status;
    
    printf("Parent: PID=%d\\n", getpid());
    
    // fork() creates child process
    pid = fork();
    
    if (pid < 0) {
        // Error
        perror("fork failed");
        return 1;
    } else if (pid == 0) {
        // Child process
        printf("Child: PID=%d, Parent PID=%d\\n", 
               getpid(), getppid());
        
        // Replace with new program
        execlp("ls", "ls", "-l", NULL);
        
        // execlp only returns on error
        perror("execlp failed");
        return 1;
    } else {
        // Parent process
        printf("Parent: Child PID=%d\\n", pid);
        
        // Wait for child to complete
        wait(&status);
        
        if (WIFEXITED(status)) {
            printf("Child exited with status %d\\n", 
                   WEXITSTATUS(status));
        }
    }
    return 0;
}`}
                </pre>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">fork() Behavior</h4>
                  <ul className="text-sm text-gray-700 space-y-2 mt-2">
                    <li>• Creates exact copy of parent process</li>
                    <li>• Child gets new unique PID</li>
                    <li>• Returns 0 to child process</li>
                    <li>• Returns child's PID to parent</li>
                    <li>• Both continue from same point (after fork)</li>
                    <li>• <strong>Copy-on-Write (COW):</strong> Pages shared until modified</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">exec() Family</h4>
                  <ul className="text-sm text-gray-700 space-y-2 mt-2">
                    <li>• Replaces current process image with new program</li>
                    <li>• Same PID, new program</li>
                    <li>• Only returns on error</li>
                    <li>• Variants differ in how arguments passed:</li>
                  </ul>
                  <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`execl("/bin/ls", "ls", "-l", NULL);   // List args
execv("/bin/ls", argv);                // Array
execvp("ls", argv);                    // Search PATH
execle("/bin/ls", "ls", NULL, envp);   // With env`}
                  </code>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">wait() Family</h4>
                  <ul className="text-sm text-gray-700 space-y-1 mt-2">
                    <li>• <strong>wait(&status):</strong> Wait for any child</li>
                    <li>• <strong>waitpid(pid, &status, options):</strong> Wait for specific child</li>
                    <li>• <strong>waitid(idtype, id, &infop, options):</strong> POSIX.1-2008</li>
                    <li>• Prevents zombie processes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-5 rounded-lg">
              <h4 className="font-semibold mb-3">Common fork() + exec() Pattern</h4>
              <div className="flex flex-wrap items-center justify-center gap-2 p-4 bg-white rounded">
                <div className="bg-gray-100 p-3 rounded text-center">
                  <p className="font-semibold text-sm">Parent Shell</p>
                  <p className="text-xs text-gray-500">bash/zsh</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <div className="bg-gray-100 p-3 rounded text-center">
                  <p className="font-semibold text-sm">fork()</p>
                  <p className="text-xs text-gray-500">Create child</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <div className="bg-gray-100 p-3 rounded text-center">
                  <p className="font-semibold text-sm">Child exec()</p>
                  <p className="text-xs text-gray-500">Load command</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <div className="bg-gray-100 p-3 rounded text-center">
                  <p className="font-semibold text-sm">New Program</p>
                  <p className="text-xs text-gray-500">ls, cat, etc.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <div className="bg-gray-100 p-3 rounded text-center">
                  <p className="font-semibold text-sm">wait()</p>
                  <p className="text-xs text-gray-500">Shell waits</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                This is how shells execute commands: fork a child, then exec the command.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                <h4 className="font-semibold text-gray-900">Zombie Process</h4>
                <p className="text-sm text-gray-700 mt-2">
                  Child terminated but parent hasn't called wait(). PCB kept for exit status.
                </p>
                <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
                  $ ps aux | grep defunct
                  user 1234 0.0 0.0 0 0 ? Z 10:00 0:00 [a.out] defunct
                </code>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                <h4 className="font-semibold text-gray-900">Orphan Process</h4>
                <p className="text-sm text-gray-700 mt-2">
                  Parent terminated before child. Child adopted by init (PID 1).
                </p>
                <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
                  # Orphan's PPID becomes 1
                  $ ps -o pid,ppid,comm -p &lt;orphan_pid&gt;
                  PID  PPID COMMAND
                  1234    1 orphan_process
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* IPC - Detailed */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-gray-500" />
              Inter-Process Communication (IPC) - Detailed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="shared" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="shared">Shared Memory</TabsTrigger>
                <TabsTrigger value="message">Message Passing</TabsTrigger>
              </TabsList>

              <TabsContent value="shared" className="mt-4">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Multiple processes access a common memory region. Fast once set up, 
                    but requires synchronization to prevent race conditions.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Advantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Fastest IPC method (memory speed)</li>
                        <li>• No kernel involvement after setup</li>
                        <li>• Good for large data transfers</li>
                        <li>• Multiple processes can share</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Disadvantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Requires synchronization (semaphores, mutexes)</li>
                        <li>• Programming complexity</li>
                        <li>• Potential for data corruption</li>
                        <li>• No automatic cleanup on crash</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-gray-400 text-sm mb-2">// POSIX Shared Memory Example (C)</h4>
                    <pre className="text-gray-300 text-xs">
{`// Process A (Producer)
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>

int main() {
    // Create shared memory object
    int shm_fd = shm_open("/myshm", 
                          O_CREAT | O_RDWR, 0666);
    
    // Set size
    ftruncate(shm_fd, 4096);
    
    // Map to address space
    void *ptr = mmap(0, 4096, PROT_WRITE,
                     MAP_SHARED, shm_fd, 0);
    
    // Write data
    sprintf(ptr, "Hello from Process A");
    
    // Unmap and close
    munmap(ptr, 4096);
    close(shm_fd);
    
    return 0;
}

// Process B (Consumer)
int main() {
    // Open existing shared memory
    int shm_fd = shm_open("/myshm", 
                          O_RDONLY, 0666);
    
    void *ptr = mmap(0, 4096, PROT_READ,
                     MAP_SHARED, shm_fd, 0);
    
    // Read data
    printf("%s\\n", (char*)ptr);
    
    // Cleanup
    munmap(ptr, 4096);
    close(shm_fd);
    shm_unlink("/myshm");
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="message" className="mt-4">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Processes communicate by sending and receiving messages through the kernel. 
                    Simpler but slower due to system call overhead.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Advantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Simple to use</li>
                        <li>• Works across network (sockets)</li>
                        <li>• Kernel handles synchronization</li>
                        <li>• Automatic cleanup</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Disadvantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Slower (kernel involvement)</li>
                        <li>• Copying overhead</li>
                        <li>• Limited message size</li>
                        <li>• Buffering issues</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <p className="text-gray-400 text-xs mb-1">// Direct Communication</p>
                      <pre className="text-gray-300 text-xs">
{`// Processes must name each other
send(P, message)     // Send to process P
receive(Q, message)  // Receive from Q

// Link is associated with exactly
// one pair of processes`}
                      </pre>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <p className="text-gray-400 text-xs mb-1">// Indirect (via mailbox)</p>
                      <pre className="text-gray-300 text-xs">
{`// Messages go to mailboxes
send(A, message)     // Send to mailbox A
receive(A, message)  // Receive from A

// Multiple processes can share
// a mailbox`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-slate-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Message Passing Implementations</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-sm">Pipes</p>
                        <p className="text-xs text-gray-600">Unidirectional byte stream. Parent-child only.</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-sm">Message Queues</p>
                        <p className="text-xs text-gray-600">Linked list of messages. SysV or POSIX.</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-sm">Sockets</p>
                        <p className="text-xs text-gray-600">Network-capable. TCP/UDP/Unix domain.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Real World */}
      <motion.div {...fadeIn}>
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-white">For Backend Engineers: Practical Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Process Monitoring</h4>
                <code className="text-xs text-gray-300 block bg-slate-900 p-2 rounded">
{`# List all processes
ps aux

# Monitor specific process
top -p $(pidof myapp)

# Process tree
pstree -p $(pidof myapp)

# Detailed process info
cat /proc/$(pidof myapp)/status`}
                </code>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Forking Web Servers</h4>
                <p className="text-sm text-gray-300">
                  Apache (prefork MPM) creates child processes to handle requests. 
                  Nginx uses async I/O with fewer processes. Understanding this helps 
                  tune worker_processes and worker_connections.
                </p>
                <code className="text-xs text-gray-300 block bg-slate-900 p-2 rounded mt-2">
{`# Apache prefork config
StartServers 5
MinSpareServers 5
MaxSpareServers 10
MaxRequestWorkers 150`}
                </code>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Container Processes</h4>
                <p className="text-sm text-gray-300">
                  Docker containers are isolated processes. PID 1 in a container 
                  is special - it should handle signals properly. Use tini or 
                  dumb-init as init system.
                </p>
                <code className="text-xs text-gray-300 block bg-slate-900 p-2 rounded mt-2">
{`# Use tini as init
ENTRYPOINT ["/tini", "--"]
CMD ["node", "server.js"]

# Or use --init flag
docker run --init myimage`}
                </code>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Zombie Processes</h4>
                <p className="text-sm text-gray-300">
                  If a parent doesn't wait() for a child, it becomes a zombie. 
                  Too many zombies can exhaust PID space. Fix: ensure proper 
                  signal handling or use double-fork technique.
                </p>
                <code className="text-xs text-gray-300 block bg-slate-900 p-2 rounded mt-2">
{`# Find zombies
ps aux | grep 'Z'

# Find parent of zombies
ps -o pid,ppid,state,comm -p <zombie_pid>`}
                </code>
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
              <Server className="w-6 h-6 text-gray-500" />
              Advanced Topic: Namespaces, cgroups, and systemd
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                Modern Linux process management is built on three pillars: <strong>namespaces</strong> for isolation, <strong>cgroups</strong> for resource control, and <strong>systemd</strong> for lifecycle management. Together they power every container and cloud VM.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Namespaces and cgroups In Depth</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Namespaces partition kernel data structures so each process sees a private view of the system. cgroups (control groups) limit, account for, and isolate resource usage.
                </p>
                <div className="bg-white p-3 rounded mb-3">
                  <p className="font-semibold text-sm text-gray-700">Linux Namespaces (as of v6.x)</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• <strong>mnt:</strong> Filesystem mount points</li>
                    <li>• <strong>pid:</strong> Process IDs (nested PID namespaces)</li>
                    <li>• <strong>net:</strong> Network devices, stacks, ports</li>
                    <li>• <strong>ipc:</strong> System V IPC, POSIX message queues</li>
                    <li>• <strong>uts:</strong> Hostname and NIS domain</li>
                    <li>• <strong>user:</strong> UID/GID mappings (rootless containers)</li>
                    <li>• <strong>cgroup:</strong> Hide cgroup membership info</li>
                    <li>• <strong>time:</strong> Boot and monotonic clocks</li>
                  </ul>
                </div>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Create a new PID namespace
unshare --fork --pid --mount-proc /bin/bash
echo $$  # Shows 1 (init of new namespace)

# Inspect cgroup v2 limits
cat /sys/fs/cgroup/system.slice/nginx.service/memory.max
cat /sys/fs/cgroup/system.slice/nginx.service/cpu.max`}
                </code>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">systemd as PID 1</h4>
                <p className="text-sm text-gray-700 mb-3">
                  systemd is far more than an init system. It handles service management, socket activation, timers, mount points, swap, and even container/VM management (systemd-nspawn, systemd-machined).
                </p>
                <div className="bg-white p-3 rounded mb-3">
                  <p className="font-semibold text-sm text-gray-700">Unit Types</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• <strong>service:</strong> Daemons and applications</li>
                    <li>• <strong>socket:</strong> Socket activation (inetd replacement)</li>
                    <li>• <strong>target:</strong> Synchronization points (runlevels)</li>
                    <li>• <strong>timer:</strong> cron replacement</li>
                    <li>• <strong>path:</strong> Inotify-based activation</li>
                    <li>• <strong>slice/scope:</strong> cgroup containers</li>
                  </ul>
                </div>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Target dependency chain
graphical.target
  └─multi-user.target
      └─basic.target
          └─sysinit.target
              └─local-fs.target`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
              <h4 className="font-semibold text-gray-900 mb-3">Process Capabilities and seccomp-bpf</h4>
              <p className="text-sm text-gray-700 mb-3">
                Traditional Unix privileges are all-or-nothing (root vs user). Linux capabilities split root into 41 fine-grained privileges, and <strong>seccomp-bpf</strong> allows filtering which syscalls a process may invoke.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">Linux Capabilities Model</p>
                  <p className="text-xs text-gray-600 mt-1">Each thread has three capability sets:</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• <strong>Effective (E):</strong> Currently active</li>
                    <li>• <strong>Permitted (P):</strong> Maximum set that can be assumed</li>
                    <li>• <strong>Inheritable (I):</strong> Preserved across execve()</li>
                    <li>• <strong>Ambient (A):</strong> Inherited by unprivileged children</li>
                  </ul>
                  <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Drop all caps except NET_BIND_SERVICE
capsh --drop=cap_chown,cap_dac_override,... \
      --keep=cap_net_bind_service \
      -- -c "./myserver"`}
                  </code>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">seccomp-bpf Sandboxing</p>
                  <p className="text-xs text-gray-600 mt-1">Uses Berkeley Packet Filter rules to allow/deny syscalls. Default action can be errno, kill, trap, or log.</p>
                  <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// Allow read/write/exit, deny everything else
struct sock_filter filter[] = {
    BPF_STMT(BPF_LD+BPF_W+BPF_ABS, 
             offsetof(struct seccomp_data, nr)),
    BPF_JUMP(BPF_JMP+BPF_JEQ+BPF_K, __NR_read, 0, 1),
    BPF_STMT(BPF_RET+BPF_K, SECCOMP_RET_ALLOW),
    BPF_JUMP(BPF_JMP+BPF_JEQ+BPF_K, __NR_write, 0, 1),
    BPF_STMT(BPF_RET+BPF_K, SECCOMP_RET_ALLOW),
    BPF_STMT(BPF_RET+BPF_K, SECCOMP_RET_ERRNO|EPERM),
};`}
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Backend Engineering Takeaway</h4>
              <p className="text-sm text-gray-700">
                Understanding cgroups v2, systemd unit files, and seccomp profiles is essential for writing secure containerized applications. Modern platforms like Kubernetes, Docker, and Podman are thin orchestrators over these Linux primitives.
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
                "A process is more than code - it's the entire execution environment including memory, registers, and resources",
                "Processes move through states: new → ready → running → waiting → terminated",
                "The PCB stores all process information needed for context switching",
                "fork() creates processes, exec() replaces the current program - common pattern is fork + exec",
                "IPC enables cooperation: shared memory (fast, needs sync) vs message passing (simpler, slower)",
                "Zombie processes occur when parent doesn't wait(); orphans are adopted by init",
                "Understanding processes is essential for debugging and performance tuning"
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
