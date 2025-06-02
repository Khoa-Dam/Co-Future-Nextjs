"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CapsuleCard, Capsule } from "@/components/ui/capsule-card";
import { CapsuleModal } from "@/components/capsules/capsule-modal";
import { useWalletAdapter } from "@/hooks/useWalletAdapter";
import {
  useCapsulesFromRegistry,
  CapsuleObject,
} from "@/hooks/useCapsulesFromRegistry";
import { formatISO } from "date-fns";

const REGISTRY_ID =
  process.env.NEXT_PUBLIC_SUI_CAPSULE_REGISTRY_OBJECT_ID || "0x1";

type FilterType = "all" | "locked" | "unlockable" | "claimed";

function transformToCapsule(raw: CapsuleObject): Capsule {
  console.log("rawdfasdfasfas", raw);
  const now = Date.now();
  const unlockTimestampMs = Number(raw.unlock_timestamp_ms);
  const claimedCount = Number(raw.claimed_count);
  const maxClaim = Number(raw.max_claim);

  let status: "locked" | "unlockable" | "claimed" = "locked";
  if (now >= unlockTimestampMs) {
    if (claimedCount < maxClaim) status = "unlockable";
    else status = "claimed";
  }

  let message = "";
  if (typeof raw.encrypted_content === "string") {
    // hex string
    const hex = raw.encrypted_content;
    const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
    const bytes = new Uint8Array(
      cleanHex.match(/.{1,2}/g)!.map((b: string) => parseInt(b, 16))
    );
    message = new TextDecoder().decode(bytes);
  } else if (Array.isArray(raw.encrypted_content)) {
    // array số
    message = new TextDecoder().decode(
      new Uint8Array((raw.encrypted_content as number[]).map((b: number) => b))
    );
  } else {
    message = "< undecodable >";
  }

  return {
    id: raw.id,
    creatorAddress: raw.creator,
    unlockDate: formatISO(new Date(unlockTimestampMs)),
    status,
    title: "",
    message,
    isPrivate: raw.audience.length === 1 && raw.audience[0] === raw.creator,
    tokenAmount: raw.total_reward !== "0" ? raw.total_reward : undefined,
    nftId: null,
    nftName: null,
    nftCollection: null,
    createdAt: formatISO(new Date()),
    claimedAt: status === "claimed" ? formatISO(new Date()) : null,
  };
}

export default function CapsuleList() {
  const {
    capsules: rawCapsules,
    loading,
    error,
    refetch,
  } = useCapsulesFromRegistry(REGISTRY_ID);
  const [filter, setFilter] = useState<FilterType>("all");
  console.log("setFilter", setFilter);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { claimCapsule } = useWalletAdapter();

  const transformedCapsules = useMemo(
    () => rawCapsules.map(transformToCapsule),
    [rawCapsules]
  );
  const filteredCapsules = useMemo(() => {
    if (filter === "all") return transformedCapsules;
    return transformedCapsules.filter((c: Capsule) => c.status === filter);
  }, [transformedCapsules, filter]);

  if (loading)
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Capsules...</h2>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            Error Loading Capsules
          </h2>
          <p className="text-gray-400">Error: {error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pt-16 z-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center"></div>
        {filteredCapsules.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredCapsules.map((capsule: Capsule, index: number) => (
              <motion.div
                key={capsule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <CapsuleCard
                  capsule={capsule}
                  onOpen={() => {
                    setSelectedCapsule(capsule);
                    setModalOpen(true);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // ... empty state giữ nguyên ...
          <></>
        )}

        <CapsuleModal
          capsule={selectedCapsule}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onClaim={async () => {
            if (!selectedCapsule) return;
            // Gọi tx claim từ useWalletAdapter
            await claimCapsule({
              vaultId: process.env.NEXT_PUBLIC_SUI_VAULT_OBJECT_ID || "",
              capsuleId: selectedCapsule.id,
              clockId: "0x6",
            });
            setModalOpen(false);
            refetch();
          }}
        />
      </div>
    </div>
  );
}
