/* eslint-disable prefer-const */

function Footer() {
  let data = new Date().getFullYear();
  return (
    <>
      <div className="flex justify-center bg-green-900 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">Akanni Silva© {data}</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
