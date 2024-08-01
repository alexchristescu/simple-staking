import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  LoadingTableList,
  LoadingView,
} from "@/app/components/Loading/Loading";
import { QueryMeta } from "@/app/types/api";
import { FinalityProvider as FinalityProviderInterface } from "@/app/types/finalityProviders";
import { getNetworkConfig } from "@/config/network.config";
import { Network } from "@/utils/wallet/wallet_provider";

import { FinalityProvider } from "./FinalityProvider";

interface FinalityProvidersProps {
  finalityProviders: FinalityProviderInterface[] | undefined;
  selectedFinalityProvider: FinalityProviderInterface | undefined;
  specificProvider: FinalityProviderInterface | undefined;
  // called when the user selects a finality provider
  onFinalityProviderChange: (btcPkHex: string) => void;
  queryMeta: QueryMeta;
}

// Staking form finality providers
export const FinalityProviders: React.FC<FinalityProvidersProps> = ({
  finalityProviders,
  selectedFinalityProvider,
  specificProvider,
  onFinalityProviderChange,
  queryMeta,
}) => {
  const [isOtherProvidersVisible, setIsOtherProvidersVisible] = useState(false);
  // If there are no finality providers, show loading
  if (
    !finalityProviders ||
    finalityProviders.length === 0 ||
    !specificProvider
  ) {
    return <LoadingView />;
  }

  const network = getNetworkConfig().network;
  const createFinalityProviderLink = `https://github.com/babylonchain/networks/tree/main/${
    network == Network.MAINNET ? "bbn-1" : "bbn-test-4"
  }/finality-providers`;

  return (
    <>
      <p>
        Select a finality provider or{" "}
        <a
          href={createFinalityProviderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="sublink text-primary hover:underline"
        >
          create your own
        </a>
        .
        <button
          className="btn-primary btn ml-10"
          onClick={() => setIsOtherProvidersVisible(!isOtherProvidersVisible)}
        >
          {!isOtherProvidersVisible
            ? "Show diferent providers"
            : "Show BlockHunters"}
        </button>
      </p>
      <div className="hidden gap-2 px-4 lg:grid lg:grid-cols-stakingFinalityProvidersDesktop">
        {!isOtherProvidersVisible ? (
          <p>Stake with BlockHunters</p>
        ) : (
          <p>Finality Provider</p>
        )}
        <p>BTC PK</p>
        <p>Total Delegation</p>
        <p>Commission</p>
      </div>
      <div
        id="finality-providers"
        className="no-scrollbar max-h-[21rem] overflow-y-auto"
      >
        <InfiniteScroll
          className="flex flex-col gap-4"
          dataLength={finalityProviders?.length || 0}
          next={queryMeta.next}
          hasMore={queryMeta.hasMore}
          loader={queryMeta.isFetchingMore ? <LoadingTableList /> : null}
          scrollableTarget="finality-providers"
        >
          {" "}
          {!isOtherProvidersVisible ? (
            <>
              <FinalityProvider
                key={specificProvider?.btcPk}
                moniker={specificProvider?.description?.moniker}
                pkHex={specificProvider?.btcPk}
                stakeSat={specificProvider?.activeTVLSat}
                commission={specificProvider?.commission}
                selected={
                  selectedFinalityProvider?.btcPk === specificProvider?.btcPk
                }
                onClick={() => {
                  onFinalityProviderChange(specificProvider?.btcPk || "");
                }}
              />
            </>
          ) : (
            <>
              {finalityProviders?.map((fp) => (
                <FinalityProvider
                  key={fp.btcPk}
                  moniker={fp.description?.moniker}
                  pkHex={fp.btcPk}
                  stakeSat={fp.activeTVLSat}
                  commission={fp.commission}
                  selected={selectedFinalityProvider?.btcPk === fp.btcPk}
                  onClick={() => {
                    onFinalityProviderChange(fp.btcPk);
                  }}
                />
              ))}
            </>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};
