import {
  useAddress,
  useMarketplace,
  useNetwork,
  useNetworkMismatch,
  useSDK
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Create = () => {
  // Next JS Router hook to redirect to other pages
  const router = useRouter();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const sdk = useSDK()
  // Connect to our marketplace contract via the useMarketplace hook
  const marketplace = useMarketplace(
    "0x277C0FB19FeD09c785448B8d3a80a78e7A9B8952" // Your marketplace contract address here
  );
    const address = useAddress()
  // This function gets called when the form is submitted.
  async function handleCreateListing(e) {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(4);
        return;
      }

      // Prevent page from refreshing
      e.preventDefault();

      // Store the result of either the direct listing creation or the auction listing creation
      let transactionResult= undefined;

      // De-construct data from form submission
      const { description, toAddress, price } =
        e.target.elements;

        e.preventDefault()

      const executions = [
        {
          toAddress: toAddress,
          nativeTokenValue: price,
          transactionData: tokenContract.encoder.encode(
            "transfer",[
              "0x85DfBCF4F3260D92441b3Db54A645bb188154429" ,//VOTE ADDRESS
              price,
            ]
          )
        }
      ]
      const proposal = await contract.propose(description, executions)

      if (address) {
        proposal
        router.push(`/`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={(e) => handleCreateListing(e)}>
      <div className={styles.container}>
        {/* Form Section */}
        <div className={styles.collectionContainer}>
          <h1 className={styles.ourCollection}>
           Add Your Proposals to the DAO
          </h1>

          {/* NFT Contract Address Field */}
          <input
            type="text"
            name="description"
            className={styles.textInput}
            placeholder="Description"
          />

          {/* NFT Token ID Field */}
          <input
            type="text"
            name="toAddress"
            className={styles.textInput}
            placeholder="toAddress"
          />

          {/* Sale Price For Listing Field */}
          <input
            type="text"
            name="price"
            className={styles.textInput}
            placeholder="Price"
          />


          <button
            type="submit"
            className={styles.mainButton}
            style={{ marginTop: 32, borderStyle: "none" }}
          >
            Add Proposal
          </button>
        </div>
      </div>
    </form>
  );
};

export default Create;
