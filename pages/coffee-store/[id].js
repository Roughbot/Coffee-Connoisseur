import { useRouter } from "next/Router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import coffeeStoresData from "../../data/coffee-stores.json";
import Image from "next/image";
import cls from "classnames";

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
  const paths = coffeeStoresData.map((coffeeStore) => {
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

  const { address, name, neighbourhood, imgUrl } = props.coffeeStore;
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
            <Link href="/">Back To Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            alt={name}
            src={imgUrl}
            width={300}
            height={100}
          ></Image>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/staticc/icons/places.svg"
              width={24}
              height={24}
            ></Image>
            <p className={styles.texr}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/staticc/icons/nearMe.svg"
              width={24}
              height={24}
            ></Image>
            <p className={styles.texr}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/staticc/icons/star.svg" width={24} height={24}></Image>
            <p className={styles.texr}>1</p>
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
