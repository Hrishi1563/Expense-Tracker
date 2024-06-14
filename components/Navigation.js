import { ImStatsBars } from "react-icons/im";

export default function Nav() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            {/* img */}
            <img
              className="object-cover w-full h-full"
              src="https://thispersondoesnotexist.com/"
              alt="profile image"
            />
          </div>
          <small> Hi,Leon </small>
        </div>
        <nav className="flex items-center gap-2">
          <div>
            <ImStatsBars className="text-2l " />
          </div>
          <div>
            <button className="btn btn-danger">Sign out</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
