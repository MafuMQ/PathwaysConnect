import { useState } from "react";
import { FolderLock, Upload, FileText, Image, File, Trash2, Download, Plus, Search, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DocFile {
  id: string;
  name: string;
  type: "pdf" | "image" | "doc" | "other";
  size: string;
  folder: string;
  uploadedAt: string;
}

const mockFiles: DocFile[] = [
  { id: "1", name: "Matric Certificate.pdf", type: "pdf", size: "2.4 MB", folder: "Academic", uploadedAt: "2024-01-15" },
  { id: "2", name: "ID Document.pdf", type: "pdf", size: "1.1 MB", folder: "Personal", uploadedAt: "2024-01-10" },
  { id: "3", name: "Proof of Registration.pdf", type: "pdf", size: "890 KB", folder: "Academic", uploadedAt: "2024-02-01" },
  { id: "4", name: "Passport Photo.jpg", type: "image", size: "450 KB", folder: "Personal", uploadedAt: "2024-01-08" },
  { id: "5", name: "Academic Transcript.pdf", type: "pdf", size: "3.2 MB", folder: "Academic", uploadedAt: "2024-03-12" },
  { id: "6", name: "Bursary Application.docx", type: "doc", size: "560 KB", folder: "Applications", uploadedAt: "2024-03-20" },
];

const folders = ["All", "Academic", "Personal", "Applications"];

const typeIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  image: Image,
  doc: File,
  other: File,
};

const typeColors: Record<string, string> = {
  pdf: "hsl(0 70% 55%)",
  image: "hsl(160 70% 50%)",
  doc: "hsl(210 80% 60%)",
  other: "hsl(220 10% 55%)",
};

const Vault = () => {
  const [files, setFiles] = useState(mockFiles);
  const [activeFolder, setActiveFolder] = useState("All");
  const [search, setSearch] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const filtered = files.filter((f) => {
    const matchFolder = activeFolder === "All" || f.folder === activeFolder;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchFolder && matchSearch;
  });

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Mock: just add a placeholder file
    const newFile: DocFile = {
      id: crypto.randomUUID(),
      name: "New Upload.pdf",
      type: "pdf",
      size: "1.0 MB",
      folder: activeFolder === "All" ? "Personal" : activeFolder,
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    setFiles((prev) => [newFile, ...prev]);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <FolderLock className="w-6 h-6 text-primary" /> VAULT
          </h1>
          <p className="text-sm text-muted-foreground">Securely store your academic documents</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold shadow-gold">
          <Upload className="w-4 h-4 mr-2" /> Upload
        </Button>
      </div>

      {/* Search + folders */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-card border-border pl-10 h-10" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFolder(f)}
              className={`px-4 py-2 rounded-lg text-xs font-display font-semibold whitespace-nowrap transition-colors ${
                activeFolder === f ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-muted-foreground border border-transparent hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Storage bar */}
      <div className="bg-gradient-card rounded-xl border border-border p-4 mb-6 shadow-card">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Storage used</span>
          <span className="text-foreground font-medium">8.6 MB / 500 MB</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{ width: "1.7%" }} />
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-border"
        }`}
      >
        <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Drag & drop files here or click Upload</p>
      </div>

      {/* File list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No documents found</p>
          </div>
        ) : (
          filtered.map((file) => {
            const Icon = typeIcons[file.type];
            const color = typeColors[file.type];
            return (
              <div key={file.id} className="flex items-center gap-4 bg-gradient-card rounded-xl border border-border p-4 shadow-card hover:border-primary/20 transition-colors group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{file.size} · {file.folder} · {file.uploadedAt}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(file.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Vault;
