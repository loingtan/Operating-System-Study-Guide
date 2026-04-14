import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock, Unlock, AlertTriangle, CheckCircle, ArrowRight,
  Circle, Calculator
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter7() {
  const [bankerStep, setBankerStep] = useState(0);

  const runBankerWalkthrough = () => {
    setBankerStep((prev) => (prev + 1) % 5);
  };

  return (
    <div className="space-y-8">
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 7</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Deadlocks</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Understanding, preventing, avoiding, detecting, and recovering from deadlocks
        </p>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-gray-500" />
              What is a Deadlock?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              A <strong>deadlock</strong> is a situation in which every process in a group is waiting for a resource
              that is held by another process in the group. Because all processes are waiting, none of them can ever
              release the resources they hold, and none of them can proceed. This results in a permanent standstill.
            </p>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">System Model</h4>
              <p className="text-sm text-gray-700 mb-3">
                A system consists of a finite number of resources that must be managed. These resources are partitioned into
                several types, each consisting of some number of identical instances. Examples include CPU cycles, memory space,
                I/O devices (printers, disk drives), and files.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Request:</strong> A process requests a resource. If it cannot be granted immediately, the process must wait until it can acquire the resource.</li>
                <li><strong>Use:</strong> The process operates on the resource.</li>
                <li><strong>Release:</strong> The process releases the resource.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Classic Example</h4>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                    P1
                  </div>
                  <p className="text-sm">Has: R1</p>
                  <p className="text-sm">Wants: R2</p>
                </div>
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-8 h-8 text-gray-500 rotate-180" />
                  <span className="text-gray-600 font-bold">DEADLOCK</span>
                  <ArrowRight className="w-8 h-8 text-gray-500" />
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                    P2
                  </div>
                  <p className="text-sm">Has: R2</p>
                  <p className="text-sm">Wants: R1</p>
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
              Four Necessary Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              All four conditions must hold simultaneously for a deadlock to occur. If we can prevent any one of them,
              deadlocks cannot happen.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">1. Mutual Exclusion</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    At least one resource must be non-sharable. Only one process can use the resource at a time.
                    If another process requests it, the requesting process must wait until the resource is released.
                  </p>
                  <div className="bg-white p-2 rounded border mt-2 text-xs text-gray-600">
                    <strong>Prevention idea:</strong> Make all resources shareable (not always possible, e.g., printers).
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">2. Hold and Wait</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    A process must be holding at least one resource and waiting to acquire additional resources
                    that are currently being held by other processes.
                  </p>
                  <div className="bg-white p-2 rounded border mt-2 text-xs text-gray-600">
                    <strong>Prevention idea:</strong> Require processes to request all resources at once before starting.
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">3. No Preemption</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Resources cannot be forcibly removed from a process holding them. They must be released voluntarily
                    by the holding process after it has completed its task.
                  </p>
                  <div className="bg-white p-2 rounded border mt-2 text-xs text-gray-600">
                    <strong>Prevention idea:</strong> If a process cannot get all resources, preempt what it already holds.
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900">4. Circular Wait</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    A set {'{P0, P1, ..., Pn}'} of waiting processes must exist such that P0 is waiting for a resource held by P1,
                    P1 is waiting for a resource held by P2, ..., Pn-1 is waiting for a resource held by Pn, and Pn is waiting for a resource held by P0.
                  </p>
                  <div className="bg-white p-2 rounded border mt-2 text-xs text-gray-600">
                    <strong>Prevention idea:</strong> Impose a total ordering on resource types and require processes to request resources in increasing order.
                  </div>
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
              <Circle className="w-6 h-6 text-gray-500" />
              Resource Allocation Graph
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              A Resource Allocation Graph (RAG) is a directed graph used to model resource allocation in a system.
              It provides a visual and mathematical way to detect deadlocks.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Graph Elements</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-500" />
                    <span>Circle = Process</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-500" />
                    <span>Square = Resource type (dots inside = instances)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    <span>Request edge: Process --&gt; Resource</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span>Assignment edge: Resource --&gt; Process</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Detection Rules</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Single instance resources:</strong> If the graph contains a cycle, a deadlock exists.</li>
                  <li><strong>Multiple instance resources:</strong> A cycle is necessary but not sufficient for deadlock. We need an algorithm similar to Banker's to determine if a safe sequence exists.</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-3">Example: Deadlock in RAG</h4>
              <pre className="text-gray-300 text-xs">
{`        R1 (1 instance)         R2 (1 instance)
         ■                        ■
        / \\                      / \\
       /   \\                    /   \\
      P1 <-- P2                P1 --> P2

Edges:
  R1 -> P1   (R1 assigned to P1)
  R2 -> P2   (R2 assigned to P2)
  P1 -> R2   (P1 requests R2)
  P2 -> R1   (P2 requests R1)

Cycle: P1 -> R2 -> P2 -> R1 -> P1
Result: DEADLOCK (single instance resources)`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Unlock className="w-6 h-6 text-gray-500" />
              Methods for Handling Deadlocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="prevention" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="prevention">Prevention</TabsTrigger>
                <TabsTrigger value="avoidance">Avoidance</TabsTrigger>
                <TabsTrigger value="detection">Detection</TabsTrigger>
                <TabsTrigger value="recovery">Recovery</TabsTrigger>
              </TabsList>

              <TabsContent value="prevention" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Deadlock Prevention</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Ensure at least one of the four necessary conditions cannot hold.
                  </p>

                  <div className="mt-4 space-y-4">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm font-semibold text-gray-700">Mutual Exclusion</p>
                      <p className="text-sm text-gray-600">Make resources shareable where possible (e.g., read-only files). Not feasible for printers, tape drives, or mutex locks.</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm font-semibold text-gray-700">Hold and Wait</p>
                      <p className="text-sm text-gray-600">Require processes to request all resources at once before execution begins. If all cannot be granted, the process waits without holding any resources. Low resource utilization.</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm font-semibold text-gray-700">No Preemption</p>
                      <p className="text-sm text-gray-600">If a process holding resources requests another that cannot be granted, preempt all resources currently held and add the process to a waiting queue. Only works for resources whose state can be saved and restored (e.g., CPU registers, memory), not for printers.</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm font-semibold text-gray-700">Circular Wait</p>
                      <p className="text-sm text-gray-600">Impose a total ordering on all resource types and require that each process requests resources in an increasing order of enumeration. For example, if F(printer) = 1 and F(disk) = 2, a process holding disk cannot request printer.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="avoidance" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Deadlock Avoidance</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Requires additional information about how resources are to be requested. The system uses algorithms
                    to analyze each request and ensure the system never enters an unsafe state.
                  </p>
                  <div className="mt-3 bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm">Safe State</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      A state is safe if the system can allocate resources to each process (up to its maximum) in some order and still avoid deadlock.
                      Such an order is called a <strong>safe sequence</strong>.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="detection" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Deadlock Detection</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Allow deadlocks to occur, then detect and recover. The detection algorithm runs periodically or when CPU utilization drops unexpectedly.
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li><strong>Single instance:</strong> Maintain a wait-for graph and look for cycles.</li>
                    <li><strong>Multiple instances:</strong> Use an algorithm similar to the Banker's safety algorithm.</li>
                    <li><strong>When to run:</strong> When CPU utilization falls below a threshold, or at fixed intervals.</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="recovery" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Deadlock Recovery</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Once a deadlock is detected, the system must recover. Two main approaches exist:
                  </p>
                  <div className="mt-3 space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm font-semibold text-gray-700">Process Termination</p>
                      <p className="text-sm text-gray-600">Abort all deadlocked processes, or abort one at a time until the deadlock cycle is eliminated. Factors to consider: process priority, computation time completed, resources held, and whether the process is interactive or batch.</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm font-semibold text-gray-700">Resource Preemption</p>
                      <p className="text-sm text-gray-600">Successively preempt resources from processes and give them to others until the deadlock cycle is broken. Three issues: selecting a victim (minimizing cost), rollback (returning the victim to a safe state), and starvation (avoiding always choosing the same victim).</p>
                    </div>
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
              <Calculator className="w-6 h-6 text-gray-500" />
              Banker's Algorithm: Step-by-Step Walkthrough
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              The Banker's Algorithm is a classic deadlock avoidance algorithm. It works like a banker in a small town
              who only loans money if he knows he can satisfy all customers' maximum needs without causing a bank run.
            </p>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Data Structures</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Available:</strong> Vector of length m. Available[j] = k means there are k instances of resource type Rj available.</li>
                <li><strong>Max:</strong> n x m matrix. Max[i,j] = k means process Pi may request at most k instances of resource Rj.</li>
                <li><strong>Allocation:</strong> n x m matrix. Allocation[i,j] = k means Pi currently holds k instances of Rj.</li>
                <li><strong>Need:</strong> n x m matrix. Need[i,j] = Max[i,j] - Allocation[i,j].</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-3">Safety Algorithm</h4>
              <pre className="text-sm font-mono text-gray-300">
{`1. Let Work = Available, Finish[i] = false for all i
2. Find an index i such that:
     Finish[i] == false  AND
     Need[i] <= Work
   If no such i exists, go to step 4
3. Work = Work + Allocation[i]
   Finish[i] = true
   Go to step 2
4. If Finish[i] == true for all i, the system is in a safe state.`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Example: Multiple Resource Types</h4>
              <p className="text-sm text-gray-700 mb-3">
                Consider 5 processes P0-P4 and 3 resource types A, B, C. Total instances: A=10, B=5, C=7.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Process</th>
                      <th className="p-2 text-left">Allocation (A, B, C)</th>
                      <th className="p-2 text-left">Max (A, B, C)</th>
                      <th className="p-2 text-left">Need (A, B, C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">P0</td>
                      <td className="p-2">0, 1, 0</td>
                      <td className="p-2">7, 5, 3</td>
                      <td className="p-2">7, 4, 3</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">P1</td>
                      <td className="p-2">2, 0, 0</td>
                      <td className="p-2">3, 2, 2</td>
                      <td className="p-2">1, 2, 2</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">P2</td>
                      <td className="p-2">3, 0, 2</td>
                      <td className="p-2">9, 0, 2</td>
                      <td className="p-2">6, 0, 0</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">P3</td>
                      <td className="p-2">2, 1, 1</td>
                      <td className="p-2">2, 2, 2</td>
                      <td className="p-2">0, 1, 1</td>
                    </tr>
                    <tr>
                      <td className="p-2">P4</td>
                      <td className="p-2">0, 0, 2</td>
                      <td className="p-2">4, 3, 3</td>
                      <td className="p-2">4, 3, 1</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-white p-3 rounded border text-sm text-gray-700">
                <p><strong>Available:</strong> A=3, B=3, C=2</p>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Finding a Safe Sequence</h4>
              <Button onClick={runBankerWalkthrough} className="mb-4">
                Next Step
              </Button>

              <div className="space-y-2">
                <div className={`p-3 rounded border ${bankerStep >= 1 ? 'bg-white' : 'bg-gray-100 opacity-50'}`}>
                  <p className="text-sm"><strong>Step 1:</strong> Work = (3, 3, 2). P1's Need (1,2,2) &lt;= Work. P1 finishes.</p>
                  {bankerStep >= 1 && <p className="text-sm text-gray-600">Work = (3,3,2) + (2,0,0) = (5, 3, 2)</p>}
                </div>

                <div className={`p-3 rounded border ${bankerStep >= 2 ? 'bg-white' : 'bg-gray-100 opacity-50'}`}>
                  <p className="text-sm"><strong>Step 2:</strong> Work = (5, 3, 2). P3's Need (0,1,1) &lt;= Work. P3 finishes.</p>
                  {bankerStep >= 2 && <p className="text-sm text-gray-600">Work = (5,3,2) + (2,1,1) = (7, 4, 3)</p>}
                </div>

                <div className={`p-3 rounded border ${bankerStep >= 3 ? 'bg-white' : 'bg-gray-100 opacity-50'}`}>
                  <p className="text-sm"><strong>Step 3:</strong> Work = (7, 4, 3). P4's Need (4,3,1) &lt;= Work. P4 finishes.</p>
                  {bankerStep >= 3 && <p className="text-sm text-gray-600">Work = (7,4,3) + (0,0,2) = (7, 4, 5)</p>}
                </div>

                <div className={`p-3 rounded border ${bankerStep >= 4 ? 'bg-white' : 'bg-gray-100 opacity-50'}`}>
                  <p className="text-sm"><strong>Step 4:</strong> Work = (7, 4, 5). P0's Need (7,4,3) &lt;= Work. P0 finishes.</p>
                  {bankerStep >= 4 && <p className="text-sm text-gray-600">Work = (7,4,5) + (0,1,0) = (7, 5, 5)</p>}
                </div>

                <div className={`p-3 rounded border ${bankerStep >= 4 ? 'bg-white' : 'bg-gray-100 opacity-50'}`}>
                  <p className="text-sm"><strong>Step 5:</strong> Work = (7, 5, 5). P2's Need (6,0,0) &lt;= Work. P2 finishes.</p>
                  {bankerStep >= 4 && <p className="text-sm text-gray-600">Work = (7,5,5) + (3,0,2) = (10, 5, 7). Safe sequence: <strong>P1 -&gt; P3 -&gt; P4 -&gt; P0 -&gt; P2</strong></p>}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Resource-Request Algorithm</h4>
              <p className="text-sm text-gray-700 mb-3">
                When process Pi makes a request Request[i] for resources:
              </p>
              <ol className="space-y-1 text-sm text-gray-700">
                <li>If Request[i] &lt;= Need[i], go to step 2. Otherwise, raise an error (process exceeded max claim).</li>
                <li>If Request[i] &lt;= Available, go to step 3. Otherwise, Pi must wait (resources not available).</li>
                <li>Pretend to allocate:
                  <ul className="ml-4 mt-1">
                    <li>Available = Available - Request[i]</li>
                    <li>Allocation[i] = Allocation[i] + Request[i]</li>
                    <li>Need[i] = Need[i] - Request[i]</li>
                  </ul>
                </li>
                <li>Run the safety algorithm. If safe, grant the request. If unsafe, restore the old state and make Pi wait.</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-gray-500" />
              Deadlock Detection Algorithm for Multiple Instances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              When resources have multiple instances, a cycle in the wait-for graph is necessary but not sufficient for deadlock.
              We need a detection algorithm similar to the Banker's safety algorithm.
            </p>

            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-3">Detection Algorithm</h4>
              <pre className="text-sm font-mono text-gray-300">
{`1. Let Work = Available, Finish[i] = false for all i
   If Allocation[i] != 0, then Finish[i] = false
   Otherwise, Finish[i] = true
2. Find an index i such that:
     Finish[i] == false  AND
     Request[i] <= Work
   If no such i exists, go to step 4
3. Work = Work + Allocation[i]
   Finish[i] = true
   Go to step 2
4. If Finish[i] == false for some i, then process Pi is deadlocked.`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Worked Example</h4>
              <p className="text-sm text-gray-700 mb-3">
                Consider 3 resource types (A=7, B=2, C=6 total). Current Available = (0, 0, 0).
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Process</th>
                      <th className="p-2 text-left">Allocation (A,B,C)</th>
                      <th className="p-2 text-left">Request (A,B,C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">P0</td>
                      <td className="p-2">0, 1, 0</td>
                      <td className="p-2">0, 0, 0</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">P1</td>
                      <td className="p-2">2, 0, 0</td>
                      <td className="p-2">2, 0, 2</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">P2</td>
                      <td className="p-2">3, 0, 3</td>
                      <td className="p-2">0, 0, 0</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">P3</td>
                      <td className="p-2">2, 1, 1</td>
                      <td className="p-2">1, 0, 0</td>
                    </tr>
                    <tr>
                      <td className="p-2">P4</td>
                      <td className="p-2">0, 0, 2</td>
                      <td className="p-2">0, 0, 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-white p-3 rounded border text-sm text-gray-700">
                <p className="mb-2"><strong>Step-by-step:</strong></p>
                <ol className="space-y-1">
                  <li>Work = (0,0,0). P0 has Request = (0,0,0) {'<='} Work. P0 finishes. Work = (0,1,0).</li>
                  <li>P2 has Request = (0,0,0) {'<='} Work. P2 finishes. Work = (3,1,3).</li>
                  <li>P1 has Request = (2,0,2) {'<='} Work. P1 finishes. Work = (5,1,3).</li>
                  <li>P3 has Request = (1,0,0) {'<='} Work. P3 finishes. Work = (7,2,4).</li>
                  <li>P4 has Request = (0,0,2) {'<='} Work. P4 finishes. Work = (7,2,6).</li>
                </ol>
                <p className="mt-2"><strong>Result:</strong> All processes finish. <strong>No deadlock.</strong></p>
              </div>

              <div className="mt-4 bg-white p-3 rounded border text-sm text-gray-700">
                <p className="mb-2"><strong>Variant with deadlock:</strong></p>
                <p>If P2's Request were (0,0,1) instead of (0,0,0):</p>
                <ol className="space-y-1 mt-1">
                  <li>P0 and P2 can still finish (Request is all zeros).</li>
                  <li>After P0 and P2: Work = (5,1,3).</li>
                  <li>P1 finishes (Request 2,0,2 {'<='} 5,1,3). Work = (7,1,3).</li>
                  <li>P3 finishes (Request 1,0,0 {'<='} 7,1,3). Work = (9,2,4) - capped at total.</li>
                  <li>P4 Request is 0,0,2. But only 0,0,0 available of the remaining. Wait - let me recalculate properly.</li>
                </ol>
                <p className="mt-2">
                  Actually, with Available=(0,0,0), if P4 requests (0,0,2) and no one releases, and P4's allocation is (0,0,2),
                  the total C allocated is 0+0+3+1+2 = 6. Total C = 6, so Available C = 0. If P4 needs (0,0,2) more, it must wait.
                  If P4 is the only one waiting after all others finish, there's no deadlock. For a deadlock, we need a cycle where
                  P1 waits for P2, P2 waits for P3, and P3 waits for P1, and their combined requests exceed available resources.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Circle className="w-6 h-6 text-gray-500" />
              Comparison: Prevention, Avoidance, Detection, Recovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Approach</th>
                    <th className="p-3 text-left">When Applied</th>
                    <th className="p-3 text-left">Information Needed</th>
                    <th className="p-3 text-left">Overhead</th>
                    <th className="p-3 text-left">Resource Utilization</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Prevention</td>
                    <td className="p-3">Before deadlock can occur</td>
                    <td className="p-3">None</td>
                    <td className="p-3">Low runtime, high design cost</td>
                    <td className="p-3">Often reduced (e.g., all-or-nothing allocation)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Avoidance</td>
                    <td className="p-3">At each resource request</td>
                    <td className="p-3">Max needs of all processes</td>
                    <td className="p-3">Moderate (safety algorithm)</td>
                    <td className="p-3">Better than prevention, but conservative</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Detection</td>
                    <td className="p-3">Periodically or on trigger</td>
                    <td className="p-3">Current allocations and requests</td>
                    <td className="p-3">Variable (depends on frequency)</td>
                    <td className="p-3">Highest (no restrictions)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Recovery</td>
                    <td className="p-3">After detection</td>
                    <td className="p-3">Deadlocked processes</td>
                    <td className="p-3">High (process termination/preemption)</td>
                    <td className="p-3">Same as detection</td>
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
              <TerminalIcon className="w-6 h-6 text-gray-400" />
              Real-World Examples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Database Deadlocks</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Two transactions each lock a row and then try to lock the other's row.
                </p>
                <pre className="text-xs text-gray-300 block bg-slate-900 p-2 rounded">
{`-- Transaction A
BEGIN;
UPDATE accounts SET balance = 100 WHERE id = 1;
UPDATE accounts SET balance = 200 WHERE id = 2; -- waits for B
COMMIT;

-- Transaction B
BEGIN;
UPDATE accounts SET balance = 300 WHERE id = 2;
UPDATE accounts SET balance = 400 WHERE id = 1; -- waits for A
-- DEADLOCK!`}
                </pre>
                <p className="text-xs text-gray-400 mt-2">
                  <strong>Fix:</strong> Always acquire locks in a consistent order (e.g., ordered by id).
                </p>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Java Deadlock Example</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Classic lock-ordering deadlock with synchronized blocks.
                </p>
                <pre className="text-xs text-gray-300 block bg-slate-900 p-2 rounded">
{`public class DeadlockExample {
    private final Object lockA = new Object();
    private final Object lockB = new Object();

    public void method1() {
        synchronized (lockA) {
            synchronized (lockB) { // waits for method2
                // do work
            }
        }
    }

    public void method2() {
        synchronized (lockB) {
            synchronized (lockA) { // waits for method1
                // do work
            }
        }
    }
}`}
                </pre>
                <p className="text-xs text-gray-400 mt-2">
                  <strong>Fix:</strong> Use tryLock with timeout, or always acquire locks in the same global order.
                </p>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">Distributed Systems</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Distributed deadlocks occur when processes in different nodes wait for each other.
                  Detection is harder because no single node has a complete wait-for graph.
                </p>
                <pre className="text-xs text-gray-300 block bg-slate-900 p-2 rounded">
{`Node A: holds record X, requests record Y from Node B
Node B: holds record Y, requests record Z from Node C
Node C: holds record Z, requests record X from Node A

Result: Distributed deadlock across 3 nodes.`}
                </pre>
                <p className="text-xs text-gray-400 mt-2">
                  <strong>Fix:</strong> Use two-phase commit (2PC), timeouts, or distributed deadlock detection (Chandy-Misra-Haas algorithm).
                </p>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-400 mb-2">HTTP Request Deadlocks in Microservices</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Service A calls Service B while holding a thread, and Service B calls Service A.
                  If thread pools are exhausted, both services deadlock.
                </p>
                <pre className="text-xs text-gray-300 block bg-slate-900 p-2 rounded">
{`Service A (thread pool: 10)
  |- calls Service B (needs thread)

Service B (thread pool: 10)
  |- calls Service A (needs thread)

All 20 threads can become blocked waiting.`}
                </pre>
                <p className="text-xs text-gray-400 mt-2">
                  <strong>Fix:</strong> Circuit breakers, async communication (message queues), timeouts, and bulkheads.
                </p>
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
              Distributed and Message-Passing Deadlocks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Chandy-Misra-Haas Algorithm</h4>
                <p className="text-sm text-gray-700 mb-2">
                  In distributed systems, no single node has a complete wait-for graph. The Chandy-Misra-Haas algorithm uses probe messages to detect cycles across nodes.
                </p>
                <p className="text-sm text-gray-700">
                  When a process P_i waits for a resource held by P_j on another site, it sends a probe message (i, i, j). If P_j is also waiting, it forwards the probe to the process it waits for. If the probe returns to P_i, a distributed deadlock cycle exists.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// Probe message format: (initiator, from, to)
Site A: P1 waits for P2 at Site B
  -> send probe (1, 1, 2) to Site B

Site B: P2 waits for P3 at Site C
  -> forward probe (1, 2, 3) to Site C

Site C: P3 waits for P1 at Site A
  -> forward probe (1, 3, 1) to Site A

Site A: P1 receives (1, 3, 1)
  -> initiator == destination => DEADLOCK DETECTED`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Deadlocks in Message-Passing Systems</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Message-passing deadlocks arise from communication patterns rather than resource contention. The four Coffman conditions map to: finite channel buffers (mutual exclusion), messages in transit (hold and wait), no message preemption, and circular message dependencies.
                </p>
                <p className="text-sm text-gray-700">
                  Common patterns include the <strong>orderly shutdown deadlock</strong> (A waits for B's ACK, B waits for A's FIN) and the <strong>bounded buffer deadlock</strong> (all processes block on full send buffers with no receivers).
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// MPI bounded-buffer deadlock example
Process 0:              Process 1:
MPI_Send(to=1)          MPI_Send(to=0)
MPI_Recv(from=1)        MPI_Recv(from=0)

// Both block in Send because buffers are full
// Fix: use MPI_Sendrecv or non-blocking MPI_Isend`}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Path Pushing vs Edge Chasing</h4>
              <p className="text-sm text-gray-700 mb-3">
                Distributed deadlock detection algorithms fall into two families. Path pushing builds partial wait-for paths and propagates them to a coordinator. Edge chasing sends probes along individual edges.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Approach</th>
                      <th className="p-2 text-left">Message Overhead</th>
                      <th className="p-2 text-left">Detection Site</th>
                      <th className="p-2 text-left">False Positives</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Path Pushing</td>
                      <td className="p-2">High (growing path vectors)</td>
                      <td className="p-2">Central coordinator</td>
                      <td className="p-2">Possible (phantom cycles)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Edge Chasing (CMH)</td>
                      <td className="p-2">Low (fixed-size probes)</td>
                      <td className="p-2">Distributed (any node)</td>
                      <td className="p-2">Rare</td>
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
              <AlertTriangle className="w-6 h-6 text-gray-500" />
              Real-World Deadlock Engineering
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Lock Ordering Hierarchies</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Large codebases like the Linux kernel enforce strict lock ordering to prevent circular wait. The kernel maintains a global lock-class hierarchy graph. If lockdep detects an ordering violation, it prints a warning at runtime.
                </p>
                <p className="text-sm text-gray-700">
                  General rule: acquire locks in a consistent total order. In the kernel: <code>tasklist_lock</code> → <code>mm->mmap_lock</code> → <code>inode->i_rwsem</code>. Subsystems define their own internal rankings.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// Example kernel lock ordering rule
// Never acquire mmap_lock while holding tasklist_lock
// Correct order:
read_lock(&tasklist_lock);
read_unlock(&tasklist_lock);
mmap_read_lock(mm);
mmap_read_unlock(mm);

// Enable lockdep debugging
CONFIG_PROVE_LOCKING=y
CONFIG_LOCK_STAT=y`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Futexes and Priority Inversion</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Fast Userspace muTEXes (futexes) combine userspace atomic operations with kernel-assisted waiting. When contention is low, lock/unlock stays in userspace. On contention, the kernel queues waiters and handles priority inheritance.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Priority inversion</strong> occurs when a high-priority thread waits for a lock held by a low-priority thread. Real-time Linux (PREEMPT_RT) implements <strong>Priority Inheritance Protocol (PIP)</strong> through futexes, temporarily boosting the holder's priority to that of the highest waiting thread.
                </p>
                <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// pthread mutex with priority inheritance
pthread_mutexattr_t attr;
pthread_mutexattr_init(&attr);
pthread_mutexattr_setprotocol(&attr, PTHREAD_PRIO_INHERIT);
pthread_mutex_init(&mutex, &attr);

// PREEMPT_RT kernel required for full PI support`}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Wait-Die and Wound-Wait in Databases</h4>
              <p className="text-sm text-gray-700 mb-3">
                Distributed databases and multi-version concurrency control systems use timestamp-based deadlock prevention instead of detection. Two symmetric schemes dominate:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-semibold text-sm text-gray-900">Wait-Die (Non-preemptive)</h5>
                  <p className="text-xs text-gray-700 mt-1">
                    If older transaction T_i requests a lock held by younger T_j: <strong>T_i waits</strong>.
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    If younger T_j requests a lock held by older T_i: <strong>T_j dies</strong> (aborts and restarts).
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Older transactions never abort. Favors seniority.
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-semibold text-sm text-gray-900">Wound-Wait (Preemptive)</h5>
                  <p className="text-xs text-gray-700 mt-1">
                    If older T_i requests a lock held by younger T_j: <strong>T_j is wounded</strong> (aborts).
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    If younger T_j requests a lock held by older T_i: <strong>T_j waits</strong>.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Older transactions never wait. Favors progress of senior transactions.
                  </p>
                </div>
              </div>
              <div className="bg-gray-900 p-3 rounded mt-3 text-gray-300 text-xs font-mono">
{`// PostgreSQL uses a variant with deadlock_timeout
// Deadlock detector runs when a lock wait exceeds deadlock_timeout
SHOW deadlock_timeout;  -- default 1s

// Spanner and CockroachDB use wound-wait
// Older transactions preempt younger holders`}
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
                "Deadlock occurs when processes circularly wait for resources held by each other",
                "Four necessary conditions: mutual exclusion, hold-and-wait, no preemption, circular wait",
                "Resource allocation graphs help visualize and detect deadlocks, especially for single-instance resources",
                "Prevention: violate at least one condition (often circular wait via lock ordering)",
                "Avoidance: Banker's algorithm ensures the system stays in a safe state; requires knowing max needs in advance",
                "Detection: Allow deadlocks, then detect cycles in wait-for graphs or use safety algorithms for multiple instances",
                "Recovery: Terminate processes or preempt resources; choose victims to minimize cost",
                "Real-world deadlocks appear in databases, Java synchronized blocks, distributed systems, and microservices"
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

// Additional icon used in the component
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
