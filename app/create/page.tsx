"use client";

import { useState, useEffect } from "react";
import AthleteCard from "../components/AthleteCard";
import type { Athlete } from "../data/athletes";

export default function CreateAthletePage() {
const [athlete, setAthlete] = useState<Athlete>({
  id: crypto.randomUUID(),
  name: "",
  school: "",
  team: "",
  primarySport: "",
  otherSport1: "",
  otherSport2: "",
  position: "",
  jerseyNumber: "",
  number: 0,
  age: "",
  height: "",
  weight: "",
  hometown: "",
  statsYear: "",
  statLabel1: "",
  stat1: "",
  statLabel2: "",
  stat2: "",
  statLabel3: "",
  stat3: "",
  link1: "",
  link2: "",
  image: "",
  portraitImage: "",
  theme: "gold",
  isLegacy: false,
  achievementBanner: "none",
});

const [followedAthletes, setFollowedAthletes] = useState<string[]>([]);
const [fansByAthlete, setFansByAthlete] = useState<Record<string, number>>({});

  const [collection, setCollection] = useState<Athlete[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("collection");
    if (stored) {
      setCollection(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
  const storedFollowed = localStorage.getItem("jocdocs_following");
  const storedFans = localStorage.getItem("jocdocs_fans");

  if (storedFollowed) {
    setFollowedAthletes(JSON.parse(storedFollowed));
  }

  if (storedFans) {
    setFansByAthlete(JSON.parse(storedFans));
  }
}, []);

useEffect(() => {
  localStorage.setItem("jocdocs_following", JSON.stringify(followedAthletes));
}, [followedAthletes]);

useEffect(() => {
  localStorage.setItem("jocdocs_fans", JSON.stringify(fansByAthlete));
}, [fansByAthlete]);

const handleToggleFollow = (athleteId: string) => {
  setFollowedAthletes((prev) => {
    const isAlreadyFollowing = prev.includes(athleteId);

    if (isAlreadyFollowing) {
      // UNFOLLOW
      setFansByAthlete((fans) => ({
        ...fans,
        [athleteId]: Math.max((fans[athleteId] || 1) - 1, 0),
      }));

      return prev.filter((id) => id !== athleteId);
    } else {
      // FOLLOW
      setFansByAthlete((fans) => ({
        ...fans,
        [athleteId]: (fans[athleteId] || 0) + 1,
      }));

      return [...prev, athleteId];
    }
  });
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAthlete({
      ...athlete,
      [e.target.name]: e.target.value,
    });
  };

  const resizeImage = (
    file: File,
    maxWidth = 500,
    quality = 0.7
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.width);
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedDataUrl);
        };

        img.onerror = () => reject(new Error("Could not load image"));
        img.src = reader.result as string;
      };

      reader.onerror = () => reject(new Error("Could not read file"));
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageType: "actionImage" | "profileImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedImage = await resizeImage(file, 500, 0.7);

      setAthlete((prev) => ({
        ...prev,
        [imageType]: compressedImage,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleCollect = () => {
  if (!athlete.name.trim()) return;

  let updatedCollection: Athlete[] = [];

  setCollection((prev) => {
    const alreadySaved = prev.some(
      (item) =>
        item.name === athlete.name &&
        item.jerseyNumber === athlete.jerseyNumber &&
        item.school === athlete.school
    );

    if (alreadySaved) {
      updatedCollection = prev;
      return prev;
    }

    const collectedAthlete: Athlete = {
      ...athlete,
      id: crypto.randomUUID(),
      actionImage: athlete.actionImage || "",
      profileImage: athlete.profileImage || "",
    };

    updatedCollection = [...prev, collectedAthlete];
    return updatedCollection;
  });

  localStorage.setItem("collection", JSON.stringify(updatedCollection));
};

const isCollected = collection.some(
  (item) =>
    item.name === athlete.name &&
    item.jerseyNumber === athlete.jerseyNumber &&
    item.school === athlete.school
);

console.log("CURRENT ATHLETE:", athlete);
console.log("COLLECTION:", collection);

return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Create Your Athlete Card</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="input"
          />
          <input
            name="school"
            placeholder="School Name"
            onChange={handleChange}
            className="input"
          />
          <input
            name="team"
            placeholder="Team Name"
            onChange={handleChange}
            className="input"
          />

          <input
            name="primarySport"
            placeholder="Primary Sport"
            onChange={handleChange}
            className="input"
          />
          <input
            name="otherSport1"
            placeholder="Other Sport 1"
            onChange={handleChange}
            className="input"
          />
          <input
            name="otherSport2"
            placeholder="Other Sport 2"
            onChange={handleChange}
            className="input"
          />
          <label className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-sm text-white/70">
  <input
    type="checkbox"
    checked={athlete.isLegacy || false}
    onChange={(e) =>
      setAthlete({
        ...athlete,
        isLegacy: e.target.checked,
      })
    }
  />
  <span>
    Legacy Card{" "}
    <span className="text-white/40 text-xs">
      (retired or former athletes)
    </span>
  </span>
</label>

<label className="block text-sm text-white/70 mt-3 mb-1">
  Achievement Banner
</label>

<select
  name="achievementBanner"
  value={athlete.achievementBanner || "none"}
  onChange={handleChange}
  className="input"
>
  <option value="none">None</option>
  <option value="state_champion">State Champion</option>
  <option value="national_champion">National Champion</option>
  <option value="world_champion">World Champion</option>
  <option value="gold_medalist">Gold Medalist</option>
  <option value="first_place">First Place</option>
</select>

<input
  name="position"
  placeholder="Position"
  onChange={handleChange}
  className="input"
/>

<input
  name="jerseyNumber"
  placeholder="Jersey Number"
  onChange={handleChange}
  className="input"
/>

          <input
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="input"
          />
          <input
            name="height"
            placeholder="Height"
            onChange={handleChange}
            className="input"
          />
          <input
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
            className="input"
          />
          <input
            name="hometown"
            placeholder="Hometown"
            onChange={handleChange}
            className="input"
          />

          <input
            name="statsYear"
            placeholder="Stats Year"
            onChange={handleChange}
            className="input"
          />

          <input
            name="statLabel1"
            placeholder="Stat 1 Label"
            onChange={handleChange}
            className="input"
          />
          <input
            name="stat1"
            placeholder="Stat 1 Number"
            onChange={handleChange}
            className="input"
          />

          <input
            name="statLabel2"
            placeholder="Stat 2 Label"
            onChange={handleChange}
            className="input"
          />
          <input
            name="stat2"
            placeholder="Stat 2 Number"
            onChange={handleChange}
            className="input"
          />

          <input
            name="statLabel3"
            placeholder="Stat 3 Label"
            onChange={handleChange}
            className="input"
          />
          <input
            name="stat3"
            placeholder="Stat 3 Number"
            onChange={handleChange}
            className="input"
          />

          <input
            name="link1"
            placeholder="Highlight Link 1"
            onChange={handleChange}
            className="input"
          />
          <input
            name="link2"
            placeholder="Highlight Link 2"
            onChange={handleChange}
            className="input"
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">
              Upload Action Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "actionImage")}
              className="input"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">
              Upload Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "profileImage")}
              className="input"
            />
          </div>

                              <select name="theme" onChange={handleChange} className="input">
            <option value="gold">Gold</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="navy">Navy</option>
            <option value="royal">Royal</option>
            <option value="purple">Purple</option>
            <option value="maroon">Maroon</option>
            <option value="silver">Silver</option>
            <option value="black">Black</option>
          </select>
        </div>

        <div className="flex min-h-[100dvh] w-full justify-center bg-black px-2 py-2 text-white">
  <div className="flex w-full max-w-[560px] items-center justify-center">
            <AthleteCard
              athlete={athlete}
              isOwnCard={true}
              onCollect={handleCollect}
              collection={collection}
              isCollected={isCollected}
              fansCount={fansByAthlete[athlete.id] || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}