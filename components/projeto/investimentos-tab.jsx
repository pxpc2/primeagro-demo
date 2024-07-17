"use client";

import { useState } from "react";
import Heading from "./Header";

export default function InvestimentosTab({ data }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSave = () => {};
  const onEdit = () => {
    setFormsDisabled(false);
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };

  return (
    <div className="p-4 bg-white">
      <Heading
        tabName={"Investimentos"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
      />
    </div>
  );
}
