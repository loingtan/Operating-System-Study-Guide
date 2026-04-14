import { motion } from 'framer-motion';
import { 
  Shield, Lock, Users, FileKey, CheckCircle,
  Server, Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter14() {
  return (
    <div className="space-y-8">
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 14</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Protection</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Deep dive into protection mechanisms, access control models, and real-world system security implementations
        </p>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-gray-500" />
              Goals and Principles of Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                <strong>Protection</strong> refers to a mechanism for controlling the access of programs, processes, or users to the resources defined by a computer system. It is distinct from <strong>security</strong>, which is a broader policy issue concerned with external threats. Protection is concerned with internal access control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Primary Goals of Protection</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Prevent malicious misuse:</strong> Stop deliberately harmful programs or users from accessing unauthorized resources.</li>
                  <li>• <strong>Prevent accidental misuse:</strong> Ensure that bugs in one user's program do not corrupt other users' data or the system itself.</li>
                  <li>• <strong>Ensure fair resource usage:</strong> Guarantee that each process accesses only the resources it has been allocated.</li>
                  <li>• <strong>Support least privilege:</strong> Limit the potential damage from security breaches by restricting permissions.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Principle of Least Privilege</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Programs, users, and systems should be given just enough privileges to perform their tasks and no more. This minimizes the attack surface and limits the damage from compromised components.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`// Example: A web server should not run as root
// Instead, it should:
// 1. Open privileged port 80 as root
// 2. Drop privileges to unprivileged user
// 3. Serve requests with minimal permissions
setuid(nobody_uid);  // Drop root privileges`}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Protection vs Security</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Aspect</th>
                      <th className="p-3 text-left">Protection</th>
                      <th className="p-3 text-left">Security</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Scope</td>
                      <td className="p-3">Internal access control</td>
                      <td className="p-3">External threats and policies</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Focus</td>
                      <td className="p-3">Mechanisms (how to enforce)</td>
                      <td className="p-3">Policies (what to enforce)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Examples</td>
                      <td className="p-3">Memory protection, file permissions, access matrices</td>
                      <td className="p-3">Firewalls, encryption, authentication</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Threat Source</td>
                      <td className="p-3">Insiders, buggy programs</td>
                      <td className="p-3">External attackers, malware</td>
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
              <Users className="w-6 h-6 text-gray-500" />
              Domain of Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              A <strong>protection domain</strong> specifies the resources that a process may access and the operations it may perform on each resource. Each domain defines a set of (object, rights) pairs.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Domain Elements</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Object:</strong> Any resource (file, printer, memory segment, semaphore, CPU).</li>
                  <li>• <strong>Rights:</strong> The set of operations allowed on the object (read, write, execute, append, delete, etc.).</li>
                  <li>• <strong>Domain:</strong> A collection of access rights, effectively defining a security context.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Domain Switching</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Processes may need to switch domains to perform privileged operations. The most common example is a user process switching to kernel mode via a system call.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`User Domain:
  Objects: own memory, files
  Rights: read, write (own data)

System Call (trap):
  Switch to Kernel Domain
  
Kernel Domain:
  Objects: all memory, all devices
  Rights: full control

Return from syscall:
  Switch back to User Domain`}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">UNIX Protection Domains</h4>
              <p className="text-sm text-gray-700 mb-3">
                In UNIX, a protection domain is associated with the user. When a user logs in, the shell runs in that user's domain. The domain changes when the effective user ID (EUID) changes.
              </p>
              <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`$ id
uid=1000(alice) gid=1000(alice) groups=1000(alice),24(cdrom)

// Alice's domain includes:
// - All files owned by uid 1000
// - All files with group read/execute for gid 1000 or 24
// - All world-readable files

// Setuid program switches domain temporarily:
$ ls -l /bin/ping
-rwsr-xr-x 1 root root ping
// When alice runs ping, it temporarily enters root's domain`}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileKey className="w-6 h-6 text-gray-500" />
              Access Matrix Model
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              The <strong>access matrix</strong> is a general model of protection. Rows represent domains, columns represent objects, and each entry specifies the access rights of the domain to the object.
            </p>

            <div className="bg-gray-100 p-5 rounded-lg overflow-x-auto">
              <h4 className="font-semibold text-gray-900 mb-3">Example Access Matrix</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Domain / Object</th>
                    <th className="p-2 border">File F1</th>
                    <th className="p-2 border">File F2</th>
                    <th className="p-2 border">File F3</th>
                    <th className="p-2 border">Printer</th>
                    <th className="p-2 border">Domain D1</th>
                    <th className="p-2 border">Domain D2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border font-semibold">D1</td>
                    <td className="p-2 border">read</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border">read</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border">switch</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">D2</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border">read, write</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border">print</td>
                    <td className="p-2 border">switch</td>
                    <td className="p-2 border"></td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">D3</td>
                    <td className="p-2 border">read</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border">read, write</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Operations on the Access Matrix</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Access right transfer:</strong> A process in domain D_i can copy an access right for object O_j into any other domain D_k that has switch rights to D_i. This can be limited to copy (the original retains the right) or transfer (the original loses the right).</li>
                <li><strong>Access right amplification:</strong> A process in domain D_i can expand the set of access rights for object O_j. This is dangerous and rarely allowed.</li>
                <li><strong>Access right revocation:</strong> A domain removes an access right from another domain. We will discuss this in detail later.</li>
                <li><strong>Domain switching:</strong> A process moves from domain D_i to domain D_j if the access matrix entry (D_i, D_j) contains the switch right.</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Access Matrix as a Graph</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
    Domain D1          Domain D2          Domain D3
        |                  |                  |
        | read             | read, write      | read, write
        v                  v                  v
    +-------+          +-------+          +-------+
    | File  |          | File  |          | File  |
    |  F1   |          |  F2   |          |  F3   |
    +-------+          +-------+          +-------+
        ^                  |                  |
        | read             | print            |
        |                  v                  |
    +----------------+  +---------+  +----------------+
    |   Domain D3    |  | Printer |  |   Domain D1    |
    +----------------+  +---------+  +----------------+
                              ^
                              | switch
                         +---------+
                         |Domain D2|
                         +---------+
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
              <Database className="w-6 h-6 text-gray-500" />
              Implementing the Access Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              A full access matrix is usually sparse and too large to store directly. Operating systems implement it using more efficient data structures.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">1. Global Table</h4>
                <p className="text-sm text-gray-700 mb-2">
                  A single table of ordered triples (domain, object, rights-set). Simple but large and slow to search.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono">
{`(D1, F1, {read})
(D1, F3, {read})
(D1, D2, {switch})
(D2, F2, {read, write})
(D2, Printer, {print})
(D2, D1, {switch})
(D3, F1, {read})
(D3, F3, {read, write})`}
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">2. Access Lists (by Column)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Store the matrix by column. Each object has a list of (domain, rights) pairs. This is how UNIX file permissions work.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono">
{`File F1: (D1, {read}), (D3, {read})
File F2: (D2, {read, write})
File F3: (D1, {read}), (D3, {read, write})
Printer: (D2, {print})
Domain D1: (D2, {switch})
Domain D2: (D1, {switch})`}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">3. Capability Lists (by Row)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Store the matrix by row. Each domain has a list of (object, rights) pairs called capabilities. A capability acts like a ticket - possession implies authorization.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono">
{`Domain D1: (F1, read), (F3, read), (D2, switch)
Domain D2: (F2, read-write), (Printer, print), (D1, switch)
Domain D3: (F1, read), (F3, read-write)`}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Used in distributed systems and some research OSes (e.g., Hydra, EROS). Harder to revoke globally.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">4. Lock-Key Mechanism</h4>
                <p className="text-sm text-gray-700 mb-2">
                  A compromise between access lists and capabilities. Each object has a list of unique locks, and each domain has a list of keys.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono">
{`Object F1: locks = [L1, L3]
Object F2: locks = [L2]

Domain D1: keys = [K1]  -> can access F1 (K1 matches L1)
Domain D2: keys = [K2]  -> can access F2 (K2 matches L2)
Domain D3: keys = [K1, K3] -> can access F1 (K1 matches L1)`}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Revocation is easy: remove the lock from the object. Used in some mainframe systems.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Comparison of Implementations</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Implementation</th>
                      <th className="p-3 text-left">Space Efficiency</th>
                      <th className="p-3 text-left">Revocation Ease</th>
                      <th className="p-3 text-left">Lookup Speed</th>
                      <th className="p-3 text-left">Real-World Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Global Table</td>
                      <td className="p-3">Poor (sparse)</td>
                      <td className="p-3">Easy</td>
                      <td className="p-3">Slow (linear search)</td>
                      <td className="p-3">Theoretical only</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Access List</td>
                      <td className="p-3">Good</td>
                      <td className="p-3">Easy</td>
                      <td className="p-3">Fast (per object)</td>
                      <td className="p-3">UNIX ACLs, Windows DACLs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Capability List</td>
                      <td className="p-3">Good</td>
                      <td className="p-3">Hard</td>
                      <td className="p-3">Fast (per domain)</td>
                      <td className="p-3">EROS, seL4, file descriptors</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Lock-Key</td>
                      <td className="p-3">Moderate</td>
                      <td className="p-3">Moderate</td>
                      <td className="p-3">Moderate</td>
                      <td className="p-3">Historical mainframes</td>
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
              <Lock className="w-6 h-6 text-gray-500" />
              Revocation of Access Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Access rights may need to be revoked for various reasons: an employee leaves, a process terminates, or a security breach is detected. The mechanism for revocation depends on how the access matrix is implemented.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Dimensions of Revocation</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Immediate vs. delayed:</strong> Immediate revocation removes the right at once. Delayed revocation removes it only when the holder next tries to use it.</li>
                  <li>• <strong>Selective vs. general:</strong> Selective revocation removes rights from a specific domain. General revocation removes rights from all domains.</li>
                  <li>• <strong>Partial vs. total:</strong> Partial revocation removes some rights (e.g., write but not read). Total revocation removes all rights.</li>
                  <li>• <strong>Temporary vs. permanent:</strong> Temporary revocation can be restored later. Permanent revocation is final.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Revocation in Capability Systems</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Capability-based systems face a unique challenge: capabilities are distributed to domains, and the object owner may not know all holders.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Reacquisition:</strong> Periodically require domains to revalidate capabilities.</li>
                  <li>• <strong>Back-pointers:</strong> Maintain a list of all domains holding a capability for an object. Expensive to maintain.</li>
                  <li>• <strong>Indirection:</strong> Capabilities point to an entry in a central table. Revocation updates the central table.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Capability Revocation via Indirection</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
Before Revocation:
  Domain D1 --> Capability C1 --> Object Entry E1 --> File F1
  Domain D2 --> Capability C2 --> Object Entry E1 --> File F1

After Revocation:
  Domain D1 --> Capability C1 --> Object Entry E1 --> NULL
  Domain D2 --> Capability C2 --> Object Entry E1 --> NULL

The central object entry is updated, invalidating all capabilities
that point to it simultaneously.
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
              <Users className="w-6 h-6 text-gray-500" />
              Access Control Models: RBAC, MAC, and DAC
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Role-Based Access Control (RBAC)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Access rights are associated with roles, and users are assigned to roles. This simplifies administration in large organizations.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`Roles:
  admin:     {read, write, delete} on all files
  developer: {read, write} on /src/*
  tester:    {read, execute} on /build/*
  guest:     {read} on /public/*

Users:
  alice -> roles: {admin, developer}
  bob   -> roles: {developer}
  carol -> roles: {tester, guest}`}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  RBAC reduces complexity because permissions are managed per role, not per user.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Mandatory Access Control (MAC)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  In MAC, access control policy is centrally controlled by a security administrator. Users cannot override the policy. Common in military and high-security environments.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Based on security labels (e.g., Top Secret, Secret, Confidential, Unclassified).</li>
                  <li>• Simple Security Property (no read up): A subject can read only objects at its level or below.</li>
                  <li>• *-Property (no write down): A subject can write only objects at its level or above.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">MAC vs DAC</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Feature</th>
                      <th className="p-3 text-left">Discretionary Access Control (DAC)</th>
                      <th className="p-3 text-left">Mandatory Access Control (MAC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Control</td>
                      <td className="p-3">Object owner decides access</td>
                      <td className="p-3">System-wide policy enforced by OS</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Flexibility</td>
                      <td className="p-3">High</td>
                      <td className="p-3">Low</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Security</td>
                      <td className="p-3">Moderate (depends on users)</td>
                      <td className="p-3">High (tamper-proof)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Examples</td>
                      <td className="p-3">UNIX permissions, Windows ACLs</td>
                      <td className="p-3">SELinux, AppArmor, Trusted Solaris</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Use Case</td>
                      <td className="p-3">General purpose computing</td>
                      <td className="p-3">Government, defense, regulated industries</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-6 h-6 text-gray-500" />
              Real-World: Linux Protection Mechanisms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="capabilities" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="capabilities">Linux Capabilities</TabsTrigger>
                <TabsTrigger value="selinux">SELinux/AppArmor</TabsTrigger>
                <TabsTrigger value="containers">Containers</TabsTrigger>
                <TabsTrigger value="seccomp">seccomp</TabsTrigger>
              </TabsList>

              <TabsContent value="capabilities" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  Linux capabilities break the traditional binary root/non-root model into fine-grained privileges. A process with CAP_NET_BIND_SERVICE can bind to ports below 1024 without being fully root.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`# List capabilities of a process
cat /proc/self/status | grep Cap

# Common capabilities:
# CAP_CHOWN        - change file ownership
# CAP_KILL         - send signals to any process
# CAP_NET_BIND_SERVICE - bind to ports < 1024
# CAP_SYS_ADMIN    - perform administrative tasks
# CAP_SYS_PTRACE   - trace arbitrary processes

# Set capability on binary
sudo setcap cap_net_bind_service=+ep /usr/bin/myserver

# Check capabilities
getcap /usr/bin/myserver
/usr/bin/myserver = cap_net_bind_service+ep`}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-sm">Effective (e), Permitted (p), Inheritable (i)</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• <strong>Effective:</strong> Currently active capabilities.</li>
                    <li>• <strong>Permitted:</strong> Maximum set of capabilities the process can assume.</li>
                    <li>• <strong>Inheritable:</strong> Capabilities preserved across execve().</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="selinux" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  SELinux (Security-Enhanced Linux) and AppArmor are MAC implementations for Linux. They enforce security policies that restrict what processes can do, independent of traditional user permissions.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-sm">SELinux</p>
                    <p className="text-xs text-gray-600 mt-1">Uses type enforcement and multi-level security. Every process and object has a label (context). Policies define allowed interactions.</p>
                    <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono mt-2">
{`# Check SELinux status
getenforce
# Enforcing / Permissive / Disabled

# View process context
ps -eZ | grep httpd
system_u:system_r:httpd_t:s0

# View file context
ls -Z /var/www/html
unconfined_u:object_r:httpd_sys_content_t`}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-sm">AppArmor</p>
                    <p className="text-xs text-gray-600 mt-1">Path-based profiles. Simpler than SELinux but less fine-grained. Each profile lists files and capabilities a program may access.</p>
                    <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono mt-2">
{`# Example AppArmor profile
/usr/sbin/nginx {
  /var/www/** r,
  /etc/nginx/** r,
  /var/log/nginx/** rw,
  capability net_bind_service,
  network inet stream,
}`}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="containers" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  Containers use multiple Linux kernel features to create isolated protection domains: namespaces for isolation, cgroups for resource limits, and capabilities for privilege restriction.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`# Run container with dropped capabilities
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx

# Run container in read-only mode
docker run --read-only nginx

# Run container with no-new-privileges
docker run --security-opt=no-new-privileges:true myapp

# Run container with custom seccomp profile
docker run --security-opt seccomp=custom.json myapp`}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-sm">chroot Jails</p>
                  <p className="text-xs text-gray-600 mt-1">The chroot system call changes the root directory of a process, limiting its view of the filesystem. Modern containers use pivot_root for stronger isolation.</p>
                  <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono mt-2">
{`# Create a minimal chroot jail
mkdir -p /jail/bin /jail/lib64
cp /bin/bash /jail/bin/
cp /lib64/ld-linux-x86-64.so.2 /jail/lib64/
chroot /jail /bin/bash`}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seccomp" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  seccomp (secure computing mode) restricts the system calls a process can make. It is a powerful capability-based protection mechanism that reduces the attack surface of the kernel.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`// seccomp-bpf filter example (pseudocode)
// Allow read, write, exit, exit_group
// Deny everything else

struct sock_filter filter[] = {
    BPF_STMT(BPF_LD+BPF_W+BPF_ABS, offsetof(struct seccomp_data, nr)),
    BPF_JUMP(BPF_JMP+BPF_JEQ+BPF_K, __NR_read, 0, 1),
    BPF_STMT(BPF_RET+BPF_K, SECCOMP_RET_ALLOW),
    BPF_JUMP(BPF_JMP+BPF_JEQ+BPF_K, __NR_write, 0, 1),
    BPF_STMT(BPF_RET+BPF_K, SECCOMP_RET_ALLOW),
    BPF_JUMP(BPF_JMP+BPF_JEQ+BPF_K, __NR_exit, 0, 1),
    BPF_STMT(BPF_RET+BPF_K, SECCOMP_RET_ALLOW),
    BPF_JUMP(BPF_JMP+BPF_JEQ+BPF_K, __NR_exit_group, 0, 1),
    BPF_STMT(BPF_RET+BPF_K, SECCOMP_RET_ALLOW),
    BPF_STMT(BPF_RET+BPF_K, SECCOMP_RET_KILL),
};`}
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  Docker's default seccomp profile blocks about 44 dangerous system calls (out of ~350), including mount, swapon, and reboot. This is a practical application of the principle of least privilege.
                </p>
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
                "Protection controls internal access to resources, while security addresses external threats",
                "The principle of least privilege limits each component to only the access rights it absolutely needs",
                "A protection domain defines the set of (object, rights) pairs available to a process",
                "The access matrix is a general protection model; it is implemented via global tables, access lists, capability lists, or lock-key mechanisms",
                "Capability-based systems are efficient for access checking but harder for global revocation",
                "RBAC simplifies administration by assigning permissions to roles rather than individual users",
                "MAC enforces system-wide policies that users cannot override; DAC allows object owners to control access",
                "Real-world Linux protection includes capabilities, SELinux/AppArmor, namespaces, chroot, and seccomp"
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
