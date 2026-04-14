import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, File, Lock, Server, Terminal,
  CheckCircle, Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter11() {
  const [showRealWorld, setShowRealWorld] = useState(false);

  return (
    <div className="space-y-8">
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 11</Badge>
        <h1 className="text-4xl font-bold text-gray-900">File-System Interface</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive deep dive into file concepts, directory structures, access methods, protection mechanisms, and real-world file system APIs
        </p>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <File className="w-6 h-6 text-gray-500" />
              File Concepts and Attributes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                A <strong>file</strong> is a named collection of related information recorded on secondary storage. From the user's perspective, it is the smallest unit of logical secondary storage. The OS abstracts the physical details of disk blocks, sectors, and cylinders, presenting a simple sequence of bytes or records.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">File Attributes (Metadata)</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Name:</strong> Human-readable symbolic name for the file.</li>
                  <li><strong>Identifier:</strong> Unique number (inode number) that identifies the file within the file system.</li>
                  <li><strong>Type:</strong> Regular file, directory, symbolic link, device file, socket, etc.</li>
                  <li><strong>Location:</strong> Pointer to the file location on device (e.g., disk block addresses in the inode).</li>
                  <li><strong>Size:</strong> Current file size in bytes, blocks, or words.</li>
                  <li><strong>Protection:</strong> Access control bits or ACLs defining who can read, write, or execute.</li>
                  <li><strong>Timestamps:</strong> Creation time, last access time, last modification time.</li>
                  <li><strong>Ownership:</strong> User ID (UID) and Group ID (GID) of the file owner.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">File Operations</h4>
                <p className="text-sm text-gray-700 mb-2">The OS provides a standard set of system calls for file manipulation:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Create:</strong> Allocate space in the file system and create a directory entry.</li>
                  <li><strong>Write:</strong> Write data at the current file position, updating the file pointer and size.</li>
                  <li><strong>Read:</strong> Read data from the current file position into a user buffer.</li>
                  <li><strong>Reposition/Seek:</strong> Move the file pointer to a specific byte offset.</li>
                  <li><strong>Delete:</strong> Remove the directory entry and deallocate disk blocks.</li>
                  <li><strong>Truncate:</strong> Reset file size to zero while keeping attributes.</li>
                  <li><strong>Open/Close:</strong> Load file metadata into memory (file table) and establish a file descriptor.</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-3">POSIX File Operations (C)</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`#include <fcntl.h>
#include <unistd.h>

int fd = open("data.txt", O_RDWR | O_CREAT, 0644);
if (fd < 0) {
    perror("open failed");
    return 1;
}

char buffer[1024];
ssize_t bytes_read = read(fd, buffer, sizeof(buffer));
off_t pos = lseek(fd, 0, SEEK_SET);  // reposition to start
ssize_t bytes_written = write(fd, "hello", 5);
close(fd);

// Atomic create-or-fail (used for lock files)
int fd2 = open("lock.txt", O_CREAT | O_EXCL, 0644);`}
              </pre>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">File Types</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Unix Notation</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-3 font-medium">Regular file</td><td className="p-3 font-mono">-</td><td className="p-3">Contains user data (text, binary)</td><td className="p-3">README.txt, a.out</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Directory</td><td className="p-3 font-mono">d</td><td className="p-3">Contains filenames and inode pointers</td><td className="p-3">/home, /usr/bin</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Symbolic link</td><td className="p-3 font-mono">l</td><td className="p-3">Pointer to another file by pathname</td><td className="p-3">/lib64 -&gt; /usr/lib64</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Character device</td><td className="p-3 font-mono">c</td><td className="p-3">Byte-stream device (terminal, serial)</td><td className="p-3">/dev/tty, /dev/null</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Block device</td><td className="p-3 font-mono">b</td><td className="p-3">Block-structured device (disk)</td><td className="p-3">/dev/sda, /dev/nvme0n1</td></tr>
                    <tr className="border-b"><td className="p-3 font-medium">Named pipe (FIFO)</td><td className="p-3 font-mono">p</td><td className="p-3">Inter-process communication channel</td><td className="p-3">myfifo</td></tr>
                    <tr><td className="p-3 font-medium">Socket</td><td className="p-3 font-mono">s</td><td className="p-3">Endpoint for network communication</td><td className="p-3">/run/docker.sock</td></tr>
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
              <Layers className="w-6 h-6 text-gray-500" />
              File Structure and Access Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Files can be structured in different ways depending on the needs of the application and the underlying operating system. The access method determines how data within a file is read and written.
            </p>

            <Tabs defaultValue="sequential" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sequential">Sequential</TabsTrigger>
                <TabsTrigger value="direct">Direct</TabsTrigger>
                <TabsTrigger value="indexed">Indexed</TabsTrigger>
              </TabsList>

              <TabsContent value="sequential" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Sequential Access</h4>
                  <p className="text-sm text-gray-700 mt-2">Information in the file is processed in order, one record after the other. This is the simplest access method and maps naturally to tape drives and stream processing.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-xs mb-2">Pseudocode for Sequential Operations</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
read_next(file) {
    // Read the next record and advance file pointer
    data = file[file.current_position]
    file.current_position += record_size
    return data
}

write_next(file, data) {
    // Append data at the end of the file
    file[file.size] = data
    file.size += record_size
}

reset(file) {
    file.current_position = 0
}
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600"><strong>Best for:</strong> Log files, media streaming, compilers reading source code, batch processing.</p>
              </TabsContent>

              <TabsContent value="direct" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Direct Access (Random Access)</h4>
                  <p className="text-sm text-gray-700 mt-2">A file is made up of fixed-length logical records that allow the program to read and write records rapidly in no particular order. The OS maps logical record numbers to physical disk blocks.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-xs mb-2">Direct Access Pseudocode</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
read_record(file, record_number) {
    offset = record_number * record_size
    seek(file, offset)
    return read(file, record_size)
}

write_record(file, record_number, data) {
    offset = record_number * record_size
    seek(file, offset)
    write(file, data, record_size)
}

// Example: Read employee record #42 from database
employee = read_record(db_file, 42)
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600"><strong>Best for:</strong> Databases, VM disk images, binary file formats that require seeking to specific offsets.</p>
              </TabsContent>

              <TabsContent value="indexed" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Indexed Access</h4>
                  <p className="text-sm text-gray-700 mt-2">A separate index structure maps keys to record locations. First, the index is searched to find the pointer to the desired record, then the record is accessed directly. This is how database indexes and file systems with i-nodes work.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-xs mb-2">Indexed Access Structure</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
Index File                      Data File
+--------+----------+          +----------+
| Key    | Pointer  |          | Record 0 |
+--------+----------+          +----------+
| Alice  | -> 103   |          | Record 1 |
| Bob    | -> 205   |          +----------+
| Carol  | -> 008   |          | ...      |
+--------+----------+          +----------+
                                 | Record N |
                                 +----------+

lookup(key):
    ptr = search_index(index, key)
    return read_direct(data_file, ptr)
`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600"><strong>Best for:</strong> Large databases, file systems (inode index), any application needing fast lookups by key.</p>
              </TabsContent>
            </Tabs>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Access Method</th>
                    <th className="p-3 text-left">Navigation</th>
                    <th className="p-3 text-left">Overhead</th>
                    <th className="p-3 text-left">Best Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3 font-medium">Sequential</td><td className="p-3">Read/write in order</td><td className="p-3">Minimal</td><td className="p-3">Logs, tapes, streams</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Direct</td><td className="p-3">Seek to any record by number</td><td className="p-3">Seek time</td><td className="p-3">Databases, flat files</td></tr>
                  <tr><td className="p-3 font-medium">Indexed</td><td className="p-3">Search index, then direct access</td><td className="p-3">Index maintenance</td><td className="p-3">Large datasets, file systems</td></tr>
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
              <Folder className="w-6 h-6 text-gray-500" />
              Directory Structures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Directories organize files into logical groupings. The structure of the directory system affects file naming, file sharing, search efficiency, and user navigation. We examine five common directory structures, from the simplest to the most complex.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">1. Single-Level Directory</h4>
                <p className="text-sm text-gray-700 mt-1">All files are stored in a single directory. Simple to implement but suffers from naming conflicts and poor organization.</p>
                <pre className="mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
[Root Directory]
├── file_a.txt
├── file_b.txt
├── file_c.txt
└── ... (naming collisions inevitable)
`}
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">2. Two-Level Directory</h4>
                <p className="text-sm text-gray-700 mt-1">Each user gets their own user file directory (UFD). The master file directory (MFD) is indexed by username. Solves naming conflicts between users but does not allow subdirectories.</p>
                <pre className="mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
[MFD - Master File Directory]
├── alice/
│   ├── report.doc
│   └── photo.jpg
├── bob/
│   ├── report.doc     (no collision with alice)
│   └── data.csv
└── carol/
    └── notes.txt
`}
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">3. Tree-Structured Directory</h4>
                <p className="text-sm text-gray-700 mt-1">Users can create arbitrary subdirectories, forming a tree. Each file has a unique pathname. The current working directory allows relative pathnames. This is the most common structure (used in Unix, Windows, macOS).</p>
                <pre className="mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
/
├── home/
│   ├── alice/
│   │   ├── documents/
│   │   │   └── report.doc
│   │   └── downloads/
│   └── bob/
│       └── project/
│           └── main.c
├── etc/
│   └── passwd
└── var/
    └── log/

Absolute path: /home/alice/documents/report.doc
Relative path (from /home/alice): documents/report.doc
`}
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">4. Acyclic-Graph Directory</h4>
                <p className="text-sm text-gray-700 mt-1">Allows directories and files to be shared using links. A file can appear in multiple directories simultaneously. No cycles are allowed, preventing infinite loops during traversal.</p>
                <pre className="mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
/home/alice/
├── report.doc
└── shared -> /home/bob/project/shared   (symbolic link)

/home/bob/
└── project/
    └── shared

Both alice and bob can access 'shared'.
`}
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">5. General Graph Directory</h4>
                <p className="text-sm text-gray-700 mt-1">Cycles are permitted. This offers maximum flexibility but requires a garbage collection mechanism to reclaim unreachable files and cycle-detection algorithms during traversal.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Structure</th>
                    <th className="p-3 text-left">Subdirectories</th>
                    <th className="p-3 text-left">Sharing</th>
                    <th className="p-3 text-left">Search Efficiency</th>
                    <th className="p-3 text-left">Used By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3 font-medium">Single-Level</td><td className="p-3">No</td><td className="p-3">No</td><td className="p-3">Linear scan</td><td className="p-3">Embedded systems</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Two-Level</td><td className="p-3">No</td><td className="p-3">Limited</td><td className="p-3">MFD + UFD lookup</td><td className="p-3">Early time-sharing systems</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Tree-Structured</td><td className="p-3">Yes</td><td className="p-3">No (without links)</td><td className="p-3">Path traversal</td><td className="p-3">Unix, Windows, macOS</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Acyclic Graph</td><td className="p-3">Yes</td><td className="p-3">Yes (links)</td><td className="p-3">Path traversal</td><td className="p-3">Modern Unix, Windows</td></tr>
                  <tr><td className="p-3 font-medium">General Graph</td><td className="p-3">Yes</td><td className="p-3">Yes (cycles allowed)</td><td className="p-3">Requires cycle detection</td><td className="p-3">Research, specialized FS</td></tr>
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
              <Server className="w-6 h-6 text-gray-500" />
              File System Mounting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              A file system must be <strong>mounted</strong> before it can be available to processes on the system. Mounting attaches a file system (on a partition or device) to a specific point in the existing directory tree, called the <strong>mount point</strong>.
            </p>

            <div className="bg-slate-900 p-5 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-3">Mounting Visualization</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
Before Mount:
/
├── bin/
├── etc/
└── mnt/          (empty directory)

Mount /dev/sdb1 on /mnt:
/
├── bin/
├── etc/
└── mnt/          <-- mount point
    ├── home/
    ├── var/
    └── usr/
        
The root of /dev/sdb1 now appears under /mnt
`}
              </pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Mount Types</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Manual Mount:</strong> Administrator explicitly mounts a device.</li>
                  <li><strong>Automatic Mount:</strong> Removable media or network shares mounted by the OS when detected.</li>
                  <li><strong>Bind Mount:</strong> Mount an existing directory tree to another location.</li>
                  <li><strong>Union Mount:</strong> Layer multiple file systems so changes go to the top layer (used in Docker overlayfs).</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Linux Mount Commands</h4>
                <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Mount a USB drive
sudo mount /dev/sdb1 /mnt/usb

# Mount with specific options
sudo mount -o ro,noexec /dev/sdb1 /mnt/usb

# Bind mount (make /var/log accessible at /tmp/logs)
sudo mount --bind /var/log /tmp/logs

# View all mounts
cat /proc/mounts
findmnt

# Unmount
sudo umount /mnt/usb`}
                </code>
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
              File Sharing and Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Multiple users on a system need to share files, but unauthorized access must be prevented. Operating systems implement protection through access control lists, capability lists, and the classic Unix permission model.
            </p>

            <Tabs defaultValue="unix" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="unix">Unix Permissions</TabsTrigger>
                <TabsTrigger value="acl">ACLs</TabsTrigger>
                <TabsTrigger value="links">Links</TabsTrigger>
              </TabsList>

              <TabsContent value="unix" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Unix Permission Model</h4>
                  <p className="text-sm text-gray-700 mt-2">Each file has an owner, a group, and three permission bits (read, write, execute) for the owner, the group, and everyone else.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-xs mb-2">Permission Breakdown</p>
                  <pre className="text-gray-300 text-xs font-mono">
{`
-rwxr-xr--  1 alice developers  4096 Jan 10 09:00 script.sh
 |   |   |
 |   |   └── Others: r-- (read only)
 |   └────── Group:  r-x (read + execute)
 └────────── Owner:  rwx (read + write + execute)

Numeric representation:
 rwx = 111 = 7
 r-x = 101 = 5
 r-- = 100 = 4
 chmod 754 script.sh
`}
                  </pre>
                </div>
                <code className="block p-3 bg-slate-900 rounded text-gray-300 text-xs">
{`# Change permissions
chmod 644 file.txt        # rw-r--r--
chmod u+x script.sh       # Add execute for owner
chmod go-w file.txt       # Remove write for group and others

# Change ownership
sudo chown bob:admins file.txt

# Sticky bit (only owner can delete files in directory)
chmod 1777 /tmp

# Setgid (new files inherit group ownership)
chmod 2775 /shared/project`}
                </code>
              </TabsContent>

              <TabsContent value="acl" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Access Control Lists (ACLs)</h4>
                  <p className="text-sm text-gray-700 mt-2">The Unix 9-bit model is too coarse for complex environments. ACLs allow specifying permissions for arbitrary users and groups.</p>
                </div>
                <code className="block p-3 bg-slate-900 rounded text-gray-300 text-xs">
{`# View ACLs
getfacl report.doc

# Set ACL: give carol read-write, dave read-only
setfacl -m u:carol:rw report.doc
setfacl -m u:dave:r report.doc

# Remove a specific ACL entry
setfacl -x u:carol report.doc

# Set default ACL on directory (inherited by new files)
setfacl -d -m u:carol:rwX /shared`}
                </code>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">ACL vs Unix Permissions Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-gray-200"><th className="p-2 text-left">Feature</th><th className="p-2 text-left">Unix Model</th><th className="p-2 text-left">ACL</th></tr></thead>
                      <tbody>
                        <tr className="border-b"><td className="p-2">Users</td><td className="p-2">Owner only</td><td className="p-2">Arbitrary users</td></tr>
                        <tr className="border-b"><td className="p-2">Groups</td><td className="p-2">One group</td><td className="p-2">Multiple groups</td></tr>
                        <tr className="border-b"><td className="p-2">Granularity</td><td className="p-2">3 classes (owner/group/other)</td><td className="p-2">Per-user/group</td></tr>
                        <tr><td className="p-2">Portability</td><td className="p-2">Universal</td><td className="p-2">Supported on ext4, XFS, NTFS, APFS</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="links" className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Hard Links vs Symbolic Links</h4>
                  <p className="text-sm text-gray-700 mt-2">Links allow a file to appear in multiple directory locations. Understanding the difference is critical for system administration and software development.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs mb-2">Hard Link</p>
                    <pre className="text-gray-300 text-xs font-mono">
{`
$ ln original.txt hardlink.txt

Directory entries:
name           inode
--------------------
original.txt   12345
hardlink.txt   12345  <-- same inode

Both names point to the same data.
Deleting one does not delete the data
until the link count reaches zero.
`}
                    </pre>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs mb-2">Symbolic (Soft) Link</p>
                    <pre className="text-gray-300 text-xs font-mono">
{`
$ ln -s original.txt symlink.txt

symlink.txt is a special file containing
the path "original.txt"

Directory entries:
name           inode
--------------------
original.txt   12345
symlink.txt    67890  <-- different inode
(points to "original.txt")

If original.txt is deleted, symlink.txt
becomes a dangling link.
`}
                    </pre>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-gray-200"><th className="p-2 text-left">Property</th><th className="p-2 text-left">Hard Link</th><th className="p-2 text-left">Symbolic Link</th></tr></thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Inode</td><td className="p-2">Same as original</td><td className="p-2">Different</td></tr>
                      <tr className="border-b"><td className="p-2">Cross-filesystem</td><td className="p-2">No</td><td className="p-2">Yes</td></tr>
                      <tr className="border-b"><td className="p-2">Link to directory</td><td className="p-2">Usually not allowed</td><td className="p-2">Yes</td></tr>
                      <tr className="border-b"><td className="p-2">If target deleted</td><td className="p-2">Data remains accessible</td><td className="p-2">Dangling link</td></tr>
                      <tr><td className="p-2">Size</td><td className="p-2">Same as original</td><td className="p-2">Length of path string</td></tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

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
              className="border-gray-400 text-gray-400 hover:bg-gray-700"
            >
              {showRealWorld ? 'Hide Examples' : 'Show All Examples'}
            </Button>

            {showRealWorld && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 1: Linux VFS (Virtual File System)</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Linux uses the Virtual File System layer to provide a unified interface across ext4, XFS, NFS, procfs, and more. All file systems implement the same VFS inode and dentry interfaces.
                  </p>
                  <pre className="p-2 bg-slate-900 rounded text-gray-300 text-xs font-mono">
{`
User Space
    |
    | open(), read(), write()
    v
System Call Interface
    |
    v
VFS (Virtual File System)
    |-- inode cache
    |-- dentry cache
    |
    +--> ext4 driver    +--> XFS driver    +--> NFS driver
`}
                  </pre>
                  <code className="block mt-2 p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# View registered file systems
cat /proc/filesystems

# View VFS cache statistics
cat /proc/sys/fs/dentry-state
cat /proc/sys/fs/inode-state`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 2: POSIX File API in Production</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Backend services often need atomic file operations, advisory locking, and efficient I/O patterns.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`#include <fcntl.h>

// Atomic append (critical for log files)
int fd = open("app.log", O_WRONLY | O_APPEND | O_CREAT, 0644);
write(fd, log_line, len);  // Append is atomic for writes up to PIPE_BUF

// Advisory file locking
struct flock fl;
fl.l_type = F_WRLCK;   // Write lock
fl.l_whence = SEEK_SET;
fl.l_start = 0;
fl.l_len = 0;          // Lock entire file
fcntl(fd, F_SETLK, &fl);

// O_DIRECT: bypass page cache for databases
int fd = open("db.dat", O_RDWR | O_DIRECT);

// O_TMPFILE: create unnamed temporary file (Linux 3.11+)
int fd = open("/tmp", O_TMPFILE | O_RDWR, 0600);`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 3: NFS (Network File System)</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    NFS allows a server to export directories over the network, which clients mount as if they were local file systems. NFSv4 introduced stateful operations, integrated locking, and strong security (Kerberos).
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Server: /etc/exports
/shared 192.168.1.0/24(rw,sync,no_subtree_check)

# Restart NFS server
sudo exportfs -a
sudo systemctl restart nfs-server

# Client: mount NFS share
sudo mount -t nfs server:/shared /mnt/shared

# Persistent mount via /etc/fstab
server:/shared /mnt/shared nfs defaults 0 0`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 4: Windows Shares (SMB/CIFS)</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    SMB is the standard Windows file sharing protocol. Linux clients use CIFS to mount Windows shares.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Mount Windows share on Linux
sudo mount -t cifs //windows-server/share /mnt/win \
    -o username=admin,domain=corp,file_mode=0644,dir_mode=0755

# Using smbclient for debugging
smbclient //windows-server/share -U admin
smb: \> ls
smb: \> get file.txt`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 5: Finding and Cleaning Up Hard Links</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Hard links can make it difficult to determine actual disk usage. Tools like <code>stat</code> and <code>find</code> help inspect link counts.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Check link count and inode
stat file.txt
# Links: 3  (means there are 3 hard links to this inode)

# Find all hard links to a specific inode
find / -inum 123456 2>/dev/null

# Find files with multiple hard links
find /home -type f -links +1

# Note: 'du' counts each hard link; use '-l' to count once
# 'df' reports filesystem-level usage correctly`}
                  </code>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300 mb-2">Scenario 6: Container Bind Mounts and OverlayFS</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Docker uses the file system mounting interface extensively. OverlayFS combines a read-only lower directory with a writable upper directory.
                  </p>
                  <code className="block p-2 bg-slate-900 rounded text-gray-300 text-xs">
{`# Docker bind mount (shares host directory with container)
docker run -v /host/data:/container/data nginx

# Docker volume (managed by Docker daemon)
docker run -v myvolume:/container/data nginx

# Inspect container mounts
docker inspect container_id | jq '.[0].Mounts'

# Manually create overlay mount
sudo mount -t overlay overlay \
    -o lowerdir=/ro,upperdir=/rw,workdir=/work /merged`}
                  </code>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-gray-500" />
              Overlay Filesystems, FUSE, and Copy-on-Write
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Production infrastructure relies on virtualized filesystem interfaces that layer, translate, and defer physical I/O. Overlay filesystems allow read-only base images to be shared across containers while keeping per-container mutations isolated. FUSE moves filesystem logic into userspace, enabling rapid prototyping of network-backed stores at the cost of context-switch overhead. Copy-on-write (CoW) semantics underpin both technologies by ensuring that blocks are duplicated only when modified.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">OverlayFS Internals</h4>
                <p className="text-sm text-gray-700 mb-2">
                  OverlayFS combines a stack of read-only <strong>lowerdirs</strong> with a single writable <strong>upperdir</strong> and a <strong>workdir</strong> (used for atomic copy-up operations). The resulting <strong>merged</strong> directory presents a unified POSIX view.
                </p>
                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-300 text-xs font-mono">
{`
Lowerdir (image layers, ro)
  +-- bin/
  +-- etc/
  +-- lib/

Upperdir (container diff, rw)
  +-- etc/resolv.conf      (new or copied-up)
  +-- tmp/
  +-- .wh.etc_hosts        (whiteout = deletion)

Workdir
  +-- work/                (atomic rename target)

Merged
  +-- bin/                 (from lower)
  +-- etc/hosts            (hidden by whiteout)
  +-- etc/resolv.conf      (from upper)
  +-- lib/                 (from lower)
  +-- tmp/                 (from upper)
`}
                  </pre>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Docker and containerd use OverlayFS as the default storage driver because it avoids the inode exhaustion and slow <code>rename(2)</code> semantics of the older AUFS driver.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">FUSE Architecture and Performance</h4>
                <p className="text-sm text-gray-700 mb-2">
                  FUSE (Filesystem in Userspace) intercepts VFS requests in the kernel and forwards them to a userspace daemon via <code>/dev/fuse</code>. This makes it possible to implement filesystems in high-level languages without kernel modules.
                </p>
                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-300 text-xs font-mono">
{`
App syscall
    |
    v
VFS layer
    |
    v
FUSE kernel module
    |
    v
/dev/fuse  <--- libfuse --->  Daemon (Go, Python, C++)
    |
    v
Backend (S3, GCS, SSH, etc)
`}
                  </pre>
                </div>
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 text-left">Metric</th>
                        <th className="p-2 text-left">Native Kernel FS</th>
                        <th className="p-2 text-left">FUSE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">4KB read latency</td><td className="p-2">~1 µs</td><td className="p-2">~15-40 µs</td></tr>
                      <tr className="border-b"><td className="p-2">Sequential throughput</td><td className="p-2">~5+ GB/s</td><td className="p-2">~2-3 GB/s</td></tr>
                      <tr className="border-b"><td className="p-2">Development velocity</td><td className="p-2">Slow (kernel C)</td><td className="p-2">Fast (any language)</td></tr>
                      <tr className="border-b"><td className="p-2">Crash isolation</td><td className="p-2">Kernel panic risk</td><td className="p-2">Daemon-only</td></tr>
                      <tr><td className="p-2">Best for</td><td className="p-2">General-purpose storage</td><td className="p-2">Specialized / cloud gateways</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Copy-on-Write Semantics in Btrfs and ZFS</h4>
              <p className="text-sm text-gray-700 mb-2">
                CoW ensures that when a file is modified, only the changed blocks are written to new locations; unchanged blocks remain shared between the original and the modified version. Btrfs exposes this through <strong>reflinks</strong> (<code>cp --reflink</code>), while ZFS implements it transparently for snapshots and clones.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                <pre className="text-gray-300 text-xs font-mono">
{`
Original file (extents A, B, C)
           A      B      C
           |      |      |
       +---v------v------v---+
       |  [data] [data] [data] |
       +------------------------+

Reflink copy (shares A, B, C)
       +------------------------+
       |  ptr->A ptr->B ptr->C  |
       +------------------------+
           |      |      |
           A      B      C  (shared, same on disk)

After write to block B in copy:
           A      B'     C
           |      |      |
       +---v------v------v---+
       |  ptr->A ptr->B' ptr->C |
       +------------------------+

# Btrfs: instant space-efficient copy
cp --reflink=always /data/bigfile.bin /data/bigfile_copy.bin

# ZFS: snapshot and clone
zfs snapshot tank/home@monday
zfs clone tank/home@monday tank/home_clone
`}
                </pre>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                CoW is the foundational primitive behind container image layer sharing, VM thin provisioning, and fast incremental backups. It eliminates redundant data movement and reduces storage costs in large-scale clusters.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-6 h-6 text-gray-500" />
              Distributed Filesystems and eBPF Tracing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Backend engineers operating at scale must reason about filesystem behavior across distributed nodes and heterogeneous storage backends. eBPF enables zero-overhead dynamic tracing of VFS and filesystem driver internals, while modern distributed filesystems like NFSv4 pNFS and CephFS separate metadata and data planes to achieve massive horizontal scaling.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">eBPF-Based Filesystem Tracing</h4>
                <p className="text-sm text-gray-700 mb-2">
                  eBPF programs attach to kernel tracepoints and kprobes to observe VFS syscalls—<code>openat</code>, <code>read</code>, <code>write</code>, <code>fsync</code>—without modifying kernel source or loading out-of-tree modules. Tools like <code>bpftrace</code> and BCC make it possible to build one-liner latency histograms and per-process I/O heatmaps.
                </p>
                <div className="bg-slate-900 p-3 rounded text-xs text-gray-300 font-mono">
{`
# Trace ext4 read latency distribution
bpftrace -e '
kprobe:ext4_file_read_iter {
  @start[tid] = nsecs;
}
kretprobe:ext4_file_read_iter /@start[tid]/ {
  @us = hist((nsecs - @start[tid]) / 1000);
  delete(@start[tid]);
}
'

# Count VFS open() calls per process
bpftrace -e '
tracepoint:syscalls:sys_enter_openat {
  @[comm] = count();
}
'

# Trace slow fsync() calls > 10 ms
bpftrace -e '
kprobe:vfs_fsync_range { @start[tid] = nsecs; }
kretprobe:vfs_fsync_range /@start[tid] && 
           (nsecs - @start[tid]) > 10000000/ {
  printf("slow fsync: %d us\\n", (nsecs - @start[tid]) / 1000);
  delete(@start[tid]);
}
'
`}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Unlike <code>strace</code>, which incurs a ptrace trap for every syscall, eBPF executes in a JIT-compiled sandbox inside the kernel. Overhead is typically less than 1% even on high-I/O database servers.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">NFSv4 Parallel NFS (pNFS)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  pNFS decouples the metadata path from the data path. A single Metadata Server (MDS) tells clients which Data Servers (DS) hold specific file stripes, allowing clients to read and write directly to storage in parallel.
                </p>
                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-300 text-xs font-mono">
{`
        Client
          |
          |-- 1. GET_LAYOUT (metadata) --> MDS
          |<-- layout map (DS-1 stripe 0, DS-2 stripe 1)
          |
          |-- 2. READ/WRITE (data) ------> DS-1
          +-- 2. READ/WRITE (data) ------> DS-2
          +-- 2. READ/WRITE (data) ------> DS-3

Layout types:
  - FILE:  Each stripe maps to a separate file on a DS.
  - BLOCK: Stripes map to LUN blocks.
  - OBJ:   Stripes map to OSD objects (SCSI object store).
`}
                  </pre>
                </div>
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 text-left">Attribute</th>
                        <th className="p-2 text-left">Traditional NFS</th>
                        <th className="p-2 text-left">pNFS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Data path</td><td className="p-2">Through single NFS server</td><td className="p-2">Client-to-DS direct</td></tr>
                      <tr className="border-b"><td className="p-2">Metadata path</td><td className="p-2">Same as data</td><td className="p-2">Separate MDS</td></tr>
                      <tr className="border-b"><td className="p-2">Scalability</td><td className="p-2">Limited by server NIC/CPU</td><td className="p-2">Scales with DS count</td></tr>
                      <tr><td className="p-2">Typical use</td><td className="p-2">Home directories, small shares</td><td className="p-2">HPC, media rendering, analytics</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">CephFS: Decoupled Metadata and Object Storage</h4>
              <p className="text-sm text-gray-700 mb-2">
                CephFS stores directory and inode metadata on a cluster of Metadata Servers (MDS) while file data is striped across the RADOS object store. Clients use the <code>libcephfs</code> kernel client or FUSE client to mount volumes, caching metadata locally but respecting capability-based consistency enforced by the MDS.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                <pre className="text-gray-300 text-xs font-mono">
{`
CephFS topology:
+--------+        +--------+        +--------+
| Client |<------>| Active |<------>| Standby|
|        |        |  MDS   |        |  MDS   |
+---+----+        +---+----+        +--------+
    |                 |
    |                 | manages
    v                 v
+---------------------------------------------+
|              RADOS Object Store             |
|  +--------+  +--------+  +--------+         |
|  |  OSD   |  |  OSD   |  |  OSD   |         |
|  | (disk) |  | (disk) |  | (disk) |         |
|  +--------+  +--------+  +--------+         |
+---------------------------------------------+

# Mount CephFS
mount -t ceph mon1:6789:/ /mnt/cephfs \\
  -o name=admin,secretfile=/etc/ceph/admin.secret
`}
                </pre>
              </div>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 text-left">Feature</th>
                      <th className="p-2 text-left">NFSv4 pNFS</th>
                      <th className="p-2 text-left">CephFS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-2">Metadata service</td><td className="p-2">Single MDS (with HA failover)</td><td className="p-2">Active-active MDS cluster</td></tr>
                    <tr className="border-b"><td className="p-2">Data placement</td><td className="p-2">Layout files/blocks/objects</td><td className="p-2">CRUSH algorithm on RADOS</td></tr>
                    <tr className="border-b"><td className="p-2">Consistency model</td><td className="p-2">Close-to-open + leases</td><td className="p-2">Capability-based, POSIX-close</td></tr>
                    <tr className="border-b"><td className="p-2">Failure domain</td><td className="p-2">Server-level redundancy</td><td className="p-2">Object-level replication/EC</td></tr>
                    <tr><td className="p-2">Cloud-native fit</td><td className="p-2">On-prem NAS extension</td><td className="p-2">Kubernetes CSI, S3/RBD unified</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                CephFS is commonly deployed as the backing store for Kubernetes PersistentVolumes because it provides shared filesystem semantics with dynamic provisioning and replication across failure domains.
              </p>
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
                "A file is a named collection of bytes with attributes, operations, and an associated access method",
                "Sequential access is simple but direct and indexed access enable high-performance random I/O",
                "Tree-structured directories are universal; acyclic-graph directories enable sharing via links",
                "File system mounting integrates separate storage devices into a unified directory tree",
                "Unix permissions (rwx/owner/group/other) provide basic protection; ACLs enable fine-grained control",
                "Hard links share the same inode and data; symbolic links are path pointers and can span filesystems",
                "The Linux VFS abstracts all file systems behind a common interface used by every file operation",
                "Network file systems (NFS, SMB) extend local file semantics across machines with performance tradeoffs"
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
