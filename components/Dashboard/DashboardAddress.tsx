"use client";

import UserInterface from "@/interfaces/user.interface";
import { useEffect, useState } from "react";

type Country = {
  value: string;
  label: string;
};

export default function DashboardAddress({ user }: { user: UserInterface }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  function removeEmoji(string: string) {
    return string
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      )
      .replace(/\s+/g, " ")
      .trim();
  }

  function selectCountry(e: any) {
    setSelectedCountry(removeEmoji(e.target.value));
    console.log(selectedCountry);
  }

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(removeEmoji(data.countries[0].label));
      });
  }, []);
  console.log(selectedCountry);
  return (
    <section>
      <div className="flex justify-between">
        <h2>Address</h2>
        <button>Edit</button>
      </div>

      <hr />
      <form>
        <section className="flex">
          <label htmlFor="name" className="w-[30%] text-sm">
            Country:
          </label>
          <select
            name="country"
            id="country"
            className="bg-white w-[70%] "
            onChange={selectCountry}
          >
            {countries.map((country: any) => (
              <option key={country.value} value={country.label}>
                {country.label}
              </option>
            ))}
          </select>
        </section>
        <section className="flex">
          <label htmlFor="city" className="w-[30%] text-sm">
            City:
          </label>
          <input
            type="text"
            id="city"
            value={user.address?.city || ""}
            className="border w-[70%]"
            disabled
          />
        </section>
        <section className="flex">
          <label className="w-[30%] text-sm" htmlFor="zip">
            Zip Code:
          </label>
          <input
            type="string"
            id="zip"
            value={user.address?.zipCode || ""}
            className="border w-[70%]"
            autoComplete="off"
            disabled
          />
        </section>
      </form>
    </section>
  );
}
