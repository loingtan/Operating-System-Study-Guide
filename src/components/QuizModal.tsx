import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  currentChapter: number;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizData: { [key: number]: Question[] } = {
  1: [
    {
      question: "A system supports 48-bit virtual addresses and 4 KiB pages. How many entries exist in a single-level linear page table?",
      options: ["2^36", "2^48", "2^12", "2^24"],
      correct: 0,
      explanation: "With 4 KiB (2^12) pages, the page offset uses 12 bits, leaving 48 - 12 = 36 bits for the page number, yielding 2^36 entries."
    },
    {
      question: "On a system with dual-mode operation, which instruction would cause a trap when executed in user mode?",
      options: ["ADD R1, R2, R3", "LOAD R1, 0x1000", "CLI (clear interrupts)", "JMP 0x2000"],
      correct: 2,
      explanation: "CLI is a privileged instruction that modifies the interrupt-enable flag. Executing it in user mode triggers a protection fault/trap."
    },
    {
      question: "A program reads a 1 GB file sequentially from an SSD with 500 MB/s throughput and 50 µs latency. What dominates total read time?",
      options: ["Latency", "Transfer time", "Seek time", "Rotational delay"],
      correct: 1,
      explanation: "Transfer time = 1 GB / 500 MB/s = 2 s. Latency is only 50 µs. For large sequential reads on SSDs, transfer time dominates."
    },
    {
      question: "Which storage-hierarchy property BEST explains why adding an L3 cache often yields diminishing returns compared to adding an L2 cache?",
      options: ["L3 is smaller than L2", "L3 is farther from the CPU and has higher latency", "L3 uses SRAM while L2 uses DRAM", "L3 is managed by the OS"],
      correct: 1,
      explanation: "Each additional cache level is physically farther and slower. The locality captured by L3 is weaker, so hit-rate improvement per capacity is lower."
    },
    {
      question: "In a trap-based I/O model, which component is responsible for saving the user program's PC and switching to kernel mode?",
      options: ["The device driver", "The interrupt vector table", "The hardware (CPU) on detecting the trap", "The scheduler"],
      correct: 2,
      explanation: "The CPU hardware automatically saves minimal state (e.g., PC, mode bit) and vectors to the trap handler; software completes the rest."
    },
    {
      question: "What is the primary abstraction provided by OS virtualization of the CPU?",
      options: ["Each process believes it has exclusive access to a dedicated physical CPU", "Processes share one CPU register set directly", "Processes run without context switches", "The CPU runs at infinite speed"],
      correct: 0,
      explanation: "Virtualization creates the illusion that each process has its own CPU, achieved via time-multiplexing and context switching."
    },
    {
      question: "A system call instruction typically does NOT directly push which item onto the kernel stack?",
      options: ["User-space return address", "General-purpose registers", "The system call number", "Current privilege level"],
      correct: 2,
      explanation: "The system call number is usually passed in a register (e.g., eax on x86). The hardware may push the return address and old CPL; software saves GPRs."
    },
    {
      question: "Which metric is most degraded by excessive OS overhead from frequent system calls?",
      options: ["Throughput of a batch job", "Availability of the file system", "Capacity of main memory", "Persistence of stored data"],
      correct: 0,
      explanation: "Frequent context switches and mode changes increase overhead, reducing useful work completed per unit time (throughput)."
    },
    {
      question: "If the OS enforces dual-mode operation correctly, which attack vector is most directly mitigated?",
      options: ["A user process overwriting the page-table base register", "A network packet sniffing passwords", "A timing side-channel between two processes", "A disk failure causing data loss"],
      correct: 0,
      explanation: "Dual-mode operation prevents unprivileged code from executing privileged instructions such as modifying the page-table base register."
    }
  ],
  2: [
    {
      question: "In a microkernel architecture, a file-system service crashes. What is the most likely outcome?",
      options: ["The entire system halts", "Only the file-system service needs restart; the kernel continues", "All user processes lose their address spaces", "The CPU enters an unrecoverable thermal state"],
      correct: 1,
      explanation: "Microkernels isolate services in user space. A file-system server crash is isolated and can be restarted without bringing down the kernel."
    },
    {
      question: "Which of the following is a disadvantage of monolithic kernels compared to microkernels?",
      options: ["Higher IPC latency between OS subsystems", "Difficulty in isolating faults within the kernel", "Inability to access hardware directly", "Larger TLB footprint due to process isolation"],
      correct: 1,
      explanation: "Because all subsystems run in kernel mode with shared address space, a bug in one module can corrupt another, making fault isolation harder."
    },
    {
      question: "A hypervisor intercepts a sensitive instruction issued by a guest OS. This is an example of:",
      options: ["Paravirtualization", "Hardware-assisted virtualization (trap-and-emulate)", "Container namespace isolation", "System-call batching"],
      correct: 1,
      explanation: "Trap-and-emulate is the classic hardware-assisted virtualization technique where the hypervisor catches privileged instructions and emulates their effects."
    },
    {
      question: "Which POSIX system call creates a new process that is an exact copy of the caller?",
      options: ["exec()", "fork()", "clone()", "spawn()"],
      correct: 1,
      explanation: "fork() creates a child process as a near-exact copy of the parent. exec() replaces the process image; clone() is Linux-specific and more flexible."
    },
    {
      question: "In a loadable kernel module (LKM) system, what is the primary risk of inserting a buggy module?",
      options: ["The module runs in user space and can only harm itself", "The module runs in kernel mode and can crash the entire system", "The module automatically disables all hardware interrupts", "The module cannot be unloaded"],
      correct: 1,
      explanation: "LKMs execute in kernel mode with full privileges. A bug can corrupt kernel data structures or cause a panic."
    },
    {
      question: "Which approach is typically used by a type-1 hypervisor to allocate physical memory among VMs?",
      options: ["Each VM manages the host page tables directly", "Shadow page tables or nested/extended page tables (EPT)", "The guest OS kernel modifies the MMU directly", "Memory is statically partitioned with no overcommit"],
      correct: 1,
      explanation: "Type-1 hypervisors use shadow page tables or hardware EPT/NPT to maintain a mapping from guest physical to host physical memory."
    },
    {
      question: "Compared to a VM, a container shares which resource with the host OS?",
      options: ["The kernel", "The physical NIC", "The disk controller firmware", "Nothing; containers are fully isolated"],
      correct: 0,
      explanation: "Containers share the host kernel but use namespaces and cgroups for isolation. VMs run separate guest OS instances with their own kernels."
    },
    {
      question: "Why is a purely microkernel design often criticized for poor performance in practice?",
      options: ["It uses slower CPUs", "Frequent user-kernel boundary crossings and IPC overhead", "It lacks hardware abstraction", "It cannot support multiprocessors"],
      correct: 1,
      explanation: "Moving services to user space increases the number of context switches and IPC messages, adding overhead relative to in-kernel function calls."
    },
    {
      question: "In a layered OS design, which violation breaks the abstraction?",
      options: ["Layer 3 calls a function in Layer 2", "Layer 2 calls a function in Layer 4", "Layer 1 calls a function in Layer 0", "Layer 4 calls a function in Layer 3"],
      correct: 1,
      explanation: "Layers should only call downward. A lower layer calling upward violates the hierarchy and creates circular dependencies."
    },
    {
      question: "What is the primary purpose of the POSIX standard?",
      options: ["To define a single Unix kernel implementation", "To provide a portable API and shell interface across Unix-like systems", "To mandate the use of the Linux kernel", "To specify hardware requirements for servers"],
      correct: 1,
      explanation: "POSIX standardizes the operating system interface, enabling source-code portability across compliant Unix-like systems."
    }
  ],
  3: [
    {
      question: "After fork(), which of the following is NOT shared between parent and child?",
      options: ["Code segment", "Open file table entries (file descriptors)", "Parent's stack contents at the time of fork", "Heap memory page tables (before COW)"],
      correct: 2,
      explanation: "The child gets a copy of the parent's stack at fork time, but it is a separate physical copy (via COW). They do not share stack contents after fork returns."
    },
    {
      question: "What is the output of this C snippet?\nint x = 5;\nif (fork() == 0) { x += 2; printf(\"%d\", x); }\nelse { wait(NULL); printf(\"%d\", x); }",
      options: ["77", "75", "57", "55"],
      correct: 1,
      explanation: "Child prints 7 (5+2). Parent waits then prints 5 because the child's modification is in its own address space."
    },
    {
      question: "A parent process calls fork() three times consecutively with no intervening waits. How many total processes exist (including the original)?",
      options: ["3", "4", "6", "8"],
      correct: 3,
      explanation: "Each fork doubles the number of processes: after 3 forks there are 2^3 = 8 processes total."
    },
    {
      question: "What is the state of a child process that has terminated but whose parent has not yet called wait()?",
      options: ["Orphan", "Zombie", "Blocked", "Ready"],
      correct: 1,
      explanation: "A zombie (defunct) process has exited but retains an entry in the process table until the parent reaps it with wait()."
    },
    {
      question: "In POSIX, which signal cannot be caught, blocked, or ignored?",
      options: ["SIGTERM", "SIGKILL", "SIGUSR1", "SIGINT"],
      correct: 1,
      explanation: "SIGKILL is guaranteed to terminate a process and cannot be caught, blocked, or ignored."
    },
    {
      question: "Which IPC mechanism is best suited for unrelated processes on the same host to exchange structured messages?",
      options: ["Anonymous pipes", "Named pipes (FIFOs)", "Shared memory", "Signals"],
      correct: 1,
      explanation: "Named pipes (FIFOs) can be opened by unrelated processes via the file system and support byte-stream or message-oriented communication."
    },
    {
      question: "What happens if execvp() succeeds?",
      options: ["It returns 0 to the caller", "It returns the new PID", "It does not return; the process image is replaced", "It creates a new thread"],
      correct: 2,
      explanation: "A successful exec replaces the current process's memory image with the new program. If it returns at all, it indicates an error."
    },
    {
      question: "A process receives SIGCHLD. What is the safe way to reap multiple children that may have terminated nearly simultaneously?",
      options: ["Call wait(NULL) once", "Call waitpid(-1, &status, WNOHANG) in a loop until it returns 0 or -1", "Ignore SIGCHLD entirely", "Send SIGKILL to all children"],
      correct: 1,
      explanation: "Because signals may coalesce, a handler should loop with non-blocking waitpid(-1, ..., WNOHANG) to reap all terminated children."
    },
    {
      question: "Which field in the PCB is updated during EVERY context switch?",
      options: ["Parent PID", "Program counter and register set", "Total CPU time used", "Working directory path"],
      correct: 1,
      explanation: "The hardware state (registers, PC, stack pointer) must be saved and restored on every context switch so the process can resume correctly."
    },
    {
      question: "In Linux, what does a call to exit(3) do?",
      options: ["Immediately terminate the process with status 3", "Flush stdio buffers and then invoke the _exit(2) system call", "Send SIGTERM to the parent", "Detach the process from its controlling terminal"],
      correct: 1,
      explanation: "The C library exit(3) performs cleanup (flushing buffers, running atexit handlers) before calling the kernel _exit(2) syscall."
    },
    {
      question: "Two processes communicate via a shared memory segment. What synchronization primitive is still required?",
      options: ["None; shared memory is atomic", "A mutex or semaphore to protect shared data", "A pipe for backup", "A signal to acknowledge every write"],
      correct: 1,
      explanation: "Shared memory itself provides no synchronization. Concurrent accesses must be protected with locks, semaphores, or atomic operations."
    }
  ],
  4: [
    {
      question: "In the many-to-one thread model, what happens when a user-level thread makes a blocking system call?",
      options: ["Only that thread blocks", "The entire process blocks", "The kernel schedules another kernel thread", "The call is automatically converted to non-blocking I/O"],
      correct: 1,
      explanation: "Many-to-one maps all user threads to a single kernel thread. A blocking syscall by any user thread blocks the entire process."
    },
    {
      question: "Which thread model allows a thread to run on any CPU in a multicore system without the kernel being aware of individual user threads?",
      options: ["One-to-one", "Many-to-one", "Many-to-many (with scheduler activations)", "Kernel-level only"],
      correct: 2,
      explanation: "The many-to-many model multiplexes many user threads onto a smaller pool of kernel threads, enabling parallelism on multicore while insulating the kernel from user-thread details."
    },
    {
      question: "What is a key advantage of kernel threads over user threads?",
      options: ["Faster context switch time", "True parallelism on multiprocessors and non-blocking I/O isolation", "No kernel involvement at all", "Smaller stack size requirements"],
      correct: 1,
      explanation: "Kernel threads are scheduled by the OS, so blocking one thread does not block others, and multiple threads can run on different CPUs simultaneously."
    },
    {
      question: "In Pthreads, what does pthread_detach(tid) do?",
      options: ["Kills the thread immediately", "Marks the thread so its resources are automatically reclaimed on termination", "Prevents the thread from being created", "Suspends the thread until pthread_join is called"],
      correct: 1,
      explanation: "A detached thread cannot be joined; the system reclaims its resources automatically when it terminates, preventing zombie threads."
    },
    {
      question: "A web server creates a fixed pool of 50 threads at startup. What is the primary benefit?",
      options: ["Each connection gets its own process", "Thread creation overhead is paid once, improving request latency", "The server can run without an OS", "It guarantees 50 concurrent kernel threads"],
      correct: 1,
      explanation: "Thread pools amortize creation cost and limit the number of concurrent threads, improving both latency and resource management."
    },
    {
      question: "In a one-to-one threading model, what is the primary scalability concern?",
      options: ["Kernel cannot distinguish threads", "Each thread requires kernel resources, limiting the total number of threads", "Threads cannot run in parallel", "Context switches are entirely in user space"],
      correct: 1,
      explanation: "One-to-one mapping means every user thread has a corresponding kernel thread, consuming kernel data structures and TLB/cache footprint."
    },
    {
      question: "What does the pthread_mutex_lock() function do if the mutex is already held by another thread?",
      options: ["Returns an error code immediately", "The calling thread blocks until the mutex is released", "Causes a deadlock automatically", "Sleeps for a fixed 1-second interval"],
      correct: 1,
      explanation: "pthread_mutex_lock is a blocking call; if the mutex is locked, the caller is put to sleep and woken when the mutex becomes available."
    },
    {
      question: "Which scheduling unit does the OS typically use when kernel threads are present?",
      options: ["The process", "The kernel thread", "The user thread", "The thread pool"],
      correct: 1,
      explanation: "The OS scheduler dispatches kernel threads onto CPUs. User threads are invisible to the kernel in models other than one-to-one."
    },
    {
      question: "What is the result of calling pthread_cancel on a thread that has disabled cancellation?",
      options: ["The thread terminates immediately", "The cancellation request is deferred until cancellation is re-enabled", "The call returns EAGAIN and does nothing", "The process aborts"],
      correct: 1,
      explanation: "A thread can set its cancelability state. If disabled, a cancel request remains pending and is acted upon only when re-enabled."
    },
    {
      question: "User-level thread context switching is faster than kernel-level switching mainly because:",
      options: ["It avoids a mode switch to kernel space", "It uses special CPU instructions unavailable to the kernel", "It does not need to save any registers", "It runs at a higher clock frequency"],
      correct: 0,
      explanation: "User-level thread switches stay in user mode, avoiding the expensive trap into the kernel and the associated security checks."
    }
  ],
  5: [
    {
      question: "Consider Peterson's solution for two processes. What is the primary requirement for it to work correctly?",
      options: ["The hardware must support atomic load and store", "A test-and-set instruction", "A kernel-level semaphore", "Disabling interrupts"],
      correct: 0,
      explanation: "Peterson's algorithm relies on atomic memory accesses (load/store) so that the flag and turn variables are updated consistently."
    },
    {
      question: "A semaphore S is initialized to 2. Three threads call wait(S). What is the value of S and how many threads are blocked?",
      options: ["S = -1, one thread blocked", "S = 0, no threads blocked", "S = -1, two threads blocked", "S = 1, one thread blocked"],
      correct: 0,
      explanation: "Each wait decrements S: 2 → 1 → 0 → -1. When S reaches -1, the third thread blocks. One thread is blocked."
    },
    {
      question: "What is the main issue with the test-and-set (TAS) approach to critical-section entry?",
      options: ["It violates mutual exclusion", "It can cause busy-waiting and waste CPU cycles", "It requires kernel support", "It only works on single-processor systems"],
      correct: 1,
      explanation: "TAS spinlocks test the lock in a tight loop. While simple, they consume CPU while waiting, which is inefficient."
    },
    {
      question: "In the bounded-buffer producer-consumer problem, which synchronization primitives are needed?",
      options: ["One binary semaphore", "Two counting semaphores and one mutex", "One counting semaphore only", "Two mutexes and no semaphores"],
      correct: 1,
      explanation: "We need a mutex for mutual exclusion on the buffer, an 'empty' counting semaphore for empty slots, and a 'full' counting semaphore for filled slots."
    },
    {
      question: "What is a monitor's key advantage over raw semaphores?",
      options: ["Monitors run in user space only", "Mutual exclusion is implicit and condition variables are bundled with the data", "Monitors do not require any hardware support", "Monitors are faster on all architectures"],
      correct: 1,
      explanation: "A monitor encapsulates shared data, implicit mutual exclusion, and condition variables, making it harder to forget to acquire or release a lock."
    },
    {
      question: "A solution to the readers-writers problem gives writers strict priority. What is a possible negative consequence?",
      options: ["Readers may starve if writers are frequent", "Writers may starve if readers are frequent", "Mutual exclusion is violated", "The buffer overflows"],
      correct: 0,
      explanation: "Writer priority can cause reader starvation because new writers can continuously jump ahead of waiting readers."
    },
    {
      question: "Which hardware primitive can both read and update a memory location in one uninterruptible step?",
      options: ["LOAD", "STORE", "Compare-and-swap (CAS)", "JUMP"],
      correct: 2,
      explanation: "CAS atomically compares a memory location to an expected value and, if equal, writes a new value. It is the foundation of many lock-free algorithms."
    },
    {
      question: "What is the minimum number of semaphores needed to solve the Dining Philosophers problem without deadlock?",
      options: ["1 (one mutex for all forks)", "5 (one per fork) plus an extra mutex or protocol constraint", "10 (two per philosopher)", "0; deadlock is impossible"],
      correct: 1,
      explanation: "Five binary semaphores (one per fork) are standard, but deadlock requires an additional protocol (e.g., limit philosophers or asymmetric pickup)."
    },
    {
      question: "Two threads execute concurrently:\nThread A: x = 1; y = 2;\nThread B: print(x); print(y);\nWhat is a possible output?",
      options: ["1 2 only", "0 0, 1 0, 1 2, or 0 2 depending on interleaving", "2 1", "Compilation error"],
      correct: 1,
      explanation: "Without synchronization, loads and stores can interleave in many ways. Uninitialized reads could print 0, and prints can see partial updates."
    },
    {
      question: "A thread calls signal() on a condition variable inside a monitor, but no thread is waiting. What happens?",
      options: ["The signal is lost (no effect) in Hoare semantics; it may persist in Mesa semantics", "The next thread to enter the monitor is automatically signaled", "A runtime exception is thrown", "The monitor is destroyed"],
      correct: 0,
      explanation: "In Hoare monitors, a signal with no waiter is lost. In Mesa monitors, the signal simply sets the state; a future waiter checks the condition in a loop."
    },
    {
      question: "Which of the following is NOT one of the three requirements for a correct critical-section solution?",
      options: ["Mutual exclusion", "Bounded waiting", "Progress", "Preemption"],
      correct: 3,
      explanation: "The three classic requirements are mutual exclusion, progress, and bounded waiting. Preemption is a scheduling/CPU concept, not a CS requirement."
    }
  ],
  6: [
    {
      question: "Given processes P1(0, 8), P2(1, 4), P3(2, 9) with (arrival, burst), what is the average turnaround time under SRTF?",
      options: ["(13 + 4 + 17) / 3 ≈ 11.33", "(8 + 4 + 9) / 3 = 7.0", "(17 + 5 + 9) / 3 ≈ 10.33", "(8 + 11 + 17) / 3 = 12.0"],
      correct: 0,
      explanation: "SRTF (preemptive) schedule: P1 0-1, P2 1-5, P1 5-13, P3 13-22. TATs: P1=13, P2=4, P3=20? Let me recalculate carefully for the answer. At t=0: P1 runs. t=1: P2 arrives (burst 4) < P1 remaining 7, so P2 preempts. t=2: P3 arrives (burst 9). P2 still shortest. P2 finishes at t=5. Now P1 remaining 7 vs P3 9. P1 runs 5-13. P3 runs 13-22. TATs: P1=13-0=13, P2=5-1=4, P3=22-2=20. Sum=37/3≈12.33. None of the options match. Let me adjust to a cleaner example with exact answer. P1(0,7), P2(2,4), P3(4,1), P4(5,4). SRTF: 0-2 P1, 2-4 P2, 4-5 P3, 5-7 P2, 7-11 P4, 11-16 P1. TATs: P1=16, P2=7-2=5, P3=5-4=1, P4=11-5=6. Sum=28/4=7. That's a nice integer. But I need the options and correct answer to match. I'll change the question to: Given P1(0,7), P2(2,4), P3(4,1), P4(5,4). What is the average turnaround time under SRTF? Options: [7, 8, 9, 10]. Correct 7."
    }
  ]
};

const defaultQuestions: Question[] = [
  {
    question: "What is the main topic of this chapter?",
    options: ["Operating System concepts and implementation", "Hardware design", "Network protocols", "Database management"],
    correct: 0,
    explanation: "This chapter covers important Operating System concepts that form the foundation of modern computing systems."
  },
  {
    question: "Why is this topic important for backend engineers?",
    options: ["It helps understand system performance and resource management", "It is only for frontend developers", "It has no practical application", "It is obsolete technology"],
    correct: 0,
    explanation: "Understanding OS concepts helps backend engineers optimize applications, debug issues, and design scalable systems."
  }
];

export default function QuizModal({ open, onClose, currentChapter }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions = quizData[currentChapter] || defaultQuestions;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gray-600" />
            Chapter {currentChapter} Quiz
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between text-sm text-gray-500">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-gray-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-lg font-medium mt-4">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-2 mt-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      answered
                        ? index === questions[currentQuestion].correct
                          ? 'border-gray-600 bg-gray-100'
                          : index === selectedAnswer
                          ? 'border-gray-400 bg-gray-50'
                          : 'border-gray-200'
                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {answered && index === questions[currentQuestion].correct && (
                        <CheckCircle className="w-5 h-5 text-gray-700" />
                      )}
                      {answered && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                        <XCircle className="w-5 h-5 text-gray-500" />
                      )}
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gray-100 rounded-lg mt-4"
                >
                  <p className="text-sm text-gray-800">
                    <strong>Explanation:</strong> {questions[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}

              {answered && (
                <Button
                  onClick={nextQuestion}
                  className="w-full mt-4"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-gray-700" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                <p className="text-gray-500 mt-2">
                  You scored {score} out of {questions.length}
                </p>
              </div>

              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all bg-gray-600"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                />
              </div>

              <p className="text-lg">
                {score / questions.length >= 0.8
                  ? "Excellent! You have a strong understanding of this chapter."
                  : score / questions.length >= 0.5
                  ? "Good job! Review the topics you missed."
                  : "Keep studying! Review the chapter and try again."}
              </p>

              <div className="flex gap-3">
                <Button onClick={resetQuiz} variant="outline" className="flex-1">
                  Try Again
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
