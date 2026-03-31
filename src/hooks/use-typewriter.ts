import { useState, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const lines = [
  { section: "Competitor Intel", items: [
    "Acme Corp raised Series C ($42M) — expanding into your core vertical",
    "Stratum launched usage-based pricing, undercutting by ~30%",
    "Meridian Labs added 12 new job postings for enterprise sales",
  ]},
  { section: "Your Accounts", items: [
    "NovaTech visited your pricing page 3x this week (champion: J. Rivera)",
    "Crestline's CFO posted about 'consolidating vendor spend' on LinkedIn",
    "Delphi Dynamics renewed competitor contract — 90-day window closing",
  ]},
  { section: "Market Signals", items: [
    "New GDPR amendment proposed — affects data processing workflows",
    "Gartner published updated MQ for your category — 4 leader changes",
    "Industry NPS benchmark dropped 8pts QoQ across mid-market segment",
  ]},
];

export function useTypewriter(speed = 30, pauseBetweenSections = 2000) {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<{ section: string; items: string[] }[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!prefersReducedMotion) return;
    setDisplayedLines(lines);
    setCurrentSection(lines.length);
    setCurrentItem(0);
    setCurrentChar(0);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = lines[currentSection];
    if (!section) {
      // Reset after pause
      const timeout = setTimeout(() => {
        setCurrentSection(0);
        setCurrentItem(0);
        setCurrentChar(0);
        setDisplayedLines([]);
      }, pauseBetweenSections * 2);
      return () => clearTimeout(timeout);
    }

    const item = section.items[currentItem];
    if (!item) {
      // Move to next section after pause
      const timeout = setTimeout(() => {
        setCurrentSection((s) => s + 1);
        setCurrentItem(0);
        setCurrentChar(0);
      }, pauseBetweenSections);
      return () => clearTimeout(timeout);
    }

    if (currentChar <= item.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const copy = [...prev];
          const sectionIndex = copy.findIndex((s) => s.section === section.section);
          if (sectionIndex === -1) {
            copy.push({ section: section.section, items: [item.slice(0, currentChar)] });
          } else {
            const items = [...copy[sectionIndex].items];
            items[currentItem] = item.slice(0, currentChar);
            copy[sectionIndex] = { ...copy[sectionIndex], items };
          }
          return copy;
        });

        if (currentChar === item.length) {
          // Done with this item, move to next
          setTimeout(() => {
            setCurrentItem((i) => i + 1);
            setCurrentChar(0);
          }, 400);
        } else {
          setCurrentChar((c) => c + 1);
        }
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentSection, currentItem, currentChar, speed, pauseBetweenSections]);

  return { displayedLines, isTyping: !prefersReducedMotion && currentSection < lines.length };
}
