import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useProgram,
  useClaimNFT,
  useProgramMetadata,
  useClaimConditions,
} from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  const { program } = useProgram(
    "A753d9yYgFLhqkF2CmMQahTFSWoudVqdHRuFWEiT5Bjn",
    "nft-drop"
  );

  //Read Hook
  const { data: metadata, isLoading: loadingMetadata } =
    useProgramMetadata(program);

  const { data: claimCondition, isLoading: loadingClaimCondition } =
    useClaimConditions(program);

  console.log("HAPPY DIWALI to You Console Checker");

  // Write Hook
  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);

  return (
    <>
      <div className={styles.container}>
        {
          // If the Metadata is loading then show a loading state
          loadingMetadata ? <h1>Loading...</h1> : <h1>{metadata?.name}</h1>
        }
        <WalletMultiButton />

        {
          // Claim Conditions
          loadingClaimCondition ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h3>Claimed NFTs so far: </h3>
              <p>
                {claimCondition?.claimedSupply} / {claimCondition?.maxClaimable}
              </p>
            </div>
          )
        }

        <button
          onClick={() =>
            claim({
              amount: 1,
            })
          }
        >
          {isLoading ? "Claiming..." : "Claim One NFT"}
        </button>

        <div className={styles.iconContainer}></div>
        <h1 className={styles.h1}>
          Happy Diwali from{" "}
          <b>
            <a
              href="https://twitter.com/shahsoham_"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lightPurple}
            >
              Soham.xyz
            </a>
          </b>
        </h1>
        <br />
      </div>
    </>
  );
};

export default Home;