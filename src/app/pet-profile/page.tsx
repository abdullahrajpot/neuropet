"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Upload } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/shared";
import { Button } from "@/components/ui/Button";

export default function PetProfilePage() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Pet Profile"
        title="My Pets"
        description="Save your pet's details and behaviour videos for faster booking next time."
      />
      <section className="bg-white py-14 md:py-20">
        <Container className="max-w-xl">
          {saved ? (
            <div className="rounded-card bg-success-bg p-8 text-center text-success">
              <Check className="mx-auto h-10 w-10" />
              <p className="mt-4 font-medium">Profile saved!</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSaved(true);
              }}
              className="space-y-5"
            >
              <input
                required
                placeholder="Pet name"
                className="w-full rounded-input border-[1.5px] border-ink-300 px-4 py-3 focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-700/10"
              />
              <select className="w-full rounded-input border-[1.5px] border-ink-300 px-4 py-3">
                <option>Dog</option>
                <option>Cat</option>
                <option>Other</option>
              </select>
              <input
                placeholder="Breed (optional)"
                className="w-full rounded-input border-[1.5px] border-ink-300 px-4 py-3"
              />
              <textarea
                rows={4}
                placeholder="Behaviour notes"
                className="w-full rounded-input border-[1.5px] border-ink-300 px-4 py-3"
              />
              <div
                className="flex cursor-pointer flex-col items-center rounded-input border-2 border-dashed border-ink-300 p-8"
                onClick={() => setUploadSuccess(true)}
                role="button"
                tabIndex={0}
              >
                {uploadSuccess ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center text-success"
                  >
                    <Check className="h-8 w-8" />
                    <span className="mt-2 text-sm">Video uploaded (demo)</span>
                  </motion.div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-ink-600" strokeWidth={1.5} />
                    <span className="mt-2 text-sm text-ink-600">
                      Upload behaviour video
                    </span>
                  </>
                )}
              </div>
              <Button type="submit">Save profile</Button>
            </form>
          )}
        </Container>
      </section>
    </>
  );
}
