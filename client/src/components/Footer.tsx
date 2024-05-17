const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container flex mx-auto justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          OucBooking.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p>
            by{" "}
            <a
              className="underline text-slate-300 hover:text-white cursor-pointer"
              href="https://github.com/oucief"
              target="_blank"
            >
              Abderrahmane OUCIEF
            </a>
          </p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
