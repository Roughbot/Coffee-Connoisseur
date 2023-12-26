import { useRouter } from "next/Router";
import Link from "next/link";
import coffeeStoresData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
  const params = staticProps.params;

  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id == params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  const Router = useRouter();

  return (
    <div>
      Coffee Store Page
      <Link href="/">Back To Home</Link>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  );
};

export default CoffeeStore;
