import { PrismaClient } from "@prisma/client";
import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const reports = await prisma.report.findMany();
  return {
    props: {
      initialReports: reports,
    },
  };
}

const Home = ({
  initialReports,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={styles.container}>
      <pre>{JSON.stringify(initialReports, null, 2)}</pre>
    </div>
  );
};

export default Home;
