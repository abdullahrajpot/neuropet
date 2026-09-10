"use client";

import { useState } from "react";
import { Coffee, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { tipOptions } from "@/data/dogBehaviorServices";

interface TipSectionProps {
  selectedTip: number | null;
  onTipSelect: (amount: number | null) => void;
}

export function TipSection({ selectedTip, onTipSelect }: TipSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-accent-50 to-accent-100 border-2 border-accent-200 rounded-3xl p-8 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-accent-600 flex items-center justify-center">
          <Coffee className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-display text-2xl text-primary-900">Buy Me a Coffee? ☕</h3>
          <p className="text-sm text-ink-600">Optional tip to support our service (completely optional!)</p>
        </div>
      </div>

      <p className="text-ink-700 mb-6">
        Your tip helps us continue providing quality care and support. Choose an amount below or continue without tipping - it&apos;s entirely up to you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {tipOptions.map((option) => (
          <motion.button
            key={option.amount}
            type="button"
            onClick={() => onTipSelect(selectedTip === option.amount ? null : option.amount)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              selectedTip === option.amount
                ? 'border-accent-600 bg-accent-600 text-white shadow-lg'
                : 'border-accent-300 bg-white text-primary-900 hover:border-accent-500'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Heart className={`w-5 h-5 ${selectedTip === option.amount ? 'fill-current' : ''}`} />
              <span className="text-2xl font-bold">£{option.amount}</span>
            </div>
            <div className={`text-sm font-semibold mb-1 ${selectedTip === option.amount ? 'text-accent-100' : 'text-accent-700'}`}>
              {option.label}
            </div>
            <div className={`text-xs ${selectedTip === option.amount ? 'text-accent-200' : 'text-ink-600'}`}>
              {option.description}
            </div>
          </motion.button>
        ))}
        
        <motion.button
          type="button"
          onClick={() => onTipSelect(null)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-6 rounded-2xl border-2 transition-all text-left ${
            selectedTip === null
              ? 'border-primary-300 bg-primary-50 text-primary-900'
              : 'border-primary-200 bg-white text-primary-900 hover:border-primary-300'
          }`}
        >
          <div className="text-lg font-semibold mb-2">No Tip</div>
          <div className="text-sm text-ink-600">
            Continue without tipping
          </div>
        </motion.button>
      </div>

      {selectedTip !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-white rounded-xl border-2 border-accent-300"
        >
          <p className="text-center text-ink-700">
            <span className="font-bold text-primary-900">Thank you!</span> Your £{selectedTip} tip will be added to your submission.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
