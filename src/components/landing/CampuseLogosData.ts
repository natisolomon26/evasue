// app/components/landing/CampusLogosData.ts

export type CampusLogo = {
  id: number;
  name: string;
  path: string;
};
// Array of university logo paths (relative to the public folder)
// Example: The component will render <img src="/logos/aauni.png" alt="Addis Ababa University" />
// Make sure these image files exist in your public/logos/ directory
export const campusLogos = [
  { id: 1, name: "Addis Ababa University", path: "/logos/aauni.png" },
  { id: 2, name: "Haramaya University", path: "/logos/aauni.png" },
  { id: 3, name: "Bahir Dar University", path: "/logos/aauni.png" },
  { id: 4, name: "Hawassa University", path: "//logos/aauni.png" },
  { id: 5, name: "Jimma University", path: "/logos/aauni.png" },
  { id: 6, name: "Mekelle University", path: "/logos/aauni.png" },
  { id: 7, name: "Gondar University", path: "/logos/aauni.png" },
  { id: 8, name: "Adama University", path: "/logos/aauni.png" },
  { id: 9, name: "Debre Tabor University", path: "/logos/aauni.png" },
  { id: 10, name: "Semera University", path: "/logos/aauni.png" },
  { id: 11, name: "Aksum University", path: "/logos/aauni.png" },
  { id: 12, name: "Adigrat University", path: "/logos/aauni.png" },
  { id: 13, name: "Kebri Dehar University", path: "/logos/aauni.png" },
  { id: 14, name: "Wollega University", path: "/logos/aauni.png" },
  { id: 15, name: "Ambo University", path: "/logos/aauni.png" },
  { id: 16, name: "Asella University", path: "/logos/aauni.png" },
  { id: 17, name: "Arsi University", path: "/logos/aauni.png" },
  { id: 18, name: "Assosa University", path: "/logos/aauni.png" },
  { id: 19, name: "Arbaminch University", path: "/logos/aauni.png" },
  { id: 20, name: "Debre Birhan University", path: "/logos/aauni.png" },
  { id: 21, name: "Dambi Dollo University", path: "/logos/aauni.png" },
  { id: 22, name: "Selale University", path: "/logos/aauni.png" },
  { id: 23, name: "Wolkite University", path: "/logos/aauni.png" },
  { id: 24, name: "Woliso University", path: "/logos/aauni.png" },
  { id: 25, name: "Bule Hora University", path: "/logos/aauni.png" },
  { id: 26, name: "Madawalabu University", path: "/logos/aauni.png" },
  { id: 27, name: "Mizan Tepi University", path: "/logos/aauni.png" },
  { id: 28, name: "Dilla University", path: "/logos/aauni.png" },
  { id: 29, name: "Jigjiga University", path: "/logos/aauni.png" },
  { id: 30, name: "Dire Dawa University", path: "/logos/aauni.png" },
  { id: 31, name: "Mettu University", path: "/logos/aauni.png" },
  // Add more as needed, following the same pattern
];

// Define the number of logos per row for the sliding animation
export const LOGOS_PER_ROW = 12; // Adjust based on desired visual density

// Split the logo list into rows
export const splitLogosIntoRows = (list: CampusLogo[], itemsPerRow: number): CampusLogo[][] => {
  const rows: CampusLogo[][] = [];
  for (let i = 0; i < list.length; i += itemsPerRow) {
    rows.push(list.slice(i, i + itemsPerRow));
  }
  return rows;
};

// Function to cycle a row's content (move first item to the end)
export const cycleRowContent = (row: CampusLogo[]) => {
  if (row.length === 0) return row;
  return [...row.slice(1), row[0]];
};