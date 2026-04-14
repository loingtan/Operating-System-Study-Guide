import { motion } from 'framer-motion';
import { 
  Cpu, Layers, GitBranch, ArrowRight,
  CheckCircle, Code, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter4() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 4</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Threads</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Deep dive into threads, multithreading models, thread libraries, and threading issues
        </p>
      </motion.div>

      {/* What is a Thread - Deep Dive */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-gray-500" />
              What is a Thread? (Deep Dive)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                A <strong>thread</strong> is the smallest unit of CPU execution. It is a basic unit of CPU utilization; 
                it comprises a thread ID, a program counter, a register set, and a stack. 
                A thread shares with other threads belonging to the same process its code section, 
                data section, and other operating-system resources, such as open files and signals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">What Threads Share (Per-Process)</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Code Section:</strong> Program instructions (text segment)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Data Section:</strong> Global and static variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Heap:</strong> Dynamically allocated memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Open Files:</strong> File descriptors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Signals:</strong> Signal handlers and masks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Current Working Directory:</strong> Process CWD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>User and Group IDs:</strong> Credentials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">What Each Thread Has (Per-Thread)</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Thread ID:</strong> Unique identifier within process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Program Counter:</strong> Next instruction to execute</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Register Set:</strong> CPU register values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Stack:</strong> Local variables, function calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Scheduling State:</strong> Ready, running, waiting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>errno:</strong> Per-thread error number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-gray-600" />
                    <span><strong>Signal Mask:</strong> Per-thread signal blocking</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Process vs Thread Analogy</h4>
              <p className="text-sm text-gray-700">
                Think of a process as a <strong>house</strong> and threads as <strong>people living in it</strong>. 
                They all share the house's resources (kitchen, bathroom, living room = code, data, files), 
                but each person has their own personal items (clothes, toothbrush = registers, stack).
              </p>
              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm">Process = House</p>
                  <p className="text-xs text-gray-600">Has address space, resources, protection boundary</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm">Thread = Person</p>
                  <p className="text-xs text-gray-600">Has execution context, can work independently</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Benefits - Detailed */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-gray-500" />
              Benefits of Multithreading (Detailed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">1. Responsiveness</h4>
                  <p className="text-sm text-gray-700">
                    One thread can handle user input while another performs a long computation. 
                    The application remains responsive even when part of it is blocked.
                  </p>
                  <div className="mt-3 bg-white p-3 rounded">
                    <p className="text-xs text-gray-600 font-semibold">Examples:</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• Web browser: UI thread + network thread</li>
                      <li>• IDE: Editor thread + compiler thread</li>
                      <li>• Games: Render thread + physics thread</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">2. Resource Sharing</h4>
                  <p className="text-sm text-gray-700">
                    Threads share the same memory space, making data sharing easier than 
                    between processes (no IPC needed).
                  </p>
                  <div className="mt-3 bg-white p-3 rounded">
                    <p className="text-xs text-gray-600 font-semibold">Advantages:</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• No need for shared memory or message passing</li>
                      <li>• Direct access to shared data structures</li>
                      <li>• Lower overhead than process communication</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">3. Economy</h4>
                  <p className="text-sm text-gray-700">
                    Creating and context-switching threads is cheaper than processes. 
                    Thread creation is 10-100x faster than process creation.
                  </p>
                  <div className="mt-3 bg-white p-3 rounded">
                    <p className="text-xs text-gray-600 font-semibold">Cost Comparison:</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• Process creation: Copy memory, file descriptors, etc.</li>
                      <li>• Thread creation: Just stack and registers (~1ms)</li>
                      <li>• Context switch: Threads ~1-10μs, Processes ~10-100μs</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">4. Scalability</h4>
                  <p className="text-sm text-gray-700">
                    Multiple threads can run in parallel on multiple CPU cores, 
                    utilizing the full power of modern processors.
                  </p>
                  <div className="mt-3 bg-white p-3 rounded">
                    <p className="text-xs text-gray-600 font-semibold">Benefits:</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• True parallelism on multi-core systems</li>
                      <li>• Better CPU utilization</li>
                      <li>• Throughput scales with cores</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Multithreading Models - Detailed */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-gray-500" />
              Multithreading Models (Detailed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="many-to-one" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="many-to-one">Many-to-One</TabsTrigger>
                <TabsTrigger value="one-to-one">One-to-One</TabsTrigger>
                <TabsTrigger value="many-to-many">Many-to-Many</TabsTrigger>
              </TabsList>

              <TabsContent value="many-to-one" className="mt-4">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 mb-4">
                        Many user-level threads mapped to a single kernel thread. 
                        Thread management is done in user space by a thread library.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">Limitations</h4>
                        <ul className="text-sm text-gray-700 space-y-2 mt-2">
                          <li>• Cannot run in parallel on multiple cores</li>
                          <li>• Blocking system call blocks all threads</li>
                          <li>• No true concurrency</li>
                          <li>• Rarely used today</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h4 className="font-semibold text-gray-900">Advantages</h4>
                        <ul className="text-sm text-gray-700 space-y-2 mt-2">
                          <li>• Fast thread operations (no kernel involvement)</li>
                          <li>• Portable (works on any OS)</li>
                          <li>• Low overhead</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Architecture Diagram</h4>
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-20 h-10 bg-blue-300 rounded flex items-center justify-center text-xs font-semibold">User T1</div>
                          <div className="w-20 h-10 bg-blue-300 rounded flex items-center justify-center text-xs font-semibold">User T2</div>
                          <div className="w-20 h-10 bg-blue-300 rounded flex items-center justify-center text-xs font-semibold">User T3</div>
                          <div className="w-20 h-10 bg-blue-300 rounded flex items-center justify-center text-xs font-semibold">User T4</div>
                        </div>
                        <ArrowRight className="w-6 h-6 rotate-90 text-gray-500" />
                        <div className="w-24 h-10 bg-red-300 rounded flex items-center justify-center text-xs font-semibold">Kernel T</div>
                        <ArrowRight className="w-6 h-6 rotate-90 text-gray-500" />
                        <div className="w-28 h-10 bg-green-300 rounded flex items-center justify-center text-xs font-semibold">Single CPU</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        All user threads share one kernel thread
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="one-to-one" className="mt-4">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 mb-4">
                        Each user thread maps to exactly one kernel thread. 
                        This is the most common model used today (Linux, Windows, macOS).
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">Advantages</h4>
                        <ul className="text-sm text-gray-700 space-y-2 mt-2">
                          <li>• True parallelism on multiple cores</li>
                          <li>• Blocking calls don't block other threads</li>
                          <li>• Simple to implement and understand</li>
                          <li>• Most common today</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h4 className="font-semibold text-gray-900">Limitations</h4>
                        <ul className="text-sm text-gray-700 space-y-2 mt-2">
                          <li>• Creating user thread requires creating kernel thread (overhead)</li>
                          <li>• OS may limit number of kernel threads</li>
                          <li>• More resource usage than many-to-one</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Architecture Diagram</h4>
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-20 h-10 bg-blue-300 rounded flex items-center justify-center text-xs font-semibold">User T1</div>
                          <div className="w-20 h-10 bg-blue-300 rounded flex items-center justify-center text-xs font-semibold">User T2</div>
                          <div className="w-20 h-10 bg-blue-300 rounded flex items-center justify-center text-xs font-semibold">User T3</div>
                          <div className="w-20 h-10 bg-blue-300 rounded flex items-center justify-center text-xs font-semibold">User T4</div>
                        </div>
                        <ArrowRight className="w-6 h-6 rotate-90 text-gray-500" />
                        <div className="flex gap-2">
                          <div className="w-20 h-10 bg-red-300 rounded flex items-center justify-center text-xs font-semibold">Kernel T1</div>
                          <div className="w-20 h-10 bg-red-300 rounded flex items-center justify-center text-xs font-semibold">Kernel T2</div>
                          <div className="w-20 h-10 bg-red-300 rounded flex items-center justify-center text-xs font-semibold">Kernel T3</div>
                          <div className="w-20 h-10 bg-red-300 rounded flex items-center justify-center text-xs font-semibold">Kernel T4</div>
                        </div>
                        <ArrowRight className="w-6 h-6 rotate-90 text-gray-500" />
                        <div className="w-32 h-10 bg-green-300 rounded flex items-center justify-center text-xs font-semibold">Multi-core CPU</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        Each user thread has its own kernel thread
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="many-to-many" className="mt-4">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 mb-4">
                        Many user threads multiplexed to a smaller or equal number of kernel threads. 
                        Best of both worlds - flexibility with performance.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">Advantages</h4>
                        <ul className="text-sm text-gray-700 space-y-2 mt-2">
                          <li>• No limit on user threads</li>
                          <li>• True parallelism when needed</li>
                          <li>• Blocking calls don't block everything</li>
                          <li>• Flexible resource allocation</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h4 className="font-semibold text-gray-900">How It Works</h4>
                        <ul className="text-sm text-gray-700 space-y-2 mt-2">
                          <li>• User threads managed by thread library</li>
                          <li>• Kernel threads scheduled by OS</li>
                          <li>• Library maps user threads to kernel threads</li>
                          <li>• Can have more user threads than kernel threads</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Architecture Diagram</h4>
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex gap-1 flex-wrap justify-center">
                          <div className="w-14 h-8 bg-blue-300 rounded flex items-center justify-center text-xs">T1</div>
                          <div className="w-14 h-8 bg-blue-300 rounded flex items-center justify-center text-xs">T2</div>
                          <div className="w-14 h-8 bg-blue-300 rounded flex items-center justify-center text-xs">T3</div>
                          <div className="w-14 h-8 bg-blue-300 rounded flex items-center justify-center text-xs">T4</div>
                          <div className="w-14 h-8 bg-blue-300 rounded flex items-center justify-center text-xs">T5</div>
                          <div className="w-14 h-8 bg-blue-300 rounded flex items-center justify-center text-xs">T6</div>
                        </div>
                        <ArrowRight className="w-6 h-6 rotate-90 text-gray-500" />
                        <div className="flex gap-2">
                          <div className="w-20 h-10 bg-red-300 rounded flex items-center justify-center text-xs font-semibold">KT1</div>
                          <div className="w-20 h-10 bg-red-300 rounded flex items-center justify-center text-xs font-semibold">KT2</div>
                          <div className="w-20 h-10 bg-red-300 rounded flex items-center justify-center text-xs font-semibold">KT3</div>
                        </div>
                        <ArrowRight className="w-6 h-6 rotate-90 text-gray-500" />
                        <div className="w-32 h-10 bg-green-300 rounded flex items-center justify-center text-xs font-semibold">Multi-core CPU</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        6 user threads mapped to 3 kernel threads
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Thread Libraries - Detailed */}
      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-6 h-6 text-gray-500" />
              Thread Libraries (Detailed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-5">
                  <h4 className="font-semibold mb-2">POSIX Pthreads</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Standard API for thread creation and synchronization on Unix-like systems.
                  </p>
                  <code className="block p-3 bg-slate-900 rounded text-gray-300 text-xs">
{`#include <pthread.h>

void* thread_func(void* arg) {
    printf("Thread running\\n");
    return NULL;
}

int main() {
    pthread_t tid;
    
    // Create thread
    pthread_create(&tid, NULL, 
                   thread_func, NULL);
    
    // Wait for thread
    pthread_join(tid, NULL);
    
    return 0;
}`}
                  </code>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 font-semibold">Features:</p>
                    <ul className="text-xs text-gray-500 mt-1 space-y-1">
                      <li>• pthread_mutex_lock/unlock</li>
                      <li>• pthread_cond_wait/signal</li>
                      <li>• pthread_rwlock</li>
                      <li>• pthread_barrier</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <h4 className="font-semibold mb-2">Java Threads</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Managed by JVM, mapped to OS threads. Rich synchronization primitives.
                  </p>
                  <code className="block p-3 bg-slate-900 rounded text-gray-300 text-xs">
{`// Method 1: Extend Thread
class MyThread extends Thread {
    public void run() {
        System.out.println("Running");
    }
}

// Method 2: Implement Runnable
Thread t = new Thread(() -> {
    System.out.println("Running");
});

t.start();  // Start thread
t.join();   // Wait for completion

// Modern: ExecutorService
ExecutorService executor = 
    Executors.newFixedThreadPool(4);`}
                  </code>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 font-semibold">Features:</p>
                    <ul className="text-xs text-gray-500 mt-1 space-y-1">
                      <li>• synchronized keyword</li>
                      <li>• ReentrantLock</li>
                      <li>• Semaphore, CountDownLatch</li>
                      <li>• CompletableFuture</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <h4 className="font-semibold mb-2">C++ std::thread</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Modern C++ thread support (C++11 and later).
                  </p>
                  <code className="block p-3 bg-slate-900 rounded text-gray-300 text-xs">
{`#include <thread>
#include <mutex>

void thread_func(int arg) {
    std::cout << "Thread " << arg;
}

int main() {
    // Create thread
    std::thread t(thread_func, 42);
    
    // Wait for completion
    t.join();
    
    // Or detach (run independently)
    // t.detach();
    
    // Lambda
    std::thread t2([]() {
        std::cout << "Lambda thread";
    });
    t2.join();
    
    return 0;
}`}
                  </code>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 font-semibold">Features:</p>
                    <ul className="text-xs text-gray-500 mt-1 space-y-1">
                      <li>• std::mutex, std::lock_guard</li>
                      <li>• std::condition_variable</li>
                      <li>• std::async, std::future</li>
                      <li>• std::atomic</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Thread Issues - Detailed */}
      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-gray-500" />
              Threading Issues (Detailed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">fork() and exec()</h4>
                <p className="text-sm text-gray-700">
                  Does fork() duplicate only the calling thread or all threads?
                </p>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>• <strong>Unix:</strong> Both options available</li>
                  <li>• <strong>Default:</strong> Only calling thread duplicated</li>
                  <li>• <strong>pthread_atfork():</strong> Register handlers</li>
                  <li>• <strong>exec():</strong> Replaces entire process (all threads)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Signal Handling</h4>
                <p className="text-sm text-gray-700">
                  Signals can be delivered to process or specific thread.
                </p>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>• <strong>Synchronous:</strong> Go to causing thread (SIGSEGV)</li>
                  <li>• <strong>Asynchronous:</strong> May go to any thread (SIGINT)</li>
                  <li>• <strong>Per-thread masks:</strong> Each thread can block signals</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Thread Cancellation</h4>
                <p className="text-sm text-gray-700">
                  Terminating a thread before it completes.
                </p>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>• <strong>Asynchronous:</strong> Terminate immediately (dangerous)</li>
                  <li>• <strong>Deferred:</strong> Check cancellation points</li>
                  <li>• <strong>Cleanup:</strong> Register cleanup handlers</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Thread-Local Storage</h4>
                <p className="text-sm text-gray-700">
                  Each thread needs its own copy of some data.
                </p>
                <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// GCC
__thread int thread_local_var;

// C++11
thread_local int tls_var;

// Java
ThreadLocal<Integer> tls = 
    new ThreadLocal<>();`}
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
              <Cpu className="w-6 h-6 text-gray-500" />
              Advanced Topic: NUMA, TLS, and Scheduler Activations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                On modern servers with hundreds of cores, thread performance is determined by memory topology and scheduling placement. Advanced thread models like scheduler activations and coroutines address limitations of native 1:1 threading.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">NUMA-Aware Thread Scheduling</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Non-Uniform Memory Access (NUMA) means memory access latency depends on which CPU socket a thread runs on. The Linux scheduler uses <strong>numa_balancing</strong> and <strong>MPOL_BIND</strong> to optimize placement.
                </p>
                <div className="bg-white p-3 rounded mb-3 font-mono text-xs text-gray-600">
{`Socket 0 (NUMA node 0)
  CPU 0-31  ── Local Memory ── 128GB
Socket 1 (NUMA node 1)
  CPU 32-63 ── Local Memory ── 128GB
Interconnect: UPI/Infinity Fabric`}
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>numactl</strong> binds processes to specific nodes. <strong>libnuma</strong> allows explicit memory allocation policies.
                </p>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Bind process to node 0, allocate memory on node 0
numactl --cpunodebind=0 --membind=0 ./server

// C: allocate from specific NUMA node
void *ptr = numa_alloc_onnode(size, 0);`}
                </code>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Thread-Local Storage (TLS) Internals</h4>
                <p className="text-sm text-gray-700 mb-3">
                  TLS gives each thread private copies of variables without locking. On x86_64, the FS or GS segment register points to the Thread Control Block (TCB), enabling fast O(1) access.
                </p>
                <div className="bg-white p-3 rounded mb-3 font-mono text-xs text-gray-600">
{`// x86_64 Linux: FS points to TCB
mov %fs:0x10, %rax   // load TLS variable
// No cache-line contention!`}
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>ELF TLS models:</strong> global-dynamic (shared libs), local-dynamic, initial-exec (main executable), local-exec (fastest, no indirection).
                </p>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// C++11 thread_local uses __thread (ELF TLS)
thread_local int request_count = 0;

// Java: ThreadLocal uses a ThreadLocalMap 
// stored in the Thread object`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
              <h4 className="font-semibold text-gray-900 mb-3">Scheduler Activations and the N:M Threading Model Revival</h4>
              <p className="text-sm text-gray-700 mb-3">
                The <strong>scheduler activations</strong> paper (Anderson et al., 1992) proposed an N:M threading model where a user-space scheduler multiplexes many user threads onto fewer kernel threads, with the kernel notifying the user scheduler of blocking events.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">Why N:M Faded and Returned</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• <strong>Faded:</strong> Early implementations (GNU pth, Solaris LWP) were complex and had poor I/O integration</li>
                    <li>• <strong>Revival:</strong> Go goroutines, Rust async/await, and Java Virtual Threads (Project Loom) are modern N:M models with better kernel integration</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-700">Go Scheduler (M:P:G Model)</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• <strong>M:</strong> OS thread (kernel thread)</li>
                    <li>• <strong>P:</strong> Logical processor (holds run queue)</li>
                    <li>• <strong>G:</strong> Goroutine (user thread)</li>
                    <li>• Work stealing balances load across Ps</li>
                  </ul>
                </div>
              </div>
              <code className="block mt-3 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// Go: millions of goroutines on a handful of OS threads
func main() {
    for i := 0; i < 1000000; i++ {
        go func() { /* lightweight task */ }()
    }
    time.Sleep(time.Second)
}`}
              </code>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Coroutines vs Threads vs Green Threads</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Model</th>
                      <th className="p-3 text-left">Preemption</th>
                      <th className="p-3 text-left">Kernel Awareness</th>
                      <th className="p-3 text-left">Memory Overhead</th>
                      <th className="p-3 text-left">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">OS Thread (1:1)</td>
                      <td className="p-3">Preemptive</td>
                      <td className="p-3">Yes</td>
                      <td className="p-3">~1-8 MB stack</td>
                      <td className="p-3">pthread, std::thread, Java Thread</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Green Thread (M:N)</td>
                      <td className="p-3">Cooperative</td>
                      <td className="p-3">No</td>
                      <td className="p-3">~4-64 KB</td>
                      <td className="p-3">Erlang processes, Go goroutines</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Coroutine (stackful)</td>
                      <td className="p-3">Cooperative</td>
                      <td className="p-3">No</td>
                      <td className="p-3">~few KB</td>
                      <td className="p-3">Boost.Coroutine, Lua</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Async/Await (stackless)</td>
                      <td className="p-3">Cooperative</td>
                      <td className="p-3">No</td>
                      <td className="p-3">State machine</td>
                      <td className="p-3">Rust async, C# async, JS promises</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
              <h4 className="font-semibold text-gray-900 mb-3">RCU: Read-Copy-Update</h4>
              <p className="text-sm text-gray-700 mb-3">
                RCU is a synchronization mechanism optimized for read-heavy data structures. Readers proceed with <em>zero</em> locking or atomic operations. Writers copy the data structure, modify the copy, and atomically update the pointer.
              </p>
              <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`// Reader path: no locks, no atomics!
rcu_read_lock();
struct config *cfg = rcu_dereference(global_config);
// read cfg...
rcu_read_unlock();

// Writer path: copy, modify, swap
struct config *new_cfg = kmalloc(...);
*new_cfg = *old_cfg;
new_cfg->timeout = 5000;
rcu_assign_pointer(global_config, new_cfg);
synchronize_rcu();  // wait for all readers to finish
kfree(old_cfg);`}
              </code>
              <p className="text-xs text-gray-600 mt-2">
                RCU is used extensively in the Linux kernel for routing tables, dcache, and scheduler runqueues. It enables millions of concurrent reads on multi-socket servers.
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
                "Threads share process resources but have independent execution flow (PC, registers, stack)",
                "Threads are lighter than processes - faster creation and context switch",
                "One-to-one model is most common today (native threads mapped to kernel threads)",
                "Multithreading enables responsiveness, resource sharing, and parallelism",
                "Thread synchronization is crucial (covered in next chapter)",
                "Thread libraries: Pthreads (C), Java Threads, C++ std::thread",
                "Thread-local storage allows per-thread data without synchronization"
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
