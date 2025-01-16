"use client";
import UserInterface from "@/interfaces/user.interface";

export default function DashboardProfile({ user }: { user: UserInterface }) {
  return (
    <section>
      <div className="flex justify-between">
        <h2>Profile</h2>
        <button>Edit</button>
      </div>

      <hr />
      <form>
        <section className="flex items-center">
          <label htmlFor="name" className="w-[30%] text-sm">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={user.name}
            className="border w-[70%] py-1.5 pl-1 pr-3"
            autoComplete="off"
            disabled
          />
        </section>
        <section className="flex">
          <label htmlFor="lastName" className="w-[30%] text-sm">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={user.lastName}
            className="border w-[70%]"
            disabled
          />
        </section>
        <section className="flex">
          <label className="w-[30%] text-sm" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            className="border w-[70%]"
            autoComplete="off"
            disabled
          />
        </section>
        {user.password && (
          <section className="flex">
            <label className="w-[30%] text-sm" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              defaultValue={user.password}
              className="border w-[70%]"
              autoComplete="off"
              disabled
            />
          </section>
        )}
      </form>
    </section>
  );
}
