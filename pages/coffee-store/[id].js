import { useRouter } from "next/Router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-store";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id == params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const Router = useRouter();

  if (Router.isFallback) {
    return <div>Loading....</div>;
  }

  const { id, name, address, locality, imgUrl } = props.coffeeStore;
  const handleUpvoteButton = () => {
    console.log("upvpte");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back To Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            alt={name}
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
            }
            width={360}
            height={10}
          ></Image>
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/staticc/icons/places.svg"
                width={24}
                height={24}
              ></Image>
              <p className={styles.text}>{address}</p>
            </div>
          )}

          {locality && (
            <div className={styles.iconWrapper}>
              <Image
                src="/staticc/icons/nearMe.svg"
                width={24}
                height={24}
              ></Image>
              <p className={styles.text}>{locality}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/staticc/icons/star.svg" width={24} height={24}></Image>
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
