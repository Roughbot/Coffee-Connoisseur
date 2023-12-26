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

  const { address, name, neighbourhood, imaUrl } = props.coffeeStore;

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
            src={imaUrl}
            width={600}
            height={360}
          ></Image>
        </div>
        <div className={cls("glass", styles.col2)}>
          <p>{address}</p>
          <p>{neighbourhood}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
