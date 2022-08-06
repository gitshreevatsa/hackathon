import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useAddress,
  useVote,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { Contract } from "ethers";

const Home = () => {
  const router = useRouter();
  const address = useAddress()

  // Connect your VOTE smart contract here (replace this address)
  const vote = useVote(
    //VOTE ACCESSOR
    "0x85DfBCF4F3260D92441b3Db54A645bb188154429" // Your VOTE contract address here
  );

  async function allProposals() {
  const proposals = await vote.getAll()
  console.log(proposals.length)
  }
  allProposals()



  //getallProposals

  return (
    <>
      {/* Content */}
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}>Society For Societies</h1>
        <p className={styles.explain}></p>

        <hr className={styles.divider} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>
          {address && (
            <Link href="/create">
              <a
                className={styles.mainButton}
                style={{ textDecoration: "none" }}
              >
                Add Proposal
              </a>
            </Link>
          )}
        </div>

        <div className="main">
          {/* {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading Proposals</div>
            ) : (
              // Otherwise, show the listings
              <div className={styles.listingGrid}>
                {listings?.map((listing) => (
                  <div
                    key={listing.id}
                    className={styles.listingShortView}
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                    <h2 className={styles.nameContainer}>
                      <Link href={`/listing/${listing.id}`}>
                        <a className={styles.name}>{listing.asset.name}</a>
                      </Link>
                    </h2>
                  </div>
                ))}
              </div>
            )
          } */}
        </div>

      </div>
    </>
  );
};

export default Home;
