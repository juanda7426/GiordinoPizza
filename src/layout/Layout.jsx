import CustomNavbar from "./Navbar";
import Footer from "../components/Footer/Footer";
import { infoData } from "../data";

const Layout = ({ children }) => {
  return (
    <>
      <CustomNavbar />
      <main>{children}</main>
      <Footer infoData={infoData} />
    </>
  );
};

export default Layout;
