import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Plus, ShoppingBag, Tag, MessageCircle, Heart, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  seller: string;
  campus: string;
  image: string;
  condition: string;
  postedAt: string;
  saved: boolean;
}

const mockListings: Listing[] = [
  { id: "1", title: "Calculus Textbook (Stewart 8th Ed)", price: 350, category: "Textbooks", description: "Used for MAT1503. Good condition with some highlighting. Collect on campus.", seller: "Thabo M.", campus: "Wits", image: "📚", condition: "Good", postedAt: "2h ago", saved: false },
  { id: "2", title: "Scientific Calculator (Casio fx-991)", price: 280, category: "Electronics", description: "Works perfectly, batteries included. Great for engineering students.", seller: "Naledi K.", campus: "UCT", image: "🔬", condition: "Like New", postedAt: "5h ago", saved: false },
  { id: "3", title: "Handmade Beaded Jewellery Set", price: 150, category: "Fashion", description: "Beautiful Zulu beadwork. Necklace + bracelet combo. Perfect gift or for Heritage Day!", seller: "Zanele M.", campus: "DUT", image: "💎", condition: "New", postedAt: "1d ago", saved: true },
  { id: "4", title: "Laptop Stand (Adjustable)", price: 200, category: "Electronics", description: "Ergonomic aluminium laptop stand. Fits 13-17 inch laptops.", seller: "Sipho N.", campus: "UJ", image: "💻", condition: "Good", postedAt: "3h ago", saved: false },
  { id: "5", title: "Organic Snack Boxes (5-pack)", price: 120, category: "Food", description: "Healthy study snack boxes. Trail mix, dried fruit, nuts. Delivery to res available!", seller: "Amahle D.", campus: "Stellenbosch", image: "🥜", condition: "New", postedAt: "6h ago", saved: false },
  { id: "6", title: "Graphic Design Services", price: 500, category: "Services", description: "Logo design, social media graphics, posters. Student-friendly rates. Portfolio available on request.", seller: "Kagiso T.", campus: "CPUT", image: "🎨", condition: "N/A", postedAt: "1d ago", saved: false },
  { id: "7", title: "Second-hand Lab Coat (Size M)", price: 80, category: "Fashion", description: "White lab coat, barely worn. Required for BSc Chemistry labs.", seller: "Lerato P.", campus: "UP", image: "🥼", condition: "Like New", postedAt: "4h ago", saved: false },
  { id: "8", title: "Photography for Events", price: 800, category: "Services", description: "Professional event photography for societies, graduations, and parties. 2hr package.", seller: "Bongani L.", campus: "NWU", image: "📸", condition: "N/A", postedAt: "2d ago", saved: true },
];

const listingCategories = ["All", "Textbooks", "Electronics", "Fashion", "Food", "Services"];

const Bazaar = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [listings, setListings] = useState(mockListings);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newListing, setNewListing] = useState({ title: "", price: "", category: "Textbooks", description: "", condition: "Good" });

  const filtered = listings.filter((l) => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || l.category === category;
    return matchSearch && matchCat;
  });

  const toggleSave = (id: string) => {
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, saved: !l.saved } : l));
  };

  const handleCreate = () => {
    if (!newListing.title || !newListing.price) return;
    const listing: Listing = {
      id: crypto.randomUUID(),
      title: newListing.title,
      price: Number(newListing.price),
      category: newListing.category,
      description: newListing.description,
      seller: user?.name || "You",
      campus: "Your Campus",
      image: "🏷️",
      condition: newListing.condition,
      postedAt: "Just now",
      saved: false,
    };
    setListings((prev) => [listing, ...prev]);
    setNewListing({ title: "", price: "", category: "Textbooks", description: "", condition: "Good" });
    setShowCreate(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">
            <span className="text-gradient-gold">Bazaar</span>
          </h1>
          <p className="text-muted-foreground">Buy, sell & trade with fellow students</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Sell Item
        </Button>
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search listings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {listingCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              category === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Listings grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((listing) => (
          <div
            key={listing.id}
            className="bg-gradient-card rounded-xl border border-border shadow-card hover:border-primary/30 transition-colors cursor-pointer overflow-hidden"
            onClick={() => setSelectedListing(listing)}
          >
            <div className="h-32 bg-secondary/50 flex items-center justify-center text-5xl">
              {listing.image}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-display font-semibold text-sm text-foreground line-clamp-1 flex-1">{listing.title}</h3>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(listing.id); }}
                  className="ml-2 shrink-0"
                >
                  <Heart className={`w-4 h-4 ${listing.saved ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </button>
              </div>
              <div className="text-lg font-display font-bold text-primary mb-2">R{listing.price}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{listing.seller} · {listing.campus}</span>
                <Badge variant="secondary" className="text-[10px]">{listing.condition}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No listings found</p>
        </div>
      )}

      {/* Listing detail */}
      <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
        {selectedListing && (
          <DialogContent className="max-w-md bg-card border-border">
            <div className="h-40 bg-secondary/50 rounded-lg flex items-center justify-center text-6xl mb-2">
              {selectedListing.image}
            </div>
            <DialogHeader>
              <DialogTitle className="font-display text-foreground">{selectedListing.title}</DialogTitle>
              <DialogDescription>{selectedListing.seller} · {selectedListing.campus} · {selectedListing.postedAt}</DialogDescription>
            </DialogHeader>
            <div className="text-2xl font-display font-bold text-primary">R{selectedListing.price}</div>
            <div className="flex gap-2">
              <Badge variant="secondary">{selectedListing.category}</Badge>
              <Badge variant="secondary">{selectedListing.condition}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{selectedListing.description}</p>
            <div className="flex gap-2 mt-2">
              <Button className="flex-1 gap-2"><MessageCircle className="w-4 h-4" /> Message Seller</Button>
              <Button variant="outline" onClick={() => toggleSave(selectedListing.id)}>
                <Heart className={`w-4 h-4 ${selectedListing.saved ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Create listing */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">Create Listing</DialogTitle>
            <DialogDescription>List an item or service for sale</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-foreground">Title</Label>
              <Input placeholder="What are you selling?" value={newListing.title} onChange={(e) => setNewListing({ ...newListing, title: e.target.value })} className="bg-secondary border-border mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-foreground">Price (R)</Label>
                <Input type="number" placeholder="0" value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: e.target.value })} className="bg-secondary border-border mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Category</Label>
                <Select value={newListing.category} onValueChange={(v) => setNewListing({ ...newListing, category: v })}>
                  <SelectTrigger className="bg-secondary border-border mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {listingCategories.filter((c) => c !== "All").map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-foreground">Description</Label>
              <Textarea placeholder="Describe your item..." value={newListing.description} onChange={(e) => setNewListing({ ...newListing, description: e.target.value })} className="bg-secondary border-border mt-1" />
            </div>
            <Button onClick={handleCreate} className="w-full" disabled={!newListing.title || !newListing.price}>
              <Tag className="w-4 h-4 mr-2" /> Post Listing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bazaar;
