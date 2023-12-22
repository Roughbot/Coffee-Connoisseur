import { useRouter } from "next/Router";
import Link from "next/link";

const CoffeeStore = () => {
  const Router = useRouter();
  return (
    <div>
      Coffee Store Page
      <Link href="/">Back To Home</Link>
    </div>
  );
};

export default CoffeeStore;
