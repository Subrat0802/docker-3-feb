import styles from "./page.module.css";
import {prismaClient} from "@repo/db/client";

export default async function Home() {
  const response = await prismaClient.user.findMany();
  return (
    <div>
      Hello
      {JSON.stringify(response)}
    </div>
  );
}

export const dynamic = 'force-dynamic'