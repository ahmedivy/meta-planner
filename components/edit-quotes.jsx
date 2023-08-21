"use client";

import { useEffect, useState } from "react";

import { Input } from "./ui/input";
import SymbolCard from "./symbol-card";
import { ScrollArea } from "./ui/scroll-area";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

function EditQuotes({ availableSymbols }) {
  const [search, setSearch] = useState("");
  const [symbols, setSymbols] = useState(availableSymbols);
  const [searchResults, setSearchResults] = useState(symbols);

  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const debouncedSearch = useDebounce(search, 0);

  useEffect(() => {
    if (!debouncedSearch) {
      setSearchResults(symbols);
      return;
    }

    const results = symbols.filter((symbol) =>
      symbol.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setSearchResults(results);
  }, [debouncedSearch, symbols]);

  const handleToggle = (name) => {
    const newSymbols = symbols.map((symbol) => {
      if (symbol.name === name) {
        return {
          ...symbol,
          isOn: !symbol.isOn,
        };
      }
      return symbol;
    });
    setSymbols(newSymbols);

    fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${session.user.id}/symbols`,
      {
        method: "PUT",
        body: JSON.stringify({
          symbols: newSymbols
            .filter((symbol) => symbol.isOn)
            .map((symbol) => symbol.name),
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast({
            description: "Symbols updated successfully",
          });
        } else {
          toast({
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      });
  };

  return (
    <div className="flex flex-col gap-7">
      <Input
        type="text"
        placeholder="Search Symbol..."
        className="text-md h-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ScrollArea className="w-full h-[900px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
          {searchResults.map((symbol) => (
            <SymbolCard
              key={symbol.name}
              name={symbol.name}
              isOn={symbol.isOn}
              onToggle={() => handleToggle(symbol.name)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default EditQuotes;
