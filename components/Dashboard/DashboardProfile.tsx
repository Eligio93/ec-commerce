"use client";
import UserInterface from "@/interfaces/user.interface";
import { useState } from "react";
import { profileValidationState } from "@/schemas/validation/profileValidation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function DashboardProfile({ user }: { user: UserInterface }) {
  const [formFields, setFormFields] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    oldPassword: "",
    newPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { data: session, status, update } = useSession();
  const [responseData, setResponseData] = useState<
    profileValidationState | undefined
  >(undefined);

  function handleEditing() {
    //when invoked reset the form to the user values and
    setIsEditing(!isEditing);
    setFormFields({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      oldPassword: "",
      newPassword: "",
    });
    setResponseData(undefined);
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users/${user._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ ...formFields, formSource: "Profile" }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 404) {
          toast.error("User not found. Please refresh the page");
        }
        setResponseData(data);
      } else {
        setResponseData(undefined);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log("ERROR", error);
      toast.error("Something went wrong");
    } finally {
      update(); // update the session with the new user values
    }
  }

  return (
    <section>
      <div className="flex justify-between">
        <h2>Profile</h2>
        <button
          className={`${isEditing && "py-1/2 rounded-full bg-yellow-200 px-2"}`}
          onClick={handleEditing}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      <hr />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label htmlFor="name" className="w-[40%] text-sm">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formFields.name}
            className="w-[60%] border py-1.5 pl-1 pr-3"
            autoComplete="off"
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {responseData?.errors?.name && (
          <p className="w-[60%] self-end text-sm text-red-500">
            {responseData.errors.name}
          </p>
        )}
        <div className="flex items-center">
          <label htmlFor="lastName" className="w-[40%] text-sm">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formFields.lastName}
            className="w-[60%] border py-1.5 pl-1 pr-3"
            autoComplete="off"
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {responseData?.errors?.lastName && (
          <p className="w-[60%] self-end text-sm text-red-500">
            {responseData.errors.lastName}
          </p>
        )}
        <div className="flex items-center">
          <label htmlFor="email" className="w-[40%] text-sm">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formFields.email}
            className="w-[60%] border py-1.5 pl-1 pr-3"
            autoComplete="off"
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {responseData?.errors?.email && (
          <p className="w-[60%] self-end text-sm text-red-500">
            {responseData.errors.email}
          </p>
        )}
        {user.password && !isEditing && (
          <div className="flex items-center">
            <label htmlFor="password" className="w-[40%] text-sm">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formFields.password?.slice(0, 8)}
              className="w-[60%] border py-1.5 pl-1 pr-3"
              autoComplete="off"
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        )}
        {user.password && isEditing && (
          <>
            <div className="flex items-center">
              <label htmlFor="oldPassword" className="w-[40%] text-sm">
                Old Password:
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formFields.oldPassword}
                className="w-[60%] border py-1.5 pl-1 pr-3"
                autoComplete="off"
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Type here your current password"
              />
            </div>
            {responseData?.errors?.oldPassword && (
              <p className="w-[60%] self-end text-sm text-red-500">
                {responseData.errors.oldPassword}
              </p>
            )}
            <div className="flex items-center">
              <label htmlFor="newPassword" className="w-[40%] text-sm">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formFields.newPassword}
                className="w-[60%] border py-1.5 pl-1 pr-3"
                autoComplete="off"
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Type here your new password"
              />
            </div>
            {responseData?.errors?.newPassword && (
              <p className="w-[60%] self-end text-sm text-red-500">
                {responseData.errors.newPassword}
              </p>
            )}
          </>
        )}
        {isEditing && (
          <button
            type="submit"
            className="py-1/2 rounded-full bg-yellow-200 px-2"
          >
            Save
          </button>
        )}
      </form>
    </section>
  );
}

// return (
//   <section>
//     <Toaster richColors position="bottom-center" />
//     <div className="flex justify-between">
//       <h2>Profile</h2>
//       <button
//         className={`${isEditing && "bg-yellow-200 rounded-full py-1/2 px-2"}`}
//         onClick={cancelEditing}
//       >
//         {isEditing ? "Cancel" : "Edit"}
//       </button>
//     </div>

//     <hr />
//     <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
//       {/*NAME */}
//       <section className="flex items-center">
//         <label htmlFor="name" className="w-[40%] text-sm">
//           Name:
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           className="border w-[60%] py-1.5 pl-1 pr-3"
//           autoComplete="off"
//           onChange={handleChange}
//           disabled={!isEditing}
//         />
//       </section>
//

//       {/*LAST NAME*/}
//       <section className="flex">
//         <label htmlFor="lastName" className="w-[40%] text-sm">
//           Last Name:
//         </label>
//         <input
//           type="text"
//           id="lastName"
//           value={formData.lastName}
//           className="border w-[60%]"
//           disabled={!isEditing}
//           name="lastName"
//           onChange={handleChange}
//         />
//       </section>
//       {responseData?.errors?.lastName && (
//         <p className="self-end w-[60%] text-sm text-red-500">
//           {responseData.errors.lastName}
//         </p>
//       )}

//       {/*EMAIL*/}
//       <section className="flex">
//         <label className="w-[40%] text-sm" htmlFor="email">
//           Email:
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           className="border w-[60%]"
//           autoComplete="off"
//           disabled={!isEditing}
//           onChange={handleChange}
//         />
//       </section>
//       {responseData?.errors?.email && (
//         <p className="self-end w-[60%] text-sm text-red-500">
//           {responseData.errors.email}
//         </p>
//       )}
//       {/*PASSWORD*/}
//       {/*if the user has a password and is not changig the pasword leave the field disabled*/}
//       {user.password && !changingPassword && (
//         <section className="flex">
//           <label className="w-[40%] text-sm" htmlFor="password">
//             Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             defaultValue={formData.password}
//             className="border w-[60%]"
//             autoComplete="off"
//             disabled
//           />
//         </section>
//       )}
//       {/*if the user has a password and wants to change the password*/}
//       {changingPassword && user.password && (
//         <>
//           <section className="flex">
//             <label className="w-[40%] text-sm" htmlFor="oldPassword">
//               Old Password:
//             </label>
//             <input
//               type="password"
//               id="oldPassword"
//               className="border w-[60%]"
//               name="oldPassword"
//               onChange={handleChange}
//             />
//           </section>
//           {responseData?.errors?.oldPassword && (
//             <p className="self-end w-[60%] text-sm text-red-500">
//               {responseData.errors.oldPassword}
//             </p>
//           )}
//           <section className="flex">
//             <label className="w-[40%] text-sm" htmlFor="newPassword">
//               New Password:
//             </label>
//             <input
//               type="password"
//               id="newPassword"
//               className="border w-[60%]"
//               name="newPassword"
//               onChange={handleChange}
//             />
//           </section>
//           {responseData?.errors?.newPassword && (
//             <p className="self-end w-[60%] text-sm text-red-500">
//               {responseData.errors.newPassword}
//             </p>
//           )}
//         </>
//       )}

//       {isEditing && (
//         <section className="flex justify-end gap-5">
//           {!changingPassword && user.password && (
//             <button
//               type="button"
//               onClick={() => setChangingPassword(!changingPassword)}
//             >
//               Change Password
//             </button>
//           )}
//           <div className="flex">
//             {/* <svg
//               fill="orange"
//               width="50px"
//               height="50px"
//               viewBox="0 0 50 50"
//               xmlns="http://www.w3.org/2000/svg"
//               className="size-6 animate-spin"
//             >
//               <path d="M41.9 23.9c-.3-6.1-4-11.8-9.5-14.4-6-2.7-13.3-1.6-18.3 2.6-4.8 4-7 10.5-5.6 16.6 1.3 6 6 10.9 11.9 12.5 7.1 2 13.6-1.4 17.6-7.2-3.6 4.8-9.1 8-15.2 6.9-6.1-1.1-11.1-5.7-12.5-11.7-1.5-6.4 1.5-13.1 7.2-16.4 5.9-3.4 14.2-2.1 18.1 3.7 1 1.4 1.7 3.1 2 4.8.3 1.4.2 2.9.4 4.3.2 1.3 1.3 3 2.8 2.1 1.3-.8 1.2-2.5 1.1-3.8 0-.4.1.7 0 0z" />
//             </svg> */}
//             <button type="submit">Save Changes</button>
//           </div>
//         </section>
//       )}
//     </form>
//   </section>
// );
