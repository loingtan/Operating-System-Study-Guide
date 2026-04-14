import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, HardDrive, Activity, AlertTriangle, 
  CheckCircle, RefreshCw, Terminal, Cpu,
  Code
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter9() {
  const [frames, setFrames] = useState([
    { id: 0, page: 1, age: 3 },
    { id: 1, page: 2, age: 1 },
    { id: 2, page: 3, age: 2 },
  ]);
  const reference = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
  const [currentRef, setCurrentRef] = useState(0);
  const [pageFaults, setPageFaults] = useState(0);
  const [algorithm, setAlgorithm] = useState<'fifo' | 'lru' | 'optimal'>('fifo');

  const simulateStep = () => {
    if (currentRef >= reference.length) return;
    
    const page = reference[currentRef];
    const exists = frames.some(f => f.page === page);
    
    if (!exists) {
      setPageFaults(p => p + 1);
      
      if (algorithm === 'fifo') {
        const newFrames = [...frames];
        newFrames.shift();
        newFrames.push({ id: frames.length, page, age: 0 });
        setFrames(newFrames);
      } else if (algorithm === 'lru') {
        const newFrames = frames.map(f => ({ ...f, age: f.age + 1 }));
        const oldest = newFrames.reduce((max, f) => f.age > max.age ? f : max);
        oldest.page = page;
        oldest.age = 0;
        setFrames(newFrames);
      }
    } else {
      if (algorithm === 'lru') {
        setFrames(frames.map(f => f.page === page ? { ...f, age: 0 } : { ...f, age: f.age + 1 }));
      }
    }
    
    setCurrentRef(currentRef + 1);
  };

  const resetSimulation = () => {
    setFrames([
      { id: 0, page: 1, age: 3 },
      { id: 1, page: 2, age: 1 },
      { id: 2, page: 3, age: 2 },
    ]);
    setCurrentRef(0);
    setPageFaults(0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 9</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Virtual Memory</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive deep dive into demand paging, page replacement, thrashing, and real-world memory management
        </p>
      </motion.div>

      {/* Virtual Memory Background */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-gray-500" />
              Background: Demand Paging and Effective Access Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                <strong>Virtual memory</strong> allows execution of processes that are not completely in memory. 
                It separates logical memory as perceived by the user from physical memory. 
                The logical address space can therefore be much larger than physical memory.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Benefits of Virtual Memory</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Large address space:</strong> Programs can be larger than physical memory</li>
                  <li><strong>Degree of multiprogramming:</strong> More processes can run simultaneously</li>
                  <li><strong>Reduced I/O:</strong> Less loading/swapping of entire processes</li>
                  <li><strong>Simplified linking:</strong> Each process uses the same logical address space</li>
                  <li><strong>Simplified sharing:</strong> Shared pages map to same physical frames</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Demand Paging</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Pages are loaded only when they are referenced (demanded), not at program startup. 
                  This is essentially a lazy allocation strategy.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Pages start as invalid in the page table</li>
                  <li>• First access causes a page fault</li>
                  <li>• OS allocates frame and reads page from disk</li>
                  <li>• Subsequent accesses proceed at memory speed</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Page Fault Handling Procedure</h4>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs flex-shrink-0">1</span>
                  <span>Process references a page not currently in memory (valid-invalid bit is invalid)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs flex-shrink-0">2</span>
                  <span>MMU generates a <strong>page fault</strong> (trap to the operating system)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs flex-shrink-0">3</span>
                  <span>OS locates the page on the backing store (swap space or file system)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs flex-shrink-0">4</span>
                  <span>OS finds a free frame (or selects a victim page to replace)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs flex-shrink-0">5</span>
                  <span>Schedule disk read to bring the page into the selected frame</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs flex-shrink-0">6</span>
                  <span>When I/O completes, update page table (set valid bit), then restart the faulted instruction</span>
                </li>
              </ol>
            </div>

            <div className="bg-slate-900 p-5 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Page Fault Flow Diagram</h4>
              <pre className="text-gray-300 text-xs md:text-sm font-mono">
{`
Process accesses page
         |
         v
    Page in memory? ----NO-----
         |                     |
        YES                   v
         |              Page Fault Trap
         v                     |
    Normal access      OS handles fault
         |                     |
         |                     v
         |            Find free frame
         |                     |
         |            Read page from disk
         |                     |
         |            Update page table
         |                     |
         |            Restart instruction
         |                     |
         +---------------------+
                    |
                    v
           Resume execution
`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Effective Access Time with Page Faults</h4>
              <p className="text-sm text-gray-700 mb-3">
                Let p be the probability of a page fault, t_mem be memory access time, and t_pagefault be page fault service time.
              </p>
              <div className="bg-white p-4 rounded border border-gray-300 text-center">
                <p className="text-lg font-mono text-gray-800">
                  EAT = (1 - p) * t_mem + p * t_pagefault
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                  <p className="text-sm font-semibold text-gray-700">Example 1: p = 1 in 1000</p>
                  <p className="text-xs text-gray-600 mt-1 font-mono">
                    t_mem = 100ns, t_pagefault = 8ms<br/>
                    EAT = 0.999 * 100ns + 0.001 * 8,000,000ns = 100ns + 8,000ns = 8.1 microseconds
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                  <p className="text-sm font-semibold text-gray-700">Example 2: p = 1 in 100</p>
                  <p className="text-xs text-gray-600 mt-1 font-mono">
                    EAT = 0.99 * 100ns + 0.01 * 8,000,000ns = 99ns + 80,000ns = 80.1 microseconds<br/>
                    <strong>System is now 800x slower!</strong>
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Key insight:</strong> To keep performance degradation reasonable, page fault rates must be extremely low (typically less than 1 in 10,000).
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Copy-on-Write */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-gray-500" />
              Copy-on-Write (COW) and Process Creation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Copy-on-Write is an optimization used during process creation (fork()). Instead of copying 
              the entire parent address space, parent and child share the same physical pages, marked read-only. 
              Only when a process writes to a shared page is a private copy made.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-5 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-3">COW with fork()</h4>
                <pre className="text-gray-300 text-xs font-mono">
{`#include <unistd.h>
#include <stdio.h>

int main() {
    int data = 42;
    
    // Before fork: one copy of data
    pid_t pid = fork();
    
    if (pid == 0) {
        // Child process
        // Shares same physical pages as parent
        // Pages are marked read-only (COW)
        
        printf("Child sees %d\\n", data);
        
        // WRITES trigger COW:
        data = 99;  // Page fault -> OS copies page
        printf("Child now has %d\\n", data);
    } else {
        // Parent process
        wait(NULL);
        printf("Parent still has %d\\n", data);
    }
    return 0;
}`}
                </pre>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Why COW Matters</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Speed:</strong> fork() is nearly instantaneous because no pages are copied</li>
                  <li><strong>Memory efficiency:</strong> Shared pages don't consume extra RAM</li>
                  <li><strong>Common case optimization:</strong> Many forked children exec() immediately, never writing any pages</li>
                  <li><strong>Linux defaults:</strong> fork() always uses COW in modern kernels</li>
                </ul>
                <div className="bg-white p-3 rounded border-l-4 border-gray-400 mt-3">
                  <p className="text-sm font-semibold text-gray-700">COW and vfork()</p>
                  <p className="text-xs text-gray-600 mt-1">
                    vfork() is an older optimization where the child borrows the parent's address space 
                    until it calls exec(). Even faster than COW fork, but unsafe if the child modifies memory.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">COW Timeline</h4>
              <pre className="text-gray-300 text-xs md:text-sm font-mono">
{`
Time 0: Parent has page P mapped to frame F (read-write)

        Parent
        Page P -> Frame F (RW)

Time 1: fork() creates child
        Both processes share Frame F, marked read-only

        Parent              Child
        Page P -> Frame F   Page P -> Frame F
           (RO)                 (RO)

Time 2: Child writes to Page P
        1. MMU traps (write to RO page)
        2. OS allocates Frame G
        3. OS copies F -> G
        4. Child's Page P now maps to G (RW)
        5. Parent still maps to F (RW restored)

        Parent              Child
        Page P -> Frame F   Page P -> Frame G
           (RW)                 (RW)
`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Page Replacement Algorithms */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-gray-500" />
              Page Replacement Algorithms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              When memory is full and a page fault occurs, the operating system must select a victim page to evict. 
              The goal is to choose a page that will not be needed for the longest time, minimizing future page faults.
            </p>

            <Tabs defaultValue="fifo" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="fifo">FIFO</TabsTrigger>
                <TabsTrigger value="lru">LRU</TabsTrigger>
                <TabsTrigger value="optimal">Optimal</TabsTrigger>
                <TabsTrigger value="clock">Clock</TabsTrigger>
              </TabsList>

              <TabsContent value="fifo" className="mt-4">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-900">First-In-First-Out (FIFO)</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Replace the page that has been in memory the longest. Simple to implement with a queue.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                      <p className="text-sm font-semibold text-gray-700">Pros</p>
                      <ul className="text-xs text-gray-600 mt-1 space-y-1">
                        <li>• Simple to understand and implement</li>
                        <li>• Low overhead (just a queue)</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                      <p className="text-sm font-semibold text-gray-700">Cons</p>
                      <ul className="text-xs text-gray-600 mt-1 space-y-1">
                        <li>• Can suffer from Belady's anomaly</li>
                        <li>• Doesn't consider page usage patterns</li>
                        <li>• May evict frequently used pages</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded mt-4 text-gray-300 text-xs font-mono">
{`// FIFO algorithm pseudocode
queue = empty

function access_page(page):
    if page not in memory:
        if memory is full:
            victim = queue.dequeue()
            evict(victim)
        queue.enqueue(page)
        load_page(page)
        return PAGE_FAULT
    return HIT`}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="lru" className="mt-4">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Least Recently Used (LRU)</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Replace the page that has not been used for the longest period of time. 
                    Based on the observation that pages used recently are likely to be used again soon.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                      <p className="text-sm font-semibold text-gray-700">Implementation Methods</p>
                      <ul className="text-xs text-gray-600 mt-1 space-y-1">
                        <li>• <strong>Counter:</strong> Each page has a use timestamp; replace smallest</li>
                        <li>• <strong>Stack:</strong> Maintain a stack of page numbers; move accessed page to top</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                      <p className="text-sm font-semibold text-gray-700">Properties</p>
                      <ul className="text-xs text-gray-600 mt-1 space-y-1">
                        <li>• Does NOT suffer from Belady's anomaly (stack algorithm)</li>
                        <li>• Good approximation of optimal</li>
                        <li>• Expensive to implement in hardware</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded mt-4 text-gray-300 text-xs font-mono">
{`// LRU with stack implementation
stack = empty

function access_page(page):
    if page not in memory:
        if memory is full:
            victim = stack.remove_bottom()
            evict(victim)
        stack.push_top(page)
        load_page(page)
        return PAGE_FAULT
    else:
        stack.move_to_top(page)
        return HIT`}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="optimal" className="mt-4">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Optimal (OPT / MIN)</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Replace the page that will not be used for the longest period of time in the future. 
                    Impossible to implement in practice because it requires future knowledge.
                  </p>
                  <div className="bg-white p-4 rounded border-l-4 border-gray-400 mt-4">
                    <p className="text-sm font-semibold text-gray-700">Purpose</p>
                    <p className="text-xs text-gray-600 mt-1">
                      OPT serves as the theoretical benchmark. We compare real algorithms against OPT 
                      to measure how close they come to the ideal. No real algorithm can beat OPT.
                    </p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded mt-4 text-gray-300 text-xs font-mono">
{`// Optimal algorithm pseudocode
function access_page(page, future_references):
    if page not in memory:
        if memory is full:
            // Find page with furthest next use
            victim = None
            furthest = -1
            for p in memory:
                next_use = find_next_use(p, future_references)
                if next_use > furthest:
                    furthest = next_use
                    victim = p
            evict(victim)
        load_page(page)
        return PAGE_FAULT
    return HIT`}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="clock" className="mt-4">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Clock (Second-Chance) Algorithm</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    An approximation of LRU using a reference bit. Pages are arranged in a circular queue 
                    like a clock face. The hand sweeps around; pages with reference bit = 1 get a second chance.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                      <p className="text-sm font-semibold text-gray-700">Algorithm Steps</p>
                      <ol className="text-xs text-gray-600 mt-1 space-y-1">
                        <li>1. Examine page at clock hand</li>
                        <li>2. If reference bit = 0, evict it</li>
                        <li>3. If reference bit = 1, clear it and advance hand</li>
                        <li>4. Repeat until victim found</li>
                      </ol>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                      <p className="text-sm font-semibold text-gray-700">Variants</p>
                      <ul className="text-xs text-gray-600 mt-1 space-y-1">
                        <li>• <strong>Enhanced Clock:</strong> Uses (reference, modify) bits</li>
                        <li>• (0,0): Not used, not modified - best victim</li>
                        <li>• (0,1): Not used, modified - must write to disk</li>
                        <li>• (1,0): Recently used, clean</li>
                        <li>• (1,1): Recently used, dirty - worst victim</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded mt-4 text-gray-300 text-xs font-mono">
{`// Clock algorithm pseudocode
frames = circular array of (page, ref_bit)
hand = 0

function access_page(page):
    if page not in memory:
        while True:
            if frames[hand].ref_bit == 0:
                evict(frames[hand].page)
                frames[hand] = (page, 1)
                hand = (hand + 1) % num_frames
                return PAGE_FAULT
            else:
                frames[hand].ref_bit = 0
                hand = (hand + 1) % num_frames
    else:
        set_ref_bit(page, 1)
        return HIT`}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Algorithm Comparison Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="p-3 text-left">Algorithm</th>
                      <th className="p-3 text-left">Page Fault Rate</th>
                      <th className="p-3 text-left">Implementation Cost</th>
                      <th className="p-3 text-left">Belady's Anomaly</th>
                      <th className="p-3 text-left">Real-World Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-white">
                      <td className="p-3 font-medium">FIFO</td>
                      <td className="p-3">High</td>
                      <td className="p-3">Very Low (queue)</td>
                      <td className="p-3">Yes</td>
                      <td className="p-3">Rarely</td>
                    </tr>
                    <tr className="border-b bg-white">
                      <td className="p-3 font-medium">Optimal</td>
                      <td className="p-3">Lowest (ideal)</td>
                      <td className="p-3">Impossible</td>
                      <td className="p-3">No</td>
                      <td className="p-3">Benchmark only</td>
                    </tr>
                    <tr className="border-b bg-white">
                      <td className="p-3 font-medium">LRU</td>
                      <td className="p-3">Low</td>
                      <td className="p-3">High (counters/stack)</td>
                      <td className="p-3">No</td>
                      <td className="p-3">Software caches</td>
                    </tr>
                    <tr className="border-b bg-white">
                      <td className="p-3 font-medium">Clock</td>
                      <td className="p-3">Medium-Low</td>
                      <td className="p-3">Low (single bit)</td>
                      <td className="p-3">No</td>
                      <td className="p-3">Linux, many UNIX systems</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-medium">LFU</td>
                      <td className="p-3">Medium</td>
                      <td className="p-3">Medium (counter per page)</td>
                      <td className="p-3">No</td>
                      <td className="p-3">Some database caches</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Belady's Anomaly</h4>
              <p className="text-sm text-gray-700 mb-3">
                Belady's anomaly is the counterintuitive phenomenon where increasing the number of page frames 
                can actually increase the number of page faults for certain algorithms (like FIFO).
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                  <p className="text-sm font-semibold text-gray-700">Reference String</p>
                  <p className="text-xs text-gray-600 mt-1 font-mono">1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5</p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                  <p className="text-sm font-semibold text-gray-700">FIFO Results</p>
                  <p className="text-xs text-gray-600 mt-1 font-mono">
                    3 frames: 9 page faults<br/>
                    4 frames: 10 page faults (!)<br/>
                    This is Belady's anomaly.
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                <strong>Why it happens with FIFO:</strong> The newly added frame changes the replacement order 
                in a way that evicts pages that will be needed soon. Stack algorithms (LRU, Optimal) 
                never exhibit Belady's anomaly.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactive Simulator */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-gray-500" />
              Interactive: Page Replacement Simulator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={algorithm === 'fifo' ? 'default' : 'outline'}
                onClick={() => { setAlgorithm('fifo'); resetSimulation(); }}
              >
                FIFO
              </Button>
              <Button 
                variant={algorithm === 'lru' ? 'default' : 'outline'}
                onClick={() => { setAlgorithm('lru'); resetSimulation(); }}
              >
                LRU
              </Button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Reference String</h4>
              <div className="flex flex-wrap gap-1">
                {reference.map((ref, i) => (
                  <span 
                    key={i} 
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      i === currentRef ? 'bg-gray-500 text-white' : 
                      i < currentRef ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {ref}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border border-gray-200">
                <h4 className="font-semibold mb-2">Frames (3 available)</h4>
                <div className="space-y-2">
                  {frames.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Frame {i}:</span>
                      <span className="px-3 py-1 rounded bg-gray-100 text-gray-700">
                        {f.page || 'Empty'}
                      </span>
                      <span className="text-xs text-gray-400">age: {f.age}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded border border-gray-200">
                <h4 className="font-semibold mb-2">Statistics</h4>
                <div className="space-y-2 text-sm">
                  <p>Current Step: {currentRef} / {reference.length}</p>
                  <p>Page Faults: <span className="text-gray-700 font-bold">{pageFaults}</span></p>
                  <p>Fault Rate: {currentRef > 0 ? ((pageFaults / currentRef) * 100).toFixed(1) : 0}%</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={simulateStep} disabled={currentRef >= reference.length}>
                Step
              </Button>
              <Button variant="outline" onClick={resetSimulation}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Frame Allocation */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-6 h-6 text-gray-500" />
              Frame Allocation Strategies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              When multiple processes compete for memory, the OS must decide how many frames to allocate to each process. 
              Two major decisions affect performance: how many frames each process gets, and whether replacement is 
              global or local.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Allocation Methods</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="text-sm font-semibold text-gray-700">Equal Allocation</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Divide m frames equally among n processes. Each gets m/n frames. 
                      Simple but unfair - small processes don't need as much.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="text-sm font-semibold text-gray-700">Proportional Allocation</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Allocate according to process size. If process size is s_i and total size is S, 
                      frames allocated = m * (s_i / S).
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="text-sm font-semibold text-gray-700">Priority Allocation</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Allocate based on process priority. Higher-priority processes get more frames 
                      to finish faster.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Replacement Scope</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="text-sm font-semibold text-gray-700">Local Replacement</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Each process can only replace its own frames. More predictable per-process performance, 
                      but may leave some frames underutilized.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="text-sm font-semibold text-gray-700">Global Replacement</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Any frame can be replaced, even ones belonging to other processes. 
                      Better overall utilization but one process can steal frames from another.
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// Proportional allocation example
Total frames = 100
Process A size = 10 pages
Process B size = 90 pages
Total pages = 100

Frames for A = 100 * (10/100) = 10
Frames for B = 100 * (90/100) = 90`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Thrashing */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-gray-500" />
              Thrashing and Working Sets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              <strong>Thrashing</strong> occurs when a process spends more time paging than executing. 
              If a process does not have enough frames for its working set, it will constantly page fault, 
              leading to catastrophic performance degradation.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Causes of Thrashing</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Overcommitment:</strong> Too many processes in memory</li>
                  <li><strong>Insufficient frames:</strong> A process needs more frames than allocated</li>
                  <li><strong>Working set &gt; allocated frames:</strong> Active pages don't fit in memory</li>
                  <li><strong>Global replacement:</strong> One process steals frames from another</li>
                </ul>
                <div className="bg-slate-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// Thrashing cycle
Process needs page A -> Page fault
OS evicts page B      -> Page fault
Process needs page B  -> Page fault
OS evicts page A      -> Page fault
(repeat endlessly)`}
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Working-Set Model</h4>
                <p className="text-sm text-gray-700 mb-2">
                  The working set W(t, delta) is the set of pages referenced by a process during the 
                  time interval (t - delta, t). If the working set fits in allocated frames, 
                  the process runs efficiently.
                </p>
                <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                  <p className="text-sm font-semibold text-gray-700">Working Set Size</p>
                  <p className="text-xs text-gray-600 mt-1">
                    delta (window size) is critical. Too small = misses locality. 
                    Too large = includes irrelevant pages. Typical: thousands of instructions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Page Fault Frequency vs Allocated Frames</h4>
              <pre className="text-gray-300 text-xs md:text-sm font-mono">
{`
Page Faults
    |
    |      .          Thrashing
    |     / \\         Region
    |    /   \\        (high faults)
    |   /     \\_______
    |  /
    | /
    |/_____________________ Frames
     |                   |
     |<- Insufficient    |-> Sufficient
        frames              frames

Control strategy:
  If fault rate > upper_limit: allocate MORE frames
  If fault rate < lower_limit: allocate FEWER frames
`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Page-Fault Frequency (PFF) Control</h4>
              <p className="text-sm text-gray-700 mb-3">
                The PFF strategy directly controls frame allocation based on the observed page fault rate:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                  <p className="text-sm font-semibold text-gray-700">High Page Fault Rate</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Process needs more frames. Allocate additional frames if available. 
                    If no frames available, suspend a process (swap out).
                  </p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                  <p className="text-sm font-semibold text-gray-700">Low Page Fault Rate</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Process has more frames than it needs. Reclaim frames from this process 
                    to give to others that need them more.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Preventing Thrashing: Summary</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="p-3 text-left">Approach</th>
                      <th className="p-3 text-left">How It Works</th>
                      <th className="p-3 text-left">Trade-off</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-white">
                      <td className="p-3 font-medium">Working Set Model</td>
                      <td className="p-3">Ensure each process gets frames for its working set</td>
                      <td className="p-3">Requires tracking page references; overhead</td>
                    </tr>
                    <tr className="border-b bg-white">
                      <td className="p-3 font-medium">Page-Fault Frequency</td>
                      <td className="p-3">Add/remove frames based on fault rate thresholds</td>
                      <td className="p-3">Simple but reactive; tuning thresholds is hard</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-medium">Process Suspension</td>
                      <td className="p-3">Swap out low-priority processes to free frames</td>
                      <td className="p-3">Reduces multiprogramming; swap overhead</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Memory-Mapped Files and Kernel Memory */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-6 h-6 text-gray-500" />
              Memory-Mapped Files and Kernel Memory Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Memory-Mapped Files</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Disk I/O is performed through memory rather than read()/write() system calls. 
                  A file is mapped to a range of virtual memory. Reading from the memory reads the file contents, 
                  and writing to the memory modifies the file.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• File I/O becomes as simple as memory access</li>
                  <li>• Shared memory between processes via shared file mapping</li>
                  <li>• Kernel manages caching through the page cache</li>
                  <li>• Lazy loading: pages read from disk only on demand</li>
                </ul>
                <div className="bg-slate-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// POSIX mmap for file I/O
#include <sys/mman.h>

int fd = open("file.txt", O_RDWR);
char *addr = mmap(NULL, length, PROT_READ|PROT_WRITE,
                   MAP_SHARED, fd, 0);

// Read as memory
char c = addr[0];

// Write as memory
addr[0] = 'X';
msync(addr, length, MS_ASYNC);

munmap(addr, length);`}
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Kernel Memory Allocation</h4>
                <p className="text-sm text-gray-700 mb-2">
                  The kernel needs memory for data structures, process tables, network buffers, etc. 
                  Kernel memory is often allocated from a separate pool and has different constraints than user memory.
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="text-sm font-semibold text-gray-700">Buddy System</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Allocates memory in power-of-2 sized blocks. Fast coalescing of freed blocks 
                      to reduce external fragmentation.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                    <p className="text-sm font-semibold text-gray-700">Slab Allocation</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Pre-allocates objects of fixed sizes. Used extensively in Linux. 
                      Eliminates fragmentation for common kernel structures (inodes, dentries, task_structs).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Buddy System Visualization</h4>
              <pre className="text-gray-300 text-xs md:text-sm font-mono">
{`
Initial: 1 block of size 16

Request 4:  Split 16 -> 8 + 8
             Split 8  -> 4 + 4
             Allocate one 4
             
    [Allocated 4] [Free 4] [Free 8]

Request 2:  Split remaining 4 -> 2 + 2
             Allocate one 2
             
    [Alloc 4] [Alloc 2] [Free 2] [Free 8]

Free 4:     Coalesce? Adjacent is Alloc 2, can't coalesce
            Add to free list of size 4
            
Free 2:     Buddy (the other 2) is free!
            Coalesce into 4.
            Buddy (the other 4) is free!
            Coalesce into 8.
            
    [Free 8] [Free 8]
    
Finally:    Coalesce into 16
    [Free 16]
`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Real World Backend Applications */}
      <motion.div {...fadeIn}>
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Terminal className="w-6 h-6 text-gray-400" />
              Real-World Backend Engineering Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Linux OOM Killer</h4>
                <p className="text-sm text-gray-300 mb-2">
                  When the system runs out of memory and cannot reclaim enough, the OOM killer terminates 
                  processes to free memory. It selects victims based on an "oom_score".
                </p>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check dmesg for OOM kills
dmesg | grep -i "killed process"

# Example output:
[12345.678901] Out of memory: Killed process 1234 (java)
               total-vm:4194304kB, anon-rss:2097152kB

# Check OOM score of a process
cat /proc/$(pidof myapp)/oom_score

# Make a process less likely to be killed
echo -1000 > /proc/$(pidof myapp)/oom_score_adj

# In Kubernetes:
resources:
  limits:
    memory: "1Gi"
`}
                </code>
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Backend lesson:</strong> Set memory limits and monitor OOM kills in production. 
                  Java apps are particularly vulnerable due to large heap sizes.
                </p>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Swap Tuning and vm.swappiness</h4>
                <p className="text-sm text-gray-300 mb-2">
                  The vm.swappiness parameter controls how aggressively Linux swaps memory pages to disk. 
                  Ranges from 0 (avoid swapping) to 100 (aggressive swapping).
                </p>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check current swappiness
cat /proc/sys/vm/swappiness

# Common recommendations:
# - Databases (MySQL, PostgreSQL, Redis): 1-10
# - General servers: 60 (default)
# - Desktops: 100

# Temporarily set to 10
sudo sysctl vm.swappiness=10

# Permanent in /etc/sysctl.conf
vm.swappiness=10

# Check swap usage
free -h
swapon -s
vmstat 1`}
                </code>
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Backend lesson:</strong> Database servers should have low swappiness because 
                  swapping database pages causes severe latency spikes.
                </p>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Memory Overcommit in Linux</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Linux allows processes to allocate more virtual memory than physical RAM + swap. 
                  This is safe because most processes don't use all allocated memory. However, 
                  if they do, the OOM killer intervenes.
                </p>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check overcommit policy
cat /proc/sys/vm/overcommit_memory

# Values:
# 0 = heuristic overcommit (default)
# 1 = always overcommit
# 2 = never overcommit

# Check overcommit ratio
cat /proc/sys/vm/overcommit_ratio

# Calculate commit limit:
# commit_limit = swap + (RAM * overcommit_ratio / 100)

# With 64GB RAM, 8GB swap, ratio=50:
# commit_limit = 8GB + 32GB = 40GB`}
                </code>
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Backend lesson:</strong> Overcommit enables running more containers, 
                  but you must monitor actual usage to avoid surprise OOM kills.
                </p>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Docker Memory Limits and Cgroups</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Docker uses Linux cgroups to enforce memory limits. When a container exceeds its limit, 
                  the kernel OOM-kills it. Understanding this is critical for containerized backend services.
                </p>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Docker memory controls
docker run \
  --memory=512m \
  --memory-swap=512m \
  --memory-reservation=256m \
  --kernel-memory=64m \
  myapp

# Monitor container memory
docker stats mycontainer

# Check cgroup limits inside container
cat /sys/fs/cgroup/memory/memory.limit_in_bytes
cat /sys/fs/cgroup/memory/memory.usage_in_bytes

# Calculate usage percentage
usage=$(cat /sys/fs/cgroup/memory/memory.usage_in_bytes)
limit=$(cat /sys/fs/cgroup/memory/memory.limit_in_bytes)
echo "scale=2; $usage * 100 / $limit" | bc`}
                </code>
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Backend lesson:</strong> Always set both memory limits and swap limits. 
                  Otherwise the process may swap instead of being killed, causing worse performance.
                </p>
              </div>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-400 mb-2">Detecting and Fixing Page Fault Issues</h4>
              <p className="text-sm text-gray-300 mb-2">
                High page fault rates can cripple application performance. Use these tools to diagnose issues.
              </p>
              <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Monitor page faults for a process
ps -o min_flt,maj_flt,pid,comm -p $(pidof myapp)

# min_flt = minor page faults (no disk I/O)
# maj_flt = major page faults (disk I/O required)

# Use perf for detailed analysis
perf stat -e page-faults,minor-faults,major-faults ./myapp

# Use pidstat for continuous monitoring
pidstat -r -p $(pidof myapp) 1

# Major page faults indicate:
# 1. Process was swapped out
# 2. Memory-mapped file not in cache
# 3. Insufficient RAM / thrashing

# Fix strategies:
# 1. Add more RAM
# 2. Reduce process working set
# 3. Use mlock() for critical pages
# 4. Pre-warm memory with mincore()`}
              </code>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-400 mb-2">JVM Garbage Collection and Virtual Memory</h4>
              <p className="text-sm text-gray-300 mb-2">
                Java applications interact heavily with virtual memory. Large heaps, GC pauses, and swap 
                usage are common backend concerns.
              </p>
              <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# JVM heap sizing relative to container limits
# NEVER set -Xmx equal to container limit!
# Leave room for JVM overhead, native memory, thread stacks

# Example: 2GB container
java -Xmx1536m -XX:MaxMetaspaceSize=256m -jar app.jar

# Enable container-aware memory limits (Java 10+)
java -XX:+UseContainerSupport -jar app.jar

# Check GC logs for memory pressure
java -Xlog:gc*:file=gc.log -jar app.jar

# Major page faults during GC?
# This indicates heap pages were swapped out.
# Solution: disable swap or reduce heap size.`}
              </code>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-gray-500" />
              Virtualization and Advanced Memory Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Nested Paging and Shadow Page Tables</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Hardware virtualization uses two levels of address translation. The guest OS maintains its own page tables (gVA → gPA), while the hypervisor uses nested page tables (gPA → hPA). On Intel this is Extended Page Tables (EPT); on AMD it is Nested Page Tables (NPT).
                </p>
                <p className="text-sm text-gray-700">
                  Without hardware support, the hypervisor must maintain <strong>shadow page tables</strong> that combine both translations. Every guest page-table modification traps to the hypervisor, causing massive overhead. EPT/NPT reduces this to a hardware-managed two-dimensional walk.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# Two-dimensional page walk with EPT
Guest PT:  gVA -> gPA
EPT:       gPA -> hPA
Result:    gVA -> hPA (via hardware)

# TLB caches the full translation
# EPT violation (missing mapping) causes VM-exit
# Shadow PTs are only used for legacy CPUs`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Memory Ballooning and Overcommit</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Hypervisors use balloon drivers to dynamically reclaim memory from guests. The hypervisor inflates the balloon by requesting the guest kernel to allocate pinned pages, which are then returned to the host. Deflating the balloon returns pages to the guest.
                </p>
                <p className="text-sm text-gray-700">
                  Ballooning is preferable to hypervisor-level swapping because the guest OS knows which pages are least valuable. It allows safe overcommitment ratios of 1.5:1 or higher in virtualized datacenters.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# QEMU/KVM balloon driver
-device virtio-balloon-pci,id=balloon0

# Inflate balloon (reclaim from guest)
virsh qemu-monitor-command vm --hmp balloon 2048

# Check balloon stats inside guest
cat /sys/devices/system/memory/balloon_size`}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Persistent Memory (PMem)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Intel Optane DC Persistent Memory provides byte-addressable, non-volatile storage on the memory bus. It bridges the gap between DRAM and SSDs, offering microsecond latencies and persistence.
                </p>
                <p className="text-sm text-gray-700">
                  The SNIA programming model defines three modes: <strong>Memory Mode</strong> (PMem acts as large volatile DRAM with DRAM as cache), <strong>App Direct Mode</strong> (PMem is exposed as a device via DAX), and <strong>Storage over App Direct</strong> (traditional block device on PMem).
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// DAX mapping of persistent memory
#include <libpmem.h>

void *addr = pmem_map_file("/dev/dax0.0", len,
                            PMEM_FILE_CREATE, 0666, &mapped_len, &is_pmem);
// Stores bypass page cache; data persists across reboots
pmem_memcpy_persist(addr, src, len);
pmem_unmap(addr, mapped_len);`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Memory Compression (zRAM, zswap)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>zRAM</strong> creates a compressed block device in RAM for swap. It is ideal for embedded systems and containers with no physical swap disk. <strong>zswap</strong> is a compressed front-end to a real swap device: pages are compressed in RAM and only written to disk if the pool is full.
                </p>
                <p className="text-sm text-gray-700">
                  Both reduce I/O amplification and extend effective memory capacity at the cost of CPU cycles for compression/decompression. Typical compression ratios are 2:1 to 3:1.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# Enable zRAM
modprobe zram num_devices=1
echo 1G > /sys/block/zram0/disksize
mkswap /dev/zram0
swapon /dev/zram0 -p 32767  # highest priority

# Enable zswap
echo 1 > /sys/module/zswap/parameters/enabled
echo zstd > /sys/module/zswap/parameters/compressor`}
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
              <Terminal className="w-6 h-6 text-gray-500" />
              Production Memory Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Container Memory Limits and OOM Behavior</h4>
                <p className="text-sm text-gray-700 mb-2">
                  cgroup v2 uses <code>memory.max</code> for the hard limit and <code>memory.high</code> for throttling pressure. When a cgroup exceeds <code>memory.high</code>, the kernel reclaims aggressively. When it exceeds <code>memory.max</code>, the OOM killer terminates tasks.
                </p>
                <p className="text-sm text-gray-700">
                  Java and other runtimes with large heaps are particularly susceptible because RSS (resident set) includes heap, metaspace, thread stacks, and off-heap native memory. Setting <code>-Xmx</code> equal to the container limit guarantees OOM kills.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# cgroup v2 memory controls
echo 1G > /sys/fs/cgroup/myapp/memory.max
echo 900M > /sys/fs/cgroup/myapp/memory.high

# Kubernetes maps:
# limits.memory -> memory.max
# requests.memory -> used by scheduler only

# JVM safe sizing: -Xmx ≈ 0.75 * memory.limit_in_bytes`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Memory Tiering and AutoNUMA</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Modern systems mix DRAM, PMem, and CXL-attached memory into a tiered hierarchy. Linux <strong>memory tiering</strong> (introduced in kernel 5.x+) automatically migrates hot pages to fast tiers and cold pages to slow tiers.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>AutoNUMA</strong> continuously samples page accesses and migrates pages toward the accessing CPU's local NUMA node. It is enabled by default and balances the overhead of migration against the latency savings of local access.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# Check AutoNUMA status
cat /proc/sys/kernel/numa_balancing  # 1 = enabled

# Tune scan rate
echo 1000 > /proc/sys/kernel/numa_balancing_scan_period_min_ms

# Memory tiering sysfs
ls /sys/devices/system/node/node*/memory_tier`}
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Virtual Memory Troubleshooting Workflow</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
1. High latency + high maj_flt:
   -> Check if process is swapped out (cat /proc/PID/status | grep VmSwap)
   -> Add RAM or reduce working set

2. Container OOMKilled:
   -> Check memory.limit_in_bytes vs RSS+Cache
   -> Reduce -Xmx or increase limit
   -> Enable memory.high for early pressure signals

3. High page fault rate but low swap:
   -> mmap'd files not in page cache
   -> Pre-warm with vmtouch or sequential read

4. NUMA remote access > 30%:
   -> Use numactl --membind or enable AutoNUMA
   -> Consider interleave for large arrays
`}
              </pre>
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
                "Virtual memory separates logical from physical memory, allowing processes larger than RAM to run",
                "Demand paging loads pages only when referenced; page faults are extremely expensive due to disk I/O",
                "Effective access time: EAT = (1-p)*t_mem + p*t_pagefault. Keep p extremely low for good performance",
                "Copy-on-Write (COW) makes fork() efficient by sharing pages and copying only on write",
                "Page replacement algorithms: FIFO is simple but can suffer Belady's anomaly; LRU is optimal among practical algorithms; Clock is the practical approximation used in most systems",
                "Frame allocation can be equal, proportional, or priority-based; replacement can be local or global",
                "Thrashing occurs when allocated frames are less than the working set; solutions include working-set model and page-fault frequency control",
                "Memory-mapped files (mmap) enable efficient file I/O by treating files as memory regions",
                "Real-world: Monitor OOM kills, tune vm.swappiness for databases, understand Docker memory limits, and track major page faults in production"
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
