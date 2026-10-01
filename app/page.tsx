import { LocaleProvider } from "@/components/LocaleProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Flagship from "@/components/Flagship";
export default function Home() {
  return (
    <LocaleProvider>
      <SmoothScroll />
      <Flagship />
    </LocaleProvider>
  );
}
