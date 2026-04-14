import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Cpu, MemoryStick, HardDrive, Shield, 
  Menu, ChevronRight, Terminal, Server, Database,
  Lock, Activity, Layers, Folder
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Toaster, toast } from 'sonner';

// Chapter Components
import Chapter1 from './sections/Chapter1';
import Chapter2 from './sections/Chapter2';
import Chapter3 from './sections/Chapter3';
import Chapter4 from './sections/Chapter4';
import Chapter5 from './sections/Chapter5';
import Chapter6 from './sections/Chapter6';
import Chapter7 from './sections/Chapter7';
import Chapter8 from './sections/Chapter8';
import Chapter9 from './sections/Chapter9';
import Chapter10 from './sections/Chapter10';
import Chapter11 from './sections/Chapter11';
import Chapter12 from './sections/Chapter12';
import Chapter13 from './sections/Chapter13';
import Chapter14 from './sections/Chapter14';
import Chapter15 from './sections/Chapter15';

// Quiz Component
import QuizModal from './components/QuizModal';

// Types
interface Chapter {
  id: number;
  title: string;
  part: string;
  icon: React.ElementType;
  completed: boolean;
}

const chapters: Chapter[] = [
  { id: 1, title: "Introduction", part: "Part One - Overview", icon: BookOpen, completed: false },
  { id: 2, title: "OS Structures", part: "Part One - Overview", icon: Layers, completed: false },
  { id: 3, title: "Processes", part: "Part Two - Process Management", icon: Activity, completed: false },
  { id: 4, title: "Threads", part: "Part Two - Process Management", icon: Cpu, completed: false },
  { id: 5, title: "Process Synchronization", part: "Part Two - Process Management", icon: Lock, completed: false },
  { id: 6, title: "CPU Scheduling", part: "Part Two - Process Management", icon: Server, completed: false },
  { id: 7, title: "Deadlocks", part: "Part Two - Process Management", icon: Shield, completed: false },
  { id: 8, title: "Main Memory", part: "Part Three - Memory Management", icon: MemoryStick, completed: false },
  { id: 9, title: "Virtual Memory", part: "Part Three - Memory Management", icon: Database, completed: false },
  { id: 10, title: "Mass-Storage Structure", part: "Part Four - Storage Management", icon: HardDrive, completed: false },
  { id: 11, title: "File-System Interface", part: "Part Four - Storage Management", icon: Folder, completed: false },
  { id: 12, title: "File-System Implementation", part: "Part Four - Storage Management", icon: Terminal, completed: false },
  { id: 13, title: "I/O Systems", part: "Part Four - Storage Management", icon: Activity, completed: false },
  { id: 14, title: "Protection", part: "Part Five - Protection & Security", icon: Shield, completed: false },
  { id: 15, title: "Security", part: "Part Five - Protection & Security", icon: Lock, completed: false },
];

const chapterComponents: { [key: number]: React.ComponentType } = {
  1: Chapter1,
  2: Chapter2,
  3: Chapter3,
  4: Chapter4,
  5: Chapter5,
  6: Chapter6,
  7: Chapter7,
  8: Chapter8,
  9: Chapter9,
  10: Chapter10,
  11: Chapter11,
  12: Chapter12,
  13: Chapter13,
  14: Chapter14,
  15: Chapter15,
};

function App() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('os-learning-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCompletedChapters(new Set(parsed.completed));
      setCurrentChapter(parsed.currentChapter || 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('os-learning-progress', JSON.stringify({
      completed: Array.from(completedChapters),
      currentChapter
    }));
    setProgress((completedChapters.size / chapters.length) * 100);
  }, [completedChapters, currentChapter]);

  const markChapterComplete = (chapterId: number) => {
    setCompletedChapters(prev => new Set([...prev, chapterId]));
    toast.success(`Chapter ${chapterId} marked as complete!`, {
      description: "Great progress! Keep learning!"
    });
  };

  const CurrentChapterComponent = chapterComponents[currentChapter];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-gray-900">
        <h1 className="text-xl font-bold text-white">OS Mastery</h1>
        <p className="text-sm text-gray-400">Interactive Learning</p>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-700" />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {chapters.map((chapter) => {
            const Icon = chapter.icon;
            const isActive = currentChapter === chapter.id;
            const isCompleted = completedChapters.has(chapter.id);
            
            return (
              <button
                key={chapter.id}
                onClick={() => {
                  setCurrentChapter(chapter.id);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg mb-1 transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-200 border-l-4 border-gray-900' 
                    : 'hover:bg-gray-100 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${
                    isActive ? 'bg-gray-900 text-white' : 
                    isCompleted ? 'bg-gray-600 text-white' : 'bg-gray-200'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{chapter.part}</p>
                    <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                      {chapter.id}. {chapter.title}
                    </p>
                  </div>
                  {isCompleted && (
                    <div className="text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t bg-gray-50">
        <Button 
          onClick={() => setShowQuiz(true)}
          className="w-full bg-gray-900 hover:bg-gray-800"
        >
          <Activity className="w-4 h-4 mr-2" />
          Take Quiz
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-right" richColors />
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r shadow-sm fixed h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 lg:ml-80">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Chapter {currentChapter}: {chapters[currentChapter - 1]?.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {chapters[currentChapter - 1]?.part}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => markChapterComplete(currentChapter)}
                disabled={completedChapters.has(currentChapter)}
              >
                {completedChapters.has(currentChapter) ? 'Completed' : 'Mark Complete'}
              </Button>
              
              {currentChapter < 15 && (
                <Button
                  size="sm"
                  onClick={() => setCurrentChapter(currentChapter + 1)}
                  className="bg-gray-900"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Chapter Content */}
        <main className="p-4 lg:p-8 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentChapterComponent />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Navigation */}
        <footer className="border-t bg-white p-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Button
              variant="outline"
              disabled={currentChapter === 1}
              onClick={() => setCurrentChapter(currentChapter - 1)}
            >
              Previous Chapter
            </Button>
            
            <span className="text-sm text-gray-500">
              Chapter {currentChapter} of 15
            </span>
            
            <Button
              disabled={currentChapter === 15}
              onClick={() => setCurrentChapter(currentChapter + 1)}
              className="bg-gray-900"
            >
              Next Chapter
            </Button>
          </div>
        </footer>
      </div>

      {/* Quiz Modal */}
      <QuizModal 
        open={showQuiz} 
        onClose={() => setShowQuiz(false)}
        currentChapter={currentChapter}
      />
    </div>
  );
}

export default App;
