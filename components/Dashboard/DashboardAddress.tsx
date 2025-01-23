"use client";

import UserInterface from "@/interfaces/user.interface";
import { useEffect, useState } from "react";
import { HydratedDocument } from "mongoose";
import { ProfileFormState } from "@/schemas/validation";
import { Toaster, toast } from "sonner";

type Country = {
  value: string;
  label: string;
};

export default function DashboardAddress({
  user,
}: {
  user: HydratedDocument<UserInterface>;
}) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    oldPassword: undefined,
    newPassword: undefined,
    country: user.address?.country || undefined,
    city: user.address?.city || "",
    zipCode: user.address?.zipCode || "",
    streetLine1: user.address?.street?.address1 || "",
    streetLine2: user.address?.street?.address2 || "",
  });
  const [responseData, setResponseData] = useState<
    ProfileFormState | undefined
  >(undefined);
  const [isEditing, setIsEditing] = useState(false);

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
    const countryString = removeEmoji(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      country: countryString,
    }));
  }
  //API CALL TO GET COUNTRIES IN THE WORLD
  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
      });
  }, []);

  function cancelEditing() {
    setFormData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      oldPassword: undefined,
      newPassword: undefined,
      country: user.address?.country,
      city: user.address?.city || "",
      zipCode: user.address?.zipCode || "",
      streetLine1: user.address?.street?.address1 || "",
      streetLine2: user.address?.street?.address2 || "",
    });
    setResponseData(undefined);

    setIsEditing(!isEditing);
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users/${user._id}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setResponseData(data);
      if (res.ok) {
        setIsEditing(false);
        toast.success(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log("ERROR", error);
      toast.error("Something went wrong");
    }
  }
  return (
    <section>
      <Toaster richColors position="bottom-center" />
      <div className="flex justify-between">
        <h2>Address</h2>
        <button
          className={`${isEditing && "bg-yellow-200 rounded-full py-1/2 px-2"}`}
          onClick={cancelEditing}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <hr />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <section className="flex">
          <label htmlFor="name" className="w-[30%] text-sm">
            Country:
          </label>
          <select
            name="country"
            id="country"
            className="bg-white w-[70%] "
            onChange={selectCountry}
            value={`${
              formData.country
                ? countries.find(
                    (c) => removeEmoji(c.label) === formData.country
                  )?.label
                : "--Select Country--"
            }`}
            disabled={!isEditing}
          >
            <option value={undefined} disabled>
              --Select Country--
            </option>
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
            onChange={handleChange}
            name="city"
            type="text"
            id="city"
            value={formData.city}
            className="border w-[70%]"
            placeholder="Rome"
            disabled={!isEditing}
          />
        </section>
        {responseData?.errors?.city && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData.errors.city}
          </p>
        )}
        <section className="flex">
          <label className="w-[30%] text-sm" htmlFor="zip">
            Zip Code:
          </label>
          <input
            onChange={handleChange}
            type="string"
            id="zip"
            value={formData.zipCode}
            className="border w-[70%]"
            autoComplete="off"
            placeholder="00100"
            disabled={!isEditing}
            name="zipCode"
          />
        </section>
        {responseData?.errors?.zipCode && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData.errors.zipCode}
          </p>
        )}
        <section className="flex">
          <label className="w-[30%] text-sm" htmlFor="streetLine1">
            Street Line 1
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="streetLine1"
            name="streetLine1"
            className="border w-[70%]"
            value={formData.streetLine1}
            placeholder="Via Roma 1"
            disabled={!isEditing}
          />
        </section>
        {responseData?.errors?.streetLine1 && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData.errors.streetLine1}
          </p>
        )}
        <section className="flex">
          <label className="w-[30%] text-sm" htmlFor="streetLine2">
            Street Line 2
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="streetLine2"
            name="streetLine2"
            className="border w-[70%]"
            disabled={!isEditing}
            value={formData.streetLine2}
          />
        </section>
        {responseData?.errors?.streetLine2 && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData.errors.streetLine2}
          </p>
        )}
        {isEditing && (
          <section className="flex justify-end gap-5">
            <div className="flex">
              {/* <svg
                fill="orange"
                width="50px"
                height="50px"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 animate-spin"
              >
                <path d="M41.9 23.9c-.3-6.1-4-11.8-9.5-14.4-6-2.7-13.3-1.6-18.3 2.6-4.8 4-7 10.5-5.6 16.6 1.3 6 6 10.9 11.9 12.5 7.1 2 13.6-1.4 17.6-7.2-3.6 4.8-9.1 8-15.2 6.9-6.1-1.1-11.1-5.7-12.5-11.7-1.5-6.4 1.5-13.1 7.2-16.4 5.9-3.4 14.2-2.1 18.1 3.7 1 1.4 1.7 3.1 2 4.8.3 1.4.2 2.9.4 4.3.2 1.3 1.3 3 2.8 2.1 1.3-.8 1.2-2.5 1.1-3.8 0-.4.1.7 0 0z" />
              </svg> */}
              <button type="submit">Save Changes</button>
            </div>
          </section>
        )}
      </form>
    </section>
  );
}
