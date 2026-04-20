export interface AthleteStat {
  label: string;
  value: string;
}

export interface AthleteLink {
  label: string;
  url: string;
}

export interface Athlete {
  id: string;
  name: string;
  school: string;
  team: string;
  position: string;
  number: number;
  height: string;
  weight: string;
  hometown: string;
  image: string;
  portraitImage: string;
  age?: string;
  otherSports?: string[];
  links?: AthleteLink[];
  signatureName?: string;
  statSeason?: string;
  stats?: AthleteStat[];

  theme?: string;
  primarySport?: string;
  otherSport1?: string;
  otherSport2?: string;
  otherSport3?: string;
  jerseyNumber?: string;
  statsYear?: string;
  statLabel1?: string;
  stat1?: string;
  statLabel2?: string;
  stat2?: string;
  statLabel3?: string;
  stat3?: string;
  link1?: string;
  link2?: string;
  actionImage?: string;
  profileImage?: string;

  isLegacy?: boolean;
  achievementBanner?:
    | "none"
    | "state_champion"
    | "national_champion"
    | "world_champion"
    | "gold_medalist"
    | "first_place";
}
export const athletes: Athlete[] = [
  {
     id: "athlete-1",
    name: "Dave Jankowski",
    school: "Linden High School",
    team: "Tigers",
    position: "Tight End",
    number: 87,
    height: "6'2\"",
    weight: "212 lbs",
    hometown: "Linden, NJ",
    image: "/action.jpg",
    portraitImage: "/portrait.png",
    age: "17",
    otherSports: ["Baseball", "Track"],
    signatureName: "Dave Jankowski",
    statSeason: "2026",
    stats: [
      { label: "REC", value: "42" },
      { label: "YDS", value: "611" },
      { label: "TD", value: "8" },
    ],
    links: [
      { label: "YouTube Highlights", url: "https://youtube.com" },
      { label: "MaxPreps Profile", url: "https://maxpreps.com" },
    ],
  },
];