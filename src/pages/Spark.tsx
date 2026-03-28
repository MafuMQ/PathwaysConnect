import { Sun, RefreshCw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const quotes = [
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
];

const Spark = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Sun className="w-6 h-6 text-primary" /> SPARK
        </h1>
        <p className="text-sm text-muted-foreground">Your daily dose of motivation</p>
      </div>

      <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-12 shadow-card text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <blockquote className="font-display text-xl md:text-2xl font-semibold leading-relaxed text-foreground mb-4">
          "{quotes[index].text}"
        </blockquote>
        <p className="text-primary font-medium">— {quotes[index].author}</p>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => setIndex((prev) => (prev + 1) % quotes.length)}
          variant="outline"
          className="border-border text-foreground hover:bg-secondary font-display"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> New Quote
        </Button>
      </div>
    </div>
  );
};

export default Spark;
