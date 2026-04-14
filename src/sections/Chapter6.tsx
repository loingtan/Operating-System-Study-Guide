import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, Clock, BarChart3, Play,
  CheckCircle
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

type Process = {
  id: string;
  arrival: number;
  burst: number;
  priority?: number;
};

export default function Chapter6() {
  const processes: Process[] = [
    { id: 'P1', arrival: 0, burst: 8, priority: 2 },
    { id: 'P2', arrival: 1, burst: 4, priority: 1 },
    { id: 'P3', arrival: 2, burst: 9, priority: 3 },
    { id: 'P4', arrival: 3, burst: 5, priority: 2 },
  ];

  const [schedule, setSchedule] = useState<{process: string, start: number, end: number}[]>([]);
  const [algorithm, setAlgorithm] = useState<'fcfs' | 'sjf' | 'priority' | 'rr' | 'mlq'>('fcfs');
  const [metrics, setMetrics] = useState<{avgWaiting: number, avgTurnaround: number} | null>(null);

  const runSimulation = () => {
    let result: {process: string, start: number, end: number}[] = [];
    let time = 0;
    let waitingTimes: Record<string, number> = {};
    let turnaroundTimes: Record<string, number> = {};
    let completionTimes: Record<string, number> = {};

    if (algorithm === 'fcfs') {
      const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
      for (const p of sorted) {
        if (time < p.arrival) time = p.arrival;
        waitingTimes[p.id] = time - p.arrival;
        result.push({ process: p.id, start: time, end: time + p.burst });
        time += p.burst;
        turnaroundTimes[p.id] = time - p.arrival;
        completionTimes[p.id] = time;
      }
    } else if (algorithm === 'sjf') {
      let remaining = [...processes];
      let currentTime = 0;
      while (remaining.length > 0) {
        const available = remaining.filter(p => p.arrival <= currentTime);
        if (available.length === 0) {
          currentTime = remaining[0].arrival;
          continue;
        }
        const shortest = available.reduce((min, p) => p.burst < min.burst ? p : min);
        waitingTimes[shortest.id] = currentTime - shortest.arrival;
        result.push({ process: shortest.id, start: currentTime, end: currentTime + shortest.burst });
        currentTime += shortest.burst;
        turnaroundTimes[shortest.id] = currentTime - shortest.arrival;
        completionTimes[shortest.id] = currentTime;
        remaining = remaining.filter(p => p.id !== shortest.id);
      }
      time = currentTime;
    } else if (algorithm === 'priority') {
      let remaining = [...processes];
      let currentTime = 0;
      while (remaining.length > 0) {
        const available = remaining.filter(p => p.arrival <= currentTime);
        if (available.length === 0) {
          currentTime = remaining[0].arrival;
          continue;
        }
        const highest = available.reduce((best, p) => (p.priority || 99) < (best.priority || 99) ? p : best);
        waitingTimes[highest.id] = currentTime - highest.arrival;
        result.push({ process: highest.id, start: currentTime, end: currentTime + highest.burst });
        currentTime += highest.burst;
        turnaroundTimes[highest.id] = currentTime - highest.arrival;
        completionTimes[highest.id] = currentTime;
        remaining = remaining.filter(p => p.id !== highest.id);
      }
      time = currentTime;
    } else if (algorithm === 'rr') {
      const quantum = 2;
      let remaining = processes.map(p => ({ ...p, left: p.burst }));
      let queue = remaining.filter(p => p.arrival <= time);
      let arrived = new Set(queue.map(p => p.id));

      while (queue.length > 0 || remaining.some(p => p.left > 0)) {
        if (queue.length === 0) {
          const nextArrival = remaining.filter(p => p.left > 0 && p.arrival > time)
            .sort((a, b) => a.arrival - b.arrival)[0];
          if (nextArrival) time = nextArrival.arrival;
        }

        const newlyArrived = remaining.filter(p => p.left > 0 && p.arrival <= time && !arrived.has(p.id));
        for (const p of newlyArrived) {
          arrived.add(p.id);
          queue.push(p);
        }

        if (queue.length > 0) {
          const p = queue.shift()!;
          const execTime = Math.min(quantum, p.left);
          result.push({ process: p.id, start: time, end: time + execTime });
          time += execTime;
          p.left -= execTime;

          const newlyArrived2 = remaining.filter(q => q.left > 0 && q.arrival <= time && !arrived.has(q.id));
          for (const q of newlyArrived2) {
            arrived.add(q.id);
            queue.push(q);
          }

          if (p.left > 0) {
            queue.push(p);
          }
        }
      }

      for (const p of processes) {
        const last = result.filter(r => r.process === p.id).pop();
        if (last) {
          completionTimes[p.id] = last.end;
          turnaroundTimes[p.id] = last.end - p.arrival;
          waitingTimes[p.id] = turnaroundTimes[p.id] - p.burst;
        }
      }
    } else if (algorithm === 'mlq') {
      const queue0 = processes.filter(p => (p.priority || 99) === 1).map(p => ({ ...p, left: p.burst }));
      const queue1 = processes.filter(p => (p.priority || 99) >= 2).map(p => ({ ...p, left: p.burst }));
      let currentTime = 0;

      const runQueue = (queue: (Process & { left: number })[], quantum: number) => {
        let i = 0;
        while (i < queue.length) {
          const p = queue[i];
          if (p.arrival <= currentTime) {
            const execTime = Math.min(quantum, p.left);
            result.push({ process: p.id, start: currentTime, end: currentTime + execTime });
            currentTime += execTime;
            p.left -= execTime;
            if (p.left > 0) {
              i++;
            } else {
              completionTimes[p.id] = currentTime;
              turnaroundTimes[p.id] = currentTime - p.arrival;
              waitingTimes[p.id] = turnaroundTimes[p.id] - p.burst;
              queue.splice(i, 1);
            }
          } else {
            i++;
          }
        }
      };

      while (queue0.some(p => p.left > 0) || queue1.some(p => p.left > 0)) {
        const available0 = queue0.filter(p => p.arrival <= currentTime && p.left > 0);
        if (available0.length > 0) {
          runQueue(queue0, 4);
        } else {
          const available1 = queue1.filter(p => p.arrival <= currentTime && p.left > 0);
          if (available1.length > 0) {
            runQueue(queue1, 2);
          } else {
            const nextP = [...queue0, ...queue1].filter(p => p.left > 0).sort((a, b) => a.arrival - b.arrival)[0];
            if (nextP) currentTime = nextP.arrival;
          }
        }
      }
      time = currentTime;
    }

    if (Object.keys(waitingTimes).length > 0) {
      const avgWaiting = Object.values(waitingTimes).reduce((a, b) => a + b, 0) / processes.length;
      const avgTurnaround = Object.values(turnaroundTimes).reduce((a, b) => a + b, 0) / processes.length;
      setMetrics({ avgWaiting, avgTurnaround });
    }

    setSchedule(result);
  };

  return (
    <div className="space-y-8">
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 6</Badge>
        <h1 className="text-4xl font-bold text-gray-900">CPU Scheduling</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Scheduling algorithms, criteria, and performance evaluation
        </p>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-gray-500" />
              Scheduling Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              CPU scheduling is the basis of multiprogrammed operating systems. By switching the CPU among processes,
              the operating system can make the computer more productive. Several criteria are used to evaluate and compare scheduling algorithms.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "CPU Utilization", desc: "Keep the CPU as busy as possible. Theoretical maximum is 100%.", target: "Maximize" },
                { title: "Throughput", desc: "Number of processes completed per unit time.", target: "Maximize" },
                { title: "Turnaround Time", desc: "Time from submission to completion (TAT = completion - arrival).", target: "Minimize" },
                { title: "Waiting Time", desc: "Total time spent waiting in the ready queue (WT = TAT - burst).", target: "Minimize" },
                { title: "Response Time", desc: "Time from request submission to first response.", target: "Minimize" },
              ].map((criterion, i) => (
                <Card key={i} className="bg-gray-50">
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm">{criterion.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{criterion.desc}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {criterion.target}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Key Formulas</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="bg-white p-3 rounded border">
                  <p><strong>Turnaround Time (TAT)</strong> = Completion Time - Arrival Time</p>
                  <p className="mt-1"><strong>Waiting Time (WT)</strong> = Turnaround Time - Burst Time</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p><strong>Average Waiting Time</strong> = (Sum of all WT) / (Number of processes)</p>
                  <p className="mt-1"><strong>Response Time</strong> = First CPU allocation - Arrival Time</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-6 h-6 text-gray-500" />
              Interactive: CPU Scheduling Simulator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={algorithm === 'fcfs' ? 'default' : 'outline'}
                onClick={() => setAlgorithm('fcfs')}
              >
                FCFS
              </Button>
              <Button
                variant={algorithm === 'sjf' ? 'default' : 'outline'}
                onClick={() => setAlgorithm('sjf')}
              >
                SJF
              </Button>
              <Button
                variant={algorithm === 'priority' ? 'default' : 'outline'}
                onClick={() => setAlgorithm('priority')}
              >
                Priority
              </Button>
              <Button
                variant={algorithm === 'rr' ? 'default' : 'outline'}
                onClick={() => setAlgorithm('rr')}
              >
                Round Robin (q=2)
              </Button>
              <Button
                variant={algorithm === 'mlq' ? 'default' : 'outline'}
                onClick={() => setAlgorithm('mlq')}
              >
                MLQ
              </Button>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Processes</h4>
              <div className="flex flex-wrap gap-4">
                {processes.map(p => (
                  <div key={p.id} className="bg-white p-3 rounded border">
                    <div className="font-bold">{p.id}</div>
                    <div className="text-xs text-gray-600">Arrival: {p.arrival}</div>
                    <div className="text-xs text-gray-600">Burst: {p.burst}</div>
                    <div className="text-xs text-gray-600">Priority: {p.priority}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={runSimulation} className="w-full">
              Run Simulation
            </Button>

            {schedule.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-3">Gantt Chart</h4>
                <div className="flex flex-wrap border border-gray-300 rounded overflow-hidden">
                  {schedule.map((s, i) => (
                    <div
                      key={i}
                      className="border-r border-white bg-gray-500 text-white text-center py-2 text-sm"
                      style={{ minWidth: `${Math.max((s.end - s.start) * 30, 40)}px` }}
                    >
                      {s.process}
                      <div className="text-xs">{s.start}-{s.end}</div>
                    </div>
                  ))}
                </div>

                {metrics && (
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-3 rounded">
                      <p className="text-sm text-gray-600">Average Waiting Time</p>
                      <p className="text-xl font-bold text-gray-900">{metrics.avgWaiting.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded">
                      <p className="text-sm text-gray-600">Average Turnaround Time</p>
                      <p className="text-xl font-bold text-gray-900">{metrics.avgTurnaround.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-gray-500" />
              Scheduling Algorithms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="fcfs" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="fcfs">FCFS</TabsTrigger>
                <TabsTrigger value="sjf">SJF/SRTF</TabsTrigger>
                <TabsTrigger value="priority">Priority</TabsTrigger>
                <TabsTrigger value="rr">Round Robin</TabsTrigger>
                <TabsTrigger value="mlq">MLQ/MLFQ</TabsTrigger>
              </TabsList>

              <TabsContent value="fcfs" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">First-Come, First-Served (FCFS)</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    The simplest CPU scheduling algorithm. The process that requests the CPU first is allocated the CPU first.
                    It can be easily managed with a FIFO queue.
                  </p>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm"><strong>Pros:</strong> Simple to implement, no starvation, fair in terms of arrival order.</p>
                    <p className="text-sm"><strong>Cons:</strong> Suffers from the convoy effect where short processes wait behind a long process.</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Convoy Effect Analysis</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Consider one CPU-bound process (burst = 100ms) and many I/O-bound processes (burst = 1ms).
                    With FCFS, all I/O-bound processes wait for the CPU-bound process. CPU utilization drops because
                    the I/O devices sit idle while the long process monopolizes the CPU.
                  </p>
                  <div className="bg-white p-3 rounded border text-sm text-gray-700">
                    <strong>Example:</strong> P1 (burst=24, arrival=0), P2 (burst=3, arrival=0), P3 (burst=3, arrival=0).
                    <br />
                    Average waiting time = (0 + 24 + 27) / 3 = 17ms.
                    <br />
                    If order were P2, P3, P1: average waiting time = (0 + 3 + 6) / 3 = 3ms.
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sjf" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Shortest Job First (SJF) and Shortest Remaining Time First (SRTF)</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    SJF associates with each process the length of its next CPU burst. When the CPU is available,
                    it is assigned to the process with the smallest next CPU burst. SJF is optimal for minimizing average waiting time.
                  </p>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm"><strong>Non-preemptive SJF:</strong> Once the CPU is given to a process, it cannot be preempted until it completes its CPU burst.</p>
                    <p className="text-sm"><strong>Preemptive SJF (SRTF):</strong> If a new process arrives with a CPU burst length less than the remaining time of the current process, the current process is preempted.</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Exponential Averaging for Burst Prediction</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    In practice, we cannot know the exact length of the next CPU burst. We predict it using exponential averaging
                    of previous CPU bursts.
                  </p>
                  <div className="bg-white p-3 rounded border text-sm text-gray-700">
                    <p><strong>Formula:</strong></p>
                    <p className="font-mono mt-1">tau(n+1) = alpha * t_n + (1 - alpha) * tau_n</p>
                    <p className="mt-2 text-xs">Where <code>t_n</code> is the actual length of the nth CPU burst, <code>tau_n</code> is the predicted value,
                    and <code>alpha</code> is a weighting factor (0 &lt;= alpha &lt;= 1).</p>
                    <p className="mt-2">If <code>alpha = 0</code>, we ignore recent history. If <code>alpha = 1</code>, we only consider the most recent burst.
                    Typically, <code>alpha = 0.5</code>.</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="priority" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Priority Scheduling</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    A priority number (integer) is associated with each process. The CPU is allocated to the process with the highest priority
                    (smallest integer = highest priority). Priority scheduling can be preemptive or non-preemptive.
                  </p>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm"><strong>Problem:</strong> Starvation of low-priority processes. A steady stream of high-priority processes can prevent a low-priority process from ever executing.</p>
                    <p className="text-sm"><strong>Solution:</strong> Aging. Gradually increase the priority of processes that wait in the system for a long time.</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Aging Formula</h4>
                  <div className="bg-white p-3 rounded border text-sm text-gray-700">
                    <p className="font-mono">priority_new = priority_old + (waiting_time / time_quantum)</p>
                    <p className="mt-2">For example, if a process waits for 5 time quanta, its priority might be increased by 5 levels,
                    eventually allowing it to preempt a newly arriving medium-priority process.</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rr" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Round Robin (RR)</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Designed especially for time-sharing systems. A small unit of time called a time quantum or time slice is defined.
                    The ready queue is treated as a circular queue. The CPU scheduler goes around the ready queue,
                    allocating the CPU to each process for a time interval of up to one time quantum.
                  </p>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm"><strong>Quantum size:</strong> If quantum is too large, RR becomes FCFS. If too small, excessive context switch overhead dominates performance.</p>
                    <p className="text-sm"><strong>Best for:</strong> Time-sharing and interactive systems where fair response time is critical.</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Quantum Analysis</h4>
                  <div className="bg-white p-3 rounded border text-sm text-gray-700">
                    <p><strong>Rule of thumb:</strong> Choose quantum slightly larger than the typical interactive process CPU burst (e.g., 10-100ms).</p>
                    <p className="mt-2"><strong>Context switch overhead:</strong> If context switch takes 1ms and quantum is 4ms, 20% of CPU time is wasted on overhead.
                    If quantum is 100ms, only 1% is wasted.</p>
                    <p className="mt-2"><strong>Response time:</strong> With n processes and quantum q, the maximum response time for any process is (n-1)*q.</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mlq" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Multilevel Queue (MLQ) and Multilevel Feedback Queue (MLFQ)</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>MLQ:</strong> The ready queue is partitioned into separate queues. Processes are permanently assigned to one queue,
                    generally based on some property of the process (e.g., memory size, process priority, process type).
                    Each queue has its own scheduling algorithm.
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>MLFQ:</strong> Allows processes to move between queues. The idea is to separate processes according to the characteristics of their CPU bursts.
                    If a process uses too much CPU time, it is moved to a lower-priority queue. If a process waits too long in a lower-priority queue, it may be moved to a higher-priority queue (aging).
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg">
                  <h4 className="text-gray-400 text-sm mb-2">Typical MLQ Structure</h4>
                  <pre className="text-gray-300 text-xs">
{`Queue 0 (Highest): Real-time processes  → Priority scheduling
Queue 1:            System processes     → Short quantum RR
Queue 2:            Interactive processes→ RR (q=20ms)
Queue 3:            Batch processes      → FCFS
Queue 4 (Lowest):   Student processes    → FCFS`}
                  </pre>
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
              <Clock className="w-6 h-6 text-gray-500" />
              Thread and Multi-Processor Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Thread Scheduling</h4>
                <p className="text-sm text-gray-700">
                  On operating systems that support threads at the kernel level, threads are scheduled rather than processes.
                  There are two main models:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li><strong>Process-Contention Scope (PCS):</strong> User-level threads compete among themselves within the same process for the kernel thread. The thread library schedules user threads onto available kernel threads.</li>
                  <li><strong>System-Contention Scope (SCS):</strong> All threads in the system compete for the CPU. Solaris and Linux use this model for kernel threads.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Multi-Processor Scheduling</h4>
                <p className="text-sm text-gray-700">
                  With multiple CPUs, scheduling becomes more complex:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li><strong>Homogeneous vs Heterogeneous:</strong> Symmetric multiprocessing (SMP) is most common.</li>
                  <li><strong>Processor Affinity:</strong> A process has an affinity for the processor on which it is currently running because migrating it would invalidate cache contents.</li>
                  <li><strong>Load Balancing:</strong> Push migration (periodic task checks load and pushes tasks) and pull migration (idle CPUs pull tasks from busy CPUs).</li>
                  <li><strong>Multicore Processors:</strong> Multiple processor cores on the same physical chip. Scheduling must consider memory stall times.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TimerIcon className="w-6 h-6 text-gray-500" />
              Real-Time Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Real-time operating systems schedule tasks with strict timing constraints. A real-time task has a deadline
              by which it must complete. There are two main types:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Rate-Monotonic Scheduling (RMS)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  A static priority algorithm that assigns priorities based on the period of tasks.
                  The task with the shortest period gets the highest priority. It is optimal for static-priority preemptive scheduling
                  if CPU utilization is bounded.
                </p>
                <div className="bg-white p-3 rounded border text-sm text-gray-700">
                  <p><strong>Schedulability condition:</strong></p>
                  <p className="font-mono mt-1">CPU utilization &lt;= n * (2^(1/n) - 1)</p>
                  <p className="mt-1 text-xs">For n tasks, the bound approaches ln(2) ~ 69.3% as n increases.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Earliest-Deadline-First (EDF)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  A dynamic priority algorithm that assigns priorities according to deadlines.
                  The earlier the deadline, the higher the priority. EDF can achieve 100% CPU utilization.
                </p>
                <div className="bg-white p-3 rounded border text-sm text-gray-700">
                  <p><strong>Schedulability condition:</strong></p>
                  <p className="font-mono mt-1">Sum(Ci / Pi) &lt;= 1</p>
                  <p className="mt-1 text-xs">Where Ci is computation time and Pi is the period for task i.
                  This is the necessary and sufficient condition for EDF.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-2">RMS vs EDF Comparison</h4>
              <pre className="text-gray-300 text-xs">
{`Feature                | Rate-Monotonic      | EDF
-----------------------|---------------------|---------------------
Priority type          | Static              | Dynamic
Optimal?               | Yes (static)        | Yes (overall)
CPU utilization bound  | ~69.3%              | 100%
Implementation         | Simpler             | More complex
Overhead               | Lower               | Higher (re-sorting)
Use case               | Hard real-time,     | Soft real-time,
                       | safety-critical     | general embedded`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartIcon className="w-6 h-6 text-gray-500" />
              Algorithm Evaluation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">Deterministic Modeling</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Takes a particular predetermined workload and defines the performance of each algorithm for that workload.
                    Exact and simple, but requires knowing the workload in advance.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">Queuing Models</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Uses probability distributions for CPU burst and arrival times. Mathematical formulas (Little's Law, etc.)
                    can be used to calculate metrics like average queue length and waiting time.
                  </p>
                  <div className="bg-white p-2 rounded border mt-2 text-xs text-gray-700">
                    <strong>Little's Law:</strong> n = lambda * W
                    <br />
                    Where n = average queue length, lambda = arrival rate, W = average waiting time.
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">Simulation</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    A computer model of the scheduling system. Uses randomized data or trace tapes (recorded real system data).
                    More accurate than queuing models and more flexible than deterministic modeling.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinuxIcon className="w-6 h-6 text-gray-500" />
              Linux CFS and Windows Scheduler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Linux Completely Fair Scheduler (CFS)</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Introduced in Linux 2.6.23, CFS does not use fixed time slices. Instead, it calculates how much CPU time
                  a process should get based on its priority (nice value) and ensures each process gets a "fair share" of the CPU.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>Uses a red-black tree to track runnable tasks by their virtual runtime (vruntime).</li>
                  <li>The task with the smallest vruntime is selected to run next.</li>
                  <li>Higher priority tasks accumulate vruntime more slowly.</li>
                  <li>Target latency is the period over which every runnable task should run at least once.</li>
                </ul>
                <div className="bg-white p-3 rounded border mt-3 text-sm text-gray-700">
                  <p className="font-mono">vruntime += (actual_runtime * 1024) / load_weight</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Windows Scheduler</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Windows uses a priority-based, preemptive scheduling algorithm. The highest-priority thread always runs.
                  The dispatcher uses a 32-level priority scheme.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><strong>Real-time class (16-31):</strong> Never have their priority adjusted.</li>
                  <li><strong>Variable class (1-15):</strong> Priorities are dynamically adjusted based on I/O activity and quantum expiration.</li>
                  <li><strong>Zero priority:</strong> Reserved for the idle thread.</li>
                  <li>Threads in the variable priority class receive a quantum boost after waiting for I/O.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-gray-500" />
              Scheduler Tuning in Production
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Tuning the Linux Scheduler</h4>
                <pre className="text-xs text-gray-700 block bg-slate-900 p-2 rounded text-gray-300">
{`# Change process priority (nice value)
nice -n -10 ./myapp

# Adjust scheduler policy for real-time
chrt -f 99 ./myapp   # SCHED_FIFO
chrt -r 50 ./myapp   # SCHED_RR

# Check current scheduling policy
chrt -p $(pidof myapp)

# Tune CFS parameters
sysctl kernel.sched_min_granularity_ns=1000000
sysctl kernel.sched_latency_ns=6000000`}
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Common Production Issues</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Noisy neighbor problem:</strong> One CPU-intensive container starves others on the same node.</li>
                  <li><strong>Priority inversion:</strong> A high-priority task waits for a low-priority task holding a lock.</li>
                  <li><strong>Scheduler latency:</strong> In real-time systems, kernel preemption must be enabled to keep scheduling latency under 100 microseconds.</li>
                  <li><strong>CPU throttling:</strong> Containers with CPU limits may be throttled by the CFS bandwidth controller, causing unexpected latency spikes.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Energy-Aware Scheduling</h4>
              <p className="text-sm text-gray-700">
                Modern data centers spend significant energy on cooling and power. Energy-aware schedulers try to consolidate workloads
                onto fewer cores, allowing other cores to enter low-power states (C-states). However, this must be balanced against
                thermal throttling and latency requirements. ARM's big.LITTLE architecture uses a heterogeneous scheduler that migrates
                background tasks to efficient "LITTLE" cores and latency-sensitive tasks to performance "big" cores.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-gray-500" />
              Advanced Scheduling Architectures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Energy-Aware Scheduling</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Modern processors use heterogeneous cores. ARM big.LITTLE pairs high-performance "big" cores with power-efficient "LITTLE" cores. Intel's Alder Lake+ uses Performance-cores (P-cores) and Efficient-cores (E-cores).
                </p>
                <p className="text-sm text-gray-700">
                  The scheduler must classify tasks by compute intensity and latency sensitivity. Background batch jobs migrate to E-cores, while interactive and real-time threads run on P-cores. The kernel's <code>schedutil</code> governor couples frequency selection with task placement.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# View CPU topology on Linux
lscpu | grep -E "Model name|Core|Thread"

# Check which cores are different types
cat /sys/devices/system/cpu/cpu*/topology/core_cpus_list

# Task placement to specific cores
taskset -c 0-3 ./latency_sensitive_app
taskset -c 4-7 ./background_batch_job`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Kernel Scheduling Classes</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Linux implements multiple scheduling classes in order of priority: <code>STOP</code> &gt; <code>DL</code> (SCHED_DEADLINE) &gt; <code>RT</code> (SCHED_FIFO/RR) &gt; <code>Fair</code> (CFS) &gt; <code>Idle</code>.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>SCHED_DEADLINE</strong> implements constant-bandwidth server scheduling for sporadic tasks. Each task declares runtime <code>C</code>, deadline <code>D</code>, and period <code>P</code>. The kernel guarantees the task receives <code>C</code> units of CPU every <code>P</code> units, delivered by deadline <code>D</code>.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// SCHED_DEADLINE parameters
struct sched_attr {
    __u32 size;
    __u32 sched_policy = SCHED_DEADLINE;
    __u64 sched_runtime  = 30 * 1000 * 1000;   // 30ms
    __u64 sched_deadline = 100 * 1000 * 1000;  // 100ms
    __u64 sched_period   = 100 * 1000 * 1000;  // 100ms
};

sched_setattr(0, &attr, 0);`}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">cgroup v2 CPU Controller: Quotas vs Shares</h4>
              <p className="text-sm text-gray-700 mb-3">
                cgroup v2 replaces the v1 <code>cpu.cfs_quota_us</code> and <code>cpu.shares</code> with a unified <code>cpu.max</code> and <code>cpu.weight</code> interface. Understanding the semantic difference is critical for container SREs.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Control</th>
                      <th className="p-2 text-left">Mechanism</th>
                      <th className="p-2 text-left">Behavior</th>
                      <th className="p-2 text-left">Latency Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">cpu.max</td>
                      <td className="p-2">Hard ceiling (quota)</td>
                      <td className="p-2">Throttled when limit reached, even if CPU idle</td>
                      <td className="p-2">High (bursty workloads suffer)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">cpu.weight</td>
                      <td className="p-2">Proportional share</td>
                      <td className="p-2">Uses spare cycles; only contends under pressure</td>
                      <td className="p-2">Low (no artificial throttling)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# cgroup v2 CPU controls
echo "100000 100000" > /sys/fs/cgroup/myapp/cpu.max  # 1 CPU max
echo "100" > /sys/fs/cgroup/myapp/cpu.weight         # default=100

# Docker maps --cpus to cpu.max and --cpu-shares to cpu.weight
docker run --cpus=2.0 --cpu-shares=512 myapp`}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-gray-500" />
              Production Scheduler Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Scheduler Statistics and perf</h4>
                <p className="text-sm text-gray-700 mb-2">
                  The kernel exposes per-CPU scheduler statistics via <code>/proc/schedstat</code>. Metrics include time spent running, waiting on the runqueue, and number of timeslices given.
                </p>
                <p className="text-sm text-gray-700">
                  <code>perf sched</code> records scheduler events and builds latency histograms. <code>perf sched latency</code> reports average and maximum latency per task, while <code>perf sched map</code> visualizes which CPU each thread ran on.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# Record scheduler events for 10 seconds
perf sched record -- sleep 10
perf sched latency --sort max

# Output columns: comm, pid, runtime, waittime, switch, max_delay
# High max_delay indicates scheduling latency issues

# Live scheduler stats
cat /proc/schedstat`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">BCC/BPF Tools for Scheduler Analysis</h4>
                <p className="text-sm text-gray-700 mb-2">
                  BPF enables safe, low-overhead tracing of kernel functions. BCC provides pre-built tools for scheduler diagnosis without modifying the kernel or restarting processes.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>runqlat:</strong> Histogram of time tasks spend waiting on the run queue</li>
                  <li><strong>cpudist:</strong> Histogram of time tasks spend on-CPU before being preempted</li>
                  <li><strong>offcputime:</strong> Flame graphs showing where tasks block off-CPU</li>
                  <li><strong>profile:</strong> CPU sampling at arbitrary frequencies</li>
                </ul>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`# Run queue latency histogram
runqlat 1 5

# Off-CPU flame graph generation
offcputime -f -p $(pidof myapp) 30 > out.stacks
flamegraph.pl out.stacks > offcpu.svg

# CPU scheduling distribution
cpudist -P 1 5`}
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Run Queue Latency Interpretation</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
Latency (us)     : Count    Distribution
0 -> 1           : 15234    |********************************|
1 -> 3           : 4892     |**********                      |
3 -> 7           : 1023     |**                              |
7 -> 15          : 456      |*                               |
15 -> 31         : 234      |*                               |
31 -> 63         : 89       |                                |
63 -> 127        : 12       |                                |
127 -> 255       : 3        |                                |
255 -> 511       : 1        |                                |

Healthy: Most samples in 0-7us range
Warning: Tail >100us indicates CPU saturation or misconfiguration
Critical: >1ms tail implies realtime threads may miss deadlines
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
                "CPU scheduling aims to optimize CPU utilization, throughput, and response time",
                "FCFS is simple but suffers from the convoy effect, leading to poor average waiting times",
                "SJF minimizes average waiting time but requires prediction via exponential averaging",
                "Priority scheduling can cause starvation; aging increases priority over time to prevent this",
                "Round Robin provides fair time-sharing; quantum size is a critical tuning parameter",
                "MLFQ automatically adjusts process priorities based on observed behavior without requiring prior knowledge",
                "Multi-processor scheduling must consider cache affinity and load balancing",
                "Real-time scheduling (RMS, EDF) guarantees deadlines for time-critical systems",
                "Linux CFS uses a fair-share approach with vruntime; Windows uses a 32-level priority scheme"
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
function TimerIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  );
}

function ChartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function LinuxIcon(props: React.SVGProps<SVGSVGElement>) {
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
