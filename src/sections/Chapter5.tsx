import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock, Users, AlertTriangle, CheckCircle,
  Play, Pause, RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter5() {
  const [counter, setCounter] = useState(5);
  const [processA, setProcessA] = useState<'idle' | 'reading' | 'incrementing' | 'writing'>('idle');
  const [processB, setProcessB] = useState<'idle' | 'reading' | 'decrementing' | 'writing'>('idle');
  const [log, setLog] = useState<string[]>([]);

  const simulateRaceCondition = async () => {
    setLog([]);
    setCounter(5);

    setProcessA('reading');
    setLog(prev => [...prev, "Process A reads counter = 5"]);
    await new Promise(r => setTimeout(r, 500));

    setProcessB('reading');
    setLog(prev => [...prev, "Process B reads counter = 5"]);
    await new Promise(r => setTimeout(r, 500));

    setProcessA('incrementing');
    setLog(prev => [...prev, "Process A increments: 5 + 1 = 6"]);
    await new Promise(r => setTimeout(r, 500));

    setProcessB('decrementing');
    setLog(prev => [...prev, "Process B decrements: 5 - 1 = 4"]);
    await new Promise(r => setTimeout(r, 500));

    setProcessA('writing');
    setLog(prev => [...prev, "Process A writes 6"]);
    setCounter(6);
    await new Promise(r => setTimeout(r, 500));

    setProcessB('writing');
    setLog(prev => [...prev, "Process B writes 4 (OVERWRITES!)"]);
    setCounter(4);
    await new Promise(r => setTimeout(r, 500));

    setProcessA('idle');
    setProcessB('idle');
    setLog(prev => [...prev, "Expected: 5, Got: 4 (Race Condition!)"]);
  };

  return (
    <div className="space-y-8">
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 5</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Process Synchronization</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Critical sections, race conditions, semaphores, and classic synchronization problems
        </p>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-gray-500" />
              Interactive: Race Condition Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Two processes access a shared counter. Without synchronization,
              the result depends on timing - this is a <strong>race condition</strong>.
            </p>

            <div className="flex justify-center">
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-2">Shared Counter</p>
                <div className="text-4xl font-bold text-gray-600">{counter}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-2 ${
                processA !== 'idle' ? 'border-gray-500 bg-gray-50' : 'border-gray-200'
              }`}>
                <h4 className="font-semibold mb-2">Process A (counter++)</h4>
                <div className="flex items-center gap-2">
                  {processA === 'idle' && <Pause className="w-5 h-5 text-gray-400" />}
                  {processA === 'reading' && <Play className="w-5 h-5 text-gray-500" />}
                  {processA === 'incrementing' && <RotateCcw className="w-5 h-5 text-gray-500 animate-spin" />}
                  {processA === 'writing' && <Play className="w-5 h-5 text-gray-500" />}
                  <span className="capitalize">{processA}</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${
                processB !== 'idle' ? 'border-gray-500 bg-gray-50' : 'border-gray-200'
              }`}>
                <h4 className="font-semibold mb-2">Process B (counter--)</h4>
                <div className="flex items-center gap-2">
                  {processB === 'idle' && <Pause className="w-5 h-5 text-gray-400" />}
                  {processB === 'reading' && <Play className="w-5 h-5 text-gray-500" />}
                  {processB === 'decrementing' && <RotateCcw className="w-5 h-5 text-gray-500 animate-spin" />}
                  {processB === 'writing' && <Play className="w-5 h-5 text-gray-500" />}
                  <span className="capitalize">{processB}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={simulateRaceCondition}
              disabled={processA !== 'idle' || processB !== 'idle'}
              className="w-full"
            >
              Simulate Race Condition
            </Button>

            {log.length > 0 && (
              <div className="bg-slate-900 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">Execution Log:</h4>
                {log.map((entry, i) => (
                  <div key={i} className="text-gray-300 text-xs font-mono">
                    {entry}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-gray-500" />
              The Critical Section Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              A <strong>critical section</strong> is a segment of code where a process accesses shared resources
              (variables, data structures, files, devices). When multiple processes execute their critical sections
              concurrently, race conditions can occur. A correct solution must satisfy three fundamental requirements.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">1. Mutual Exclusion</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    If process Pi is executing in its critical section, then no other process can be executing in its critical section.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">2. Progress</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    If no process is in its critical section and some processes wish to enter, then only those processes not in their remainder section can participate in the decision, and the selection cannot be postponed indefinitely.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">3. Bounded Waiting</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    There exists a bound on the number of times other processes are allowed to enter their critical sections after a process has made a request and before that request is granted.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-3">General Structure</h4>
              <pre className="text-sm font-mono text-gray-300">
{`do {
    entry_section();      // Request permission to enter critical section

    critical_section();   // Access shared resources

    exit_section();       // Release, allow others to enter

    remainder_section();  // Non-critical code
} while (true);`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Why This Matters in Practice</h4>
              <p className="text-sm text-gray-700 mb-3">
                In backend systems, critical sections appear everywhere: incrementing a request counter,
                appending to a shared log buffer, updating a database connection pool size, or modifying a cache entry.
                Without proper synchronization, you can lose updates, corrupt data structures, or cause inconsistent state.
              </p>
              <div className="bg-white p-3 rounded border text-sm text-gray-700">
                <strong>Example:</strong> A global counter tracking total requests processed by a web server.
                If two threads increment it simultaneously without mutual exclusion, some increments may be lost,
                leading to under-reported metrics.
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-gray-500" />
              Peterson's Solution (Software-Based)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Peterson's solution is a classic software-based solution for two processes that satisfies all three critical-section requirements.
              It requires no special hardware instructions, only shared memory. However, it relies on proper memory ordering,
              which modern CPUs with out-of-order execution may violate without memory barriers.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">Shared Variables</h4>
                <pre className="text-gray-300 text-xs">
{`int turn;           // Whose turn is it? (0 or 1)
bool flag[2];       // flag[i] = true if Pi wants to enter`}
                </pre>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">Process i's Code</h4>
                <pre className="text-gray-300 text-xs">
{`flag[i] = true;
turn = j;           // Give turn to the other process
while (flag[j] && turn == j) {
    ; // busy wait
}

// Critical Section

critical_section();

flag[i] = false;    // Exit section

remainder_section();`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">How Peterson's Solution Works</h4>
              <ol className="space-y-2 text-sm text-gray-700">
                <li><strong>1. Declaration of intent:</strong> Process i sets <code>flag[i] = true</code> to indicate it wants to enter.</li>
                <li><strong>2. Politeness:</strong> Process i sets <code>turn = j</code>, giving priority to the other process.</li>
                <li><strong>3. Waiting:</strong> Process i waits while <code>flag[j] == true && turn == j</code>. If process j does not want to enter, <code>flag[j]</code> is false and i proceeds. If j wants to enter, the most recent write to <code>turn</code> determines who goes first.</li>
                <li><strong>4. Critical section:</strong> Once the while loop exits, process i enters its critical section.</li>
                <li><strong>5. Exit:</strong> Process i sets <code>flag[i] = false</code> to allow the other process to proceed.</li>
              </ol>
            </div>

            <Alert className="mt-4">
              <AlertDescription>
                Note: Modern CPUs may reorder instructions, so software solutions like Peterson's may not work without memory barriers.
                Hardware-supported synchronization (atomic instructions) is preferred in production systems.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CpuIcon className="w-6 h-6 text-gray-500" />
              Hardware Synchronization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Because software-only solutions are difficult to implement correctly on modern processors with out-of-order execution,
              operating systems rely on hardware instructions that provide atomic operations. These operations are indivisible:
              they execute as a single uninterruptible unit.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">Test-And-Set</h4>
                <pre className="text-gray-300 text-xs">
{`boolean test_and_set(boolean *target) {
    boolean rv = *target;
    *target = true;
    return rv;
}

// Usage for mutual exclusion
do {
    while (test_and_set(&lock))
        ; // busy wait

    // critical section

    lock = false;

    // remainder section
} while (true);`}
                </pre>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">Compare-And-Swap (CAS)</h4>
                <pre className="text-gray-300 text-xs">
{`int compare_and_swap(int *value, int expected, int new_value) {
    int temp = *value;
    if (temp == expected)
        *value = new_value;
    return temp;
}

// Usage for mutual exclusion
do {
    while (compare_and_swap(&lock, 0, 1) != 0)
        ; // busy wait

    // critical section

    lock = 0;

    // remainder section
} while (true);`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Memory Barriers</h4>
              <p className="text-sm text-gray-700 mb-3">
                Modern CPUs reorder memory operations for performance. A memory barrier (or memory fence) is an instruction
                that ensures all memory operations before the barrier complete before any operations after the barrier begin.
                This is critical for correct synchronization.
              </p>
              <div className="bg-white p-3 rounded border text-sm text-gray-700">
                <strong>x86 example:</strong> The <code>lock</code> prefix on instructions like <code>lock cmpxchg</code>
                provides both atomicity and a full memory barrier. On ARM, you need explicit barrier instructions like <code>dmb</code>.
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Atomic Operations in Practice</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm text-gray-700">C11 Atomics</p>
                  <pre className="text-xs text-gray-600 mt-2">
{`_Atomic int counter = 0;
int old = atomic_fetch_add(&counter, 1);`}
                  </pre>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm text-gray-700">Java Atomics</p>
                  <pre className="text-xs text-gray-600 mt-2">
{`AtomicInteger counter = new AtomicInteger(0);
int old = counter.incrementAndGet();`}
                  </pre>
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
              <Lock className="w-6 h-6 text-gray-500" />
              Mutex Locks and Spinlocks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              A <strong>mutex lock</strong> (mutual exclusion lock) is the most basic synchronization primitive.
              It ensures that only one thread can access a critical section at a time. There are two main types:
              spinlocks (busy-wait) and sleeping locks (block the thread until the lock is available).
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">Spinlock</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    The thread repeatedly checks if the lock is available (busy waiting).
                    Best for short critical sections on multiprocessor systems where the expected wait time is less than the context switch overhead.
                  </p>
                  <pre className="mt-3 p-2 bg-slate-900 rounded text-xs text-gray-300">
{`acquire(lock) {
    while (!compare_and_swap(&lock->available, 0, 1))
        ; // spin
}

release(lock) {
    lock->available = 0;
}`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">Sleeping Lock (Mutex)</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    If the lock is unavailable, the thread yields the CPU and is placed in a wait queue.
                    Better for long critical sections or uniprocessor systems.
                  </p>
                  <pre className="mt-3 p-2 bg-slate-900 rounded text-xs text-gray-300">
{`acquire(lock) {
    while (test_and_set(&lock->available) == true)
        add thread to wait queue;
        sleep();
}

release(lock) {
    lock->available = false;
    wake up one waiting thread;
}`}
                  </pre>
                </CardContent>
              </Card>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Characteristic</th>
                    <th className="p-3 text-left">Spinlock</th>
                    <th className="p-3 text-left">Sleeping Mutex</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Waiting behavior</td>
                    <td className="p-3">Busy wait (consumes CPU)</td>
                    <td className="p-3">Blocks/yields CPU</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Context switches</td>
                    <td className="p-3">None</td>
                    <td className="p-3">Two per lock acquisition</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Best for</td>
                    <td className="p-3">Short critical sections, SMP</td>
                    <td className="p-3">Long critical sections, uniprocessor</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Fairness</td>
                    <td className="p-3">No guarantee (starvation possible)</td>
                    <td className="p-3">Can be FIFO with proper queue</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Kernel usage</td>
                    <td className="p-3">Linux kernel short paths</td>
                    <td className="p-3">pthread_mutex, Java synchronized</td>
                  </tr>
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
              <Lock className="w-6 h-6 text-gray-500" />
              Semaphores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              A <strong>semaphore</strong> is a synchronization variable that can only be accessed through two atomic operations:
              <code>wait()</code> (also called P, from the Dutch "proberen" meaning to test) and <code>signal()</code>
              (also called V, from "verhogen" meaning to increment).
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">wait(S) / P(S)</h4>
                <pre className="text-gray-300 text-xs">
{`wait(S) {
    while (S <= 0)
        ; // busy wait (or block)
    S--;
}`}
                </pre>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">signal(S) / V(S)</h4>
                <pre className="text-gray-300 text-xs">
{`signal(S) {
    S++;
}`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">Binary Semaphore (Mutex)</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Value is 0 or 1. Used for mutual exclusion. Equivalent to a lock.
                  </p>
                  <pre className="mt-3 p-2 bg-slate-900 rounded text-xs text-gray-300">
{`sem_wait(&mutex);
// Critical Section
sem_post(&mutex);`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">Counting Semaphore</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Value can be any non-negative integer. Used for resource counting and signaling.
                  </p>
                  <pre className="mt-3 p-2 bg-slate-900 rounded text-xs text-gray-300">
{`sem_init(&sem, 0, 5);  // 5 resources available
sem_wait(&sem);         // Acquire one resource
// Use resource
sem_post(&sem);         // Release one resource`}
                  </pre>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Deadlock and Starvation with Semaphores</h4>
              <p className="text-sm text-gray-700 mb-3">
                Semaphores are powerful but error-prone. Common mistakes include:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Deadlock:</strong> Process A holds semaphore S1 and waits for S2, while Process B holds S2 and waits for S1.</li>
                <li><strong>Starvation:</strong> A process waits indefinitely because other processes continuously acquire the semaphore before it can.</li>
                <li><strong>Priority Inversion:</strong> A high-priority process is blocked waiting for a low-priority process to release a semaphore.</li>
              </ul>
              <div className="bg-white p-3 rounded border mt-3 text-sm text-gray-700">
                <strong>Priority Inversion Example:</strong> Mars Pathfinder mission (1997) experienced priority inversion
                where a high-priority meteorological task was blocked by a low-priority task holding a mutex.
                The fix was enabling priority inheritance in the VxWorks RTOS.
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-gray-500" />
              Classic Synchronization Problems
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="producer" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="producer">Bounded Buffer</TabsTrigger>
                <TabsTrigger value="readers">Readers-Writers</TabsTrigger>
                <TabsTrigger value="dining">Dining Philosophers</TabsTrigger>
              </TabsList>

              <TabsContent value="producer" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Producer-Consumer (Bounded Buffer)</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    The producer generates data and places it into a shared buffer of finite size.
                    The consumer removes and processes data from the buffer. We need three semaphores:
                    <code>mutex</code> for mutual exclusion, <code>empty</code> to count empty slots,
                    and <code>full</code> to count filled slots.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-3 rounded">
                      <p className="text-gray-400 text-xs mb-1">// Producer</p>
                      <pre className="text-gray-300 text-xs">
{`do {
    // produce an item

    wait(empty);    // wait for empty slot
    wait(mutex);    // enter critical section

    // add item to buffer

    signal(mutex);  // exit critical section
    signal(full);   // increment filled slots
} while (true);`}
                      </pre>
                    </div>
                    <div className="bg-slate-900 p-3 rounded">
                      <p className="text-gray-400 text-xs mb-1">// Consumer</p>
                      <pre className="text-gray-300 text-xs">
{`do {
    wait(full);     // wait for filled slot
    wait(mutex);    // enter critical section

    // remove item from buffer

    signal(mutex);  // exit critical section
    signal(empty);  // increment empty slots

    // consume the item
} while (true);`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border mt-3 text-sm text-gray-700">
                    <strong>Real-world application:</strong> Message queues (RabbitMQ, Kafka), thread pool task queues,
                    and async I/O event rings all use the bounded buffer pattern. The producer is the event source,
                    and the consumer is the worker thread pool.
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="readers" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Readers-Writers Problem</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Multiple reader processes can access a shared resource simultaneously,
                    but a writer process needs exclusive access. We examine two solutions:
                    one that favors readers, and one that favors writers.
                  </p>

                  <div className="bg-slate-900 p-3 rounded mb-3">
                    <p className="text-gray-400 text-xs mb-1">// Reader-priority solution</p>
                    <pre className="text-gray-300 text-xs">
{`semaphore mutex = 1;    // protects readcount
semaphore rw_mutex = 1; // for writers
int readcount = 0;

// Writer
wait(rw_mutex);
// writing is performed
signal(rw_mutex);

// Reader
wait(mutex);
readcount++;
if (readcount == 1)
    wait(rw_mutex);  // first reader locks out writers
signal(mutex);

// reading is performed

wait(mutex);
readcount--;
if (readcount == 0)
    signal(rw_mutex); // last reader releases writers
signal(mutex);`}
                    </pre>
                  </div>

                  <div className="bg-white p-3 rounded border text-sm text-gray-700">
                    <strong>Real-world application:</strong> Database read replicas and in-memory caches (Redis, Memcached)
                    use reader-writer locks. Read-heavy workloads benefit greatly because reads do not block each other.
                    However, writer starvation is possible if readers continuously arrive.
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dining" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Dining Philosophers</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Five philosophers sit at a round table. Each has a plate of spaghetti and needs two forks to eat.
                    There are only five forks (one between each pair of philosophers). This is a classic illustration of
                    deadlock and resource contention.
                  </p>

                  <div className="bg-slate-900 p-3 rounded mb-3">
                    <pre className="text-gray-300 text-xs">
{`// Naive solution (DEADLOCK PRONE)
semaphore fork[5] = {1, 1, 1, 1, 1};

// Philosopher i
 do {
     wait(fork[i]);          // pick up left fork
     wait(fork[(i+1)%5]);    // pick up right fork

     // eat

     signal(fork[(i+1)%5]);  // put down right fork
     signal(fork[i]);        // put down left fork

     // think
 } while (true);`}
                    </pre>
                  </div>

                  <div className="bg-white p-3 rounded border text-sm text-gray-700 mb-3">
                    <strong>Deadlock scenario:</strong> If all philosophers pick up their left fork simultaneously,
                    they all wait forever for their right fork. All five conditions for deadlock are met.
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2">Solutions to Prevent Deadlock</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>1. Allow at most 4 philosophers:</strong> With only 4 philosophers at the table, at least one can always get both forks.</li>
                    <li><strong>2. Pick up both forks atomically:</strong> Use a single semaphore protecting the pickup action, or use a monitor that checks both neighbors.</li>
                    <li><strong>3. Asymmetric ordering:</strong> Odd-numbered philosophers pick left then right; even-numbered pick right then left. This breaks circular wait.</li>
                    <li><strong>4. Timeout and retry:</strong> If a philosopher cannot get the second fork, put down the first and try again later.</li>
                  </ul>

                  <div className="bg-slate-900 p-3 rounded mt-3">
                    <p className="text-gray-400 text-xs mb-1">// Asymmetric solution</p>
                    <pre className="text-gray-300 text-xs">
{`if (i % 2 == 0) {
    wait(fork[i]);
    wait(fork[(i+1)%5]);
} else {
    wait(fork[(i+1)%5]);
    wait(fork[i]);
}
// eat
signal(fork[i]);
signal(fork[(i+1)%5]);`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ServerIcon className="w-6 h-6 text-gray-500" />
              Monitors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              A <strong>monitor</strong> is a high-level abstraction that provides a convenient and effective mechanism
              for process synchronization. It is a collection of procedures, variables, and data structures grouped together
              in a special kind of module or package. Only one process can be active inside a monitor at a time.
            </p>

            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-3">Monitor Structure (Pseudocode)</h4>
              <pre className="text-sm font-mono text-gray-300">
{`monitor monitor_name {
    // shared variable declarations
    procedure P1(...) {
        ...
    }
    procedure P2(...) {
        ...
    }
    initialization_code() {
        ...
    }
}`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Condition Variables</h4>
              <p className="text-sm text-gray-700 mb-3">
                Within a monitor, condition variables provide a way for a process to wait for a specific condition to become true.
                Two operations are defined on condition variables:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>x.wait():</strong> The invoking process is suspended until another process invokes <code>x.signal()</code>.</li>
                <li><strong>x.signal():</strong> Resumes exactly one suspended process. If no process is waiting, the signal has no effect (unlike semaphores where the signal is remembered).</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-3">Dining Philosophers with Monitor</h4>
              <pre className="text-sm font-mono text-gray-300">
{`monitor DiningPhilosophers {
    enum { THINKING, HUNGRY, EATING } state[5];
    condition self[5];

    void pickup(int i) {
        state[i] = HUNGRY;
        test(i);        // try to acquire forks
        if (state[i] != EATING)
            self[i].wait;
    }

    void putdown(int i) {
        state[i] = THINKING;
        test((i + 4) % 5);  // test left neighbor
        test((i + 1) % 5);  // test right neighbor
    }

    void test(int i) {
        if (state[(i + 4) % 5] != EATING &&
            state[i] == HUNGRY &&
            state[(i + 1) % 5] != EATING) {
            state[i] = EATING;
            self[i].signal;
        }
    }

    initialization_code() {
        for (int i = 0; i < 5; i++)
            state[i] = THINKING;
    }
}`}
              </pre>
            </div>

            <div className="bg-white p-3 rounded border text-sm text-gray-700">
              <strong>Real-world application:</strong> Java's <code>synchronized</code> blocks and methods,
              along with <code>Object.wait()</code> and <code>Object.notify()</code>, are based on the monitor concept.
              Similarly, C# uses <code>lock</code> statements with Monitor objects.
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TerminalIcon className="w-6 h-6 text-gray-400" />
              Real-World Backend Engineering Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Database Transactions</h4>
                <p className="text-sm text-gray-300 mb-2">
                  ACID properties rely on synchronization. Locks (shared and exclusive) prevent lost updates and inconsistent reads.
                </p>
                <pre className="text-xs text-gray-300 block bg-slate-900 p-2 rounded">
{`BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;
-- critical section: no other transaction can update row 1
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;`}
                </pre>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Java Synchronized</h4>
                <p className="text-sm text-gray-300 mb-2">
                  The synchronized keyword creates a monitor lock on the object, ensuring mutual exclusion.
                </p>
                <pre className="text-xs text-gray-300 block bg-slate-900 p-2 rounded">
{`public class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}`}
                </pre>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">POSIX Threads (pthreads)</h4>
                <p className="text-sm text-gray-300 mb-2">
                  pthreads provide mutexes and condition variables for low-level synchronization in C/C++.
                </p>
                <pre className="text-xs text-gray-300 block bg-slate-900 p-2 rounded">
{`pthread_mutex_t lock;
pthread_mutex_init(&lock, NULL);

pthread_mutex_lock(&lock);
// critical section
pthread_mutex_unlock(&lock);

pthread_mutex_destroy(&lock);`}
                </pre>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Thread Pools</h4>
                <p className="text-sm text-gray-300 mb-2">
                  A thread pool uses a blocking task queue. Producer threads submit tasks; worker threads consume them.
                  This is a direct application of the bounded buffer problem.
                </p>
                <pre className="text-xs text-gray-300 block bg-slate-900 p-2 rounded">
{`// Java ThreadPoolExecutor
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> { /* task */ });
// Internal blocking queue ensures safe handoff`}
                </pre>
              </div>
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
                "Race conditions occur when multiple processes access shared data concurrently without synchronization",
                "Critical sections must be protected to ensure mutual exclusion, progress, and bounded waiting",
                "Peterson's solution works for two processes but is rarely used on modern hardware due to memory reordering",
                "Hardware atomic instructions (test-and-set, compare-and-swap) form the basis of modern synchronization",
                "Mutex locks provide mutual exclusion; spinlocks are best for short waits, sleeping locks for long waits",
                "Semaphores are flexible but require careful ordering to avoid deadlock and starvation",
                "Classical problems (producer-consumer, readers-writers, dining philosophers) model real synchronization challenges",
                "Monitors provide a higher-level, safer abstraction used in Java and C#",
                "Real systems use database locks, thread pools, and language-level synchronization primitives"
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

// Additional icons used in the component
function CpuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}

function ServerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function TerminalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
