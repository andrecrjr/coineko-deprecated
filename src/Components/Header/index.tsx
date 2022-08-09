import { MenuOptions } from "./menu";
import Cat from "../../assets/cat.svg?component";

export const Header = () => {
  return (
    <header className="flex flex-col items-center">
      <section className="ml-4 py-2 flex w-10/12">
        <h1 className="text-4xl flex">
          coinek
          <span>
            <Cat className="w-10" />
          </span>
        </h1>
      </section>
      <nav
        className="w-full bg-purple-neko overflow-x-scroll 
				h-8 sm:h-10 flex content-center sm:justify-center sm:overflow-auto"
      >
        <ul className="list-none flex self-center ">
          {MenuOptions.map((item) => (
            <li className="text-sm pr-10 leading-5 first:pl-4 last:pr-4 font-roboto">
              {item.alias}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
