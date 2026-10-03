"use client";

import { useEffect, useState } from "react";
import { GiftItem } from "@/features/commerce/types";
import { mockCommerce } from "@/features/commerce/mock-service";
import { storage } from "@/lib/storage";
import GiftBasket from "./GiftBasket";
import styles from "@/app/site.module.css";

/**
 * Loads the visitor's taste profile and asks the commerce service to curate.
 * Swap mockCommerce for the real implementation when payments go live —
 * this component does not change.
 */
export default function GiftPageClient() {
  const [items, setItems] = useState<GiftItem[] | null>(null);
  const [tagCount, setTagCount] = useState(0);

  useEffect(() => {
    storage.getTaste().then(async (profile) => {
      setTagCount(profile?.tags.length ?? 0);
      setItems(await mockCommerce.curateFor(profile));
    });
  }, []);

  if (!items) return null;

  return (
    <>
      {tagCount > 0 && (
        <p className={styles.mono} style={{ textAlign: "center", opacity: 0.6 }}>
          CURATED FROM YOUR {tagCount} TASTE TAGS · DEMO CURATION
        </p>
      )}
      <GiftBasket items={items} />
    </>
  );
}
