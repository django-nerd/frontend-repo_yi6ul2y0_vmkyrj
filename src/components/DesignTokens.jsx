import React from 'react'

const Color = ({ name, hex, desc }) => (
  <div className="flex items-center gap-4 p-3 rounded-lg bg-white/70 backdrop-blur border border-white/50 shadow-sm">
    <div className="w-10 h-10 rounded-md" style={{ backgroundColor: hex }} />
    <div>
      <div className="font-medium text-gray-900">{name} <span className="text-xs text-gray-500">{hex}</span></div>
      <div className="text-sm text-gray-600">{desc}</div>
    </div>
  </div>
)

export default function DesignTokens() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Color name="Primary" hex="#0D9488" desc="Teal - logistics, trust" />
      <Color name="Secondary" hex="#3B82F6" desc="Blue - actions, info" />
      <Color name="Success" hex="#10B981" desc="Green - completed, approved" />
      <Color name="Warning" hex="#F59E0B" desc="Amber - pending, caution" />
      <Color name="Danger" hex="#EF4444" desc="Red - failed, delayed" />
      <Color name="Neutral" hex="#6B7280" desc="Gray - secondary actions" />
    </div>
  )
}
